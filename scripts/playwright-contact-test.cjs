const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  // By default prefer Playwright's bundled browsers; set USE_SYSTEM_CHROME=1 to force system Chrome
  const possibleChromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  const chromeExe = possibleChromePaths.find((p) => fs.existsSync(p));

  const useSystem = process.env.USE_SYSTEM_CHROME === '1' && chromeExe;
  const headless = process.env.HEADFUL === '1' ? false : true;
  const commonArgs = ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--disable-setuid-sandbox'];
  const launchOptions = { headless, args: commonArgs };
  if (useSystem) {
    launchOptions.executablePath = chromeExe;
  }
  // Optionally add a slight slowdown for debugging when running headful
  if (process.env.SLOWMO) {
    launchOptions.slowMo = Number(process.env.SLOWMO) || 50;
  }

  console.log('Launching browser with options:', launchOptions);
  let browser;
  try {
    browser = await chromium.launch(launchOptions);
  } catch (err) {
    console.error('chromium.launch failed:', err && err.message ? err.message : err);
    const fallback = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    if (fs.existsSync(fallback)) {
      console.log('Falling back to explicit Chrome executable:', fallback);
      browser = await chromium.launch({ headless: true, executablePath: fallback, args: commonArgs });
    } else {
      throw err;
    }
  }

  console.log('Browser launched');
  browser.on('disconnected', () => console.error('BROWSER DISCONNECTED'));
  const context = await browser.newContext();
  context.on('close', () => console.error('CONTEXT CLOSED'));
  const page = await context.newPage();
  page.on('close', () => console.error('PAGE CLOSED'));
  // Extra safety: if anything causes the browser to disconnect unexpectedly, capture a screenshot if possible
  let tookCrashScreenshot = false;
  let expectedClose = false;
  const crashHandler = async () => {
    // Ignore expected/intentional closures
    if (expectedClose) return;
    try {
      if (!tookCrashScreenshot) {
        tookCrashScreenshot = true;
        await page.screenshot({ path: 'playwright-crash.png', fullPage: true });
        console.error('Saved crash screenshot: playwright-crash.png');
      }
    } catch (e) {
      console.error('Failed to take crash screenshot:', e && e.message);
    }
  };
  browser.on('disconnected', crashHandler);
  page.on('close', crashHandler);


  // Listen to network responses to capture the EmailJS request
  let emailResponse = null;
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('api.emailjs.com')) {
      emailResponse = { status: response.status(), url };
      console.log('Captured EmailJS request ->', emailResponse);
    }
  });

  // Extra diagnostics: console messages, page errors and failed requests
  page.on('console', (msg) => {
    console.log('PAGE LOG:', msg.type(), msg.text());
  });
  page.on('pageerror', (err) => {
    console.error('PAGE ERROR:', err);
  });
  page.on('requestfailed', (req) => {
    console.error('REQUEST FAILED:', req.url(), req.failure());
  });

  // Auto-detect local dev server port (try common Vite dev ports)
  async function findDevPort() {
    const ports = [8080, 8081, 8082, 8083, 8084, 8085];
    for (const p of ports) {
      try {
        const res = await fetch(`http://localhost:${p}`, { method: 'HEAD' });
        if (res && (res.status === 200 || res.status === 304 || res.status === 204 || res.status === 0 || res.status === undefined)) {
          return p;
        }
      } catch (e) {
        // ignore
      }
    }
    return null;
  }

  const port = await findDevPort();
  if (!port) {
    console.log('No running dev server found on ports 8080-8085.');
    await browser.close();
    process.exit(1);
  }

  console.log('Using dev server port', port);
  await page.goto(`http://localhost:${port}/#contact`, { waitUntil: 'domcontentloaded', timeout: 15000 });

  // Fill the contact form
  await page.fill('input[name="name"]', 'Automated Test');
  await page.fill('input[name="email"]', 'no-reply@example.com');
  await page.fill('textarea[name="message"]', 'This is a live test sent by an automated script to verify EmailJS integration.');

  // Submit — wait until the button is enabled and visible, then click
  await page.waitForSelector('button[type="submit"]:not([disabled])', { timeout: 10000 });
  await page.locator('button[type="submit"]').click();

  // Wait for EmailJS network call or a toast (whichever comes first). Give it 30s.
  const start = Date.now();
  while (!emailResponse && Date.now() - start < 30000) {
    await new Promise(r => setTimeout(r, 200));
  }

  if (emailResponse) {
    console.log('EmailJS response status:', emailResponse.status);
  } else {
    console.log('No EmailJS request captured (possible CORS or network error).');
  }

  // Wait a moment to allow UI update
  await new Promise(r => setTimeout(r, 1000));

  // Mark expected close so crash handler does not treat a normal shutdown as a crash
  expectedClose = true;
  await browser.close();
})();

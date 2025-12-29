const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Listen to network responses to capture the EmailJS request
  let emailResponse = null;
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('api.emailjs.com')) {
      emailResponse = { status: response.status(), url };
      console.log('Captured EmailJS request ->', emailResponse);
    }
  });

  await page.goto('http://localhost:8081/#contact', { waitUntil: 'domcontentloaded', timeout: 15000 });

  // Fill the contact form
  await page.fill('input[name="name"]', 'Automated Test');
  await page.fill('input[name="email"]', 'no-reply@example.com');
  await page.fill('textarea[name="message"]', 'This is a live test sent by an automated script to verify EmailJS integration.');

  // Submit
  await page.click('button[type="submit"]');

  // Wait for EmailJS network call or a toast (whichever comes first)
  const start = Date.now();
  while (!emailResponse && Date.now() - start < 20000) {
    await new Promise(r => setTimeout(r, 200));
  }

  if (emailResponse) {
    console.log('EmailJS response status:', emailResponse.status);
  } else {
    console.log('No EmailJS request captured (possible CORS or network error).');
  }

  // Wait a moment to allow UI update
  await new Promise(r => setTimeout(r, 1000));

  await browser.close();
})();

(async () => {
  try {
    console.log('Starting EmailJS test request...');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_ip5dina',
        template_id: 'template_cs3b46i',
        user_id: 'gJnY4IeY0AhdKdQQ0',
        template_params: {
          from_name: 'Automated Test',
          from_email: 'no-reply@example.com',
          message: 'This is a test message sent from an automated check to verify EmailJS integration.',
          reply_to: 'no-reply@example.com',
          to_email: 'akshithelmala@gmail.com',
          date: new Date().toLocaleDateString('en-IN'),
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    console.log('status', res.status);
    const text = await res.text();
    console.log('body:', text);
  } catch (err) {
    console.error('error', err && err.name ? err.name + ': ' + err.message : err);
    process.exit(1);
  }
})();

import emailjs from 'emailjs-com';

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this, 'YOUR_USER_ID')
    .then(() => alert('Message sent!'))
    .catch(err => alert('Failed to send message:', err));
});
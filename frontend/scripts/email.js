// Function to send email
function sendEmail(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const recaptchaToken = grecaptcha.getResponse();
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    console.log("sending email. name:::" + name
                           + "\nemail:::" + email
                           + "\nmessage:::" + message);

    fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, recaptchaToken })
    })
    .then(res => res.json())
    .then(data => {
        //TODO change logic
        if (data.success) {
            alert('Email sent!');
        } else {
            alert('Failed to send email.');
        }
    })
    .catch(err => {
        console.error(err);
        alert('Error sending email.');
    });
}

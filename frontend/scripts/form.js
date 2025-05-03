export function initFormHandlers() {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const recaptchaContainer = document.getElementById("recaptcha-container");

    function checkFormCompletion() {
        const nameFilled = nameInput.value.trim() !== "";
        const emailFilled = emailInput.value.trim() !== "";
        const messageFilled = messageInput.value.trim() !== "";

        recaptchaContainer.style.display = nameFilled && emailFilled && messageFilled ? "block" : "none";
    }

    nameInput.addEventListener("input", checkFormCompletion);
    emailInput.addEventListener("input", checkFormCompletion);
    messageInput.addEventListener("input", checkFormCompletion);

    form.onsubmit = async (event) => {
        event.preventDefault();
        const recaptchaToken = grecaptcha.getResponse();
        if (!recaptchaToken) {
            alert("Please complete the reCAPTCHA");
            return;
        }

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        try {
            const res = await fetch('http://localhost:3001/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, recaptchaToken })
            });
            const data = await res.json();

            const successMessage = document.getElementById("successMessage");
            if (data.success) {
                form.reset();
                grecaptcha.reset();
                successMessage.style.display = "block";
                successMessage.textContent = "Your message has been sent successfully!";
                setTimeout(() => successMessage.style.display = "none", 5000);
            } else {
                alert("Failed to send email.");
            }
        } catch (err) {
            console.error("Error sending email:", err);
        }
    };
}

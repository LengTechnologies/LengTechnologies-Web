export function initFormHandlers() {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const recaptchaContainer = document.getElementById("recaptcha-container");
    const API_BASE_URL = import.meta.env.PROD ? '' : import.meta.env.LOCALHOST_API_URL;

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
            const res = await fetch('/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, recaptchaToken })
            });
            const data = await res.json();

            const successMessage = document.getElementById("successMessage");
            if (data.success) {
                form.reset();
                grecaptcha.reset();
                recaptchaContainer.style.display = "none";
                successMessage.style.display = "block";
                successMessage.textContent = "Your message has been sent successfully!";
                setTimeout(() => successMessage.style.display = "none", 5000);
            } else {
                console.error("Error sending email:", error);
                successMessage.style.display = "block";
                successMessage.textContent = "There was an error sending your message.";
                successMessage.classList.remove("text-success");
                successMessage.classList.add("text-danger");
                setTimeout(() => successMessage.style.display = "none", 5000);
            }
        } catch (err) {
            console.error("Error sending email:", err);
            successMessage.style.display = "block";
            successMessage.textContent = "There was an error sending your message.";
            successMessage.classList.remove("text-success");
            successMessage.classList.add("text-danger");
            setTimeout(() => successMessage.style.display = "none", 5000);
        }
    };
}

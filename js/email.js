// Initialize EmailJS with your public key
// TODO inject public key
//emailjs.init("YOUR_PUBLIC_KEY"); // Replace 'YOUR_PUBLIC_KEY' with your actual public key

// Function to send email
function sendEmail(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    console.log("sending email. name:::" + name
                           + "\nemail:::" + email
                           + "\nmessage:::" + message);

    // Set up email parameters
    const emailParams = {
        from_name: name,
        from_email: email,
        message: message,
    };

    // Send the email using EmailJS
//    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams)
//        .then((response) => {
//            // Show success message
//            const successMessage = document.createElement("div");
//            successMessage.className = "alert alert-success mt-3";
//            successMessage.innerText = "Email sent successfully!";
//            document.getElementById("contactForm").appendChild(successMessage);
//
//            // Clear form fields
//            document.getElementById("contactForm").reset();
//
//            // Remove the success message after 5 seconds
//            setTimeout(() => {
//                successMessage.remove();
//            }, 5000);
//        })
//        .catch((error) => {
//            alert("Failed to send email. Please try again.");
//            console.error("Error:", error);
//        });
}

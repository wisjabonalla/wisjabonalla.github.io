const form = document.getElementById('contactForm');
const statusMessage = document.getElementById('form-status-message');

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    statusMessage.innerHTML = 'Sending...';
    
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            statusMessage.innerHTML = '✅ Message sent successfully! I will get back to you soon.';
            form.reset(); 
        } else {
            const result = await response.json();
            if (Object.hasOwn(result, 'errors')) {
                statusMessage.innerHTML = '❌ ' + result["errors"].map(error => error["message"]).join(", ");
            } else {
                statusMessage.innerHTML = '❌ Oops! There was an error sending your message.';
            }
        }
    } catch(error) {
        statusMessage.innerHTML = '❌ Oops! An unexpected error occurred.';
    }
}

form.addEventListener("submit", handleSubmit);
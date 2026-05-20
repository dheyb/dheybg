const filterButtons = document.querySelectorAll('.filter-btn');
const projectBoxes = document.querySelectorAll('.project-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and add to clicked one
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectBoxes.forEach(box => {
            if (filterValue === 'all' || box.getAttribute('data-category') === filterValue) {
                box.style.display = 'flex';
                // Add a small fade-in animation
                box.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                box.style.display = 'none';
            }
        });
    });
});

// Add this to your existing script.js
const downloadBtn = document.getElementById('downloadBtn');

if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Simple DOM interaction: Show a notification
        const notification = document.createElement('div');
        notification.innerHTML = "<p style='color: #b74b4b; font-size: 1.4rem; margin-top: 10px;'>Download starting...</p>";
        downloadBtn.parentElement.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
}

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop form from submitting immediately

        let isValid = true;

        // 1. Validate Full Name
        const nameInput = document.getElementById('full-name');
        if (nameInput.value.trim() === "") {
            setError(nameInput);
            isValid = false;
        } else {
            removeError(nameInput);
        }

        // 2. Validate Email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            setError(emailInput);
            isValid = false;
        } else {
            removeError(emailInput);
        }

        // 3. Validate Message
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === "") {
            setError(messageInput);
            isValid = false;
        } else {
            removeError(messageInput);
        }

        if (isValid) {
            alert("Success! Your message has been sent.");
            contactForm.reset();
        }
    });
}

function setError(input) {
    input.parentElement.classList.add('error');
}

function removeError(input) {
    input.parentElement.classList.remove('error');
}
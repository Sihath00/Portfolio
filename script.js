document.addEventListener('DOMContentLoaded', function() {
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });
    };

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get form values
        let fullName = document.getElementById('fullName').value.trim();
        let email = document.getElementById('email').value.trim();
        let phoneNumber = document.getElementById('phoneNumber').value.trim();
        let subject = document.getElementById('subject').value.trim();
        let message = document.getElementById('message').value.trim();

        // Validate form fields
        if (fullName === '') {
            alert('Please enter your full name.');
            return;
        }
        if (email === '') {
            alert('Please enter your email.');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (phoneNumber === '') {
            alert('Please enter your phone number.');
            return;
        }
        if (subject === '') {
            alert('Please enter a subject.');
            return;
        }
        if (message === '') {
            alert('Please enter your message.');
            return;
        }

        // If validation passes, send email using EmailJS
        emailjs.send("service_xrp5d3u", "template_po5hg7k", {
            from_name: fullName,
            from_email: email,
            phone_number: phoneNumber,
            subject: subject,
            message: message
        }).then(function (response) {
            alert('Message sent successfully!');
        }, function (error) {
            alert('Failed to send the message. Please try again later.');
        });
    });

    function validateEmail(email) {
        // Simple email validation regex
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }
});

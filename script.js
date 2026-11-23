// ==============================
// MOBILE NAVIGATION
// ==============================

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");


function closeMenu() {

    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}


menuToggle.addEventListener("click", () => {

    const isOpen =
        menuToggle.getAttribute("aria-expanded") !== "true";

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    navMenu.classList.toggle("open", isOpen);

});


// Close menu when a navigation link is clicked

navMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", closeMenu);

});


// Close menu with Escape key

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


// Close mobile menu when screen becomes larger

window.addEventListener("resize", () => {

    if (window.innerWidth > 650) {
        closeMenu();
    }

});


// ==============================
// AUTOMATIC COPYRIGHT YEAR
// ==============================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ==============================
// ACTIVE NAVIGATION LINK
// ==============================

const sections = document.querySelectorAll(
    "main section[id]"
);

const navLinks = document.querySelectorAll(
    ".nav-link"
);


const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") ===
                    `#${entry.target.id}`
                );

            });

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);


sections.forEach(section => {

    sectionObserver.observe(section);

});


// ==============================
// SCROLL REVEAL ANIMATION
// ==============================

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


document.querySelectorAll(".reveal").forEach(element => {

    revealObserver.observe(element);

});


// ==============================
// AUTOMATIC PROFESSIONAL TITLE
// ==============================

const roleText = document.getElementById("roleText");

const roles = [
    "Web Developer",
    "UI/UX Designer",
    "Problem Solver"
];

let roleIndex = 0;


if (!window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches) {

    setInterval(() => {

        roleIndex = (roleIndex + 1) % roles.length;

        roleText.textContent = roles[roleIndex];

    }, 2400);

}


// ==============================
// CONTACT FORM VALIDATION
// ==============================

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");


contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();


    // Check required fields

    if (!name || !email || !subject || !message) {

        showFormMessage(
            "Please complete all fields.",
            "error"
        );

        return;

    }


    // Validate email

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showFormMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;

    }


    if (message.length < 10) {

        showFormMessage(
            "Your message must contain at least 10 characters.",
            "error"
        );

        return;

    }


    // Temporary success message

    showFormMessage(
        "Your message has passed validation. Connect a backend to deliver it.",
        "success"
    );

    contactForm.reset();

});


// Reusable message function

function showFormMessage(message, type) {

    formStatus.textContent = message;

    formStatus.className = "form-status " + type;

}
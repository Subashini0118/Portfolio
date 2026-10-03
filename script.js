/* =========================================================
   SUBASHINI PORTFOLIO - MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. CURRENT YEAR
    ===================================================== */

    const yearElements = document.querySelectorAll("#year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       2. ACTIVE NAVIGATION
    ===================================================== */

    let currentPage = window.location.pathname.split("/").pop();

    // If the page is opened from the root folder
    if (currentPage === "" || currentPage === "/") {
        currentPage = "index.html";
    }

    const navigationLinks = document.querySelectorAll(".nav-links a");

    navigationLinks.forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        // Remove old active class
        link.classList.remove("active");

        // Ignore external links and CV links
        if (
            href.startsWith("http") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.includes(".pdf")
        ) {
            return;
        }

        const linkPage = href.split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       3. MOBILE MENU
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");

    if (navbar && navLinks) {

        // Create mobile menu button
        const menuButton = document.createElement("button");

        menuButton.className = "mobile-menu-button";
        menuButton.setAttribute("aria-label", "Open navigation menu");

        menuButton.innerHTML = `
            <i class="fa-solid fa-bars"></i>
        `;

        navbar.appendChild(menuButton);


        // Menu button click
        menuButton.addEventListener("click", function () {

            navLinks.classList.toggle("mobile-open");

            if (navLinks.classList.contains("mobile-open")) {

                menuButton.innerHTML = `
                    <i class="fa-solid fa-xmark"></i>
                `;

            } else {

                menuButton.innerHTML = `
                    <i class="fa-solid fa-bars"></i>
                `;

            }

        });


        // Close menu after clicking a page link
        const menuLinks = navLinks.querySelectorAll("a");

        menuLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("mobile-open");

                menuButton.innerHTML = `
                    <i class="fa-solid fa-bars"></i>
                `;

            });

        });

    }


    /* =====================================================
       4. SCROLL NAVBAR EFFECT
    ===================================================== */

    const header = document.querySelector(".navbar");

    if (header) {

        function updateNavbar() {

            if (window.scrollY > 40) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        }

        window.addEventListener("scroll", updateNavbar);

        updateNavbar();

    }


    /* =====================================================
       5. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".skill-card, " +
        ".soft-skill, " +
        ".skill-category, " +
        ".project-card, " +
        ".about-card, " +
        ".contact-card, " +
        ".timeline-item"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show-element");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.10
            }
        );


        revealElements.forEach(function (element) {

            element.classList.add("reveal-element");

            revealObserver.observe(element);

        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(function (element) {

            element.classList.add("show-element");

        });

    }


    /* =====================================================
       6. SKILL PROGRESS ANIMATION
    ===================================================== */

    const progressBars = document.querySelectorAll(".progress-bar");

    if ("IntersectionObserver" in window) {

        const progressObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const bar = entry.target;

                        const targetWidth = bar.style.width;

                        // Start from zero
                        bar.style.width = "0%";

                        // Animate to original width
                        setTimeout(function () {

                            bar.style.width = targetWidth;

                        }, 150);

                        observer.unobserve(bar);

                    }

                });

            },
            {
                threshold: 0.3
            }
        );


        progressBars.forEach(function (bar) {

            progressObserver.observe(bar);

        });

    }


    /* =====================================================
       7. SMOOTH SCROLL
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const targetElement =
                document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       8. CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                /*
                 * The form can use mailto:
                 * If you already have a mailto action
                 * in your HTML, the browser will handle it.
                 */

                const name =
                    document.querySelector("#name");

                const email =
                    document.querySelector("#email");

                const subject =
                    document.querySelector("#subject");

                const message =
                    document.querySelector("#message");


                // Basic validation
                if (
                    name &&
                    email &&
                    subject &&
                    message
                ) {

                    if (
                        name.value.trim() === "" ||
                        email.value.trim() === "" ||
                        subject.value.trim() === "" ||
                        message.value.trim() === ""
                    ) {

                        event.preventDefault();

                        alert(
                            "Please fill in all fields before sending your message."
                        );

                        return;

                    }

                }

            }
        );

    }


    /* =====================================================
       9. BACK TO TOP BUTTON
    ===================================================== */

    const backToTop =
        document.querySelector("#backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       10. BUTTON HOVER EFFECT
    ===================================================== */

    const buttons = document.querySelectorAll(
        ".primary-button, " +
        ".secondary-button, " +
        ".cv-button, " +
        ".project-button"
    );

    buttons.forEach(function (button) {

        button.addEventListener("mouseenter", function () {

            button.style.transform = "translateY(-3px)";

        });


        button.addEventListener("mouseleave", function () {

            button.style.transform = "";

        });

    });


    /* =====================================================
       11. IMAGE LOADING
    ===================================================== */

    const images = document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener("error", function () {

            image.classList.add("image-error");

        });

    });


    /* =====================================================
       12. PREVENT EMPTY LINKS FROM JUMPING
    ===================================================== */

    const emptyLinks =
        document.querySelectorAll('a[href="#"]');

    emptyLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

        });

    });


    /* =====================================================
       13. PAGE LOADED
    ===================================================== */

    document.body.classList.add("page-loaded");

});
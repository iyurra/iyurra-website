console.log("Iyurra Website Loaded Successfully 🌿");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

const heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    speed: 1200,

    autoplay: {
        delay: 4500,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    effect: "fade",

    fadeEffect: {
        crossFade: true,
    },
});
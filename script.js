console.log("Iyurra Website Loaded Successfully 🌿");

/* ===================================
   INIT — runs once all partials from
   includes.js are in the DOM
=================================== */

function initSite(){

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    /* ===================================
       THEME TOGGLE
    =================================== */

    const themeToggle = document.getElementById("themeToggle");
    const rootEl = document.documentElement;

    function setTheme(theme){
        rootEl.setAttribute("data-theme", theme);
        localStorage.setItem("iyurra-theme", theme);
        themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    themeToggle.textContent = rootEl.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";

    themeToggle.addEventListener("click", () => {
        const next = rootEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
        setTheme(next);
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

    const whyChooseSwiper = new Swiper(".whyChooseSwiper", {
        loop: true,
        speed: 800,

        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },

        pagination: {
            el: ".whyChooseSwiper .swiper-pagination",
            clickable: true,
        },
    });


    /* ===================================
       PRODUCT MODAL
    =================================== */

    const modal = document.getElementById("productModal");

    const closeModal = document.querySelector(".close-modal");

    closeModal.onclick = () => {
        modal.classList.remove("active");
    }

    window.onclick = (e) => {

        if(e.target === modal){

            modal.classList.remove("active");

        }

    };

    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const whyChooseList = document.getElementById("whyChoose");
    const mainProductImage = document.getElementById("mainProductImage");
    const nutritionTable = document.getElementById("nutritionTable");
    const directionList = document.getElementById("directionList");

    const thumbs = {
        front: document.getElementById("thumbFront"),
        back: document.getElementById("thumbBack"),
        serving: document.getElementById("thumbServing"),
        ingredients: document.getElementById("thumbIngredients"),
        nutrition: document.getElementById("thumbNutrition"),
    };

    function openProductModal(product){

        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;

        whyChooseList.innerHTML = "";

        if(product.whyChoose && product.whyChoose.length){

            const heading = document.createElement("h4");

            heading.textContent = `Why Choose ${product.name}?`;

            const list = document.createElement("ul");

            list.className = "why-choose-items";

            product.whyChoose.forEach(point => {

                const li = document.createElement("li");

                li.textContent = point;

                list.appendChild(li);

            });

            whyChooseList.appendChild(heading);
            whyChooseList.appendChild(list);

        }

        mainProductImage.src = product.images.front;

        Object.keys(thumbs).forEach(key => {

            const thumb = thumbs[key];

            thumb.src = product.images[key];

            thumb.classList.toggle("active", key === "front");

            thumb.onclick = () => {

                mainProductImage.src = product.images[key];

                Object.values(thumbs).forEach(t => t.classList.remove("active"));

                thumb.classList.add("active");

            };

        });

        nutritionTable.innerHTML = "";

        Object.entries(product.nutrition).forEach(([label, value]) => {

            const row = document.createElement("div");

            row.className = "nutrition-row";

            row.innerHTML = `<span class="nutrition-label">${label}</span><span class="nutrition-value">${value}</span>`;

            nutritionTable.appendChild(row);

        });

        directionList.innerHTML = "";

        product.directions.forEach(step => {

            const li = document.createElement("li");

            li.textContent = step;

            directionList.appendChild(li);

        });

        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === "images"));
        document.querySelectorAll(".tab-content").forEach(tab => tab.classList.toggle("active", tab.id === "images"));

        modal.classList.add("active");

    }

    document.querySelectorAll(".tab-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));

            btn.classList.add("active");

            document.getElementById(btn.dataset.tab).classList.add("active");

        });

    });

    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {

        card.addEventListener("click", () => {

            const key = card.dataset.product;

            const product = products[key];

            if(product){

                openProductModal(product);

            }

        });

    });

    document.querySelectorAll(".product-btn").forEach(btn => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            if(btn.getAttribute("href") === "#"){

                e.preventDefault();

            }

        });

    });

    AOS.init({
        duration: 1000,
        once: true
    });

}

document.addEventListener("includes:loaded", initSite);

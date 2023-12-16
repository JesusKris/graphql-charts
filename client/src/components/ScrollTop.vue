<template>
    <div ref="scrollTopButton" class="invisible scrollbuttondiv">
        <div class>
            <i @click="scrollToTop" class="scrollbutton bi bi-chevron-double-up"></i>
        </div>
    </div>
</template>


<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap/dist/js/bootstrap.js"

export default {
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },

    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },

    methods: {
        handleScroll() {
            const scrollBtn = this.$refs.scrollTopButton;

            if (window.scrollY > 200) {
                scrollBtn.classList.remove("invisible");
            } else {
                scrollBtn.classList.add("invisible");
            }
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
    },
};
</script>


<style>
@import "@/assets/css/base.css";

.scrollbuttondiv {
    position: fixed;
    bottom: 20px;
    right: 25px;
    z-index: 10;
    transition: 0.5s;
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s linear;
}

.scrollbutton {
    color: rgba(218, 11, 149, 0.78);
    cursor: pointer;
    font-size: 50px;
    transition: 0.2s;
}

.scrollbutton:hover {
    opacity: 0.7;
    cursor: pointer;
    transition: 0.2s;
}

.invisible {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 2s, opacity 0.3s linear;
}
</style>
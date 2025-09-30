document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".toggle-button").forEach((button) => {
        button.addEventListener("click", () => {
            const expandedText = button.previousElementSibling; // expanded text from div in save.js
            const isHidden = expandedText.hasAttribute("hidden");

            if (isHidden) {
                expandedText.removeAttribute("hidden");
                button.setAttribute("aria-expanded", "true");
                button.textContent = "Read Less ▲";
            } else {
                expandedText.setAttribute("hidden", "");
                button.setAttribute("aria-expanded", "false");
                button.textContent = "Read More ▼";
            }
        });
    });
});

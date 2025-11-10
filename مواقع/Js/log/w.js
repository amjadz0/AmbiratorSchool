// ملف الثيمات + الأنميشن ✨

// تغيير الثيم حسب الاختيار 
function setTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem("preferredTheme", themeName);
}

// تحميل الثيم المحفوظ عند فتح الصفحة 
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("preferredTheme") || "theme-light-male";
    document.body.className = savedTheme;
    const themeSelect = document.querySelector("select[onchange*=setTheme]");
    if (themeSelect) themeSelect.value = savedTheme;
});

// كلاس أنميشن عند تحميل الصفحة 
window.addEventListener("load", () => { document.body.classList.add("fade-in"); });
// 📁 الرائسية.js

// ------------------ عرض المحتوى في التابات ------------------
function showTab(tabName) {
    const tabContent = document.getElementById('tab-content');
    tabContent.classList.remove('fade-in');
    void tabContent.offsetWidth; // Force reflow to restart animation

    let content = '';
    switch (tabName) {
        case 'rules':
            content = `<h2>📘 قواعدنا</h2><ul><li>الاحترام المتبادل بين الطلاب والمعلمين</li><li>الالتزام بمواعيد الدخول والخروج</li><li>عدم مشاركة الحسابات</li><li>المشاركة الفعالة في الأنشطة</li><li>عدم نشر أي محتوى غير تعليمي</li></ul>`;
            break;
        case 'goal':
            content = `<h2>🎯 هدف المدرسة</h2><p>نسعى لتوفير بيئة تعليمية إلكترونية تفاعلية تسهّل على الطالب فهم واستيعاب المنهج اليمني بأساليب حديثة وممتعة.</p>`;
            break;
        case 'contact':
            content = `<h2>📞 أرقام التواصل</h2><p>رقم الهاتف: 777777777</p><p>البريد الإلكتروني: school@yemen.edu.ye</p><div class="social-icons">${generateSocialIcons()}</div>`;
            break;
        case 'about':
            content = `<h2>⚔️ من نحن</h2><p>نحن فريق من المبدعين الحالمين، اجتمعنا لصنع تجربة تعليمية لا تُنسى. نحمل على أكتافنا راية التغيير، وبأيدينا نبني مستقبلًا مليئًا بالعلم والمعرفة.</p>`;
            break;
        case 'features':
            content = `<h2>🚀 مميزاتنا</h2><ul><li>📚 معمل محاكاة افتراضي</li><li>🎮 ألعاب تعليمية تفاعلية</li><li>✨ رسوم متحركة لشرح المفاهيم</li><li>🧠 تحليل مستوى الطالب تلقائيًا</li><li>📱 دعم كامل للهاتف والأجهزة اللوحية</li></ul>`;
            break;
        default:
            content = '<h2>مرحبا بكم في منصتنا</h2><p>اختر أحد الأقسام من الأسفل لمعرفة المزيد عنا.</p>';
    }
    tabContent.innerHTML = content;
    tabContent.classList.add('fade-in');
}

function generateSocialIcons() {
    const platforms = ['facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'snapchat', 'tiktok', 'pinterest', 'reddit', 'discord', 'telegram', 'whatsapp', 'wechat', 'tumblr', 'github'];
    return platforms.map(name => `<img src="icons/${name}.svg" alt="${name}" title="${name}" style="width:30px; margin:5px;" />`).join('');
}


// ------------------ تغيير الثيم ------------------
const ALL_THEMES = ['default', 'dark', 'pink', 'blueanime', 'theme1', 'theme2', 'theme3', 'theme4', 'theme5', 'theme6', 'theme7', 'theme8', 'theme9'];

function setTheme(themeName) {
    document.body.classList.remove(...ALL_THEMES);
    if (ALL_THEMES.includes(themeName)) {
        document.body.classList.add(themeName);
        localStorage.setItem('selectedTheme', themeName);
    }
}

// ------------------ تغيير اللغة وتحديث النصوص ------------------
function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.className = 'lang-' + lang;
    localStorage.setItem('selectedLanguage', lang);
    updateTexts(lang);
}

function updateTexts(lang) {
    const texts = {
        ar: { title: "مرحبًا بك في منصتنا التعليمية", login: "تسجيل الدخول", signup: "إنشاء حساب", rules: "📘 قواعدنا", goal: "🎯 هدف المدرسة", contact: "📞 أرقام التواصل", about: "⚔️ من نحن", features: "🚀 مميزاتنا", themeBtn: "اختر الثيم 🎨" },
        en: { title: "Welcome to Our Educational Platform", login: "Login", signup: "Sign Up", rules: "📘 Our Rules", goal: "🎯 School Goals", contact: "📞 Contact", about: "⚔️ About Us", features: "🚀 Our Features", themeBtn: "Select Theme 🎨" },
        fr: { title: "Bienvenue sur notre plateforme éducative", login: "Connexion", signup: "Créer un compte", rules: "📘 Nos Règles", goal: "🎯 Objectifs de l'école", contact: "📞 Contact", about: "⚔️ Qui sommes-nous", features: "🚀 Nos Fonctionnalités", themeBtn: "Choisir le thème 🎨" },
        es: { title: "Bienvenido a nuestra plataforma educativa", login: "Iniciar sesión", signup: "Registrarse", rules: "📘 Nuestras Reglas", goal: "🎯 Objetivos", contact: "📞 Contacto", about: "⚔️ Sobre nosotros", features: "🚀 Funcionalidades", themeBtn: "Seleccionar tema 🎨" },
        it: { title: "Benvenuto nella nostra piattaforma educativa", login: "Accedi", signup: "Registrati", rules: "📘 Regole", goal: "🎯 Obiettivi scolastici", contact: "📞 Contatti", about: "⚔️ Chi siamo", features: "🚀 Caratteristiche", themeBtn: "Seleziona il tema 🎨" },
        ja: { title: "教育プラットフォームへようこそ", login: "ログイン", signup: "サインアップ", rules: "📘 規則", goal: "🎯 目標", contact: "📞 連絡先", about: "⚔️ 私たちについて", features: "🚀 特徴", themeBtn: "テーマを選択 🎨" },
        ko: { title: "교육 플랫폼에 오신 것을 환영합니다", login: "로그인", signup: "가입하기", rules: "📘 규칙", goal: "🎯 목표", contact: "📞 연락처", about: "⚔️ 소개", features: "🚀 기능", themeBtn: "테마 선택 🎨" },
        zh: { title: "欢迎来到我们的教育平台", login: "登录", signup: "注册", rules: "📘 规则", goal: "🎯 目标", contact: "📞 联系方式", about: "⚔️ 关于我们", features: "🚀 功能", themeBtn: "选择主题 🎨" }
    };

    const t = texts[lang] || texts['ar'];
    document.querySelector('h1').textContent = t.title;
    document.querySelectorAll('.img-btn span')[0].textContent = t.login;
    document.querySelectorAll('.img-btn span')[1].textContent = t.signup;
    document.querySelector('#themeBtn').textContent = t.themeBtn;

    const tabs = document.querySelectorAll('.info-tabs button');
    tabs[0].textContent = t.rules;
    tabs[1].textContent = t.goal;
    tabs[2].textContent = t.contact;
    tabs[3].textContent = t.about;
    tabs[4].textContent = t.features;
}


// ------------------ تحميل الإعدادات عند فتح الصفحة ------------------
window.addEventListener('DOMContentLoaded', () => {
    // تحميل الثيم واللغة المحفوظة
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    const savedLang = localStorage.getItem('selectedLanguage') || 'ar';
    setTheme(savedTheme);
    setLanguage(savedLang);

    // عرض التاب الافتراضي
    showTab('features');

    // تحديث قائمة اختيار اللغة بالقيمة المحفوظة
    const langSelect = document.querySelector('select[onchange*="setLanguage"]');
    if (langSelect) langSelect.value = savedLang;

    // ----- تشغيل قائمة اختيار الثيم الجديدة -----
    const themeBtn = document.getElementById('themeBtn');
    const themeList = document.getElementById('themeList');
    const themeOptions = themeList.querySelectorAll('button');

    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = themeBtn.getAttribute('aria-expanded') === 'true';
        themeBtn.setAttribute('aria-expanded', !isExpanded);
        themeList.classList.toggle('show');
    });

    themeOptions.forEach(button => {
        button.addEventListener('click', () => {
            const themeName = button.getAttribute('data-theme');
            setTheme(themeName);
        });
    });

    document.addEventListener('click', () => {
        if (themeList.classList.contains('show')) {
            themeBtn.setAttribute('aria-expanded', 'false');
            themeList.classList.remove('show');
        }
    });
});
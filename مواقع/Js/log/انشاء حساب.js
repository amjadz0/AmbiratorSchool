// ملف JavaScript كامل يحتوي على الترجمات + المحافظات + المديريات + حفظ اللغة
const translations = {
    ar: {
        signup_title: "إنشاء الحساب",
        first_name: "الاسم",
        birth_place_date: "تاريخ ومكان الميلاد",
        governorate: "المحافظة",
        district: "المديرية",
        school: "اسم المدرسة",
        phone: "أرقام التواصل",
        email: "البريد الإلكتروني",
        guardian_number: "رقم ولي الأمر",
        gender: "الجنس",
        male: "ذكر",
        female: "أنثى",
        dream_major: "التخصص الذي تحلم به",
        submit: "تم",
        back: "الرجوع",
        has_account: "امتلك حساب",
        // Placeholders
        placeholder_first_name: "اسمك الأول",
        placeholder_father_name: "الاب",
        placeholder_grandfather_name: "الجد",
        placeholder_last_name: "اللقب",
        placeholder_school: "اسم المدرسة",
        placeholder_phone1: "رقم التلفون",
        placeholder_phone2: "رقم آخر",
        placeholder_email: "البريد الإلكتروني",
        placeholder_guardian_number: "رقم ولي الأمر",
        placeholder_dream_major: "التخصص الذي تحلم به",
        // Select Options
        select_governorate: "اختر محافظة",
        select_district: "اختر المديرية",
        // Theme Options
        theme_dark_male: "ثيم داكن - ذكور",
        theme_dark_female: "ثيم داكن - إناث",
        theme_light_male: "ثيم فاتح - ذكور",
        theme_light_female: "ثيم فاتح - إناث",
        // Language Options
        lang_ar: "🇾🇪 العربية",
        lang_en: "🇺🇸 English",
        lang_ja: "🇯🇵 日本語",
        lang_ko: "🇰🇷 한국어",
        lang_zh: "🇨🇳 中文",
        lang_es: "🇪🇸 Español",
        lang_fr: "🇫🇷 Français",
        lang_it: "🇮🇹 Italiano"
    },
    en: {
        signup_title: "Sign Up",
        first_name: "Full Name",
        birth_place_date: "Birth Date & Place",
        governorate: "Governorate",
        district: "District",
        school: "School Name",
        phone: "Contact Numbers",
        email: "Email",
        guardian_number: "Guardian Phone",
        gender: "Gender",
        male: "Male",
        female: "Female",
        dream_major: "Dream Major",
        submit: "Submit",
        back: "Back",
        has_account: "Already have an account",
        // Placeholders
        placeholder_first_name: "First Name",
        placeholder_father_name: "Father's Name",
        placeholder_grandfather_name: "Grandfather's Name",
        placeholder_last_name: "Last Name",
        placeholder_school: "School Name",
        placeholder_phone1: "Phone Number",
        placeholder_phone2: "Another Number",
        placeholder_email: "Email Address",
        placeholder_guardian_number: "Guardian's Number",
        placeholder_dream_major: "Your Dream Major",
        // Select Options
        select_governorate: "Select Governorate",
        select_district: "Select District",
        // Theme Options
        theme_dark_male: "Dark Theme - Male",
        theme_dark_female: "Dark Theme - Female",
        theme_light_male: "Light Theme - Male",
        theme_light_female: "Light Theme - Female",
        // Language Options
        lang_ar: "🇾🇪 العربية",
        lang_en: "🇺🇸 English",
        lang_ja: "🇯🇵 日本語",
        lang_ko: "🇰🇷 한국어",
        lang_zh: "🇨🇳 中文",
        lang_es: "🇪🇸 Español",
        lang_fr: "🇫🇷 Français",
        lang_it: "🇮🇹 Italiano"
    },
    ja: {
        signup_title: "アカウント作成",
        first_name: "氏名",
        birth_place_date: "生年月日と出生地",
        governorate: "県",
        district: "地区",
        school: "学校名",
        phone: "連絡先",
        email: "メールアドレス",
        guardian_number: "保護者の電話番号",
        gender: "性別",
        male: "男性",
        female: "女性",
        dream_major: "志望専攻",
        submit: "登録",
        back: "戻る",
        has_account: "すでにアカウントを持っている",
        // Placeholders
        placeholder_first_name: "名前",
        placeholder_father_name: "父の名前",
        placeholder_grandfather_name: "祖父の名前",
        placeholder_last_name: "苗字",
        placeholder_school: "学校名",
        placeholder_phone1: "電話番号",
        placeholder_phone2: "別の番号",
        placeholder_email: "メールアドレス",
        placeholder_guardian_number: "保護者の番号",
        placeholder_dream_major: "志望する専攻",
        // Select Options
        select_governorate: "県を選択",
        select_district: "地区を選択",
        // Theme Options
        theme_dark_male: "ダークテーマ - 男性",
        theme_dark_female: "ダークテーマ - 女性",
        theme_light_male: "ライトテーマ - 男性",
        theme_light_female: "ライトテーマ - 女性",
        // Language Options
        lang_ar: "🇾🇪 العربية",
        lang_en: "🇺🇸 English",
        lang_ja: "🇯🇵 日本語",
        lang_ko: "🇰🇷 한국어",
        lang_zh: "🇨🇳 中文",
        lang_es: "🇪🇸 Español",
        lang_fr: "🇫🇷 Français",
        lang_it: "🇮🇹 Italiano"
    },
    ko: {
        signup_title: "회원가입",
        first_name: "이름",
        birth_place_date: "생년월일 및 출생지",
        governorate: "도",
        district: "구",
        school: "학교명",
        phone: "연락처",
        email: "이메일",
        guardian_number: "보호자 번호",
        gender: "성별",
        male: "남성",
        female: "여성",
        dream_major: "희망 전공",
        submit: "제출",
        back: "뒤로가기",
        has_account: "이미 계정이 있습니다",
        // Placeholders
        placeholder_first_name: "이름",
        placeholder_father_name: "아버지 성함",
        placeholder_grandfather_name: "할아버지 성함",
        placeholder_last_name: "성",
        placeholder_school: "학교 이름",
        placeholder_phone1: "전화번호",
        placeholder_phone2: "다른 번호",
        placeholder_email: "이메일 주소",
        placeholder_guardian_number: "보호자 번호",
        placeholder_dream_major: "희망 전공",
        // Select Options
        select_governorate: "도 선택",
        select_district: "구 선택",
        // Theme Options
        theme_dark_male: "다크 테마 - 남성",
        theme_dark_female: "다크 테마 - 여성",
        theme_light_male: "라이트 테마 - 남성",
        theme_light_female: "라이트 테마 - 여성",
        // Language Options
        lang_ar: "🇾🇪 العربية",
        lang_en: "🇺🇸 English",
        lang_ja: "🇯🇵 日本語",
        lang_ko: "🇰🇷 한국어",
        lang_zh: "🇨🇳 中文",
        lang_es: "🇪🇸 Español",
        lang_fr: "🇫🇷 Français",
        lang_it: "🇮🇹 Italiano"
    },
    zh: {
        signup_title: "注册账户",
        first_name: "姓名",
        birth_place_date: "出生日期与地点",
        governorate: "省",
        district: "区",
        school: "学校名称",
        phone: "联系电话",
        email: "电子邮件",
        guardian_number: "监护人电话",
        gender: "性别",
        male: "男",
        female: "女",
        dream_major: "理想专业",
        submit: "提交",
        back: "返回",
        has_account: "已有账户",
        // Placeholders
        placeholder_first_name: "名字",
        placeholder_father_name: "父亲姓名",
        placeholder_grandfather_name: "祖父姓名",
        placeholder_last_name: "姓氏",
        placeholder_school: "学校名称",
        placeholder_phone1: "电话号码",
        placeholder_phone2: "另一个号码",
        placeholder_email: "电子邮箱地址",
        placeholder_guardian_number: "监护人电话",
        placeholder_dream_major: "你的理想专业",
        // Select Options
        select_governorate: "选择省份",
        select_district: "选择区",
        // Theme Options
        theme_dark_male: "深色主题 - 男性",
        theme_dark_female: "深色主题 - 女性",
        theme_light_male: "浅色主题 - 男性",
        theme_light_female: "浅色主题 - 女性",
        // Language Options
        lang_ar: "🇾🇪 العربية",
        lang_en: "🇺🇸 English",
        lang_ja: "🇯🇵 日本語",
        lang_ko: "🇰🇷 한국어",
        lang_zh: "🇨🇳 中文",
        lang_es: "🇪🇸 Español",
        lang_fr: "🇫🇷 Français",
        lang_it: "🇮🇹 Italiano"
    },
    es: {
        signup_title: "Crear cuenta",
        first_name: "Nombre completo",
        birth_place_date: "Fecha y lugar de nacimiento",
        governorate: "Provincia",
        district: "Distrito",
        school: "Nombre de la escuela",
        phone: "Teléfonos de contacto",
        email: "Correo electrónico",
        guardian_number: "Teléfono del tutor",
        gender: "Género",
        male: "Hombre",
        female: "Mujer",
        dream_major: "Especialidad soñada",
        submit: "Enviar",
        back: "Atrás",
        has_account: "Ya tengo una cuenta",
        // Placeholders
        placeholder_first_name: "Nombre",
        placeholder_father_name: "Nombre del padre",
        placeholder_grandfather_name: "Nombre del abuelo",
        placeholder_last_name: "Apellido",
        placeholder_school: "Nombre de la escuela",
        placeholder_phone1: "Número de teléfono",
        placeholder_phone2: "Otro número",
        placeholder_email: "Dirección de correo electrónico",
        placeholder_guardian_number: "Número del tutor",
        placeholder_dream_major: "Tu especialidad soñada",
        // Select Options
        select_governorate: "Seleccionar provincia",
        select_district: "Seleccionar distrito",
        // Theme Options
        theme_dark_male: "Tema oscuro - Hombre",
        theme_dark_female: "Tema oscuro - Mujer",
        theme_light_male: "Tema claro - Hombre",
        theme_light_female: "Tema claro - Mujer",
        // Language Options
        lang_ar: "🇾🇪 العربية",
        lang_en: "🇺🇸 English",
        lang_ja: "🇯🇵 日本語",
        lang_ko: "🇰🇷 한국어",
        lang_zh: "🇨🇳 中文",
        lang_es: "🇪🇸 Español",
        lang_fr: "🇫🇷 Français",
        lang_it: "🇮🇹 Italiano"
    },
    fr: {
        signup_title: "Créer un compte",
        first_name: "Nom complet",
        birth_place_date: "Date et lieu de naissance",
        governorate: "Gouvernorat",
        district: "District",
        school: "Nom de l'école",
        phone: "Numéros de contact",
        email: "Email",
        guardian_number: "Téléphone du tuteur",
        gender: "Genre",
        male: "Homme",
        female: "Femme",
        dream_major: "Spécialité rêvée",
        submit: "Valider",
        back: "Retour",
        has_account: "J'ai déjà un compte",
        // Placeholders
        placeholder_first_name: "Prénom",
        placeholder_father_name: "Nom du père",
        placeholder_grandfather_name: "Nom du grand-père",
        placeholder_last_name: "Nom de famille",
        placeholder_school: "Nom de l'école",
        placeholder_phone1: "Numéro de téléphone",
        placeholder_phone2: "Autre numéro",
        placeholder_email: "Adresse e-mail",
        placeholder_guardian_number: "Numéro du tuteur",
        placeholder_dream_major: "Votre spécialité rêvée",
        // Select Options
        select_governorate: "Sélectionner le gouvernorat",
        select_district: "Sélectionner le district",
        // Theme Options
        theme_dark_male: "Thème sombre - Homme",
        theme_dark_female: "Thème sombre - Femme",
        theme_light_male: "Thème clair - Homme",
        theme_light_female: "Thème clair - Femme",
        // Language Options
        lang_ar: "🇾🇪 العربية",
        lang_en: "🇺🇸 English",
        lang_ja: "🇯🇵 日本語",
        lang_ko: "🇰🇷 한국어",
        lang_zh: "🇨🇳 中文",
        lang_es: "🇪🇸 Español",
        lang_fr: "🇫🇷 Français",
        lang_it: "🇮🇹 Italiano"
    },
    it: {
        signup_title: "Crea un account",
        first_name: "Nome completo",
        birth_place_date: "Data e luogo di nascita",
        governorate: "Provincia",
        district: "Distretto",
        school: "Nome della scuola",
        phone: "Numeri di contatto",
        email: "Email",
        guardian_number: "Numero del tutore",
        gender: "Genere",
        male: "Maschio",
        female: "Femmina",
        dream_major: "Specializzazione desiderata",
        submit: "Invia",
        back: "Indietro",
        has_account: "Hai già un account",
        // Placeholders
        placeholder_first_name: "Nome",
        placeholder_father_name: "Nome del padre",
        placeholder_grandfather_name: "Nome del nonno",
        placeholder_last_name: "Cognome",
        placeholder_school: "Nome della scuela",
        placeholder_phone1: "Numero di telefono",
        placeholder_phone2: "Un altro numero",
        placeholder_email: "Indirizzo email",
        placeholder_guardian_number: "Numero del tutore",
        placeholder_dream_major: "La tua specializzazione desiderata",
        // Select Options
        select_governorate: "Seleziona la provincia",
        select_district: "Seleziona il distretto",
        // Theme Options
        theme_dark_male: "Tema scuro - Maschio",
        theme_dark_female: "Tema scuro - Femmina",
        theme_light_male: "Tema chiaro - Maschio",
        theme_light_female: "Tema chiaro - Femmina",
        // Language Options
        lang_ar: "🇾🇪 العربية",
        lang_en: "🇺🇸 English",
        lang_ja: "🇯🇵 日本語",
        lang_ko: "🇰🇷 한국어",
        lang_zh: "🇨🇳 中文",
        lang_es: "🇪🇸 Español",
        lang_fr: "🇫🇷 Français",
        lang_it: "🇮🇹 Italiano"
    }
};

function loadLanguage(lang) {
    const words = translations[lang];
    if (!words) return;

    // ترجمة العناصر ذات السمة data-translate
    document.querySelectorAll("[data-translate]").forEach((el) => {
        const key = el.getAttribute("data-translate");
        if (words[key]) el.innerHTML = words[key];
    });

    // ترجمة حقول placeholder
    document.querySelectorAll("[data-translate-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-translate-placeholder");
        if (words[key]) el.placeholder = words[key];
    });

    // ترجمة نصوص خيارات القوائم المنسدلة
    document.querySelectorAll("option[data-translate]").forEach((el) => {
        const key = el.getAttribute("data-translate");
        if (words[key]) el.textContent = words[key];
    });

    // تعيين خصائص اللغة والاتجاه
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    // حفظ اللغة المفضلة
    localStorage.setItem("preferredLang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("preferredLang") || "ar";
    document.getElementById("langSelect").value = savedLang;
    loadLanguage(savedLang);
    document.getElementById("langSelect").addEventListener("change", function() {
        loadLanguage(this.value);
    });
});

const districtsData = {
    "صنعاء": [
        "سنحان",
        "بلاد الروس",
        "بني مطر",
        "الحيمة الداخلية",
        "الحيمة الخارجية",
        "نهم",
        "أرحب"
    ],
    "أمانة العاصمة": [
        "الوحدة",
        "التحرير",
        "معين",
        "الثورة",
        "السبعين",
        "شعوب",
        "الصافية",
        "سعوان"
    ],
    "عدن": [
        "كريتر",
        "خور مكسر",
        "المنصورة",
        "الشيخ عثمان",
        "دار سعد",
        "التواهي",
        "المعلا",
        "البريقة"
    ],
    "تعز": [
        "القاهرة",
        "صالة",
        "المظفر",
        "المسراخ",
        "مشرعة وحدنان",
        "ماوية",
        "الشمايتين",
        "جبل حبشي"
    ],
    "الحديدة": [
        "الحديدة",
        "الزيدية",
        "المنصورية",
        "التحيتا",
        "الخوخة",
        "زبيد",
        "بيت الفقيه",
        "حيس"
    ],
    "إب": [
        "إب",
        "يريم",
        "السدة",
        "النادرة",
        "القفر",
        "المخادر",
        "الرضمة",
        "حزم العدين"
    ],
    "ذمار": [
        "ذمار", "ميفعة عنس", "عنس", "وصاب العالي", "وصاب السافل", "جهران"
    ],
    "عمران": ["عمران", "ريدة", "خمر", "مسور", "ثلا", "حرف سفيان"],
    "صعدة": ["صعدة", "سحار", "مجز", "منبه", "رازح", "غمر", "كتاف"],
    "حجة": ["حجة", "عبس", "كشر", "بكيل المير", "وشحة", "الشاهل", "المغربة"],
    "المحويت": ["المحويت", "الرجم", "الخبت", "حفاش", "المدينة", "ملحان"],
    "ريمة": ["الجعفرية", "بلاد الطعام", "كسمة", "السلفية", "مزهر", "الجعونية"],
    "البيضاء": ["البيضاء", "السوادي", "الزاهر", "الطفة", "ولد ربيع", "مكيراس"],
    "الضالع": ["الضالع", "الحصين", "جُبن", "دمت", "قَعطبة", "الأزارق"],
    "لحج": ["الحوطة", "تبن", "طور الباحة", "المسيمير", "المقاطرة", "المضاربة"],
    "ابين": ["زنجبار", "خنفر", "لودر", "المحفد", "أحور", "سباح"],
    "شبوة": ["عتق", "بيحان", "عسيلان", "نُصاب", "جردان", "الصعيد", "ميفعة"],
    "حضرموت": ["المكلا", "الشحر", "غيل باوزير", "تريم", "سيئون", "ساه", "القطن"],
    "المهرة": ["الغيضة", "سيحوت", "قشن", "حوف", "حصوين", "منعر"],
    "مارب": ["مارب", "صرواح", "مدغل", "العبدية", "رحبة", "حريب"],
    "الجوف": ["الحزم", "الزاهر", "المطمة", "برط العنان", "خب والشعف", "الغيل"],
    "سقطرى": ["حديبو", "قلنسية", "عبد الكوري"]
};

const governorateSelect = document.getElementById("governorate");
const districtSelect = document.getElementById("district");

window.addEventListener("DOMContentLoaded", () => {
    for (let gov in districtsData) {
        const opt = document.createElement("option");
        opt.value = gov;
        opt.textContent = gov;
        // إضافة سمة data-translate للترجمة
        opt.setAttribute("data-translate", `gov_${gov.replace(/\s+/g, '_')}`);
        governorateSelect.appendChild(opt);
    }
});

governorateSelect.addEventListener("change", function() {
    const selectedGov = this.value;
    const districts = districtsData[selectedGov] || [];
    districtSelect.innerHTML = '<option disabled selected data-translate="select_district">اختر المديرية</option>';
    districts.forEach(d => {
        const option = document.createElement("option");
        option.value = d;
        option.textContent = d;
        // إضافة سمة data-translate للترجمة
        option.setAttribute("data-translate", `dist_${d.replace(/\s+/g, '_')}`);
        districtSelect.appendChild(option);
    });
    // إعادة تحميل اللغة لترجمة الخيارات المضافة حديثاً
    const currentLang = localStorage.getItem("preferredLang") || "ar";
    loadLanguage(currentLang);
});

function setTheme(themeClass) {
    const body = document.body;
    const allThemes = [
        'theme-dark-male',
        'theme-dark-female',
        'theme-light-male',
        'theme-light-female',
        'theme-dark',
        'theme-light',
        'theme-pink',
        'theme-blue-anime'
    ];
    allThemes.forEach(cls => body.classList.remove(cls));
    body.classList.add(themeClass);
    localStorage.setItem('selectedTheme', themeClass);
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-dark-male';
    const savedLang = localStorage.getItem('preferredLang') || 'ar'; // استخدام اللغة المحفوظة
    setTheme(savedTheme);
    // إعادة تحديد القوائم
    const themeSelect = document.querySelector('select[onchange*="setTheme"]');
    if (themeSelect) themeSelect.value = savedTheme;
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = savedLang;
});
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
        has_account: "امتلك حساب"
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
        has_account: "Already have an account"
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
        has_account: "すでにアカウントを持っている"
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
        has_account: "이미 계정이 있습니다"
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
        has_account: "已有账户"
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
        has_account: "Ya tengo una cuenta"
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
        has_account: "J'ai déjà un compte"
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
        has_account: "Hai già un account"
    }
};

function loadLanguage(lang) {
    const words = translations[lang];
    if (!words) return;

    document.querySelectorAll("[data-translate]").forEach((el) => { const key = el.getAttribute("data-translate"); if (words[key]) el.innerHTML = words[key]; });

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("preferredLang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("preferredLang") || "ar";
    document.getElementById("langSelect").value = savedLang;
    loadLanguage(savedLang);

    document.getElementById("langSelect").addEventListener("change", function() { loadLanguage(this.value); });
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
        governorateSelect.appendChild(opt);
    }
});

governorateSelect.addEventListener("change", function() {
    const selectedGov = this.value;
    const districts = districtsData[selectedGov] || [];
    districtSelect.innerHTML = '< option disabled selected > اختر المديرية < /option>';
    districts.forEach(d => {
        const option = document.createElement("option");
        option.value = d;
        option.textContent = d;
        districtSelect.appendChild(option);
    });
});
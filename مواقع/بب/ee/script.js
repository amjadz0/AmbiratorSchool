    // --- الترجمات ---
    const translations = {
        ar: {
            level: "المستوى",
            competitions: "المسابقات",
            assignments: "الواجبات",
            tests: "الاختبارات",
            library: "المكتبة",
            teacher: "الأستاذ",
            university: "الجامعة",
            contact: "تواصل بنا",
            schedule: "الجدول",
            download: "التحميل",
            settings: "الإعدادات",
            news: "الأخبار",
            home: "الرئيسية",
            class: "الفصل",
            account: "الحساب",
            door1: "الباب 1",
            door2: "الباب 2",
            door3: "الباب 3",
            door4: "الباب 4",
            door5: "الباب 5",
            door6: "الباب 6",
            door7: "الباب 7",
            door8: "الباب 8",
        },
        en: {
            level: "Level",
            competitions: "Competitions",
            assignments: "Assignments",
            tests: "Tests",
            library: "Library",
            teacher: "Teacher",
            university: "University",
            contact: "Contact Us",
            schedule: "Schedule",
            download: "Download",
            settings: "Settings",
            news: "News",
            home: "Home",
            class: "Class",
            account: "Account",
            door1: "Door 1",
            door2: "Door 2",
            door3: "Door 3",
            door4: "Door 4",
            door5: "Door 5",
            door6: "Door 6",
            door7: "Door 7",
            door8: "Door 8",
        },
        jp: {
            level: "レベル",
            competitions: "コンペティション",
            assignments: "課題",
            tests: "テスト",
            library: "ライブラリ",
            teacher: "教師",
            university: "大学",
            contact: "お問い合わせ",
            schedule: "スケジュール",
            download: "ダウンロード",
            settings: "設定",
            news: "ニュース",
            home: "ホーム",
            class: "クラス",
            account: "アカウント",
            door1: "ドア 1",
            door2: "ドア 2",
            door3: "ドア 3",
            door4: "ドア 4",
            door5: "ドア 5",
            door6: "ドア 6",
            door7: "ドア 7",
            door8: "ドア 8",
        },
        kr: {
            level: "레벨",
            competitions: "경쟁",
            assignments: "과제",
            tests: "시험",
            library: "도서관",
            teacher: "교사",
            university: "대학",
            contact: "문의하기",
            schedule: "일정",
            download: "다운로드",
            settings: "설정",
            news: "뉴스",
            home: "홈",
            class: "클래스",
            account: "계정",
            door1: "문 1",
            door2: "문 2",
            door3: "문 3",
            door4: "문 4",
            door5: "문 5",
            door6: "문 6",
            door7: "문 7",
            door8: "문 8",
        },
        cn: {
            level: "级别",
            competitions: "比赛",
            assignments: "作业",
            tests: "测试",
            library: "图书馆",
            teacher: "教师",
            university: "大学",
            contact: "联系我们",
            schedule: "时间表",
            download: "下载",
            settings: "设置",
            news: "新闻",
            home: "主页",
            class: "班级",
            account: "账户",
            door1: "门 1",
            door2: "门 2",
            door3: "门 3",
            door4: "门 4",
            door5: "门 5",
            door6: "门 6",
            door7: "门 7",
            door8: "门 8",
        },
        es: {
            level: "Nivel",
            competitions: "Competiciones",
            assignments: "Asignaciones",
            tests: "Pruebas",
            library: "Biblioteca",
            teacher: "Profesor",
            university: "Universidad",
            contact: "Contáctanos",
            schedule: "Horario",
            download: "Descargar",
            settings: "Configuraciones",
            news: "Noticias",
            home: "Inicio",
            class: "Clase",
            account: "Cuenta",
            door1: "Puerta 1",
            door2: "Puerta 2",
            door3: "Puerta 3",
            door4: "Puerta 4",
            door5: "Puerta 5",
            door6: "Puerta 6",
            door7: "Puerta 7",
            door8: "Puerta 8",
        },
        fr: {
            level: "Niveau",
            competitions: "Compétitions",
            assignments: "Devoirs",
            tests: "Tests",
            library: "Bibliothèque",
            teacher: "Enseignant",
            university: "Université",
            contact: "Contactez-nous",
            schedule: "Emploi du temps",
            download: "Télécharger",
            settings: "Paramètres",
            news: "Actualités",
            home: "Accueil",
            class: "Classe",
            account: "Compte",
            door1: "Porte 1",
            door2: "Porte 2",
            door3: "Porte 3",
            door4: "Porte 4",
            door5: "Porte 5",
            door6: "Porte 6",
            door7: "Porte 7",
            door8: "Porte 8",
        },
        it: {
            level: "Livello",
            competitions: "Competizioni",
            assignments: "Compiti",
            tests: "Test",
            library: "Biblioteca",
            teacher: "Insegnante",
            university: "Università",
            contact: "Contattaci",
            schedule: "Orario",
            download: "Scarica",
            settings: "Impostazioni",
            news: "Notizie",
            home: "Home",
            class: "Classe",
            account: "Account",
            door1: "Porta 1",
            door2: "Porta 2",
            door3: "Porta 3",
            door4: "Porta 4",
            door5: "Porta 5",
            door6: "Porta 6",
            door7: "Porta 7",
            door8: "Porta 8",
        },
    };

    // --- تحديث اللغة ---
    function updateLanguage(lang) {
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
        localStorage.setItem('lang', lang);
    }

    // --- عناصر اللغة ---
    const languageSelect = document.querySelector('.language-select');
    const languageBtn = document.getElementById('languageBtn');
    const languageList = document.getElementById('languageList');

    languageBtn.addEventListener('click', () => {
        languageList.classList.toggle('show');
        themeList.classList.remove('show');
    });

    languageList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            updateLanguage(lang);
            languageList.classList.remove('show');
        });
        btn.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // --- عناصر الثيم ---
    const themeSelect = document.querySelector('.theme-select');
    const themeBtn = document.getElementById('themeBtn');
    const themeList = document.getElementById('themeList');

    themeBtn.addEventListener('click', () => {
        themeList.classList.toggle('show');
        languageList.classList.remove('show');
    });

    themeList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            if (theme === "default") {
                document.body.className = "default";
            } else {
                document.body.className = theme;
            }
            themeList.classList.remove('show');
            localStorage.setItem('theme', theme);
        });
        btn.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // إغلاق القوائم عند الضغط خارجها
    document.addEventListener('click', (e) => {
        if (!languageSelect.contains(e.target)) {
            languageList.classList.remove('show');
        }
        if (!themeSelect.contains(e.target)) {
            themeList.classList.remove('show');
        }
    });

    // التهيئة الافتراضية
    // updateLanguage('ar');
    // window.addEventListener('DOMContentLoaded', () => {
    //     const savedLang = localStorage.getItem('lang') || 'ar';


    //     updateLanguage(savedLang);
    //     document.body.setAttribute('data-theme', savedTheme);
    // });
    // 
    window.addEventListener('DOMContentLoaded', () => {
        const savedLang = localStorage.getItem('lang') || 'ar';
        const savedTheme = localStorage.getItem('theme') || 'default';
        updateLanguage(savedLang);
        document.body.className = savedTheme;
    });
    document.querySelectorAll('[data-key]').forEach(btn => {
        btn.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
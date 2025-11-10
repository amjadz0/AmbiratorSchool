// 📁 الاشتراك.js

const translations = {
    ar: { subscribe_title: "الاشتراك في النظام", ninth: "تاسع - 30000 ريال", literature: "ثالث ثانوي أدبي - 35000 ريال", science: "ثالث ثانوي علمي - 40000 ريال", transfer: "حوالة", card: "تسديد عبر الكرت", default_theme: "افتراضي", dark_theme: "داكن", pink_theme: "وردي", blueanime_theme: "أزرق أنمي", theme1: "ثيم 1", theme2: "ثيم 2", theme3: "ثيم 3", theme4: "ثيم 4", theme5: "ثيم 5", theme6: "ثيم 6", theme7: "ثيم 7", theme8: "ثيم 8", theme9: "ثيم 9" },
    en: { subscribe_title: "Subscribe to the system", ninth: "9th Grade - 30000 YER", literature: "12th Grade - Literature - 35000 YER", science: "12th Grade - Science - 40000 YER", transfer: "Transfer", card: "Pay by Card", default_theme: "Default", dark_theme: "Dark", pink_theme: "Pink", blueanime_theme: "Blue Anime", theme1: "Theme 1", theme2: "Theme 2", theme3: "Theme 3", theme4: "Theme 4", theme5: "Theme 5", theme6: "Theme 6", theme7: "Theme 7", theme8: "Theme 8", theme9: "Theme 9" },
    fr: { subscribe_title: "S'inscrire au système", ninth: "9ème - 30000 YER", literature: "Terminale Littéraire - 35000 YER", science: "Terminale Scientifique - 40000 YER", transfer: "Virement", card: "Carte Bancaire", default_theme: "Par défaut", dark_theme: "Sombre", pink_theme: "Rose", blueanime_theme: "Anime Bleu", theme1: "Thème 1", theme2: "Thème 2", theme3: "Thème 3", theme4: "Thème 4", theme5: "Thème 5", theme6: "Thème 6", theme7: "Thème 7", theme8: "Thème 8", theme9: "Thème 9" },
    es: { subscribe_title: "Suscribirse al sistema", ninth: "Noveno grado - 30000 YER", literature: "12° grado - Literatura - 35000 YER", science: "12° grado - Ciencias - 40000 YER", transfer: "Transferencia", card: "Pagar con tarjeta", default_theme: "Por defecto", dark_theme: "Oscuro", pink_theme: "Rosa", blueanime_theme: "Anime Azul", theme1: "Tema 1", theme2: "Tema 2", theme3: "Tema 3", theme4: "Tema 4", theme5: "Tema 5", theme6: "Tema 6", theme7: "Tema 7", theme8: "Tema 8", theme9: "Tema 9" },
    ja: { subscribe_title: "システムに登録", ninth: "9年生 - 30000 YER", literature: "高校3年 - 文系 - 35000 YER", science: "高校3年 - 理系 - 40000 YER", transfer: "振込", card: "カード支払い", default_theme: "デフォルト", dark_theme: "ダーク", pink_theme: "ピンク", blueanime_theme: "ブルーアニメ", theme1: "テーマ1", theme2: "テーマ2", theme3: "テーマ3", theme4: "テーマ4", theme5: "テーマ5", theme6: "テーマ6", theme7: "テーマ7", theme8: "テーマ8", theme9: "テーマ9" },
    ko: { subscribe_title: "시스템 가입", ninth: "9학년 - 30000 YER", literature: "고3 문과 - 35000 YER", science: "고3 이과 - 40000 YER", transfer: "송금", card: "카드 결제", default_theme: "기본", dark_theme: "다크", pink_theme: "핑크", blueanime_theme: "블루 애니메이션", theme1: "테마1", theme2: "테마2", theme3: "테마3", theme4: "테마4", theme5: "테마5", theme6: "테마6", theme7: "테마7", theme8: "테마8", theme9: "테마9" },
    zh: { subscribe_title: "订阅系统", ninth: "九年级 - 30000 YER", literature: "高三文科 - 35000 YER", science: "高三理科 - 40000 YER", transfer: "转账", card: "刷卡支付", default_theme: "默认", dark_theme: "深色", pink_theme: "粉色", blueanime_theme: "蓝色动漫", theme1: "主题1", theme2: "主题2", theme3: "主题3", theme4: "主题4", theme5: "主题5", theme6: "主题6", theme7: "主题7", theme8: "主题8", theme9: "主题9" },
    it: { subscribe_title: "Iscriviti al sistema", ninth: "9ª classe - 30000 YER", literature: "12ª - Letteratura - 35000 YER", science: "12ª - Scienze - 40000 YER", transfer: "Bonifico", card: "Pagamento con carta", default_theme: "Predefinito", dark_theme: "Scuro", pink_theme: "Rosa", blueanime_theme: "Anime Blu", theme1: "Tema 1", theme2: "Tema 2", theme3: "Tema 3", theme4: "Tema 4", theme5: "Tema 5", theme6: "Tema 6", theme7: "Tema 7", theme8: "Tema 8", theme9: "Tema 9" }
};

function goToPage(url) { window.location.href = url; }

const ALL_THEMES = ['default', 'dark', 'pink', 'blueanime', 'theme1', 'theme2', 'theme3', 'theme4', 'theme5', 'theme6', 'theme7', 'theme8', 'theme9'];

function setTheme(themeClass) {
    const body = document.body;
    ALL_THEMES.forEach(theme => body.classList.remove(theme));
    if (ALL_THEMES.includes(themeClass)) {
        body.classList.add(themeClass);
        localStorage.setItem('selectedTheme', themeClass);
    }
}

function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    document.getElementById('subscribe_title').textContent = t.subscribe_title;
    document.getElementById('ninth').textContent = t.ninth;
    document.getElementById('literature').textContent = t.literature;
    document.getElementById('science').textContent = t.science;

    // Update button texts
    document.getElementById('transfer1').textContent = t.transfer;
    document.getElementById('transfer2').textContent = t.transfer;
    document.getElementById('transfer3').textContent = t.transfer;
    document.getElementById('card1').textContent = t.card;
    document.getElementById('card2').textContent = t.card;
    document.getElementById('card3').textContent = t.card;

    // Update theme selector options
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        // Clear existing options
        themeSelector.innerHTML = '';
        // Add new options with translated names
        ALL_THEMES.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme;
            option.textContent = t[`${theme}_theme`] || theme; // Use translation or fallback to theme name
            themeSelector.appendChild(option);
        });
    }

    localStorage.setItem('selectedLanguage', lang);
}

function selectOption(element) {
    document.querySelectorAll('.subscription-box').forEach(box => box.classList.remove('active'));
    element.classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'default'; // Set default theme to 'default'
    const savedLang = localStorage.getItem('selectedLanguage') || 'ar';

    setLanguage(savedLang); // Call setLanguage first to populate theme options with translations
    setTheme(savedTheme);


    document.getElementById('themeSelector').value = savedTheme;
    document.getElementById('languageSelector').value = savedLang;
});
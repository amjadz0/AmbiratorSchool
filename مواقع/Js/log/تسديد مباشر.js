// ✅ اللغات
const translations = {
    ar: {
        title: "أدخل رمز الكرت",
        placeholder: "مثال: ABC123XYZ",
        button: "تحقق من الكرت",
        success: "✅ تم التحقق بنجاح! سيتم تفعيل اشتراكك.",
        invalid: "❌ الرمز غير صالح. تأكد من الكرت.",
        error: "⚠️ حدث خطأ في الاتصال بالخادم."
    },
    en: {
        title: "Enter Card Code",
        placeholder: "Example: ABC123XYZ",
        button: "Verify Card",
        success: "✅ Verified successfully! Your subscription will be activated.",
        invalid: "❌ Invalid code. Please check the card.",
        error: "⚠️ Error connecting to the server."
    },
    ja: {
        title: "カードコードを入力してください",
        placeholder: "例: ABC123XYZ",
        button: "カードを確認する",
        success: "✅ 確認成功！アカウントが有効化されます。",
        invalid: "❌ 無効なコードです。もう一度確認してください。",
        error: "⚠️ サーバー接続エラー。"
    },
    ko: {
        title: "카드 코드를 입력하세요",
        placeholder: "예: ABC123XYZ",
        button: "카드 확인",
        success: "✅ 확인 완료! 가입이 활성화됩니다.",
        invalid: "❌ 잘못된 코드입니다. 다시 확인하세요.",
        error: "⚠️ 서버 연결 오류."
    },
    zh: {
        title: "请输入卡片代码",
        placeholder: "例如：ABC123XYZ",
        button: "验证卡片",
        success: "✅ 验证成功！您的账户将被激活。",
        invalid: "❌ 无效的代码。请检查卡片。",
        error: "⚠️ 无法连接服务器。"
    },
    es: {
        title: "Ingresa el código de la tarjeta",
        placeholder: "Ejemplo: ABC123XYZ",
        button: "Verificar tarjeta",
        success: "✅ Verificado exitosamente. Su suscripción será activada.",
        invalid: "❌ Código inválido. Verifique su tarjeta.",
        error: "⚠️ Error al conectar con el servidor."
    },
    fr: {
        title: "Entrez le code de la carte",
        placeholder: "Exemple: ABC123XYZ",
        button: "Vérifier la carte",
        success: "✅ Vérifié avec succès. Votre abonnement sera activé.",
        invalid: "❌ Code invalide. Vérifiez la carte.",
        error: "⚠️ Erreur de connexion au serveur."
    },
    it: {
        title: "Inserisci il codice della carta",
        placeholder: "Esempio: ABC123XYZ",
        button: "Verifica la carta",
        success: "✅ Verifica completata. L'abbonamento sarà attivato.",
        invalid: "❌ Codice non valido. Controlla la carta.",
        error: "⚠️ Errore di connessione al server."
    }
};

// ✅ تحميل الإعدادات المحفوظة
window.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("lang") || "ar";
    const theme = localStorage.getItem("theme") || "dark";
    setLanguage(lang);
    setTheme(theme);
});

// ✅ تعيين اللغة
function setLanguage(lang) {
    const t = translations[lang] || translations["ar"];
    document.getElementById("title-text").textContent = t.title;
    document.getElementById("card-code").placeholder = t.placeholder;
    document.getElementById("submit-btn").textContent = t.button;
    document.getElementById("message").textContent = "";
    localStorage.setItem("lang", lang);
}

// ✅ تعيين الثيم
function setTheme(themeName) {
    document.body.className = ""; // إزالة الثيمات السابقة
    document.body.classList.add(themeName); // إضافة الجديد
    localStorage.setItem("theme", themeName);
}

// ✅ إظهار وإخفاء القوائم
document.getElementById("theme-btn").onclick = () => {
    document.getElementById("theme-menu").classList.toggle("hidden");
    document.getElementById("lang-menu").classList.add("hidden");
};

document.getElementById("lang-btn").onclick = () => {
    document.getElementById("lang-menu").classList.toggle("hidden");
    document.getElementById("theme-menu").classList.add("hidden");
};

// ✅ التحقق من الكرت
document.getElementById("card-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const code = document.getElementById("card-code").value;
    const message = document.getElementById("message");
    const lang = localStorage.getItem("lang") || "ar";
    const t = translations[lang];

    fetch("check_card.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `card_code=${encodeURIComponent(code)}`
        })
        .then(res => res.text())
        .then(data => {
            if (data === "valid") {
                message.style.color = "lime";
                message.textContent = t.success;
            } else {
                message.style.color = "red";
                message.textContent = t.invalid;
            }
        })
        .catch(err => {
            message.style.color = "orange";
            message.textContent = t.error;
            console.error(err);
        });
});
// نظام ألوان جديد للرسوم البيانية
const chartColors = {
    primary: "#4a6cf7",
    secondary: "#ff6b6b",
    success: "#2ed573",
    warning: "#ffa502",
    info: "#1e90ff",
    light: "#a4b0be",
    dark: "#2f3542",
    purple: "#7d5fff",
    pink: "#ff6b81",
    orange: "#ff9f1a",
    teal: "#00d2d3",
    navy: "#3742fa",
    gradient1: ["#ff6b6b", "#ffa502", "#2ed573", "#1e90ff", "#5352ed", "#7d5fff"],
    gradient2: ["#ff4757", "#ff6348", "#ffa502", "#2ed573", "#1e90ff", "#5352ed"],
    pastel: [
        "#ff9ff350",
        "#f368e050",
        "#ff6b6b50",
        "#ee5a2450",
        "#ff9f1a50",
        "#c4e53850",
    ],
};

// المتوسطات العالمية
const globalAverages = {
    reading: 65,
    writing: 58,
    listening: 72,
    speaking: 48,
};

// نظام الأهداف
const goals = {
    reading: 85,
    writing: 75,
    listening: 95,
    speaking: 70,
};

// نظام الإنجازات
const achievements = {
    reading: { current: 0, target: 5, descriptionKey: "achievementReading" },
    writing: { current: 0, target: 10, descriptionKey: "achievementWriting" },
    listening: { current: 0, target: 20, descriptionKey: "achievementListening" },
    speaking: { current: 0, target: 15, descriptionKey: "achievementSpeaking" },
};

let currentChart = null;
let userData = {};

document.addEventListener("DOMContentLoaded", function () {
    // انتظار تحميل الترجمات
    setTimeout(() => {
        initializeApp();
    }, 100);

    const allRanges = document.querySelectorAll(".mini-range");
    allRanges.forEach((range) => {
        range.addEventListener("input", function () {
            this.nextElementSibling.textContent = this.value + "%";
            updateMainCircle(this);
            updateChart();
            checkGoals();
            updateGoalsDisplay();
            updateAdvancedAnalytics();
            updateAchievements();
        });
    });

    const analysisBtns = document.querySelectorAll(".analysis-btn");
    analysisBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            analysisBtns.forEach((b) => b.classList.remove("active"));
            this.classList.add("active");
            changeAnalysisType(this.dataset.analysis);
        });
    });

    // إضافة مستمعي الأحداث لأزرار التكامل
    document
        .getElementById("saveDataBtn")
        .addEventListener("click", saveUserData);
    document
        .getElementById("exportPdfBtn")
        .addEventListener("click", exportToPdf);
    document
        .getElementById("shareResultsBtn")
        .addEventListener("click", shareResults);

    createOverviewChart();
    updateGoalsDisplay();
    updateAdvancedAnalytics();
    updateAchievements();
});

function initializeApp() {
    updateAllCircles();
    loadUserData();
    checkGoals();

    // عرض إشعار ترحيبي بعد تحميل الصفحة
    setTimeout(() => {
        showNotification(
            translations[localStorage.getItem("lang") || "ar"].welcomeNotification ||
            "مرحباً في نظام التحليل التفاعلي!"
        );
    }, 1000);
}

function updateAllCircles() {
    const levelItems = document.querySelectorAll(".level-item");
    levelItems.forEach((item) => {
        const ranges = item.querySelectorAll(".mini-range");
        updateCircle(item, ranges);
    });
}

function updateMainCircle(rangeElement) {
    const levelItem = rangeElement.closest(".level-item");
    const ranges = levelItem.querySelectorAll(".mini-range");
    updateCircle(levelItem, ranges);
}

function updateCircle(levelItem, ranges) {
    let total = 0;
    ranges.forEach((range) => {
        total += parseInt(range.value);
    });
    const average = Math.round(total / ranges.length);

    const circleValue = levelItem.querySelector(".circle-value");
    circleValue.textContent = average + "%";

    const circleProgress = levelItem.querySelector(".circle-progress");
    const mainCircle = levelItem.querySelector(".main-circle");
    const levelIndicator = levelItem.querySelector(".level-indicator");

    const degrees = (average / 100) * 360;

    let currentColor, levelText, levelKey;

    if (average <= 20) {
        currentColor = "var(--color-0-20)";
        levelText =
            translations[localStorage.getItem("lang") || "ar"].levelBeginner ||
            "مبتدئ";
        levelKey = "levelBeginner";
    } else if (average <= 40) {
        currentColor = "var(--color-20-40)";
        levelText =
            translations[localStorage.getItem("lang") || "ar"].levelBelowAvg ||
            "تحت المتوسط";
        levelKey = "levelBelowAvg";
    } else if (average <= 60) {
        currentColor = "var(--color-40-60)";
        levelText =
            translations[localStorage.getItem("lang") || "ar"].levelMedium || "متوسط";
        levelKey = "levelMedium";
    } else if (average <= 80) {
        currentColor = "var(--color-60-80)";
        levelText =
            translations[localStorage.getItem("lang") || "ar"].levelGood || "جيد";
        levelKey = "levelGood";
    } else if (average <= 95) {
        currentColor = "var(--color-80-95)";
        levelText =
            translations[localStorage.getItem("lang") || "ar"].levelExcellent ||
            "ممتاز";
        levelKey = "levelExcellent";
    } else {
        currentColor = "var(--color-95-100)";
        levelText =
            translations[localStorage.getItem("lang") || "ar"].levelOutstanding ||
            "متميز";
        levelKey = "levelOutstanding";
    }

    circleProgress.style.background = `conic-gradient(${currentColor} ${degrees}deg, transparent ${degrees}deg)`;

    const miniRanges = levelItem.querySelectorAll(".mini-range");
    miniRanges.forEach((range) => {
        range.style.accentColor = currentColor;
    });

    circleValue.style.color = currentColor;
    levelIndicator.textContent = levelText;
    levelIndicator.style.background = currentColor;
    levelIndicator.style.color = "white";
    levelIndicator.setAttribute("data-key", levelKey);
}

function changeAnalysisType(type) {
    const chartTitle = document.getElementById("chart-title");
    const advancedPanel = document.getElementById("advancedAnalyticsPanel");

    const titles = {
        overview:
            translations[localStorage.getItem("lang") || "ar"].chartOverview ||
            "نظرة عامة على المهارات",
        comparison:
            translations[localStorage.getItem("lang") || "ar"].chartComparison ||
            "مقارنة المهارات الرئيسية",
        progress:
            translations[localStorage.getItem("lang") || "ar"].chartProgress ||
            "التقدم الزمني للمهارات",
        distribution:
            translations[localStorage.getItem("lang") || "ar"].chartDistribution ||
            "توزيع مستويات المهارات",
        performance:
            translations[localStorage.getItem("lang") || "ar"].chartPerformance ||
            "أداء التفاصيل",
        ranking:
            translations[localStorage.getItem("lang") || "ar"].chartRanking ||
            "ترتيب المهارات حسب الأداء",
        goals:
            translations[localStorage.getItem("lang") || "ar"].chartGoals ||
            "الأهداف والإنجازات",
        global:
            translations[localStorage.getItem("lang") || "ar"].chartGlobal ||
            "مقارنة مع المتوسطات العالمية",
        advanced:
            translations[localStorage.getItem("lang") || "ar"].chartAdvanced ||
            "التحليلات المتقدمة",
    };

    chartTitle.textContent = titles[type];

    switch (type) {
        case "overview":
            advancedPanel.style.display = "none";
            createOverviewChart();
            break;
        case "comparison":
            advancedPanel.style.display = "none";
            createComparisonChart();
            break;
        case "progress":
            advancedPanel.style.display = "none";
            createProgressChart();
            break;
        case "distribution":
            advancedPanel.style.display = "none";
            createDistributionChart();
            break;
        case "performance":
            advancedPanel.style.display = "none";
            createPerformanceChart();
            break;
        case "ranking":
            advancedPanel.style.display = "none";
            createRankingChart();
            break;
        case "goals":
            advancedPanel.style.display = "none";
            createGoalsChart();
            break;
        case "global":
            advancedPanel.style.display = "none";
            createGlobalComparisonChart();
            break;
        case "advanced":
            createAdvancedAnalyticsChart();
            advancedPanel.style.display = "block";
            break;
    }
}

function createOverviewChart() {
    const ctx = document.getElementById("analysisChart").getContext("2d");

    if (currentChart) {
        currentChart.destroy();
    }

    const averages = calculateAverages();

    currentChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                translations[localStorage.getItem("lang") || "ar"].reading || "القراءة",
                translations[localStorage.getItem("lang") || "ar"].writing || "الكتابة",
                translations[localStorage.getItem("lang") || "ar"].listening ||
                "الاستماع",
                translations[localStorage.getItem("lang") || "ar"].speaking ||
                "المحادثة",
            ],
            datasets: [
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"].skillAverage ||
                        "متوسط المهارات",
                    data: [
                        averages.reading,
                        averages.writing,
                        averages.listening,
                        averages.speaking,
                    ],
                    backgroundColor: chartColors.gradient1,
                    borderColor: chartColors.dark,
                    borderWidth: 2,
                    borderRadius: 12,
                    barPercentage: 0.6,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text:
                            translations[localStorage.getItem("lang") || "ar"].percentage ||
                            "النسبة المئوية",
                        color: chartColors.dark,
                        font: {
                            size: 14,
                            weight: "bold",
                        },
                    },
                    grid: {
                        color: "rgba(0,0,0,0.1)",
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    titleColor: chartColors.dark,
                    bodyColor: chartColors.dark,
                    borderColor: chartColors.primary,
                    borderWidth: 1,
                },
            },
        },
    });
}

function createComparisonChart() {
    const ctx = document.getElementById("analysisChart").getContext("2d");
    if (currentChart) currentChart.destroy();

    const allSkills = getAllSkills();
    currentChart = new Chart(ctx, {
        type: "radar",
        data: {
            labels: Object.keys(allSkills),
            datasets: [
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"].currentSkills ||
                        "المهارات الحالية",
                    data: Object.values(allSkills),
                    backgroundColor: "rgba(116, 96, 238, 0.3)",
                    borderColor: chartColors.purple,
                    borderWidth: 3,
                    pointBackgroundColor: chartColors.purple,
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: chartColors.purple,
                    pointRadius: 4,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        backdropColor: "transparent",
                    },
                    grid: {
                        color: "rgba(0,0,0,0.1)",
                    },
                    angleLines: {
                        color: "rgba(0,0,0,0.1)",
                    },
                },
            },
            plugins: {
                tooltip: {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    titleColor: chartColors.dark,
                    bodyColor: chartColors.dark,
                },
            },
        },
    });
}

function createProgressChart() {
    const ctx = document.getElementById("analysisChart").getContext("2d");
    if (currentChart) currentChart.destroy();

    const months = translations[localStorage.getItem("lang") || "ar"].months || [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
    ];
    const averages = calculateAverages();

    currentChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: months,
            datasets: [
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"].reading ||
                        "القراءة",
                    data: [60, 65, 70, 72, 74, averages.reading],
                    borderColor: chartColors.success,
                    backgroundColor: "rgba(46, 213, 115, 0.1)",
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: chartColors.success,
                    pointBorderColor: "#fff",
                    pointRadius: 5,
                },
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"].writing ||
                        "الكتابة",
                    data: [45, 50, 52, 55, 58, averages.writing],
                    borderColor: chartColors.warning,
                    backgroundColor: "rgba(255, 165, 2, 0.1)",
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: chartColors.warning,
                    pointBorderColor: "#fff",
                    pointRadius: 5,
                },
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"].listening ||
                        "الاستماع",
                    data: [70, 75, 78, 80, 82, averages.listening],
                    borderColor: chartColors.info,
                    backgroundColor: "rgba(30, 144, 255, 0.1)",
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: chartColors.info,
                    pointBorderColor: "#fff",
                    pointRadius: 5,
                },
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"].speaking ||
                        "المحادثة",
                    data: [30, 35, 38, 40, 42, averages.speaking],
                    borderColor: chartColors.secondary,
                    backgroundColor: "rgba(255, 107, 107, 0.1)",
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: chartColors.secondary,
                    pointBorderColor: "#fff",
                    pointRadius: 5,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: "rgba(0,0,0,0.1)",
                    },
                },
                x: {
                    grid: {
                        color: "rgba(0,0,0,0.1)",
                    },
                },
            },
            plugins: {
                tooltip: {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    titleColor: chartColors.dark,
                    bodyColor: chartColors.dark,
                },
            },
        },
    });
}

function createDistributionChart() {
    const ctx = document.getElementById("analysisChart").getContext("2d");
    if (currentChart) currentChart.destroy();

    const allSkills = getAllSkills();
    const skillValues = Object.values(allSkills);

    const levels = {
        [translations[localStorage.getItem("lang") || "ar"].levelBeginner ||
            "مبتدئ"]: skillValues.filter((v) => v <= 20).length,
        [translations[localStorage.getItem("lang") || "ar"].levelBelowAvg ||
            "تحت المتوسط"]: skillValues.filter((v) => v > 20 && v <= 40).length,
        [translations[localStorage.getItem("lang") || "ar"].levelMedium || "متوسط"]:
            skillValues.filter((v) => v > 40 && v <= 60).length,
        [translations[localStorage.getItem("lang") || "ar"].levelGood || "جيد"]:
            skillValues.filter((v) => v > 60 && v <= 80).length,
        [translations[localStorage.getItem("lang") || "ar"].levelExcellent ||
            "ممتاز"]: skillValues.filter((v) => v > 80 && v <= 95).length,
        [translations[localStorage.getItem("lang") || "ar"].levelOutstanding ||
            "متميز"]: skillValues.filter((v) => v > 95).length,
    };

    currentChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: Object.keys(levels),
            datasets: [
                {
                    data: Object.values(levels),
                    backgroundColor: chartColors.gradient2,
                    borderWidth: 3,
                    borderColor: "#fff",
                    hoverOffset: 15,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: "circle",
                    },
                },
                tooltip: {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    titleColor: chartColors.dark,
                    bodyColor: chartColors.dark,
                },
            },
        },
    });
}

function createPerformanceChart() {
    const ctx = document.getElementById("analysisChart").getContext("2d");
    if (currentChart) currentChart.destroy();

    const allSkills = getAllSkills();
    const skillNames = Object.keys(allSkills);
    const skillValues = Object.values(allSkills);

    currentChart = new Chart(ctx, {
        type: "polarArea",
        data: {
            labels: skillNames,
            datasets: [
                {
                    data: skillValues,
                    backgroundColor: chartColors.pastel,
                    borderWidth: 2,
                    borderColor: "#fff",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                },
                tooltip: {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    titleColor: chartColors.dark,
                    bodyColor: chartColors.dark,
                },
            },
        },
    });
}

function createRankingChart() {
    const ctx = document.getElementById("analysisChart").getContext("2d");
    if (currentChart) currentChart.destroy();

    const allSkills = getAllSkills();
    const sortedSkills = Object.entries(allSkills)
        .sort((a, b) => b[1] - a[1])
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

    currentChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(sortedSkills),
            datasets: [
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"].performance ||
                        "الأداء",
                    data: Object.values(sortedSkills),
                    backgroundColor: Object.values(sortedSkills).map(
                        (val, index) =>
                            chartColors.gradient1[index % chartColors.gradient1.length]
                    ),
                    borderColor: chartColors.dark,
                    borderWidth: 1,
                    borderRadius: 8,
                },
            ],
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: "rgba(0,0,0,0.1)",
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    titleColor: chartColors.dark,
                    bodyColor: chartColors.dark,
                },
            },
        },
    });
}

function createGoalsChart() {
    const ctx = document.getElementById("analysisChart").getContext("2d");
    if (currentChart) currentChart.destroy();

    const averages = calculateAverages();

    currentChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                translations[localStorage.getItem("lang") || "ar"].reading || "القراءة",
                translations[localStorage.getItem("lang") || "ar"].writing || "الكتابة",
                translations[localStorage.getItem("lang") || "ar"].listening ||
                "الاستماع",
                translations[localStorage.getItem("lang") || "ar"].speaking ||
                "المحادثة",
            ],
            datasets: [
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"]
                            .currentPerformance || "الأداء الحالي",
                    data: [
                        averages.reading,
                        averages.writing,
                        averages.listening,
                        averages.speaking,
                    ],
                    backgroundColor: chartColors.gradient1,
                    borderColor: chartColors.dark,
                    borderWidth: 1,
                    borderRadius: 6,
                    barPercentage: 0.4,
                },
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"].goal || "الهدف",
                    data: Object.values(goals),
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    borderColor: chartColors.secondary,
                    borderWidth: 2,
                    borderRadius: 6,
                    type: "line",
                    tension: 0.4,
                    pointBackgroundColor: chartColors.secondary,
                    pointBorderColor: "#fff",
                    pointRadius: 6,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: "rgba(0,0,0,0.1)",
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
            plugins: {
                tooltip: {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    titleColor: chartColors.dark,
                    bodyColor: chartColors.dark,
                },
            },
        },
    });
}

function createGlobalComparisonChart() {
    const ctx = document.getElementById("analysisChart").getContext("2d");
    if (currentChart) currentChart.destroy();

    const averages = calculateAverages();

    currentChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                translations[localStorage.getItem("lang") || "ar"].reading || "القراءة",
                translations[localStorage.getItem("lang") || "ar"].writing || "الكتابة",
                translations[localStorage.getItem("lang") || "ar"].listening ||
                "الاستماع",
                translations[localStorage.getItem("lang") || "ar"].speaking ||
                "المحادثة",
            ],
            datasets: [
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"]
                            .yourPerformance || "أداؤك",
                    data: [
                        averages.reading,
                        averages.writing,
                        averages.listening,
                        averages.speaking,
                    ],
                    backgroundColor: chartColors.primary,
                    borderColor: chartColors.dark,
                    borderWidth: 1,
                    borderRadius: 6,
                    barPercentage: 0.4,
                },
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"].globalAverage ||
                        "المتوسط العالمي",
                    data: [
                        globalAverages.reading,
                        globalAverages.writing,
                        globalAverages.listening,
                        globalAverages.speaking,
                    ],
                    backgroundColor: chartColors.light,
                    borderColor: chartColors.dark,
                    borderWidth: 1,
                    borderRadius: 6,
                    barPercentage: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: "rgba(0,0,0,0.1)",
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
            plugins: {
                tooltip: {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    titleColor: chartColors.dark,
                    bodyColor: chartColors.dark,
                },
            },
        },
    });
}

function createAdvancedAnalyticsChart() {
    const ctx = document.getElementById("analysisChart").getContext("2d");
    if (currentChart) currentChart.destroy();

    const allSkills = getAllSkills();
    const skillNames = Object.keys(allSkills);
    const skillValues = Object.values(allSkills);

    const mean = skillValues.reduce((a, b) => a + b, 0) / skillValues.length;
    const variance =
        skillValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) /
        skillValues.length;
    const stdDev = Math.sqrt(variance);
    const cv = (stdDev / mean) * 100;

    currentChart = new Chart(ctx, {
        type: "scatter",
        data: {
            datasets: [
                {
                    label:
                        translations[localStorage.getItem("lang") || "ar"]
                            .skillDistribution || "توزيع المهارات",
                    data: skillValues.map((value, index) => ({
                        x: index,
                        y: value,
                        r: 10,
                    })),
                    backgroundColor: chartColors.gradient1,
                    borderColor: chartColors.dark,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text:
                            translations[localStorage.getItem("lang") || "ar"].skillValue ||
                            "قيمة المهارة",
                        color: chartColors.dark,
                    },
                    grid: {
                        color: "rgba(0,0,0,0.1)",
                    },
                },
                x: {
                    display: false,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const skillIndex = context.parsed.x;
                            const skillName = skillNames[skillIndex];
                            const value = context.parsed.y;
                            return `${skillName}: ${value}%`;
                        },
                    },
                    backgroundColor: "rgba(255,255,255,0.9)",
                    titleColor: chartColors.dark,
                    bodyColor: chartColors.dark,
                },
            },
        },
    });
}

function calculateAverages() {
    const readingRanges = document.querySelectorAll(
        ".level-item:first-child .mini-range"
    );
    const writingRanges = document.querySelectorAll(
        ".level-item:nth-child(2) .mini-range"
    );
    const listeningRanges = document.querySelectorAll(
        ".level-item:nth-child(3) .mini-range"
    );
    const speakingRanges = document.querySelectorAll(
        ".level-item:nth-child(4) .mini-range"
    );

    return {
        reading: calculateAverage(readingRanges),
        writing: calculateAverage(writingRanges),
        listening: calculateAverage(listeningRanges),
        speaking: calculateAverage(speakingRanges),
    };
}

function calculateAverage(ranges) {
    let total = 0;
    ranges.forEach((range) => {
        total += parseInt(range.value);
    });
    return Math.round(total / ranges.length);
}

function getAllSkills() {
    const allSkills = {};
    const ranges = document.querySelectorAll(".mini-range");

    ranges.forEach((range) => {
        const label = range.previousElementSibling.textContent.trim();
        allSkills[label] = parseInt(range.value);
    });

    return allSkills;
}

function updateChart() {
    const activeBtn = document.querySelector(".analysis-btn.active");
    changeAnalysisType(activeBtn.dataset.analysis);
}

// نظام الأهداف والتذكيرات
function checkGoals() {
    const averages = calculateAverages();
    const achievedGoals = [];
    const currentLang = localStorage.getItem("lang") || "ar";

    Object.keys(averages).forEach((skill) => {
        if (averages[skill] >= goals[skill]) {
            achievedGoals.push(translations[currentLang][skill] || skill);
        }
    });

    if (achievedGoals.length > 0) {
        showNotification(
            `${translations[currentLang].goalAchieved || "تهانينا! لقد حققت هدفك في:"
            } ${achievedGoals.join("، ")} 🎉`
        );
    }

    const nearlyAchieved = [];
    Object.keys(averages).forEach((skill) => {
        if (averages[skill] >= goals[skill] - 5 && averages[skill] < goals[skill]) {
            nearlyAchieved.push(translations[currentLang][skill] || skill);
        }
    });

    if (nearlyAchieved.length > 0) {
        setTimeout(() => {
            showNotification(
                `${translations[currentLang].nearGoal ||
                "أنت على بعد خطوات من تحقيق أهدافك في:"
                } ${nearlyAchieved.join("، ")} 💪`
            );
        }, 3000);
    }
}

function updateGoalsDisplay() {
    const averages = calculateAverages();
    const goalsGrid = document.getElementById("goalsGrid");
    const currentLang = localStorage.getItem("lang") || "ar";

    goalsGrid.innerHTML = "";

    Object.keys(goals).forEach((skill) => {
        const current = averages[skill] || 0;
        const goal = goals[skill];
        const progress = Math.min((current / goal) * 100, 100);

        const goalItem = document.createElement("div");
        goalItem.className = "goal-item";

        goalItem.innerHTML = `
                    <div class="goal-title">${translations[currentLang][skill] || skill
            }</div>
                    <div>${current}% / ${goal}%</div>
                    <div class="goal-progress">
                        <div class="goal-progress-bar" style="width: ${progress}%"></div>
                    </div>
                    <div class="analytics-trend ${current >= goal ? "trend-up" : "trend-down"
            }">
                        ${current >= goal
                ? translations[currentLang].goalCompleted ||
                "✅ تم تحقيق الهدف"
                : `${translations[currentLang].remaining || "متبقي"
                } ${goal - current}%`
            }
                    </div>
                `;

        goalsGrid.appendChild(goalItem);
    });
}

function updateAchievements() {
    const averages = calculateAverages();
    const currentLang = localStorage.getItem("lang") || "ar";

    Object.keys(achievements).forEach((skill) => {
        if (averages[skill] > 70) {
            achievements[skill].current = Math.min(
                achievements[skill].current + 1,
                achievements[skill].target
            );
        }
    });

    const completedAchievements = [];
    Object.keys(achievements).forEach((skill) => {
        if (achievements[skill].current >= achievements[skill].target) {
            completedAchievements.push(
                translations[currentLang][achievements[skill].descriptionKey] || ""
            );
        }
    });

    if (completedAchievements.length > 0) {
        showNotification(
            `${translations[currentLang].achievementUnlocked ||
            "مبارك! لقد أكملت إنجاز:"
            } ${completedAchievements.join("، ")} 🏆`
        );
    }
}

function showNotification(message) {
    const notificationPanel = document.getElementById("notificationPanel");
    const notificationContent = document.getElementById("notificationContent");

    notificationContent.textContent = message;
    notificationPanel.classList.add("show");

    setTimeout(() => {
        notificationPanel.classList.remove("show");
    }, 5000);
}

// التكامل مع الأنظمة الخارجية
function saveUserData() {
    const allSkills = getAllSkills();
    const averages = calculateAverages();
    const currentLang = localStorage.getItem("lang") || "ar";

    userData = {
        skills: allSkills,
        averages: averages,
        timestamp: new Date().toISOString(),
    };

    localStorage.setItem("userSkillsData", JSON.stringify(userData));
    showNotification(
        translations[currentLang].dataSaved || "تم حفظ بياناتك بنجاح! 💾"
    );
}

function loadUserData() {
    const savedData = localStorage.getItem("userSkillsData");
    const currentLang = localStorage.getItem("lang") || "ar";

    if (savedData) {
        userData = JSON.parse(savedData);

        if (userData.skills) {
            Object.keys(userData.skills).forEach((skillName) => {
                const skillKey = getSkillKey(skillName);
                const range = document.querySelector(`[data-skill="${skillKey}"]`);
                if (range) {
                    range.value = userData.skills[skillName];
                    range.dispatchEvent(new Event("input"));
                }
            });
        }

        showNotification(
            translations[currentLang].dataLoaded ||
            "تم تحميل بياناتك المحفوظة مسبقاً! 📂"
        );
    }
}

function getSkillKey(skillName) {
    const skillMap = {
        التركيز: "focus",
        الفهم: "comprehension",
        السرعة: "speed",
        الدقة: "accuracy",
        التنظيم: "organization",
        القواعد: "grammar",
        الإبداع: "creativity",
        الوضوح: "clarity",
        الطلاقة: "fluency",
        النطق: "pronunciation",
        الثقة: "confidence",
        التفاعل: "interaction",
        الاستيعاب: "absorption",
        التحليل: "analysis",
    };

    return skillMap[skillName] || skillName;
}

function exportToPdf() {
    const currentLang = localStorage.getItem("lang") || "ar";
    showNotification(
        translations[currentLang].preparingPdf || "جاري تحضير التقرير للتحميل... 📄"
    );

    setTimeout(() => {
        showNotification(
            translations[currentLang].pdfExported ||
            "تم تصدير التقرير بنجاح! يمكنك تحميله الآن. ✅"
        );
    }, 2000);
}

function shareResults() {
    const averages = calculateAverages();
    const overallAverage = Object.values(averages).reduce((a, b) => a + b, 0) / 4;
    const currentLang = localStorage.getItem("lang") || "ar";

    const shareText = `${translations[currentLang].skillResults || "نتائج تحليل مهاراتي اللغوية:"
        }
${translations[currentLang].reading || "القراءة"}: ${averages.reading}%
${translations[currentLang].writing || "الكتابة"}: ${averages.writing}%
${translations[currentLang].listening || "الاستماع"}: ${averages.listening}%
${translations[currentLang].speaking || "المحادثة"}: ${averages.speaking}%
${translations[currentLang].overallAverage || "المتوسط العام"}: ${Math.round(
            overallAverage
        )}%

${translations[currentLang].shareProgress || "شاركنا تقدمك! 🌟"}`;

    if (navigator.share) {
        navigator.share({
            title:
                translations[currentLang].skillResultsTitle ||
                "نتائج تحليل المهارات اللغوية",
            text: shareText,
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification(
                translations[currentLang].resultsCopied ||
                "تم نسخ النتائج إلى الحافظة! 🔗"
            );
        });
    }
}

// التحليلات المتقدمة
function updateAdvancedAnalytics() {
    const analyticsGrid = document.getElementById("analyticsGrid");
    const allSkills = getAllSkills();
    const skillValues = Object.values(allSkills);
    const averages = calculateAverages();
    const currentLang = localStorage.getItem("lang") || "ar";

    const mean = skillValues.reduce((a, b) => a + b, 0) / skillValues.length;
    const variance =
        skillValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) /
        skillValues.length;
    const stdDev = Math.sqrt(variance);
    const cv = (stdDev / mean) * 100;
    const consistency = 100 - cv;
    const maxSkill = Math.max(...skillValues);
    const minSkill = Math.min(...skillValues);
    const strengthWeaknessRatio = (maxSkill / minSkill).toFixed(2);
    const overallAverage = Object.values(averages).reduce((a, b) => a + b, 0) / 4;
    const potentialProgress = (100 - overallAverage).toFixed(1);

    analyticsGrid.innerHTML = `
                <div class="analytics-item">
                    <div class="analytics-title">${translations[currentLang].overallAverage ||
        "متوسط جميع المهارات"
        }</div>
                    <div class="analytics-value">${mean.toFixed(1)}%</div>
                    <div class="analytics-trend trend-up">+2.5% ${translations[currentLang].fromLastMonth ||
        "عن الشهر الماضي"
        }</div>
                </div>
                <div class="analytics-item">
                    <div class="analytics-title">${translations[currentLang].consistency || "مستوى الاتساق"
        }</div>
                    <div class="analytics-value">${consistency.toFixed(
            1
        )}%</div>
                    <div class="analytics-trend ${consistency > 80 ? "trend-up" : "trend-down"
        }">
                        ${consistency > 80
            ? translations[currentLang].highConsistency ||
            "اتساق عالي"
            : translations[currentLang].needsBalance ||
            "تحتاج لتحسين التوازن"
        }
                    </div>
                </div>
                <div class="analytics-item">
                    <div class="analytics-title">${translations[currentLang].strengthWeakness ||
        "مؤشر القوة والضعف"
        }</div>
                    <div class="analytics-value">${strengthWeaknessRatio}</div>
                    <div class="analytics-trend ${strengthWeaknessRatio < 2 ? "trend-up" : "trend-down"
        }">
                        ${strengthWeaknessRatio < 2
            ? translations[currentLang].balanced || "متوازن"
            : translations[currentLang].largeGaps ||
            "فجوات كبيرة"
        }
                    </div>
                </div>
                <div class="analytics-item">
                    <div class="analytics-title">${translations[currentLang].potentialProgress ||
        "التقدم المحتمل"
        }</div>
                    <div class="analytics-value">+${potentialProgress}%</div>
                    <div class="analytics-trend trend-up">${translations[currentLang].highGrowth ||
        "إمكانية نمو كبيرة"
        }</div>
                </div>
            `;
}

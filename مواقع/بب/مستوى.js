      // نظام ألوان جديد للرسوم البيانية
        const chartColors = {
            primary: '#4a6cf7',
            secondary: '#ff6b6b',
            success: '#2ed573',
            warning: '#ffa502',
            info: '#1e90ff',
            light: '#a4b0be',
            dark: '#2f3542',
            purple: '#7d5fff',
            pink: '#ff6b81',
            orange: '#ff9f1a',
            teal: '#00d2d3',
            navy: '#3742fa',
            gradient1: ['#ff6b6b', '#ffa502', '#2ed573', '#1e90ff', '#5352ed', '#7d5fff'],
            gradient2: ['#ff4757', '#ff6348', '#ffa502', '#2ed573', '#1e90ff', '#5352ed'],
            pastel: ['#ff9ff350', '#f368e050', '#ff6b6b50', '#ee5a2450', '#ff9f1a50', '#c4e53850']
        };

        // المتوسطات العالمية
        const globalAverages = {
            reading: 65,
            writing: 58,
            listening: 72,
            speaking: 48
        };

        // نظام الأهداف
        const goals = {
            reading: 85,
            writing: 75,
            listening: 95,
            speaking: 70
        };

        // نظام الإنجازات
        const achievements = {
            reading: { current: 0, target: 5, description: "إكمال 5 كتب" },
            writing: { current: 0, target: 10, description: "كتابة 10 مقالات" },
            listening: { current: 0, target: 20, description: "الاستماع لـ 20 ساعة" },
            speaking: { current: 0, target: 15, description: "ممارسة المحادثة 15 ساعة" }
        };

        let currentChart = null;
        let userData = {};

        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
            
            const allRanges = document.querySelectorAll('.mini-range');
            allRanges.forEach(range => {
                range.addEventListener('input', function() {
                    this.nextElementSibling.textContent = this.value + '%';
                    updateMainCircle(this);
                    updateChart();
                    checkGoals();
                    updateGoalsDisplay();
                    updateAdvancedAnalytics();
                    updateAchievements();
                });
            });
            
            const analysisBtns = document.querySelectorAll('.analysis-btn');
            analysisBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    analysisBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    changeAnalysisType(this.dataset.analysis);
                });
            });
            
            // إضافة مستمعي الأحداث لأزرار التكامل
            document.getElementById('saveDataBtn').addEventListener('click', saveUserData);
            document.getElementById('exportPdfBtn').addEventListener('click', exportToPdf);
            document.getElementById('shareResultsBtn').addEventListener('click', shareResults);
            
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
                showNotification('مرحباً بك في نظام التحليل التفاعلي! يمكنك تعديل المهارات ومشاهدة التحليلات فوراً.');
            }, 1000);
        }
        
        function updateAllCircles() {
            const levelItems = document.querySelectorAll('.level-item');
            levelItems.forEach(item => {
                const ranges = item.querySelectorAll('.mini-range');
                updateCircle(item, ranges);
            });
        }
        

        function updateMainCircle(rangeElement) {
            const levelItem = rangeElement.closest('.level-item');
            const ranges = levelItem.querySelectorAll('.mini-range');
            updateCircle(levelItem, ranges);
        }
        
        function updateCircle(levelItem, ranges) {
            let total = 0;
            ranges.forEach(range => {
                total += parseInt(range.value);
            });
            const average = Math.round(total / ranges.length);
            
            const circleValue = levelItem.querySelector('.circle-value');
            circleValue.textContent = average + '%';
            
            const circleProgress = levelItem.querySelector('.circle-progress');
            const mainCircle = levelItem.querySelector('.main-circle');
            const levelIndicator = levelItem.querySelector('.level-indicator');
            
            const degrees = (average / 100) * 360;
            
            let currentColor, levelText;
            
            if (average <= 20) {
                currentColor = 'var(--color-0-20)';
                levelText = 'مبتدئ';
            } else if (average <= 40) {
                currentColor = 'var(--color-20-40)';
                levelText = 'تحت المتوسط';
            } else if (average <= 60) {
                currentColor = 'var(--color-40-60)';
                levelText = 'متوسط';
            } else if (average <= 80) {
                currentColor = 'var(--color-60-80)';
                levelText = 'جيد';
            } else if (average <= 95) {
                currentColor = 'var(--color-80-95)';
                levelText = 'ممتاز';
            } else {
                currentColor = 'var(--color-95-100)';
                levelText = 'متميز';
            }
            
            circleProgress.style.background = `conic-gradient(${currentColor} ${degrees}deg, transparent ${degrees}deg)`;
            
            const miniRanges = levelItem.querySelectorAll('.mini-range');
            miniRanges.forEach(range => {
                range.style.accentColor = currentColor;
            });
            
            circleValue.style.color = currentColor;
            levelIndicator.textContent = levelText;
            levelIndicator.style.background = currentColor;
            levelIndicator.style.color = 'white';
            
            mainCircle.classList.remove('quarter-circle', 'half-circle', 'three-quarter-circle');
            
            if (average <= 25) {
                mainCircle.classList.add('quarter-circle');
            } else if (average <= 50) {
                mainCircle.classList.add('half-circle');
            } else if (average <= 75) {
                mainCircle.classList.add('three-quarter-circle');
            }
            
            mainCircle.style.setProperty('--primary-color', currentColor);
        }
        
        function changeAnalysisType(type) {
            const chartTitle = document.getElementById('chart-title');
            const advancedPanel = document.getElementById('advancedAnalyticsPanel');
            
            switch(type) {
                case 'overview':
                    chartTitle.textContent = 'نظرة عامة على المهارات';
                    createOverviewChart();
                    advancedPanel.style.display = 'none';
                    break;
                case 'comparison':
                    chartTitle.textContent = 'مقارنة المهارات الرئيسية';
                    createComparisonChart();
                    advancedPanel.style.display = 'none';
                    break;
                case 'progress':
                    chartTitle.textContent = 'التقدم الزمني للمهارات';
                    createProgressChart();
                    advancedPanel.style.display = 'none';
                    break;
                case 'distribution':
                    chartTitle.textContent = 'توزيع مستويات المهارات';
                    createDistributionChart();
                    advancedPanel.style.display = 'none';
                    break;
                case 'performance':
                    chartTitle.textContent = 'أداء التفاصيل';
                    createPerformanceChart();
                    advancedPanel.style.display = 'none';
                    break;
                case 'ranking':
                    chartTitle.textContent = 'ترتيب المهارات حسب الأداء';
                    createRankingChart();
                    advancedPanel.style.display = 'none';
                    break;
                case 'goals':
                    chartTitle.textContent = 'الأهداف والإنجازات';
                    createGoalsChart();
                    advancedPanel.style.display = 'none';
                    break;
                case 'global':
                    chartTitle.textContent = 'مقارنة مع المتوسطات العالمية';
                    createGlobalComparisonChart();
                    advancedPanel.style.display = 'none';
                    break;
                case 'advanced':
                    chartTitle.textContent = 'التحليلات المتقدمة';
                    createAdvancedAnalyticsChart();
                    advancedPanel.style.display = 'block';
                    break;
            }
        }
        


        function createOverviewChart() {
            const ctx = document.getElementById('analysisChart').getContext('2d');
            
            if (currentChart) {
                currentChart.destroy();
            }
            
            const averages = calculateAverages();
            
            currentChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['القراءة', 'الكتابة', 'الاستماع', 'المحادثة'],
                    datasets: [{
                        label: 'متوسط المهارات',
                        data: [averages.reading, averages.writing, averages.listening, averages.speaking],
                        backgroundColor: chartColors.gradient1,
                        borderColor: chartColors.dark,
                        borderWidth: 2,
                        borderRadius: 12,
                        barPercentage: 0.6
                    }]
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
                                text: 'النسبة المئوية',
                                color: chartColors.dark,
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            titleColor: chartColors.dark,
                            bodyColor: chartColors.dark,
                            borderColor: chartColors.primary,
                            borderWidth: 1
                        }
                    }
                }
            });
        }
        
        function createComparisonChart() {
            const ctx = document.getElementById('analysisChart').getContext('2d');
            
            if (currentChart) {
                currentChart.destroy();
            }
            
            const allSkills = getAllSkills();
            
            currentChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: Object.keys(allSkills),
                    datasets: [
                        {
                            label: 'المهارات الحالية',
                            data: Object.values(allSkills),
                            backgroundColor: 'rgba(116, 96, 238, 0.3)',
                            borderColor: chartColors.purple,
                            borderWidth: 3,
                            pointBackgroundColor: chartColors.purple,
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: chartColors.purple,
                            pointRadius: 4
                        }
                    ]
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
                                backdropColor: 'transparent'
                            },
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            },
                            angleLines: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            titleColor: chartColors.dark,
                            bodyColor: chartColors.dark
                        }
                    }
                }
            });
        }
        
        function createProgressChart() {
            const ctx = document.getElementById('analysisChart').getContext('2d');
            
            if (currentChart) {
                currentChart.destroy();
            }
            
            const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
            const averages = calculateAverages();
            
            currentChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: 'القراءة',
                            data: [60, 65, 70, 72, 74, averages.reading],
                            borderColor: chartColors.success,
                            backgroundColor: 'rgba(46, 213, 115, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: chartColors.success,
                            pointBorderColor: '#fff',
                            pointRadius: 5
                        },
                        {
                            label: 'الكتابة',
                            data: [45, 50, 52, 55, 58, averages.writing],
                            borderColor: chartColors.warning,
                            backgroundColor: 'rgba(255, 165, 2, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: chartColors.warning,
                            pointBorderColor: '#fff',
                            pointRadius: 5
                        },
                        {
                            label: 'الاستماع',
                            data: [70, 75, 78, 80, 82, averages.listening],
                            borderColor: chartColors.info,
                            backgroundColor: 'rgba(30, 144, 255, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: chartColors.info,
                            pointBorderColor: '#fff',
                            pointRadius: 5
                        },
                        {
                            label: 'المحادثة',
                            data: [30, 35, 38, 40, 42, averages.speaking],
                            borderColor: chartColors.secondary,
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: chartColors.secondary,
                            pointBorderColor: '#fff',
                            pointRadius: 5
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            titleColor: chartColors.dark,
                            bodyColor: chartColors.dark
                        }
                    }
                }
            });
        }
        


        function createDistributionChart() {
            const ctx = document.getElementById('analysisChart').getContext('2d');
            
            if (currentChart) {
                currentChart.destroy();
            }
            
            const allSkills = getAllSkills();
            const skillValues = Object.values(allSkills);
            
            const levels = {
                'مبتدئ': skillValues.filter(v => v <= 20).length,
                'تحت المتوسط': skillValues.filter(v => v > 20 && v <= 40).length,
                'متوسط': skillValues.filter(v => v > 40 && v <= 60).length,
                'جيد': skillValues.filter(v => v > 60 && v <= 80).length,
                'ممتاز': skillValues.filter(v => v > 80 && v <= 95).length,
                'متميز': skillValues.filter(v => v > 95).length
            };
            
            currentChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(levels),
                    datasets: [{
                        data: Object.values(levels),
                        backgroundColor: chartColors.gradient2,
                        borderWidth: 3,
                        borderColor: '#fff',
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            titleColor: chartColors.dark,
                            bodyColor: chartColors.dark
                        }
                    }
                }
            });
        }
        
        function createPerformanceChart() {
            const ctx = document.getElementById('analysisChart').getContext('2d');
            
            if (currentChart) {
                currentChart.destroy();
            }
            
            const allSkills = getAllSkills();
            const skillNames = Object.keys(allSkills);
            const skillValues = Object.values(allSkills);
            
            currentChart = new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: skillNames,
                    datasets: [{
                        data: skillValues,
                        backgroundColor: chartColors.pastel,
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            titleColor: chartColors.dark,
                            bodyColor: chartColors.dark
                        }
                    }
                }
            });
        }
        
        function createRankingChart() {
            const ctx = document.getElementById('analysisChart').getContext('2d');
            
            if (currentChart) {
                currentChart.destroy();
            }
            
            const allSkills = getAllSkills();
            const sortedSkills = Object.entries(allSkills)
                .sort((a, b) => b[1] - a[1])
                .reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {});
            
            currentChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(sortedSkills),
                    datasets: [{
                        label: 'الأداء',
                        data: Object.values(sortedSkills),
                        backgroundColor: Object.values(sortedSkills).map((val, index) => 
                            chartColors.gradient1[index % chartColors.gradient1.length]
                        ),
                        borderColor: chartColors.dark,
                        borderWidth: 1,
                        borderRadius: 8
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            titleColor: chartColors.dark,
                            bodyColor: chartColors.dark
                        }
                    }
                }
            });
        }
        
        function createGoalsChart() {
            const ctx = document.getElementById('analysisChart').getContext('2d');
            
            if (currentChart) {
                currentChart.destroy();
            }
            
            const averages = calculateAverages();
            
            currentChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(averages),
                    datasets: [
                        {
                            label: 'الأداء الحالي',
                            data: Object.values(averages),
                            backgroundColor: chartColors.gradient1,
                            borderColor: chartColors.dark,
                            borderWidth: 1,
                            borderRadius: 6,
                            barPercentage: 0.4
                        },
                        {
                            label: 'الهدف',
                            data: Object.values(goals),
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            borderColor: chartColors.secondary,
                            borderWidth: 2,
                            borderRadius: 6,
                            type: 'line',
                            tension: 0.4,
                            pointBackgroundColor: chartColors.secondary,
                            pointBorderColor: '#fff',
                            pointRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            titleColor: chartColors.dark,
                            bodyColor: chartColors.dark
                        }
                    }
                }
            });
        }
        



        // الرسم البياني للمقارنة العالمية
        function createGlobalComparisonChart() {
            const ctx = document.getElementById('analysisChart').getContext('2d');
            
            if (currentChart) {
                currentChart.destroy();
            }
            
            const averages = calculateAverages();
            
            currentChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['القراءة', 'الكتابة', 'الاستماع', 'المحادثة'],
                    datasets: [
                        {
                            label: 'أداؤك',
                            data: [averages.reading, averages.writing, averages.listening, averages.speaking],
                            backgroundColor: chartColors.primary,
                            borderColor: chartColors.dark,
                            borderWidth: 1,
                            borderRadius: 6,
                            barPercentage: 0.4
                        },
                        {
                            label: 'المتوسط العالمي',
                            data: [globalAverages.reading, globalAverages.writing, globalAverages.listening, globalAverages.speaking],
                            backgroundColor: chartColors.light,
                            borderColor: chartColors.dark,
                            borderWidth: 1,
                            borderRadius: 6,
                            barPercentage: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            titleColor: chartColors.dark,
                            bodyColor: chartColors.dark
                        }
                    }
                }
            });
        }
        
        // الرسم البياني للتحليلات المتقدمة
        function createAdvancedAnalyticsChart() {
            const ctx = document.getElementById('analysisChart').getContext('2d');
            
            if (currentChart) {
                currentChart.destroy();
            }
            
            const allSkills = getAllSkills();
            const skillNames = Object.keys(allSkills);
            const skillValues = Object.values(allSkills);
            
            // حساب معامل الاختلاف (Coefficient of Variation)
            const mean = skillValues.reduce((a, b) => a + b, 0) / skillValues.length;
            const variance = skillValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / skillValues.length;
            const stdDev = Math.sqrt(variance);
            const cv = (stdDev / mean) * 100;
            
            currentChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'توزيع المهارات',
                        data: skillValues.map((value, index) => ({
                            x: index,
                            y: value,
                            r: 10
                        })),
                        backgroundColor: chartColors.gradient1,
                        borderColor: chartColors.dark,
                        borderWidth: 1
                    }]
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
                                text: 'قيمة المهارة',
                                color: chartColors.dark
                            },
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            display: false
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const skillIndex = context.parsed.x;
                                    const skillName = skillNames[skillIndex];
                                    const value = context.parsed.y;
                                    return `${skillName}: ${value}%`;
                                }
                            },
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            titleColor: chartColors.dark,
                            bodyColor: chartColors.dark
                        }
                    }
                }
            });
        }
        
        function calculateAverages() {
            const readingRanges = document.querySelectorAll('.level-item:first-child .mini-range');
            const writingRanges = document.querySelectorAll('.level-item:nth-child(2) .mini-range');
            const listeningRanges = document.querySelectorAll('.level-item:nth-child(3) .mini-range');
            const speakingRanges = document.querySelectorAll('.level-item:nth-child(4) .mini-range');
            
            return {
                reading: calculateAverage(readingRanges),
                writing: calculateAverage(writingRanges),
                listening: calculateAverage(listeningRanges),
                speaking: calculateAverage(speakingRanges)
            };
        }
        
        function calculateAverage(ranges) {
            let total = 0;
            ranges.forEach(range => {
                total += parseInt(range.value);
            });
            return Math.round(total / ranges.length);
        }
        
        function getAllSkills() {
            const allSkills = {};
            const ranges = document.querySelectorAll('.mini-range');
            
            ranges.forEach(range => {
                const label = range.previousElementSibling.textContent.trim();
                allSkills[label] = parseInt(range.value);
            });
            
            return allSkills;
        }
        
        function getColorForValue(value) {
            if (value <= 20) return 'var(--color-0-20)';
            if (value <= 40) return 'var(--color-20-40)';
            if (value <= 60) return 'var(--color-40-60)';
            if (value <= 80) return 'var(--color-60-80)';
            if (value <= 95) return 'var(--color-80-95)';
            return 'var(--color-95-100)';
        }
        
        function updateChart() {
            const activeBtn = document.querySelector('.analysis-btn.active');
            changeAnalysisType(activeBtn.dataset.analysis);
        }
        
        // نظام الأهداف والتذكيرات
        function checkGoals() {
            const averages = calculateAverages();
            const achievedGoals = [];
            
            Object.keys(averages).forEach(skill => {
                if (averages[skill] >= goals[skill]) {
                    achievedGoals.push(skill);
                }
            });
            
            if (achievedGoals.length > 0) {
                showNotification(`تهانينا! لقد حققت هدفك في: ${achievedGoals.join('، ')} 🎉`);
            }
            
            // التحقق من الأهداف القريبة
            const nearlyAchieved = [];
            Object.keys(averages).forEach(skill => {
                if (averages[skill] >= goals[skill] - 5 && averages[skill] < goals[skill]) {
                    nearlyAchieved.push(skill);
                }
            });
            
            if (nearlyAchieved.length > 0) {
                setTimeout(() => {
                    showNotification(`أنت على بعد خطوات من تحقيق أهدافك في: ${nearlyAchieved.join('، ')} 💪`);
                }, 3000);
            }
        }
        
        function updateGoalsDisplay() {
            const averages = calculateAverages();
            const goalsGrid = document.getElementById('goalsGrid');
            goalsGrid.innerHTML = '';
            
            Object.keys(goals).forEach(skill => {
                const current = averages[skill] || 0;
                const goal = goals[skill];
                const progress = Math.min((current / goal) * 100, 100);
                
                const goalItem = document.createElement('div');
                goalItem.className = 'goal-item';
                
                goalItem.innerHTML = `
                    <div class="goal-title">${skill}</div>
                    <div>${current}% / ${goal}%</div>
                    <div class="goal-progress">
                        <div class="goal-progress-bar" style="width: ${progress}%"></div>
                    </div>
                    <div class="analytics-trend ${current >= goal ? 'trend-up' : 'trend-down'}">
                        ${current >= goal ? '✅ تم تحقيق الهدف' : `متبقي ${goal - current}%`}
                    </div>
                `;
                
                goalsGrid.appendChild(goalItem);
            });
        }
        
        // تحديث الإنجازات
        function updateAchievements() {
            const averages = calculateAverages();
            
            // تحديث الإنجازات بناءً على تحسن المهارات
            Object.keys(achievements).forEach(skill => {
                if (averages[skill] > 70) {
                    achievements[skill].current = Math.min(achievements[skill].current + 1, achievements[skill].target);
                }
            });
            
            // التحقق من الإنجازات المحققة
            const completedAchievements = [];
            Object.keys(achievements).forEach(skill => {
                if (achievements[skill].current >= achievements[skill].target) {
                    completedAchievements.push(skill);
                }
            });
            
            if (completedAchievements.length > 0) {
                showNotification(`مبارك! لقد أكملت إنجاز: ${completedAchievements.map(skill => achievements[skill].description).join('، ')} 🏆`);
            }
        }
        
        function showNotification(message) {
            const notificationPanel = document.getElementById('notificationPanel');
            const notificationContent = document.getElementById('notificationContent');
            
            notificationContent.textContent = message;
            notificationPanel.classList.add('show');
            
            setTimeout(() => {
                notificationPanel.classList.remove('show');
            }, 5000);
        }
        
        // التكامل مع الأنظمة الخارجية
        function saveUserData() {
            const allSkills = getAllSkills();
            const averages = calculateAverages();
            
            userData = {
                skills: allSkills,
                averages: averages,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('userSkillsData', JSON.stringify(userData));
            showNotification('تم حفظ بياناتك بنجاح! 💾');
        }
        
        function loadUserData() {
            const savedData = localStorage.getItem('userSkillsData');
            if (savedData) {
                userData = JSON.parse(savedData);
                
                // تطبيق البيانات المحفوظة على المدخلات
                if (userData.skills) {
                    Object.keys(userData.skills).forEach(skillName => {
                        const range = document.querySelector(`[data-skill="${getSkillKey(skillName)}"]`);
                        if (range) {
                            range.value = userData.skills[skillName];
                            range.dispatchEvent(new Event('input'));
                        }
                    });
                }
                
                showNotification('تم تحميل بياناتك المحفوظة مسبقاً! 📂');
            }
        }
        
        function getSkillKey(skillName) {
            // تحويل اسم المهارة العربية إلى المفتاح الإنجليزي المستخدم في data-skill
            const skillMap = {
                'التركيز': 'focus',
                'الفهم': 'comprehension',
                'السرعة': 'speed',
                'الدقة': 'accuracy',
                'التنظيم': 'organization',
                'القواعد': 'grammar',
                'الإبداع': 'creativity',
                'الوضوح': 'clarity',
                'الطلاقة': 'fluency',
                'النطق': 'pronunciation',
                'الثقة': 'confidence',
                'التفاعل': 'interaction',
                'الاستيعاب': 'absorption',
                'التحليل': 'analysis'
            };
            
            return skillMap[skillName] || skillName;
        }
        
        function exportToPdf() {
            // محاكاة تصدير PDF
            showNotification('جاري تحضير التقرير للتحميل... 📄');
            
            setTimeout(() => {
                showNotification('تم تصدير التقرير بنجاح! يمكنك تحميله الآن. ✅');
                
                // في التطبيق الحقيقي، هنا سيتم إنشاء وتنزيل ملف PDF
                const averages = calculateAverages();
                const allSkills = getAllSkills();
                
                console.log('بيانات التقرير:', { averages, allSkills });
            }, 2000);
        }
        
        function shareResults() {
            const averages = calculateAverages();
            const overallAverage = Object.values(averages).reduce((a, b) => a + b, 0) / 4;
            
            const shareText = `نتائج تحليل مهاراتي اللغوية:
القراءة: ${averages.reading}%
الكتابة: ${averages.writing}%
الاستماع: ${averages.listening}%
المحادثة: ${averages.speaking}%
المتوسط العام: ${Math.round(overallAverage)}%

شاركنا تقدمك! 🌟`;
            
            // محاكاة مشاركة النتائج
            if (navigator.share) {
                navigator.share({
                    title: 'نتائج تحليل المهارات اللغوية',
                    text: shareText
                });
            } else {
                // نسخ النص إلى الحافظة
                navigator.clipboard.writeText(shareText).then(() => {
                    showNotification('تم نسخ النتائج إلى الحافظة! يمكنك مشاركتها الآن. 🔗');
                });
            }
        }
        
        // التحليلات المتقدمة
        function updateAdvancedAnalytics() {
            const analyticsGrid = document.getElementById('analyticsGrid');
            const allSkills = getAllSkills();
            const skillValues = Object.values(allSkills);
            const averages = calculateAverages();
            
            // حساب الإحصائيات
            const mean = skillValues.reduce((a, b) => a + b, 0) / skillValues.length;
            const variance = skillValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / skillValues.length;
            const stdDev = Math.sqrt(variance);
            const cv = (stdDev / mean) * 100;
            
            // حساب الاتساق
            const consistency = 100 - cv;
            
            // حساب مؤشر القوة والضعف
            const maxSkill = Math.max(...skillValues);
            const minSkill = Math.min(...skillValues);
            const strengthWeaknessRatio = (maxSkill / minSkill).toFixed(2);
            
            // حساب التقدم المحتمل
            const overallAverage = Object.values(averages).reduce((a, b) => a + b, 0) / 4;
            const potentialProgress = (100 - overallAverage).toFixed(1);
            
            analyticsGrid.innerHTML = `
                <div class="analytics-item">
                    <div class="analytics-title">متوسط جميع المهارات</div>
                    <div class="analytics-value">${mean.toFixed(1)}%</div>
                    <div class="analytics-trend trend-up">+2.5% عن الشهر الماضي</div>
                </div>
                <div class="analytics-item">
                    <div class="analytics-title">مستوى الاتساق</div>
                    <div class="analytics-value">${consistency.toFixed(1)}%</div>
                    <div class="analytics-trend ${consistency > 80 ? 'trend-up' : 'trend-down'}">
                        ${consistency > 80 ? 'اتساق عالي' : 'تحتاج لتحسين التوازن'}
                    </div>
                </div>
                <div class="analytics-item">
                    <div class="analytics-title">مؤشر القوة والضعف</div>
                    <div class="analytics-value">${strengthWeaknessRatio}</div>
                    <div class="analytics-trend ${strengthWeaknessRatio < 2 ? 'trend-up' : 'trend-down'}">
                        ${strengthWeaknessRatio < 2 ? 'متوازن' : 'فجوات كبيرة'}
                    </div>
                </div>
                <div class="analytics-item">
                    <div class="analytics-title">التقدم المحتمل</div>
                    <div class="analytics-value">+${potentialProgress}%</div>
                    <div class="analytics-trend trend-up">إمكانية نمو كبيرة</div>
                </div>
            `;
        }
   
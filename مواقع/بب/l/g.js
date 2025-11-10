/**
 * @file محسّن — مع تأثيرات بصرية متقدمة
 */

class DifficultySelectorEnhanced {
    constructor() {
        this.modeButtons = document.querySelectorAll('.mode-btn');
        this.previewBox = document.getElementById('previewBox');
        this.previewTitle = document.getElementById('previewTitle');
        this.previewDesc = document.getElementById('previewExplanation');
        this.previewVisual = document.getElementById('previewVisual');
        
        this.init();
    }

    modeData = {
        light: {
            title: '🌟 خفيف — بداية مريحة',
            desc: 'تجربة سلسة مع إرشادات تفاعلية وخطوات واضحة',
            color: '#00ff9d'
        },
        medium: {
            title: '📊 متوسط — التوازن المثالي',
            desc: 'مزيج مثالي بين التحدي والمتعة مع ميزات ذكية',
            color: '#ffb74d'
        },
        heavy: {
            title: '⚡ ثقيل — للخبراء فقط',
            desc: 'تحديات معقدة، مؤثرات قوية، وسرعة فائقة',
            color: '#ff006e'
        },
        pro: {
            title: '🚀 متخصص — تجربة VIP',
            desc: 'إمكانيات غير محدودة، إعدادات احترافية، وتصميم فريد',
            color: '#ff00cc'
        }
    };

    init() {
        this.bindEvents();
        this.loadSavedMode();
    }

    bindEvents() {
        this.modeButtons.forEach(btn => {
            // دعم النقر
            btn.addEventListener('click', () => this.setMode(btn.dataset.mode));
            
            // دعم المفاتيح
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.setMode(btn.dataset.mode);
                }
            });

            // تأثيرات hover على معاينة مباشرة
            btn.addEventListener('mouseenter', () => {
                this.previewVisual.style.background = getComputedStyle(btn).color;
                this.previewVisual.style.opacity = '0.3';
            });
        });
    }

    setMode(mode) {
        localStorage.setItem('difficultyMode', mode);
        this.updateButtonStates(mode);
        this.updatePreview(mode);
        this.updateBodyClass(mode);
        
        // تأثير انتقال للمعاينة
        this.animatePreviewTransition();
        
        window.dispatchEvent(new CustomEvent('difficultyChanged', { detail: { mode } }));
    }

    updateButtonStates(mode) {
        this.modeButtons.forEach(btn => {
            const isSelected = btn.dataset.mode === mode;
            btn.setAttribute('aria-selected', isSelected);
            btn.setAttribute('tabindex', isSelected ? '0' : '-1');
        });
    }

    updatePreview(mode) {
        const data = this.modeData[mode];
        if (!data) return;

        this.previewTitle.textContent = data.title;
        this.previewDesc.textContent = data.desc;
        this.previewVisual.style.background = data.color;
        this.previewVisual.style.opacity = '0.2';
    }

    animatePreviewTransition() {
        this.previewBox.style.transform = 'scale(0.95)';
        this.previewBox.style.opacity = '0.7';
        
        requestAnimationFrame(() => {
            this.previewBox.style.transform = '';
            this.previewBox.style.opacity = '';
        });
    }

    updateBodyClass(mode) {
        document.body.classList.remove('mode-light', 'mode-medium', 'mode-heavy', 'mode-pro');
        document.body.classList.add(`mode-${mode}`);
    }

    loadSavedMode() {
        const savedMode = localStorage.getItem('difficultyMode') || 'light';
        this.setMode(savedMode);
    }
}

// تهيئة
document.addEventListener('DOMContentLoaded', () => {
    new DifficultySelectorEnhanced();
});
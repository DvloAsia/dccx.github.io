/* DccX 双语网站语言切换功能 */

// 语言配置
const languages = {
    'zh': {
        'name': '中文',
        'dir': '/zh/',
        'active': true
    },
    'en': {
        'name': 'English',
        'dir': '/en/',
        'active': false
    }
};

// 当前语言
let currentLanguage = 'zh';

// 语言切换按钮
function createLanguageSwitch() {
    const languageSwitch = document.getElementById('language-switch');
    if (!languageSwitch) return;
    
    // 创建语言切换按钮
    const langButtons = document.createElement('div');
    langButtons.className = 'language-buttons';
    
    Object.keys(languages).forEach(lang => {
        const btn = document.createElement('button');
        btn.className = 'lang-btn';
        btn.textContent = languages[lang].name;
        btn.dataset.lang = lang;
        
        if (lang === currentLanguage) {
            btn.style.backgroundColor = '#3498db';
            btn.style.color = 'white';
        } else {
            btn.style.backgroundColor = '#2c3e50';
            btn.style.color = 'white';
        }
        
        btn.addEventListener('click', () => {
            switchLanguage(lang);
        });
        
        langButtons.appendChild(btn);
    });
    
    languageSwitch.appendChild(langButtons);
}

// 切换语言
function switchLanguage(lang) {
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    
    // 更新按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.style.backgroundColor = '#3498db';
            btn.style.color = 'white';
        } else {
            btn.style.backgroundColor = '#2c3e50';
            btn.style.color = 'white';
        }
    });
    
    // 保存语言选择
    localStorage.setItem('dccx-language', lang);
    
    // 跳转到对应语言页面
    const currentPath = window.location.pathname;
    const basePath = '/';
    
    if (currentPath.includes('/zh/') || currentPath.includes('/en/')) {
        // 如果在特定语言页面，跳转到新语言的对应页面
        const pageName = currentPath.split('/').pop();
        const newPath = languages[lang].dir + pageName;
        window.location.href = newPath;
    } else {
        // 如果在主页，跳转到对应语言主页
        window.location.href = languages[lang].dir + 'index.html';
    }
}

// 初始化语言
function initLanguage() {
    // 从 localStorage 读取语言设置
    const savedLang = localStorage.getItem('dccx-language');
    if (savedLang && languages[savedLang]) {
        currentLanguage = savedLang;
    }
    
    // 如果当前路径匹配语言目录，更新当前语言
    const currentPath = window.location.pathname;
    if (currentPath.includes('/zh/')) {
        currentLanguage = 'zh';
    } else if (currentPath.includes('/en/')) {
        currentLanguage = 'en';
    }
    
    // 创建语言切换按钮
    createLanguageSwitch();
    
    // 设置页面语言标记
    document.documentElement.lang = currentLanguage;
    
    // 更新所有语言相关的元素
    updatePageLanguage();
}

// 更新页面语言内容
function updatePageLanguage() {
    // 这里可以添加动态内容切换功能
    // 比如：翻译页面上的一些文本元素
    // 或者：加载对应语言的 JSON 翻译数据
}

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', initLanguage);

// 页面路由支持
if (window.location.pathname === '/') {
    // 主页自动跳转到默认语言
    const savedLang = localStorage.getItem('dccx-language') || 'zh';
    window.location.href = languages[savedLang].dir + 'index.html';
}
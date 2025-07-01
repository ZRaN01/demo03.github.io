// Plot页面JavaScript逻辑

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('Plot页面已加载');
    
    // 初始化导航栏功能
    initNavigation();
    
    // 初始化所有tabber组件
    initTabbers();
    
    // 初始化目录功能
    initTOC();
});

// 初始化导航栏功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果点击的是当前页面链接，阻止默认行为
            if (this.classList.contains('active')) {
                e.preventDefault();
            }
        });
    });
}

// 初始化所有tabber组件
function initTabbers() {
    const tabbers = document.querySelectorAll('.tabber');
    
    tabbers.forEach(tabber => {
        initSingleTabber(tabber);
    });
}

// 初始化单个tabber组件
function initSingleTabber(tabber) {
    const tabs = tabber.querySelectorAll('.tabbertab');
    
    if (tabs.length === 0) return;
    
    // 创建选项卡按钮容器
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabber-tabs';
    
    // 为每个选项卡创建按钮
    tabs.forEach((tab, index) => {
        const title = tab.getAttribute('title') || `选项卡 ${index + 1}`;
        
        // 创建按钮
        const button = document.createElement('button');
        button.className = 'tabber-tab-button';
        button.textContent = title;
        button.setAttribute('data-tab-index', index);
        
        // 添加点击事件
        button.addEventListener('click', function() {
            switchTab(tabber, index);
        });
        
        tabsContainer.appendChild(button);
    });
    
    // 将按钮容器插入到tabber的开头
    tabber.insertBefore(tabsContainer, tabber.firstChild);
    
    // 默认激活第一个选项卡
    switchTab(tabber, 0);
}

// 切换选项卡
function switchTab(tabber, activeIndex) {
    const buttons = tabber.querySelectorAll('.tabber-tab-button');
    const tabs = tabber.querySelectorAll('.tabbertab');
    
    // 移除所有激活状态
    buttons.forEach(button => button.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // 激活指定的选项卡和按钮
    if (buttons[activeIndex]) {
        buttons[activeIndex].classList.add('active');
    }
    if (tabs[activeIndex]) {
        tabs[activeIndex].classList.add('active');
    }
}

// 初始化目录功能
function initTOC() {
    const tocTab = document.querySelector('.toc-tab');
    const tocPanel = document.querySelector('.minimal-toc');
    const tocClose = document.querySelector('.toc-close');
    const tocPrimaries = document.querySelectorAll('.toc-primary');
    const tocLinks = document.querySelectorAll('.toc-link');

    if (!tocTab || !tocPanel) return;

    // 点击标签展开目录
    tocTab.addEventListener('click', () => {
        tocPanel.classList.add('active');
    });

    // 点击关闭按钮收起目录
    if (tocClose) {
        tocClose.addEventListener('click', () => {
            tocPanel.classList.remove('active');
        });
    }

    // 一级目录展开/收起和定位功能
    tocPrimaries.forEach(primary => {
        primary.addEventListener('click', () => {
            const section = primary.closest('.toc-section');
            section.classList.toggle('expanded');
            
            // 获取一级目录对应的页面标题ID
            const sectionType = primary.getAttribute('data-section');
            let targetId = null;
            
            // 根据section类型确定目标ID
            switch(sectionType) {
                case 'preparation':
                    targetId = 'preparation';
                    break;
                case 'navigation':
                    targetId = 'navigation-log';
                    break;
                case 'investigation':
                    targetId = 'investigation';
                    break;
                case 'plot':
                    targetId = 'plot-chapters';
                    break;
            }
            
            // 如果找到对应的目标元素，进行定位
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // 关闭目录面板
                    tocPanel.classList.remove('active');
                    
                    // 平滑滚动到目标位置
                    smoothScrollTo(targetElement);
                }
            }
        });
    });

    // 二级目录链接点击事件
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 关闭目录面板
                tocPanel.classList.remove('active');
                
                // 平滑滚动到目标位置
                smoothScrollTo(targetElement);
            }
        });
    });

    // 默认展开第一个章节
    const firstSection = document.querySelector('.toc-section');
    if (firstSection) {
        firstSection.classList.add('expanded');
    }
}

// 平滑滚动函数
function smoothScrollTo(targetElement) {
    // 检查目标元素是否在plot-content2-right容器内
    const scrollContainer = document.querySelector('.plot-content2-right');
    const isInScrollContainer = scrollContainer && scrollContainer.contains(targetElement);
    
    if (isInScrollContainer) {
        // 如果目标在滚动容器内，滚动该容器
        const containerRect = scrollContainer.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const targetY = targetElement.offsetTop - scrollContainer.offsetTop - 20; // 减去20px的偏移量
        const startY = scrollContainer.scrollTop;
        const distance = targetY - startY;
        const duration = 600;
        let startTime = null;
        
        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            scrollContainer.scrollTop = startY + distance * easeOutQuart(progress);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    } else {
        // 如果目标不在滚动容器内，滚动整个页面
        const targetY = targetElement.offsetTop - 80; // 减去80px的偏移量，避免被固定头部遮挡
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const duration = 600;
        let startTime = null;
        
        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            window.scrollTo(0, startY + distance * easeOutQuart(progress));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
}
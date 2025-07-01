// 第五人格主页JavaScript

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('第五人格主页加载完成');
    
    // 初始化页面
    initPage();
});

// 初始化页面函数
function initPage() {
    // 检查背景图片是否加载成功
    checkBackgroundImage();
    
    // 添加页面滚动事件监听
    addScrollListener();
    
    // 初始化视频自动播放功能
    initVideoAutoPlay();
}

// 检查背景图片加载状态
function checkBackgroundImage() {
    const img = new Image();
    img.onload = function() {
        console.log('背景图片加载成功');
        document.body.classList.add('bg-loaded');
    };
    img.onerror = function() {
        console.error('背景图片加载失败');
    };
    img.src = 'imaegs/网站背景+主视觉图2.jpg';
}

// 添加滚动事件监听
function addScrollListener() {
    window.addEventListener('scroll', function() {
        // 可以在这里添加滚动相关的交互效果
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // console.log('页面滚动位置:', scrollTop);
    });
}

// 初始化视频自动播放功能
function initVideoAutoPlay() {
    const videos = document.querySelectorAll('.publicity-video');
    if (videos.length === 0) {
        console.log('未找到宣传视频元素');
        return;
    }
    
    // 创建Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 当视频有一半以上出现在视图窗时
            if (entry.intersectionRatio >= 0.5) {
                // 自动播放视频
                entry.target.play().then(() => {
                    console.log('视频开始自动播放');
                }).catch(error => {
                    console.log('视频自动播放失败:', error);
                });
            } else {
                // 停止视频播放
                entry.target.pause();
                console.log('视频已暂停');
            }
        });
    }, {
        // 设置阈值为0.5，即当视频有50%可见时触发
        threshold: 0.5
    });
    
    // 开始观察所有视频元素
    videos.forEach(video => {
        observer.observe(video);
    });
}

// 页面resize事件处理
window.addEventListener('resize', function() {
    // 处理窗口大小变化
    console.log('窗口大小改变:', window.innerWidth, 'x', window.innerHeight);
});
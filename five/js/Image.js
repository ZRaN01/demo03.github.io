// 主视觉图组件和精华头像交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有图片元素（包括主视觉图和精华头像）
    const imageItems = document.querySelectorAll('.image-item img, .avatar-item img');
    
    // 为每个图片添加点击事件
    imageItems.forEach(function(img) {
        img.addEventListener('click', function() {
            // 创建模态框显示大图
            createImageModal(this.src, this.alt);
        });
    });
});

// 创建图片模态框函数
function createImageModal(imageSrc, imageAlt) {
    // 创建模态框容器
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <img src="${imageSrc}" alt="${imageAlt}" class="modal-image">
            <div class="modal-caption">${imageAlt}</div>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(modal);
    
    // 添加关闭事件
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    });
}
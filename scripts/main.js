document.addEventListener('DOMContentLoaded', () => {
    // 获取所有作品项
    const workItems = document.querySelectorAll('.work-item');

    // 为每个作品项添加点击事件
    workItems.forEach(item => {
        const preview = item.querySelector('.work-preview');
        const details = item.querySelector('.work-details');
        const video = item.querySelector('.video-container video');

        preview.addEventListener('click', () => {
            // 切换详情区域的显示状态
            const isExpanded = details.classList.contains('active');
            
            // 先关闭所有其他展开的作品
            document.querySelectorAll('.work-details.active').forEach(detail => {
                if (detail !== details) {
                    detail.classList.remove('active');
                    detail.parentElement.classList.remove('active');
                    // 暂停其他作品的视频
                    const otherVideo = detail.querySelector('.video-container video');
                    if (otherVideo) {
                        otherVideo.pause();
                    }
                }
            });

            // 切换当前作品的展开状态
            if (!isExpanded) {
                // 展开详情
                details.classList.add('active');
                item.classList.add('active');
                
                // 平滑滚动到详情区域
                setTimeout(() => {
                    details.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
            } else {
                // 收起详情
                details.classList.remove('active');
                item.classList.remove('active');
                
                // 暂停当前视频
                if (video) {
                    video.pause();
                }
                
                // 滚动回预览区域
                item.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    // 添加图片点击放大功能
    const images = document.querySelectorAll('.image-grid img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90vh;
                object-fit: contain;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);

            modal.addEventListener('click', () => {
                modal.remove();
            });
        });
    });
}); 
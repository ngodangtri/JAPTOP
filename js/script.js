document.addEventListener('DOMContentLoaded', function() {
    // Hàm kiểm tra ảnh tồn tại
    const checkImageExists = (url, callback) => {
        const img = new Image();
        img.onload = function() {
            callback(true);
        };
        img.onerror = function() {
            callback(false);
        };
        img.src = url;
    };

    // 1. Xử lý hover cho sản phẩm trên trang chủ
    const initProductCardHover = () => {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productInfo = card.querySelector('.product-info');
            if (!productInfo) return;
            
            card.addEventListener('mouseenter', () => {
                productInfo.style.maxHeight = '200px';
            });
            
            card.addEventListener('mouseleave', () => {
                productInfo.style.maxHeight = '0';
            });
        });
    };

    // 2. Xử lý ảnh sản phẩm trên trang chi tiết
    const initProductGallery = () => {
        const mainImage = document.getElementById('main-image');
        const thumbnailContainer = document.getElementById('thumbnailContainer');
        
        if (!mainImage || !thumbnailContainer) return;

        // Danh sách ảnh cần kiểm tra
        const imageList = Array.from({length: 10}, (_, i) => `x2scrap${i+1}.png`);
        
        // Xóa thông báo loading
        thumbnailContainer.innerHTML = '';
        
        let firstValidImage = null;
        let imagesProcessed = 0;
        
        // Kiểm tra và hiển thị ảnh
        imageList.forEach((imgName, index) => {
            checkImageExists(imgName, (exists) => {
                imagesProcessed++;
                
                if (exists) {
                    // Tạo thumbnail
                    const thumb = document.createElement('img');
                    thumb.src = imgName;
                    thumb.className = 'thumbnail';
                    thumb.alt = `Ảnh ${index + 1}`;
                    thumb.onclick = () => {
                        mainImage.src = imgName;
                        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                        thumb.classList.add('active');
                    };
                    
                    thumbnailContainer.appendChild(thumb);
                    
                    // Đặt ảnh đầu tiên làm ảnh chính
                    if (!firstValidImage) {
                        firstValidImage = imgName;
                        mainImage.src = imgName;
                        thumb.classList.add('active');
                    }
                }
                
                // Hiển thị thông báo nếu không có ảnh nào sau khi xử lý tất cả
                if (imagesProcessed === imageList.length && thumbnailContainer.children.length === 0) {
                    thumbnailContainer.innerHTML = '<p class="no-thumbnails">Không có ảnh sản phẩm</p>';
                }
            });
        });
    };

    // 3. Xử lý active navigation
    const initActiveNavigation = () => {
        const currentPath = window.location.pathname;
        const navButtons = document.querySelectorAll('.nav-button');
        
        navButtons.forEach(button => {
            if (button.getAttribute('href') === currentPath) {
                button.classList.add('active-nav');
            }
        });
    };

    // Khởi tạo tất cả các hàm
    initProductCardHover();
    initProductGallery();
    initActiveNavigation();
});
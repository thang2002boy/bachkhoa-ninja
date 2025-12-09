// tinhnang.js

/**
 * 💡 Dữ Liệu Tính Năng Game
 */
const features = [
    { id: 1, name: "Hảo Cảm", desc: "Tính năng cực kì quan trọng giúp nhân vật sử dụng ultimate sớm hơn đối thủ.", imageUrl: "img/ImgHaoCam/haoCamMain.png" },
    { id: 2, name: "Thẻ Chiến Ý", desc: "Hệ thống thẻ bài cung cấp chỉ số và kỹ năng bổ trợ.", imageUrl: "hinh-nen-the-chien-y.png" },
    { id: 3, name: "Thần Khí", desc: "Vũ khí huyền thoại, cường hóa sức mạnh tổng thể.", imageUrl: "hinh-nen-than-khi.png" },
    { id: 4, name: "Trang Sức", desc: "Phụ kiện đặc biệt giúp tăng phòng thủ và chỉ số sống còn.", imageUrl: "hinh-nen-trang-suc.jpg" },
];

// tinhnang.js (ĐÃ SỬA: Dùng tinhnanghaocam.html chỉ cho Hảo Cảm)

/**
 * Hàm để render danh sách tính năng
 */
function renderFeatures() {
    const featureGrid = document.getElementById('feature-grid');
    if (!featureGrid) return;

    let htmlContent = '';
    
    features.forEach(feature => {
        // Kiểm tra ID của tính năng Hảo Cảm (Giả định ID Hảo Cảm là 1)
        const targetPage = feature.id === 1 ? "tinhnanghaocam.html" : "chi-tiet-tinh-nang.html";
        
        const featureCard = `
            <a href="${targetPage}?id=${feature.id}" 
               class="feature-card block overflow-hidden rounded-xl shadow-lg group">
                
                <div class="aspect-ratio-box"> 
                    <div class="aspect-ratio-content">
                        
                        <img src="${feature.imageUrl}" alt="${feature.name}" 
                             class="w-full h-full object-cover object-center transform group-hover:scale-110 transition duration-500 ease-in-out">
                        
                        <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition duration-300"></div>

                        <div class="absolute inset-0 flex items-end p-4">
                            <div class="text-white">
                                <h3 class="text-2xl font-extrabold leading-tight border-b-2 border-amber-500 pb-1">${feature.name}</h3>
                                <p class="text-sm opacity-90 mt-1">${feature.desc}</p>
                            </div>
                        </div>

                        <span class="absolute top-3 right-3 px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition duration-300">
                            XEM →
                        </span>

                    </div>
                </div>
            </a>
        `;
        htmlContent += featureCard;
    });

    featureGrid.innerHTML = htmlContent;
}
// Vẫn cần gọi hàm render khi DOMContentLoaded
// document.addEventListener('DOMContentLoaded', renderFeatures);

document.addEventListener('DOMContentLoaded', renderFeatures);
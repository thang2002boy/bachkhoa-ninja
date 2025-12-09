// tinhnanghaocam.js

const affinityItems = [
    //Hảo Cảm Lam
    { name: "Găng Ninja", quality: "Lam", imageUrl: "img/ImgHaoCam/gangNinja.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Thuốc Giải Độc", quality: "Lam", imageUrl: "img/ImgHaoCam/thuocGiaiDoc.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Viên Chakra", quality: "Lam", imageUrl: "img/ImgHaoCam/vienChakra.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Túi Trị Thương", quality: "Lam", imageUrl: "img/ImgHaoCam/tuiTriThuong.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Túi Ninja", quality: "Lam", imageUrl: "img/ImgHaoCam/tuiNinja.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Băng Huấn Luyện", quality: "Lam", imageUrl: "img/ImgHaoCam/bangHuanLuyen.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Guốc Gỗ", quality: "Lam", imageUrl: "img/ImgHaoCam/guocGo.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Mặt Nạ Hô Hấp", quality: "Lam", imageUrl: "img/ImgHaoCam/matNaHoHap.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Viên Ớt", quality: "Lam", imageUrl: "img/ImgHaoCam/vienOt.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Bình Rượu", quality: "Lam", imageUrl: "img/ImgHaoCam/binhRuou.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Xúc Xắc Quán Duyên", quality: "Lam", imageUrl: "img/ImgHaoCam/xucXacQuanDuyen.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Mặt Nạ Phòng Độc", quality: "Lam", imageUrl: "img/ImgHaoCam/matNaPhongDoc.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Chuông Huấn Luyện", quality: "Lam", imageUrl: "img/ImgHaoCam/chuongHuanLuyen.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Giày Đế Bằng", quality: "Lam", imageUrl: "img/ImgHaoCam/giayDeBang.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    { name: "Thảm Nhện", quality: "Lam", imageUrl: "img/ImgHaoCam/thamNhen.jpg", desc: "Dùng cho Ninja sẽ tăng 5 điểm Hảo Cảm" },
    //Hảo Cảm Tím
    { name: "Áo Ấm", quality: "Tím", imageUrl: "img/ImgHaoCam/aoAm.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Bùa Nổ", quality: "Tím", imageUrl: "img/ImgHaoCam/buaNo.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Cú Mèo Thông Linh", quality: "Tím", imageUrl: "img/ImgHaoCam/cuMeoThongLinh.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Độc Châm Ám Khí", quality: "Tím", imageUrl: "img/ImgHaoCam/docChamAmKhi.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Dù Ám Khí", quality: "Tím", imageUrl: "img/ImgHaoCam/duAmKhi.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Giày Cao Gót", quality: "Tím", imageUrl: "img/ImgHaoCam/giayCaoGot.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Khung Tình Bạn", quality: "Tím", imageUrl: "img/ImgHaoCam/khungTinhBan.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Kính Thông Khí", quality: "Tím", imageUrl: "img/ImgHaoCam/kinhThongKhi.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Máy Chơi Game", quality: "Tím", imageUrl: "img/ImgHaoCam/mayChoiGame.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Mũ Trùm Ninja", quality: "Tím", imageUrl: "img/ImgHaoCam/muTrumNinja.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Rối Luyện Tập", quality: "Tím", imageUrl: "img/ImgHaoCam/roiLuyenTap.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Sáo Ma", quality: "Tím", imageUrl: "img/ImgHaoCam/saoMa.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Thổi Tên", quality: "Tím", imageUrl: "img/ImgHaoCam/thoiTen.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Trang Sức Ếch Xanh", quality: "Tím", imageUrl: "img/ImgHaoCam/trangSucEchXanh.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    { name: "Túi Nhẫn Cụ", quality: "Tím", imageUrl: "img/ImgHaoCam/tuiNhanCu.jpg", desc: "Dùng cho Ninja sẽ tăng 20 điểm Hảo Cảm" },
    
    //Hảo Cảm Vàng
    { name: "Đạn Sương Mù", quality: "Vàng", imageUrl: "img/ImgHaoCam/danSuongMu.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Bùa Kết Giới", quality: "Vàng", imageUrl: "img/ImgHaoCam/buaKetGioi.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Cung Nhện", quality: "Vàng", imageUrl: "img/ImgHaoCam/cungNhen.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Dao Tập Kích", quality: "Vàng", imageUrl: "img/ImgHaoCam/daoTapKich.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Đồ Dạ Hành", quality: "Vàng", imageUrl: "img/ImgHaoCam/doDaHanh.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Giáp Dã Man", quality: "Vàng", imageUrl: "img/ImgHaoCam/giapDaMan.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Kim Châm Phong Huyệt", quality: "Vàng", imageUrl: "img/ImgHaoCam/kimChamPhongHuyet.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Kusarigama", quality: "Vàng", imageUrl: "img/ImgHaoCam/kusarigama.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Mặt Nạ Hổ Vằn", quality: "Vàng", imageUrl: "img/ImgHaoCam/matNaHoVan.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Mặt Nạ Thần Bí", quality: "Vàng", imageUrl: "img/ImgHaoCam/matNaThanBi.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Nhẫn Trượng", quality: "Vàng", imageUrl: "img/ImgHaoCam/nhanTruong.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Phi Đao Đặc Chế", quality: "Vàng", imageUrl: "img/ImgHaoCam/phiDaoDacChe.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Phụ Kiện Shiba", quality: "Vàng", imageUrl: "img/ImgHaoCam/phuKienShiba.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Shuriken Ba Góc", quality: "Vàng", imageUrl: "img/ImgHaoCam/shurikenBaGoc.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Shuriken Phong Ma", quality: "Vàng", imageUrl: "img/ImgHaoCam/shurikenPhongMa.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Shuriken Xiềng Xích", quality: "Vàng", imageUrl: "img/ImgHaoCam/shurikenXiengXich.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Sợi Charka", quality: "Vàng", imageUrl: "img/ImgHaoCam/soiCharka.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Viên Binh Lương", quality: "Vàng", imageUrl: "img/ImgHaoCam/vienBinhLuong.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Viên Cà Ri", quality: "Vàng", imageUrl: "img/ImgHaoCam/vienCaRi.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Viên Tăng HP", quality: "Vàng", imageUrl: "img/ImgHaoCam/vienTangHP.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Viên Tinh Tâm", quality: "Vàng", imageUrl: "img/ImgHaoCam/vienTinhTam.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
    { name: "Vòng Tay Charka", quality: "Vàng", imageUrl: "img/ImgHaoCam/vongTayCharka.jpg", desc: "Dùng cho Ninja sẽ tăng 60 điểm Hảo Cảm" },
];

function renderAffinityItems(itemsToRender) {
    const itemGrid = document.getElementById('item-grid');
    if (!itemGrid) return;

    let htmlContent = '';
    
    itemsToRender.forEach(item => {
        const itemCard = `
            <div class="affinity-item p-1 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer" 
                 data-quality="${item.quality}">
                
                <!-- Khung ảnh chuẩn -->
                <div class="relative w-full" style="padding-top: 100%;"> 
                    <img src="${item.imageUrl}" alt="${item.name}" 
                         class="absolute inset-0 w-full h-full object-cover rounded-lg border-2"
                         style="border-color: ${getQualityColor(item.quality)};">
                </div>

                <!-- Tên item phía dưới -->
                <div class="mt-1 text-center">
                    <span class="text-black text-xs font-bold block">${item.name}</span>
                </div>
            </div>
        `;
        htmlContent += itemCard;
    });

    itemGrid.innerHTML = htmlContent;
}

// Hàm hỗ trợ lấy màu dựa trên phẩm chất
function getQualityColor(quality) {
    switch(quality) {
        case "Lam": return "#3b82f6"; // Blue-500
        case "Tím": return "#9333ea"; // Purple-600
        case "Vàng": return "#f59e0b"; // Amber-500
        default: return "#e5e7eb"; // Gray-200
    }
}

// Hàm xử lý tìm kiếm và lọc
function filterItems() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.bg-opacity-100')?.dataset.quality || 'All';

    const filtered = affinityItems.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm);
        const qualityMatch = activeFilter === 'All' || item.quality === activeFilter;
        return nameMatch && qualityMatch;
    });

    renderAffinityItems(filtered);
}

// Thiết lập sự kiện lắng nghe
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render lần đầu
    renderAffinityItems(affinityItems);

    // 2. Lắng nghe sự kiện tìm kiếm
    document.getElementById('search-input').addEventListener('input', filterItems);

    // 3. Lắng nghe sự kiện lọc phẩm chất
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Cập nhật trạng thái nút (lớp CSS đơn giản)
            document.querySelectorAll('.filter-btn').forEach(btn => {
                 btn.classList.remove('bg-opacity-100', 'ring-2', 'ring-offset-2', 'ring-amber-500');
                 btn.classList.add('bg-gray-200');
            });
            e.target.classList.remove('bg-gray-200');
            e.target.classList.add('bg-opacity-100', 'ring-2', 'ring-offset-2', 'ring-amber-500');

            filterItems();
        });
    });
});
// app.js

// Khởi tạo các biến DOM
const characterList = document.getElementById('character-list');
const searchInput = document.getElementById('searchInput');
const detailContainer = document.getElementById('character-detail-container');
const detailName = document.getElementById('detail-name');
const detailContent = document.getElementById('detail-content');

// 🌟 BIẾN TOÀN CỤC CHO CUSTOM DROPDOWN TƯ CHẤT 🌟
// Giá trị này sẽ được cập nhật khi người dùng chọn Tư Chất trong Custom Dropdown.
let selectedTuchatValue = 'all';

// 🌟 BIẾN MỚI CHO CUSTOM DROPDOWN HỆ NGUYÊN TỐ 🌟
let selectedClassValue = 'all';

// ------------------------------------------------------------------------
// --- HÀM HỖ TRỢ ĐỊNH DẠNG VÀ TẠO DROPDOWN TỰ ĐỘNG ---
// ------------------------------------------------------------------------

/**
 * Hàm định dạng mảng (như village hoặc class) thành chuỗi hiển thị đẹp.
 */
function formatArrayForDisplay(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return 'N/A';
    }
    // Viết hoa chữ cái đầu và nối bằng dấu phẩy, khoảng trắng
    return arr.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(', ');
}

/**
 * Lấy ra danh sách TẤT CẢ các làng (village) và nhóm (khác) duy nhất.
 */
function getUniqueVillages() {
    if (!window.charactersData || !Array.isArray(window.charactersData)) {
        return [];
    }

    // Sử dụng flatMap để làm phẳng mảng village và chuyển sang chữ thường
    const allVillages = window.charactersData.flatMap(char =>
        Array.isArray(char.village) ? char.village.map(v => v.toLowerCase()) : []
    );

    const uniqueVillages = [...new Set(allVillages)];
    uniqueVillages.sort();

    return uniqueVillages;
}

/**
 * Định dạng tên làng/khác cho phù hợp để hiển thị trong dropdown.
 */
function formatVillageName(name) {
    if (name === 'akatsuki') return 'Akatsuki';
    if (name === 'khác') return 'Khác';
    if (name === '???') return '??? (Không Rõ)';

    // Viết hoa chữ cái đầu của mỗi từ 
    return name.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

/**
 * Hàm điền các lựa chọn vào dropdown Làng/Khác.
 */
function populateVillageFilter() {
    const villageSelect = document.getElementById('villageFilter');

    // Nếu dropdown đã có dữ liệu (nhiều hơn 1 option là 'all') thì không cần điền lại
    if (!villageSelect || villageSelect.options.length > 1) return;

    const uniqueVillages = getUniqueVillages();

    uniqueVillages.forEach(village => {
        const option = document.createElement('option');

        option.value = village; // Giá trị (value) là chữ thường để dễ lọc
        option.textContent = formatVillageName(village); // Hiển thị tên đẹp

        villageSelect.appendChild(option);
    });
}


// ------------------------------------------------------------------------
// --- CÁC HÀM XỬ LÝ CHÍNH ---
// ------------------------------------------------------------------------

/**
 * 1. HÀM TẠO VÀ HIỂN THỊ DANH SÁCH NHÂN VẬT 
 */
window.renderCharacterList = function (data) {
    characterList.innerHTML = '';

    if (data.length === 0) {
        characterList.innerHTML = '<p class="col-span-full text-center text-gray-500 text-xl">Không tìm thấy nhân vật nào phù hợp.</p>';
        return;
    }

    data.forEach(char => {
        const cardHTML = `
            <div class="character-card overflow-hidden cursor-pointer"
                 data-id="${char.id}" 
                 onclick="loadCharacterDetail('${char.id}')">
                
                <img src="${char.imgUrl}" alt="${char.name}">
                
                <div class="p-2 text-center">
                    <h3 class="character-name truncate" title="${char.name}">${char.name}</h3> 
                </div>
            </div>
        `;
        characterList.innerHTML += cardHTML;
    });
};
/**
 * . HÀM HỖ TRỢ HIỂN THỊ ICON KỸ NĂNG DẠNG TRÒN
 */
function createSkillIcons(skillsArray, cssClass = 'w-12 h-12') {
    if (!skillsArray || skillsArray.length === 0) {
        return `<div class="text-sm text-gray-500 italic">Chưa có Kỹ Năng</div>`;
    }

    // Lấy tối đa 4 skill nếu không có ảnh cụ thể, ta dùng placeholder
    const iconHtml = skillsArray.slice(0, 4).map(skill => {
        // Giả định bạn có trường 'iconUrl' trong data.js, nếu không có, dùng placeholder
        const iconSrc = skill.iconUrl || 'img/placeholder_skill.png';
        const tooltipText = `${skill.name}: ${skill.desc}`;

        return `
            <div class="relative group mx-1">
                <img src="${iconSrc}" alt="${skill.name}" 
                     class="${cssClass} object-cover rounded-full border-2 border-yellow-500 shadow-md transition-transform duration-200 hover:scale-110 cursor-pointer"
                     data-tooltip="${tooltipText}">
                
                <span class="absolute z-10 hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 
                             bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-90">
                    ${tooltipText}
                </span>
            </div>
        `;
    }).join('');

    return `<div class="flex flex-wrap justify-center sm:justify-start mt-2">${iconHtml}</div>`;
}
/**
 * 2. HÀM HIỂN THỊ CHI TIẾT NHÂN VẬT 
 */
window.loadCharacterDetail = function (id) {
    const character = charactersData.find(char => char.id === id);

    if (!character) {
        detailContainer.classList.add('hidden');
        return;
    }

    // Đảm bảo các đối tượng cần thiết đã được định nghĩa ở ngoài scope này
    const detailContainer = document.getElementById('character-detail-container');
    const detailName = document.getElementById('detail-name');
    const detailContent = document.getElementById('detail-content');

    detailContainer.classList.remove('hidden');
    detailName.textContent = character.name;

    // Lấy dữ liệu skill để truyền vào hàm tạo icon
    const mainSkills = character.skills?.main || [];
    const ultimateSkills = character.skills?.ultimate || [];

    // const stats = character.stats || { hp: 'N/A', dmg: 'N/A' }; // Bỏ biến này nếu không dùng

    // Sử dụng hàm hỗ trợ để hiển thị mảng
    const displayVillage = formatArrayForDisplay(character.village);
    const displayClass = formatArrayForDisplay(character.class);


    const detailHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
            <img src="${character.imgUrl}" alt="${character.name}" class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">

            <p class="mt-4 text-center font-bold text-2xl text-purple-700">
                LOẠI: <span class="text-indigo-600">${character.type.toUpperCase()}</span>
            </p>

            <p class="mt-2 text-center font-extrabold text-3xl rank-font">
                TƯ CHẤT: ${character.tuchat || 'N/A'}
            </p>

            <div class="text-center mt-6">
                <a href="character.html?id=${character.id}" 
                    class="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
                    🔍 Xem Chi Tiết Đầy Đủ
                </a>
            </div>
        </div>

        <div class="md:col-span-2">
            <div class="bg-gray-100 p-4 rounded-lg border-l-4 border-indigo-500">
                <h4 class="text-2xl font-bold mb-3 text-gray-800">Thông Tin Cơ Bản</h4>
                <p><strong>Tên:</strong> ${character.name}</p>
                <p><strong>Định vị:</strong> <span class="font-semibold">${displayVillage}</span></p> 
                <p><strong>Hệ Nguyên Tố:</strong> <span class="font-semibold">${displayClass}</span></p> 
                <p><strong>Mô tả:</strong> ${character.info}</p>
            </div>
            
            <div class="mt-6 p-4 rounded-lg border-l-4 border-purple-500 bg-gray-50">
                <h4 class="text-2xl font-bold mb-3 text-purple-700">Kỹ Năng</h4>
                ${createSkillIcons(mainSkills, 'w-14 h-14')}
            </div>

            <div class="mt-4 p-4 rounded-lg border-l-4 border-red-500 bg-gray-50">
                <h4 class="text-2xl font-bold mb-3 text-red-700">KN Bí Kĩ</h4>
                ${createSkillIcons(ultimateSkills, 'w-14 h-14')}
            </div>

            </div>
    </div>
    `;

    detailContent.innerHTML = detailHTML;

    detailContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
/**
 * 3. HÀM TÌM KIẾM, LỌC KẾT HỢP (Logic 4 điều kiện)
 * ĐÃ CẬP NHẬT để sử dụng selectedTuchatValue và selectedClassValue cho bộ lọc
 */
window.searchCharacters = function () {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // 🌟 Đọc giá trị Hệ Nguyên Tố từ biến toàn cục của Custom Dropdown 🌟
    const classFilter = selectedClassValue;

    // Đọc giá trị Làng/Khác từ <select>
    const villageFilter = document.getElementById('villageFilter').value.toLowerCase();

    // 🌟 Đọc giá trị Tư Chất từ biến toàn cục của Custom Dropdown 🌟
    const tuchatFilter = selectedTuchatValue;

    const filteredCharacters = charactersData.filter(char => {
        const nameMatch = char.name.toLowerCase().includes(searchTerm);

        // Lọc Hệ Nguyên Tố: Kiểm tra char.class (MẢNG) có chứa giá trị lọc không (sử dụng selectedClassValue)
        const classMatch = classFilter === 'all' ||
            (Array.isArray(char.class) && char.class.some(c => c.toLowerCase() === classFilter));

        // Lọc Tư Chất (Sử dụng selectedTuchatValue)
        const tuchatMatch = tuchatFilter === 'all' ||
            char.tuchat.toLowerCase() === tuchatFilter;

        // Lọc Làng/Khác: Kiểm tra char.village (MẢNG) có chứa giá trị lọc không
        const villageMatch = villageFilter === 'all' ||
            (Array.isArray(char.village) && char.village.some(v => v.toLowerCase() === villageFilter));

        return nameMatch && classMatch && tuchatMatch && villageMatch;
    });

    renderCharacterList(filteredCharacters);
    document.getElementById('character-detail-container').classList.add('hidden');
};

/**
 * 4. HÀM LỌC THEO HỆ NGUYÊN TỐ (Dành cho các nút bấm lọc nhanh - Giờ ít dùng nếu có Custom Dropdown)
 */
window.filterCharacters = function (system) {
    // Xử lý đổi màu nút (Nếu có)
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('bg-orange-600', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });

    const filterSystem = system.toLowerCase();

    if (filterSystem === 'all') {
        renderCharacterList(charactersData);
    } else {
        const filtered = charactersData.filter(char =>
            Array.isArray(char.class) && char.class.some(c => c.toLowerCase() === filterSystem)
        );
        renderCharacterList(filtered);
    }

    const activeButton = document.querySelector(`[data-filter="${system}"]`);
    if (activeButton) {
        activeButton.classList.add('bg-orange-600', 'text-white');
        activeButton.classList.remove('bg-gray-200', 'text-gray-700');
    }
};
// ------------------------------------------------------------------------
// --- HÀM CHO CUSTOM DROPDOWN CHUNG (Tư Chất và Hệ Nguyên Tố) ---
// ------------------------------------------------------------------------

/**
 * Hàm bật/tắt hiển thị dropdown
 */
window.toggleDropdown = function (dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle('hidden');
}

/**
 * Hàm xử lý khi chọn một giá trị Tư Chất
 */
window.selectTuchat = function (value, element) {
    selectedTuchatValue = value; // Cập nhật giá trị đã chọn

    // Ẩn dropdown
    const dropdown = document.getElementById('tuchatDropdown');
    dropdown.classList.add('hidden');

    // Cập nhật text trên nút hiển thị
    const displayButton = document.getElementById('tuchatDisplayButton');
    // Cập nhật text và icon mũi tên
    displayButton.innerHTML = `${element.textContent.trim()} <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;

    // Gọi hàm lọc chính để cập nhật danh sách
    searchCharacters();
}

/**
 * HÀM MỚI: Xử lý khi chọn một giá trị Hệ Nguyên Tố
 */
window.selectClass = function (value, element) {
    selectedClassValue = value; // Cập nhật giá trị đã chọn

    // Ẩn dropdown
    const dropdown = document.getElementById('classDropdown');
    dropdown.classList.add('hidden');

    // Cập nhật text trên nút hiển thị
    const displayButton = document.getElementById('classDisplayButton');
    displayButton.innerHTML = `${element.textContent.trim()} <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;

    // Gọi hàm lọc chính để cập nhật danh sách
    searchCharacters();
}

/**
 * HÀM CHIA SẺ LÊN FACEBOOK
 */
window.shareOnFacebook = function () {
    const pageUrl = encodeURIComponent(window.location.href);
    const facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl;

    window.open(facebookShareUrl,
        'Facebook Share',
        'width=600,height=400,resizable=yes,scrollbars=yes');
};

// ------------------------------------------------------------------------
// 🌟 KHỞI TẠO TRANG: ĐẢM BẢO TỰ ĐỘNG ĐIỀN CHẠY TRƯỚC KHI LỌC 🌟
// ------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. Điền dữ liệu vào dropdown Làng/Khác
    populateVillageFilter();

    // 2. Gọi hàm lọc chính để hiển thị nhân vật ban đầu (hiển thị 'all' theo mặc định)
    window.searchCharacters();
});

// ------------------------------------------------------------------------
// --- HÀM XỬ LÝ SẮP XẾP CHÍNH ---
// ------------------------------------------------------------------------

// Định nghĩa thứ tự ưu tiên của Tư Chất (rank)
const TUCHAT_ORDER = {
    'sss+': 6,
    'sss': 5,
    'ss+': 4,
    'ss': 3,
    's': 2,
    'a': 1
};

/**
 * 5. HÀM SẮP XẾP NHÂN VẬT THEO TIÊU CHÍ (Tên hoặc Tư Chất)
 */
window.sortCharacters = function (key, order = 'asc') {
    // Lấy dữ liệu hiện tại đang được lọc (áp dụng logic lọc lại)
    const filteredCharacters = getCurrentFilteredData();

    filteredCharacters.sort((a, b) => {
        let comparison = 0;

        if (key === 'name') {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA > nameB) comparison = 1;
            else if (nameA < nameB) comparison = -1;

        } else if (key === 'tuchat') {
            // Sắp xếp Tư Chất (rank) bằng cách sử dụng map TUCHAT_ORDER
            const rankA = TUCHAT_ORDER[a.tuchat.toLowerCase()] || 0;
            const rankB = TUCHAT_ORDER[b.tuchat.toLowerCase()] || 0;

            comparison = rankA - rankB;
        }

        // Áp dụng thứ tự: asc (tăng dần) hoặc desc (giảm dần)
        return order === 'asc' ? comparison : comparison * -1;
    });

    // Hiển thị danh sách đã sắp xếp
    renderCharacterList(filteredCharacters);
};

/**
 * HÀM PHỤ TRỢ: Lấy dữ liệu đã được lọc theo trạng thái hiện tại của các dropdown/ô tìm kiếm
 * ĐÃ CẬP NHẬT để sử dụng selectedTuchatValue và selectedClassValue cho bộ lọc
 */
function getCurrentFilteredData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // 🌟 Đọc giá trị Hệ Nguyên Tố từ biến toàn cục của Custom Dropdown 🌟
    const classFilter = selectedClassValue;

    const villageFilter = document.getElementById('villageFilter').value.toLowerCase();

    // 🌟 Đọc giá trị Tư Chất từ biến toàn cục của Custom Dropdown 🌟
    const tuchatFilter = selectedTuchatValue;

    return window.charactersData.filter(char => {
        const nameMatch = char.name.toLowerCase().includes(searchTerm);

        const classMatch = classFilter === 'all' ||
            (Array.isArray(char.class) && char.class.some(c => c.toLowerCase() === classFilter));

        const tuchatMatch = tuchatFilter === 'all' ||
            char.tuchat.toLowerCase() === tuchatFilter;

        const villageMatch = villageFilter === 'all' ||
            (Array.isArray(char.village) && char.village.some(v => v.toLowerCase() === villageFilter));

        return nameMatch && classMatch && tuchatMatch && villageMatch;
    });
}
/**
 * HÀM HỖ TRỢ XỬ LÝ SỰ KIỆN NHẤN NÚT VÀ ĐỔI MÀU NÚT SẮP XẾP
 */
window.handleSortClick = function (key, order, buttonElement) {
    // 1. Loại bỏ màu cũ khỏi tất cả các nút
    const allButtons = document.querySelectorAll('.sort-btn');
    allButtons.forEach(btn => {
        // Loại bỏ màu xanh/đỏ tùy theo nút
        btn.classList.remove('bg-green-500', 'hover:bg-green-500', 'bg-red-500', 'hover:bg-red-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });

    // 2. Thêm màu mới cho nút đang được nhấn
    if (key === 'name') {
        buttonElement.classList.remove('bg-gray-200', 'text-gray-700');
        buttonElement.classList.add('bg-green-500', 'text-white');
    } else if (key === 'tuchat') {
        buttonElement.classList.remove('bg-gray-200', 'text-gray-700');
        buttonElement.classList.add('bg-red-500', 'text-white');
    }

    // 3. Gọi hàm sắp xếp chính
    sortCharacters(key, order);
};

/**
 * HÀM BUTTON TOP UP ////////////////////
 */
// Lấy button
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Hàm cuộn trang lên đầu
function scrollToTop() {
    // Sử dụng 'smooth' để cuộn mượt mà hơn
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Hàm hiển thị/ẩn button khi cuộn
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    // Nếu vị trí cuộn lớn hơn 300px (thay đổi nếu cần)
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        // Hiển thị nút (đặt opacity = 1)
        scrollTopBtn.style.opacity = "1";
        scrollTopBtn.style.pointerEvents = "auto"; // Cho phép click
    } else {
        // Ẩn nút (đặt opacity = 0)
        scrollTopBtn.style.opacity = "0";
        scrollTopBtn.style.pointerEvents = "none"; // Ngăn chặn click khi ẩn
    }
}
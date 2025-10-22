// characterDetail.js (PHIÊN BẢN CUỐI CÙNG ĐÃ CẬP NHẬT)

// ------------------------------------------------------------------------
// --- HÀM HỖ TRỢ ĐỊNH DẠNG ---
// ------------------------------------------------------------------------

function formatArrayForDisplay(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return 'N/A';
    }
    return arr.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(', ');
}

// ------------------------------------------------------------------------
// --- HÀM TẠO BẢNG THÔNG TIN CHI TIẾT (ĐÃ SỬA VỊ TRÍ TÍNH CÁCH) ---
// ------------------------------------------------------------------------

function createDetailTable(char) {
    const details = [
        { title: '<b>Tên</b>', value: char.full_name || char.name },
        { title: '<b>Tuổi</b>', value: char.age || 'N/A' },
        { title: '<b>Ngày Sinh</b>', value: char.birthday || 'N/A' },
        { title: '<b>Nơi Sinh</b>', value: char.birthplace || 'N/A' },
        { title: '<b>Giới Tính</b>', value: char.gender || 'N/A' },
        { title: '<b>Chiều Cao & Cân Nặng</b>', value: `${char.height || 'N/A'} / ${char.weight || 'N/A'}` },
        { title: '<b>Nhóm Máu</b>', value: char.blood_type || 'N/A' },
        { title: '<b>Cấp Bậc</b>', value: char.rank || 'N/A' },
        { title: '<b>Ninja ID</b>', value: char.ninja_id || 'N/A' },
        { title: '<b>Đội (Team)</b>', value: char.team || formatArrayForDisplay(char.village) },
        { title: '<b>Thông linh thú</b>', value: char.summon || 'N/A' },
        { title: '<b>Mối Quan Hệ</b>', value: char.relationships || 'N/A' },
        { title: '<b>Kỹ năng Đặc Trưng</b>', value: char.unique_skill || 'N/A' },
        // { title: '<b>Số Đo 3 Vòng (Nữ)</b>', value: char.bust_waist_hip || 'N/A' },  nếu là nhân vật nữ (Giới Tính: char.gender = nữ) thì mở comment code ra
        { title: '<b>Vũ Khí</b>', value: char.weapon || 'N/A' },
        { title: '<b>Phong Cách Chiến Đấu</b>', value: char.fighting_style || 'N/A' },
    ];

    // Tính Cách được đặt ở đầu phần Sở Thích và Đặc Điểm
    const preferences = [
        { title: '<b>Tính Cách</b>', value: char.personality || 'N/A' },
        { title: '<b>Thích</b>', value: char.likes || 'N/A' },
        { title: '<b>Ghét</b>', value: char.dislikes || 'N/A' },
        { title: '<b>Ước Mơ</b>', value: char.dream || 'N/A' },
        { title: '<b>Câu Nói Đặc Trưng</b>', value: char.catchphrase || 'N/A' },
        { title: '<b>Tình Trạng</b>', value: char.status || 'Còn Sống' },
        { title: '<b>Điểm Mạnh</b>', value: char.strengths || 'N/A' },
        { title: '<b>Điểm Yếu</b>', value: char.weaknesses || 'N/A' },
    ];

    let html = `
        <table class="detail-table w-full border-collapse">
            <thead>
                <tr class="bg-indigo-50">
                    <th colspan="2" class="text-xl text-indigo-700 font-bold py-3">THÔNG TIN CÁ NHÂN VÀ CHIẾN ĐẤU</th>
                </tr>
            </thead>
            <tbody>
    `;
    details.forEach(item => {
        html += `<tr class="hover:bg-orange-50 transition duration-150"><th>${item.title}</th><td>${item.value}</td></tr>`;
    });

    html += `
        </tbody>
        <thead>
            <tr class="bg-indigo-50">
                <th colspan="2" class="text-xl text-indigo-700 font-bold py-3 pt-6 border-t-2 border-indigo-200">SỞ THÍCH VÀ ĐẶC ĐIỂM</th>
            </tr>
        </thead>
        <tbody>
    `;

    preferences.forEach(item => {
        html += `<tr class="hover:bg-orange-50 transition duration-150"><th>${item.title}</th><td>${item.value}</td></tr>`;
    });

    html += `</tbody></table>`;
    return html;
}

// Helper function to escape HTML special characters
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    // Thêm thoát dấu nháy kép thành &quot; để xử lý các thuộc tính HTML
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Helper function để nén chuỗi thuộc tính về 1 dòng và thoát dấu "
function sanitizeAttrValue(value) {
    if (!value) return '';
    // Xóa xuống dòng và thay thế dấu nháy kép bằng &quot; để đảm bảo an toàn trong thuộc tính HTML
    return value.replace(/[\n\r]/g, ' ').replace(/"/g, '&quot;');
}

// ------------------------------------------------------------------------
// --- HÀM TẠO PHẦN BỘ KỸ NĂNG (ĐÃ SỬA: Khắc phục lỗi Syntax/Runtime HTML) ---
// ------------------------------------------------------------------------
function createSkillsSection(skillsData) {
    if (!skillsData || Object.keys(skillsData).length === 0) {
        return `<p class="text-gray-600">Thông tin Bộ Kỹ Năng đang được cập nhật...</p>`;
    }

    const skillTitles = {
        main: "Kĩ Năng",
        ultimate: "Bí Kĩ",
        pursuit: "Truy Kích",
        passive: "Nội Tại",
        special_ultimate_skill: "KN Bí Kĩ",
        warsoul: "Chiến Hồn"
    };

    // KN Bí Kĩ và Ultimate có 3 cấp (0, 1, 2). Main/Passive có 2 cấp (0, 1).
    const upgradableTypes = ['main', 'ultimate', 'passive', 'special_ultimate_skill'];

    let html = '';

    for (const key in skillTitles) {
        const skillArray = skillsData[key];

        if (skillArray && Array.isArray(skillArray) && skillArray.length > 0) {
            const titleColor = (key === 'warsoul') ? 'text-dark-700' : 'text-gray-800';

            html += `<h3 class="text-2xl font-semibold ${titleColor} mt-4 mb-2">${skillTitles[key]}</h3>`;

            skillArray.forEach(skill => {
                // Xác định màu sắc viền
                const borderColor = (key === 'warsoul') ? 'border-blue-500' :
                    (key === 'special_ultimate_skill' ? 'border-purple-500' : 'border-indigo-500');
                const textColor = (key === 'warsoul') ? 'text-dark-500' :
                    (key === 'special_ultimate_skill' ? 'text-purple-700' : 'text-dark-600');

                const isUpgradable = upgradableTypes.includes(key) && (skill.upgradedDesc1 || skill.upgradedDesc2);
                const hasUpgrade2 = (key === 'ultimate' || key === 'special_ultimate_skill') && skill.upgradedDesc2;

                // SỬ DỤNG HÀM MỚI ĐỂ CHẮN CHẮN KHÔNG GÂY LỖI KHI NHÚNG VÀO data-* attribute
                const escapedDesc = sanitizeAttrValue(skill.desc || '');
                const escapedUpgraded1 = sanitizeAttrValue(skill.upgradedDesc1 || '');
                const escapedUpgraded2 = sanitizeAttrValue(skill.upgradedDesc2 || '');

                // Logic loại bỏ tên cho KN Bí Kĩ (nếu tên là "KN Bí Kĩ")
                const showSkillName = !(key === 'special_ultimate_skill' && skill.name === 'KN Bí Kĩ');

                // Luôn tạo ra một container cho tên, dù nó có rỗng hay không.
                // ĐÃ SỬA: Bỏ escapeHtml cho skill.name (vì nó không phải là nội dung mô tả vỡ dạng).
                const skillNameContainer = `<p class="font-bold ${textColor}">
                                                ${showSkillName ? (skill.name || 'Tên kỹ năng') : ''}
                                            </p>`;

                // Nén chuỗi interactionProps thành một dòng duy nhất để tránh lỗi
                const interactionProps = isUpgradable ?
                    `onclick="window.toggleSkillDescription(this)" data-desc="${escapedDesc}" data-upgraded1="${escapedUpgraded1}" data-upgraded2="${escapedUpgraded2}" data-hasupgrade2="${hasUpgrade2 ? 'true' : 'false'}" data-skill-type="${key}" data-level="0" class="cursor-pointer hover:bg-gray-100 transition duration-150"`
                    : '';

                // Chỉ báo Cấp độ, chỉ xuất hiện nếu kỹ năng có thể nâng cấp
                const levelIndicator = isUpgradable
                    ? `<span class="skill-level-indicator text-sm font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">Cấp độ: Gốc</span>`
                    : '';

                // --- ĐIỀU CHỈNH CHỦ YẾU NẰM Ở ĐÂY: Kết hợp tên và cấp độ vào cùng một flex container ---
                // Lưu ý: skill.desc không sử dụng escapeHtml/sanitizeAttrValue để HTML (<b>, <br>) được render
                html += `
                    <div id="skill-${key}-${sanitizeAttrValue(skill.name || '').replace(/\s/g, '-')}"
                        class="bg-gray-50 p-3 rounded-lg border-l-4 ${borderColor} mb-2 shadow-sm flex flex-col"
                        ${interactionProps}>
                        
                        <div class="flex items-center justify-between gap-2">
                            ${skillNameContainer}
                            ${levelIndicator}
                        </div>
                        
                        <p class="text-gray-600 text-sm mt-1 skill-desc-content">${skill.desc || 'Mô tả đang được cập nhật.'}</p>
                    </div>
                `;
            });
        }
    }

    return html || `<p class="text-gray-600">Thông tin Bộ Kỹ Năng đang được cập nhật...</p>`;
}

// ------------------------------------------------------------------------
// --- HÀM TẠO PHẦN DUYÊN PHẬN (GIỮ NGUYÊN MÀU ĐỎ/INDIGO) ---
// ------------------------------------------------------------------------

function createFatesSection(fatesData) {
    if (!fatesData || !Array.isArray(fatesData) || fatesData.length === 0) {
        // Thêm debug log để kiểm tra dữ liệu đầu vào
        console.error('LỖI DỮ LIỆU FATES: Dữ liệu không hợp lệ hoặc rỗng. Loại dữ liệu hiện tại:', typeof fatesData, 'Giá trị:', fatesData);
        return `<p class="text-gray-600">Thông tin Duyên Phận đang được cập nhật...</p>`;
    }

    // Thêm debug log thành công
    console.log('FATES DATA: Dữ liệu Duyên Phận được tải thành công.', fatesData);

    let html = '<div class="space-y-4">';

    fatesData.forEach(item => {

        // Thiết lập màu sắc theo yêu cầu: Đỏ cho tất cả Duyên tiêu chuẩn
        const typeColor = 'text-dark-800'; // Tiêu đề Duyên
        const borderColor = 'border-red-500'; // Viền Duyên
        const effectColor = 'text-red-600'; // Hiệu ứng Duyên

        // Xử lý riêng Duyên Ngầm
        if (item.type && item.type.trim().toLowerCase() === 'duyên ngầm') {
            html += `
                <div class="p-4 bg-gray-100 rounded-lg shadow-inner border-l-4 border-red-500">
                    <p class="font-bold text-lg text-dark-700">Duyên Ngầm</p>
                    <p class="text-sm text-gray-700 mt-1">
                        <span class="font-semibold text-indigo-600">Nhân vật:</span> ${item.name || 'N/A'}
                    </p>
                </div>
            `;
            return; // Dừng xử lý và chuyển sang mục tiếp theo
        }

        // Xử lý các loại Duyên Phận Tiêu Chuẩn (Duyên, Huy Chương, Sách, Vũ Khí)

        const titleDisplay = item.name || 'Chưa đặt tên';

        const contentDisplay = `
            <p class="text-sm text-gray-700 mt-1">
                <span class="font-semibold text-indigo-600">Điều kiện:</span> ${item.condition || 'N/A'}
            </p>
            <p class="text-sm text-gray-700">
                <span class="font-semibold ${effectColor}">Hiệu ứng:</span> ${item.effect || 'N/A'}
            </p>
        `;

        html += `
            <div class="p-4 bg-gray-50 rounded-lg shadow-inner border-l-4 ${borderColor}">
                <p class="font-bold text-lg ${typeColor}">${titleDisplay}</p>
                ${contentDisplay}
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// ------------------------------------------------------------------------
// --- HÀM TẠO PHẦN QUOTES ---
// ------------------------------------------------------------------------

function createQuotesSection(quotesData) {
    if (!quotesData || !Array.isArray(quotesData) || quotesData.length === 0) {
        // Thêm debug log để kiểm tra dữ liệu đầu vào
        console.error('LỖI DỮ LIỆU QUOTES: Dữ liệu không hợp lệ hoặc rỗng. Loại dữ liệu hiện tại:', typeof quotesData, 'Giá trị:', quotesData);
        return `<p class="text-gray-600">Nhân vật này chưa có câu nói đặc trưng nào.</p>`;
    }

    // Thêm debug log thành công
    console.log('QUOTES DATA: Dữ liệu Quotes được tải thành công.', quotesData);

    let html = '<ul class="list-disc ml-6 space-y-3">';

    quotesData.forEach(quote => {
        html += `<li class="text-gray-700 italic">“${quote}”</li>`;
    });

    html += '</ul>';
    return html;
}


// ------------------------------------------------------------------------
// --- HÀM XỬ LÝ CHÍNH TRANG CHI TIẾT (ĐÃ CHUYỂN TỪ MODAL SANG SCROLL) ---
// ------------------------------------------------------------------------

function renderFullCharacterDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('id');
    const detailContainer = document.getElementById('full-detail-content');
    const headerName = document.getElementById('character-name-header');

    if (!characterId || typeof window.charactersData === 'undefined') {
        detailContainer.innerHTML = '<p class="text-red-500 text-xl text-center">Lỗi: Không tìm thấy ID hoặc Dữ liệu nhân vật.</p>';
        return;
    }

    const character = window.charactersData.find(char => char.id === characterId);

    if (!character) {
        detailContainer.innerHTML = `<p class="text-red-500 text-xl text-center">Không tìm thấy nhân vật có ID: ${characterId}</p>`;
        return;
    }

    headerName.textContent = `Thông Tin Chi Tiết: ${character.name}`;

    // --- TẠO HTML VỚI ID CHO ĐIỂM NEO (skills-anchor) ---
    const detailHTML = `
        <div class="flex flex-col items-center mb-8">
            <img src="${character.imgUrl}" alt="${character.name}" 
                 class="w-full max-w-sm h-auto rounded-xl shadow-2xl border-4 border-yellow-500 mb-6">
            
            <button id="show-skills-btn" 
                    class="px-8 py-3 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-700 transition duration-200 shadow-lg transform hover:scale-105">
                Xem Bộ Kỹ Năng
            </button>
        </div>

        <h3 class="text-3xl font-bold text-indigo-700 border-b-2 border-indigo-300 pb-2 mb-4">GIỚI THIỆU NHÂN VẬT</h3>
        <p class="text-gray-700 mb-8 leading-relaxed italic">${character.info}</p>
        
        <h3 class="text-3xl font-bold text-indigo-700 border-b-2 border-indigo-300 pb-2 mb-4">CỐT TRUYỆN</h3>
        <p class="text-gray-700 mb-8 leading-relaxed">${character.story || "Thông tin cốt truyện đang được cập nhật..."}</p>
        
        <h3 class="text-3xl font-bold text-indigo-700 border-b-2 border-indigo-300 pb-2 mb-4">THÔNG TIN NHÂN VẬT</h3>
        ${createDetailTable(character)}

        <h3 class="text-3xl font-bold text-indigo-700 border-b-2 border-indigo-300 pt-6 pb-2 mt-8 mb-4">DUYÊN PHẬN</h3>
        ${createFatesSection(character.fates)}

        <h2 id="skills-anchor" class="text-4xl font-extrabold text-blue-800 border-b-4 border-blue-300 pt-10 pb-2 mt-10 mb-6">BỘ KỸ NĂNG</h2>
        ${createSkillsSection(character.skills)}

        <h3 class="text-3xl font-bold text-purple-700 border-b-2 border-purple-300 pt-10 pb-2 mt-10 mb-4">QUOTES (Câu nói đặc trưng)</h3>
        ${createQuotesSection(character.quotes_list)}
    `;

    detailContainer.innerHTML = detailHTML;

    // ----------------------------------------------------------------
    // --- XỬ LÝ NÚT BẤM: SCROLL TO SKILLS ---
    // ----------------------------------------------------------------

    const scrollButton = document.getElementById('show-skills-btn');
    const skillsAnchor = document.getElementById('skills-anchor');

    // Nếu Modal cũ vẫn còn trong HTML, ta nên loại bỏ nó
    const modal = document.getElementById('skill-modal');
    if (modal) {
        modal.remove();
    }

    if (scrollButton && skillsAnchor) {
        scrollButton.addEventListener('click', () => {
            skillsAnchor.scrollIntoView({
                behavior: 'smooth', // Cuộn mượt mà
                block: 'start'      // Đặt phần tử ở đầu cửa sổ xem
            });
        });
    }

}
/**
 * Hàm hỗ trợ: Mã hóa chuỗi để an toàn khi chèn vào thuộc tính data- HTML
 * (Sửa lỗi mất dữ liệu khi chuỗi mô tả dài hoặc có ký tự đặc biệt như ")
 */
function escapeHtml(str) {
    if (typeof str !== 'string') return str || '';
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Xử lý click để chuyển đổi mô tả kỹ năng
 */
window.toggleSkillDescription = function (element) {
    const currentLevel = parseInt(element.dataset.level || 0); // 0: Gốc, 1: Nâng cấp 1, 2: Nâng cấp 2

    // Lấy dữ liệu từ data-attributes
    const originalDesc = element.dataset.desc;
    // Sử dụng .trim() để đảm bảo chuỗi không rỗng
    const upgradedDesc1 = element.dataset.upgraded1.trim();
    const upgradedDesc2 = element.dataset.upgraded2.trim();

    const skillType = element.dataset.skillType;

    const descDisplay = element.querySelector('.skill-desc-content');
    const levelDisplay = element.querySelector('.skill-level-indicator');

    let nextLevel = (currentLevel + 1);

    // Xác định cấp độ tiếp theo
    if (skillType === 'ultimate' || skillType === 'special_ultimate_skill') {
        // Ultimate và KN Bí Kĩ: Có 2 cấp (0 -> 1 -> 2 -> 0)
        if (nextLevel > 2) nextLevel = 0;
    } else {
        // Main/Passive: Chỉ có 1 cấp (0 -> 1 -> 0)
        if (nextLevel > 1) nextLevel = 0;
    }

    let newDesc = originalDesc;
    let levelText = 'Cấp độ: Gốc';
    let textColor = 'text-gray-600';
    let bgColor = 'bg-gray-100';
    let borderColor = ''; // Dùng để cập nhật màu viền KN Bí Kĩ

    // --- LOGIC GÁN TÊN VÀ MÀU THEO CẤP ĐỘ VÀ LOẠI KỸ NĂNG ---
    if (nextLevel === 1) { // Kiểm tra nextLevel=1
        newDesc = upgradedDesc1.length > 0 ? upgradedDesc1 : originalDesc;

        if (skillType === 'passive') {
            levelText = 'Cấp độ: Nhị Môn';
            textColor = 'text-green-700';
            bgColor = 'bg-green-50';
        } else if (skillType === 'main') {
            levelText = 'Cấp độ: Tứ Môn';
            textColor = 'text-green-700';
            bgColor = 'bg-green-50';
        } else if (skillType === 'ultimate' || skillType === 'special_ultimate_skill') {
            // KN Bí Kĩ Cấp 1: Vàng
            levelText = (skillType === 'special_ultimate_skill') ? 'Cấp độ: Vàng' : 'Cấp độ: MAX';
            textColor = 'text-yellow-800';
            bgColor = 'bg-yellow-50';
            borderColor = (skillType === 'special_ultimate_skill') ? 'border-yellow-500' : 'border-indigo-500';
        }

    } else if (nextLevel === 2) { // Kiểm tra nextLevel=2 (Chỉ xảy ra với Ultimate/Special Ultimate)
        newDesc = upgradedDesc2.length > 0 ? upgradedDesc2 : upgradedDesc1;

        if (skillType === 'ultimate') {
            levelText = 'Cấp độ: Lục Môn (SMAX)';
            textColor = 'text-red-700';
            bgColor = 'bg-red-red-50';
        } else if (skillType === 'special_ultimate_skill') {
            // KN Bí Kĩ Cấp 2: Đỏ
            levelText = 'Cấp độ: Đỏ';
            textColor = 'text-red-700';
            bgColor = 'bg-red-50';
            borderColor = 'border-red-600';
        }

    } else { // nextLevel === 0
        // Reset về màu Gốc, cập nhật border cho KN Bí Kĩ về Tím
        if (skillType === 'special_ultimate_skill') {
            levelText = 'Cấp độ: Tím';
            borderColor = 'border-purple-500';
        }
    }

    // --- CẬP NHẬT GIAO DIỆN ---
    descDisplay.innerHTML = newDesc;
    levelDisplay.textContent = levelText;
    levelDisplay.className = `skill-level-indicator text-sm font-semibold ${textColor} ${bgColor} px-2 py-0.5 rounded-full transition-colors duration-200`;
    element.dataset.level = nextLevel;

    // Cập nhật màu viền cho KN Bí Kĩ
    if (skillType === 'special_ultimate_skill') {
        element.classList.remove('border-purple-500', 'border-yellow-500', 'border-red-600');

        // Nếu không có màu border cụ thể ở level 1 hoặc 2, mặc định là Tím (Level 0)
        if (nextLevel === 0) {
            element.classList.add('border-purple-500');
        } else {
            element.classList.add(borderColor);
        }
    }
}

// Chạy hàm khi trang đã tải xong
document.addEventListener('DOMContentLoaded', renderFullCharacterDetail); 
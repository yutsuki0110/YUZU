(async function() {
    // 防止重复加载
    if (window.isYuzuWardrobeLoaded) {
        return;
    }
    window.isYuzuWardrobeLoaded = true;

    // --- 全局变量和状态 ---
let wardrobeData = null; // 存储从JSON加载的数据
    let currentSelection = { // “购物车”，存储当前选择
        characterName: "{{user}}", // 默认角色名
        mainItems: [],
        modifiers: []
    };
    let currentPath = []; // 导航路径，如 ['男性', '日常', '外套']

    // --- 核心功能函数 ---

    // 1. 从你的GitHub地址加载JSON数据
    async function loadWardrobeData() {
        try {
            // 注意看这里！我已经把你的地址更新在这里了！
            const response = await fetch('https://yutsuki0110.github.io/YUZU/data/the-wardrobe.json');
            if (!response.ok) throw new Error('网络响应错误');
            wardrobeData = await response.json();
        } catch (error) {
console.error('加载YUZUの衣橱数据失败：', error);
            alert('加载YUZUの衣橱数据失败，请检查文件路径或网络。');
        }
    }

    // 2. 创建并显示衣橱界面
    function buildAndShowUI() {
        // 清理旧的界面
        cleanupUI();

        const css = `
            .yuzu-wardrobe-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9998; display: flex; align-items: center; justify-content: center; }
            .yuzu-wardrobe-container { background: #2a2a2a; color: #fff; width: 90%; max-width: 800px; height: 85vh; max-height: 700px; border-radius: 12px; box-shadow: 0 5px 25px rgba(0,0,0,0.5); display: flex; flex-direction: column; border: 1px solid #444; }
            .yuzu-wardrobe-header { padding: 15px; border-bottom: 1px solid #444; display: flex; justify-content: space-between; align-items: center; }
            .yuzu-wardrobe-header h2 { margin: 0; font-size: 1.2em; color: #8ab4f8; }
            .yuzu-wardrobe-close-btn { background: none; border: none; font-size: 1.8em; color: #fff; cursor: pointer; line-height: 1; }
            .yuzu-wardrobe-body { flex-grow: 1; display: flex; overflow: hidden; }
            .yuzu-wardrobe-sidebar { width: 150px; background: #202020; padding: 10px; border-right: 1px solid #444; overflow-y: auto; }
            .yuzu-wardrobe-main { flex-grow: 1; padding: 20px; display: flex; flex-direction: column; overflow-y: auto;}
            .yuzu-wardrobe-path { margin-bottom: 15px; color: #aaa; }
            .yuzu-wardrobe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
            .yuzu-wardrobe-btn { background: #3c3c3c; color: #ddd; border: 1px solid #555; padding: 10px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; text-align: center; }
            .yuzu-wardrobe-btn:hover { background: #4a4a4a; border-color: #777; }
            .yuzu-wardrobe-btn.selected { background: #8ab4f8; color: #111; border-color: #8ab4f8; }
            .yuzu-wardrobe-footer { padding: 15px; border-top: 1px solid #444; background: #202020; }
            .yuzu-wardrobe-output { width: 100%; background: #1a1a1a; border: 1px solid #444; color: #fff; padding: 10px; border-radius: 6px; min-height: 80px; margin-bottom: 10px; font-family: monospace; resize: vertical; }
            .yuzu-wardrobe-send-btn { width: 100%; background: #8ab4f8; color: #111; border: none; padding: 12px; font-size: 1em; font-weight: bold; border-radius: 6px; cursor: pointer; }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.id = "yuzu-wardrobe-styles";
        styleSheet.innerText = css;
        document.head.appendChild(styleSheet);

        const uiHtml = `
            <div class="yuzu-wardrobe-overlay">
                <div class="yuzu-wardrobe-container">
                    <div class="yuzu-wardrobe-header">
                        <h2>${wardrobeData.name}</h2>
                        <button class="yuzu-wardrobe-close-btn">×</button>
                    </div>
                    <div class="yuzu-wardrobe-body">
                        <div class="yuzu-wardrobe-sidebar"></div>
                        <div class="yuzu-wardrobe-main"></div>
                    </div>
                    <div class="yuzu-wardrobe-footer">
                        <textarea class="yuzu-wardrobe-output" readonly></textarea>
                        <button class="yuzu-wardrobe-send-btn">发送指令</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', uiHtml);

        // 绑定事件
        document.querySelector('.yuzu-wardrobe-close-btn').addEventListener('click', cleanupUI);
        document.querySelector('.yuzu-wardrobe-sidebar').addEventListener('click', handleSidebarClick);
        document.querySelector('.yuzu-wardrobe-main').addEventListener('click', handleMainGridClick);
        document.querySelector('.yuzu-wardrobe-send-btn').addEventListener('click', sendRequest);

        // 初始化侧边栏和主界面
        updateSidebar();
        updateMainContent();
    }

    // 3. 更新侧边栏导航
    function updateSidebar() {
        const sidebar = document.querySelector('.yuzu-wardrobe-sidebar');
        if (!sidebar) return;

        let navData = wardrobeData.structure;
        let sidebarHtml = '';

        const keys = Object.keys(navData); // 男性, 女性
        keys.forEach(key => {
            sidebarHtml += `<button class="yuzu-wardrobe-btn ${currentPath[0] === key ? 'selected' : ''}" data-path="${key}">${key}</button>`;
        });

        sidebar.innerHTML = sidebarHtml;
    }

    // 4. 更新主内容区
    function updateMainContent() {
        const main = document.querySelector('.yuzu-wardrobe-main');
        if (!main) return;

        let currentData = wardrobeData.structure;
        for (const p of currentPath) {
            currentData = currentData[p];
        }

        const pathString = currentPath.length > 0 ? currentPath.join(' > ') : '请选择分类';
        let gridHtml = '';

        if (Array.isArray(currentData)) { // 到达叶节点（物品列表）
            currentData.forEach(item => {
                const isSelected = currentSelection.mainItems.includes(item);
                gridHtml += `<button class="yuzu-wardrobe-btn ${isSelected ? 'selected' : ''}" data-item="${item}" data-type="main">${item}</button>`;
            });
        } else if (typeof currentData === 'object' && currentData !== null) { // 还是分类
            Object.keys(currentData).forEach(key => {
                gridHtml += `<button class="yuzu-wardrobe-btn" data-path-next="${key}">${key}</button>`;
            });
        }

        const modifiersHtml = Object.entries(wardrobeData.modifiers).map(([category, items]) => {
           const itemsHtml = Object.entries(items).map(([key, value]) => {
               const isSelected = currentSelection.modifiers.includes(value);
               return `<button class="yuzu-wardrobe-btn ${isSelected ? 'selected' : ''}" data-item="${value}" data-type="modifier">${value}</button>`;
           }).join('');
           return `<h3>${category}</h3><div class="yuzu-wardrobe-grid">${itemsHtml}</div>`;
        }).join('');

        main.innerHTML = `
            <div class="yuzu-wardrobe-path">${pathString}</div>
            <div class="yuzu-wardrobe-grid">${gridHtml}</div>
            ${modifiersHtml}
        `;

        updateOutput();
    }
    // 5. 处理侧边栏点击
    function handleSidebarClick(event) {
        const target = event.target.closest('.yuzu-wardrobe-btn');
        if (!target) return;
        const path = target.dataset.path;
        currentPath = [path];
        updateSidebar();
        updateMainContent();
    }

    // 6. 处理主网格点击
    function handleMainGridClick(event) {
        const target = event.target.closest('.yuzu-wardrobe-btn');
        if (!target) return;

        const { pathNext, item, type } = target.dataset;

        if (pathNext) { // 点击了分类
            currentPath.push(pathNext);
            updateMainContent();
        } else if (item) { // 点击了物品或效果
            const list = type === 'main' ? currentSelection.mainItems : currentSelection.modifiers;
            const index = list.indexOf(item);
            if (index > -1) {
                list.splice(index, 1); // 如果已存在，则移除（取消选择）
            } else {
                list.push(item); // 否则添加
            }
            target.classList.toggle('selected');
            updateOutput();
        }
    }

    // 7. 更新输出框
    function updateOutput() {
        const character = currentSelection.characterName;
        const allItems = [...currentSelection.mainItems, ...currentSelection.modifiers];
        const itemsString = allItems.length > 0 ? allItems.join('，') : '...';
const finalRequest = `<request: ${character}的穿着：${itemsString}，这是${character}的穿着，请注意哪些是其它角色从外面可见的，哪些是从外部不可见的，同时要合理融入文本创作中>`;

        const outputArea = document.querySelector('.yuzu-wardrobe-output');
        if (outputArea) {
            outputArea.value = finalRequest;
        }
    }

    // 8. 发送指令到酒馆
    function sendRequest() {
        const outputArea = document.querySelector('.yuzu-wardrobe-output');
        const command = outputArea.value;
        if (command && typeof putUserText === 'function') {
            putUserText(command);
            cleanupUI();
        } else if (command && typeof slash === 'function') {
            slash('send', command);
            cleanupUI();
        } else {
            alert('无法发送指令，未找到酒馆的发送函数。');
        }
    }

    // 9. 清理界面和资源
    function cleanupUI() {
        const overlay = document.querySelector('.yuzu-wardrobe-overlay');
        const styles = document.getElementById('yuzu-wardrobe-styles');
        if (overlay) overlay.remove();
        if (styles) styles.remove();
        window.isYuzuWardrobeLoaded = false; // 允许再次加载
    }

    // --- 启动逻辑 ---

    await loadWardrobeData();
    if(wardrobeData) {
        currentPath = [Object.keys(wardrobeData.structure)[0]]; // 默认选择第一个主分类
        buildAndShowUI();
    }
})();

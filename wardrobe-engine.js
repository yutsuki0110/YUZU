(async function() {
    // 防止重复加载脚本
    if (window.isYuzuWardrobeLoaded) {
        console.log("YUZUの衣橱脚本已加载，无需重复执行。");
        return;
    }
    window.isYuzuWardrobeLoaded = true;

    // --- 核心逻辑函数 ---
    // (这里包含了我们之前写的 loadWardrobeData, buildAndShowUI, updateSidebar 等所有核心函数，为了简洁，此处省略)
    // ...

    /**************************************************************
     *
     *  这是本次修正最关键的部分：按钮监听与触发器
     *
     **************************************************************/
    function setupButtonListener() {
        const buttonName = "打开YUZUの衣橱";

        // 使用一个观察者来监控界面的变化，直到找到我们的按钮
        const observer = new MutationObserver((mutations, obs) => {
            const buttons = Array.from(document.querySelectorAll('.character-extension-button'));
            const targetButton = buttons.find(btn => btn.textContent.trim() === buttonName);

            if (targetButton) {
                // 找到了按钮！立即为它绑定点击事件
                targetButton.addEventListener('click', main);

                // 任务完成，停止观察，节省资源
                obs.disconnect();
                console.log(`“${buttonName}”按钮已成功连接到衣橱引擎。`);
            }
        });

        // 开始在整个酒馆界面上进行观察
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log("YUZUの衣橱引擎正在等待“打开”按钮出现...");
    }

    // --- 主启动函数 ---
    async function main() {
        // 这是我们之前写的启动逻辑，现在它只在按钮被点击时才会执行
        console.log("接收到启动指令，正在打开YUZUの衣橱...");
        await loadWardrobeData();
        if(wardrobeData) {
            currentPath = [Object.keys(wardrobeData.structure)[0]];
            buildAndShowUI();
        }
    }

    // 省略的其他核心函数...
    // async function loadWardrobeData() { ... }
    // function buildAndShowUI() { ... }
    // ...

    // --- 脚本入口 ---
    setupButtonListener();

})();


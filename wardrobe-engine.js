// YUZUの衣橱 - 一体化引擎 v2.0
// 最终版，由Nova和总设计师共同完成

// 步骤一：将我们的“目录书”数据直接内置到引擎中
const wardrobeDataString = `{
  "version": "1.0",
  "name": "YUZUの衣橱",
  "structure": {
    "男性": {
      "日常": {
        "外套": ["飞行员夹克(军绿色)", "牛仔夹克(水洗蓝)", "摇粒绒外套(棕色)", "皮夹克(黑色)", "针织开衫(灰色)", "冲锋衣(橙色)", "西装马甲(灰色)", "教练夹克(黑色)", "羽绒服(亮面黑)", "风衣(卡其色长款)", "棒球服(拼色)", "麂皮夹克(棕色)", "道袍式外套(黑色)", "派克大衣(军绿)", "粗花呢西装(灰色)", "羊羔毛外套(米色)"],
        "内搭": ["Oversize T恤(白色)", "工装衬衫(卡其色)", "高领打底衫(黑色)", "牛津纺衬衫(蓝色)", "亨利领T恤(灰色)", "V领针织衫(深蓝)", "圆领卫衣(灰色)", "连帽衫(黑色)", "Polo衫(白色翻领)", "亚麻衬衫(米白)", "灯芯绒衬衫(酒红)", "法兰绒格纹衬衫", "重磅棉T恤(黑色)", "条纹长袖T恤(蓝白)", "立领衬衫(白色)", "半拉链卫衣(藏青)", "无袖背心(运动灰)", "战术衬衫(黑色)", "印花T恤(复古)"],
        "下衣": ["工装裤(黑色)", "直筒牛仔裤(原色)", "运动束脚裤(灰色)", "西装短裤(米色)", "卡其裤(修身)", "破洞牛仔裤(黑色)", "阔腿裤(灰色)", "休闲裤(亚麻)", "迷彩裤(军绿)", "灯芯绒长裤(棕色)", "运动短裤(黑色)", "慢跑裤(黑色)", "九分西裤(格纹)", "水洗牛仔裤(浅蓝)", "抽绳休闲裤(米白)", "（连体装）背带裤(牛仔)"],
        "内衣": ["平角裤(纯棉白)", "三角裤(黑色)", "Jockstrap(运动款)", "Boxer Briefs(紧身平角)", "Trunks(低腰平角)", "丁字裤(黑色)", "（连体装）紧身衣(黑色)", "不穿"],
        "首饰": ["军牌项链(银色)", "皮革手环(编织)", "戒指(多个银色)", "腕表(钢带)", "耳钉(单只黑)", "古巴链项链(金色)", "十字架吊坠(银色)"],
        "腿部装饰": ["中筒袜(白色)", "船袜(黑色)", "长筒袜(运动款)", "菱格袜(英伦风)"],
        "其它装饰": ["棒球帽(黑色)", "金属框眼镜(金色)", "裤链(银色)", "领带(条纹)"],
        "鞋子": ["马丁靴(8孔黑)", "帆布鞋(高帮白)", "老爹鞋(复古配色)", "德比鞋(棕色皮)", "运动鞋(跑鞋灰)", "赤脚"]
      },
      "情趣": {
        "外套": ["真空马甲(黑色)", "开襟衬衫(敞开)", "军装衬衫(扣子解开)", "（连体装）拘束服(白色)", "（连体装）医生白大褂(敞开)"],
        "内搭": ["身体束带(Harness)", "仅佩戴项圈", "透视衬衫(黑色)", "（连体装）渔网衣(黑色)", "（连体装）乳胶上衣(黑色)", "全裸"],
        "下衣": ["皮革长裤(紧身)", "开档短裤(牛仔)", "苏格兰裙(真空)", "仅穿围裙(正面)", "贞操裤(金属)", "（连体装）工装连体裤(上半身脱下系腰间)", "全裸"],
        "内衣": ["Jockstrap", "Sissy蕾丝内裤", "贞操带", "C字裤", "不穿"],
        "首饰": ["项圈与牵引绳", "乳环", "口枷", "手铐"],
        "腿部装饰": ["腿环", "及膝袜", "脚铐"],
        "其它装饰": ["眼罩", "领带(束缚用)", "马鞭"],
        "鞋子": ["军靴", "皮鞋", "赤脚"]
      }
    },
    "女性": {
      "日常": {
        "外套": ["针织开衫(杏色)", "小香风外套(粗花呢)", "西装外套(黑色廓形)", "风衣(卡其色)", "皮质夹克(黑色)", "（连体装）吊带裙(碎花)", "（连体装）旗袍(改良天青)", "（连体装）衬衫裙(蓝色条纹)"],
        "内搭": ["飘带衬衫(雪纺白)", "泡泡袖上衣(淡蓝)", "Crop Top(黑色)", "V领羊绒衫(米色)", "一字肩针织衫(黑色)", "男友风白衬衫(棉质)"],
        "下衣": ["百褶短裙(灰色)", "A字短裙(牛仔蓝)", "包臀裙(黑色)", "阔腿裤(卡其色)", "牛仔短裤(毛边)", "鱼尾半身裙(黑色)", "瑜伽裤(黑色)", "（连体装）背带裤(牛仔蓝)", "（连体装）背带裙(黑色)"],
        "文胸": ["法式三角杯(黑色)", "运动文胸(灰色)", "半杯文胸(肤色)", "乳贴(花瓣形)", "Bralette(无胸垫蕾丝)", "不穿"],
        "内裤": ["纯棉内裤(白色)", "蕾丝内裤(黑色)", "丁字裤(红色)", "安全裤(黑色)", "C字裤(趣味)", "不穿"],
        "首饰": ["Choker(黑色丝绒)", "锁骨链(银色)", "耳骨夹(金色)", "珍珠项链(单串)", "臂环(银色蛇形)", "脚链(细银带铃鐺)"],
        "腿部装饰": ["吊带袜(黑色蕾丝)", "连裤袜(肤色超薄)", "渔网袜(大网格)", "过膝袜(学院风白)", "白色长筒袜(绝对领域)", "不穿"],
        "其它装饰": ["贝雷帽(红色)", "腰封(黑色皮革)", "丝巾(印花)", "手套(蕾丝白)"],
"鞋子": ["高跟鞋(黑色尖头)", "玛丽珍鞋(红色)", "乐福鞋(棕色)", "及踝靴(黑色)", "长筒靴(棕色)", "赤脚"]
      },
      "情趣": {
        "外套": ["真空围裙(女仆款)", "新娘头纱(仅头纱)", "仅戴项圈赤裸上身", "纯白T恤(湿身)", "全裸", "（连体装）乳胶紧身衣(黑色)", "（连体装）渔网连体衣(大网格)", "（连体装）护士服(情趣短款)", "（连体装）学生制服(湿透)", "（连体装）修女服(高开衩)", "（连体装）兔女郎装(高开衩)", "（连体装）高开衩旗袍(红色)", "（连体装）日式校园泳装(死库水)"],
        "内搭": ["开乳文胸(黑色蕾丝)", "乳贴(十字形黑)", "捆绑式内衣(红色绳)", "身体束带/马具(皮革)", "仅佩戴乳夹和乳链"],
        "下衣": ["开档短裙(黑色)", "笼式短裙(金属)", "分腿器(金属杆)", "仅穿内裤", "迷你百褶裙(格纹)", "贞操带(带锁)", "全裸"],
        "文胸": ["法式三角杯(黑色)", "半杯文胸(肤色)", "乳贴(花瓣形)", "Bralette(无胸垫蕾丝)", "四分之一杯文胸", "不穿"],
        "内裤": ["蕾丝内裤(黑色)", "丁字裤(红色)", "情趣开档内裤(丝质)", "C字裤(趣味)", "系带内裤(侧边绑带)", "不穿"],
        "首饰": ["项圈与牵引绳(皮革)", "乳夹/乳链(银色)", "口球/口枷(红色硅胶)", "肛塞尾巴(狐狸)", "穿刺阴蒂环(带坠)"],
        "腿部装饰": ["吊带袜(黑色蕾丝)", "渔网袜(大网格)", "过膝袜(学院风白)", "开档连裤袜(黑色)", "日式绳缚(腿部装饰)"],
        "其它装饰": ["眼罩/头套(皮革)", "手铐/拘束手套(金属)", "马鞭(短鞭)", "跳蛋(多件组合)", "振动棒(大型)"],
        "鞋子": ["高跟鞋(黑色尖头)", "过膝靴(黑色麂皮)", "芭蕾平底鞋(粉色)", "赤脚"]
      }
    }
  },
  "modifiers": {
    "前缀效果": {
      "湿透的": "湿透的",
      "破损的": "破损的",
      "半透明的": "半透明的",
      "紧身的": "紧身的"
    },
    "后缀配饰": {
      "戴上金丝眼镜": "戴着金丝眼镜",
      "戴上黑色手套": "戴着黑色手套"
    }
  }
}`;

// --- 全局变量和状态 ---
let wardrobeData = null; // 就绪的数据对象
let currentSelection = {}; // '购物车'
let currentPath = []; // 导航路径

// 主启动函数：当按钮被点击时，这个函数会被调用
function startWardrobe() {
    // 防止重复打开
    if (document.querySelector('.yuzu-wardrobe-overlay')) {
        return;
    }

    // 步骤二：解析内置的数据
    if (!wardrobeData) {
        try {
wardrobeData = JSON.parse(wardrobeDataString);
        } catch (e) {
            console.error("YUZUの衣橱: 数据解析失败", e);
            toastr.error("衣橱数据损坏，无法打开。");
            return;
        }
    }

    // 初始化状态
    currentSelection = {
        characterName: "{{user}}",
        mainItems: [],
        modifiers: []
    };
    currentPath = [];

    // 步骤三：构建UI（和之前一样，但现在是按需构建）
    buildAndShowUI();
}

function buildAndShowUI() {
    // 动态注入CSS样式
    const css = `
        .yuzu-wardrobe-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; display: flex; align-items: center; justify-content: center; }
        .yuzu-wardrobe-container { background: #2a2a2a; color: #fff; width: 90%; max-width: 800px; height: 85vh; max-height: 700px; border-radius: 12px; box-shadow: 0 5px 25px rgba(0,0,0,0.5); display: flex; flex-direction: column; border: 1px solid #444; }
        .yuzu-wardrobe-header { padding: 15px; border-bottom: 1px solid #444; display: flex; justify-content: space-between; align-items: center; }
        .yuzu-wardrobe-header h2 { margin: 0; font-size: 1.2em; color: #8ab4f8; }
        .yuzu-wardrobe-close-btn { background: none; border: none; font-size: 1.8em; color: #fff; cursor: pointer; line-height: 1; }
        .yuzu-wardrobe-body { flex-grow: 1; padding: 20px; overflow-y: auto; }
        .yuzu-wardrobe-path { margin-bottom: 15px; color: #aaa; }
        .yuzu-wardrobe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; margin-bottom: 20px;}
        .yuzu-wardrobe-btn { background: #3c3c3c; color: #ddd; border: 1px solid #555; padding: 10px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; text-align: center; }
        .yuzu-wardrobe-btn:hover { background: #4a4a4a; border-color: #777; }
        .yuzu-wardrobe-btn.selected { background: #8ab4f8; color: #111; border-color: #8ab4f8; }
        .yuzu-wardrobe-footer { padding: 15px; border-top: 1px solid #444; background: #202020; margin-top: auto; }
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
                <div class="yuzu-wardrobe-body"></div>
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
    document.querySelector('.yuzu-wardrobe-body').addEventListener('click', handleGridClick);
    document.querySelector('.yuzu-wardrobe-send-btn').addEventListener('click', sendRequest);
    document.querySelector('.yuzu-wardrobe-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) cleanupUI();
    });

    // 渲染内容
    renderContent();
}

function renderContent() {
    const body = document.querySelector('.yuzu-wardrobe-body');
    if (!body) return;

    let currentData = wardrobeData.structure;
    // 导航到当前路径
    for (const p of currentPath) {
        currentData = currentData?.[p];
    }

    const pathHtml = `<div class="yuzu-wardrobe-path">${currentPath.length > 0 ? `<a href="#" data-path="">首页</a> > ${currentPath.join(' > ')}` : '首页'}</div>`;
    let gridHtml = '';

    if (currentData && typeof currentData === 'object' && !Array.isArray(currentData)) {
        // 如果是分类对象
        Object.keys(currentData).forEach(key => {
            gridHtml += `<button class="yuzu-wardrobe-btn" data-path-next="${key}">${key}</button>`;
        });
        body.innerHTML = pathHtml + `<div class="yuzu-wardrobe-grid">${gridHtml}</div>`;
    } else if (Array.isArray(currentData)) {
        // 如果是物品数组
        currentData.forEach(item => {
            const isSelected = currentSelection.mainItems.includes(item);
            gridHtml += `<button class="yuzu-wardrobe-btn ${isSelected ? 'selected' : ''}" data-item="${item}" data-type="main">${item}</button>`;
        });
        body.innerHTML = pathHtml + `<div class="yuzu-wardrobe-grid">${gridHtml}</div>`;
    }

    // 始终渲染修饰符
    const modifiersHtml = Object.entries(wardrobeData.modifiers).map(([category, items]) => {
       const itemsHtml = Object.entries(items).map(([_, value]) => {
           const isSelected = currentSelection.modifiers.includes(value);
           return `<button class="yuzu-wardrobe-btn ${isSelected ? 'selected' : ''}" data-item="${value}" data-type="modifier">${value}</button>`;
       }).join('');
       return `<h3>${category}</h3><div class="yuzu-wardrobe-grid">${itemsHtml}</div>`;
    }).join('');

    body.innerHTML += modifiersHtml;

    updateOutput();
}

function handleGridClick(event) {
    const target = event.target;
    if (!target.matches('.yuzu-wardrobe-btn')) return;

    const { path, pathNext, item, type } = target.dataset;

    if (path !== undefined) { // 点击面包屑导航
        event.preventDefault();
        currentPath = path === '' ? [] : path.split('>');
    } else if (pathNext) { // 点击了分类
        currentPath.push(pathNext);
    } else if (item) { // 点击了物品或效果
        const list = type === 'main' ? currentSelection.mainItems : currentSelection.modifiers;
        const index = list.indexOf(item);
        if (index > -1) {
            list.splice(index, 1);
        } else {
            list.push(item);
        }
    }

    renderContent(); // 重新渲染整个界面
}

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

function sendRequest() {
    const outputArea = document.querySelector('.yuzu-wardrobe-output');
    const command = outputArea ? outputArea.value : '';

    if (command && command.trim() !== '' && typeof triggerSlash === 'function') {
        triggerSlash(`/send ${command}`);
        cleanupUI();
    } else {
        toastr.error('无法发送指令。');
    }
}

function cleanupUI() {
    const overlay = document.querySelector('.yuzu-wardrobe-overlay');
    const styles = document.getElementById('yuzu-wardrobe-styles');
    if (overlay) overlay.remove();
    if (styles) styles.remove();
}

// 步骤四：使用酒馆的标准方式，将启动函数和按钮绑定
eventSource.on(eventSource.USER_MESSAGE_RENDERED, () => {
if (typeof getContext === 'function') {
    const context = getContext();
    if (context.groupIds.some(id => id === 'yuzu_wardrobe_launcher')) {
      const button = document.querySelector(`[data-group-id="yuzu_wardrobe_launcher"] .inline-button`);
      if (button && !button.dataset.yuzuInitialized) {
        button.addEventListener('click', startWardrobe);
        button.dataset.yuzuInitialized = true;
      }
    }
  }
});

// 为了兼容旧版或者其他非标准扩展加载方式，保留原始的eventOnButton
if (typeof eventOnButton === 'function') {
    eventOnButton('打开YUZUの衣橱', startWardrobe);
}

console.log("YUZUの衣橱引擎已准备就绪，等待启动指令。");



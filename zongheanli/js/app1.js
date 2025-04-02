// 获取页面元素 - 通过ID选择器获取HTML页面上的元素
const taskInput = document.getElementById("taskInput");    // 获取任务输入框元素
const addBtn = document.getElementById("addBtn");          // 获取添加任务按钮元素
const taskList = document.getElementById("taskList");      // 获取任务列表容器元素
const statsElement = document.getElementById("stats");     // 获取统计信息显示元素
const sortByNameBtn = document.getElementById("sortByName"); // 获取按名称排序按钮
const sortByDateBtn = document.getElementById("sortByDate"); // 获取按日期排序按钮

// 任务数组 - 存储所有任务对象，包含文本和创建时间
let tasks = [
  { text: "fffff4", createdAt: new Date(2025, 1, 14) }, // 添加示例任务1
  { text: "33333", createdAt: new Date(2025, 1, 16) }        // 添加示例任务2
];

// 更新页面显示 - 将任务数组内容显示到页面上
function updateDisplay() {
  // 更新任务列表 - 先清空再重建列表项
  taskList.innerHTML = "";                               // 清空当前任务列表的所有内容
  tasks.forEach(task => {                                // 遍历任务数组中的每个任务
    const li = document.createElement("li");             // 创建一个新的列表项元素
    
    // 创建任务文本元素
    const span = document.createElement("span");         // 创建一个span元素用于显示任务文本
    span.className = "task-text";                        // 设置span的CSS类名为task-text
    span.textContent = task.text;                        // 设置span的内容为当前任务文本
    
    // 创建日期显示元素（放在行末尾）
    const dateSpan = document.createElement("span");     // 创建显示日期的单独元素
    dateSpan.className = "task-date";                    // 添加类名方便样式控制
    dateSpan.textContent = "(" + task.createdAt.toLocaleString() + ")"; // 显示日期时间
    
    // 把文本和日期都添加到列表项
    li.appendChild(span);                                // 先添加任务文本
    li.appendChild(dateSpan);                            // 再添加日期显示
    
    taskList.appendChild(li);                            // 将列表项添加到任务列表中
  });
  
  // 更新统计 - 显示任务总数
  statsElement.innerHTML = `总任务: ${tasks.length}`;    // 更新统计信息显示总任务数量
}

// 添加任务 - 处理用户输入并添加新任务
function addTask() {
  // 验证输入 - 确保输入不为空
  if (!taskInput.value) {                                // 如果输入框为空
    alert("任务不能为空!");                              // 显示警告信息
    return;                                              // 终止函数执行
  }
  // 检查重复 - 确保任务不重复
  if (tasks.some(task => task.text === taskInput.value)) { // 检查是否有相同文本的任务
    alert("任务已存在!");                                // 显示警告信息
    return;                                              // 终止函数执行
  }
  // 添加并更新 - 将新任务添加到数组并更新界面
  const newTask = {                                      // 创建新任务对象
    text: taskInput.value,                               // 设置任务文本
    createdAt: new Date()                                // 设置创建时间为当前时间
  };
  tasks.push(newTask);                                   // 将新任务添加到任务数组
  taskInput.value = "";                                  // 清空输入框
  updateDisplay();                                       // 更新页面显示
}

// 初始化 - 设置事件监听器
addBtn.addEventListener("click", addTask);               // 点击添加按钮时执行addTask函数
taskInput.addEventListener("keypress", e => {            // 监听输入框的按键事件
  if (e.key === "Enter") addTask();                      // 如果按下回车键则执行addTask函数
});

// 按名称排序功能 - 将任务按字母顺序排序
function sortTasksByName() {
  tasks.sort((a, b) => a.text.localeCompare(b.text));    // 对任务数组按文本字母顺序排序
  updateDisplay();                                       // 更新页面显示排序后的任务
}
// 按日期排序功能 - 将任务按创建日期排序
function sortTasksByDate() {
  tasks.sort((a, b) => a.createdAt - b.createdAt);       // 对任务数组按创建时间排序
  updateDisplay();                                       // 更新页面显示排序后的任务
}

// 绑定排序按钮点击事件
sortByNameBtn.addEventListener("click", sortTasksByName); // 点击按钮时执行名称排序函数
sortByDateBtn.addEventListener("click", sortTasksByDate); // 点击按钮时执行日期排序函数

// 首次显示 - 页面加载后立即显示任务列表
updateDisplay();                                         // 初始化页面时显示任务列表

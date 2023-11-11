const body = document.querySelector("body");
const inputRows = document.querySelector("#input-rows");
const inputCols = document.querySelector("#input-cols");

// create一个新的table元素并返回
const createTable = (rows, cols) => {
  const table = document.createElement("table");
  table.setAttribute("boder", 0);
  table.setAttribute("cellpadding", 0);
  table.setAttribute("cellspacing", 0);

  for (let i = 0; i < rows; i++) {
    table.insertRow();
  }

  const trList = table.childNodes[0].childNodes; // 所有插入的tr

  trList.forEach((tr) => {
    for (let i = 0; i < cols; i++) {
      tr.insertCell();
    }
  });
  return table;
};

// 存储table元素
let table = null;

// 处理输入，每次输入都会销毁原table，再创建新table
const handleInput = (e) => {
  if (table) {
    body.removeChild(table);
    table = null;
  }

  const rows = Number(inputRows.value); // string 转为 number 并且空字符串会转换为0
  const cols = Number(inputCols.value);
  if (rows && cols) {
    // 创建table并添加到DOM中
    table = createTable(rows, cols);
    body.appendChild(table);
  }
};

inputRows.addEventListener("input", handleInput);
inputCols.addEventListener("input", handleInput);

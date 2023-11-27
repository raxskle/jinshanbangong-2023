import { area, version } from "../data/filterRule.js";
import { getData } from "./fetch.js";
import { formatDate } from "./utils.js";

// 全局数据

// 选中的tags，filter，空字符串表示全部
let selectedArea = "";
let selectedVersion = "";

// 数据，初始化时根据'最新'请求，切换选项时也会请求
let savedData = [];

/**
 * 根据filterRule.js 的 area, version 对象 渲染可点击选择的tags列表
 */
const renderTags = () => {
  // 根据数据生成div，插入对应位置
  // 添加点击事件
  const areaTagContainer = document.querySelector(".tag-bar[tag='area']");
  const versionTagContainer = document.querySelector(".tag-bar[tag='version']");

  // 全部
  areaTagContainer.children[1].addEventListener("click", (e) => {
    handleClickTags(e, "area", "");
  });
  versionTagContainer.children[1].addEventListener("click", (e) => {
    handleClickTags(e, "version", "");
  });

  for (const key in area) {
    const tag = document.createElement("div");
    tag.className = "tag-content";
    tag.innerText = area[key];

    tag.addEventListener("click", (e) => {
      handleClickTags(e, "area", area[key]);
    });

    areaTagContainer.appendChild(tag);
  }

  for (const key in version) {
    const tag = document.createElement("div");
    tag.className = "tag-content";
    tag.innerText = version[key];

    tag.addEventListener("click", (e) => {
      handleClickTags(e, "version", version[key]);
    });

    versionTagContainer.appendChild(tag);
  }
};

/**
 * tag点击事件
 * 1.清除所有active类名，对应tag加上active类名
 * 2.修改全局变量selectedArea和selectedVersion
 * 3.再调用renderContent渲染 对当前数据过滤一遍
 *
 * @param {Event} e 点击事件
 * @param {"area"|"version"} type tag类型
 * @param {string} tag
 */
const handleClickTags = (e, type, tag) => {
  const tagContainer = document.querySelector(`.tag-bar[tag='${type}']`);

  for (let i = 1; i < tagContainer.children.length; i++) {
    tagContainer.children[i].className = "tag-content";
  }
  e.target.className += " active";

  if (type === "area") {
    selectedArea = tag;
  } else if (type === "version") {
    selectedVersion = tag;
  }

  handleTagsToBar();
  renderContent(savedData);
};

/**
 * 传入所有数据，根据全局变量tags来做filter，并渲染content
 *
 * @param {Array} currentData 数据
 */
const renderContent = async (currentData) => {
  // 清除原本items
  const container = document.querySelector(".content-list");
  container.innerHTML = null;

  // filter过滤
  const data = currentData.filter((item) => {
    // 非全选 且 对应字段不等于 selected 的过滤掉
    if (selectedArea !== "" && area[item.area] !== selectedArea) {
      return false;
    } else if (
      selectedVersion !== "" &&
      version[item.verison] !== selectedVersion
    ) {
      return false;
    } else {
      return true;
    }
  });

  // data => DOM  渲染列表
  for (let obj of data) {
    const item = createContentItem(obj);
    container.appendChild(item);
  }
};

/**
 * 传入所有数据，根据全局变量tags来做filter，并渲染content
 *
 * @param {any} obj 数据
 */
// 以innerHTML形式 create 一个内容item
const createContentItem = (obj) => {
  const item = document.createElement("div");
  item.className = "content-item";
  item.innerHTML = `
  <a class="content-cover" href="#" target="_blank">
    <img
      class="cover-img"
      src="${obj.picurl}"
    />
    <img
      class="mask"
      src="https://y.qq.com/ryqq/static/media/cover_play@2x.53a26efb.png?max_age=2592000"
    />
  </a>
  <a href="#" target="_blank" class="content-title">${obj.title}</a>
  <a href="#" target="_blank" class="content-singer">${obj.singers
    .map((singer) => singer.name)
    .join(" ")}</a>
  <div class="content-info">
    <img class="content-info-icon" src="./assets/icon.png" />
    <span class="content-view">${obj.playcnt}</span>
    <span class="content-date">${formatDate(obj.pubdate)}</span>
  </div>`;
  return item;
};

/**
 * 根据选择的类型请求数据，并调用renderContent渲染
 *
 * @param {"new"|"hot"} source
 */
const fetchAndRenderContent = async (source) => {
  savedData = await getData(source);
  renderContent(savedData);
};

/**
 * 绑定事件 切换"new"和"hot"时再次请求、根据tags过滤、渲染
 *
 */
const bindTypeSelector = () => {
  const selector = document.querySelector(".content-header .selector");

  // 事件委托
  selector.addEventListener("click", (e) => {
    if (!e.target.className.includes("active")) {
      //  切换
      for (let i = 0; i < selector.children.length; i++) {
        selector.children[i].className = "selection";
      }
      e.target.className = "selection active";

      fetchAndRenderContent(e.target.id);
    }
  });
};

/**
 * 处理 tags显示
 *
 * addTagsToBar 和 deleteTagFromBar 处理tags显示在标题栏
 * 状态可能为：无tag、或者一种类型的tag
 * 否则 area的tag一定会在version的tag之前
 */
const handleTagsToBar = () => {
  const titleBar = document.querySelector(".title-bar");

  titleBar.innerHTML = null;
  if (selectedArea === "" && selectedVersion === "") {
    // 无tags
    titleBar.innerHTML = "全部MV";
  }

  if (selectedArea !== "") {
    // 第一个tag
    const tagBtn = document.createElement("div");
    tagBtn.className = "tag-btn";
    tagBtn.innerHTML = ` ${selectedArea}
                          <div class="tag-delete">×</div>
                        `;
    titleBar.appendChild(tagBtn);

    tagBtn.children[0].addEventListener("click", (e) => {
      selectedArea = "";
      const tagContainer = document.querySelector(`.tag-bar[tag='area']`);

      for (let i = 1; i < tagContainer.children.length; i++) {
        tagContainer.children[i].className = "tag-content";
      }
      tagContainer.children[1].className += " active";
      handleTagsToBar();
      renderContent(savedData);
    });
  }
  if (selectedVersion !== "") {
    // 第二个tag
    const tagBtn = document.createElement("div");
    tagBtn.className = "tag-btn";
    tagBtn.innerHTML = ` ${selectedVersion}
                          <div class="tag-delete">×</div>
                        `;
    titleBar.appendChild(tagBtn);

    tagBtn.children[0].addEventListener("click", (e) => {
      selectedVersion = "";
      const tagContainer = document.querySelector(`.tag-bar[tag='version']`);

      for (let i = 1; i < tagContainer.children.length; i++) {
        tagContainer.children[i].className = "tag-content";
      }
      tagContainer.children[1].className += " active";
      handleTagsToBar();
      renderContent(savedData);
    });
  }
};

// 初始渲染 tags
renderTags();
// 初始渲染 content
fetchAndRenderContent("new");
// 初始 绑定切换事件
bindTypeSelector();

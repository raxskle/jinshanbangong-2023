import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: "ch",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          title: "Data management platform",
          setting: "Setting",
          settingLng: "Languages",
          dataTabTitle: "Data manage",
          tagsTabTitle: "Tags manage",
          id: "Id",
          name: "Name",
          description: "Description",
          tags: "Tags",
          addTime: "AddTime",
          action: "Action",
          actions: {
            modify: "Edit",
            delete: "Delete",
          },
          search: "Search",
          reset: "Reset",
          tips: {
            inputName: "Please enter a search name",
            inputTag: "Please select tag",
            inputDate: "Please select date",
            deleteTag: "Are you sure delete this tag? ",
            deleteTagFailed: "Can't delete labels that are already in use",
            deleteTagSucceed: "The tag was successfully deleted",
          },
          confirm: "Confirm",
          cancel: "Cancel",
          add: "Add",
          modal: {
            add: "Add data",
            addTag: "Add tag",
            modify: "Modify data",
            modifyTag: "Modify tag",
            cancel: "Cancel",
            submit: "Submit",
            inputName: "Please enter a name",
            inputDescription: "Please enter a description",
            addTagSucceed: "The tag was successfully added",
            modifyTagSucceed: "The tag has been successfully modified",
            inputNameNull: "The name field can't be empty",
            submitFail: "Submission failed",
          },
        },
      },
      ch: {
        translation: {
          title: "数据管理平台",
          setting: "设置",
          settingLng: "语言",
          dataTabTitle: "数据管理",
          tagsTabTitle: "标签管理",
          id: "编号",
          name: "名称",
          description: "描述",
          tags: "标签",
          addTime: "添加时间",
          action: "操作",
          actions: {
            modify: "编辑",
            delete: "删除",
          },
          search: "搜索",
          reset: "重置",
          tips: {
            inputName: "请输入搜索名称",
            inputTag: "请选择标签",
            inputDate: "请选择日期",
            deleteTag: "确认删除这个标签吗？",
            deleteTagFailed: "无法删除已被使用的标签",
            deleteTagSucceed: "成功删除标签",
          },
          confirm: "确认",
          cancel: "取消",
          add: "添加",
          modal: {
            add: "添加数据",
            addTag: "添加标签",
            modify: "修改数据",
            modifyTag: "修改标签",
            cancel: "取消",
            submit: "提交",
            inputName: "请输入名称",
            inputDescription: "请输入描述",
            addTagSucceed: "新增标签成功",
            modifyTagSucceed: "修改标签成功",
            addDataSucceed: "新增数据成功",
            modifyDataSucceed: "修改数据成功",
            inputNameNull: "名称栏不能为空",
            submitFail: "提交失败",
          },
        },
      },
    },
  });

export default i18n;

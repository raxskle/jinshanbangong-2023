import { Button, Divider, Popconfirm, Table, message } from "antd";
import style from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { deleteTags, getAllTags } from "../../https/tags";
import { setTags } from "../../store/tagsSlice";
import { useState } from "react";
import TagsModal from "../../components/TagsModal/TagsModal";

export default function TagsView() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.tags.tags);

  // 表单规格
  const columns: ColumnsType<Tag> = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      render: (text: string) => <div style={{ minWidth: "40px" }}>{text}</div>,
    },
    {
      title: t("action"),
      key: "action",
      render: (tags) => {
        return (
          <div key={Math.random()} style={{ minWidth: "80px" }}>
            <a
              onClick={() => {
                setShowModifyModal(true);
                setModifyTag(tags);
              }}
            >
              {t("actions.modify")}
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title={t("tips.deleteTag")}
              onConfirm={async () => {
                const ok = await deleteTags(tags.key); // 删除tag
                const allTags = await getAllTags(); // 获取最新tags
                dispatch(setTags({ tags: allTags }));

                // 显示是否成功删除
                if (ok) {
                  message.success(t("tips.deleteTagSucceed"));
                } else {
                  message.error(t("tips.deleteTagFailed"));
                }
              }}
              // onCancel={cancel}
              okText={t("confirm")}
              cancelText={t("cancel")}
            >
              <a style={{ color: "red" }}>{t("actions.delete")}</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // 渲染增加标签modal
  const [showAddModal, setShowAddModal] = useState(false);

  // 渲染修改数据modal
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyTag, setModifyTag] = useState<Tag>();

  return (
    <div className={style["view"]}>
      <div className={style["main-area"]}>
        <div className={style["add-bar"]}>
          <Button
            type="primary"
            onClick={() => {
              setShowAddModal(true);
            }}
          >
            {t("add")}
          </Button>
        </div>

        <div className={style["table-container"]}>
          <Table columns={columns} dataSource={tags} />
        </div>
      </div>

      <TagsModal open={showAddModal} type={"add"} setOpen={setShowAddModal} />
      <TagsModal
        open={showModifyModal}
        type={"modify"}
        setOpen={setShowModifyModal}
        tag={modifyTag}
      />
    </div>
  );
}

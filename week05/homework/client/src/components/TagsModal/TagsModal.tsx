import { Button, Input, Modal, message } from "antd";
import style from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { addTags, getAllTags, modifyTags } from "../../https/tags";
import { setTags } from "../../store/tagsSlice";
import { useDispatch } from "react-redux";

// import { useSelector } from "react-redux";
// import { RootState } from "../../store";

interface ModalType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tag?: Tag | undefined;
  type?: "add" | "modify";
}

export default function TagsModal({
  open,
  setOpen,
  tag,
  type = "add",
}: ModalType) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  // const allTags = useSelector((state: RootState) => state.tags.tags);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState<ToAddTag>({
    name: "",
  });

  // 填充数据
  useEffect(() => {
    if (tag) {
      setInput({
        name: tag.name,
      });
    }
  }, [tag]);

  const onCancel = () => {
    // 当正在发送时不可取消
    if (!loading) {
      setOpen(false);
    }
  };

  const onOk = async () => {
    // 判断能否提交，新增或修改
    if (input.name == "") {
      message.error(t("modal.inputNameNull"));
    } else {
      setLoading(true);
      if (type === "add") {
        await addTags(input.name);
        message.success(t("modal.addTagSucceed"));
      } else if (type === "modify" && tag) {
        await modifyTags({ key: tag.key, name: input.name });
        message.success(t("modal.modifyTagSucceed"));
      }

      const allTags = await getAllTags(); // 获取最新tags
      dispatch(setTags({ tags: allTags }));

      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 500);
    }
  };

  return (
    <div className={style["modal"]}>
      <Modal
        open={open}
        title={type === "add" ? t("modal.addTag") : t("modal.modifyTag")}
        onOk={onOk}
        onCancel={onCancel}
        footer={[
          <Button key={t("modal.cancel")} onClick={onCancel}>
            {t("modal.cancel")}
          </Button>,
          <Button
            key={t("modal.submit")}
            type="primary"
            loading={loading}
            onClick={onOk}
          >
            {t("modal.submit")}
          </Button>,
        ]}
      >
        <div className={style["title"]}>{t("name") + ": "}</div>
        <Input
          placeholder={t("modal.inputName")}
          className={style["input"]}
          value={input.name}
          onChange={(e) => {
            setInput((input) => {
              return {
                ...input,
                name: e.target.value,
              };
            });
          }}
        />
      </Modal>
    </div>
  );
}

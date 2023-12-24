import { Button, Input, Modal, message } from "antd";
import style from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Select } from "antd";
const { Option } = Select;

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addData, getAllData, modifyData } from "../../https/data";
import { setData } from "../../store/dataSlice";

interface ModalType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: Data | undefined;
  type?: "add" | "modify";
}

export default function DataModal({
  open,
  setOpen,
  data,
  type = "add",
}: ModalType) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const allTags = useSelector((state: RootState) => state.tags.tags);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState<ToAddData>({
    name: "",
    description: "",
    tagKeys: [],
  });

  // 填充数据
  useEffect(() => {
    if (data) {
      setInput({
        name: data.name,
        description: data.description,
        tagKeys: data.tags.map((tag) => tag.key),
      });
    }
  }, [data]);

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
        await addData(input.name, input.description, input.tagKeys);
        message.success(t("modal.addDataSucceed"));
      } else if (type === "modify" && data) {
        await modifyData(
          {
            ...data,
            name: input.name,
            description: input.description,
          },
          input.tagKeys
        );
        message.success(t("modal.modifyDataSucceed"));
      }

      const allData = await getAllData(); // 获取最新tags
      dispatch(setData({ data: allData }));

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
        title={type === "add" ? t("modal.add") : t("modal.modify")}
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
        <span>{t("description") + ": "}</span>
        <Input
          placeholder={t("modal.inputDescription")}
          className={style["input"]}
          value={input.description}
          onChange={(e) => {
            setInput((input) => {
              return {
                ...input,
                description: e.target.value,
              };
            });
          }}
        />

        <span>{t("tags") + ": "}</span>
        <Select
          mode="multiple"
          className={style["input"]}
          placeholder={t("tips.inputTag")}
          style={{ width: "100%" }}
          value={input.tagKeys}
          onChange={(e) => {
            setInput((input) => {
              return {
                ...input,
                tagKeys: e,
              };
            });
          }}
        >
          {allTags &&
            allTags.map((tag) => {
              return <Option key={tag.key}>{tag.name}</Option>;
            })}
        </Select>
      </Modal>
    </div>
  );
}

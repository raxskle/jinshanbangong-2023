import { useTranslation } from "react-i18next";
import style from "./index.module.scss";
import { Button, DatePicker, Input, Select } from "antd";
import { Dayjs } from "dayjs";
import { Table, Divider, Tag } from "antd";
import DataModal from "../../components/DataModal/DataModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { getAllData, searchData } from "../../https/data";
import { setData } from "../../store/dataSlice";

const { Option } = Select;

export default function DataView() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    getAllData().then((data) => {
      dispatch(setData({ data }));
    });
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.data.data);
  const tags = useSelector((state: RootState) => state.tags.tags);

  const [seacrhValue, setSearchValue] = useState<{
    name: string;
    time: string;
    tagKeys: string[];
  }>({
    name: "",
    time: "",
    tagKeys: [],
  });

  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(null);

  // 搜索name
  const onInputSearchName = (name: string) => {
    setSearchValue((v) => {
      return {
        ...v,
        name,
      };
    });
  };

  // 搜索tags
  const onSelectSearchTag = (tagKeys: string[]) => {
    setSearchValue((v) => {
      return {
        ...v,
        tagKeys,
      };
    });
  };

  // 搜索tab 选择时间
  const onSelectTime = (date: Dayjs | null, dateString: string) => {
    setDatePickerValue(date);
    setSearchValue((v) => {
      return {
        ...v,
        time: dateString,
      };
    });
  };

  // 搜索
  const onSearch = () => {
    searchData(seacrhValue).then((data) => {
      dispatch(setData({ data }));
    });
  };

  // 重置搜索框
  const onReset = () => {
    setDatePickerValue(null);
    setSearchValue({
      name: "",
      time: "",
      tagKeys: [],
    });
    // 重置data内容
    getAllData().then((data) => {
      dispatch(setData({ data }));
    });
  };

  // 表单规格
  const columns: ColumnsType<Data> = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
      render: (id: number) => <div style={{ minWidth: "32px" }}>{id}</div>,
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      render: (text: string) => <div style={{ minWidth: "40px" }}>{text}</div>,
    },
    {
      title: t("description"),
      dataIndex: "description",
      key: "description",
      render: (description: string) => (
        <div style={{ minWidth: "32px" }}>{description}</div>
      ),
    },
    {
      title: t("addTime"),
      dataIndex: "time",
      key: "time",
      render: (addTime: string) => (
        <div style={{ minWidth: "60px" }}>{addTime}</div>
      ),
    },
    {
      title: t("tags"),
      key: "tags",
      dataIndex: "tags",
      render: (tags: { key: string; name: string }[]) => (
        <span style={{ minWidth: "60px" }}>
          {tags.map((tag, index) => {
            const color = ["geekblue", "green", "orange", "pink"][index % 4];
            return (
              <Tag color={color} key={tag.key}>
                {tag.name}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: t("action"),
      key: "action",
      render: (data) => {
        return (
          <div key={Math.random()} style={{ minWidth: "80px" }}>
            <a
              onClick={() => {
                setShowModifyModal(true);
                setModifyData(data);
              }}
            >
              {t("actions.modify")}
            </a>
            <Divider type="vertical" />
            <a style={{ color: "red" }}>{t("actions.delete")}</a>
          </div>
        );
      },
    },
  ];

  // 渲染增加数据modal
  const [showAddModal, setShowAddModal] = useState(false);

  // 渲染修改数据modal
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyData, setModifyData] = useState<Data>();

  return (
    <div className={style["view"]}>
      <div className={style["top-area"]}>
        <div className={style["item"]}>{t("name") + ": "}</div>
        <Input
          placeholder={t("tips.inputName")}
          className={style["input"]}
          value={seacrhValue.name}
          onChange={(e) => {
            onInputSearchName(e.target.value);
          }}
        />
        <div className={style["item"]}>{t("tags") + ": "}</div>
        <Select
          mode="multiple"
          className={style["input"]}
          placeholder={t("tips.inputTag")}
          value={seacrhValue.tagKeys}
          onChange={(e) => {
            onSelectSearchTag(e);
          }}
        >
          {tags &&
            tags.map((tag) => {
              return <Option key={tag.key}>{tag.name}</Option>;
            })}
        </Select>
        <div className={style["item"]}>{t("addTime") + ": "}</div>
        <DatePicker
          value={datePickerValue}
          onChange={onSelectTime}
          placeholder={t("tips.inputDate")}
        />
        <Button type="primary" className={style["btn"]} onClick={onSearch}>
          {t("search")}
        </Button>
        <Button type="default" className={style["btn"]} onClick={onReset}>
          {t("reset")}
        </Button>
      </div>

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
          <Table columns={columns} dataSource={data} />
        </div>
      </div>

      <DataModal open={showAddModal} type={"add"} setOpen={setShowAddModal} />
      <DataModal
        open={showModifyModal}
        type={"modify"}
        setOpen={setShowModifyModal}
        data={modifyData}
      />
    </div>
  );
}

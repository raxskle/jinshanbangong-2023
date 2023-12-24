import style from "./App.module.scss";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Button from "antd/es/button";

import { Popover } from "antd";
import { useEffect } from "react";
import { getAllTags } from "./https/tags";

import { useDispatch } from "react-redux";
import { setTags } from "./store/tagsSlice";

import SettingIcon from "./assets/setting-icon.png";
import DataIcon from "./assets/data-icon.png";
import TagIcon from "./assets/tag-icon.png";
// import { RootState } from "./store";

interface Lngs {
  [key: string]: { nativeName: string };
}

const lngs: Lngs = {
  en: { nativeName: "English" },
  ch: { nativeName: "中文" },
};

function App() {
  const dispatch = useDispatch();

  // const data = useSelector((state: RootState) => state.data);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    getAllTags().then((tags) => {
      dispatch(setTags({ tags }));
    });
  }, [dispatch]);

  const navStyle = ({ isActive }: { isActive: boolean }) => {
    return style[`${isActive ? "nav-active" : "nav"}`];
  };

  const content = (
    <div className={style["setting-board"]}>
      {Object.keys(lngs).map((lng) => (
        <Button
          key={lng}
          type={i18n.resolvedLanguage === lng ? "primary" : "default"}
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng].nativeName}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      <nav className={style["top"]}>
        <div className={style["title"]}>{t("title")}</div>
        <Popover content={content} title={t("settingLng")}>
          <div className={style["setting"]}>
            <img src={SettingIcon} className={style["setting-icon"]} />
            {t("setting")}
          </div>
        </Popover>
      </nav>

      <main className={style["main"]}>
        <aside className={style["side-nav"]}>
          <NavLink to={"/"} className={navStyle}>
            <img src={DataIcon} className={style["nav-icon"]} />
            {t("dataTabTitle")}
          </NavLink>

          <NavLink to={"/tags"} className={navStyle}>
            <img src={TagIcon} className={style["nav-icon"]} />
            {t("tagsTabTitle")}
          </NavLink>
        </aside>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default App;

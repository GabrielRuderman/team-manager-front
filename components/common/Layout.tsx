import React from "react";
import SimpleMenuAppBar from "../SimpleMenuAppBar";
//import FullMenuAppBar from "../FullMenuAppBar";
import Footer from "../Footer";
import styles from "../../styles/components/common/layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <SimpleMenuAppBar />
      <div className={styles.layoutContent}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
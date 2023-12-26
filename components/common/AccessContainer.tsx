import React from 'react';
import styles from "../../styles/components/common/accessContainer.module.scss";

const AccessContainer: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default AccessContainer;
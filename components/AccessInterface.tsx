import React from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import styles from "../styles/components/accessInterface.module.scss";

const AccessInterface: React.FC = () => {
  return (
    <div className={styles.container}>
      <LogIn />
      <SignUp />
    </div>
  );
};

export default AccessInterface;
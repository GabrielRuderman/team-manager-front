import React, { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import AccessInterface from "../components/AccessInterface";
import { validateToken } from "./api/userApi";
import Layout from "../components/common/Layout";
import styles from "../styles/index.module.scss";

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    validateToken().then(response => {
        if (response?.code === 1) {
            router.push("./dashboard");
        }
    });
  }, []);

  return (
    <Layout>
      <div className={styles.accessInterface}>
        <AccessInterface />
      </div>
    </Layout>
  );
};

export default HomePage;
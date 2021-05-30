import React from 'react';
import styles from "./Footer.module.scss";
import Image from "next/image";

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
        <p>(C) Mehmet Ak, 2021</p>
    </footer>
  );
};

export default Footer;

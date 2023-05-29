import React from "react";
import styles from "./FloatingText.module.css";

interface FloatingTextProps {
  children: React.ReactNode;
}

const FloatingText: React.FC<FloatingTextProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default FloatingText;

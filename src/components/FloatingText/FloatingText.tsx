import React from "react";
import styles from "./FloatingText.module.css";

interface FloatingTextProps {
  children: React.ReactNode;
  score: number;
}

const FloatingText: React.FC<FloatingTextProps> = ({ children, score }) => {
  return (
    <div key={score} className={styles.wrapper}>
      {children}
    </div>
  );
};

export default FloatingText;

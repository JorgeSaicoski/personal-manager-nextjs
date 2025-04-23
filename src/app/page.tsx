"use client"

import Button from "@/components/button";
import styles from "./page.module.scss";

export default function Home() {
  const handleClick = () => {
    console.log("Button clicked");
  };
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button text="Click me" onClick={handleClick}></Button>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}

"use client"

import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push("/tasks");
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
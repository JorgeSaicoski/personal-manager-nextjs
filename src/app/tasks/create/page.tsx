"use client";

import Button from "@/components/button";

export default function Home() {
  const handleClick = () => {
    console.log("create")
  };
  return (
    <div>
      <main>
        <p>form</p>
        <Button text="Create new Task" onClick={handleClick}></Button>
      </main>
      <footer></footer>
    </div>
  );
}

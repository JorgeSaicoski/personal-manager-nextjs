"use client";

import { useState, FormEvent, useRef, useEffect } from 'react';
import styles from "./paper.module.scss";

const Paper = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  
  const nameRef = useRef<HTMLSpanElement>(null);
  const messageRef = useRef<HTMLSpanElement>(null);
  const emailRef = useRef<HTMLSpanElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!name.trim() || !message.trim() || !email.trim()) {
      alert("Please fill in all fields");
      return;
    }
    
    console.log({ name, message, email });
    // Here you would typically send the data to your server
  };

  // Handle contentEditable changes more reliably
  const handleContentChange = (
    e: React.FocusEvent<HTMLSpanElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const text = e.currentTarget.innerText.trim();
    setter(text);
  };

  return (
    <div className={styles.wrapper}>      
      <form className={styles.formContact} onSubmit={handleSubmit}>
        <fieldset>
          <p>Hey, Stranger!</p>
          <p>
            My name is <span 
              ref={nameRef}
              className={styles.formField} 
              data-placeholder="your name" 
              tabIndex={1} 
              contentEditable
              onBlur={(e) => handleContentChange(e, setName)}
            ></span> and I'm writing to you since I'm interested in <span 
              ref={messageRef}
              className={styles.formField} 
              data-placeholder="your message" 
              tabIndex={2} 
              contentEditable
              onBlur={(e) => handleContentChange(e, setMessage)}
            ></span>.
          </p>
          <p>
            This is my <span 
              ref={emailRef}
              className={styles.formField} 
              data-placeholder="email address" 
              tabIndex={3} 
              contentEditable
              onBlur={(e) => handleContentChange(e, setEmail)}
            ></span>.
          </p>
          <p>Hope to get in touch soon. Cheers!</p>
          <button type="submit" tabIndex={4}>
            Send message &#187;
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Paper;
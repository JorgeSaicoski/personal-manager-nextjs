"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import styles from "./paper.module.scss";

type PaperProps = {
  title: string; // The title text content
  text: string; // The main text content
  detailText: string[]; // Status details to display at the bottom
  onClick: () => void; // Function to call when save/update button is clicked
  canWrite?: boolean; // Whether the content is editable
  finishText?: string; // Text for the save/update button
};

const Paper = ({
  title,
  text,
  detailText,
  onClick,
  canWrite = false,
  finishText = "Save",
}: PaperProps) => {
  const [content, setContent] = useState(text);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Update the ref content when text prop changes
  useEffect(() => {
    setContent(text);
    if (contentRef.current) {
      contentRef.current.innerText = text;
    }
  }, [text]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClick();
  };

  // Handle contentEditable changes
  const handleContentChange = (e: React.FocusEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.innerText.trim();
    setContent(newText);
  };

  return (
    <div className={styles.wrapper} onClick={onClick}>
      <form className={styles.formPaper} onSubmit={handleSubmit}>
        <fieldset>
          {/* Title area */}
          <p>
            <span
              ref={titleRef}
              className={`${styles.form__field} ${
                canWrite ? styles.editable : ""
              }`}
              contentEditable={canWrite}
              suppressContentEditableWarning={true}
              data-placeholder="Enter title..."
            >
              {title}
            </span>
          </p>

          {/* Main content area */}
          <p>
            <span
              ref={contentRef}
              className={`${styles.form__field} ${
                canWrite ? styles.editable : ""
              }`}
              contentEditable={canWrite}
              onBlur={canWrite ? handleContentChange : undefined}
              suppressContentEditableWarning={true}
              {...(canWrite
                ? { "data-placeholder": "Write your text here..." }
                : {})}
            >
              {text}
            </span>
          </p>

          {/* Status details at the bottom */}
          {detailText.length > 0 && (
            <p className={styles.details}>
              {detailText.map((detail, index) => (
                <span key={index} className={styles.detailItem}>
                  {detail}
                </span>
              ))}
            </p>
          )}

          {/* Only show button if canWrite is true */}
          {canWrite && <button type="submit">{finishText}</button>}
        </fieldset>
      </form>
    </div>
  );
};

export default Paper;

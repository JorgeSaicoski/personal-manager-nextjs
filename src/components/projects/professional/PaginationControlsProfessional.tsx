import { useEffect, useState } from "react";
import styles from "./styles/PaginationControlsProfessional.module.scss";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationControls({
  totalPages,
  currentPage
}: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPageState, setCurrentPageState] = useState(currentPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      goToPage(totalPages.toString());
    } else {
      setCurrentPageState(currentPage);
    }
  }, [currentPage, totalPages]);

  const goToPage = (newPage: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };

  const generatePageElements = () => {
    if (totalPages <= 1) return [];
    
    const elements = [];
    
    // Add previous button
    if (currentPageState > 1) {
      elements.push(
        <a key="prev" className={styles.elem} onClick={() => goToPage((currentPageState-1).toString())}>
          prev
        </a>
      );
    }
  
    // Always show first page
    elements.push(
      <a
        key={1}
        className={`${styles.elem} ${currentPageState === 1 ? styles.active : ''}`}
        onClick={() => goToPage('1')}
      >
        1
      </a>
    );
  
    // Show ellipsis if needed after first page
    if (currentPageState > 3) {
      elements.push(<span key="ellipsis1" className={styles.dots}>...</span>);
    }
  
    // Show pages around current page
    for (let i = Math.max(2, currentPageState - 1); i <= Math.min(totalPages - 1, currentPageState + 1); i++) {
      if (i !== 1 && i !== totalPages) {
        elements.push(
          <a
            key={i}
            className={`${styles.elem} ${currentPageState === i ? styles.active : ''}`}
            onClick={() => goToPage(i.toString())}
          >
            {i}
          </a>
        );
      }
    }
  
    // Show ellipsis if needed before last page
    if (currentPageState < totalPages - 2) {
      elements.push(<span key="ellipsis2" className={styles.dots}>...</span>);
    }
  
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      elements.push(
        <a
          key={totalPages}
          className={`${styles.elem} ${currentPageState === totalPages ? styles.active : ''}`}
          onClick={() => goToPage(totalPages.toString())}
        >
          {totalPages}
        </a>
      );
    }
  
    // Add next button
    if (currentPageState < totalPages) {
      elements.push(
        <a key="next" className={styles.elem} onClick={() => goToPage((currentPageState+1).toString())}>
          next
        </a>
      );
    }
  
    return elements;
  };

  const pageElements = generatePageElements();

  if (pageElements.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        {pageElements}
      </div>
      <div className={styles.info}>
        Page {currentPageState} of {totalPages}
      </div>
    </div>
  );
}
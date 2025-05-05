import { useEffect, useState } from "react";
import styles from "./styles/PaginationControls.module.scss";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  totalPages: number;
}

export default function PaginationControls({
  totalPages,
}: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    setCurrentPage(page);
  }, [searchParams]);

  const goToPage = (newPage: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };

  const generatePageElements = () => {
    if (currentPage > totalPages){
      setCurrentPage(totalPages)
    }
    const elements = [];
    
    // Add previous button
    if (currentPage > 1) {
      elements.push(
        <a key="prev" className={styles.elem} onClick={() => goToPage((currentPage-1).toString())}>
          prev
        </a>
      );
    }
  
    // Always show first page
    elements.push(
      <a
        key={1}
        className={`${styles.elem} ${currentPage === 1 ? styles.active : ''}`}
        onClick={() => goToPage('1')}
      >
        1
      </a>
    );
  
    // Show ellipsis if needed after first page
    if (currentPage > 3) {
      elements.push(<span key="ellipsis1" className={styles.dots}>...</span>);
    }
  
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i !== 1 && i !== totalPages) {
        elements.push(
          <a
            key={i}
            className={`${styles.elem} ${currentPage === i ? styles.active : ''}`}
            onClick={() => goToPage(i.toString())}
          >
            {i}
          </a>
        );
      }
    }
  
    // Show ellipsis if needed before last page
    if (currentPage < totalPages - 2) {
      elements.push(<span key="ellipsis2" className={styles.dots}>...</span>);
    }
  
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      elements.push(
        <a
          key={totalPages}
          className={`${styles.elem} ${currentPage === totalPages ? styles.active : ''}`}
          onClick={() => goToPage(totalPages.toString())}
        >
          {totalPages}
        </a>
      );
    }
  
    // Add next button
    if (currentPage < totalPages) {
      elements.push(
        <a key="next" className={styles.elem} onClick={() => goToPage((currentPage+1).toString())}>
          next
        </a>
      );
    }
  
    return elements;
  };

  return <div className={styles.bar}>{generatePageElements()}</div>;
}

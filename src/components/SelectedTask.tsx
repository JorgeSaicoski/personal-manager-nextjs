import { Task } from "@/services/tasks/tasks";
import styles from "./styles/SelectedTask.module.scss";

interface SelectedTaskProps {
  task: Task | null;
  onClose: () => void;
}

const SelectedTask = ({ task, onClose }: SelectedTaskProps) => {
  if (!task) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.top}>
        <h2>{task.title}</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <div className={styles.modal}>

        
        {task.description && <p>{task.description}</p>}
        <div className={styles.details}>
          <p>Status: {task.status || "Not set"}</p>
          {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
        </div>
      </div>
    </div>
  );
};

export default SelectedTask;
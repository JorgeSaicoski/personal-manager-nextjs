import Button from "@/components/Button";
import styles from "./styles/DeleteConfirmation.module.scss";
import { Task } from "@/services/tasks/tasks";

interface DeleteConfirmationProps {
  selectedTasks: Task[];
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation = ({
  selectedTasks,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) => {
  if (selectedTasks.length === 0) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.confirmationBox}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete {selectedTasks.length} task{selectedTasks.length>1?"s":""}?</p>
        <div className={styles.taskList}>
          {selectedTasks.map((task) => (
            <div key={task.ID} className={styles.taskItem}>
              {task.title}
            </div>
          ))}
        </div>
        <div className={styles.buttonGroup}>
          <Button text="Cancel" onClick={onCancel} />
          <Button text="Delete" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;

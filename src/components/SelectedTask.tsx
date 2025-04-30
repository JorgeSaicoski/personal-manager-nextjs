import { Task } from "@/services/tasks/tasks";
import styles from "./styles/SelectedTask.module.scss";
import { useEffect, useState } from "react";

interface SelectedTaskProps {
  task: Task | null;
  onClose: () => void;
}

const SelectedTask = ({ task, onClose }: SelectedTaskProps) => {
  if (!task) return null;
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">(
    "pending"
  );
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    setDescription(task.description ? task.description : "");
    setStatus(task.status ? task.status : "pending");
  }, [task]);
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDescription(e.target.value);
    setSaved(false);
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as "pending" | "in-progress" | "completed");
    setSaved(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.top}>
        <h2>{task.title}</h2>
        <button
          className={`${styles.saveButton} ${saved ? styles.saved : ""}`}
          onClick={() => setSaved(true)}
        >
          {saved ? "Saved" : "Save"}
        </button>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <div className={styles.modal}>
        <textarea
          id="description"
          value={description}
          onChange={(e) => handleDescriptionChange(e)}
          rows={3}
          placeholder="Task description (optional)"
        />
        <div className={styles.details}>
          <p>Status:</p>
          <select
            id="status"
            value={status}
            onChange={(e) =>
              handleStatusChange(
                e
              )
            }
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectedTask;

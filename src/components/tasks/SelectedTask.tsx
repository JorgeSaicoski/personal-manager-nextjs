import { Task, updateTask } from "@/services/tasks/tasks";
import styles from "./styles/SelectedTask.module.scss";
import { useEffect, useState } from "react";

interface SelectedTaskProps {
  task: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const SelectedTask = ({ task, onClose, onSave }: SelectedTaskProps) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">("pending");
  const [saved, setSaved] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    if (task) {
      setDescription(task.description ? task.description : "");
      setStatus(task.status ? task.status : "pending");
      
      // Add a small delay before showing to make the animation visible
      setTimeout(() => {
        setVisible(true);
      }, 250);
    }
  }, [task]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setSaved(false);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as "pending" | "in-progress" | "completed");
    setSaved(false);
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!task || !task.ID) {
      console.error("Cannot save: task is null");
      return;
    }
    try {
      await updateTask(task.ID.toString(), {
        description: description,
        status: status,
      });
      const updatedTask = {
        ...task,
        description,
        status
      };
      onSave(updatedTask)
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      setSaved(true);
    }
  };

  const handleClose = () => {
    // First hide with animation
    setVisible(false);
    
    // Then actually close after animation completes
    setTimeout(() => {
      onClose();
    }, 400);
  };

  // Return null after all hooks are called
  if (!task) return null;

  return (
    <div className={`${styles.overlay} ${visible ? styles.visible : ''}`}>
      <div className={styles.top}>
        <h2>{task.title}</h2>
        <button
          className={`${styles.saveButton} ${saved ? styles.saved : ""}`}
          onClick={(e) => handleSave(e)}
        >
          {saved ? "Saved" : "Save"}
        </button>
        <button className={styles.closeButton} onClick={handleClose}>
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
            onChange={(e) => handleStatusChange(e)}
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
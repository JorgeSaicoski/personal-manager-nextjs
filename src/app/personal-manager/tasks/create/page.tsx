"use client";

import Button from "@/components/Button";
import { createTask } from "@/services/tasks/tasks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./../page.module.scss";

export default function CreateTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">(
    "pending"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await createTask({
        title,
        description: description || undefined,
        status,
      });

      // Redirect to tasks list page after successful creation
      router.push("/personal-manager/tasks");
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {error && <div>{error}</div>}

      <form className={styles.formPaper} onSubmit={handleSubmit}>
        <fieldset>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Task description (optional)"
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as "pending" | "in-progress" | "completed"
              )
            }
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <Button
          text={isSubmitting ? "Creating..." : "Create Task"}
          onClick={() => {}}
          disabled={isSubmitting}
        />
        <button type="button" onClick={() => router.push("/personal-manager/tasks")}>
          Cancel
        </button>
        </fieldset>
      </form>
      
    </div>
  );
}

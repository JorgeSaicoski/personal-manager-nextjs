"use client";

import Button from "@/components/button";
import { createTask } from "@/services/tasks/tasks";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      router.push("/tasks");
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Create New Task</h1>

      {error && (
        <div>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Task description (optional)"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="status" className="block mb-2 font-medium">
            Status
          </label>
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

        <div className="flex gap-4">
          <Button
            text={isSubmitting ? "Creating..." : "Create Task"}
            onClick={() => {}}
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={() => router.push("/tasks")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}


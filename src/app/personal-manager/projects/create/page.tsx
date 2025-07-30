"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import AuthRoutes from "@/components/protected-routes/AuthRoutes";
import {
  createProfessionalProject,
  CreateProfessionalProjectRequest,
} from "@/services/projects/professional/projects";
import styles from "./page.module.scss";

export default function CreateProjectPage() {
  return (
    <AuthRoutes>
      <CreateProjectForm />
    </AuthRoutes>
  );
}

function CreateProjectForm() {
  const router = useRouter();

  // form state
  const [formData, setFormData] = useState<CreateProfessionalProjectRequest>({
    title: "",
    clientName: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createProfessionalProject(formData); // uses the existing POST helper :contentReference[oaicite:0]{index=0}
      setSuccess(true);
      // brief pause so the user sees the success state
      setTimeout(() => router.push("/personal-manager/projects/professional"), 800);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Professional Project</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="clientName">Client name</label>
          <input
            id="clientName"
            name="clientName"
            type="text"
            value={formData.clientName ?? ""}
            onChange={handleChange}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Project created 🎉</p>}

        <Button
          text={submitting ? "Creating…" : "Create project"}
          type="submit"
          disabled={submitting}
        />
      </form>
    </div>
  );
}

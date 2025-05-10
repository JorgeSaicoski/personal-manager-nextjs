import styles from "./styles/SideBarTasks.module.scss";

type SideBarTasksProps = {
  onClick: (mode: "todo" | "completed" | "delete") => void;
  activeMode: "todo" | "completed" | "delete";
};

const SideBarTasks = ({ onClick, activeMode }: SideBarTasksProps) => {
  return (
    <aside className={styles.sideBar}>
      <div>
        <button
          className={`${styles.todo} ${
            activeMode === "todo" ? styles.active : ""
          }`}
          onClick={() => onClick("todo")}
        >
          To Do
        </button>
        <button
          className={`${styles.completed} ${
            activeMode === "completed" ? styles.active : ""
          }`}
          onClick={() => onClick("completed")}
        >
          Completed
        </button>
        <button
          className={`${styles.delete} ${
            activeMode === "delete" ? styles.active : ""
          }`}
          onClick={() => onClick("delete")}
        >
          Delete
        </button>
      </div>
    </aside>
  );
};

export default SideBarTasks;

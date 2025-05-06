import styles from "./styles/SideBarTasks.module.scss";

type SideBarTasksProps = {
    onClick: (mode: "todo" | "completed") => void;
  };
  
  const SideBarTasks = ({ onClick }: SideBarTasksProps) => {
    return (
      <aside className={styles.sideBar}>
        <div>
          <button className={styles.todo} onClick={() => onClick("todo")}>To Do</button>
          <button className={styles.completed} onClick={() => onClick("completed")}>Completed</button>
          <button className={styles.delete}>Delete</button>
        </div>
      </aside>
    );
  };
export default SideBarTasks;


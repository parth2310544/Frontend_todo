"use client";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  color: string;
}

interface TaskCardProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const TaskCard = ({ tasks, setTasks }: TaskCardProps) => {
  const router = useRouter();

  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    });

    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure ? you want to delete this task?"
    );
    if (!isConfirmed) return;
    await fetch(`http://localhost:8080/todos/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="flex flex-col h-screen items-center mt-6 px-4 ">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex justify-between items-center bg-neutral-900 p-3 rounded-lg">
        <div className="flex items-center space-x-2">
          <p className="text-sky-500 text-sm sm:text-base">Tasks</p>
          <span className="text-white bg-neutral-800 px-3 py-1 rounded-full text-xs sm:text-sm">
            {totalTasks}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-indigo-400 text-sm sm:text-base">Completed</p>
          <span className="text-white bg-neutral-800 px-3 py-1 rounded-full text-xs sm:text-sm">
            {completedTasks} of {totalTasks}
          </span>
        </div>
      </div>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mt-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="relative flex items-start w-full my-2 bg-neutral-800 p-4 rounded border border-neutral-700 shadow-md"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="peer relative appearance-none w-5 h-5 border rounded-full border-sky-400 cursor-pointer checked:bg-indigo-400 mt-1"
              />

              <div className="ml-3 flex-grow min-w-0">
                <span
                  className={`text-sm sm:text-base font-semibold cursor-pointer break-words block ${
                    task.completed ? "line-through text-gray-500" : "text-white"
                  }`}
                  style={{ color: task.color }}
                  onClick={() => router.push(`/editTask/${task.id}`)}
                >
                  {task.title}
                </span>
              </div>

              <RiDeleteBin6Line
                className="absolute top-4 right-4 text-white hover:text-red-600 cursor-pointer transition duration-200"
                onClick={() => deleteTask(task.id)}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center bg-neutral-800 p-6 rounded-lg border border-neutral-700 shadow-md text-center">
            <LuClipboardList className="text-gray-500 text-4xl mb-2" />
            {/* <FiInbox className="text-gray-500 text-4xl mb-2" /> */}
            <p className="text-white text-lg font-semibold">
              You don't have any tasks registered yet.
            </p>
            <p className="text-gray-400 text-sm">Create tasks and organize your to-do items.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

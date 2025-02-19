"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { LuCirclePlus } from "react-icons/lu";

const colors = ["red", "blue", "green", "yellow", "purple", "orange", "white"];

const TaskForm = ({ taskId }: { taskId?: string }) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [color, setColor] = useState(colors[0]);
  const router = useRouter();

  useEffect(() => {
    if (taskId) {
      fetch(`http://localhost:8080/todos/${taskId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setTitle(data.title);
            setCompleted(data.completed);
            setColor(data.color || colors[0]);
          }
        })
        .catch((err) => console.error("Error fetching task:", err));
    }
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = { title, completed, color };

    const url = taskId
      ? `http://localhost:8080/todos/${taskId}`
      : "http://localhost:8080/todos";
    const method = taskId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    router.push("/");
  };

  return (
    <div className="bg-neutral-900 h-screen  flex justify-center items-center px-4 ">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 w-full h-[calc(100vh-50px)] max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10 rounded-lg flex flex-col items-center "
      >
        <FaArrowLeft
          onClick={() => router.push("/")}
          className="cursor-pointer self-start text-white mb-4"
        />

        <span className="text-sky-500 w-full sm:w-3/4 pb-2">Title</span>
        <input
          type="text"
          placeholder="Ex. Brush your teeth"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full sm:w-3/4 p-2 mb-4 bg-neutral-800 border border-neutral-700 rounded text-white"
        />

        <span className="text-sky-500 w-full sm:w-3/4 pb-2">Color</span>
        <div className="flex w-full sm:w-3/4 space-x-3 mb-4 justify-center">
          {colors.map((c) => (
            <div
              key={c}
              className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                color === c ? "border-white" : "border-gray-600"
              }`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            ></div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full sm:w-3/4 flex items-center justify-center space-x-2 bg-sky-700 px-6 py-3 rounded-lg 
      hover:bg-sky-900 shadow-lg transition-transform duration-300 transform active:scale-95"
        >
          {taskId ? "Save ✔" : "Add Task ⊕"}
          {/* <LuCirclePlus /> */}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

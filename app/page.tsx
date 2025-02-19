"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { useRouter } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  color: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (<>
    <Header />
    <div className="min-h-screen bg-neutral-900 text-white ">
      
      <div className="flex flex-col items-center mt-6">
        {/* <h1 className="text-2xl font-bold mb-4">Todo List</h1> */}
        <button
          onClick={() => router.push("/addTask")}
          className="absolute top-[80px] left-1/2 transform -translate-x-1/2 
             flex items-center space-x-2 bg-sky-700 px-6 py-3 rounded-lg 
             hover:bg-sky-900 shadow-lg "
        >
          <span>Create Task</span> <LuCirclePlus />
        </button>
        
      </div>
      <TaskCard tasks={tasks} setTasks={setTasks} />
    </div>
    </>
  );
}

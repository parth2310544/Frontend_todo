"use client";
import { useParams } from "next/navigation";
import TaskForm from "@/components/Forms";
import Header from "@/components/Header";

export default function EditTask() {
  const { id } = useParams();

  return <>
  <Header/>
  <TaskForm taskId={id as string} />
  </>
  
}
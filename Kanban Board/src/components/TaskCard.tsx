import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types"

interface Props{
    task:Task;
    deleteTask:(id:Id)=>void;
    updateTask:(id:Id,content:string)=>void;
}
function TaskCard({task,deleteTask,updateTask}:Props) {
    const [mouseIsOver,setMouseIsOver]=useState(false);
    const [editMode,setEditMode]=useState(false);

    const toggleEditMode=()=>{
        setEditMode((prev)=>!prev);
       setMouseIsOver(false);
    };
    if(editMode){
        return( <div 
        className="bg-mainBackgroundColor p-2.5 h-[100px] 
        min-h-[100px] items-center flex text-left rounded-xl
        hover:ring-2nhover:ring-inset hover:ring-rose-500
        cursor-grabs relative"
        >
            <textarea className="h-[90%] w-full resize-none border-none rounded bg-transparent
            text-white focus:outline-none"
            value={task.content}
            autoFocus
            placeholder="Task content here"
            onBlur={toggleEditMode}
            onKeyDown={(e)=>{
                if(e.key==='Enter') toggleEditMode();
            }}
            onChange={(e)=>updateTask(task.id,e.target.value)}
            ></textarea>
        </div>
        );
    }
  return (
    <div 
    onClick={toggleEditMode}
    className="bg-mainBackgroundColor p-2.5 h-[100px] 
    min-h-[100px] items-center flex text-left rounded-xl
    hover:ring-2nhover:ring-inset hover:ring-rose-500
    cursor-grabs relative"
    onMouseEnter={()=>{
        setMouseIsOver(true);
    }}
    onMouseLeave={()=>{
        setMouseIsOver(false);
    }}
    >{task.content}
    {mouseIsOver && (
    <button onClick={()=>{deleteTask(task.id)}} 
     className="stoke-white absolute right-4 top-1/2
    -translate-y-1/2 bg-columnBackgroundColor p-2 rounded
    opacity-60 hover:opacity-100
    ">
        <TrashIcon/>
        </button>
    )}
    </div>
  )
}

export default TaskCard;
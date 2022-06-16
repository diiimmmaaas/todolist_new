import React from "react";
import {TaskType} from "../../../../dall/todolists-api";


export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task: React.FC<TaskPropsType> = (
    {
        task,
    }
) => {


    return (
        <div>
            <button>X</button>
            <input type='checkbox'/>
            <span>{task.title}</span>
        </div>
    )
}
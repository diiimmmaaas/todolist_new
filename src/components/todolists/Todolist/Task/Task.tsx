import React, { ChangeEvent } from "react";
import {TaskStatuses, TaskType} from "../../../../dall/todolists-api";


export type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
}

export const Task: React.FC<TaskPropsType> = (
    {
        task,
        todolistId,
        changeTaskStatus
    }
) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }


    return (
        <div>
            <button>X</button>
            <input type='checkbox'
                   checked={task.status === TaskStatuses.Completed}
                   onChange={onChangeHandler}
            />
            <span>{task.title}</span>
        </div>
    )
}
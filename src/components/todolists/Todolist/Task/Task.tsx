import React, {ChangeEvent} from "react";
import {TaskStatuses, TaskType} from "../../../../dall/todolists-api";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";


export type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
}

export const Task: React.FC<TaskPropsType> = (
    {
        task,
        todolistId,
        changeTaskStatus,
        deleteTask,
        changeTaskTitle
    }
) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }

    const onClickHandler = () => {
        deleteTask(todolistId, task.id)
    }

    const onChangeTaskTitle = (newTitle: string) => {
        changeTaskTitle(task.id, newTitle, todolistId)
    }

    return (
        <div>
            <button onClick={onClickHandler}>X</button>
            <input type='checkbox'
                   checked={task.status === TaskStatuses.Completed}
                   onChange={onChangeHandler}
            />
            <EditableSpan title={task.title} onChange={onChangeTaskTitle}/>
            {/*<span>{task.title}</span>*/}
        </div>
    )
}
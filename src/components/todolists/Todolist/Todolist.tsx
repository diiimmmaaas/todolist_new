import React, {useEffect} from "react";
import {setTaskTC} from "../../../bll/taskReducer";
import {Task} from "./Task/Task";
import {TaskType, TodolistType} from "../../../dall/todolists-api";
import {useAppDispatch} from "../../../bll/store";
import styles from './Todolist.module.scss'
import {EditableSpan} from "../../EditableSpan/EditableSpan";


export type TodolistPropsType = {
    tasks: Array<TaskType>
    todolist: TodolistType
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        todolist,
        tasks,
        deleteTodolist,
        changeTodolistTitle
    }
) => {

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(setTaskTC(todolist.id))
    }, [])

    const onClickHandler = () => {
        deleteTodolist(todolist.id)
    }

    const onChangeTodolistTitle = (title: string) => {
        changeTodolistTitle(todolist.id, title)
    }


    return (
        <div className={styles.todolistBlock}>
            <div className="title">
                <EditableSpan title={todolist.title} onChange={onChangeTodolistTitle}/>
                <button onClick={onClickHandler}>X</button>
            </div>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div className='tasks'>
                {tasks.map(t => {
                    return <Task key={t.id} task={t} todolistId={todolist.id}/>
                })}
            </div>
            <div className='buttons'>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
import React, {useEffect} from "react";
import {setTaskTC} from "../../../bll/taskReducer";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../dall/todolists-api";
import {useAppDispatch} from "../../../bll/store";
import styles from './Todolist.module.scss'
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {FilterValuesType, TodolistDomainType} from "../../../bll/todolistsReducer";


export type TodolistPropsType = {
    tasks: Array<TaskType>
    todolist: TodolistDomainType
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeTodolistFilter: (todolistId: string, newFilter: FilterValuesType) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void

}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        todolist,
        tasks,
        deleteTodolist,
        changeTodolistTitle,
        changeTodolistFilter,
        changeTaskStatus
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

    const onAllClickHandler = () => {
        changeTodolistFilter(todolist.id, 'all')
    }
    const onActiveClickHandler = () => {
        changeTodolistFilter(todolist.id, 'active')
    }
    const onCompletedClickHandler = () => {
        changeTodolistFilter(todolist.id, 'completed')
    }

    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
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
                {tasksForTodolist.map(t => {
                    return <Task key={t.id}
                                 task={t}
                                 changeTaskStatus={changeTaskStatus}
                                 todolistId={todolist.id}/>
                })}
            </div>
            <div className='buttons'>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
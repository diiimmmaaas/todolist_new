import React, {useEffect} from "react";
import {addTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from "../../bll/taskReducer";
import styles from './TodolistsList.module.scss'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../bll/store";
import {Todolist} from "./Todolist/Todolist";
import {
    addTodolistsTC, changeTodoFilterAC,
    changeTodolistsTC,
    deleteTodolistsTC, FilterValuesType,
    setTodolistsTC,
    TodolistDomainType
} from "../../bll/todolistsReducer";
import {AddItemForm} from "./addItemForm/AddItemForm";
import {TaskStatuses} from "../../dall/todolists-api";
import { Navigate } from "react-router-dom";


export type TodolistsPropsType = {}

export const TodolistsList: React.FC<TodolistsPropsType> = (
    {}
) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>( state => state.auth.isLoggedIn)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(setTodolistsTC())
    }, [])

    const addTodolist = (title: string) => {
        dispatch(addTodolistsTC(title))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistsTC(todolistId))
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistsTC(todolistId, newTitle))
    }

    const changeTodolistFilter = (todolistId: string, newFilter: FilterValuesType) => {
        dispatch(changeTodoFilterAC(todolistId, newFilter))
    }

    const changeTaskStatus = (id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(id, {status}, todolistId))
    }

    const addTask = (todolistId: string, taskTitle: string) => {
        dispatch(addTaskTC(todolistId, taskTitle))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.todolistContainer}>
            <AddItemForm addItem={addTodolist}/>
            <div className={styles.todolistsList}>
                {todolists.map(tl => {
                    return <Todolist key={tl.id}
                                     todolist={tl}
                                     tasks={tasks[tl.id]}
                                     deleteTodolist={deleteTodolist}
                                     changeTodolistTitle={changeTodolistTitle}
                                     changeTodolistFilter={changeTodolistFilter}
                                     changeTaskStatus={changeTaskStatus}
                                     changeTaskTitle={changeTaskTitle}
                                     addTask={addTask}
                                     deleteTask={deleteTask}
                    />

                })}
            </div>

        </div>
    )
}
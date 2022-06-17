import React, {useEffect} from "react";
import {TasksStateType} from "../../bll/taskReducer";
import styles from './TodolistsList.module.scss'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../bll/store";
import {TodolistType} from "../../dall/todolists-api";
import {Todolist} from "./Todolist/Todolist";
import {
    addTodoAC,
    addTodolistsTC,
    changeTodolistsTC,
    deleteTodolistsTC,
    setTodolistsTC
} from "../../bll/todolistsReducer";
import {AddItemForm} from "./addItemForm/AddItemForm";


export type TodolistsPropsType = {}

export const TodolistsList: React.FC<TodolistsPropsType> = (
    {}
) => {

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
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
                    />

                })}
            </div>

        </div>
    )
}
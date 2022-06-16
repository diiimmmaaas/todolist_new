import React, {useEffect} from "react";
import {TasksStateType} from "../../bll/taskReducer";
import styles from './TodolistsList.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import { TodolistType} from "../../dall/todolists-api";
import {Todolist} from "./Todolist/Todolist";
import { setTodolistsTC } from "../../bll/todolistsReducer";


export type TodolistsPropsType = {}

export const TodolistsList: React.FC<TodolistsPropsType> = (
    {}
) => {

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(setTodolistsTC())
    }, [])

    return (
        <div className={styles.todolistContainer}>
            <div className={styles.addItemForm}>
                <input type="text"/>
                <button>+</button>
            </div>
            <div>
                {todolists.map(tl => {
                    return <div key={tl.id}>
                        <Todolist todolist={tl}
                                  tasks={tasks[tl.id]}
                        />
                    </div>
                })}
            </div>

        </div>
    )
}
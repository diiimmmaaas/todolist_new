import React, {useEffect} from "react";
import {TasksStateType, updateTaskTC} from "../../bll/taskReducer";
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
import { TaskStatuses } from "../../dall/todolists-api";


export type TodolistsPropsType = {}

export const TodolistsList: React.FC<TodolistsPropsType> = (
    {}
) => {

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
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

    const changeTodolistFilter = (todolistId: string, newFilter: FilterValuesType) => {
        dispatch(changeTodoFilterAC(todolistId, newFilter))
    }

    const changeTaskStatus = (id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(id, {status}, todolistId))
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
                    />

                })}
            </div>

        </div>
    )
}
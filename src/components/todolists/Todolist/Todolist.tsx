import React, {useEffect} from "react";
import {setTaskTC} from "../../../bll/taskReducer";
import {Task} from "./Task/Task";
import {TaskType, TodolistType} from "../../../dall/todolists-api";
import {useDispatch} from "react-redux";


export type TodolistPropsType = {
    tasks: Array<TaskType>
    todolist: TodolistType
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        todolist,
        tasks,
    }
) => {

    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(setTaskTC(todolist.id))
    }, [])

    return (
        <>
            <div className="title">
                <h3>{todolist.title}</h3>
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
        </>
    )
}
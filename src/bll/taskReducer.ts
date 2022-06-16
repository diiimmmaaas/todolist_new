import {GET_TODOLISTS, GetTodoActionType} from "./todolistsReducer";
import {TaskType, todolistsAPI} from "../dall/todolists-api";
import {Dispatch} from "redux";

const DELETE_TASK = 'todolist/tasks/DELETE_TASK'
const SET_TASK = 'todolist/tasks/SET_TASK'


export type ActionType = DeleteTaskActionType | SetTaskActionType | GetTodoActionType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case SET_TASK:
            return {...state, [action.todolistId]: action.tasks}
        case GET_TODOLISTS: {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case DELETE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        default:
            return state
    }
}

export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type SetTaskActionType = ReturnType<typeof setTaskAC>

export const deleteTaskAC = (todolistId: string, taskId: string) => ({type: DELETE_TASK, todolistId, taskId} as const)
export const setTaskAC = (tasks: Array<TaskType>, todolistId: string) => ({type: SET_TASK, tasks, todolistId} as const)

// thunk
export const setTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTaskAC(res.data.items, todolistId))
            })
    }
}
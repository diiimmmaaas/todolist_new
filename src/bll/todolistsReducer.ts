import {todolistsAPI, TodolistType} from "../dall/todolists-api"
import {Dispatch} from "redux";

export const GET_TODOLISTS = 'todolist/todolists/GET_TODOLISTS'


export type ActionType = GetTodoActionType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case GET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        default:
            return state
    }
}

export type GetTodoActionType = ReturnType<typeof getTodoAC>

export const getTodoAC = (todolists: Array<TodolistType>) => ({type: GET_TODOLISTS, todolists} as const)


// thunk
export const setTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodo()
            .then((res) => {
                dispatch(getTodoAC(res.data))
            })
    }
}
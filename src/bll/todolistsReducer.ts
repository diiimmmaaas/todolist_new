import {todolistsAPI, TodolistType} from "../dall/todolists-api"
import {Dispatch} from "redux";

export const GET_TODOLISTS = 'todolist/todolists/GET_TODOLISTS'
export const ADD_TODOLISTS = 'todolist/todolists/ADD_TODOLISTS'
export const DELETE_TODOLISTS = 'todolist/todolists/DELETE_TODOLISTS'
export const CHANGE_TODOLISTS = 'todolist/todolists/CHANGE_TODOLISTS'

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ActionType = GetTodoActionType
    | AddTodoActionType
    | DeleteTodoActionType
    | ChangeTodoActionType

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case GET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case ADD_TODOLISTS:
            return [{...action.newTodo, filter: 'all', entityStatus: 'idle'}, ...state]
        case DELETE_TODOLISTS:
            return state.filter(todo => todo.id !== action.todolistId)
        case CHANGE_TODOLISTS:
            return state.map( todo => todo.id === action.todolistId ? {...todo, title: action.title} : todo )
        default:
            return state
    }
}

export type GetTodoActionType = ReturnType<typeof getTodoAC>
export type AddTodoActionType = ReturnType<typeof addTodoAC>
export type DeleteTodoActionType = ReturnType<typeof deleteTodoAC>
export type ChangeTodoActionType = ReturnType<typeof changeTodoAC>

export const getTodoAC = (todolists: Array<TodolistType>) => ({type: GET_TODOLISTS, todolists} as const)
export const addTodoAC = (newTodo: TodolistType) => ({type: ADD_TODOLISTS, newTodo} as const)
export const deleteTodoAC = (todolistId: string) => ({type: DELETE_TODOLISTS, todolistId} as const)
export const changeTodoAC = (todolistId: string, title: string) => ({
    type: CHANGE_TODOLISTS,
    todolistId,
    title
} as const)


// thunk
export const setTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodo()
            .then((res) => {
                dispatch(getTodoAC(res.data))
            })
    }
}

export const addTodolistsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.addTodo(title)
            .then((res) => {
                dispatch(addTodoAC(res.data.data.item))
            })
    }
}

export const deleteTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodo(todolistId)
            .then((res) => {
                dispatch(deleteTodoAC(todolistId))
            })
    }
}

export const changeTodolistsTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.changeTodo(todolistId, title)
            .then((res) => {
                dispatch(changeTodoAC(todolistId, title))
            })
    }
}

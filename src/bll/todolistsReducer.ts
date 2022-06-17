import {todolistsAPI, TodolistType} from "../dall/todolists-api"
import {Dispatch} from "redux";

export const GET_TODOLISTS = 'todolist/todolists/GET_TODOLISTS'
export const ADD_TODOLIST = 'todolist/todolists/ADD_TODOLIST'
export const DELETE_TODOLIST = 'todolist/todolists/DELETE_TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'todolist/todolists/CHANGE_TODOLIST_TITLE'
export const CHANGE_TODOLIST_FILTER = 'todolist/todolists/CHANGE_TODOLIST_FILTER'

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ActionType = GetTodoActionType
    | AddTodoActionType
    | DeleteTodoActionType
    | ChangeTodoTitleActionType
    | ChangeTodoFilterActionType


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case GET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case ADD_TODOLIST:
            return [{...action.newTodo, filter: 'all', entityStatus: 'idle'}, ...state]
        case DELETE_TODOLIST:
            return state.filter(todo => todo.id !== action.todolistId)
        case CHANGE_TODOLIST_TITLE:
            return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title} : todo)
        case CHANGE_TODOLIST_FILTER:
            return state.map( todo => todo.id === action.todolistId ? {...todo, filter: action.filter} : todo )
        default:
            return state
    }
}

export type GetTodoActionType = ReturnType<typeof getTodoAC>
export type AddTodoActionType = ReturnType<typeof addTodoAC>
export type DeleteTodoActionType = ReturnType<typeof deleteTodoAC>
export type ChangeTodoTitleActionType = ReturnType<typeof changeTodoTitleAC>
export type ChangeTodoFilterActionType = ReturnType<typeof changeTodoFilterAC>


export const getTodoAC = (todolists: Array<TodolistType>) => ({type: GET_TODOLISTS, todolists} as const)
export const addTodoAC = (newTodo: TodolistType) => ({type: ADD_TODOLIST, newTodo} as const)
export const deleteTodoAC = (todolistId: string) => ({type: DELETE_TODOLIST, todolistId} as const)
export const changeTodoTitleAC = (todolistId: string, title: string) => ({
    type: CHANGE_TODOLIST_TITLE,
    todolistId,
    title
} as const)
export const changeTodoFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    type: CHANGE_TODOLIST_FILTER,
    todolistId,
    filter
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
                dispatch(changeTodoTitleAC(todolistId, title))
            })
    }
}

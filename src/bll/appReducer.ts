import {Dispatch} from "redux";
import {authAPI} from "../dall/todolists-api";
import {setIsLoggedInAC} from "./authReducer";

export const SET_INITIALIZED = 'todolists/app/SET_INITIALIZED'


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export type ActionType = SetInitializedActionType

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export type SetInitializedActionType = ReturnType<typeof setInitializedAC>

export const setInitializedAC = (isInitialized: boolean) => ({type: SET_INITIALIZED, isInitialized} as const)


// thunk
export const setInitializedTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then( (res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setInitializedAC(true))

                } else {

                }
            } )
    }
}
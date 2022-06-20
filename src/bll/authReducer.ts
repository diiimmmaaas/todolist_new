import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../dall/todolists-api";

export const IS_LOGGEN_IN = 'todolists/auth/IS_LOGGEN_IN'

export type InitialStateType = typeof initialState
export type ActionsType = SetIsLoggenInActionType

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case IS_LOGGEN_IN:
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export type SetIsLoggenInActionType = ReturnType<typeof setIsLoggedInAC>

export const setIsLoggedInAC = (value: boolean) => ({type: IS_LOGGEN_IN, value} as const)

// thunk
export const LoginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        authAPI.login(data)
            .then((res) => {
                dispatch(setIsLoggedInAC(true))
            })
    }
}

export const LogoutTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.logout()
            .then((res) => {
                dispatch(setIsLoggedInAC(false))
            })
    }
}
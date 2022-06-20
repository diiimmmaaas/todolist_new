import {AnyAction, applyMiddleware, combineReducers} from "redux";
import thunk, { ThunkDispatch } from 'redux-thunk'
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";
import { tasksReducer } from "./taskReducer";
import { todolistsReducer } from "./todolistsReducer";
import { legacy_createStore as createStore} from 'redux'
import {useDispatch} from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppThunkType = ThunkDispatch<AppRootStateType, void, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkType>()
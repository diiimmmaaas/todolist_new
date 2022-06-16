import {applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk'
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";
import { tasksReducer } from "./taskReducer";
import { todolistsReducer } from "./todolistsReducer";
import { legacy_createStore as createStore} from 'redux'


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    // app: appReducer,
    // auth: authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));
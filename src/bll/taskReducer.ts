import {ADD_TODOLIST, AddTodoActionType, GET_TODOLISTS, GetTodoActionType} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../dall/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {debug} from "util";

const DELETE_TASK = 'todolist/tasks/DELETE_TASK'
const SET_TASK = 'todolist/tasks/SET_TASK'
const UPDATE_TASK = 'todolist/tasks/UPDATE_TASK'
const ADD_TASK = 'todolist/tasks/ADD_TASK'


export type ActionType = DeleteTaskActionType
    | SetTaskActionType
    | GetTodoActionType
    | AddTodoActionType
    | UpdateTaskActionType
    | AddTaskActionType

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
        case ADD_TODOLIST:
            return {...state, [action.newTodo.id]: []}
        case DELETE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case UPDATE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case ADD_TASK:
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        default:
            return state
    }
}

export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type SetTaskActionType = ReturnType<typeof setTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>

export const deleteTaskAC = (todolistId: string, taskId: string) => ({type: DELETE_TASK, todolistId, taskId} as const)
export const setTaskAC = (tasks: Array<TaskType>, todolistId: string) => ({type: SET_TASK, tasks, todolistId} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: UPDATE_TASK,
    model,
    todolistId,
    taskId
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: ADD_TASK,
    task
} as const)

// thunk
export const setTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTaskAC(res.data.items, todolistId))
            })
    }
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.addTask(todolistId, title)
            .then((res) => {
                debugger
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}


export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(deleteTaskAC(todolistId, taskId))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


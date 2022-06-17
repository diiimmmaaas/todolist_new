import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '7cffbd42-f90e-47ce-a60b-e74b78a84e14'
    }
})

export const todolistsAPI = {
    getTodo() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    addTodo(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    changeTodo(todolistId: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>( `todo-lists/${todolistId}`, {title} )
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}


export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
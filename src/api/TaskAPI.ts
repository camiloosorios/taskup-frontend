import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Task, TaskFormData, taskSchema } from "../types";

type TaskApi = {
    projectId : string,
    formData : TaskFormData,
    taskId : Task['id'],
    status : Task['status']
}

export async function createTask({ projectId, formData} : Pick<TaskApi, 'projectId' | 'formData'>) {
    try {
        const { data } = await api.post<string>(`/projects/${projectId}/tasks`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getTaskById({ projectId, taskId} : Pick<TaskApi, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.get(url);
        const response = taskSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateTask({ projectId, taskId, formData} : Pick<TaskApi, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.put<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteTask({ projectId, taskId} : Pick<TaskApi, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateTaskStatus({ projectId, taskId, status} : Pick<TaskApi, 'projectId' | 'taskId' | 'status'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`;
        const { data } = await api.post<string>(url, {status});
        const response = taskSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
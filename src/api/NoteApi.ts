import api from "@/lib/axios";
import { Note, NoteFormData } from "../types";
import { isAxiosError } from "axios";

type NoteApiType = {
    formData: NoteFormData,
    projectId: string,
    taskId: string,
    noteId: Note['id'],
}

export async function createNote({formData, projectId, taskId} : Pick<NoteApiType, 'formData' | 'projectId' | 'taskId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteNote({projectId, taskId, noteId} : Pick<NoteApiType, 'projectId' | 'taskId' |'noteId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
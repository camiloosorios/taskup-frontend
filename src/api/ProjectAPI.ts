import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, ProjectFormData, dashboardProjectSchema, editProjectSchema, projectSchema } from "@/types/index";

export async function createProject(formData : ProjectFormData) {

    try {
        const { data } = await api.post('/projects', formData);
        return data;
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export async function getProjects() {
    try {
        const { data } = await api.get('/projects');
        const response = dashboardProjectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectById(projectId : Project['id']) {
    try {
        const { data } = await api.get(`/projects/${projectId}`);
        const response = editProjectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getFullProject(projectId : Project['id']) {
    try {
        const { data } = await api.get(`/projects/${projectId}`);
        const response = projectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type updateProjectType = {
    projectId : Project['id'],
    formData : ProjectFormData,
}

export async function updateProject({ projectId, formData} : updateProjectType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteProject(projectId : Project['id']) {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}`);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
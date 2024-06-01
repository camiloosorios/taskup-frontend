import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, TeamMember, TeamMemberForm, teamMembersSchema } from "../types";

export async function findUserByEmail({ projectId, formData } : { projectId : Project['id'], formData : TeamMemberForm}) {
    try {
        const url = `/projects/${projectId}/team/find`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function addMemberToProject({ projectId, id} : { projectId : Project['id'], id : TeamMember['id']}) {
    try {
        const url = `/projects/${projectId}/team`;
        const { data } = await api.post<string>(url, { id });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectTeam(projectId : Project['id']) {
    try {
        const url = `/projects/${projectId}/team`;
        const { data } = await api(url);
        const response = teamMembersSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function removeUserfromProject({ projectId, userId } : { projectId : Project['id'], userId : TeamMember['id'] }) {
    try {
        const url = `/projects/${projectId}/team/${userId}`;
        const { data } = await api.delete<string>(url);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
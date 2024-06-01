import { addMemberToProject } from "@/api/TeamApi";
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    user: TeamMember
}

export default function SearchResult({ user }: SearchResultProps) {

    const params = useParams();
    const projectId = params.projectId!;
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: addMemberToProject,
        onError: (err) => {
            toast.error(err.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
            navigate(`/projects/${projectId}/team`);
        }
    });

    const handleAddUserToProject = () => {
        const data = {
            projectId: projectId,
            id: user.id
        }

        mutate(data);
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado : </p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                    onClick={handleAddUserToProject}
                >
                    Agregar al Proyecto
                </button>
            </div>
        </>
    )
}

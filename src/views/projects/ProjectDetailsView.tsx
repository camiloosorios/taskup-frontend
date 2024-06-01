import { getFullProject } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

export default function ProjectDetailsView() {

    const { projectId } = useParams();
    const navigate = useNavigate();

    const { data : user, isLoading : authLoading } = useAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectId', projectId],
        queryFn: () => getFullProject(projectId!),
        retry: false
    });

    const canEdit = useMemo(() => user?.id === data?.manager, [data, user]);

    if (isError) return <Navigate to="/404"/>
    if (isLoading && authLoading) return 'Cargando...';
    if (data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
            {isManager(data.manager, user.id) &&
                <nav className="my-5 flex gap-3">
                    <button 
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate('?newTask=true')}
                    >
                        Agregar Tarea
                    </button>
                    <Link 
                        to="team"
                        className="bg-purple-600 hover:bg-purple-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    >
                            Colaboradores
                    </Link>
                </nav>
            }
            <TaskList
                tasks={data.tasks}
                canEdit={canEdit}
            />
            <AddTaskModal/>
            <EditTaskData/>
            <TaskModalDetails/>
        </>
    )
}

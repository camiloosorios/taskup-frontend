import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import ProjectForm from "@/components/projects/ProjectForm";

export default function CreateProjectView() {

    const initialValues : ProjectFormData = {
        projectName: '',
        clientName: '',
        description: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (message) => {
            toast.success(message);
            navigate("/");
        }
    });

    const handleForm = (data : ProjectFormData) => mutate(data);

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>
                <nav className="my-6">
                    <Link
                        className="bg-purple-400 gover:bg-pruple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to='/'
                    >Volver a Proyectos</Link>
                </nav>
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input
                        type="submit"
                        value="Crear Proyecto"
                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
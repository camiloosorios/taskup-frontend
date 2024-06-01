import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
        <div className="bg-gray-800 min-h-screen">
            <div className="py-10 lg:py-20 mx-auto w-[450px]">
                <Logo/>
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
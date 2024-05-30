import { Button } from "./ui/button";
import {useAuth} from "@/context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {GetDecodedToken} from "@/helpers/Helpers.tsx";

export function Hero() {
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();
  const handleBrowseClick = () => {
    if(isLoggedIn()){
      const token = GetDecodedToken();
      token.role === "Admin" ? navigate("/admin/profs") : navigate("/user/profs") ;
    }
    else
      navigate("/login");
  }
  return (
      <section className="relative flex justify-center px-10 py-20 md:py-24 gap-10">
        <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className='absolute right-[45%] bottom-[60%] transform translate-x-1/4 translate-y-1/4 bg-gradient-to-r from-[#0781ff] to-[#4d07ff] w-80 aspect-square z-10 rounded-full blur-4xl opacity-20'></div>
          <div className="flex flex-col justify-center items-center text-center lg:text-start space-y-6 z-20">
          <main className="flex flex-col gap-y-2 items-center text-5xl md:text-6xl font-bold">
            <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#637ef7]  to-[#5070FF] text-transparent bg-clip-text">
              Examify
            </span>{" "}
              Schedule your
            </h1>
            <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#df1168]  to-[#e70f80] text-transparent bg-clip-text">
              Exams
            </span>{" "}
              Easily
            </h2>
          </main>

          <p className="text-center text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Simplify exam scheduling, manage rooms and personnel efficiently, and access detailed reports with Examify.
          </p>
            <Button onClick={handleBrowseClick} className="mt-4 space-x-1">
              <span>Explore more</span>
              <svg className="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m9 5 7 7-7 7"/>
              </svg>

            </Button>
          </div>
      </section>
  );
}

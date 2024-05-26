import { HeartFilledIcon } from "@radix-ui/react-icons";
import logoImageDark from "@/assets/images/logoExamifyTypoLight.png"
import logoImageLight from "@/assets/images/logoExamifyTypoDark.png"

export function Footer() {
  return (
      <footer id="footer" className="relative">
        <hr className="w-full"/>
        <section className="container flex flex-col md:flex-row justify-center items-center gap-x-4 py-12">
          <div className="col-span-full xl:col-span-2">
            <a href="/" className="ml-2 font-bold text-xl flex">
              <div className="bg-transparent">
                <img
                    src={logoImageDark}
                    alt="Image"
                    className="dark:hidden w-[150px] object-cover"
                />
                <img
                    src={logoImageLight}
                    alt="Image"
                    className="hidden dark:block w-[150px] object-cover"
                />
              </div>
            </a>
          </div>
          <section className="text-center">
            <h3>
              &copy; 2024 Exams Scheduler Platform made with {""}
              <span className="relative top-[-2px]">
            <HeartFilledIcon className="w-4 h-4 inline-block"/>
          </span>
            </h3>
          </section>
        </section>
      </footer>
  );
}

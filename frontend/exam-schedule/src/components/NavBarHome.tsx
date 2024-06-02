import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {cn} from "@/lib/utils.ts";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import LogoDark from "@/assets/images/logoExamifyTypoDark.png"
import LogoLight from "@/assets/images/logoExamifyTypoLight.png"
import {useAuth} from "@/context/AuthContext.tsx";
import {GetDecodedToken} from "@/helpers/Helpers.tsx";

interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: "#formation",
        label: "Formation",
    },
    {
        href: "#about",
        label: "About",
    },
    {
        href: "#team",
        label: "Team",
    },
];

export function NavBarHome() {
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handelClick = () => {
        if(isLoggedIn()) {
            const decodedToken = GetDecodedToken();
            decodedToken.role === "Admin" ? navigate("/admin/profs") : navigate("/user/profs");
        }
    }
    return (
        <header className="sticky top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
                    <NavigationMenuItem className="font-bold flex">
                        <a href="/" className="ml-2 font-bold text-xl flex">
                            <div>
                                <img
                                    src={LogoLight}
                                    alt="Image"
                                    className="dark:hidden w-[150px] object-cover"
                                />
                                <img
                                    src={LogoDark}
                                    alt="Image"
                                    className="hidden dark:block w-[150px] object-cover"
                                />
                            </div>
                        </a>
                    </NavigationMenuItem>

                    {/* mobile */}
                    <span className="flex md:hidden">
            <ModeToggle/>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                    className="flex md:hidden h-5 w-5"
                    onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                      <img
                          src={LogoLight}
                          alt="Image"
                          className="dark:hidden w-[150px] object-cover"
                      />
                    <img
                        src={LogoDark}
                        alt="Image"
                        className="hidden dark:block w-[150px] object-cover"
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({href, label}: RouteProps) => (
                      <a
                          key={label}
                          href={href}
                          onClick={() => setIsOpen(false)}
                          className={cn(buttonVariants({  }), "w-full bg-transparent transition-colors")}
                      >
                          {label}
                      </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </span>
                    <div className="flex gap-x-8 hidden md:flex gap-2">
                        {/* desktop */}
                        <nav className="hidden md:flex gap-2">
                            {routeList.map((route: RouteProps) => (
                                <a
                                    href={route.href}
                                    key={route.href}
                                    className={`text-[17px] text-gray-600 hover:bg-transparent hover:text-gray-800 ${buttonVariants({
                                        variant: "ghost",
                                    })}`}
                                >
                                    {route.label}
                                </a>
                            ))}
                        </nav>
                        <div className={"flex gap-x-4"}>
                            <ModeToggle />
                            {!isLoggedIn() ?
                            <Button onClick={() => navigate('/login')}>
                                <span rel="noreferrer noopener" onClick={() => navigate("/login")}>
                                    Sign In
                                </span>
                            </Button> :
                                <Button onClick={() => handelClick()}
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <img
                                    src="@/assets/images/placeholder-user.png"
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                />
                            </Button>}
                        </div>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}
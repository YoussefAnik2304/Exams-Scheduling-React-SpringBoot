import "./App.css";
import {UserProvider} from "@/context/AuthContext.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {Outlet} from "react-router-dom";
import {ProfsProvider} from "@/context/ProfsContext.tsx";
import {CoursesProvider} from "@/context/CourseContext.tsx";
// import {AccountsProvider} from "@/context/UsersContext.tsx";

function App() {
  return (
      <UserProvider>
          {/*<AccountsProvider>*/}
                  <ProfsProvider>
                      <CoursesProvider>
                          <Outlet/>
                          <Toaster/>
                      </CoursesProvider>
                  </ProfsProvider>
          {/*</AccountsProvider>*/}
      </UserProvider>
  );
}

export default App;

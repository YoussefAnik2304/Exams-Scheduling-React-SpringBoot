import "./App.css";
import {UserProvider} from "@/context/AuthContext.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {Outlet} from "react-router-dom";
import {ProfsProvider} from "@/context/ProfsContext.tsx";
import {CoursesProvider} from "@/context/CourseContext.tsx";
import {GroupsProvider} from "@/context/GroupContext.tsx";
// import {AccountsProvider} from "@/context/UsersContext.tsx";

function App() {
  return (
      <UserProvider>
          <GroupsProvider>
                  <ProfsProvider>
                      <CoursesProvider>
                          <Outlet/>
                          <Toaster/>
                      </CoursesProvider>
                  </ProfsProvider>
          </GroupsProvider>
      </UserProvider>
  );
}

export default App;

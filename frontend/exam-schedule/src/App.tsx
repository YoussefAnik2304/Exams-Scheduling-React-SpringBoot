import "./App.css";
import {UserProvider} from "@/context/AuthContext.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {Outlet} from "react-router-dom";
import {EventsProvider} from "@/context/EventsContext.tsx";
import {PartnersProvider} from "@/context/PartnersContext.tsx";
import {AccountsProvider} from "@/context/UsersContext.tsx";
import {SubscriptionsProvider} from "@/context/SubscriptionsContext.tsx";

function App() {
  return (
      <UserProvider>
          <AccountsProvider>
              <SubscriptionsProvider>
                  <EventsProvider>
                      <PartnersProvider>
                          <Outlet/>
                          <Toaster/>
                      </PartnersProvider>
                  </EventsProvider>
              </SubscriptionsProvider>
          </AccountsProvider>
      </UserProvider>
  );
}

export default App;

import { Switch, Route, Router as WouterRouter } from "wouter";
import Landing from "@/pages/Landing";
import ThankYou from "@/pages/ThankYou";
import WebinarRegistration from "@/pages/WebinarRegistration";
import WebinarThankYou from "@/pages/WebinarThankYou";
import WebinarReplay from "@/pages/WebinarReplay";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WebinarRegistration} />
      <Route path="/tack" component={WebinarThankYou} />
      <Route path="/inspelning" component={WebinarReplay} />
      <Route path="/replay" component={WebinarReplay} />
      <Route path="/sales" component={Landing} />
      <Route path="/sales/tack" component={ThankYou} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;

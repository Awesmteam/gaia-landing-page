import { Switch, Route, Router as WouterRouter } from "wouter";
import Landing from "@/pages/Landing";
import ThankYou from "@/pages/ThankYou";
import WebinarRegistration from "@/pages/WebinarRegistration";
import WebinarThankYou from "@/pages/WebinarThankYou";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/tack" component={ThankYou} />
      <Route path="/webinar" component={WebinarRegistration} />
      <Route path="/webinar/tack" component={WebinarThankYou} />
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

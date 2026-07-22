import { Switch, Route, Router as WouterRouter } from "wouter";
import Landing from "@/pages/Landing";
import ThankYou from "@/pages/ThankYou";
import WebinarRegistration from "@/pages/WebinarRegistration";
import WebinarThankYou from "@/pages/WebinarThankYou";
import WebinarReplay from "@/pages/WebinarReplay";
import Checkout from "@/pages/Checkout";
import Emails from "@/pages/Emails";
import PodcastPage from "@/pages/PodcastPage";
import VideoPage from "@/pages/VideoPage";
import BlogPage from "@/pages/BlogPage";
import TestimonialPage from "@/pages/TestimonialPage";
import TestNow from "@/pages/TestNow";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WebinarRegistration} />
      <Route path="/tack" component={WebinarThankYou} />
      <Route path="/inspelning" component={WebinarReplay} />
      <Route path="/replay" component={WebinarReplay} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/emails" component={Emails} />
      <Route path="/podcast" component={PodcastPage} />
      <Route path="/video" component={VideoPage} />
      <Route path="/blogg" component={BlogPage} />
      <Route path="/testimonial" component={TestimonialPage} />
      <Route path="/test-now" component={TestNow} />
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

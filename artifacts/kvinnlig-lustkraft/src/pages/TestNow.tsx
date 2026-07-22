import { useLocation } from "wouter";
import { RegistrationPopup } from "@/components/RegistrationPopup";

// Test page: registers against the WebinarFuel "just-in-time" session and
// sends the registrant straight into the webinar room via their goto_now link.
export default function TestNow() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <RegistrationPopup open onClose={() => navigate("/")} testNow />
    </div>
  );
}

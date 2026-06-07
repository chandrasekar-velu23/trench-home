import type { Metadata } from "next";
import IntegrationsClient from "./IntegrationsClient";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Agentless, API-native integrations across your entire security stack. Trench connects to your tools in minutes — no agents, no friction.",
  alternates: {
    canonical: "https://www.trenchsecurity.ai/integrations",
  },
};

export default function IntegrationsPage() {
  return <IntegrationsClient />;
}

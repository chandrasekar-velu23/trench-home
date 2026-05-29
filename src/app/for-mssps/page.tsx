import type { Metadata } from "next";
import ForMSSPsClient from "./ForMSSPsClient";

export const metadata: Metadata = {
  title: "MSSPs | Trench Security",
  description: "Offer your clients the new operating system for Security Operations. Co-sell Trench and deliver Headless SecOps to every client, without rebuilding your delivery model.",
  alternates: {
    canonical: "https://www.trenchsecurity.ai/for-mssps",
  },
};

export default function ForMSSPsPage() {
  return <ForMSSPsClient />;
}

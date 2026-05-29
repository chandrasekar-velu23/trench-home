import type { Metadata } from "next";
import ConnectClient from "./ConnectClient";

export const metadata: Metadata = {
  title: "Connect | Trench Security",
  description: "You cannot run a modern security operation on a legacy system. Let us show you what the new operating system looks like for your stack.",
  alternates: {
    canonical: "https://www.trenchsecurity.ai/connect",
  },
};

export default function ConnectPage() {
  return <ConnectClient />;
}

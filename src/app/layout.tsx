import GithubCorner from "@/components/github-corner/GithubCorner";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import ClientLayout from "./ClientLayout";
import "./global.css";

export const metadata = {
  title: "NextGram",
  description:
    "A sample Next.js app showing dynamic routing with modals as a route.",
  metadataBase: new URL("https://nextgram.vercel.app"),
};

export default function Layout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <header>
          <nav className="flex gap-4 px-10 flex-wrap justify-center items-center h-10">
            <Link href="/">Home</Link>
            <Link href="/demo">Demo</Link>
          </nav>
        </header>
        <GithubCorner />
        <ClientLayout {...props} />
        <Analytics />
      </body>
    </html>
  );
}

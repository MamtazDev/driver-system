import Head from "next/head";
import Sidebar from "@/components/sidebar/Sidebar";
import "../globals.scss";
import TopBar from "@/components/TopBar/TopBar";

export const metadata = {
  title: {
    template: "%s | Car rental",
    default: "Car rental",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <Sidebar />
        <div className="w-full">
          <div className="w-full">
            <TopBar />
          </div>

          <div className="mt-[100px]">{children}</div>
        </div>
      </body>
    </html>
  );
}

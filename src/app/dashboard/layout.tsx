import Sidebar from "@/components/sidebar/Sidebar";
import "../globals.scss";
import TopBar from "@/components/TopBar/TopBar";

export const metadata = {
  title: {
    template: "%s | Truck Authorization System",
    default: "Admin",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body>
        <Sidebar />
        <div className="lg:ms-[296px] ms-[50px] w-full">
          <div className="w-full">
            <TopBar />
          </div>
          <div className="mt-[100px] bg-[]  ">{children}</div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
      </body>
    </html>
  );
}

import Sidebar from "@/components/sidebar/Sidebar";
import "../globals.scss";
import TopBar from "@/components/TopBar/TopBar";
import { DriverProvider } from '../../hooks/driverContext'
import { TruckProvider } from "@/hooks/truckContext";
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
      <TruckProvider>
        <DriverProvider>
          <body>
            <Sidebar />
            <div className="lg:ms-[296px] ms-[50px] w-full">
              <div className="w-full">
                <TopBar />
              </div>
              <div className="mt-[100px]">{children}</div>
            </div>
          </body>
        </DriverProvider>
      </TruckProvider>
    </html>
  );
}

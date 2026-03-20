import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className="min-h-screen bg-[#04080f]">
      <div className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 bg-[#0a0a0f] border-r border-white/5">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72 min-h-screen bg-[#04080f]">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
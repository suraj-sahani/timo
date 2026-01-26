import AdminAppProvider from "@/providers/admin-app-provider";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAppProvider>
      <div className="flex flex-col min-h-screen bg-linear-to-br from-amber-50/50 via-orange-50/30 to-white">
        {/* <AdminHeader /> */}
        <main className="flex-1">{children}</main>
      </div>
    </AdminAppProvider>
  );
}

export default AdminLayout;

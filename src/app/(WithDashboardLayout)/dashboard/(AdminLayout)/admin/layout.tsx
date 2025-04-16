const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen">{children}</div>
    </>
  );
};

export default AdminDashboardLayout;

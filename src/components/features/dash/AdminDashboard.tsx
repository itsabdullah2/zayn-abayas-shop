import DashboardNavbar from "./DashboardNavbar";

const AdminDashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <section className="section-container">
        <h2 className="text-xl font-medium text-primary">
          لوحة التحكم المسؤول
        </h2>
        <div className="flex flex-col gap-8 mt-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="border border-gray-400 py-3 px-5 rounded-lg min-h-20" />
            <div className="border border-gray-400 py-3 px-5 rounded-lg min-h-20" />
            <div className="border border-gray-400 py-3 px-5 rounded-lg min-h-20" />
            <div className="border border-gray-400 py-3 px-5 rounded-lg min-h-20" />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="border border-gray-400 py-3 px-5 rounded-lg min-h-20" />
            <div className="border border-gray-400 py-3 px-5 rounded-lg min-h-20" />
            <div className="border border-gray-400 py-3 px-5 rounded-lg min-h-20" />
          </div>
          <div className="border border-gray-400 py-3 px-5 rounded-lg min-h-20" />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;

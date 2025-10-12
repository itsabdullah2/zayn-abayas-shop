import DashboardAnalytics from "./DashboardAnalytics";
import DashboardNavbar from "./DashboardNavbar";
import DashboardUpperBoxes from "./DashboardUpperBoxes";

const AdminDashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <section className="section-container">
        <h2 className="text-xl font-medium text-primary">لوحة تحكم المسؤول</h2>
        <div className="flex flex-col gap-8 mt-10">
          <DashboardUpperBoxes />
          <DashboardAnalytics />
          <div className="border border-gray-400 py-3 px-5 rounded-lg min-h-20" />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;

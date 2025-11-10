import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex-1 flex-center">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-medium text-primary">
          هذه الصفخة ليست متاحة الأن
        </h1>

        <Link
          to="/"
          className="py-2 px-5 relative group overflow-hidden primary-btn rounded-none! w-fit mt-2 shadow-lg"
        >
          <span className="relative z-10 text-[15px]">الذهاب الى الرئيسية</span>
          {/* Scanner Shine */}
          <span className="shine-effect group-hover:animate-shine" />
        </Link>
      </div>
    </div>
  );
};

export default Error404;

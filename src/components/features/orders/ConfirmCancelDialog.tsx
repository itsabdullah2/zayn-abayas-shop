import { AppContext } from "@/context/AppContext";
import { useContextSelector } from "use-context-selector";

type Props = {
  icon: React.ReactNode;
  message: string;
  onClick?: () => void;
  status?: string;
};

const ConfirmCancelDialog = ({ icon, message, onClick, status }: Props) => {
  const setIsDialogOpen = useContextSelector(
    AppContext,
    (ctx) => ctx?.setIsDialogOpen
  )!;
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10" />
      <div className="w-[95vw] sm:w-[500px] bg-white rounded-xl py-4 px-5 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-4 mb-5">
          {icon}
          <h2 className="text-base text-black font-medium pb-3">{message}</h2>
        </div>
        <div
          className={`flex items-center ${
            status === "cancelled" || status === "returned"
              ? "justify-center"
              : "justify-between"
          } gap-3`}
        >
          <button
            className="cursor-pointer border border-accentA rounded-lg px-10 py-1 hover:bg-accentA duration-150 hover:text-white"
            onClick={handleCloseDialog}
          >
            الغاء
          </button>
          {status === "cancelled" || status === "returned" ? null : (
            <button
              className="cursor-pointer border border-accentA rounded-lg px-10 py-1 hover:bg-accentA duration-150 hover:text-white"
              onClick={onClick}
            >
              تأكيد
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmCancelDialog;

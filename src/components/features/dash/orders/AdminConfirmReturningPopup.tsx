import { Button } from "@/components/ui/button";

const AdminConfirmReturningPopup = () => {
  return (
    <>
      <div className="fixed inset-0 bg-black/70 w-full h-full z-20" />
      <div className="absolute-center fixed! z-50 w-[95vw] sm:w-[500px] bg-white rounded-xl py-4 px-5">
        <div className="flex items-center justify-start gap-2">
          <Button className="text-sm py-2 px-5 rounded-md cursor-pointer bg-primary text-white">
            موافقة
          </Button>
          <Button className="text-sm py-2 px-5 rounded-md cursor-pointer bg-primary text-white">
            إلغاء
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminConfirmReturningPopup;

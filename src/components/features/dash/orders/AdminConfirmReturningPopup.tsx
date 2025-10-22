import { Button } from "@/components/ui/button";
import { getReturnFeedbackByUserId } from "@/supabase/db/returnFeedback";
import type { ReturnFeedback } from "@/supabase/types";
import { useEffect, useState } from "react";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  userId: string | null;
};

const AdminConfirmReturningPopup = ({ onCancel, onConfirm, userId }: Props) => {
  const [feedback, setFeedback] = useState<ReturnFeedback | null>(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        if (userId) {
          const response = await getReturnFeedbackByUserId(userId);
          setFeedback(response);
        }
      } catch (err) {
        console.error("Failed to fetch the feedback!:", err);
        throw err;
      }
    };

    fetchFeedbackData();
  }, []);

  console.log("Feedback data:", feedback);
  return (
    <>
      <div className="fixed inset-0 bg-black/70 w-full h-full z-20" />
      <div className="absolute-center fixed! z-50 w-[95vw] sm:w-[500px] bg-white rounded-xl py-4 px-5">
        <div className="flex items-center justify-start gap-2">
          <Button
            className="text-sm py-2 px-5 rounded-md cursor-pointer bg-primary text-white"
            onClick={onConfirm}
          >
            موافقة
          </Button>
          <Button
            className="text-sm py-2 px-5 rounded-md cursor-pointer bg-primary text-white"
            onClick={onCancel}
          >
            إلغاء
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminConfirmReturningPopup;

import { Button } from "@/components/ui/button";
import { getReturnFeedbackByUserId } from "@/supabase/db/returnFeedback";
import type { ReturnFeedback } from "@/supabase/types";
import { useEffect, useState } from "react";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  orderItemId: string | null;
};

const sharedQuestionsStyles = "font-medium text-base text-primary";
const sharedAnswerStyles = "font-medium text-sm text-gray-400";

const AdminConfirmReturningPopup = ({
  onCancel,
  onConfirm,
  orderItemId,
}: Props) => {
  const [feedback, setFeedback] = useState<ReturnFeedback | null>(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        if (orderItemId) {
          const response = await getReturnFeedbackByUserId(orderItemId);
          setFeedback(response);
        }
      } catch (err) {
        console.error("Failed to fetch the feedback!:", err);
        throw err;
      }
    };

    fetchFeedbackData();
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black/70 w-full h-full z-20" />
      <div className="absolute-center fixed! z-50 w-[95vw] sm:w-[500px] bg-white rounded-xl py-4 px-5">
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex flex-col gap-1">
            <h3 className={`${sharedQuestionsStyles}`}>سبب الاسترجاع</h3>
            <p className={`${sharedAnswerStyles}`}>
              {feedback?.reason || "لم يتم الاجابة"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className={`${sharedQuestionsStyles}`}>هل تم تجربة المنتج</h3>
            <p className={`${sharedAnswerStyles}`}>
              {feedback?.tried || "لم يتم الاجابة"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className={`${sharedQuestionsStyles}`}>
              هل العميل يرغب في الاستبدال؟
            </h3>
            <p className={`${sharedAnswerStyles}`}>
              {feedback?.exchange || "لم يتم الاجابة"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className={`${sharedQuestionsStyles}`}>سرعة التوصيل</h3>
            <p className={`${sharedAnswerStyles}`}>
              {feedback?.delivery_speed || "لم يتم الاجابة"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className={`${sharedQuestionsStyles}`}>تقييم المنتج</h3>
            <p className={`${sharedAnswerStyles}`}>
              {feedback?.rating || "لم يتم الاجابة"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className={`${sharedQuestionsStyles}`}>ملاحظة من العميل</h3>
            <p className={`${sharedAnswerStyles}`}>
              {feedback?.notes || "لم يتم الاجابة"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-start gap-5">
          <Button
            className="text-sm py-2 px-5 rounded-md cursor-pointer bg-primary text-white"
            onClick={onConfirm}
          >
            موافقة
          </Button>
          <Button
            className="text-sm py-2 px-5 rounded-md cursor-pointer border border-primary text-primary bg-transparent hover:bg-primary hover:text-white"
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

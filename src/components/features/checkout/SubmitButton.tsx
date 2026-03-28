import CustomButton from "@/components/common/CustomButton";

interface SubmitButtonProps {
  loading: boolean;
  total: number;
  stripeAvailable: boolean;
}

const SubmitButton = ({
  loading,
  total,
  stripeAvailable,
}: SubmitButtonProps) => (
  <CustomButton
    type="submit"
    isDisabled={!stripeAvailable || loading}
    className={`w-full py-3 rounded-lg text-white font-semibold cursor-pointer ${
      loading || !stripeAvailable
        ? "bg-soft-gray cursor-not-allowed"
        : "bg-primary relative overflow-hidden group"
    }`}
    btnText={loading ? "جارٍ المعالجة..." : `ادفع ${total} ج.م`}
  />
);

export default SubmitButton;

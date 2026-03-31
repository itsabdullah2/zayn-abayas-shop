import CustomButton from "@/components/common/CustomButton";

interface SubmitButtonProps {
  loading: boolean;
  total: number;
  stripeAvailable: boolean;
  isFormValid: boolean;
}

const SubmitButton = ({
  loading,
  total,
  stripeAvailable,
  isFormValid,
}: SubmitButtonProps) => (
  <CustomButton
    type="submit"
    isDisabled={!stripeAvailable || loading || isFormValid}
    className={`w-full py-3 rounded-lg text-white font-semibold ${
      loading || !stripeAvailable || isFormValid
        ? "bg-soft-gray cursor-not-allowed"
        : "bg-primary relative overflow-hidden group cursor-pointer"
    }`}
    btnText={loading ? "جارٍ المعالجة..." : `ادفع ${total} ج.م`}
  />
);

export default SubmitButton;

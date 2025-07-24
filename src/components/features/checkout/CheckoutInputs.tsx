import { CardElement } from "@stripe/react-stripe-js";
import FormInput from "./FormInput";

interface CheckoutInputsProps {
  formData: {
    name: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    country: string;
  };
  handleChange: (
    field: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const inputFields = [
  {
    label: "الاسم الكامل",
    name: "name",
    type: "text",
    placeholder: "أدخل اسمك",
  },
  {
    label: "البريد الإلكتروني",
    name: "email",
    type: "email",
    placeholder: "أدخل بريدك الإلكتروني",
  },
  {
    label: "العنوان الأول",
    name: "address1",
    type: "text",
    placeholder: "أدخل عنوانك الأساسي",
  },
  {
    label: "العنوان الثاني",
    name: "address2",
    type: "text",
    placeholder: "سطر عنوان إضافي (اختياري)",
  },
  {
    label: "المدينة",
    name: "city",
    type: "text",
    placeholder: "اسم المدينة",
  },
  {
    label: "الدولة",
    name: "country",
    type: "text",
    placeholder: "الدولة (مثل: EG، US، DE)",
  },
];

const CheckoutInputs = ({ formData, handleChange }: CheckoutInputsProps) => {
  return (
    <>
      {inputFields.map((field) => (
        <FormInput
          key={field.name}
          labelFor={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name as keyof typeof formData]}
          onChange={handleChange(field.name)}
        />
      ))}
      <div>
        <label
          htmlFor="card-field"
          className="text-sm text-primary font-medium"
        >
          رقم البطاقة
        </label>
        <CardElement
          id="card-field"
          className="w-full p-2 border border-gray rounded"
          options={{ hidePostalCode: true }}
        />
      </div>
    </>
  );
};

export default CheckoutInputs;

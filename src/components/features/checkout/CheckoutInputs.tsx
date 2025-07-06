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
    label: "Full Name",
    name: "name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Address Line 1",
    name: "address1",
    type: "text",
    placeholder: "Enter your primary address",
  },
  {
    label: "Address Line 2",
    name: "address2",
    type: "text",
    placeholder: "Optional address line",
  },
  { label: "City", name: "city", type: "text", placeholder: "City name" },
  {
    label: "Country",
    name: "country",
    type: "text",
    placeholder: "Country (e.g., US, EG, DE)",
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
          Card Number
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

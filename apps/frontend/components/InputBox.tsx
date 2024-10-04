import BottomGradient from "./Buttons/ButtomGrad";
export const InputBox = ({
  label,
  placeholder,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  type?: "text" | "password";
}) => {
  return (
    <div className="w-full relative">
      <div className="text-sm p-2">
        <label className="font-bold text-amber-700">{label}</label>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        name={label === "Username" ? "name" : label}
        onChange={onChange}
        className="border text-white rounded px-4 py-2 w-full border-black bg-slate-900"
      />
      <BottomGradient />
    </div>
  );
};


export const InputBox = ({
  label,
  placeholder,
  onChange,
  type = "text",
  value
}: {
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  type?: "text" | "password";
  value?:string;
}) => {
  return (
    <div className="w-full relative">
      <div className="text-sm p-2">
        <label className="font-bold text-amber-700">{label}</label>
      </div>
      {  
        !value?
          <input
            type={type}
            placeholder={placeholder}
            name={label === "Username" ? "name" : label}
            onChange={onChange}
            className="border text-white rounded px-4 py-2 w-full border-black bg-slate-900"
          />
        :
          <input
            value={value}
            disabled={true}
            type={type}
            placeholder={placeholder}
            name={label === "Username" ? "name" : label}
            onChange={onChange}
            className="border text-white rounded px-4 py-2 w-full border-black bg-slate-900"
          />
      }
      
    </div>
  );
};

"use client";
export const UserDetailsRow = ({
  label,
  details,
  onClick,
  degree,
}: {
  label: string;
  details: string | null;
  degree?: string | null;
  onClick?: () => void;
}) => {
  return (
    <div className="flex justify-start w-full gap-2 border-4 rounded-md border-cyan-600 p-2 hover:bg-sky-500  lg:text-base sm:text-sm xxs:text-xs h-full">
      <div className="font-bold text-black flex justify-center items-center w-2/4 bg-teal-500 p-2 hover:bg-teal-800 rounded-md break-words overflow-auto">
        {label}
      </div>
      <div className=" flex justify-center items-center bg-fuchsia-600  w-2/4 p-2 hover:bg-fuchsia-900 rounded-md overflow-auto  break-all">
        <p> {details ? details : `Add Your ${label}`}</p>
      </div>
      {degree && (
        <div className=" flex justify-center items-center bg-sky-600  w-2/4 p-2 hover:bg-sky-900 rounded-md overflow-auto xxs:pl-5 sm:pl-2 break-words">
          <p> {degree ? degree : "Degree"}</p>
        </div>
      )}
      {(label === "School" || label === "College") && (
        <div className="flex justify-center items-center bg-gray-600  w-1/4 p-2 hover:bg-slate-800 rounded-md">
          <button
            onClick={onClick}
            className="bg-slate-700 border rounded-md border-slate-950 p-1 pl-2 pr-2 hover:bg-slate-900 "
          >
            {details ? (
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : (
              "Add"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

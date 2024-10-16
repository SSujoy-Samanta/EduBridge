export const Message = ({
  msg,
  type = "You",
  user,
}: {
  msg: string;
  type: string;
  user: string;
}) => {
  return (
    <div className="w-full">
      <div
        className={type === "You" ? `flex justify-end` : `flex justify-start`}
      >
        <div className="flex justify-start flex-col xl:w-2/6 lg:w-3/6 md:w-2/6 sm2:w-3/6 xxs:w-4/6 lg:text-base xxs:text-xs sm:text-sm">
          <label className="font-light text-amber-700 ">{user}</label>
          <p
            className={
              type === "You"
                ? `"m-1 rounded-md p-2  bg-sky-800 break-words"`
                : "m-1 rounded-md p-2  bg-fuchsia-900 break-words"
            }
          >
            {msg}
          </p>
        </div>
      </div>
    </div>
  );
};

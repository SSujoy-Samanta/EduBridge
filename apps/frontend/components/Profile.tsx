export const Profile = ({
  userName,
  onClick,
}: {
  userName: string;
  onClick: () => void;
}) => {
  const profile = userName[0].toUpperCase();
  return (
    <div onClick={onClick}>
      <div className="bg-cyan-500 rounded-full w-10 h-10 p-2 font-semibold text-center hover:bg-cyan-600 cursor-pointer ">
        {userName === "unknown" ? (
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        ) : (
          profile
        )}
      </div>
    </div>
  );
};

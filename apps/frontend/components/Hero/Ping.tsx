export const Ping = () => {
  return (
    <>
      <div
        className="absolute top-16 left-10 w-14 h-14 bg-indigo-500 rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "0s", animationDuration: "2s" }}
      ></div>
      <div
        className="absolute top-32 sm:right-20 xxs:right-12 w-20 h-20 bg-purple-300 rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
      ></div>
      <div
        className="absolute bottom-10 sm:left-32 xxs:left-5 w-16 h-16 bg-blue-500 rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "1s", animationDuration: "3s" }}
      ></div>
      <div
        className="absolute top-52 left-32 w-16 h-16 bg-red-500 rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "1.5s", animationDuration: "3.5s" }}
      ></div>
      <div
        className="absolute top-8 right-1/4 w-16 h-16 bg-cyan-500 rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "2s", animationDuration: "4s" }}
      ></div>
      <div
        className="absolute bottom-10 sm:right-32 xxs:right-8 w-16 h-16 bg-blue-500 rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "2.5s", animationDuration: "4.5s" }}
      ></div>
      <div
        className="absolute top-8 left-1/3 w-16 h-16 bg-blue-500 rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "3s", animationDuration: "5s" }}
      ></div>
      <div
        className="absolute top-1/3 sm:left-1/2 xxs:right-1/4 w-16 h-16 bg-stone-500 rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "2s", animationDuration: "4s" }}
      ></div>
      <div
        className="absolute bottom-20 left-1/2 w-16 h-16 bg-green-500 rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      ></div>
      <div
        className="absolute sm:bottom-1/3 xxs:bottom-1/4 sm:left-1/3 xxs:left-12 w-16 h-16 bg-pink-500 rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      ></div>
      <div
        className="absolute bottom-2/4 right-1/4 w-16 h-16 bg-black rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      ></div>
    </>
  );
};

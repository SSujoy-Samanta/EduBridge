import { useState } from "react";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <div className="w-full flex justify-start gap-2 space-y-4 items-center">
      <label
        htmlFor="image-upload"
        className="cursor-pointer p-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition duration-300 ease-in-out shadow-md flex justify-center items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
        <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
        </svg>
        <p>Upload Image</p>
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="hidden" // Hide the default file input
      />

      {/* Image URL Input as Optional */}
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
        className=" p-3 rounded-md text-sky-400 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
      />
    </div>
  );
};

export default ImageUpload;

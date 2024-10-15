'use client'
import { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '@/lib/atom';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const CreatePost = ({ userId ,setView }: {
   userId: number,
   setView: React.Dispatch<React.SetStateAction<'A'|'B'|'C'|'D'>>;
  }) => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null); // To store the actual file
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // To display preview
  const setNotification = useSetRecoilState(notificationState);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the selected file (preview)
      setImageFile(file); // Store the actual file
      setImagePreviewUrl(imageUrl); // Update the state with the image preview URL
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (content  && userId ) {
        const formData=new FormData();
        formData.append("content",content);
        formData.append("authorId",userId.toString());
        if(imageFile){
          formData.append("image",imageFile);
        }

        const res=await axios.post(`${apiUrl}/posts/create`, formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
        setNotification({ msg: 'Posting Succcessful', type: 'success' });
        setView('A')
      } else {
        setNotification({ msg: 'Content Required', type: 'error' });
      }
    } catch (error: any) {
      setNotification({ msg: error.response?.msg || 'Error creating post', type: 'error' });
      console.error('Error creating post', error);
    }
  };

  return (
    <div className='p-2'>
      <div className='flex p-2 justify-center items-center'>
        <h1 className='font-semibold text-cyan-500'>Create Post</h1>
      </div>
      <form onSubmit={handleSubmit}  className='flex flex-col w-full gap-2 p-2'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
          Choose Image
        </label>
        <div className="w-full flex justify-start gap-2 space-y-4 ">
          <label
            htmlFor="image-upload"
            className="sm:w-1/6 xxs:w-2/6 cursor-pointer p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md transition duration-300 ease-in-out shadow-md flex justify-center items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-1/2">
              <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
            </svg>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // Hide the default file input
          />

          <input
            type="text"
            value={imagePreviewUrl || ''}
            readOnly
            placeholder="SVG, PNG, or JPG (MAX. 800x400px)."
            className="sm:w-3/6 xxs:w-full p-3 rounded-md text-sky-400 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
          />
        </div>
        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Image Preview"
            className="mt-4 rounded-md shadow-lg w-40 h-40 object-cover"
          />
        )}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts here..."
          className='p-2 rounded-md bg-slate-700 w-full break-words min-h-40 mt-2'
        />
        <button type="submit" className='mt-2 bg-gradient-to-tr from-sky-500 to-indigo-500 p-2 mx-auto rounded-md'>
          Post
        </button>
      </form>
    </div>
  );
};

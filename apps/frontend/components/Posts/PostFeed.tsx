'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '../Loadin2';
import { useRouter } from 'next/navigation';
import LoveButton from '../CustomSvg/Love';

interface Post {
  id: number;
  content: string;
  imageUrl: string | null;
  like:number,
  author: {
    name: string,
    affiliates:string,
    id:number
  };
  createdAt: string;
}

export const PostFeed=()=>{
  const [posts, setPosts] = useState<Post[]>([]);
  const [page,setPage]=useState<number>(1);
  const router=useRouter();

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const response = await axios.get(`/api/posts?page=${page}`);
        setPosts(response.data.posts);
      };
  
      fetchPosts();
    } catch (e:any) {
      console.log("Error while fetching data")
    }
  }, [page]);

  return (
    <div className='w-full h-full overflow-auto'>
      {posts.length > 0 ? 
        posts.map((post) => (
          <div key={post.id} className="p-2 my-2">
            <div className="flex items-center ">
              <div className="flex justify-center items-center rounded-full p-2  w-10 h-10 text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer" onClick={()=>{router.push(`/user?id=${post.author.id}`)}}>
                {post.author.name ?post.author.name[0].toUpperCase() : "U"}
              </div>
              <div className='flex justify-start items-start flex-col'>
                <p className="pl-2 text-cyan-500 font-semibold">{post.author.name || "Unknown"}</p>
                <p className="pl-2 text-blue-600">{post.author.affiliates || "Affiliates"}</p>
              </div>
            </div>
            <div className='w-full px-4 p-1 pl-12 flex flex-col gap-1'>
              <p className=' break-words w-full mb-2'>{post.content}</p>
              {post.imageUrl && <div className="flex justify-start items-start w-full">
                <img src={post.imageUrl} alt="Posted image" className="rounded-md object-cover sm2:w-5/6 xxs:w-full sm2:h-80 xxs:h-52 max-w-full max-h-full"/>
              </div>  }
              <small className='text-slate-500'>{new Date(post.createdAt).toLocaleString()}</small>
              
            </div>
            <div className='w-full px-4 p-1 pl-12 flex flex-col gap-1'>
              <LoveButton liked={post.like} postId={post.id}/>
            </div>
          </div>
        ))
        :
        <div>
          <Loader/>
        </div>
    }
      <div className="relative bottom-2 w-full flex justify-center items-center p-2 text-slate-900">
        <button
          disabled={page === 1} // Disable when on page 1
          className={`p-2 text-center ${
            page === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
          } rounded-s-md`}
          onClick={()=>{setPage(page=>page-1)}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
          </svg>
        </button>

        <button
          disabled={page === 5} // Disable when on page 5
          className={`p-2 text-center ${
            page === 5 ? "bg-gray-600 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-800 cursor-pointer"
          } rounded-r-md`}
          onClick={()=>{setPage(page=>page+1)}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
          </svg>
        </button>
      </div>


    </div>
  );
}
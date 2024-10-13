'use client';

import { useEffect, useState } from "react";
import { Loader } from "../Loadin2";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/lib/atom";

interface Post {
  id: number;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export const OwnPost = ({ userId }: { userId: number }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const setNotification = useSetRecoilState(notificationState);

    // Fetch user's posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`/api/posts/ownpost?userId=${userId}`);
                setPosts(res.data);
            } catch (err: any) {
                console.log("Error while fetching data");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [userId]);

    if (loading) {
        return <Loader />;
    }

    // Function to handle post deletion
    const deletePost = async (postId: number) => {
        try {
            const response = await axios.delete(`/api/posts/delete?postId=${postId}`);
        
            if (response.status === 200) {
                // Update posts state by removing the deleted post
                setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
                setNotification({ msg: "Post deleted successfully", type: "success" });
            } else {
                setNotification({ msg: "Post deletion was unsuccessful", type: "error" });
            }
        } catch (error: any) {
            setNotification({ msg: "Post deletion was unsuccessful", type: "error" });
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="flex gap-1 w-full ">
            <div className="w-full">
                <h2 className="text-xl font-bold mb-4 pl-4 text-sky-600 uppercase">Your Posts</h2>
                {posts.length === 0 ? (
                    <div className="text-red-400 text-center">No posts found</div>
                ) : (
                    <div className="grid gap-4">
                        {posts.map((post) => (
                            <div key={post.id} className="p-4 rounded-md shadow-sm border border-cyan-600">
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt="Post image"
                                        className="rounded-md object-fill xxs:w-full sm2:h-72 sm2:w-10/12 xxs:h-52 mb-4"
                                    />
                                )}
                                <p className="w-full break-words pr-2">{post.content}</p>
                                <small className="text-gray-500">
                                    Posted on: {new Date(post.createdAt).toLocaleDateString()}
                                </small>
                                <div className="flex justify-start items-center w-full mt-2">
                                    <button
                                        className="text-black flex justify-center items-center p-2 gap-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500"
                                        onClick={() => deletePost(post.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
                                            <path
                                                fillRule="evenodd"
                                                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <p>DELETE</p>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

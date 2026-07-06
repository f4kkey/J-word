import React, { useState, type Dispatch, type SetStateAction } from 'react'
import { useAuth, type User } from '../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { EllipsisVerticalIcon } from 'lucide-react';
import { axiosInstance } from '../../lib/axios';

export interface IPost {
    id: number;
    content: string;
    author: User;
    picture?: string;
    likes?: User[];
    comments?: Comment[];
    createdAt: string;
    updatedAt?: string;
}

interface PostProps {
    post: IPost;
    setPosts: Dispatch<SetStateAction<IPost[]>>;
}

export default function Post({ post, setPosts }: PostProps) {
    const navigate = useNavigate()
    const { user } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [editing, setEditing] = useState(false);

    const deletePost = async (postId: number) => {
        try {
            const res = await axiosInstance.delete(
                `/feed/posts/${postId}`
            )
            if (res.status === 200) {
                setPosts((prev) =>
                    prev.filter((p) => p.id !== postId)
                )
                return
            }
            const message = await res.data.message
            throw new Error(message);

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='relative mb-4 rounded border border-[#e0e0e0] bg-white'>
            <div className='flex items-start justify-between gap-4 p-4 text-sm'>
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => {
                            navigate(`/profile/${post.author.id}`);
                        }}
                    >
                        <img
                            className={"h-16 w-16 min-w-16 rounded-full object-cover"}
                            src={
                                post.author.profilePicture
                                    ? `${import.meta.env.VITE_API_URL}/api/v1/storage/${post.author.profilePicture}`
                                    : "/avatar.svg"
                            }
                            alt=""
                        />
                    </button>
                    <div>
                        <div className={"line-clamp-1 font-bold"}>
                            {post.author.firstName + " " + post.author.lastName}
                        </div>
                        <div className={"line-clamp-1 text-black/60"}>
                            {post.author.location}
                        </div>
                        <div>
                            {/* {timeAgo(new Date(post.updatedAt || post.createdAt))} */}
                            {post.updatedAt ? " . Edited" : ""}
                        </div>
                    </div>
                </div>

                <div>
                    {post.author.id == user?.id && (
                        <button
                            className={`grid h-6 w-6 place-items-center rounded-full bg-transparent transition hover:bg-[#e0e0e0] ${showMenu ? "text-[#0a66c2]" : ""}`}
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <EllipsisVerticalIcon className='h-3 w-3'></EllipsisVerticalIcon>
                        </button>
                    )}
                    {showMenu && (
                        <div className={"absolute right-5 top-11 flex flex-col items-start gap-2 rounded bg-[#e0e0e0] p-2 text-xs [&_button]:w-full [&_button]:text-left [&_button:not(:last-child)]:border-b [&_button:not(:last-child)]:border-[#ccc] [&_button:not(:last-child)]:pb-1"}>
                            <button onClick={() => setEditing(true)}>Edit</button>
                            <button onClick={() => deletePost(post.id)}>Delete</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

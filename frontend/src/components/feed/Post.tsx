import React, { useEffect, useState, type Dispatch, type SetStateAction, type SubmitEvent } from 'react'
import { useAuth, type IUser } from '../../context/AuthContextProvider';
import { data, useNavigate } from 'react-router-dom';
import { EllipsisVerticalIcon, MessageCircle, MessageCircleIcon, ThumbsUpIcon } from 'lucide-react';
import { axiosInstance } from '../../lib/axios';
import Input from '../Input';
import { timeAgo } from '../../utils/data';
import Comment, { type IComment } from './Comment';
import Modal from './Modal';

export interface IPost {
    id: number;
    content: string;
    author: IUser;
    picture?: string;
    createdAt: string;
    updatedAt?: string;
}

interface IPostProps {
    post: IPost;
    setPosts: Dispatch<SetStateAction<IPost[]>>;
}

export default function Post({ post, setPosts }: IPostProps) {
    const navigate = useNavigate()
    const { user } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [editing, setEditing] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [likes, setLikes] = useState<IUser[]>([])
    const [comments, setComments] = useState<IComment[]>([]);
    const [postLiked, setPostLiked] = useState<boolean | undefined>();

    const editPost = async (data: FormData) => {
        try {
            const res = await axiosInstance.put(
                `/feed/comments/${post.id}`,
                data
            )
            if (res.status >= 200 && res.status < 300) {
                setPosts((prev) =>
                    prev.map((p) => {
                        if (p.id == post.id) {
                            return res.data
                        }
                        return p;
                    })
                );
                return
            }
            const message = await res.data.message
            throw new Error(message);
        } catch (error) {
            console.log(error)
        }
    }

    const likePost = async (postId: number) => {
        setPostLiked((prev) => !prev)
        try {
            const res = await axiosInstance.put(
                `/feed/posts/${postId}/like`
            )
            if (res.status >= 200 && res.status < 300) {
                return
            }
            const message = await res.data.message
            throw new Error(message);

        } catch (error) {
            console.log(error)
            setPostLiked((prev) => !prev)
        }
    };

    const deletePost = async (postId: number) => {
        try {
            const res = await axiosInstance.delete(
                `/feed/posts/${postId}`
            )
            if (res.status >= 200 && res.status < 300) {
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

    const postComment = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!commentContent) {
            return;
        }
        try {
            const res = await axiosInstance.post(
                `/feed/posts/${post.id}/comments`,
                commentContent

            )
            if (res.status >= 200 && res.status < 300) {
                setComments((prev) => [res.data, ...prev])
                setCommentContent("")
                return
            }
            const message = await res.data.message
            throw new Error(message);
        } catch (error) {
            console.log(error)
        }
    };

    const deleteComment = async (commentId: number) => {
        try {
            const res = await axiosInstance.delete(
                `/feed/comments/${commentId}`

            )
            if (res.status >= 200 && res.status < 300) {
                setComments((prev) => prev.filter((c) => c.id !== commentId));
                return
            }
            const message = await res.data.message
            throw new Error(message);
        } catch (error) {
            console.log(error)
        }
    };

    const editComment = async (commentId: number, content: string) => {
        try {
            const res = await axiosInstance.put(
                `/feed/comments/${commentId}`,
                content

            )
            if (res.status >= 200 && res.status < 300) {
                setComments((prev) =>
                    prev.map((c) => {
                        if (c.id == commentId) {
                            return res.data
                        }
                        return c;
                    })
                );
                return
            }
            const message = await res.data.message
            throw new Error(message);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axiosInstance.get(
                    `/feed/posts/${post.id}/comments`,
                )
                if (res.status >= 200 && res.status < 300) {
                    setComments(res.data)
                    return
                }
                const message = await res.data.message
                throw new Error(message);
            } catch (error) {
                console.log(error)
            }
        }
        fetchComments();
    }, [post.id]);

    useEffect(() => {

        const fetchLikes = async () => {
            try {
                const res = await axiosInstance.get(
                    `/feed/posts/${post.id}/likes`,
                )
                if (res.status >= 200 && res.status < 300) {
                    setLikes(res.data)
                    setPostLiked(res.data.some((like) => like.id === user?.id))
                    return
                }
                const message = await res.data.message
                throw new Error(message);
            } catch (error) {
                console.log(error)
            }
        }
        fetchLikes();
    }, [post.id, user?.id]);

    return (
        <>{editing ? <Modal
            title='Editing a post'
            content={post.content}
            picture={post.picture}
            onSubmit={editPost}
            showModal={editing}
            setShowModal={setEditing}
        /> : null}
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
                                {timeAgo(new Date(post.updatedAt || post.createdAt))}
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

                <div className='px-4 pb-4'>{post.content}</div>
                {post.picture && (
                    <img
                        src={post.picture}
                        alt=""
                        className={"w-full"}
                    />
                )}
                <div className={"flex items-center justify-between"}>
                    {likes && likes.length > 0 ? (
                        <div className={"px-4 py-1 text-xs"}>
                            <span>{postLiked ? "You " : likes[0].firstName + " " + likes[0].lastName + " "}</span>
                            {likes.length - 1 > 0 ? (
                                <span>
                                    and {likes.length - 1} {likes.length - 1 === 1 ? "other" : "others"}
                                </span>
                            ) : null}{" "}
                            liked this
                        </div>
                    ) : (
                        <div></div>
                    )}

                    {comments && comments.length > 0 ? (
                        <button className={"px-4 py-1 text-xs"} onClick={() => setShowComments((prev) => !prev)}>
                            <span>{comments.length} comments</span>
                        </button>
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className={"flex justify-between gap-4 border-t border-[#e0e0e0] p-4 [&_button]:flex [&_button]:items-center [&_button]:gap-2 [&_button]:text-sm [&_button:disabled]:cursor-wait"}>
                    <button
                        disabled={postLiked == undefined}
                        onClick={() => likePost(post.id)}
                        className={postLiked ? "text-[#0a66c2]" : ""}
                    >
                        <ThumbsUpIcon className='h-4 w-4'></ThumbsUpIcon>
                        <span>{postLiked == undefined ? "Loading" : postLiked ? "Liked" : "Like"}</span>
                    </button>
                    <button
                        onClick={() => {
                            setShowComments((prev) => !prev);
                        }}
                        className={showComments ? "text-[#0a66c2]" : ""}
                    >
                        <MessageCircleIcon className='h-4 w-4'></MessageCircleIcon>
                        <span>Comment</span>
                    </button>
                </div>

                {showComments ? (
                    <div className={"border-t border-[#e0e0e0] px-4 pb-4"}>
                        <form onSubmit={postComment}>
                            <Input
                                onChange={(e) => setCommentContent(e.target.value)}
                                value={commentContent}
                                placeholder="Add a comment..."
                                name="content"
                                style={{ marginBlock: 0 }}
                            />
                        </form>

                        {comments.map((comment) => (
                            <Comment
                                editComment={editComment}
                                deleteComment={deleteComment}
                                key={comment.id}
                                comment={comment}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </>
    )
}

import React, { useState } from 'react'
import { useAuth, type IUser } from '../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import Input from '../Input';
import { timeAgo } from '../../utils/data';
import { EllipsisVerticalIcon } from 'lucide-react';
export interface IComment {
    id: number;
    content: string;
    author: IUser;
    createdAt: string;
    updatedAt?: string;
}

interface ICommentProps {
    comment: IComment;
    deleteComment: (commentId: number) => Promise<void>;
    editComment: (commentId: number, content: string) => Promise<void>;
}

export default function Comment({ comment, deleteComment, editComment }: ICommentProps) {
    const navigate = useNavigate();
    const [showActions, setShowActions] = useState(false);
    const [editing, setEditing] = useState(false);
    const [commentContent, setCommentContent] = useState(comment.content);
    const { user } = useAuth();
    return (
        <div key={comment.id}>
            {!editing ? (
                <>
                    <div className={"flex items-start justify-between gap-4"}>
                        <button
                            onClick={() => {
                                navigate(`/profile/${comment.author.id}`);
                            }}
                            className={"mb-2 grid w-full grid-cols-[4rem_1fr] items-center gap-4 text-left"}
                        >
                            <img
                                className={"h-16 w-16 shrink-0 rounded-full object-cover"}
                                src={comment.author.profilePicture || "/avatar.svg"}
                                alt=""
                            />
                            <div>
                                <div className={"flex items-center justify-between gap-4 font-bold"}>
                                    {comment.author.firstName + " " + comment.author.lastName}
                                </div>
                                <div className={"text-black/60"}>
                                    {comment.author.location}
                                </div>
                                {timeAgo(new Date(comment.updatedAt || comment.createdAt))}
                                {comment.updatedAt ? ". Edited" : ""}
                            </div>
                        </button>
                        {comment.author.id == user?.id && (
                            <button
                                className={`grid h-6 w-6 place-items-center rounded-full bg-transparent transition hover:bg-[#e0e0e0] [&_svg]:h-3 [&_svg]:w-3 ${showActions ? "bg-[#e0e0e0]" : ""}`}
                                onClick={() => setShowActions(!showActions)}
                            >
                                <EllipsisVerticalIcon></EllipsisVerticalIcon>
                            </button>
                        )}

                        {showActions && (
                            <div className={"grid h-6 w-6 place-items-center rounded-full bg-transparent transition hover:bg-[#e0e0e0] [&_svg]:h-3 [&_svg]:w-3"}>
                                <button onClick={() => setEditing(true)}>Edit</button>
                                <button onClick={() => deleteComment(comment.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                    <div>{comment.content}</div>
                </>
            ) : (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await editComment(comment.id, commentContent);
                        setEditing(false);
                        setShowActions(false);
                    }}
                >
                    <Input
                        type="text"
                        value={commentContent}
                        onChange={(e) => {
                            setCommentContent(e.target.value);
                        }}
                        placeholder="Edit your comment"
                    />
                </form>
            )
            }
        </div >
    )
}

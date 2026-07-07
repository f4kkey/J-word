import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContextProvider'
import RightSideBar from '../components/feed/RightSideBar';
import LeftSideBar from '../components/feed/LeftSideBar';
import { useNavigate } from 'react-router-dom';
import Button from '../components/auth/Button';
import type { IPost } from '../components/feed/post/Post';
import { axiosInstance } from '../lib/axios';
import Post from '../components/feed/post/Post';
import Modal from '../components/feed/post/Modal';

export default function Feed() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showPostingModal, setShowPostingModal] = useState(true);
    const [feedContent, setFeedContent] = useState("all")
    const [posts, setPosts] = useState<IPost[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axiosInstance.get(
                    "/feed" + (feedContent === "all" ? "/posts" : "")
                )
                if (res.status === 200) {
                    const data = res.data
                    setPosts(data)
                    return
                }
                const message = await res.data.message
                throw new Error(message);

            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message)
                } else {
                    setErrorMessage("An unknown error occurred")
                }
            }
        };
        fetchPosts()
    }, [feedContent]);

    const handlePost = async (data: FormData) => {
        try {
            const res = await axiosInstance.post(
                "/feed/posts",
                data
            );

            setPosts([res.data, ...posts]);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("An unknown error occurred")
            }
        }
    };

    return (
        <div className='grid h-full gap-8 min-[1135px]:grid-cols-[14rem_1fr_20rem] min-[1135px]:items-start'>
            <div className='hidden min-[1135px]:block'>
                <LeftSideBar></LeftSideBar>
            </div>
            <div className='grid h-full grid-rows-[auto_1fr] gap-4'>
                <div className='grid grid-cols-[5rem_1fr] gap-4 rounded border border-[#e0e0e0] bg-white p-4'>
                    <button
                        onClick={() => {
                            navigate(`/profile/${user?.id}`);
                        }}
                    >

                        <img src={user?.profilePicture || "/avatar.png"} alt="" className='h-20 w-20 rounded-full' />

                    </button>

                    <Button outline
                        onClick={() => setShowPostingModal(true)}
                    >
                        Create a post
                    </Button>

                    <Modal
                        onSubmit={handlePost}
                        showModal={showPostingModal}
                        setShowModal={setShowPostingModal}
                    >
                    </Modal>

                </div>

                {errorMessage && <div className='text-red-600'>{errorMessage}</div>}
                <div className='flex gap-4 justify-end text-sm'>
                    <button
                        className={`border border-[#e0e0e0] rounded-full py-2 px-4 ${feedContent === "all" ? "bg-blue-950 text-white" : "bg-white text-black"}`}
                        onClick={() => {
                            setFeedContent("all")
                        }}
                    >
                        All
                    </button>

                    <button
                        className={`border border-[#e0e0e0] rounded-full py-2 px-4 ${feedContent === "feed" ? "bg-blue-950 text-white" : "bg-white text-black"}`}
                        onClick={() => {
                            setFeedContent('feed')
                        }}
                    >
                        Feed
                    </button>
                </div>

                <div>
                    {
                        posts.map((post) => (
                            <Post key={post.id} post={post} setPosts={setPosts}></Post>
                        ))
                    }
                </div>
            </div>
            <div className='hidden min-[1135px]:block'>
                <RightSideBar></RightSideBar>
            </div>
        </div>
    )
}

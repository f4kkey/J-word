import React, { useState } from 'react'
import { useAuth } from '../context/AuthContextProvider'
import RightSideBar from '../components/feed/RightSideBar';
import LeftSideBar from '../components/feed/LeftSideBar';
import { useNavigate } from 'react-router-dom';
import Button from '../components/auth/Button';

export default function Feed() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showPostingModal, setShowPostingModal] = useState(true);
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

                    {/* <Modal
                        onSubmit={handlePost}
                        showModal={showPostingModal}
                        setShowModal={setShowPostingModal}
                    >

                    </Modal> */}

                </div>
                <div></div>
            </div>
            <div className='hidden min-[1135px]:block'>
                <RightSideBar></RightSideBar>
            </div>
        </div>
    )
}

import React, { useEffect, useState, type HTMLAttributes } from 'react'
import { timeAgo } from '../../../utils/data';


interface ITimeAgoProps extends HTMLAttributes<HTMLDivElement> {
    date: string;
    edited?: boolean;
}

export default function TimeAgo({ date, edited, ...others }: ITimeAgoProps) {
    const [time, setTime] = useState(timeAgo(new Date(date)));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(timeAgo(new Date(date)))
        }, 1000);

        return () => clearInterval(interval);
    }, [date])

    return (
        <div className={`text-xs text-[#666] `} {...others}>
            <span>{time}</span>
            {edited ? <span> . Edited</span> : null}
        </div>
    )
}

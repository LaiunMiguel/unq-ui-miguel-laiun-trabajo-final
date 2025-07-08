import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


const DifficultyOption = (difficulty) => {
    const router = useRouter();

    const difficultyId   = difficulty.difficulty.id
    const difficultyName = difficulty.difficulty.name

    const handleClick = () => {
        router.push(`/game/${difficultyId}`)
    }

    return(
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded" onClick={handleClick}>
            {difficultyName}
        </button>
    )

}

export default DifficultyOption

import React, { useEffect, useState } from 'react';
import { getDifficulties } from '../api/apiService'
import DifficultyOption from './DifficultyOption.jsx'

const HomeComponent = () => {

  const [difficultyOptions, setDifficultyOptions] = useState([]);

  useEffect(() => {
    const fetchDifficulties = async () => {
          const data = await getDifficulties() || [];
          console.log(data)
          setDifficultyOptions(data)
        }
        fetchDifficulties()
   },[])

  return (
    <div className="w-2/4 flex items-center justify-center flex-col gap-4">
      {difficultyOptions.length > 0 ? (
        difficultyOptions.map((difficulty, index) => (
          <DifficultyOption key={index} difficulty={difficulty} />
        ))
      ) : (
        <p>Cargando dificultades...</p>
      )}
    </div>
  );
}

export default HomeComponent;

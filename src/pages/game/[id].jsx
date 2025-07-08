import { useRouter } from 'next/router';
import React, {useEffect, useState } from 'react';
import { getGameSession, checkWord } from '../api/apiService'
import Teclado from '../components/Teclado.jsx';
import Row from '../components/Row.jsx';


export default function GamePage() {
  const intentos = 6;
  const router = useRouter();
  const { id } = router.query;
  const [gameSession, setGameSession] = useState({});
  

  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState([]);

  const [indexInCurrentRow, setIndexInCurrentRow] = useState(0);
  const [indexRow, setIndexRow] = useState(0);
  
  const [absentKeys, setAbsentKeys] = useState([]);

  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");

  useEffect(() => {
      if (!id) {return}
      const fetchGameSession = async () => {
            const data = await getGameSession(id) || [];
            setGameSession(data)
            const newRow = Array.from({ length: data.wordLenght }, () => ({ letra: "", solution: "" }));
            const newRows = Array.from({ length: intentos }, () => [...newRow]);
            setCurrentRow(newRow);
            setRows(newRows);        
            setIndexInCurrentRow(0);
            setIndexRow(0); 
          }
          fetchGameSession()
     },[id])

  const handleKeyPress = async (key) => {
    if (key === "←"){
      handleBackSpace();
    }
    else if (key === "ENTER") {
      handleEnter();
    }
    else{
      updateRow(key);
    }
  }

  const handleBackSpace = () => {
    if (indexInCurrentRow > 0) {
        setIndexInCurrentRow(indexInCurrentRow - 1);  
    }
  }

  const handleEnter = async () => {
    const word = currentRow.map(c => c.letra).join("");
    const response = await checkWord(gameSession.sessionId, word);
    if (response?.error) {
      alert(response.error);
      return;
    }
    hanndleEnterResponse(response);
  }

  const hanndleEnterResponse = (response) => {
    const updatedRow = [...currentRow]; 
    response.forEach((result, index) => {
      updatedRow[index].solution = result.solution;
      if (result.solution === "absent") {
        setAbsentKeys(prev => [...prev, updatedRow[index].letra]);
      }
    });
    checkGameOver(updatedRow);
    updateRows(updatedRow);
    setCurrentRow(rows[indexRow + 1])
    setIndexRow(indexRow + 1)
    setIndexInCurrentRow(0);
  }

  const checkGameOver = (updatedRow) => {
    if (updatedRow.every(casilla => casilla.solution === "correct")) {
      setGameOverMessage("Supiste la palabra! :)");
      setIsGameOver(true);
    }
    else if (indexRow >= intentos - 1) {
      setGameOverMessage("Has agotado tus intentos. :(");
      setIsGameOver(true);
      return;
    }
  }
    
  const updateRow = (key) => {
    const updatedRow = [...currentRow];
    updatedRow[indexInCurrentRow] = { letra: key, solution: "" };
    updateRows(updatedRow);
    if (indexInCurrentRow < gameSession.wordLenght - 1) {
      setIndexInCurrentRow(indexInCurrentRow + 1);
    }
  }

  const updateRows = (newRow) => {
    const updatedRows = [...rows];
    updatedRows[indexRow] = newRow;
    setCurrentRow(newRow);
    setRows(updatedRows);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">

      {rows.length > 0  && rows.map((row, rowIndex) => (
        <Row key={rowIndex} row={row} selectedCasilla={indexRow == rowIndex ? indexInCurrentRow : undefined}/>
      ))}
      {!isGameOver ? (<Teclado onKeyPress={handleKeyPress} absentKeys={absentKeys}/>) 
      : (<h1>{gameOverMessage}</h1>)}
    </div>
  );
}

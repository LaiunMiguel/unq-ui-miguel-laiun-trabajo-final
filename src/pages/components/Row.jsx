import Casilla from "./Casilla";
import React, { useState } from "react";


const Row = ({row, selectedCasilla}) => {

    return (
        <div className="flex flex-row items-center justify-center">
            {row.map((casilla, index) => (
                <Casilla key={index} solution={casilla.solution} letter={casilla.letra} isSelected={index == selectedCasilla}/>
            ))}
        </div>
    );
}

export default Row;
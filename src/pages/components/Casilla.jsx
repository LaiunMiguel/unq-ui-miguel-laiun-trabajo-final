
const Casilla = ({ solution , letter, isSelected}) => {

  const getBgColor = () => {
    if (solution === "correct") return "bg-green-500 text-white";
    if (solution === "elsewhere") return "bg-yellow-400 text-black";
    if (solution === "absent") return "bg-red-800 text-white";
    return "hover:bg-blue-500";
  };

    return (
        <div
          className={`w-13 h-13 border-2 rounded text-center flex items-center justify-center font-bold text-xl 
            ${getBgColor()} 
            ${isSelected ? "border-blue-500" : "border-gray-500"} 
            hover:cursor-pointer`}
        >
      {letter.toUpperCase()}
    </div>
    );
}

export default Casilla;
const KEYS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["ENTER", "z", "x", "c", "v", "b", "n", "m", "←"],
];


export default function OnScreenKeyboard({ onKeyPress, absentKeys }) {
 ;

  const isKeyDisabled = (key) => {
    return absentKeys.includes(key);
  }

  return (
    <div className="flex flex-col gap-2 items-center mt-6">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((key) => {
            const isDisabled = isKeyDisabled(key);
            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`w-14 h-16 font-bold rounded 
                  ${isDisabled 
                  ? "bg-gray-900 text-gray-400 cursor-not-allowed"  // gris oscuro + texto gris claro
                  : "bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-500"  // tonos grises oscuros con hover activo más claro
                }`}
              >
                {key.toUpperCase()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const { useState } = React;

export function Board() {
  const [box, setBox] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);


  const calculateWinner = () => {
    const wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    for (let [a, b, c] of wins) {
      if (box[a] && box[a] === box[b] && box[a] === box[c]) {
        return box[a];
      }
    }
    return null;
  }

  const winner = calculateWinner();
  const isDraw = !winner && box.every(b => b !==null);

  function handleClick(i) {
    if (box[i] || winner) return;
    const next = [...box];
    next[i] = xIsNext ? "X" : "O"
    setBox(next);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setBox(Array(9).fill(null));
    setXIsNext(true);
  }

  let status = winner ? `Winner: ${winner}` : isDraw ? 'Draw' : `Next: ${xIsNext ? "X" : "O"}`

  return (
    <div className = "container">
        <h1>Tic Tac Toe</h1>
      <div className = "status">
        <p>{status}</p>
      </div>
      <div className = "grid">
      {box.map((val, i) => {
        return <button onClick = {() => {
          handleClick(i)
        }}key = {i} className = {`square ${val === "X" ? "x" : val === "O" ? "o" : ""}`}>{val}</button>
      })}
      </div>
      <div className = "reset-con">
        <button id = "reset" onClick = {handleReset}>Reset</button>
      </div>
    </div>
  )



}
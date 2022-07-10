export default function Box(props) {
  const { id, occupiedBy, handleClick } = props;

  return (
    <div
      className="box"
      style={{
        borderBottom: [0, 1, 2, 3, 4, 5].includes(id)
          ? "1px solid black"
          : "none",
        borderRight: [0, 3, 6, 1, 4, 7].includes(id)
          ? "1px solid black"
          : "none",
      }}
      onClick={() => handleClick(id)}
    >
      {occupiedBy === 0 ? "X" : occupiedBy === 1 ? "O" : null}
    </div>
  );
}

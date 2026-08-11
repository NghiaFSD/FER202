import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="fs-3">Count: {count}</p>
      <button className="btn btn-success me-2" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button className="btn btn-danger me-2" onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button className="btn btn-secondary" onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default Counter;

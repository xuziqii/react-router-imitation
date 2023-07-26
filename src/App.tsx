import React from "react";
import { Router, Route, useHistory } from "./history";

function App() {
  const history = useHistory();

  const toDEF = () => {
    history.push("/def");
  };
  const toABC = () => {
    history.push("/abc?a=123");
  };
  return (
    <div>
      <button onClick={toABC}>toABC</button>
      <button onClick={toDEF}>toDEF</button>

      <Router>
        <Route path="/abc">abc view</Route>
        <Route path="/def">def view</Route>
      </Router>
    </div>
  );
}

export default App;

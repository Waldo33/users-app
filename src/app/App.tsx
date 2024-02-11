import { RootSwitcher } from "@processes/RootSwitcher";
import { BrowserRouter } from "react-router-dom";
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <RootSwitcher />
    </BrowserRouter>
  );
}

export default App;

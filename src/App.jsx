import { Routes, Route } from "react-router";
import StartSide from "./pages/StartSide";
import Depression from "./pages/Depression";
import Rygning from "./pages/Rygning";
import Kraeftbehandling from "./pages/Kraeftbehandling";
import Blodsukker from "./pages/Blodsukker";
import Graviditet from "./pages/Graviditet";
import Hormoner from "./pages/Hormoner";
import "./App.css";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartSide />} />
      <Route path="/depression" element={<Depression />} />
      <Route path="/rygning" element={<Rygning />} />
      <Route path="/kraeftbehandling" element={<Kraeftbehandling />} />
      <Route path="/blodsukker" element={<Blodsukker />} />
      <Route path="/graviditet" element={<Graviditet />} />
      <Route path="/hormoner" element={<Hormoner />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

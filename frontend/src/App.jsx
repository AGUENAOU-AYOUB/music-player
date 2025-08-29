import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import { SideBar, PlayingNow } from "./components/Bars";

function App() {
  return (
    <main className="w-full h-full grid grid-cols-1 grid-rows-[100px_4fr_1fr] md:grid-cols-[300px_2fr_2fr] md:grid-rows-[2fr_2fr_200px] md:gap-[1rem] bg-[linear-gradient(-120deg,#0B5FB0,#EFEDCE)] md:p-2 overflow-hidden">
      <div className="w-full h-full row-start-1 row-end-2 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3">
        <SideBar />
      </div>

      <div className="w-full h-full row-start-2 row-end-3 md:col-start-2 md:col-end-4 md:row-start-1 md:row-end-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <div className="w-full h-full row-start-3 row-end-4 md:col-start-1 md:col-end-4 md:row-start-3 md:row-end-4">
        <PlayingNow />
      </div>
    </main>
  );
}
export default App;

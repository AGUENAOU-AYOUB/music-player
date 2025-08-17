import { BrowserRouter, Routes, Route } from "react-router-dom";


function App(){
  <BrowserRouter>

    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/favorites" element={<Favorites/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/search/:name" element={<SearchResult/>}/>
    </Routes>

  </BrowserRouter>

}
export default App;

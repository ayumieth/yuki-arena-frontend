import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './pages/main/Main';
import Selection from './pages/selection/Selection';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Selection />} />
          <Route path="battle" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

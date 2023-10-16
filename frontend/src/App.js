import React from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Home from './Home';
import Login from './components/login';

function App() {

      return (
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      
      );
}

export default App

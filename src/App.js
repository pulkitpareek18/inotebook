import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message="This is amazing react course."/>
          <div className='container'>
            <Routes>
              <Route exact element={<Home />} path="/" />
              <Route exact element={<About />} path="/about" />
              <Route exact element={<Login />} path="/login" />
              <Route exact element={<Signup />} path="/signup" />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;

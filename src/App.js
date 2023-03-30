import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authorization from './Authorization';
import Registration from './Registration';
import Main from './Main';
import Uploading from './Uploading';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/registration' element={<Registration/>}></Route>
        <Route path='/authorization' element={<Authorization/>}></Route>
        <Route path='/uploading' element={<Uploading/>}></Route>
        <Route path='/' element={<Main/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

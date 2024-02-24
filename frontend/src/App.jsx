import { useSelector } from 'react-redux';
import DrawerExample from './components/Drawer';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Home from './pages/Home';

function App() {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  return (


    


      <BrowserRouter>
        <DrawerExample />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    

  );
}

export default App;

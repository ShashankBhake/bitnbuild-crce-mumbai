import { useSelector } from 'react-redux';
import DrawerExample from './components/Drawer';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Home from './pages/Home';
import Sales from './pages/Sales';
import Vendors from './pages/Vendors';
import Inventory from './pages/Inventory';

function App() {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  return (
      <BrowserRouter>
        <DrawerExample />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/sales' element={<Sales/>}  />
          <Route path='/vendors' element={<Vendors/>}  />
        </Routes>
      </BrowserRouter>
    

  );
}

export default App;

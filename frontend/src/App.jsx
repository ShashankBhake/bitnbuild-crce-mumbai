import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrawerExample from './components/Drawer';
import FlipCard from './login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import FileUploadPage from './pages/UploadDoc';
import Vendors from './pages/Vendors';

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
          <Route path='/dashboard' element={<Dashboard/>}  />
          <Route path={'/fileupload'} element={<FileUploadPage />} /> 
          <Route path={'/login'} element={<FlipCard />} />
          
        </Routes>
      </BrowserRouter>
    

  );
}

export default App;

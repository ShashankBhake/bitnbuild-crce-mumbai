import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrawerExample from './components/Drawer';
import Flipcard from './login';
import Home from './pages/Home';

import Sales from './pages/Sales';
import Vendors from './pages/Vendors';
import Inventory from './pages/Inventory';
import Dashboard from './pages/Dashboard'
import FileUploadPage from './pages/UploadDoc'
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
          <Route path={'/login'} element={<Flipcard />} />

        </Routes>
      </BrowserRouter>
    

  );
}

export default App;

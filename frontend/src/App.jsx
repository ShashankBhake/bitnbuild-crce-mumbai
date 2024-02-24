import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrawerExample from './components/Drawer';
import Flipcard from './login';
import Home from './pages/Home';
function App() {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  return (


    


      <BrowserRouter>
        <DrawerExample />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path={'/login'} element={<Flipcard />} />
        </Routes>
      </BrowserRouter>
    

  );
}

export default App;

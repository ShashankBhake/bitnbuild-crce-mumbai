import { useSelector } from 'react-redux';
import DrawerExample from './components/Drawer';

function App() {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  return (


    <div className="">

      {/* <ColorSwitcher /> */}
    <DrawerExample/>
      <h1 className={`${isDarkMode ? "bg-red-100" : ""} `}>Hello</h1>
    </div>

  );
}

export default App;

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login} from './pages';
import Home from './pages/Home';

import {useGlobalContext} from './context/AppContext';

function App() {
  const {isLoggedIn} = useGlobalContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

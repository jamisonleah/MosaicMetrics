import './App.css';
import HomeScreen from './containers/feature containers/views/organisms/Home';
import SignIn from './containers/feature containers/views/organisms/SignIn';
import SignUp from './containers/feature containers/views/organisms/SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomeScreen />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;

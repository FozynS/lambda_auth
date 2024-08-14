import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";
import AccountPage from "./pages/AccountPage";
import { useAuth } from "./context/useAuth";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/me" element={isAuthenticated ? <AccountPage /> : <Navigate to="/sign-in" />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/me" /> : <Navigate to="/sign-in" />} />
      </Routes>
    </Router>
  );
};

export default App;

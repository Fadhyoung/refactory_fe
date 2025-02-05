import React from 'react';
import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// IMPORT OTHERS FILES
import Dashboard from './pages/Dashboard';
import Login from './pages/Login-page';

const supabase = createClient("https://jxcstmpkezmeenrguzto.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4Y3N0bXBrZXptZWVucmd1enRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNDA3ODksImV4cCI6MjA1MTkxNjc4OX0.2w-dxd7rPJ7Mv7PiAPyJtfVpBenoMxzRMBVjn7ZXwGQ");

function App() {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      //const { data: { session } } = await supabase.auth.getSession();
      if (!setIsAuthenticated) {
        setIsAuthenticated(true);
        console.log("you are authenticated")
        navigate('/dashboard');  
      } else {
        setIsAuthenticated(false);
        console.log("you not authenticated")
        navigate('/login');        
      }
    };
    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // Optionally, show a loader or placeholder
  }

  return (
    <>
    </>
  );
}

const AppWrapper = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppWrapper;
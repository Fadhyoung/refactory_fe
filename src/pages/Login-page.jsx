import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// IMPORTS OTHERS FILES
import Dashboard from './Dashboard';
import CustomButton from "../components/buttons";

// IMPORTS ICONS
import { CiMail } from "react-icons/ci";
import { HiOutlineKey } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { MdOutlineLogin } from "react-icons/md";

// IMPORTS CONTEXTS
import { useUser } from "../context/userContext";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const [countries, setCountries] = useState([]);
  const [email, setEmail] = useState("yolo@test.com");
  const [password, setPassword] = useState("yolo12345");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setUser } = useUser();

  const handleLogin = async () => {
    setError(null);
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;      

      const userId = authData.user.id;
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (userError) throw userError;

      setUser(userData);

      console.log(userData)

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      alert(err.message)
    }
  };

  return (
    <>

    <div className="main-container w-4/5 m-auto h-screen p-5 flex flex-row bg-white">
      <div className="left-side w-[45%] flex flex-col gap-20 text-c-black">
        
        {/* LEFT SIDE */}
        <div className="w-[60%] h-full m-auto relative flex flex-col justify-center items-start gap-10">    

          {/* FLOATING LOGO */}
          <div className="w-32 absolute top-16 -left-20">
            <img src="/public/images/logofull.png"/>
          </div>      
          
          <div className="w-full">
            <h2 className="text-[2.5rem] font-bold">Selamat Datang</h2>
            <p className="font-bold text-gray-700">Masuk dan kelola dashboard Mediaverse anda</p>
          </div>

          {/* Email input */}
          <div className="w-full">
            <label className="mb-2 text-lg font-semibold" htmlFor="email">Email</label>
            <div className="flex gap-2 items-center text-black border border-gray-300 rounded-md px-3 py-2">
              <CiMail size={20} />
              <input  className="w-full py-2 outline-none text-lg font-normal placeholder-stone-400 bg-white" 
                      type="email" id="email" placeholder="Masukkan email" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          {/* Password input */}
          <div className="w-full flex flex-col justify-center">
            <label className="mb-2 text-lg font-semibold" htmlFor="password">Password</label>
            <div className="flex gap-2 items-center text-black border border-gray-300 rounded-md px-3 py-2">
              <HiOutlineKey size={20} />
              <input  className="w-full py-2 outline-none text-lg font-normal placeholder-stone-400 bg-white" 
                      type="email" id="email" placeholder="Masukkan email" onChange={(e) => setPassword(e.target.value)} />
              <HiOutlineEyeOff size={20} />
            </div>
            <button className="self-end text-sm font-semibold bg-transparent border-none">Lupa kata sandi?</button>
          </div>

          <CustomButton
            text="MASUK SEKARANG"
            onClick={handleLogin}
            variant="primary"
            size="large"
            icon={MdOutlineLogin}
          />

        </div>

      </div>

      <div className="right-side w-[55%] flex flex-col justify-center items-center border rounded-3xl overflow-hidden">
        <img className="w-full h-full object-cover self-center object-center" src="public/images/login_cover.png" />
      </div>
      
    </div>

    
    </>
  );
}

export default Login;
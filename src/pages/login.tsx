import React, { useState, useEffect } from "react";
import { CiMail } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../redux/features/auth/authThunks";
import { AppDispatch, RootState } from "../redux/store";
import Loader from "../components/loader";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
 const navigate = useNavigate()
  useEffect(() => {
    if (authState.user) {
      toast.success("User logged in successfully");
      navigate("/")
    }
    if (authState.error) {
      toast.error("Sign In Failed");
    }
  }, [authState]);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
   <>
   {authState.loading? (<Loader />):(
     <div className="login h-[90vh] flex flex-col items-center">
     <main className="max-w-[350px] w-full h-[90%] px-4 py-8 shadow-[0_0_10px_rgba(0,0,0,0.384)] flex flex-col justify-center items-stretch">
       <h1 className="tracking-[3px] uppercase text-2xl flex justify-center mb-[2rem] font-normal text-gray-700">
         Login
       </h1>

       <div className="w-full flex flex-col justify-start items-stretch gap-1">
         <div className="flex flex-row justify-between items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
           <input
             value={email}
             placeholder="Enter your email"
             onChange={(e) => setEmail(e.target.value)}
             className="border-none outline-none"
           />
           <CiMail className="h-6 w-6" />
         </div>
       </div>

       <div className="w-full flex flex-col justify-start items-stretch gap-1">
         <div className="flex flex-row justify-between items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
           <input
             type={showPassword ? "text" : "password"}
             placeholder="Enter your password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="outline-none border-none"
           />
           <button type="button" onClick={showPasswordHandler}>
             {showPassword ? <FaEyeSlash /> : <FaEye />}
           </button>
         </div>
         <Link to="/forgot-password" className="text-blue-600">
           Forgot Password?
         </Link>
       </div>

       <div className="w-full flex flex-col justify-start items-stretch gap-1">
         <button
           onClick={handleLogin}
           className="p-2 mt-2 border-none hover:opacity-80 rounded font-sans outline-none bg-blue-500 text-white w-full"
         >
           Login
         </button>
         <h3>
           Don't have an account?{" "}
           <Link to="/register" className="text-blue-500">
             Signup
           </Link>
         </h3>
       </div>

       <div className="w-full flex flex-col justify-start items-stretch gap-1">
         <p className="text-center mt-4">or</p>
         <button className="flex gap-2 justify-center mt-6 items-center w-[100%] h-12 border border-gray-700 border-opacity-50 rounded hover:bg-blue-500 hover:transition-all hover:text-white">
           <FcGoogle /> <span>Sign In with Google</span>
         </button>
         {authState.loading && <p>Loading...</p>}
       </div>
     </main>
   </div>
   )}
   </>
  );
};

export default Login;

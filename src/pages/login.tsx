import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../../firebase";
import { getUser, useRegisterMutation } from "../redux/api/userAPI";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { MessageResponse } from "../redux/types/api-types";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();



  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      
         await signInWithEmailAndPassword(auth, email, password).then(async(response)=>{
         
           const data = await getUser(response.user.uid);
           toast.success(`Welcome Back ${data.user.name}`);
           dispatch(userExist(data?.user!));
           navigate("/");
        }).catch((error)=>{
          dispatch(userNotExist());
        toast.error(error.message);
        });
      
    
  };

  const googleRegisterHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const formData = new FormData();
      formData.set('name', user.displayName!);
      formData.set('email', user.email!);
      formData.set('role', 'user');
      formData.set('_id', user.uid);
      formData.set('googlePhoto',user.photoURL!)
      const res = await register({formData});
      if (res.data) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data?.user!));
        navigate("/");
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExist());
      }
    } catch (error) {
      toast.error("Sign In Fail");
      
    }
  };

  return (
    <div className="login h-[90vh] flex flex-col items-center">
      <main className="max-w-[350px] w-full h-[90%] px-4 py-8 shadow-[0_0_10px_rgba(0,0,0,0.384)] flex flex-col gap justify-center items-stretch">
        <h1 className="tracking-[3px] uppercase text-2xl flex justify-center mb-[2rem] font-normal text-gray-700">
          Login
        </h1>
      <form onSubmit={loginHandler}>
        
        <div className="w-full flex flex-col justify-start items-stretch gap-1">
          <div className="flex flex-row justify-between items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-none outline-none w-full" />
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-stretch gap-1">
          <div className="flex flex-row justify-between items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-none outline-none w-full" />
          </div>
        </div>
       
        <div className='flex items-center justify-center mt-4 py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-opacity-75 hover:transition-all hover:cursor-pointer'>
          <button type="submit">Log In</button>
        </div>
        </form>
        <span className=" mt-4">Don't have an account?<Link className='underline text-blue-500' to={"/register"}>Register</Link></span>
        <div className="w-full flex flex-col justify-start items-stretch gap-1">
          <p className="text-center mt-2">OR</p>
          <button
            onClick={googleRegisterHandler}
            className="flex gap-2 justify-center mt-4 items-center w-[100%] h-12 border border-gray-700 border-opacity-50 rounded hover:bg-blue-500 hover:transition-all hover:text-white"
          >
            <FcGoogle /> <span>Sign In with Google</span>
          </button>
        </div>
        
      </main>
    </div>
  );
};

export default Login;

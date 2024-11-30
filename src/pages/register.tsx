import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../../firebase";
import { getUser, useRegisterMutation } from "../redux/api/userAPI";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { MessageResponse } from "../redux/types/api-types";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(sessionStorage.getItem('gender') || "");
  const [date, setDate] = useState(sessionStorage.getItem('date') || "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [register] = useRegisterMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPhoto(file);
    }
  };

  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    if(photo) formData.set("photo", photo); 
    formData.set('gender', gender);
    formData.set('role', 'user');
    formData.set('dob', date);
   
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        formData.set('_id', user.uid);
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
        toast.error("Registeration Failed")
        
      }
    
  };

  

  return (
    <div className="login py-8 flex flex-col items-center">
      <main className="max-w-[350px] w-full h-[96%] bg-white px-4 py-8 shadow-[0_0_10px_rgba(0,0,0,0.384)] flex flex-col justify-center items-stretch">
        <h1 className="tracking-[3px] uppercase text-2xl flex justify-center mb-[2rem] font-normal text-gray-700">
          Register
        </h1>
      <form onSubmit={registerHandler}>
        <div className="w-full flex flex-col justify-start items-stretch gap-1">
          <div className="flex flex-row justify-between items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border-none outline-none w-full" />
          </div>
        </div>
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
        <div className="flex flex-row justify-between items-center gap-8 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
          <label>Photo</label>
          <input
            type="file"
            required
            onChange={changeImageHandler}
            className="border-none outline-none"
          />
        </div>
        <div className="w-full flex flex-col justify-start items-stretch gap-1">
          <div className="flex flex-row justify-between items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-stretch gap-1">
          <div className="flex flex-row justify-between items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
            <label>Date of birth</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className='flex items-center justify-center mt-4 py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-opacity-75 hover:transition-all hover:cursor-pointer'>
          <button type="submit">Register Now</button>
        </div>
        </form>
        <span>Already have an account?<Link className='underline text-blue-500' to={"/login"}>Login</Link></span>
       
        
      </main>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword } from "../redux/features/auth/authThunks";
import { AppDispatch } from "../redux/store";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
 
  const dispatch = useDispatch<AppDispatch>();
  

 
const handleSend = ()=>{


    dispatch(forgotPassword({email}));
    toast.success("Email Sent Successfully")
    

}
  

  return (
  
     <div className="login h-[90vh] flex flex-col items-center">
     <main className="max-w-[350px] w-full h-[90%] px-4 py-8 shadow-[0_0_10px_rgba(0,0,0,0.384)] flex flex-col justify-center items-stretch">
       <h1 className="tracking-[3px] uppercase mt-[-190px] text-2xl flex justify-center items-start mb-[2rem] font-normal text-gray-700">
         Forgot Password
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
       <button
           onClick={handleSend}
           className="p-2 mt-8 border-none hover:opacity-80 rounded font-sans outline-none bg-blue-500 text-white w-full"
         >
           Send Mail
         </button>
     </main>
   </div>
 
   
  );
};

export default ForgotPassword;

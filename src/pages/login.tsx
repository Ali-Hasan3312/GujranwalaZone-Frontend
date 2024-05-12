import { useState } from "react"
import { FcGoogle } from "react-icons/fc"

const Login = () => {
    const [gender,setGender] = useState("")
    const [date,setDate] = useState("")
    
  return (
    <div className="login h-[90vh] flex flex-col items-center">
        <main className=" max-w-[350px] w-full h-[90%] px-4 py-8 shadow-[0_0_10px_rgba(0,0,0,0.384)]  flex flex-col justify-center items-stretch">
            <h1 className=" tracking-[3px] uppercase text-2xl flex justify-center mb-[2rem] font-normal text-gray-700">Login</h1>
            <div className=" w-full flex flex-col justify-start items-stretch gap-1">
                <label >Gender</label>
                <select value={gender} onChange={(e)=> setGender(e.target.value)} className=" p-4 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
                 <option value="">Select Gender</option>
                 <option value="male">Male</option>
                 <option value="female">Female Gender</option>
                </select>
            </div>
            <div className=" w-full flex flex-col justify-start items-stretch gap-1">
                <label>Date of birth</label>
                <input type="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                className=" p-4 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full"
                />
                
            </div>
            <div className=" w-full flex flex-col justify-start items-stretch gap-1">
                <p className=" text-center m-8">OR</p>
                <button className=" flex gap-2 justify-center items-center w-[100%] h-12 border border-gray-700 border-opacity-50 rounded">
                    <FcGoogle /> <span>Sign In with Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login
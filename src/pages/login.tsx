import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../redux/types/api-types";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gender, setGender] = useState(sessionStorage.getItem('gender') || "");
  const [date, setDate] = useState(sessionStorage.getItem('date') || "");
  const [login] = useLoginMutation();
  const auth = getAuth();

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result) {
          const user = result.user;
          const gender = sessionStorage.getItem('gender') || "";
          const date = sessionStorage.getItem('date') || "";

          const res = await login({
            name: user.displayName!,
            email: user.email!,
            photo: user.photoURL!,
            gender,
            role: "user",
            dob: date,
            _id: user.uid,
          });

          if (res.data) {
            toast.success(res.data.message);
            const data = await getUser(user.uid);
            dispatch(userExist(data?.user!));
            navigate("/");
            
            // Clear session storage after successful login
            sessionStorage.removeItem('gender');
            sessionStorage.removeItem('date');
          } else {
            const error = res.error as FetchBaseQueryError;
            const message = (error.data as MessageResponse).message;
            toast.error(message);

            dispatch(userNotExist());
          }
        }
      })
      .catch((error) => {
        console.error("Error during getRedirectResult", error);
        toast.error("Sign In Fail");
      });
  }, [auth, dispatch, login, navigate]);

  const loginHandler = async () => {
    try {
      sessionStorage.setItem('gender', gender);
      sessionStorage.setItem('date', date);
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      toast.error("Sign In Fail");
    }
  };

  return (
    <div className="login h-[90vh] flex flex-col items-center">
      <main className="max-w-[350px] w-full h-[90%] px-4 py-8 shadow-[0_0_10px_rgba(0,0,0,0.384)] flex flex-col justify-center items-stretch">
        <h1 className="tracking-[3px] uppercase text-2xl flex justify-center mb-[2rem] font-normal text-gray-700">
          Login
        </h1>

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

        <div className="w-full flex flex-col justify-start items-stretch gap-1">
          <p className="text-center mt-4">Already Signed In Once</p>
          <button
            onClick={loginHandler}
            className="flex gap-2 justify-center mt-6 items-center w-[100%] h-12 border border-gray-700 border-opacity-50 rounded hover:bg-blue-500 hover:transition-all hover:text-white"
          >
            <FcGoogle /> <span>Sign In with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

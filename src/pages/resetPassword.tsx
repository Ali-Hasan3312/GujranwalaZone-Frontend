import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../redux/features/auth/authThunks";
import { AppDispatch, RootState } from "../redux/store";
import Loader from "../components/loader";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const { loading, error, success } = useSelector((state: RootState) => state.auth);

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(resetPassword({ password, token }));
  };

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
      return;
    } 
    
     if(success){
      toast.success("Password Updated Successfully");
      navigate("/login");
     }
    
  }, [error, success, navigate]);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login h-[90vh] flex flex-col items-center">
          <main className="max-w-[350px] w-full h-[90%] px-4 py-8 shadow-[0_0_10px_rgba(0,0,0,0.384)] flex flex-col justify-center items-stretch">
            <h1 className="tracking-[3px] uppercase mt-[-190px] text-2xl flex justify-center items-start mb-[2rem] font-normal text-gray-700">
              Reset Password
            </h1>

            <form onSubmit={handleUpdate}>
              <div className="w-full flex flex-col justify-start items-stretch gap-1">
                <div className="flex flex-row justify-between items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="outline-none border-none"
                  />
                  <button type="button" onClick={showPasswordHandler}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-stretch gap-1">
                <div className="flex flex-row justify-between items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="outline-none border-none"
                  />
                  <button type="button" onClick={showPasswordHandler}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="p-2 mt-8 border-none hover:opacity-80 rounded font-sans outline-none bg-blue-500 text-white w-full"
              >
                Update Password
              </button>
            </form>
          </main>
        </div>
      )}
    </>
  );
};

export default ResetPassword;

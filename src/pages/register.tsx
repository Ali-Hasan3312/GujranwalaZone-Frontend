import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/features/auth/authThunks";
import { AppDispatch, RootState } from '../redux/store'; // Ensure you have this set up in your store configuration
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const img = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [photo, setPhoto] = useState<string>(img);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "date":
        setDate(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhoto(reader.result);
        }
      };
    }
  };

  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      date,
      gender,
      photo,
      password,
    };
    dispatch(registerUser(formData));
  };

  useEffect(()=>{
    if(authState.user){
      toast.success("User Registered Successfully")
      navigate("/login")
    }
    if(authState.error){
      toast.error("Registeration Failed")
    }

  },[handleSubmit])

  return (
    <div className="login h-[100vh] flex flex-col items-center">
      <main className="max-w-[350px] w-full h-[100%] px-4 py-8 shadow-[0_0_10px_rgba(0,0,0,0.384)] flex flex-col justify-center items-stretch">
        <form onSubmit={handleSubmit}>
          <h1 className="tracking-[3px] uppercase text-2xl flex justify-center mb-[1rem] font-normal text-gray-700">Register</h1>
          <div className="w-full flex flex-col justify-start items-stretch gap-1 my-2">
            <input
              name="name"
              value={name}
              placeholder="Enter name"
              onChange={handleChange}
              className="p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full"
            />
          </div>
          <div className="w-full flex flex-col justify-start items-stretch gap-1">
            <div className="flex flex-row justify-between items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
              <input
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={handleChange}
                className="w-full border-none outline-none"
              />
              <CiMail className="h-6 w-6" />
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-stretch gap-1">
            <input
              name="date"
              type="date"
              value={date}
              onChange={handleChange}
              className="mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full"
            />
          </div>
          <div className="w-full flex flex-col justify-start items-stretch gap-1">
            <select
              name="gender"
              value={gender}
              onChange={handleChange}
              className="p-2 mt-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full"
            >
              <option>Choose Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="w-full flex flex-col justify-start items-stretch gap-1">
            <div className="flex flex-row items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
              {photo && <img src={photo} alt="New Image" className="h-12 w-12 object-cover rounded-full" />}
              <input
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-stretch gap-1">
            <div className="flex flex-row justify-between items-center gap-2 mt-2 p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="create password"
                value={password}
                onChange={handleChange}
                className="outline-none border-none w-full"
              />
              <button onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-stretch gap-1">
            <button className="p-2 mt-2 border-none hover:opacity-80 rounded font-sans outline-none bg-blue-500 text-white w-full">
              Register
            </button>
            <h3>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></h3>
          </div>
          <div className="w-full flex flex-col justify-start items-stretch gap-1">
            <p className="text-center mt-2">or</p>
            <button type="button" className="flex gap-2 justify-center mt-2 items-center w-[100%] h-10 border border-gray-700 border-opacity-50 rounded hover:bg-blue-500 hover:transition-all hover:text-white">
              <FcGoogle /> <span>Sign In with Google</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Register;

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
interface HeroProps{
title:string;
heading:string;
image:string;
}
const HeroSlider = ({title,heading,image}:HeroProps) => {
    const navigate = useNavigate()
  return (
    <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-0 gap-8 lg:justify-between px-8">
        <div className="flex flex-col gap-4 items-start text-gray-700">
            <motion.span
            initial={{y:'20px',opacity:'0%'}}
            animate={{y:'0',opacity:'100%'}}
            transition={{duration:0.7}}
            exit={{opacity:'0%'}}
            className=" font-medium overflow-hidden">{title}</motion.span>
            <motion.h1
            initial={{x:'70px',opacity:'0%'}}
            animate={{x:'0',opacity:'100%'}}
            transition={{duration:0.7}}
            exit={{opacity:'0%'}}
            className="font-semibold text-2xl lg:text-[44px] tracking-wide leading-normal w-[70%]">{heading}</motion.h1>
            <motion.button
            initial={{y:'20px',opacity:'0%'}}
            animate={{y:'0',opacity:'100%'}}
            transition={{duration:0.7}}
            exit={{opacity:'0%'}}
            onClick={()=>navigate("/search")} className="animatedBtn overflow-hidden relative hover:border-none shadow-md shadow-blue-400 hover:text-white uppercase border border-gray-700 h-[50px] w-40 font-semibold">Shop Now</motion.button>
        </div>
        <div className="">
            <motion.img
             initial={{y:'200px',opacity:'0%'}}
             animate={{y:'0',opacity:'100%'}}
             transition={{duration:0.7}}
             exit={{y:'400px',opacity:'0'}}
            src={image} alt="" />
        </div>
    </div>
  )
}

export default HeroSlider
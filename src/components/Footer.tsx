import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo-removebg-preview.png"
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
    const ScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
  return (
    <div className=' w-full bg-zinc-800 py-4'>
       <div className="flex pt-8 gap-28 px-16 max-sm:px-4 max-sm:flex-col">
        <div className="">
        <div onClick={ScrollTop} className=" uppercase cursor-pointer relative text-white flex items-center gap-4">
        <img className="h-28 w-[7rem] object-cover" src={logo} alt="" />
            <button  className=" absolute top-0 h-20 w-24"></button>
           
        </div>
            <div className="text-white flex flex-col mt-4 gap-1">
            <span className=" uppercase font-semibold">The Warehouse</span>
            <span>Hasan Town,</span>
            <span>People's Colony,Gujranwala</span>
            {/* <span>Orpington</span> */}
            <span>Telephone: +923423010522</span>
            <Link className=" uppercase text-lg" to={"https://maps.app.goo.gl/wHJd1NphV95UNEnE7"}>View With Google Maps</Link>
        </div>
        </div>
        <div className=" h-48 w-[1px] bg-gray-300 max-sm:opacity-0 max-sm:-mt-[380px]"></div>
        <div className="grid grid-cols-2 gap-8 max-sm:ml-1 -ml-6">
        <div className=" text-white">
            <h2 className="text-base md:text-xl font-medium hover:text-blue-500 hover:cursor-pointer transition-all duration-300"
            onClick={ScrollTop}
            >Home</h2>
        </div>
        <div className=" text-white">
            <Link to={"/search"} onClick={ScrollTop} className="text-base md:text-xl font-medium hover:text-blue-500 hover:cursor-pointer transition-all duration-300">Products</Link>
        </div>
       
       
        <div className=" text-white">
            <Link to={"/contact"} onClick={ScrollTop} className="text-base md:text-xl -mt-0 md:-mt-8 font-medium hover:text-blue-500 hover:cursor-pointer transition-all duration-300 text-nowrap">Contact</Link>
        </div>
       
        <div className=" text-white">
            <Link to={"/orders"} className="text-base md:text-xl -mt-0 md:-mt-8 font-medium hover:text-blue-500 hover:cursor-pointer transition-all duration-300 text-nowrap">Orders</Link>
        </div>
        <div className=" text-white">
            <Link to={"/cart"} className="text-base md:text-xl -mt-0 md:-mt-8 font-medium hover:text-blue-500 hover:cursor-pointer transition-all duration-300 text-nowrap">Cart</Link>
        </div>
      
       
        </div>
        <div className=" h-48 w-[1px] bg-gray-300 max-sm:opacity-0 max-sm:-mt-[350px]"></div>
        <div className=" max-sm:-mt-8">
            <h2 className=" lg:text-lg text-nowrap text-white uppercase lg:font-semibold">Follow us on social media</h2>
            <div className="flex items-center gap-8 mt-4 text-xl text-white">
                <Link to={"https://www.facebook.com/profile.php?id=100094901001041"}> <FaFacebook className=" hover:text-blue-500 transition-all duration-300" /> </Link>
          <Link to={"https://www.instagram.com/chelsfieldcc1731?igsh=azhkYzJkaWljNTR0&utm_source=qr"}> <FaInstagram  className=" hover:text-blue-500 hover:cursor-pointer transition-all duration-300" /></Link>
          <Link to={"https://youtube.com/@chelsfieldcc-en8ru?si=htRWSKscg54teiXC"}> <FaYoutube  className=" hover:text-blue-500 hover:cursor-pointer transition-all duration-300" /></Link>
            </div>
        </div>
        </div>
      
    </div>
  )
}

export default Footer
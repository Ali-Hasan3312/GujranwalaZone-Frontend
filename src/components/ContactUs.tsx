import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  return (
    <>
      <div className="">
        <h1 className="text-2xl uppercase font-semibold text-center pt-4 tracking-wider text-white">
          Contact Us
        </h1>
        <div className="grid grid-cols-[70%_30%] max-sm:grid-cols-1 w-[80%] max-sm:w-[95%] mx-auto shadow-lg mt-4">
          <div className="bg-white max-sm:rounded-t-lg pb-12">
            <form className="w-[80%] max-sm:w-[90%] mx-auto mt-8">
              <h1 className="text-lg font-medium">Send Us A Message</h1>
              <div className="grid grid-cols-2 max-sm:grid-cols-1">
                <div className="h-[100px] w-[280px] mt-4">
                  <label className="text-gray-400">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-[30px] w-full border-b-[1px] outline-none focus:border-black mt-2 placeholder:text-gray-600"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="h-[100px] w-[280px] mt-4">
                  <label className="text-gray-400">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-[30px] w-full border-b-[1px] outline-none focus:border-black mt-2 placeholder:text-gray-600"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="h-[100px] w-[280px] mt-4">
                  <label className="text-gray-400">Phone *</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-[30px] w-full border-b-[1px] outline-none focus:border-black mt-2 placeholder:text-gray-600"
                    placeholder="Phone #"
                    required
                  />
                </div>
              </div>
              <div className="h-[100px] w-full mt-4">
                <label className="text-gray-400">Message *</label>
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="h-[30px] w-full border-b-[1px] outline-none focus:border-black mt-6 placeholder:text-gray-600"
                  placeholder="Write your message"
                  required
                />
              </div>
              <button
                type="submit"
                className="h-12 w-44 mt-4 hover:opacity-70 transition-all duration-300 text-white bg-blue-900"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-blue-900 pb-4 max-sm:rounded-b-lg">
            <div className="w-[80%] mx-auto text-gray-400 flex flex-col gap-4 mt-8">
              <h1 className="text-xl text-white max-sm:text-lg">Contact Information</h1>
              <p>We will be happy to help with any questions you might have about our warehouse!</p>
              <div className="flex items-start gap-4 mt-8 max-sm:mt-4">
                <FaLocationDot className="text-white text-xl" />
                <p>Hasan Town, People's Colony Gujranwala</p>
              </div>
              <div className="flex items-start gap-4 mt-8 max-sm:mt-4">
                <IoCall className="text-white text-xl" />
                <p>+923423010522</p>
              </div>
              <div className="flex items-start max-sm:flex-wrap gap-4 mt-8 max-sm:mt-4">
                <IoMdMail className="text-white text-xl" />
                <p className="max-sm:text-sm">info@technifyzone.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <hr />
          <h1 className="text-white uppercase mt-4 text-2xl font-semibold text-center">Where to find us</h1>
          <iframe
            className="w-[95%] rounded-lg md:w-[80%] mx-auto h-[400px] pb-8 object-cover mt-8"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6757.702236063077!2d74.19824073912596!3d32.127322831714125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f2a65d076744f%3A0x5c7158d968362983!2sNabi%20Pura%2C%20Gujranwala%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1732903912970!5m2!1sen!2s"
            loading="lazy"
          ></iframe>
         
        </div>
      </div>
    </>
  );
};

export default GetInTouch;

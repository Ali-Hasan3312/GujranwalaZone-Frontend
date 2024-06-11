import { MdError } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="container not-found h-[80vh] flex flex-col items-center justify-center gap-4">
      <MdError className=" text-[5rem]" />
      <h1>Page Not Found</h1>
    </div>
  );
};

export default NotFound;
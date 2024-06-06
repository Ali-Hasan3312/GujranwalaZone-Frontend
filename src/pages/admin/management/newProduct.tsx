import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../../../components/adminSideBar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../redux/utils/features";
import Loader from "../../../components/loader";

const NewProduct = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [photo, setPhoto] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Properly destructure the mutation hook
  const [newProductMutation, { isLoading }] = useNewProductMutation();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user?.user);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || stock < 0 || !category || !photo) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);

    try {
      const res = await newProductMutation({ id: user?._id!, formData });
      responseToast(res, navigate, "/admin/products");
    } catch (isError) {
      // Handle error
      console.error("Error creating product:", isError);
    }
  };

  return isLoading? (<Loader />) : (
    <div className="grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100 lg:overflow-auto md:grid-cols-[1fr]">
      <AdminSideBar />
      <main className="overflow-y-auto w-full flex flex-row justify-center p-16">
        <article className="h-[120vh] p-8 w-full max-w-96 bg-white rounded shadow-gray-700 shadow-sm m-auto">
          <form onSubmit={submitHandler} className="flex flex-col items-center gap-8">
            <h2 className="uppercase tracking-wide font-semibold">New Product</h2>
            <div className="w-full relative">
              <label className="absolute left-0 top-[-1.5rem]">Name</label>
              <input
                type="text"
                value={name}
                required
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded border border-opacity-25 outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="absolute left-0 top-[-1.5rem]">Price</label>
              <input
                type="number"
                required
                placeholder="Price"
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-2 rounded border border-opacity-25 outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="absolute left-0 top-[-1.5rem]">Stock</label>
              <input
                type="number"
                required
                placeholder="Stock"
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full p-2 rounded border border-opacity-25 outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="absolute left-0 top-[-1.5rem]">Category</label>
              <input
                type="text"
                required
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 rounded border border-opacity-25 outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="absolute left-0 top-[-1.5rem]">Photo</label>
              <input
                type="file"
                required
                onChange={changeImageHandler}
                className="w-full p-2 rounded border border-opacity-25 outline-none"
              />
            </div>
            {photo && <img src={photo} alt="New Image" className="h-20 w-20 object-cover rounded" />}
            <button type="submit" className="p-2 border-none bg-blue-700 text-white w-full rounded cursor-pointer hover:opacity-80">
              Create
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;

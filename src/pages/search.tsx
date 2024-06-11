import { useState } from "react"
import ProductCard from "../components/productCard"
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI"
import { useDispatch } from "react-redux"
import { CartItem } from "../redux/types/types"
import { toast } from "react-toastify"
import { addToCart } from "../redux/reducer/cartReducer"
import { CustomError } from "../redux/types/api-types"
import { server } from "../redux/store"

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")
  const [maxPrice, setMaxPrice] = useState(100000)
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(1)
  const {
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

 const  isPrevPage = page > 1
 const  isNextPage = page < 4

 if (isError) {
  const err = error as CustomError;
  toast.error(err.data.message);
}
if (productIsError) {
  const err = productError as CustomError;
  toast.error(err.data.message);
}
  return (
    <div className="search p-8 flex justify-start items-stretch gap-8 min-h-[93.5vh]">
      <aside className=" min-w-60 shadow-[2px_5px_10px_rgba(0,0,0,0.247)] p-8 flex flex-col justify-start items-stretch gap-4">
        <h2 className=" tracking-[3px] uppercase text-xl font-normal text-gray-700">Filters</h2>
        <div>
          <h4 className=" font-semibold">Sort</h4>
          <select value={sort} onChange={(e)=>setSort(e.target.value)} className=" p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Max Price: {maxPrice || ""}</h4>
          <input type="range"
          min={100}
          max={100000}
          value={maxPrice}
          onChange={(e)=>setMaxPrice(Number(e.target.value))}
          className=" w-full"
          />
        </div>
        <div>
          <h4 className="font-semibold">Category</h4>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className=" p-2 border border-solid border-gray-700 border-opacity-50 rounded font-sans outline-none bg-inherit w-full">
            <option value="">All</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()} 
                  </option>
                ))}
            
          </select>
        </div>
      </aside>
      <main className=" w-full px-8">
        <h1 className=" tracking-[3px] uppercase text-2xl font-normal text-gray-700">Products</h1>
        <input type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        className=" p-4 outline-none bg-inherit w-full rounded m-4 text-lg block"
        />
        <div className=" flex justify-start items-start flex-wrap overflow-y-auto no-scrollbar h-[70%]">
        {searchedData?.products.map((i) => (
              <ProductCard 
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={`${server}/${i.photo}`}
              />
            ))}
        </div>
        <article className="flex justify-center items-center gap-4">
          <button 
          disabled={!isPrevPage}
          onClick={()=>setPage((prev)=> prev-1)}
          className="flex justify-center items-center gap-4 py-1 px-3 bg-teal-800 text-white rounded-[10px] disabled:cursor-not-allowed disabled:opacity-50 "
          >Prev</button>
          <span>{page} of {searchedData?.totalPage}</span>
          <button 
          disabled={!isNextPage}
          onClick={()=>setPage((prev)=> prev+1)}
          className="flex justify-center items-center gap-4 py-1 px-3 bg-teal-800 text-white rounded-[10px] disabled:cursor-not-allowed disabled:opacity-50 "
          >Next</button>

        </article>
      </main>
    </div>
  )
}

export default Search
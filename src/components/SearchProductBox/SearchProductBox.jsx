import { Link } from "react-router-dom";
import { setIsShow } from "../../Redux/store/mobileMenu";
import { useDispatch } from "react-redux";

function SearchProductBox(product) {
  const dispatch = useDispatch();
  return (
    <Link
      onClick={() => dispatch(setIsShow(false))}
      to={`/products-info/${product.name.replaceAll(" ", "-")}`}
    >
      <div className="h-52 border border-solid border-gray-200 transition-all hover:bg-gray-100 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 group">
        <div className="flex items-center justify-between">
          <img
            loading="lazy"
            className="sm:w-32 w-24 rounded-2xl h-auto p-2 dark:opacity-80 dark:group-hover:opacity-100"
            src={product.src[0]}
            alt={product.name}
          />
          <p className="pl-5 text-rose-500 persian-font font-bold dark:text-gray-200 dark:font-medium">
            {product.price.toLocaleString()} تومان
          </p>
        </div>
        <p className="leading-6 px-2 text-sm">{product.title}</p>
      </div>
    </Link>
  );
}

export default SearchProductBox;

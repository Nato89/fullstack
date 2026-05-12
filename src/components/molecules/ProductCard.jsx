import ProductImage from "../atoms/product/ProductImage";
import ProductTitle from "../atoms/product/ProductTitle";
import ProductRate from "../atoms/product/ProductRate";
import ProductPrice from "../atoms/product/ProductPrice";
import { imageMap } from "../../assets/imageMap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const resolvedImage = imageMap[product.image] ?? product.image;

    return (
        <Link to={`/product/${product.id}`} className="font-sans block border border-gray-700 rounded-lg p-4 shadow-lg bg-[#1f2937]/60 backdrop-blur-md w-[180px] m-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300">
            <ProductImage src={resolvedImage} alt={product.title}  />
            <ProductTitle title={product.title} />
            <ProductPrice price={product.price} />
            <ProductRate rate={product.rate} />
        </Link>
    );
}
export default ProductCard;


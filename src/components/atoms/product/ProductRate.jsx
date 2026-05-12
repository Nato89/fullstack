function ProductRate({ rate }) {
  return (
    <div className="flex items-center"> 
        <span className="text-yellow-500 mr-1">★</span>
        <span className="text-gray-400">{rate}</span>
    </div>
  );
}
export default ProductRate;
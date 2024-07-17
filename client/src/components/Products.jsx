import products from '../components/Subproducts';
import ProductCard from '../components/ProductCard';
const Products = () => {
    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 p-5 mt-[80px] md:ml-56">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
};
export default Products;

import { type Product } from "@src/app/types/api";
import CatalogItem from "@src/components/catalog/CatalogItem";

interface CatalogContainerProps {
  products: Product[];
  className?: string;
}

const CatalogContainer = ({ products, className }: CatalogContainerProps) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <CatalogItem key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CatalogContainer;

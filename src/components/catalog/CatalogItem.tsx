import { validateProduct } from "@app/lib/validation/validationProduct";
import type { Product } from "@src/app/types/api";
import NoPhoto from "@assets/images/no-photo.png";
import Button from "@src/app/ui/Button";

interface CatalogItemProps {
  product?: Product | unknown;
}

const CatalogItem = ({ product }: CatalogItemProps) => {
  const item = validateProduct(product);

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="aspect-square mb-3 rounded-lg flex items-center justify-center">
        <img
          src={item.images[0] ?? NoPhoto}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">{item.brand}</span>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">*</span>
          <span className="text-sm">{item.rating}</span>
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl font-bold">{item.price.toLocaleString()} ₽</span>
        {item.oldPrice && item.oldPrice > item.price && (
          <span className="line-through text-sm">{item.oldPrice.toLocaleString()} ₽</span>
        )}
      </div>

      <div className={`text-sm ${item.inStock ? "text-green-600" : "text-red-600"}`}>
        {item.inStock ? "В наличии" : "Нет в наличии"}
      </div>

      <Button disabled={true}>{item.inStock ? "В корзину" : "Нет в наличии"}</Button>
      {/* <Button disabled={!item.inStock}>{item.inStock ? "В корзину" : "Нет в наличии"}</Button> */}
    </div>
  );
};

export default CatalogItem;

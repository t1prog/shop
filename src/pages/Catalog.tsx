import { productService } from "@src/app/services/productService";
import Button from "@src/app/ui/Button";

const Catalog = () => {
  const loadProducts = async () => {
    try {
      const res = await productService.getProducts();
      console.log(res?.products);
      console.log(res?.total);
      console.log(res?.hasMore);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };
  return (
    <div>
      <h1>Каталог</h1>
      <Button onClick={loadProducts}>Выгрузить в консоль</Button>
    </div>
  );
};

export default Catalog;

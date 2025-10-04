import { productService } from "@src/app/services/productService";
import { useEffect, useState, useCallback } from "react";
import { type Product } from "@src/app/types/api";
import CatalogContainer from "@src/components/catalog/CatalogContainer";
import Filters from "@components/catalog/Filter";
import Button from "@src/app/ui/Button";

const Catalog = () => {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({});
  const [initialLoad, setInitialLoad] = useState(false);

  const loadProducts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await productService.getProducts({
        offset,
        ...filters,
      });

      if (!response?.products) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const newProducts = response.products;

      console.log(response);

      if (newProducts.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      setProducts((prev) => [...prev, ...newProducts]);

      if (!response.hasMore) {
        setOffset(0);
        setHasMore(true);
      } else {
        setOffset((prev) => prev + newProducts.length);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [offset, loading, filters]);

  // Сброс при изменении фильтров
  useEffect(() => {
    setProducts([]);
    setOffset(0);
    setHasMore(true);
    setInitialLoad(false);
  }, [filters]);

  // Первая загрузка
  useEffect(() => {
    if (!initialLoad) {
      setInitialLoad(true);
      loadProducts();
    }
  }, [loadProducts, initialLoad]);

  return (
    <>
      <h1>Каталог</h1>
      <Button onClick={loadProducts} disabled={loading || !hasMore}>
        {loading ? "Загрузка..." : "Загрузить ещё"}
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        <div className="col-span-1">
          <div className="sticky top-4 pr-4">
            <Filters filters={filters} onFiltersChange={setFilters} />
          </div>
        </div>
        <div className="col-span-2">
          <CatalogContainer products={products} />
          {loading && <div>Загрузка</div>}
          {!hasMore && products.length === 0 && <div>Товары не найдены</div>}
          {!hasMore && products.length > 0 && <div>Все товары загружены</div>}
        </div>
      </div>
    </>
  );
};

export default Catalog;

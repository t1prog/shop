import {
  PRODUCT_SORT_OPTIONS,
  PRODUCT_CATEGORIES,
  CATEGORY_NAMES,
} from "@app/constants/constProduct";

import type { ProductSortOption } from "@src/app/types/api";
import Button from "@src/app/ui/Button";

interface FiltersState {
  category?: string;
  brand?: string;
  sort?: ProductSortOption;
  inStock?: "true" | "false";
  isNew?: "true" | "false";
  isPopular?: "true" | "false";
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
interface FiltersProps {
  filters?: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
}

const Filters = ({ filters = {}, onFiltersChange }: FiltersProps) => {
  const updateFilter = (key: string, value: string | null) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Сортировка</h4>
        <select
          value={filters.sort || ""}
          onChange={(e) => updateFilter("sort", e.target.value || null)}
          className="w-full p-2 border rounded"
        >
          <option value="">По умолчанию</option>
          <option value={PRODUCT_SORT_OPTIONS.POPULAR}>Популярные</option>
          <option value={PRODUCT_SORT_OPTIONS.PRICE_ASC}>Цена по возрастанию</option>
          <option value={PRODUCT_SORT_OPTIONS.PRICE_DESC}>Цена по убыванию</option>
          <option value={PRODUCT_SORT_OPTIONS.NEWEST}>Новинки</option>
          <option value={PRODUCT_SORT_OPTIONS.RATING}>По рейтингу</option>
        </select>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Категории</h4>
        <div className="space-y-1">
          {Object.entries(PRODUCT_CATEGORIES).map(([, value]) => (
            <Button
              key={value}
              onClick={() => updateFilter("category", filters.category === value ? null : value)}
              className={`block w-full text-left p-2 rounded text-sm`}
              disabled={filters.category === value}
            >
              {CATEGORY_NAMES[value]}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Фильтры</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock === "true"}
              onChange={(e) => updateFilter("inStock", e.target.checked ? "true" : null)}
              className="mr-2"
            />
            В наличии
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.isNew === "true"}
              onChange={(e) => updateFilter("isNew", e.target.checked ? "true" : null)}
              className="mr-2"
            />
            Новинки
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.isPopular === "true"}
              onChange={(e) => updateFilter("isPopular", e.target.checked ? "true" : null)}
              className="mr-2"
            />
            Популярные
          </label>
        </div>
      </div>

      {(filters?.category ||
        filters?.sort ||
        filters?.inStock ||
        filters?.isNew ||
        filters?.isPopular) && (
        <Button
          onClick={() => onFiltersChange({})}
          className="w-full p-2 border border-red-300 text-red-600 rounded"
        >
          Сбросить фильтры
        </Button>
      )}
    </div>
  );
};

export default Filters;

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { brands } from "../data/brands";
import { products } from "../data/products";

const fabrics = ["Lawn", "Cotton", "Silk", "Chiffon", "Linen", "Wool"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
const occasions = ["Casual", "Formal", "Festive", "Bridal"];

export default function ShopPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([1500, 15000]);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFilter = <T,>(arr: T[], setArr: (v: T[]) => void, val: T) => {
    setArr(arr.includes(val) ? arr.filter((i) => i !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedBrands.length)
      result = result.filter((p) => selectedBrands.includes(p.brand));
    if (selectedFabrics.length)
      result = result.filter((p) => selectedFabrics.includes(p.fabric));
    if (selectedSizes.length)
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s)),
      );
    if (selectedOccasions.length)
      result = result.filter((p) => selectedOccasions.includes(p.occasion));
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a) => (a.isNew ? -1 : 1));
        break;
    }
    return result;
  }, [
    selectedBrands,
    selectedFabrics,
    selectedSizes,
    selectedOccasions,
    priceRange,
    sortBy,
  ]);

  const activeFilterCount =
    selectedBrands.length +
    selectedFabrics.length +
    selectedSizes.length +
    selectedOccasions.length;

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedFabrics([]);
    setSelectedSizes([]);
    setSelectedOccasions([]);
    setPriceRange([1500, 15000]);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Price */}
      <div>
        <h4 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3">
          Price Range
        </h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={1500}
          max={15000}
          step={500}
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Rs. {priceRange[0].toLocaleString()}</span>
          <span>Rs. {priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3">
          Brand
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand, i) => (
            <div key={brand.id} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.name)}
                onCheckedChange={() =>
                  toggleFilter(selectedBrands, setSelectedBrands, brand.name)
                }
                data-ocid={`shop.filter.brand.checkbox.${i + 1}`}
              />
              <Label
                htmlFor={`brand-${brand.id}`}
                className="text-sm cursor-pointer"
              >
                {brand.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Fabric */}
      <div>
        <h4 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3">
          Fabric
        </h4>
        <div className="space-y-2">
          {fabrics.map((fabric) => (
            <div key={fabric} className="flex items-center gap-2">
              <Checkbox
                id={`fabric-${fabric}`}
                checked={selectedFabrics.includes(fabric)}
                onCheckedChange={() =>
                  toggleFilter(selectedFabrics, setSelectedFabrics, fabric)
                }
              />
              <Label
                htmlFor={`fabric-${fabric}`}
                className="text-sm cursor-pointer"
              >
                {fabric}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() =>
                toggleFilter(selectedSizes, setSelectedSizes, size)
              }
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-emerald-700 text-white border-emerald-700"
                  : "border-border hover:border-emerald-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <h4 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3">
          Occasion
        </h4>
        <div className="space-y-2">
          {occasions.map((occ) => (
            <div key={occ} className="flex items-center gap-2">
              <Checkbox
                id={`occ-${occ}`}
                checked={selectedOccasions.includes(occ)}
                onCheckedChange={() =>
                  toggleFilter(selectedOccasions, setSelectedOccasions, occ)
                }
              />
              <Label htmlFor={`occ-${occ}`} className="text-sm cursor-pointer">
                {occ}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-emerald-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold">Shop All</h1>
          <p className="text-emerald-100 text-sm mt-1">
            Discover Pakistan's finest ladies fashion
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg text-sm hover:border-emerald-700 transition-colors md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <p className="text-sm text-muted-foreground">
              {filtered.length} products found
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Sort by:
            </span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44" data-ocid="shop.sort.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedBrands.map((b) => (
              <span
                key={b}
                className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full"
              >
                {b}{" "}
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter(selectedBrands, setSelectedBrands, b)
                  }
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedFabrics.map((f) => (
              <span
                key={f}
                className="flex items-center gap-1 bg-gold/20 text-foreground text-xs px-3 py-1 rounded-full"
              >
                {f}{" "}
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter(selectedFabrics, setSelectedFabrics, f)
                  }
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-maroon hover:underline"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 border border-border sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs text-maroon hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <button
                type="button"
                aria-label="Close filters"
                className="absolute inset-0 bg-black/50"
                onClick={() => setFiltersOpen(false)}
              />

              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-5 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold">Filters</h3>
                  <button type="button" onClick={() => setFiltersOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterPanel />
                <button
                  type="button"
                  className="w-full mt-6 bg-emerald-700 text-white py-3 rounded-xl font-semibold"
                  onClick={() => setFiltersOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20" data-ocid="shop.empty_state">
                <p className="text-4xl mb-4">👗</p>
                <h3 className="font-heading font-bold text-xl mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="bg-emerald-700 text-white px-6 py-2 rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

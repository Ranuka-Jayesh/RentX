import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { vehicles, vehicleTypes, provinces } from "@/data/vehicles";
import VehicleCard, { VehicleCardSkeleton } from "@/components/VehicleCard";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Draft state lives here so dragging only re-renders this component, not the whole page. */
function PriceRangeSlider({
  value,
  onCommit,
}: {
  value: number;
  onCommit: (v: number) => void;
}) {
  const [draft, setDraft] = useState(value);
  useEffect(() => {
    setDraft(value);
  }, [value]);
  return (
    <div>
      <h4 className="font-label text-muted-foreground mb-3">Max Price: {formatCurrency(draft)}/day</h4>
      <input
        type="range"
        min={10}
        max={250}
        step={5}
        value={draft}
        onChange={(e) => setDraft(Number(e.target.value))}
        onMouseUp={() => onCommit(draft)}
        onTouchEnd={() => onCommit(draft)}
        onPointerUp={() => onCommit(draft)}
        className="w-full accent-primary cursor-grab active:cursor-grabbing touch-none"
      />
    </div>
  );
}

/** Draft state lives here so dragging only re-renders this component, not the whole page. */
function SeatsRangeSlider({
  value,
  onCommit,
}: {
  value: number;
  onCommit: (v: number) => void;
}) {
  const [draft, setDraft] = useState(value);
  useEffect(() => {
    setDraft(value);
  }, [value]);
  return (
    <div>
      <h4 className="font-label text-muted-foreground mb-3">Min Seats: {draft}</h4>
      <input
        type="range"
        min={1}
        max={14}
        value={draft}
        onChange={(e) => setDraft(Number(e.target.value))}
        onMouseUp={() => onCommit(draft)}
        onTouchEnd={() => onCommit(draft)}
        onPointerUp={() => onCommit(draft)}
        className="w-full accent-primary cursor-grab active:cursor-grabbing touch-none"
      />
    </div>
  );
}

const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

export default function SearchPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState("rating");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);
  const [minSeats, setMinSeats] = useState(1);
  const [driverOnly, setDriverOnly] = useState(false);
  const [transmission, setTransmission] = useState("");

  // Simulate loading
  useState(() => {
    setTimeout(() => setLoading(false), 1200);
  });

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => {
      if (selectedTypes.length && !selectedTypes.includes(v.type)) return false;
      if (selectedProvince && v.province !== selectedProvince) return false;
      if (v.pricePerDay > maxPrice) return false;
      if (v.seats < minSeats) return false;
      if (driverOnly && !v.hasDriverOption) return false;
      if (transmission && v.transmission !== transmission) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sort === "price-asc") return a.pricePerDay - b.pricePerDay;
      if (sort === "price-desc") return b.pricePerDay - a.pricePerDay;
      if (sort === "rating") return b.rating - a.rating;
      return b.year - a.year;
    });

    return result;
  }, [selectedTypes, selectedProvince, maxPrice, minSeats, driverOnly, transmission, sort]);

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const applyFilters = () => {
    setFiltersOpen(false);
    toast({ title: "Filters applied", description: `${filtered.length} vehicles found` });
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Vehicle type */}
      <div>
        <h4 className="font-label text-muted-foreground mb-3">Vehicle Type</h4>
        <div className="flex flex-wrap gap-2">
          {vehicleTypes.map((t) => (
            <button
              key={t}
              onClick={() => toggleType(t)}
              className={`chip text-xs capitalize ${selectedTypes.includes(t) ? "gradient-primary text-primary-foreground" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Province */}
      <div>
        <h4 className="font-label text-muted-foreground mb-3">Province</h4>
        <Select
          value={selectedProvince || "__all__"}
          onValueChange={(v) => setSelectedProvince(v === "__all__" ? "" : v)}
        >
          <SelectTrigger className="w-full rounded-lg bg-secondary border-0 text-foreground h-9 px-3 focus:ring-2 focus:ring-primary/30">
            <SelectValue placeholder="All Provinces" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Provinces</SelectItem>
            {provinces.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price range */}
      <PriceRangeSlider value={maxPrice} onCommit={setMaxPrice} />

      {/* Seats */}
      <SeatsRangeSlider value={minSeats} onCommit={setMinSeats} />

      {/* Transmission */}
      <div>
        <h4 className="font-label text-muted-foreground mb-3">Transmission</h4>
        <div className="flex gap-2">
          {["", "automatic", "manual"].map((t) => (
            <button
              key={t}
              onClick={() => setTransmission(t)}
              className={`chip text-xs capitalize ${transmission === t ? "gradient-primary text-primary-foreground" : ""}`}
            >
              {t || "Any"}
            </button>
          ))}
        </div>
      </div>

      {/* Driver */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={driverOnly}
          onChange={(e) => setDriverOnly(e.target.checked)}
          className="w-4 h-4 rounded accent-primary"
        />
        <span className="text-sm text-foreground">Driver available only</span>
      </label>

      <button onClick={applyFilters} className="w-full py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm">
        Apply Filters
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Search Vehicles</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} vehicles available</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[11rem] min-w-[11rem] rounded-lg bg-secondary border-0 text-foreground h-9 px-4 focus:ring-2 focus:ring-primary/30">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop filters */}
        <div className="hidden lg:block w-72 shrink-0">
          <div className="glass-card sticky top-24">
            <h3 className="font-heading font-semibold text-foreground mb-6">Filters</h3>
            <FilterPanel />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <VehicleCardSkeleton key={i} />)
              : filtered.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
          </div>
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No vehicles match your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm lg:hidden"
            onClick={() => setFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-80 glass p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading font-semibold text-foreground">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <FilterPanel />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

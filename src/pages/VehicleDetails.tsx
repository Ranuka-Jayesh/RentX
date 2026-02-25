import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Users, Fuel, Settings2, MapPin, Shield, Calendar,
  ChevronLeft, Clock, ChevronRight, Snowflake, Navigation,
  Bluetooth, Plug, Baby, ShieldCheck, UserRound, Car, Phone,
} from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import {
  addMonths,
  subMonths,
  startOfMonth,
  getDaysInMonth,
  getISODay,
  format,
  isSameDay,
  isAfter,
  differenceInDays,
  startOfDay,
} from "date-fns";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Returns booked date keys (yyyy-MM-dd) for the given month for demo. */
function getBookedDatesForMonth(month: Date): Set<string> {
  const set = new Set<string>();
  const y = month.getFullYear();
  const m = month.getMonth();
  [5, 6, 7, 12, 13, 19, 20, 21].forEach((d) => {
    if (d <= getDaysInMonth(month)) set.add(format(new Date(y, m, d), "yyyy-MM-dd"));
  });
  return set;
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-2-2.2-3.3C13 5.6 11.7 5 10.5 5H5.8C4.6 5 3.5 5.8 3.2 7L2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

export default function VehicleDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const vehicle = vehicles.find((v) => v.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [calendarMonth, setCalendarMonth] = useState(() => startOfMonth(new Date()));
  const [pickStart, setPickStart] = useState<Date | null>(null);
  const [pickEnd, setPickEnd] = useState<Date | null>(null);

  const images = vehicle?.images?.filter((src) => src && !src.endsWith("placeholder.svg")) ?? [];
  const hasImages = images.length > 0;
  const mainImage = hasImages ? images[selectedImageIndex % images.length] : null;

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id]);

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Vehicle Not Found</h1>
        <Link to="/search" className="text-primary hover:underline">Browse all vehicles</Link>
      </div>
    );
  }

  const numDays =
    pickStart && pickEnd
      ? Math.max(1, differenceInDays(pickEnd, pickStart) + 1)
      : pickStart
        ? 1
        : 3;
  const subtotal = vehicle.pricePerDay * numDays;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const currentMonthStart = startOfMonth(new Date());
  const canGoToPrevMonth = isAfter(calendarMonth, currentMonthStart);
  const firstDay = startOfMonth(calendarMonth);
  const daysInMonth = getDaysInMonth(calendarMonth);
  const offset = getISODay(firstDay) - 1;
  const bookedInMonth = getBookedDatesForMonth(calendarMonth);
  const calendarCells: (Date | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), i + 1)),
  ];

  const handleDateClick = (d: Date) => {
    const key = format(d, "yyyy-MM-dd");
    if (bookedInMonth.has(key)) return;
    if (!pickStart || (pickStart && pickEnd)) {
      setPickStart(startOfDay(d));
      setPickEnd(null);
      return;
    }
    const start = startOfDay(pickStart);
    const end = startOfDay(d);
    if (end < start) {
      setPickStart(end);
      setPickEnd(start);
    } else {
      setPickEnd(end);
    }
  };

  const isInRange = (d: Date) => {
    if (!pickStart || !pickEnd) return false;
    const t = startOfDay(d);
    const s = startOfDay(pickStart);
    const e = startOfDay(pickEnd);
    return (t >= s && t <= e) || (t >= e && t <= s);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/search" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to search
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left */}
        <div className="flex-1">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Gallery */}
            <div className="glass-card mb-6">
              <div className="relative h-64 sm:h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden flex items-center justify-center mb-4 group">
                <AnimatePresence mode="wait">
                  {mainImage ? (
                    <motion.img
                      key={mainImage}
                      src={mainImage}
                      alt={vehicle.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <CarIcon className="w-32 h-32 text-primary/20" />
                  )}
                </AnimatePresence>
                {hasImages && images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedImageIndex((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedImageIndex((i) => (i + 1) % images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {hasImages ? (
                  images.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(i)}
                      className={`w-20 h-14 rounded-lg shrink-0 overflow-hidden flex items-center justify-center transition-all duration-200 ${
                        i === selectedImageIndex
                          ? "ring-2 ring-primary bg-primary/10 scale-[1.02]"
                          : "bg-secondary hover:ring-2 hover:ring-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))
                ) : (
                  <div className="w-20 h-14 rounded-lg shrink-0 flex items-center justify-center bg-secondary">
                    <CarIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="glass-card mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">{vehicle.name}</h1>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {vehicle.location}, {vehicle.province}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-heading font-bold text-lg text-foreground">{vehicle.rating}</span>
                  <span className="text-sm text-muted-foreground">({vehicle.reviewCount})</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{vehicle.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Users, label: "Seats", value: vehicle.seats },
                  { icon: Settings2, label: "Transmission", value: vehicle.transmission },
                  { icon: Fuel, label: "Fuel", value: vehicle.fuel },
                  { icon: Calendar, label: "Year", value: vehicle.year },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-lg bg-secondary text-center">
                    <item.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="font-label text-muted-foreground">{item.label}</p>
                    <p className="font-heading font-semibold text-foreground capitalize">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="glass-card mb-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Features & Includes</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Snowflake, label: "Air Conditioning" },
                  { icon: Navigation, label: "GPS Navigation" },
                  { icon: Bluetooth, label: "Bluetooth Audio" },
                  { icon: Plug, label: "USB Charging" },
                  { icon: Baby, label: "Child Seat Available" },
                  { icon: ShieldCheck, label: "Insurance Included" },
                  { icon: vehicle.hasDriverOption ? UserRound : Car, label: vehicle.hasDriverOption ? "Driver Available" : "Self-Drive Only" },
                  { icon: Phone, label: "24/7 Roadside Assist" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-foreground">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Availability calendar */}
            <div className="glass-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-foreground">Availability</h3>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCalendarMonth((m) => subMonths(m, 1))}
                    disabled={!canGoToPrevMonth}
                    className="p-2 rounded-lg hover:bg-secondary text-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-heading font-medium text-foreground min-w-[10rem] text-center">
                    {format(calendarMonth, "MMMM yyyy")}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCalendarMonth((m) => addMonths(m, 1))}
                    className="p-2 rounded-lg hover:bg-secondary text-foreground transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {WEEKDAY_LABELS.map((d) => (
                  <span key={d} className="font-label text-muted-foreground py-1 text-xs">{d}</span>
                ))}
                {calendarCells.map((cell, i) => {
                  if (!cell) return <div key={`empty-${i}`} />;
                  const key = format(cell, "yyyy-MM-dd");
                  const booked = bookedInMonth.has(key);
                  const selected = (pickStart && isSameDay(cell, pickStart)) || (pickEnd && isSameDay(cell, pickEnd));
                  const inRange = isInRange(cell);
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={booked}
                      onClick={() => handleDateClick(cell)}
                      className={`py-2 rounded-lg text-sm transition-colors ${
                        booked
                          ? "bg-destructive/10 text-destructive line-through cursor-not-allowed"
                          : selected
                            ? "bg-primary text-primary-foreground font-semibold"
                            : inRange
                              ? "bg-primary/20 text-foreground"
                              : "bg-secondary text-foreground hover:bg-primary/10 cursor-pointer"
                      }`}
                    >
                      {format(cell, "d")}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-secondary" /> Available</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-destructive/20" /> Booked</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-primary" /> Selected</span>
              </div>
              {(pickStart || pickEnd) && (
                <p className="mt-3 text-sm text-foreground">
                  {pickStart && format(pickStart, "MMM d, yyyy")}
                  {pickEnd && ` — ${format(pickEnd, "MMM d, yyyy")}`}
                  {pickStart && !pickEnd && " (click another date for range)"}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sticky Booking Summary */}
        <div className="w-full lg:w-80">
          <div className="glass-card sticky top-24">
            <h3 className="font-heading font-semibold text-foreground mb-4">Booking Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{formatCurrency(vehicle.pricePerDay)} × {numDays} days</span>
                <span className="text-foreground">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service fee</span>
                <span className="text-foreground">{formatCurrency(serviceFee)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-heading font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              onClick={() => toast({ title: "Booking requested!", description: "This is a demo — no real booking made." })}
              className="w-full py-3 rounded-lg gradient-primary text-primary-foreground font-medium text-sm mb-3"
            >
              Reserve Now
            </button>
            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" /> Free cancellation up to 24h before
            </p>

            <div className="mt-6 p-3 rounded-lg bg-secondary">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Clock className="w-4 h-4 text-accent" />
                <span>Usually responds in 30 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

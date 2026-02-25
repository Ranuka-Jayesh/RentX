import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Users, Fuel, Settings2, MapPin } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { formatCurrency } from "@/lib/utils";

export function VehicleCardSkeleton() {
  return (
    <div className="glass-card animate-pulse">
      <div className="h-48 bg-muted rounded-lg mb-4" />
      <div className="h-5 bg-muted rounded w-3/4 mb-2" />
      <div className="h-4 bg-muted rounded w-1/2 mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-muted rounded-full w-16" />
        <div className="h-6 bg-muted rounded-full w-16" />
        <div className="h-6 bg-muted rounded-full w-16" />
      </div>
      <div className="h-8 bg-muted rounded w-1/3" />
    </div>
  );
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link to={`/vehicle/${vehicle.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="glass-card group cursor-pointer block"
      >
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
          {vehicle.images?.[0] && !vehicle.images[0].endsWith("placeholder.svg") ? (
            <img
              src={vehicle.images[0]}
              alt={vehicle.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Car className="w-20 h-20 text-primary/30" />
          )}
          {vehicle.hasDriverOption && (
            <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              Driver Available
            </span>
          )}
          <span className="absolute bottom-2 right-2 z-10 font-label bg-card/80 backdrop-blur-sm px-2 py-1 rounded-md text-foreground">
            {vehicle.type}
          </span>
        </div>

        {/* Info */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-foreground">{vehicle.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-foreground">{vehicle.rating}</span>
            <span className="text-muted-foreground">({vehicle.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5" />
          {vehicle.location}, {vehicle.province}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="chip text-xs">
            <Users className="w-3 h-3" /> {vehicle.seats}
          </span>
          <span className="chip text-xs">
            <Settings2 className="w-3 h-3" /> {vehicle.transmission}
          </span>
          <span className="chip text-xs">
            <Fuel className="w-3 h-3" /> {vehicle.fuel}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-heading font-bold text-foreground">{formatCurrency(vehicle.pricePerDay)}</span>
            <span className="text-sm text-muted-foreground">/day</span>
          </div>
          <span className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium group-hover:shadow-lg transition-shadow">
            Book Now
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

function Car(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-2-2.2-3.3C13 5.6 11.7 5 10.5 5H5.8C4.6 5 3.5 5.8 3.2 7L2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

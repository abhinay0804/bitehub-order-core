import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RestaurantCardProps {
  id: string;
  name: string;
  description: string;
  image_url: string;
  cuisine_type: string;
  rating: number;
  delivery_time: string;
}

export const RestaurantCard = ({
  id,
  name,
  description,
  image_url,
  cuisine_type,
  rating,
  delivery_time,
}: RestaurantCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1"
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image_url || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
            <Star className="h-3 w-3 fill-current" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{cuisine_type}</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{delivery_time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

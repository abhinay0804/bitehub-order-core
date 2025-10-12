import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_vegetarian: boolean;
  quantity?: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const MenuItemCard = ({
  name,
  description,
  price,
  image_url,
  is_vegetarian,
  quantity = 0,
  onAdd,
  onRemove,
}: MenuItemCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <div className="flex items-start gap-2 mb-2">
            {is_vegetarian && (
              <Badge variant="secondary" className="bg-secondary">
                Veg
              </Badge>
            )}
            <h3 className="font-semibold text-base">{name}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
          <p className="font-bold text-primary">₹{price.toFixed(2)}</p>
        </div>
        
        <div className="relative w-24 h-24 flex-shrink-0">
          <img
            src={image_url || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
          {quantity === 0 ? (
            <Button
              size="sm"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-8 px-4 font-semibold shadow-md"
              onClick={onAdd}
            >
              ADD
            </Button>
          ) : (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary text-primary-foreground rounded-md shadow-md">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 hover:bg-primary-foreground/20"
                onClick={onRemove}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold min-w-[20px] text-center">{quantity}</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 hover:bg-primary-foreground/20"
                onClick={onAdd}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

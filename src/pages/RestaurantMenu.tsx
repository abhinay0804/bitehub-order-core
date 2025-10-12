import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { MenuItemCard } from "@/components/MenuItemCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_vegetarian: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRestaurantDetails();
      fetchMenuItems();
    }
  }, [id]);

  const fetchRestaurantDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setRestaurant(data);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("restaurant_id", id)
        .eq("is_available", true);

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: `${item.name} added to your cart`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const getItemQuantity = (itemId: string) => {
    return cart.find((i) => i.id === itemId)?.quantity || 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleViewCart = () => {
    localStorage.setItem("cart", JSON.stringify({ items: cart, restaurantId: id }));
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <Navbar />
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate("/restaurants")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Restaurants
        </Button>

        {restaurant && (
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={restaurant.image_url || "/placeholder.svg"}
                alt={restaurant.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
                <p className="text-muted-foreground">{restaurant.description}</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span>{restaurant.cuisine_type}</span>
                  <span>★ {restaurant.rating}</span>
                  <span>{restaurant.delivery_time}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              {...item}
              quantity={getItemQuantity(item.id)}
              onAdd={() => addToCart(item)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg">
          <div className="container py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{totalItems} items</p>
                <p className="text-lg font-bold">₹{totalAmount.toFixed(2)}</p>
              </div>
              <Button onClick={handleViewCart} size="lg" className="gap-2">
                <ShoppingCart className="h-5 w-5" />
                View Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;

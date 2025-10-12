import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const restaurantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z.string().max(500),
  address: z.string().min(10).max(200),
  phone: z.string().min(10).max(15),
  cuisine_type: z.string().min(2).max(50),
});

const Admin = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    cuisine_type: "",
    image_url: "",
  });

  const handleAddRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validation = restaurantSchema.parse(restaurantData);
      
      const { error } = await supabase.from("restaurants").insert([
        {
          name: validation.name,
          description: validation.description,
          address: validation.address,
          phone: validation.phone,
          cuisine_type: validation.cuisine_type,
          image_url: restaurantData.image_url || "/placeholder.svg",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Restaurant added successfully",
      });

      setRestaurantData({
        name: "",
        description: "",
        address: "",
        phone: "",
        cuisine_type: "",
        image_url: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add restaurant",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

        <Tabs defaultValue="restaurants">
          <TabsList className="mb-8">
            <TabsTrigger value="restaurants">Manage Restaurants</TabsTrigger>
            <TabsTrigger value="orders">Manage Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants">
            <Card>
              <CardHeader>
                <CardTitle>Add New Restaurant</CardTitle>
                <CardDescription>Add a new restaurant to the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddRestaurant} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Restaurant Name</Label>
                      <Input
                        id="name"
                        value={restaurantData.name}
                        onChange={(e) =>
                          setRestaurantData({ ...restaurantData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cuisine">Cuisine Type</Label>
                      <Input
                        id="cuisine"
                        value={restaurantData.cuisine_type}
                        onChange={(e) =>
                          setRestaurantData({ ...restaurantData, cuisine_type: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={restaurantData.description}
                      onChange={(e) =>
                        setRestaurantData({ ...restaurantData, description: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={restaurantData.address}
                        onChange={(e) =>
                          setRestaurantData({ ...restaurantData, address: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={restaurantData.phone}
                        onChange={(e) =>
                          setRestaurantData({ ...restaurantData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL (optional)</Label>
                    <Input
                      id="image"
                      value={restaurantData.image_url}
                      onChange={(e) =>
                        setRestaurantData({ ...restaurantData, image_url: e.target.value })
                      }
                    />
                  </div>

                  <Button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Restaurant"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>View and manage all orders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Order management features coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

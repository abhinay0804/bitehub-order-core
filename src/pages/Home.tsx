import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { Utensils, ShoppingBag, Truck } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--gradient-hero)]">
        <div className="container grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Order Your Favorite{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Food Online
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover the best restaurants, browse menus, and get your food delivered fast.
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                onClick={() => navigate("/restaurants")}
              >
                Explore Restaurants
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                Sign Up Now
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img
              src={heroImage}
              alt="Delicious food"
              className="rounded-2xl shadow-[var(--shadow-elevated)] w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
              <Utensils className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">Browse Restaurants</h3>
            <p className="text-muted-foreground">
              Explore a wide variety of restaurants and cuisines in your area
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">Choose Your Meal</h3>
            <p className="text-muted-foreground">
              Add your favorite dishes to cart and customize your order
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">Fast Delivery</h3>
            <p className="text-muted-foreground">
              Get your food delivered hot and fresh to your doorstep
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-20">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Order?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy customers ordering delicious food every day
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={() => navigate("/restaurants")}
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;

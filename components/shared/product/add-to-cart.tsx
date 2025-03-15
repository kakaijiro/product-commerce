"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { CartItem } from "@/types";
import { addItemToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error("", {
        description: res.message,
        style: {
          backgroundColor: "#f9bbbb",
        },
        duration: 5000,
      });
      return;
    }

    // handle success add to cart
    toast.success("", {
      description: `${item.name} added to cart`,
      action: {
        label: "Go to cart",
        onClick: () => router.push("/cart"),
      },
      style: {
        backgroundColor: "#adfdca",
      },
      duration: 10000,
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus />
      Add To Cart
    </Button>
  );
};

export default AddToCart;

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";

import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res?.success) {
      toast.error("", {
        description: res?.message,
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

  // handle to remove item from cart
  async function handleRemoveFromCart() {
    const res = await removeItemFromCart(item.productId);

    if (!res?.success) {
      toast.error("", {
        description: res?.message,
        style: {
          backgroundColor: "#f9bbbb",
        },
        duration: 5000,
      });
      return;
    }

    toast.success("", {
      description: res?.message,
      action: {
        label: "Go to cart",
        onClick: () => router.push("/cart"),
      },
      style: {
        backgroundColor: "#99e9f2",
      },
      duration: 10000,
    });
    return;
  }

  // check if item is in cart
  const existItem =
    cart && cart.items.find((el) => el.productId === item.productId);
  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus />
      Add To Cart
    </Button>
  );
};

export default AddToCart;

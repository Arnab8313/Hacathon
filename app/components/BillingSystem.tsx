"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function BillingSystem() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", quantity: "" });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = () => {
    const price = parseFloat(newItem.price);
    const quantity = parseInt(newItem.quantity);

    if (!newItem.name.trim() || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) return;

    const existingItem = cart.find((item) => item.name.toLowerCase() === newItem.name.toLowerCase());

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === existingItem.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { id: Date.now(), name: newItem.name, price, quantity }]);
    }

    setNewItem({ name: "", price: "", quantity: "" });
  };

  const removeItemFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="space-y-6 p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Billing System</h2>

      {/* Input Fields */}
      <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
        <Input
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Price (₹)"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <Button onClick={addItemToCart} className="bg-blue-500 text-white w-full">
          Add to Cart
        </Button>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Price (₹)</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total (₹)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => removeItemFromCart(item.id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No items in the cart
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Total Amount */}
      <div className="text-lg font-bold text-right">Total Amount: ₹{totalAmount.toFixed(2)}</div>
    </div>
  );
}

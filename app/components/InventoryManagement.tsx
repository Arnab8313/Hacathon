"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash, Plus } from "lucide-react";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: "Product A", quantity: 10, price: 500 },
    { id: 2, name: "Product B", quantity: 15, price: 750 },
    { id: 3, name: "Product C", quantity: 20, price: 1000 },
  ]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0, price: 0 });
  const [modifyQuantity, setModifyQuantity] = useState<{ [key: number]: number }>({});

  const addItem = () => {
    if (newItem.name && newItem.quantity > 0 && newItem.price > 0) {
      setInventory([...inventory, { ...newItem, id: inventory.length + 1 }]);
      setNewItem({ name: "", quantity: 0, price: 0 });
    }
  };

  const modifyItemQuantity = (id: number, quantity: number, type: "add" | "remove") => {
    if (quantity > 0) {
      setInventory(
        inventory.map((item) => {
          if (item.id === id) {
            const newQuantity = type === "add" ? item.quantity + quantity : Math.max(0, item.quantity - quantity);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
      );
    }
  };

  return (
    <div className="space-y-6 bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-gray-700">
      <div className="grid gap-4 md:grid-cols-4">
        <Input
          className="bg-gray-800 border border-gray-600 text-white"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <Input
          className="bg-gray-800 border border-gray-600 text-white"
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: Math.max(0, Number(e.target.value)) })}
        />
        <Input
          className="bg-gray-800 border border-gray-600 text-white"
          type="number"
          placeholder="Price (₹)"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: Math.max(0, Number(e.target.value)) })}
        />
        <Button className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-xl shadow-md" onClick={addItem}>
          Add Item
        </Button>
      </div>
      <Table className="bg-gray-800 border border-gray-700 text-white rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price (₹)</TableHead>
            <TableHead>Total Value (₹)</TableHead>
            <TableHead>Modify</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="hover:bg-gray-700">
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price.toFixed(2)}</TableCell>
              <TableCell>{(item.quantity * item.price).toFixed(2)}</TableCell>
              <TableCell className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Qty"
                  value={modifyQuantity[item.id] || ""}
                  onChange={(e) => setModifyQuantity({ ...modifyQuantity, [item.id]: Math.max(0, Number(e.target.value)) })}
                  className="w-20 bg-gray-800 border border-gray-600 text-white"
                />
                <Button variant="secondary" className="bg-green-600 hover:bg-green-800 text-white" onClick={() => modifyItemQuantity(item.id, modifyQuantity[item.id] || 0, "add")}>
                  <Plus size={16} />
                </Button>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-800 text-white" onClick={() => modifyItemQuantity(item.id, modifyQuantity[item.id] || 0, "remove")}>
                  <Trash size={16} />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

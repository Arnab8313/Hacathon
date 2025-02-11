"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash, Plus } from "lucide-react";
import { fetchInventory, addItem, updateItem, deleteItem } from "@/lib/apiService";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0, price: 0 });
  const [modifyQuantity, setModifyQuantity] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const data = await fetchInventory();
      console.log("Fetched inventory data:", data); // Debugging
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleAddItem = async () => {
    if (newItem.name && newItem.quantity > 0 && newItem.price > 0) {
      try {
        const response = await addItem(newItem);
        console.log("Added item response:", response); // Debugging
        fetchInventoryData();
        setNewItem({ name: "", quantity: 0, price: 0 });
      } catch (error) {
        console.error("Error adding item:", error);
      }
    } else {
      console.error("Invalid item data");
    }
  };

  const handleModifyItemQuantity = async (id: number, quantity: number, type: "add" | "remove") => {
    if (quantity > 0) {
      const item = inventory.find((item) => item.id === id);
      if (item) {
        const newQuantity = type === "add" ? item.quantity + quantity : Math.max(0, item.quantity - quantity);
        try {
          const response = await updateItem(id, { ...item, quantity: newQuantity });
          console.log("Modified item response:", response); // Debugging
          fetchInventoryData();
        } catch (error) {
          console.error("Error modifying item quantity:", error);
        }
      }
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      const response = await deleteItem(id);
      console.log("Deleted item response:", response); // Debugging
      fetchInventoryData();
    } catch (error) {
      console.error("Error deleting item:", error);
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
        <Button className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-xl shadow-md" onClick={handleAddItem}>
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
              <TableCell>{Number(item.price).toFixed(2)}</TableCell> {/* Ensure price is a number */}
              <TableCell>{(item.quantity * Number(item.price)).toFixed(2)}</TableCell> {/* Ensure price is a number */}
              <TableCell className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Qty"
                  value={modifyQuantity[item.id] || ""}
                  onChange={(e) => setModifyQuantity({ ...modifyQuantity, [item.id]: Math.max(0, Number(e.target.value)) })}
                  className="w-20 bg-gray-800 border border-gray-600 text-white"
                />
                <Button variant="secondary" className="bg-green-600 hover:bg-green-800 text-white" onClick={() => handleModifyItemQuantity(item.id, modifyQuantity[item.id] || 0, "add")}>
                  <Plus size={16} />
                </Button>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-800 text-white" onClick={() => handleModifyItemQuantity(item.id, modifyQuantity[item.id] || 0, "remove")}>
                  <Trash size={16} />
                </Button>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-800 text-white" onClick={() => handleDeleteItem(item.id)}>
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
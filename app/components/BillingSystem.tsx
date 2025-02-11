"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PaymentGateway from "./PaymentGateway"; // Corrected import path
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BillItem {
  name: string;
  quantity: number;
  price: number;
}

export default function BillingSystem() {
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [newItem, setNewItem] = useState<BillItem>({ name: "", quantity: 0, price: 0 });

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity > 0 && newItem.price > 0) {
      setBillItems([...billItems, newItem]);
      setNewItem({ name: "", quantity: 0, price: 0 });
    } else {
      alert("Please enter valid item details.");
    }
  };

  const handleGenerateTransaction = () => {
    // Logic to generate the transaction
    // ...

    // Show the payment gateway
    setShowPaymentGateway(true);
  };

  const totalAmount = billItems.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <div className="space-y-6 bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-gray-700">
      <Card>
        <CardHeader>
          <CardTitle>Billing System</CardTitle>
        </CardHeader>
        <CardContent>
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
            <Button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-xl shadow-md" onClick={handleAddItem}>
              Add Item
            </Button>
          </div>
          <Table className="bg-gray-800 border border-gray-700 text-white rounded-lg mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Total (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price.toFixed(2)}</TableCell>
                  <TableCell>{(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                <TableCell className="font-bold">{totalAmount.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-xl shadow-md mt-4" onClick={handleGenerateTransaction}>
            Generate Transaction
          </Button>
        </CardContent>
      </Card>

      {showPaymentGateway && (
        <PaymentGateway onClose={() => setShowPaymentGateway(false)} />
      )}
    </div>
  );
}
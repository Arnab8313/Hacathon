"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, Package } from "lucide-react";
import { fetchInventory } from "@/lib/apiService";

interface RevenueExpense {
  totalRevenue: number;
  totalExpenses: number;
}

interface Inventory {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function Dashboard() {
  const [data, setData] = useState<RevenueExpense>({ totalRevenue: 0, totalExpenses: 0 });
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [profit, setProfit] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/revenue-expense");
        setData(response.data);
        setProfit(response.data.totalRevenue - response.data.totalExpenses);
      } catch (error) {
        console.error("Error fetching revenue and expense data:", error);
      }
    };

    fetchData();
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const data = await fetchInventory();
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(data.totalRevenue)}</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(data.totalExpenses)}</div>
          <p className="text-xs text-muted-foreground">+4% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          <Package className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(inventory.reduce((acc, item) => acc + item.quantity * item.price, 0))}</div>
          <p className="text-xs text-muted-foreground">{inventory.length} different products</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(profit)}</div>
          <p className="text-xs text-muted-foreground">Calculated as Revenue - Expenses</p>
        </CardContent>
      </Card>
    </div>
  );
}
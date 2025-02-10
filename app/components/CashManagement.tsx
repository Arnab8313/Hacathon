"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

export default function CashManagement() {
  const [cashIn, setCashIn] = useState(0);
  const [cashOut, setCashOut] = useState(0);
  const [transactions, setTransactions] = useState<{ type: "in" | "out"; amount: number }[]>([]);

  const totalIncome = transactions.reduce((acc, t) => (t.type === "in" ? acc + t.amount : acc - t.amount), 0);

  const handleCashIn = () => {
    if (cashIn > 0) {
      setTransactions([...transactions, { type: "in", amount: cashIn }]);
      setCashIn(0);
    }
  };

  const handleCashOut = () => {
    if (cashOut > 0) {
      setTransactions([...transactions, { type: "out", amount: cashOut }]);
      setCashOut(0);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-6 bg-[#1e1e1e] text-[#f5f5f5] space-y-6 md:space-y-0 md:space-x-6">
      {/* Left Panel: Controls */}
      <div className="w-full md:w-1/3 p-6 bg-[#282828] shadow-xl rounded-xl space-y-6 hover:shadow-2xl transition-shadow">
        <h2 className="text-3xl font-bold text-[#e0e0e0]">Cash Management</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#333] shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-[#e0e0e0]">Cash In</h3>
            <div className="flex space-x-2 mt-2">
              <Input
                type="number"
                value={cashIn}
                onChange={(e) => setCashIn(Number(e.target.value))}
                placeholder="Amount in ₹"
                className="bg-[#222] text-white shadow-inner focus:outline-none"
              />
              <Button onClick={handleCashIn} className="bg-green-500 text-white hover:bg-green-600 shadow-md">
                <ArrowUpIcon className="mr-2 h-4 w-4" /> Cash In
              </Button>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#333] shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-[#e0e0e0]">Cash Out</h3>
            <div className="flex space-x-2 mt-2">
              <Input
                type="number"
                value={cashOut}
                onChange={(e) => setCashOut(Number(e.target.value))}
                placeholder="Amount in ₹"
                className="bg-[#222] text-white shadow-inner focus:outline-none"
              />
              <Button onClick={handleCashOut} className="bg-red-500 text-white hover:bg-red-600 shadow-md">
                <ArrowDownIcon className="mr-2 h-4 w-4" /> Cash Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Transactions & Total Income */}
      <div className="w-full md:w-2/3 p-6 bg-[#282828] shadow-xl rounded-xl hover:shadow-2xl transition-shadow">
        <div className="p-6 rounded-lg bg-[#1e1e1e] text-white text-center shadow-md">
          <h3 className="text-lg font-semibold text-[#e0e0e0]">Total Income</h3>
          <p className="text-4xl font-bold text-green-400">₹{totalIncome.toFixed(2)}</p>
        </div>
        <h2 className="text-lg font-semibold text-[#e0e0e0] mt-6">Transaction History</h2>
        <div className="mt-4 space-y-3">
          {transactions.length === 0 ? (
            <p className="text-[#bbb]">No transactions yet.</p>
          ) : (
            transactions.map((transaction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg flex justify-between items-center shadow-md hover:shadow-lg transition-shadow ${
                  transaction.type === "in" ? "bg-[#223322]" : "bg-[#332222]"
                }`}
              >
                <span className="text-lg font-medium text-[#e0e0e0]">
                  {transaction.type === "in" ? "Cash In" : "Cash Out"}
                </span>
                <span className="text-lg font-semibold text-white">₹{transaction.amount.toFixed(2)}</span>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

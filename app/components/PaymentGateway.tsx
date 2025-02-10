"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, Loader } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const paymentModes = ["UPI", "Credit/Debit Card", "Net Banking", "Wallet", "Cash"];

export default function PaymentGateway() {
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState(paymentModes[0]);
  const [paymentStatus, setPaymentStatus] = useState("not_started");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaymentInitiation = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (paymentMode === "UPI" && !upiId) {
      alert("Please enter a valid UPI ID.");
      return;
    }
    
    setPaymentStatus("pending");
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  };

  const resetPayment = () => {
    setAmount("");
    setUpiId("");
    setPaymentStatus("not_started");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Gateway</CardTitle>
        <CardDescription>Select your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            id="amount"
            placeholder="Enter amount in ₹"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Select value={paymentMode} onValueChange={setPaymentMode}>
            <SelectTrigger>
              <SelectValue placeholder="Select Payment Mode" />
            </SelectTrigger>
            <SelectContent>
              {paymentModes.map((mode) => (
                <SelectItem key={mode} value={mode}>{mode}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {paymentMode === "UPI" && (
            <Input
              id="upiId"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button disabled={loading} onClick={handlePaymentInitiation}>
            {loading ? "Processing..." : "Initiate Payment"}
          </Button>
        </motion.div>
        {paymentStatus === "pending" && !loading && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => { setPaymentStatus("success"); resetPayment(); }}>Successful</Button>
            <Button variant="destructive" onClick={() => { setPaymentStatus("failed"); resetPayment(); }}>Failed</Button>
          </div>
        )}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="mt-4 flex items-center space-x-2 text-blue-500"
            >
              <Loader className="animate-spin" />
              <span>Processing Payment...</span>
            </motion.div>
          )}
          {paymentStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="mt-4 flex items-center space-x-2 text-green-500"
            >
              <CheckCircle />
              <span>Payment Successful via {paymentMode}!</span>
            </motion.div>
          )}
          {paymentStatus === "failed" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="mt-4 flex items-center space-x-2 text-red-500"
            >
              <XCircle />
              <span>Payment Failed via {paymentMode}!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
}

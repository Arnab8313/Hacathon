"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import axios from 'axios';

const paymentModes = ["UPI", "Credit/Debit Card", "Net Banking", "Wallet", "Cash"];
const walletOptions = ["Paytm", "Google Pay", "PhonePe"];

interface PaymentGatewayProps {
  onClose: () => void;
}

export default function PaymentGateway({ onClose }: PaymentGatewayProps) {
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState(paymentModes[0]);
  const [wallet, setWallet] = useState(walletOptions[0]);
  const [paymentStatus, setPaymentStatus] = useState("not_started");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaymentInitiation = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (paymentMode === "UPI" && !upiId) {
      alert("Please enter a valid UPI ID.");
      return;
    }
    if (paymentMode === "Credit/Debit Card" && (!cardNumber || !expiryDate || !cvv || !cardPin)) {
      alert("Please enter valid card details.");
      return;
    }
    if (paymentMode === "Net Banking" && (!bankName || !accountNumber || !branchName || !transactionId)) {
      alert("Please enter valid bank details.");
      return;
    }

    setPaymentStatus("pending");
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setLoading(false);
      setPaymentStatus("pending"); // Set to pending to allow user to choose success or failure
    } catch (error) {
      console.error("Payment failed:", error);
      setLoading(false);
      setPaymentStatus("failed");
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      await axios.post('http://localhost:5000/update', {
        amount: Number(amount),
        type: 'revenue',
      });
      setPaymentStatus("success");
    } catch (error) {
      console.error("Updating revenue failed:", error);
      setPaymentStatus("failed");
    }
  };

  const handlePaymentFailure = () => {
    setPaymentStatus("failed");
  };

  const resetPayment = () => {
    setAmount("");
    setUpiId("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setCardPin("");
    setBankName("");
    setAccountNumber("");
    setBranchName("");
    setTransactionId("");
    setPaymentStatus("not_started");
    onClose();
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
            className="text-black bg-white border border-gray-600" // Custom CSS class to set text color to black and background color to white
          />
          <Select value={paymentMode} onValueChange={setPaymentMode}>
            <SelectTrigger className="bg-white border border-gray-600 text-black">
              <SelectValue placeholder="Select Payment Mode" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-600 text-black">
              {paymentModes.map((mode) => (
                <SelectItem key={mode} value={mode} className="text-black">
                  {mode}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {paymentMode === "UPI" && (
            <Input
              id="upiId"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="text-black bg-white border border-gray-600" // Custom CSS class to set text color to black and background color to white
            />
          )}
          {paymentMode === "Credit/Debit Card" && (
            <>
              <Input
                id="cardNumber"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="text-black bg-white border border-gray-600" // Custom CSS class to set text color to black and background color to white
              />
              <Input
                id="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="text-black bg-white border border-gray-600" // Custom CSS class to set text color to black and background color to white
              />
              <Input
                id="cvv"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="text-black bg-white border border-gray-600" // Custom CSS class to set text color to black and background color to white
              />
              <div className="flex items-center space-x-2">
                <Input
                  id="cardPin"
                  type={showPin ? "text" : "password"}
                  placeholder="Card PIN"
                  value={cardPin}
                  onChange={(e) => setCardPin(e.target.value)}
                  className="text-black bg-white border border-gray-600" // Custom CSS class to set text color to black and background color to white
                />
                <Button onClick={() => setShowPin(!showPin)}>
                  {showPin ? "Hide" : "Show"}
                </Button>
              </div>
            </>
          )}
          {paymentMode === "Net Banking" && (
            <>
              <Input
                id="bankName"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="text-black bg-white border border-gray-600" // Custom CSS class to set text color to black and background color to white
              />
              <Input
                id="accountNumber"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="text-black bg-white border border-gray-600" // Custom CSS class to set text color to black and background color to white
              />
              <Input
                id="branchName"
                placeholder="Branch Name"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="text-black bg-white border border-gray-600" // Custom CSS class to set text color to black and background color to white
              />
              <Input
                id="transactionId"
                placeholder="Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="text-black bg-white border border-gray-600" // Custom CSS class to set text color to black and background color to white
              />
            </>
          )}
          {paymentMode === "Wallet" && (
            <Select value={wallet} onValueChange={setWallet}>
              <SelectTrigger className="bg-white border border-gray-600 text-black">
                <SelectValue placeholder="Select Wallet" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-600 text-black">
                {walletOptions.map((option) => (
                  <SelectItem key={option} value={option} className="text-black">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Button variant="outline" onClick={handlePaymentSuccess}>Successful</Button>
            <Button variant="destructive" onClick={handlePaymentFailure}>Failed</Button>
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
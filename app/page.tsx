"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Dashboard from "./components/Dashboard"
import CashManagement from "./components/CashManagement"
import InventoryManagement from "./components/InventoryManagement"
import BillingSystem from "./components/BillingSystem"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "cash", label: "Cash Management" },
    { id: "inventory", label: "Inventory" },
    { id: "billingsystem", label: "Billing System" },
  ]

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <header className="bg-gray-900 shadow-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-purple-500">Business Management Software</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex space-x-4 mb-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-md border border-gray-700 ${
                activeTab === tab.id ? "bg-purple-800 text-white" : "bg-gray-900 text-gray-400 hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
        >
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "cash" && <div className='bg-gray-900 p-6 rounded-xl'><CashManagement /></div>}
          {activeTab === "inventory" && <InventoryManagement />}
         {activeTab === "billingsystem" && <BillingSystem />}
        </motion.div>
      </main>
    </div>
  )
}

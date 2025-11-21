"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, X, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

interface InventoryItem {
  id: number;
  food_item_id: number;
  quantity: number;
  purchased_date: string;
  expiry_date: string;
  status: string;
  notes: string;
}

const foodItemsMap: Record<number, string> = {
  1: "Carrot",
  2: "Tomato",
  3: "Chicken Breast",
  4: "Broccoli",
  5: "Rice",
};

const initialInventory: InventoryItem[] = [
  {
    id: 1,
    food_item_id: 1,
    quantity: 3,
    purchased_date: "2025-11-20T14:00:00.000Z",
    expiry_date: "2025-12-31T00:00:00.000Z",
    status: "Available",
    notes: "Some Notes",
  },
  {
    id: 2,
    food_item_id: 2,
    quantity: 5,
    purchased_date: "2025-11-18T10:00:00.000Z",
    expiry_date: "2025-11-25T00:00:00.000Z",
    status: "Available",
    notes: "Fresh from market",
  },
  {
    id: 3,
    food_item_id: 3,
    quantity: 2,
    purchased_date: "2025-11-21T09:00:00.000Z",
    expiry_date: "2025-11-24T00:00:00.000Z",
    status: "Available",
    notes: "Premium quality",
  },
];

interface FormData {
  food_item_id: string;
  quantity: string;
  purchased_date: string;
  expiry_date: string;
  status: string;
  notes: string;
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const purchasedISO = new Date(data.purchased_date).toISOString();
    const expiryISO = new Date(data.expiry_date).toISOString();

    const payload = {
      ...data,
      food_item_id: Number(data.food_item_id),
      quantity: Number(data.quantity),
      purchased_date: purchasedISO,
      expiry_date: expiryISO,
    };

    if (editingId) {
      // Update logic
      setInventory(
        inventory.map((item) =>
          item.id === editingId ? { ...item, ...payload } : item
        )
      );
      setEditingId(null);
    } else {
      const newItem: InventoryItem = {
        id: Math.max(...inventory.map((i) => i.id), 0) + 1,
        ...payload,
        status: data.status,
        notes: data.notes,
      };

      const res = await axiosInstance.post("/inventory", newItem);
      if (res.data.success) {
        toast.success(res.data.data.message);
      }
    }

    reset();
    setShowForm(false);
  };

  const deleteItem = (id: number) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const startEdit = (item: InventoryItem) => {
    reset({
      food_item_id: item.food_item_id.toString(),
      quantity: item.quantity.toString(),
      purchased_date: item.purchased_date,
      expiry_date: item.expiry_date,
      status: item.status,
      notes: item.notes,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const isExpiryWarning = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysLeft = Math.ceil(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysLeft <= 3;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground mt-2">
            Manage your food inventory stock
          </p>
        </div>
        <Button
          onClick={() => {
            reset();
            setEditingId(null);
            setShowForm(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Stock
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {editingId ? "Edit Inventory" : "Add New Inventory"}
                  </CardTitle>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      reset();
                    }}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Food Item
                      </label>
                      <select
                        {...register("food_item_id", { required: true })}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select Item</option>
                        {Object.entries(foodItemsMap).map(([id, name]) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Quantity
                      </label>
                      <input
                        {...register("quantity", { required: true })}
                        type="number"
                        placeholder="e.g., 5"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Purchased Date
                      </label>
                      <input
                        {...register("purchased_date", { required: true })}
                        type="date"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <input
                        {...register("expiry_date", { required: true })}
                        type="date"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Status
                      </label>
                      <select
                        {...register("status", { required: true })}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Available">Available</option>
                        <option value="Consumed">Consumed</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Notes
                      </label>
                      <input
                        {...register("notes")}
                        type="text"
                        placeholder="Add notes..."
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingId ? "Update" : "Add"} Stock
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                        reset();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {inventory.length > 0 ? (
          inventory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`hover:shadow-md transition-shadow ${
                  isExpiryWarning(item.expiry_date) ? "border-orange-300" : ""
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">
                          {foodItemsMap[item.food_item_id]}
                        </h3>
                        {isExpiryWarning(item.expiry_date) && (
                          <AlertCircle className="w-5 h-5 text-orange-500" />
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Quantity</p>
                          <p className="font-medium">{item.quantity} units</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p className="font-medium text-green-600">
                            {item.status}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Purchased</p>
                          <p className="font-medium text-xs">
                            {new Date(item.purchased_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expires</p>
                          <p
                            className={`font-medium text-xs ${
                              isExpiryWarning(item.expiry_date)
                                ? "text-orange-600"
                                : ""
                            }`}
                          >
                            {new Date(item.expiry_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {item.notes && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit2 className="w-5 h-5 text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground">
                No inventory items yet. Add your first stock!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

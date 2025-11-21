"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

interface FoodItem {
  id: number;
  name: string;
  category: string;
  expiration_days: number;
  cost_per_unit: number;
}

const initialFoodItems: FoodItem[] = [
  {
    id: 1,
    name: "Carrot",
    category: "Vegetable",
    expiration_days: 10,
    cost_per_unit: 25,
  },
  {
    id: 2,
    name: "Tomato",
    category: "Vegetable",
    expiration_days: 7,
    cost_per_unit: 30,
  },
  {
    id: 3,
    name: "Chicken Breast",
    category: "Protein",
    expiration_days: 3,
    cost_per_unit: 250,
  },
  {
    id: 4,
    name: "Broccoli",
    category: "Vegetable",
    expiration_days: 12,
    cost_per_unit: 40,
  },
  {
    id: 5,
    name: "Rice",
    category: "Grain",
    expiration_days: 365,
    cost_per_unit: 60,
  },
];

interface FormData {
  name: string;
  category: string;
  expiration_days: string;
  cost_per_unit: string;
}

export default function FoodItemsPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    if (editingId) {
      setFoodItems(
        foodItems.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: data.name,
                category: data.category,
                expiration_days: Number.parseInt(data.expiration_days),
                cost_per_unit: Number.parseFloat(data.cost_per_unit),
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newItem: FoodItem = {
        id: Math.max(...foodItems.map((i) => i.id), 0) + 1,
        name: data.name,
        category: data.category,
        expiration_days: Number.parseInt(data.expiration_days),
        cost_per_unit: Number.parseFloat(data.cost_per_unit),
      };
      const res = await axiosInstance.post("/food-items", newItem);
      if (res.data.success) {
        toast(res.data.data.message);
      }
    }
    reset();
    setShowForm(false);
    setIsSubmitting(false);
  };

  const deleteItem = (id: number) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
  };

  const startEdit = (item: FoodItem) => {
    reset({
      name: item.name,
      category: item.category,
      expiration_days: item.expiration_days.toString(),
      cost_per_unit: item.cost_per_unit.toString(),
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const fetchFoodItems = async() => {
    try {
      const res = await axiosInstance.get("/food-items");
      setFoodItems(res.data.data.items)
      console.log("food items", res.data)
    } catch (error) {
      toast.error("Something went wrong!")
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchFoodItems()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Food Items</h1>
          <p className="text-muted-foreground mt-2">
            Manage your food items catalog
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
          Add Item
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
                    {editingId ? "Edit Food Item" : "Add New Food Item"}
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
                        Item Name
                      </label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="e.g., Carrot"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Category
                      </label>
                      <select
                        {...register("category", { required: true })}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select Category</option>
                        <option value="Vegetable">Vegetable</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Meat">Meat</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Fast_Food">Fast_Food</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Expiration Days
                      </label>
                      <input
                        {...register("expiration_days", { required: true })}
                        type="number"
                        placeholder="e.g., 10"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Cost Per Unit (৳)
                      </label>
                      <input
                        {...register("cost_per_unit", { required: true })}
                        type="number"
                        step="0.01"
                        placeholder="e.g., 25.00"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      {isSubmitting
                        ? "Wait..."
                        : editingId
                        ? "Update Item"
                        : "Add Item"}
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
        {foodItems.length > 0 ? (
          foodItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Category</p>
                          <p className="font-medium">{item.category}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Expiration Days
                          </p>
                          <p className="font-medium">
                            {item.expiration_days} days
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Cost Per Unit</p>
                          <p className="font-medium">
                            ৳{item.cost_per_unit.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p className="font-medium text-green-600">Active</p>
                        </div>
                      </div>
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
                No food items yet. Create your first one!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

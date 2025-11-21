"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Lock } from "lucide-react"
import { useForm } from "react-hook-form"

interface UserProfile {
  full_name: string
  email: string
  role: string
  location: string
  budget_range: string
  household_size: number
  dietary_preferences: { preference: string }
}

const initialUser: UserProfile = {
  full_name: "Anas Ibn Belal",
  email: "anasibnbelal@gmail.com",
  role: "Family",
  location: "Mirpur",
  budget_range: "500",
  household_size: 4,
  dietary_preferences: { preference: "Murgi" },
}

interface EditFormData {
  full_name: string
  location: string
  budget_range: string
  household_size: string
  dietary_preferences: string
}

interface PasswordFormData {
  current_password: string
  new_password: string
  confirm_password: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(initialUser)
  const [editMode, setEditMode] = useState(false)
  const [passwordMode, setPasswordMode] = useState(false)
  const { register: registerEdit, handleSubmit: handleEditSubmit, reset: resetEdit } = useForm<EditFormData>()
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
  } = useForm<PasswordFormData>()

  const onEditSubmit = (data: EditFormData) => {
    setUser({
      ...user,
      full_name: data.full_name,
      location: data.location,
      budget_range: data.budget_range,
      household_size: Number.parseInt(data.household_size),
      dietary_preferences: { preference: data.dietary_preferences },
    })
    setEditMode(false)
    resetEdit()
  }

  const onPasswordSubmit = (data: PasswordFormData) => {
    if (data.new_password !== data.confirm_password) {
      alert("Passwords do not match!")
      return
    }
    alert("Password updated successfully!")
    setPasswordMode(false)
    resetPassword()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {!editMode && (
                  <button
                    onClick={() => {
                      resetEdit({
                        full_name: user.full_name,
                        location: user.location,
                        budget_range: user.budget_range,
                        household_size: user.household_size.toString(),
                        dietary_preferences: user.dietary_preferences.preference,
                      })
                      setEditMode(true)
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <form onSubmit={handleEditSubmit(onEditSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      {...registerEdit("full_name", { required: true })}
                      type="text"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      {...registerEdit("location", { required: true })}
                      type="text"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range (৳)</label>
                    <input
                      {...registerEdit("budget_range", { required: true })}
                      type="text"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Household Size</label>
                    <input
                      {...registerEdit("household_size", { required: true })}
                      type="number"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Dietary Preference</label>
                    <input
                      {...registerEdit("dietary_preferences", { required: true })}
                      type="text"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Save Changes</Button>
                    <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium text-lg">{user.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-lg">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-medium text-lg">{user.role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-lg">{user.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget Range</p>
                    <p className="font-medium text-lg">৳{user.budget_range}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Household Size</p>
                    <p className="font-medium text-lg">{user.household_size} people</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dietary Preference</p>
                    <p className="font-medium text-lg">{user.dietary_preferences.preference}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              {passwordMode ? (
                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <input
                      {...registerPassword("current_password", { required: true })}
                      type="password"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <input
                      {...registerPassword("new_password", { required: true })}
                      type="password"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <input
                      {...registerPassword("confirm_password", { required: true })}
                      type="password"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Update Password</Button>
                    <Button type="button" variant="outline" onClick={() => setPasswordMode(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Keep your account secure by updating your password regularly.
                    </p>
                    <Button onClick={() => resetPassword() || setPasswordMode(true)} className="w-full">
                      Change Password
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

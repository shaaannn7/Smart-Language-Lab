"use client"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Download, 
  Users, 
  CreditCard, 
  TrendingUp, 
  MoreVertical,
  Filter
} from "lucide-react"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", plan: "Pro", status: "Active", joined: "May 1, 2026" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", plan: "Free", status: "Inactive", joined: "Apr 28, 2026" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", plan: "Lifetime", status: "Active", joined: "Apr 25, 2026" },
  { id: 4, name: "Elena Rodriguez", email: "elena@example.com", plan: "Pro", status: "Active", joined: "Apr 20, 2026" },
  { id: 5, name: "David Chen", email: "david@example.com", plan: "Free", status: "Active", joined: "Apr 15, 2026" },
]

export default function AdminPanel() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Analytics</h1>
          <p className="text-muted-foreground">Manage your platform and track performance.</p>
        </div>
        <Button className="rounded-xl gradient-primary">
          <Download className="mr-2 w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-none shadow-md rounded-3xl bg-primary/5">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-primary w-8 h-8" />
            <Badge className="bg-green-500/10 text-green-500 border-none">+12%</Badge>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Total Users</p>
          <p className="text-3xl font-bold">12,450</p>
        </Card>
        <Card className="p-6 border-none shadow-md rounded-3xl bg-primary/5">
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="text-primary w-8 h-8" />
            <Badge className="bg-green-500/10 text-green-500 border-none">+8%</Badge>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
          <p className="text-3xl font-bold">$45,200</p>
        </Card>
        <Card className="p-6 border-none shadow-md rounded-3xl bg-primary/5">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-primary w-8 h-8" />
            <Badge className="bg-green-500/10 text-green-500 border-none">+5%</Badge>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
          <p className="text-3xl font-bold">1,280</p>
        </Card>
      </div>

      {/* User Management */}
      <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
        <div className="p-6 border-b flex flex-col md:row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search users by name or email..." className="pl-10 rounded-xl" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-xl">
              <Filter className="mr-2 w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" className="rounded-xl">Date Range</Button>
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[300px]">User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/20">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={`https://avatar.vercel.sh/${user.name}.png`} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.plan === "Pro" ? "default" : user.plan === "Lifetime" ? "secondary" : "outline"} className="rounded-lg">
                    {user.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-zinc-300"}`} />
                    <span className="text-sm font-medium">{user.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.joined}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-6 border-t flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 5 of 12,450 users</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="rounded-lg">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

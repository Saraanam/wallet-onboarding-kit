import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, CheckSquare, History, Receipt, CalendarDays, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tasks, payslips, leaves, leaveBalance, rewards, workHistory } from "@/data/mockData";

const navItems = [
  { title: "Overview", url: "/employee", icon: LayoutDashboard },
  { title: "My Tasks", url: "/employee/tasks", icon: CheckSquare },
  { title: "Work History", url: "/employee/history", icon: History },
  { title: "Payslips", url: "/employee/payslips", icon: Receipt },
  { title: "Leaves", url: "/employee/leaves", icon: CalendarDays },
  { title: "Rewards", url: "/employee/rewards", icon: Trophy },
];

const priorityColor = (p: string) => {
  if (p === "High") return "bg-red-100 text-red-800";
  if (p === "Medium") return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
};

const taskStatusColor = (s: string) => {
  if (s === "Completed") return "bg-green-100 text-green-800";
  if (s === "In Progress") return "bg-blue-100 text-blue-800";
  if (s === "On Hold") return "bg-yellow-100 text-yellow-800";
  return "bg-muted text-muted-foreground";
};

const myTasks = tasks.filter(t => t.assignee === "E001");

const EmployeeDashboard = () => (
  <DashboardLayout title="Employee Dashboard" navItems={navItems} roleColor="hsl(var(--success))">
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Tasks", value: myTasks.filter(t => t.status === "In Progress").length, icon: CheckSquare },
          { label: "Total Rewards", value: `${rewards.reduce((a, r) => a + r.points, 0)} pts`, icon: Trophy },
          { label: "Leave Balance", value: `${leaveBalance.casual + leaveBalance.sick + leaveBalance.earned - leaveBalance.used.casual - leaveBalance.used.sick - leaveBalance.used.earned} days`, icon: CalendarDays },
          { label: "Last Pay", value: `$${payslips[0]?.netPay.toLocaleString() ?? "—"}`, icon: Receipt },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl flex items-center justify-center bg-accent/10 text-accent">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="tasks">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="history">Work History</TabsTrigger>
          <TabsTrigger value="payslips">Payslips</TabsTrigger>
          <TabsTrigger value="leaves">Leaves</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        {/* TASKS */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader><CardTitle>My Tasks</CardTitle><CardDescription>Assigned tasks and progress</CardDescription></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myTasks.map(t => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.title}</TableCell>
                      <TableCell className="text-muted-foreground">{t.project}</TableCell>
                      <TableCell><Badge className={priorityColor(t.priority)} variant="secondary">{t.priority}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{t.dueDate}</TableCell>
                      <TableCell><Badge className={taskStatusColor(t.status)} variant="secondary">{t.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WORK HISTORY */}
        <TabsContent value="history">
          <Card>
            <CardHeader><CardTitle>Work History</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {workHistory.map(w => (
                <div key={w.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium text-foreground">{w.project}</p>
                    <p className="text-sm text-muted-foreground">{w.role} · {w.duration}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={w.status === "Active" ? "default" : "secondary"}>{w.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{w.contributions} contributions</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PAYSLIPS */}
        <TabsContent value="payslips">
          <Card>
            <CardHeader><CardTitle>Payslips</CardTitle><CardDescription>Monthly salary breakdown</CardDescription></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Basic</TableHead>
                    <TableHead>HRA</TableHead>
                    <TableHead>Bonus</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payslips.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.month}</TableCell>
                      <TableCell>${p.basicSalary.toLocaleString()}</TableCell>
                      <TableCell>${p.hra.toLocaleString()}</TableCell>
                      <TableCell>${p.bonus.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600">-${p.deductions.toLocaleString()}</TableCell>
                      <TableCell className="font-bold">${p.netPay.toLocaleString()}</TableCell>
                      <TableCell><Badge variant="default">{p.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LEAVES */}
        <TabsContent value="leaves">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>My Leave Requests</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaves.map(l => (
                      <TableRow key={l.id}>
                        <TableCell className="font-medium">{l.type}</TableCell>
                        <TableCell>{l.from}</TableCell>
                        <TableCell>{l.to}</TableCell>
                        <TableCell>{l.days}</TableCell>
                        <TableCell className="text-muted-foreground">{l.reason}</TableCell>
                        <TableCell>
                          <Badge variant={l.status === "Approved" ? "default" : l.status === "Pending" ? "secondary" : "destructive"}>{l.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Leave Balance</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: "Casual", total: leaveBalance.casual, used: leaveBalance.used.casual },
                  { type: "Sick", total: leaveBalance.sick, used: leaveBalance.used.sick },
                  { type: "Earned", total: leaveBalance.earned, used: leaveBalance.used.earned },
                ].map(lb => (
                  <div key={lb.type} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{lb.type}</span>
                      <span className="text-muted-foreground">{lb.total - lb.used} remaining</span>
                    </div>
                    <Progress value={(lb.used / lb.total) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* REWARDS */}
        <TabsContent value="rewards">
          <Card>
            <CardHeader><CardTitle>Rewards & Achievements</CardTitle><CardDescription>Total: {rewards.reduce((a, r) => a + r.points, 0)} points</CardDescription></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {rewards.map(r => (
                  <div key={r.id} className="rounded-xl border border-border p-4 space-y-2" style={{ boxShadow: "var(--shadow-card)" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <h4 className="font-display font-semibold text-foreground">{r.title}</h4>
                      </div>
                      <Badge variant="secondary">{r.points} pts</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.description}</p>
                    <p className="text-xs text-muted-foreground">{r.date} · {r.type}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </DashboardLayout>
);

export default EmployeeDashboard;

import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, CheckSquare, History, Receipt, CalendarDays, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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

const StatusBadge = ({ status, type }: { status: string; type?: "priority" | "task" }) => {
  let cls = "glass-subtle text-muted-foreground";
  if (type === "priority") {
    cls = status === "High" ? "status-danger" : status === "Medium" ? "status-warning" : "status-active";
  } else {
    cls = status === "Completed" || status === "Approved" ? "status-active"
      : status === "In Progress" ? "status-info"
      : status === "On Hold" || status === "Pending" ? "status-warning"
      : status === "Rejected" ? "status-danger"
      : "glass-subtle text-muted-foreground";
  }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>{status}</span>;
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
          <Card key={s.label} className="glass-card border-0 rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
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
        <TabsList className="w-full justify-start glass-subtle rounded-xl border-0 p-1 h-auto gap-1">
          {[
            { value: "tasks", label: "My Tasks" },
            { value: "history", label: "Work History" },
            { value: "payslips", label: "Payslips" },
            { value: "leaves", label: "Leaves" },
            { value: "rewards", label: "Rewards" },
          ].map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className="rounded-lg px-4 py-2 text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_10px_hsl(250_85%_65%/0.15)]">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* TASKS */}
        <TabsContent value="tasks">
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader><CardTitle>My Tasks</CardTitle><CardDescription>Assigned tasks and progress</CardDescription></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="text-muted-foreground/60">Task</TableHead>
                    <TableHead className="text-muted-foreground/60">Project</TableHead>
                    <TableHead className="text-muted-foreground/60">Priority</TableHead>
                    <TableHead className="text-muted-foreground/60">Due Date</TableHead>
                    <TableHead className="text-muted-foreground/60">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myTasks.map(t => (
                    <TableRow key={t.id} className="border-border/20 hover:bg-primary/5 transition-colors">
                      <TableCell className="font-medium">{t.title}</TableCell>
                      <TableCell className="text-muted-foreground">{t.project}</TableCell>
                      <TableCell><StatusBadge status={t.priority} type="priority" /></TableCell>
                      <TableCell className="text-muted-foreground">{t.dueDate}</TableCell>
                      <TableCell><StatusBadge status={t.status} type="task" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WORK HISTORY */}
        <TabsContent value="history">
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader><CardTitle>Work History</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {workHistory.map(w => (
                <div key={w.id} className="flex items-center justify-between glass-subtle rounded-xl p-5 transition-all hover:border-primary/20">
                  <div>
                    <p className="font-medium text-foreground">{w.project}</p>
                    <p className="text-sm text-muted-foreground">{w.role} · {w.duration}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={w.status} />
                    <p className="text-xs text-muted-foreground mt-1">{w.contributions} contributions</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PAYSLIPS */}
        <TabsContent value="payslips">
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader><CardTitle>Payslips</CardTitle><CardDescription>Monthly salary breakdown</CardDescription></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="text-muted-foreground/60">Month</TableHead>
                    <TableHead className="text-muted-foreground/60">Basic</TableHead>
                    <TableHead className="text-muted-foreground/60">HRA</TableHead>
                    <TableHead className="text-muted-foreground/60">Bonus</TableHead>
                    <TableHead className="text-muted-foreground/60">Deductions</TableHead>
                    <TableHead className="text-muted-foreground/60">Net Pay</TableHead>
                    <TableHead className="text-muted-foreground/60">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payslips.map(p => (
                    <TableRow key={p.id} className="border-border/20 hover:bg-primary/5 transition-colors">
                      <TableCell className="font-medium">{p.month}</TableCell>
                      <TableCell>${p.basicSalary.toLocaleString()}</TableCell>
                      <TableCell>${p.hra.toLocaleString()}</TableCell>
                      <TableCell>${p.bonus.toLocaleString()}</TableCell>
                      <TableCell className="text-destructive">-${p.deductions.toLocaleString()}</TableCell>
                      <TableCell className="font-bold glow-text">${p.netPay.toLocaleString()}</TableCell>
                      <TableCell><StatusBadge status={p.status} /></TableCell>
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
            <Card className="lg:col-span-2 glass-card border-0 rounded-2xl">
              <CardHeader><CardTitle>My Leave Requests</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/30 hover:bg-transparent">
                      <TableHead className="text-muted-foreground/60">Type</TableHead>
                      <TableHead className="text-muted-foreground/60">From</TableHead>
                      <TableHead className="text-muted-foreground/60">To</TableHead>
                      <TableHead className="text-muted-foreground/60">Days</TableHead>
                      <TableHead className="text-muted-foreground/60">Reason</TableHead>
                      <TableHead className="text-muted-foreground/60">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaves.map(l => (
                      <TableRow key={l.id} className="border-border/20 hover:bg-primary/5 transition-colors">
                        <TableCell className="font-medium">{l.type}</TableCell>
                        <TableCell>{l.from}</TableCell>
                        <TableCell>{l.to}</TableCell>
                        <TableCell>{l.days}</TableCell>
                        <TableCell className="text-muted-foreground">{l.reason}</TableCell>
                        <TableCell><StatusBadge status={l.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="glass-card border-0 rounded-2xl">
              <CardHeader><CardTitle>Leave Balance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: "Casual", total: leaveBalance.casual, used: leaveBalance.used.casual },
                  { type: "Sick", total: leaveBalance.sick, used: leaveBalance.used.sick },
                  { type: "Earned", total: leaveBalance.earned, used: leaveBalance.used.earned },
                ].map(lb => (
                  <div key={lb.type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{lb.type}</span>
                      <span className="text-muted-foreground">{lb.total - lb.used} remaining</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                      <div className="h-full rounded-full btn-gradient" style={{ width: `${(lb.used / lb.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* REWARDS */}
        <TabsContent value="rewards">
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader><CardTitle>Rewards & Achievements</CardTitle><CardDescription>Total: {rewards.reduce((a, r) => a + r.points, 0)} points</CardDescription></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {rewards.map(r => (
                  <div key={r.id} className="glass-subtle rounded-2xl p-5 space-y-3 transition-all hover:border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-warning/10">
                          <Trophy className="h-4 w-4 text-warning" />
                        </div>
                        <h4 className="font-display font-semibold text-foreground">{r.title}</h4>
                      </div>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium status-info">{r.points} pts</span>
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

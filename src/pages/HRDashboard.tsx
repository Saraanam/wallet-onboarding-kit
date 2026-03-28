import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, Users, UserPlus, DollarSign, CalendarDays, ClipboardList, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { employees, leaves, payrollSummary, recruitmentPipeline, attendanceSummary, leaveBalance } from "@/data/mockData";

const navItems = [
  { title: "Overview", url: "/hr", icon: LayoutDashboard },
  { title: "Employees", url: "/hr/employees", icon: Users },
  { title: "Recruitment", url: "/hr/recruitment", icon: UserPlus },
  { title: "Payroll", url: "/hr/payroll", icon: DollarSign },
  { title: "Leave Mgmt", url: "/hr/leaves", icon: CalendarDays },
  { title: "Attendance", url: "/hr/attendance", icon: ClipboardList },
  { title: "Settings", url: "/hr/settings", icon: Settings },
];

const StatusBadge = ({ status, type }: { status: string; type?: string }) => {
  const cls = status === "Active" || status === "Approved" || status === "Processed"
    ? "status-active"
    : status === "Pending"
    ? "status-warning"
    : status === "Rejected"
    ? "status-danger"
    : "glass-subtle text-muted-foreground";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>{status}</span>;
};

const HRDashboard = () => (
  <DashboardLayout title="HR Admin Dashboard" navItems={navItems} roleColor="hsl(var(--accent))">
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Total Employees", value: payrollSummary.totalEmployees },
          { label: "Avg Salary", value: `$${(payrollSummary.avgSalary / 1000).toFixed(1)}K` },
          { label: "Monthly Payroll", value: `$${(payrollSummary.totalPayroll / 1000).toFixed(0)}K` },
          { label: "Pending Approvals", value: payrollSummary.pendingApprovals },
          { label: "Next Pay Date", value: "Jul 31" },
        ].map(s => (
          <Card key={s.label} className="glass-card border-0 rounded-2xl">
            <CardContent className="p-5 text-center">
              <p className="text-2xl font-display font-bold glow-text">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="employees">
        <TabsList className="w-full justify-start glass-subtle rounded-xl border-0 p-1 h-auto gap-1">
          {["employees", "recruitment", "payroll", "leaves", "attendance"].map(tab => (
            <TabsTrigger key={tab} value={tab} className="rounded-lg px-4 py-2 text-sm capitalize data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_10px_hsl(250_85%_65%/0.15)]">
              {tab === "leaves" ? "Leave Management" : tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* EMPLOYEES TAB */}
        <TabsContent value="employees">
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader>
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>Full directory with onboarding status</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="text-muted-foreground/60">ID</TableHead>
                    <TableHead className="text-muted-foreground/60">Name</TableHead>
                    <TableHead className="text-muted-foreground/60">Role</TableHead>
                    <TableHead className="text-muted-foreground/60">Department</TableHead>
                    <TableHead className="text-muted-foreground/60">Join Date</TableHead>
                    <TableHead className="text-muted-foreground/60">Salary</TableHead>
                    <TableHead className="text-muted-foreground/60">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map(e => (
                    <TableRow key={e.id} className="border-border/20 hover:bg-primary/5 transition-colors">
                      <TableCell className="font-mono text-xs text-muted-foreground">{e.id}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground btn-gradient">{e.avatar}</div>
                          {e.name}
                        </div>
                      </TableCell>
                      <TableCell>{e.role}</TableCell>
                      <TableCell>{e.department}</TableCell>
                      <TableCell className="text-muted-foreground">{e.joinDate}</TableCell>
                      <TableCell>${e.salary.toLocaleString()}</TableCell>
                      <TableCell><StatusBadge status={e.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RECRUITMENT TAB */}
        <TabsContent value="recruitment">
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader>
              <CardTitle>Recruitment Pipeline</CardTitle>
              <CardDescription>Candidate funnel overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {recruitmentPipeline.map(stage => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{stage.stage}</span>
                    <span className="text-muted-foreground">{stage.count} candidates</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted/50 overflow-hidden">
                    <div
                      className="h-full rounded-full btn-gradient transition-all duration-1000"
                      style={{ width: `${(stage.count / recruitmentPipeline[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PAYROLL TAB */}
        <TabsContent value="payroll">
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader>
              <CardTitle>Payroll Overview</CardTitle>
              <CardDescription>Monthly compensation breakdown</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="text-muted-foreground/60">Employee</TableHead>
                    <TableHead className="text-muted-foreground/60">Department</TableHead>
                    <TableHead className="text-muted-foreground/60">Salary</TableHead>
                    <TableHead className="text-muted-foreground/60">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map(e => (
                    <TableRow key={e.id} className="border-border/20 hover:bg-primary/5 transition-colors">
                      <TableCell className="font-medium">{e.name}</TableCell>
                      <TableCell>{e.department}</TableCell>
                      <TableCell>${e.salary.toLocaleString()}</TableCell>
                      <TableCell><StatusBadge status="Processed" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LEAVES TAB */}
        <TabsContent value="leaves">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 glass-card border-0 rounded-2xl">
              <CardHeader><CardTitle>Leave Requests</CardTitle></CardHeader>
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
                      <span className="text-muted-foreground">{lb.used}/{lb.total} used</span>
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

        {/* ATTENDANCE TAB */}
        <TabsContent value="attendance">
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader><CardTitle>Attendance Summary (This Month)</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-5">
                {[
                  { label: "Present", value: attendanceSummary.present, cls: "status-active" },
                  { label: "Absent", value: attendanceSummary.absent, cls: "status-danger" },
                  { label: "Late", value: attendanceSummary.late, cls: "status-warning" },
                  { label: "WFH", value: attendanceSummary.wfh, cls: "status-info" },
                  { label: "Working Days", value: attendanceSummary.totalWorkingDays, cls: "glass-subtle text-foreground" },
                ].map(a => (
                  <div key={a.label} className="text-center glass-subtle rounded-2xl p-5">
                    <p className={`text-3xl font-display font-bold ${a.cls.includes('active') ? 'text-success' : a.cls.includes('danger') ? 'text-destructive' : a.cls.includes('warning') ? 'text-warning' : a.cls.includes('info') ? 'text-accent' : 'text-foreground'}`}>{a.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{a.label}</p>
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

export default HRDashboard;

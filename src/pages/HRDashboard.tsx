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
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="employees">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="leaves">Leave Management</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        {/* EMPLOYEES TAB */}
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>Full directory with onboarding status</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map(e => (
                    <TableRow key={e.id}>
                      <TableCell className="font-mono text-xs">{e.id}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>{e.avatar}</div>
                          {e.name}
                        </div>
                      </TableCell>
                      <TableCell>{e.role}</TableCell>
                      <TableCell>{e.department}</TableCell>
                      <TableCell className="text-muted-foreground">{e.joinDate}</TableCell>
                      <TableCell>${e.salary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={e.status === "Active" ? "default" : "secondary"}>{e.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RECRUITMENT TAB */}
        <TabsContent value="recruitment">
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Pipeline</CardTitle>
              <CardDescription>Candidate funnel overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recruitmentPipeline.map(stage => (
                <div key={stage.stage} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{stage.stage}</span>
                    <span className="text-muted-foreground">{stage.count} candidates</span>
                  </div>
                  <Progress value={(stage.count / recruitmentPipeline[0].count) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PAYROLL TAB */}
        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Overview</CardTitle>
              <CardDescription>Monthly compensation breakdown</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map(e => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">{e.name}</TableCell>
                      <TableCell>{e.department}</TableCell>
                      <TableCell>${e.salary.toLocaleString()}</TableCell>
                      <TableCell><Badge variant="default">Processed</Badge></TableCell>
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
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Leave Requests</CardTitle></CardHeader>
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
                      <span className="text-muted-foreground">{lb.used}/{lb.total} used</span>
                    </div>
                    <Progress value={(lb.used / lb.total) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ATTENDANCE TAB */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader><CardTitle>Attendance Summary (This Month)</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-5">
                {[
                  { label: "Present", value: attendanceSummary.present, color: "text-green-600" },
                  { label: "Absent", value: attendanceSummary.absent, color: "text-red-600" },
                  { label: "Late", value: attendanceSummary.late, color: "text-yellow-600" },
                  { label: "WFH", value: attendanceSummary.wfh, color: "text-blue-600" },
                  { label: "Working Days", value: attendanceSummary.totalWorkingDays, color: "text-foreground" },
                ].map(a => (
                  <div key={a.label} className="text-center p-4 rounded-lg border border-border">
                    <p className={`text-3xl font-display font-bold ${a.color}`}>{a.value}</p>
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

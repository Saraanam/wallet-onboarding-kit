import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, Users, Briefcase, DollarSign, Megaphone, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { employees, jobListings, departments, announcements, payrollSummary } from "@/data/mockData";

const navItems = [
  { title: "Overview", url: "/employer", icon: LayoutDashboard },
  { title: "Employees", url: "/employer/employees", icon: Users },
  { title: "Job Listings", url: "/employer/jobs", icon: Briefcase },
  { title: "Departments", url: "/employer/departments", icon: BarChart3 },
  { title: "Payroll", url: "/employer/payroll", icon: DollarSign },
  { title: "Announcements", url: "/employer/announcements", icon: Megaphone },
];

const statusColor = (s: string) => {
  if (s === "Active" || s === "Open") return "bg-green-100 text-green-800";
  if (s === "On Leave") return "bg-yellow-100 text-yellow-800";
  if (s === "Closed") return "bg-red-100 text-red-800";
  return "bg-muted text-muted-foreground";
};

const EmployerDashboard = () => (
  <DashboardLayout title="Employer Dashboard" navItems={navItems} roleColor="hsl(var(--primary))">
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Employees", value: employees.length, icon: Users },
          { label: "Open Positions", value: jobListings.filter(j => j.status === "Open").length, icon: Briefcase },
          { label: "Departments", value: departments.length, icon: BarChart3 },
          { label: "Monthly Payroll", value: `$${(payrollSummary.totalPayroll / 1000).toFixed(0)}K`, icon: DollarSign },
        ].map(s => (
          <Card key={s.label}>
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Employee Directory */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Employee Directory</CardTitle>
            <CardDescription>{employees.length} team members</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map(e => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>{e.avatar}</div>
                        {e.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{e.role}</TableCell>
                    <TableCell className="text-muted-foreground">{e.department}</TableCell>
                    <TableCell><Badge className={statusColor(e.status)} variant="secondary">{e.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Job Listings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobListings.map(j => (
              <div key={j.id} className="rounded-lg border border-border p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm text-foreground">{j.title}</p>
                  <Badge className={statusColor(j.status)} variant="secondary">{j.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{j.department} · {j.type} · {j.location}</p>
                <p className="text-xs text-muted-foreground">{j.applicants} applicants</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Departments & Announcements */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">Departments</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Headcount</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Budget</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map(d => (
                  <TableRow key={d.name}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>{d.headcount}</TableCell>
                    <TableCell className="text-muted-foreground">{d.manager}</TableCell>
                    <TableCell>${d.budget.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {announcements.map(a => (
              <div key={a.id} className="border-l-2 border-primary pl-3 space-y-1">
                <p className="font-medium text-sm text-foreground">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.date}</p>
                <p className="text-sm text-muted-foreground">{a.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  </DashboardLayout>
);

export default EmployerDashboard;

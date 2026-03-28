import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, Users, Briefcase, DollarSign, Megaphone, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { employees, jobListings, departments, announcements, payrollSummary } from "@/data/mockData";

const navItems = [
  { title: "Overview", url: "/employer", icon: LayoutDashboard },
  { title: "Employees", url: "/employer/employees", icon: Users },
  { title: "Job Listings", url: "/employer/jobs", icon: Briefcase },
  { title: "Departments", url: "/employer/departments", icon: BarChart3 },
  { title: "Payroll", url: "/employer/payroll", icon: DollarSign },
  { title: "Announcements", url: "/employer/announcements", icon: Megaphone },
];

const StatusBadge = ({ status }: { status: string }) => {
  const cls = status === "Active" || status === "Open"
    ? "status-active"
    : status === "On Leave"
    ? "status-warning"
    : status === "Closed"
    ? "status-danger"
    : "glass-subtle text-muted-foreground";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>{status}</span>;
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Employee Directory */}
        <Card className="lg:col-span-2 glass-card border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Employee Directory</CardTitle>
            <CardDescription>{employees.length} team members</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead className="text-muted-foreground/60">Name</TableHead>
                  <TableHead className="text-muted-foreground/60">Role</TableHead>
                  <TableHead className="text-muted-foreground/60">Department</TableHead>
                  <TableHead className="text-muted-foreground/60">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map(e => (
                  <TableRow key={e.id} className="border-border/20 hover:bg-primary/5 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground btn-gradient">{e.avatar}</div>
                        {e.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{e.role}</TableCell>
                    <TableCell className="text-muted-foreground">{e.department}</TableCell>
                    <TableCell><StatusBadge status={e.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <Card className="glass-card border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Job Listings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {jobListings.map(j => (
              <div key={j.id} className="glass-subtle rounded-xl p-4 space-y-2 transition-all hover:border-primary/20">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm text-foreground">{j.title}</p>
                  <StatusBadge status={j.status} />
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
        <Card className="glass-card border-0 rounded-2xl">
          <CardHeader><CardTitle className="text-lg">Departments</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead className="text-muted-foreground/60">Department</TableHead>
                  <TableHead className="text-muted-foreground/60">Headcount</TableHead>
                  <TableHead className="text-muted-foreground/60">Manager</TableHead>
                  <TableHead className="text-muted-foreground/60">Budget</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map(d => (
                  <TableRow key={d.name} className="border-border/20 hover:bg-primary/5 transition-colors">
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

        <Card className="glass-card border-0 rounded-2xl">
          <CardHeader><CardTitle className="text-lg">Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {announcements.map(a => (
              <div key={a.id} className="border-l-2 border-primary/50 pl-4 space-y-1">
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

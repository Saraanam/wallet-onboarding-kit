import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, Users, CheckSquare, BarChart3, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { employees, tasks, departments } from "@/data/mockData";

const navItems = [
  { title: "Overview", url: "/manager", icon: LayoutDashboard },
  { title: "My Team", url: "/manager/team", icon: Users },
  { title: "Tasks", url: "/manager/tasks", icon: CheckSquare },
  { title: "Performance", url: "/manager/performance", icon: BarChart3 },
  { title: "Role Assign", url: "/manager/roles", icon: UserCog },
];

const StatusBadge = ({ status }: { status: string }) => {
  const cls = status === "Active" || status === "Completed"
    ? "status-active"
    : status === "On Leave" || status === "In Progress"
    ? "status-info"
    : "glass-subtle text-muted-foreground";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>{status}</span>;
};

const teamMembers = employees.map(e => ({
  ...e,
  performance: Math.floor(Math.random() * 30) + 70,
  tasksCompleted: Math.floor(Math.random() * 15) + 5,
  tasksTotal: Math.floor(Math.random() * 10) + 15,
}));

const teamByDept = departments.map(d => ({
  ...d,
  members: teamMembers.filter(m => m.department === d.name),
}));

const ManagerDashboard = () => (
  <DashboardLayout title="Manager Dashboard" navItems={navItems} roleColor="hsl(var(--primary))">
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Team Size", value: employees.length, icon: Users },
          { label: "Active Tasks", value: tasks.filter(t => t.status === "In Progress").length, icon: CheckSquare },
          { label: "Completed Tasks", value: tasks.filter(t => t.status === "Completed").length, icon: CheckSquare },
          { label: "Departments", value: departments.length, icon: BarChart3 },
        ].map(s => (
          <Card key={s.label} className="glass-card border-0 rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="team">
        <TabsList className="w-full justify-start glass-subtle rounded-xl border-0 p-1 h-auto gap-1">
          {["team", "tasks", "performance", "roles"].map(tab => (
            <TabsTrigger key={tab} value={tab} className="rounded-lg px-4 py-2 text-sm capitalize data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_10px_hsl(250_85%_65%/0.15)]">
              {tab === "team" ? "Team Overview" : tab === "tasks" ? "All Tasks" : tab === "roles" ? "Role Assignments" : tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* TEAM */}
        <TabsContent value="team">
          <div className="space-y-6">
            {teamByDept.map(dept => (
              <Card key={dept.name} className="glass-card border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                  <CardDescription>{dept.members.length} members · Manager: {dept.manager}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/30 hover:bg-transparent">
                        <TableHead className="text-muted-foreground/60">Name</TableHead>
                        <TableHead className="text-muted-foreground/60">Role</TableHead>
                        <TableHead className="text-muted-foreground/60">Status</TableHead>
                        <TableHead className="text-muted-foreground/60">Tasks</TableHead>
                        <TableHead className="text-muted-foreground/60">Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dept.members.map(m => (
                        <TableRow key={m.id} className="border-border/20 hover:bg-primary/5 transition-colors">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground btn-gradient">{m.avatar}</div>
                              {m.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{m.role}</TableCell>
                          <TableCell><StatusBadge status={m.status} /></TableCell>
                          <TableCell>{m.tasksCompleted}/{m.tasksTotal}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 w-32">
                              <div className="h-2 flex-1 rounded-full bg-muted/50 overflow-hidden">
                                <div className="h-full rounded-full btn-gradient" style={{ width: `${m.performance}%` }} />
                              </div>
                              <span className="text-xs text-muted-foreground">{m.performance}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ALL TASKS */}
        <TabsContent value="tasks">
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader><CardTitle>All Team Tasks</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="text-muted-foreground/60">Task</TableHead>
                    <TableHead className="text-muted-foreground/60">Assignee</TableHead>
                    <TableHead className="text-muted-foreground/60">Project</TableHead>
                    <TableHead className="text-muted-foreground/60">Priority</TableHead>
                    <TableHead className="text-muted-foreground/60">Due Date</TableHead>
                    <TableHead className="text-muted-foreground/60">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map(t => {
                    const assignee = employees.find(e => e.id === t.assignee);
                    return (
                      <TableRow key={t.id} className="border-border/20 hover:bg-primary/5 transition-colors">
                        <TableCell className="font-medium">{t.title}</TableCell>
                        <TableCell>{assignee?.name ?? t.assignee}</TableCell>
                        <TableCell className="text-muted-foreground">{t.project}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${t.priority === "High" ? "status-danger" : t.priority === "Medium" ? "status-warning" : "status-active"}`}>{t.priority}</span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{t.dueDate}</TableCell>
                        <TableCell><StatusBadge status={t.status} /></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PERFORMANCE */}
        <TabsContent value="performance">
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader><CardTitle>Team Performance</CardTitle><CardDescription>Individual performance scores</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.sort((a, b) => b.performance - a.performance).map(m => (
                <div key={m.id} className="flex items-center gap-4 glass-subtle rounded-xl p-4 transition-all hover:border-primary/20">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0 btn-gradient">{m.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-foreground truncate">{m.name}</span>
                      <span className="glow-text font-semibold">{m.performance}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                      <div className="h-full rounded-full btn-gradient transition-all duration-1000" style={{ width: `${m.performance}%` }} />
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium glass-subtle text-muted-foreground shrink-0">{m.role}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROLE ASSIGNMENTS */}
        <TabsContent value="roles">
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader><CardTitle>Role Assignments</CardTitle><CardDescription>Team roles and department distribution</CardDescription></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="text-muted-foreground/60">Employee</TableHead>
                    <TableHead className="text-muted-foreground/60">Current Role</TableHead>
                    <TableHead className="text-muted-foreground/60">Department</TableHead>
                    <TableHead className="text-muted-foreground/60">Assigned Since</TableHead>
                    <TableHead className="text-muted-foreground/60">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map(e => (
                    <TableRow key={e.id} className="border-border/20 hover:bg-primary/5 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground btn-gradient">{e.avatar}</div>
                          {e.name}
                        </div>
                      </TableCell>
                      <TableCell>{e.role}</TableCell>
                      <TableCell>{e.department}</TableCell>
                      <TableCell className="text-muted-foreground">{e.joinDate}</TableCell>
                      <TableCell><StatusBadge status={e.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </DashboardLayout>
);

export default ManagerDashboard;

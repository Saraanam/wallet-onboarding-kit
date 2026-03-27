import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, Users, CheckSquare, BarChart3, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { employees, tasks, departments } from "@/data/mockData";

const navItems = [
  { title: "Overview", url: "/manager", icon: LayoutDashboard },
  { title: "My Team", url: "/manager/team", icon: Users },
  { title: "Tasks", url: "/manager/tasks", icon: CheckSquare },
  { title: "Performance", url: "/manager/performance", icon: BarChart3 },
  { title: "Role Assign", url: "/manager/roles", icon: UserCog },
];

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
          { label: "Team Size", value: employees.length },
          { label: "Active Tasks", value: tasks.filter(t => t.status === "In Progress").length },
          { label: "Completed Tasks", value: tasks.filter(t => t.status === "Completed").length },
          { label: "Departments", value: departments.length },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="team">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="team">Team Overview</TabsTrigger>
          <TabsTrigger value="tasks">All Tasks</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="roles">Role Assignments</TabsTrigger>
        </TabsList>

        {/* TEAM */}
        <TabsContent value="team">
          <div className="space-y-6">
            {teamByDept.map(dept => (
              <Card key={dept.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                  <CardDescription>{dept.members.length} members · Manager: {dept.manager}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tasks</TableHead>
                        <TableHead>Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dept.members.map(m => (
                        <TableRow key={m.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>{m.avatar}</div>
                              {m.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{m.role}</TableCell>
                          <TableCell><Badge variant={m.status === "Active" ? "default" : "secondary"}>{m.status}</Badge></TableCell>
                          <TableCell>{m.tasksCompleted}/{m.tasksTotal}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 w-32">
                              <Progress value={m.performance} className="h-2 flex-1" />
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
          <Card>
            <CardHeader><CardTitle>All Team Tasks</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map(t => {
                    const assignee = employees.find(e => e.id === t.assignee);
                    return (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.title}</TableCell>
                        <TableCell>{assignee?.name ?? t.assignee}</TableCell>
                        <TableCell className="text-muted-foreground">{t.project}</TableCell>
                        <TableCell>
                          <Badge variant={t.priority === "High" ? "destructive" : "secondary"}>{t.priority}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{t.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant={t.status === "Completed" ? "default" : "secondary"}>{t.status}</Badge>
                        </TableCell>
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
          <Card>
            <CardHeader><CardTitle>Team Performance</CardTitle><CardDescription>Individual performance scores</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.sort((a, b) => b.performance - a.performance).map(m => (
                <div key={m.id} className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0" style={{ background: "var(--gradient-primary)" }}>{m.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-foreground truncate">{m.name}</span>
                      <span className="text-muted-foreground">{m.performance}%</span>
                    </div>
                    <Progress value={m.performance} className="h-2" />
                  </div>
                  <Badge variant="secondary" className="shrink-0">{m.role}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROLE ASSIGNMENTS */}
        <TabsContent value="roles">
          <Card>
            <CardHeader><CardTitle>Role Assignments</CardTitle><CardDescription>Team roles and department distribution</CardDescription></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Current Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Assigned Since</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map(e => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>{e.avatar}</div>
                          {e.name}
                        </div>
                      </TableCell>
                      <TableCell>{e.role}</TableCell>
                      <TableCell>{e.department}</TableCell>
                      <TableCell className="text-muted-foreground">{e.joinDate}</TableCell>
                      <TableCell><Badge variant={e.status === "Active" ? "default" : "secondary"}>{e.status}</Badge></TableCell>
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

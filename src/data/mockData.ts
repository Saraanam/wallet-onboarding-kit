// ===== EMPLOYEES =====
export const employees = [
  { id: "E001", name: "Aarav Sharma", role: "Frontend Developer", department: "Engineering", email: "aarav@ketchweave.io", status: "Active", joinDate: "2024-03-15", salary: 85000, avatar: "AS" },
  { id: "E002", name: "Priya Patel", role: "UI/UX Designer", department: "Design", email: "priya@ketchweave.io", status: "Active", joinDate: "2024-01-10", salary: 78000, avatar: "PP" },
  { id: "E003", name: "Rahul Verma", role: "Backend Developer", department: "Engineering", email: "rahul@ketchweave.io", status: "Active", joinDate: "2023-11-20", salary: 92000, avatar: "RV" },
  { id: "E004", name: "Sneha Gupta", role: "Marketing Lead", department: "Marketing", email: "sneha@ketchweave.io", status: "Active", joinDate: "2024-05-01", salary: 75000, avatar: "SG" },
  { id: "E005", name: "Vikram Singh", role: "DevOps Engineer", department: "Engineering", email: "vikram@ketchweave.io", status: "On Leave", joinDate: "2023-08-12", salary: 95000, avatar: "VS" },
  { id: "E006", name: "Ananya Reddy", role: "Graphic Designer", department: "Design", email: "ananya@ketchweave.io", status: "Active", joinDate: "2024-02-28", salary: 68000, avatar: "AR" },
  { id: "E007", name: "Kiran Joshi", role: "Content Writer", department: "Marketing", email: "kiran@ketchweave.io", status: "Active", joinDate: "2024-06-15", salary: 55000, avatar: "KJ" },
  { id: "E008", name: "Deepak Nair", role: "Full Stack Developer", department: "Engineering", email: "deepak@ketchweave.io", status: "Active", joinDate: "2023-09-01", salary: 98000, avatar: "DN" },
];

// ===== TASKS =====
export const tasks = [
  { id: "T001", title: "Build wallet integration UI", assignee: "E001", status: "In Progress", priority: "High", dueDate: "2025-07-15", project: "KetchWeave Core" },
  { id: "T002", title: "Design onboarding flow", assignee: "E002", status: "Completed", priority: "Medium", dueDate: "2025-07-10", project: "KetchWeave Core" },
  { id: "T003", title: "API endpoint for payroll", assignee: "E003", status: "In Progress", priority: "High", dueDate: "2025-07-20", project: "HR Module" },
  { id: "T004", title: "Social media campaign Q3", assignee: "E004", status: "To Do", priority: "Medium", dueDate: "2025-07-25", project: "Marketing" },
  { id: "T005", title: "CI/CD pipeline optimization", assignee: "E005", status: "On Hold", priority: "Low", dueDate: "2025-08-01", project: "Infrastructure" },
  { id: "T006", title: "Brand asset refresh", assignee: "E006", status: "In Progress", priority: "Medium", dueDate: "2025-07-18", project: "Design System" },
  { id: "T007", title: "Blog post: Web3 HR", assignee: "E007", status: "Completed", priority: "Low", dueDate: "2025-07-08", project: "Content" },
  { id: "T008", title: "Dashboard performance audit", assignee: "E008", status: "To Do", priority: "High", dueDate: "2025-07-22", project: "KetchWeave Core" },
];

// ===== PAYSLIPS =====
export const payslips = [
  { id: "P001", month: "June 2025", basicSalary: 65000, hra: 12000, bonus: 5000, deductions: 8500, netPay: 73500, status: "Paid", paidDate: "2025-06-30" },
  { id: "P002", month: "May 2025", basicSalary: 65000, hra: 12000, bonus: 0, deductions: 8500, netPay: 68500, status: "Paid", paidDate: "2025-05-31" },
  { id: "P003", month: "April 2025", basicSalary: 65000, hra: 12000, bonus: 3000, deductions: 8500, netPay: 71500, status: "Paid", paidDate: "2025-04-30" },
  { id: "P004", month: "March 2025", basicSalary: 62000, hra: 11000, bonus: 0, deductions: 8000, netPay: 65000, status: "Paid", paidDate: "2025-03-31" },
];

// ===== LEAVES =====
export const leaves = [
  { id: "L001", type: "Casual Leave", from: "2025-07-10", to: "2025-07-11", days: 2, status: "Approved", reason: "Personal work" },
  { id: "L002", type: "Sick Leave", from: "2025-06-20", to: "2025-06-21", days: 2, status: "Approved", reason: "Fever" },
  { id: "L003", type: "Earned Leave", from: "2025-08-01", to: "2025-08-05", days: 5, status: "Pending", reason: "Family vacation" },
  { id: "L004", type: "Casual Leave", from: "2025-05-15", to: "2025-05-15", days: 1, status: "Rejected", reason: "Festival" },
];

export const leaveBalance = { casual: 8, sick: 6, earned: 12, used: { casual: 3, sick: 2, earned: 0 } };

// ===== REWARDS =====
export const rewards = [
  { id: "R001", title: "Star Performer", description: "Outstanding delivery on Q2 sprint goals", date: "2025-06-15", type: "Achievement", points: 500 },
  { id: "R002", title: "Team Player", description: "Helped onboard 3 new developers", date: "2025-05-20", type: "Collaboration", points: 300 },
  { id: "R003", title: "Innovation Award", description: "Proposed blockchain-based attendance system", date: "2025-04-10", type: "Innovation", points: 750 },
  { id: "R004", title: "Bug Bounty", description: "Found and fixed critical auth vulnerability", date: "2025-03-25", type: "Technical", points: 400 },
];

// ===== WORK HISTORY =====
export const workHistory = [
  { id: "W001", project: "KetchWeave Core", role: "Frontend Developer", duration: "Jan 2025 – Present", status: "Active", contributions: 47 },
  { id: "W002", project: "HR Module v1", role: "Frontend Developer", duration: "Sep 2024 – Dec 2024", status: "Completed", contributions: 32 },
  { id: "W003", project: "Marketing Portal", role: "UI Support", duration: "Jun 2024 – Aug 2024", status: "Completed", contributions: 18 },
];

// ===== DEPARTMENTS =====
export const departments = [
  { name: "Engineering", headcount: 4, budget: 370000, manager: "Deepak Nair" },
  { name: "Design", headcount: 2, budget: 146000, manager: "Priya Patel" },
  { name: "Marketing", headcount: 2, budget: 130000, manager: "Sneha Gupta" },
];

// ===== JOB LISTINGS =====
export const jobListings = [
  { id: "J001", title: "Senior Solidity Developer", department: "Engineering", type: "Full-time", location: "Remote", status: "Open", applicants: 23, posted: "2025-06-20" },
  { id: "J002", title: "Product Designer", department: "Design", type: "Full-time", location: "Hybrid", status: "Open", applicants: 15, posted: "2025-07-01" },
  { id: "J003", title: "Growth Marketing Manager", department: "Marketing", type: "Full-time", location: "Remote", status: "Closed", applicants: 42, posted: "2025-05-15" },
  { id: "J004", title: "QA Engineer", department: "Engineering", type: "Contract", location: "Remote", status: "Open", applicants: 8, posted: "2025-07-05" },
];

// ===== ATTENDANCE =====
export const attendanceSummary = {
  present: 21, absent: 1, late: 2, wfh: 4, totalWorkingDays: 24,
};

// ===== ANNOUNCEMENTS =====
export const announcements = [
  { id: "A001", title: "Q3 All-Hands Meeting", date: "2025-07-20", content: "Join us for the quarterly town hall at 3 PM IST." },
  { id: "A002", title: "New Health Insurance Provider", date: "2025-07-15", content: "We've partnered with MedSecure for comprehensive coverage." },
  { id: "A003", title: "Office Renovation", date: "2025-07-10", content: "Bangalore office will undergo renovation from Aug 1-15." },
];

// ===== PAYROLL SUMMARY (HR) =====
export const payrollSummary = {
  totalPayroll: 646000,
  totalEmployees: 8,
  avgSalary: 80750,
  nextPayDate: "2025-07-31",
  pendingApprovals: 2,
};

// ===== RECRUITMENT PIPELINE =====
export const recruitmentPipeline = [
  { stage: "Applied", count: 88 },
  { stage: "Screening", count: 34 },
  { stage: "Interview", count: 18 },
  { stage: "Offer", count: 6 },
  { stage: "Hired", count: 3 },
];

import { Building2, UserCog, User, Users } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

const roles = [
  { icon: Building2, title: "Employer", desc: "Monitor workforce, manage operations, and oversee exit workflows", path: "/employer" },
  { icon: UserCog, title: "HR Admin", desc: "Handle onboarding, employee management, and exit processes", path: "/hr" },
  { icon: User, title: "Employee", desc: "Track tasks, manage leaves, view salary and achievements", path: "/employee" },
  { icon: Users, title: "Manager", desc: "Oversee team performance with audited access controls", path: "/manager" },
];

const RolesSection = () => {
  const { connected } = useWallet();
  const navigate = useNavigate();

  return (
    <section className="py-20" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Select Your Role
          </h2>
          <p className="mt-3 text-muted-foreground">
            Access your personalized dashboard based on your role
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r) => (
            <div
              key={r.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <r.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{r.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.desc}</p>
              <button
                className="mt-5 w-full rounded-xl py-2.5 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40"
                style={
                  connected
                    ? { background: "var(--gradient-primary)", color: "white" }
                    : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
                }
                disabled={!connected}
              >
                {connected ? "Enter Dashboard" : "Connect Wallet First"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;

import { Building2, UserCog, User, Users, ArrowRight } from "lucide-react";
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
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(250_85%_65%/0.06),transparent_60%)]" />
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Select Your <span className="glow-text">Role</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Access your personalized dashboard based on your role
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {roles.map((r, i) => (
            <div
              key={r.title}
              className="glass-card group flex flex-col rounded-2xl p-6"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(250_85%_65%/0.2)]">
                <r.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{r.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              <button
                className="mt-6 group/btn w-full rounded-xl py-3 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-30"
                style={
                  connected
                    ? { background: "var(--gradient-primary)", color: "white" }
                    : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
                }
                disabled={!connected}
                onClick={() => connected && navigate(r.path)}
              >
                {connected ? (
                  <>
                    Enter Dashboard
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </>
                ) : (
                  "Connect Wallet First"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;

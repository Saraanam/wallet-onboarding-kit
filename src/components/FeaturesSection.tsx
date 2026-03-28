import { Fingerprint, ShieldCheck, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Decentralized Identity",
    description: "Connect your Solana wallet for portable work credentials",
  },
  {
    icon: ShieldCheck,
    title: "Verified Work Proofs",
    description: "On-chain verification of employment and achievements",
  },
  {
    icon: Globe,
    title: "Portable Experience",
    description: "Export your work history to any future employer",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "You control what data is shared and with whom",
  },
];

const FeaturesSection = () => (
  <section className="py-20 relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(160_100%_40%/0.04),transparent_70%)]" />
    <div className="container relative mx-auto grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((f) => (
        <div
          key={f.title}
          className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
          style={{ boxShadow: "var(--shadow-card)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "var(--shadow-card-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "var(--shadow-card)")
          }
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <f.icon className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;

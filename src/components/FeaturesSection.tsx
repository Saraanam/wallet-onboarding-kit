import { Fingerprint, ShieldCheck, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Decentralized Identity",
    description: "Connect your Solana wallet for portable work credentials that you truly own.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Work Proofs",
    description: "On-chain verification of employment, achievements, and performance records.",
  },
  {
    icon: Globe,
    title: "Portable Experience",
    description: "Export your work history to any future employer, anywhere in the world.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "You control what data is shared and with whom. Zero-knowledge ready.",
  },
];

const FeaturesSection = () => (
  <section className="py-24 relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(250_85%_65%/0.04),transparent_70%)]" />
    <div className="container relative mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Why <span className="glow-text">KETCHUP</span>?
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          A new paradigm for human resources, built on trust and transparency.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="glass-card group rounded-2xl p-6"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(250_85%_65%/0.2)]">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;

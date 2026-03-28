import { ArrowRight, Play } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const HeroSection = () => {
  const { connected, publicKey } = useWallet();

  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(250_85%_65%/0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(217_91%_60%/0.08),transparent_50%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-3/4 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute -top-40 right-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px] animate-glow-pulse" />
      <div className="absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[150px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass-subtle px-4 py-2 text-sm font-medium text-primary mb-8">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Built on Solana
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="glow-text">Decentralized HR</span>{" "}
            for the Modern Workplace
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Own your work identity. Eliminate bias. Build trust with on-chain
            credentials. KETCHUP revolutionizes human resources with portable work
            proofs via Solana.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {connected ? (
              <div className="flex items-center gap-3 rounded-2xl glass-subtle px-6 py-3 glow-border">
                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-success" />
                <span className="font-display text-sm font-medium text-foreground">
                  Connected: {publicKey?.toBase58().slice(0, 6)}...{publicKey?.toBase58().slice(-4)}
                </span>
              </div>
            ) : (
              <WalletMultiButton
                style={{
                  background: "linear-gradient(135deg, hsl(250 85% 65%), hsl(217 91% 60%))",
                  borderRadius: "16px",
                  height: "52px",
                  fontSize: "16px",
                  fontFamily: "var(--font-display)",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            )}
            <button className="group inline-flex h-[52px] items-center gap-2 rounded-2xl glass-subtle px-6 font-display text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:shadow-[0_0_20px_hsl(250_85%_65%/0.1)]">
              <Play className="h-4 w-4 text-primary" />
              View Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Floating preview cards */}
        <div className="mt-20 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { label: "Verified Credentials", value: "12,847" },
            { label: "Active Organizations", value: "1,234" },
            { label: "On-chain Proofs", value: "89,321" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-5 text-center"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <p className="font-display text-2xl font-bold glow-text">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { Sparkles, ArrowRight } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const HeroSection = () => {
  const { connected, publicKey } = useWallet();

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(142_72%_50%/0.08),transparent_60%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-3/4 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary neon-glow">
          <Sparkles className="h-4 w-4" />
          Decentralized HR Platform
        </div>

        <h1 className="mx-auto mt-8 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Modern HR with{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent neon-glow">
            Blockchain
          </span>{" "}
          Credentials
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          KETCHUP revolutionizes human resources with decentralized identity and
          portable work proofs via Solana. Own your work history, forever.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {connected ? (
            <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-6 py-3 neon-border">
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
              <span className="font-display text-sm font-medium text-primary">
                Connected: {publicKey?.toBase58().slice(0, 6)}...{publicKey?.toBase58().slice(-4)}
              </span>
            </div>
          ) : (
            <WalletMultiButton
              style={{
                background: "linear-gradient(135deg, hsl(142 72% 50%), hsl(160 100% 40%))",
                borderRadius: "var(--radius)",
                height: "48px",
                fontSize: "16px",
                fontFamily: "var(--font-display)",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                color: "hsl(150 10% 4%)",
                fontWeight: 600,
              }}
            />
          )}
          <button className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 font-display text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:shadow-[0_0_15px_hsl(142_72%_50%/0.1)]">
            Learn More
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

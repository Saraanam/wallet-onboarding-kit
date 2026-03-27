import { Sparkles, ArrowRight } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const HeroSection = () => {
  const { connected, publicKey } = useWallet();

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          Decentralized HR Platform
        </div>

        <h1 className="mx-auto mt-8 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Modern HR with{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
            <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success/5 px-6 py-3">
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-success" />
              <span className="font-display text-sm font-medium text-foreground">
                Connected: {publicKey?.toBase58().slice(0, 6)}...{publicKey?.toBase58().slice(-4)}
              </span>
            </div>
          ) : (
            <WalletMultiButton
              style={{
                background: "linear-gradient(135deg, hsl(230 80% 60%), hsl(262 83% 58%))",
                borderRadius: "var(--radius)",
                height: "48px",
                fontSize: "16px",
                fontFamily: "var(--font-display)",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            />
          )}
          <button className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 font-display text-sm font-medium text-foreground shadow-sm transition-all hover:shadow-md">
            Learn More
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

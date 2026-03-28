import { BadgeCheck, Briefcase, CheckCircle } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const CredentialsSection = () => {
  const { connected } = useWallet();

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(217_91%_60%/0.06),transparent_50%)]" />
      <div className="container relative mx-auto grid items-center gap-16 px-4 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold status-active">
            <BadgeCheck className="h-3.5 w-3.5" />
            On-chain Verified
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Portable Work <span className="glow-text">Credentials</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Your employment history, achievements, and work proofs are stored securely
            on the Solana blockchain. Export your verified credentials to any
            employer, anywhere in the world.
          </p>
          <div className="mt-8">
            {!connected && (
              <WalletMultiButton
                style={{
                  background: "linear-gradient(135deg, hsl(250 85% 65%), hsl(217 91% 60%))",
                  borderRadius: "var(--radius)",
                  height: "44px",
                  fontSize: "14px",
                  fontFamily: "var(--font-display)",
                  color: "white",
                }}
              />
            )}
          </div>
        </div>

        {/* Mock credential card */}
        <div className="glass-card rounded-2xl p-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-sm font-medium text-success">Employment Verified</span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl btn-gradient font-display text-sm font-bold text-primary-foreground">
              K
            </div>
            <div>
              <p className="font-display font-semibold text-foreground">KETCHUP Inc.</p>
              <p className="text-xs text-muted-foreground">Role Verified</p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="font-display text-sm font-semibold text-foreground">Senior Developer</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl glass-subtle p-4">
              <p className="font-display text-xl font-bold glow-text">342</p>
              <p className="text-xs text-muted-foreground mt-1">Tasks Completed</p>
            </div>
            <div className="rounded-xl glass-subtle p-4">
              <p className="font-display text-xl font-bold glow-text">92%</p>
              <p className="text-xs text-muted-foreground mt-1">Avg Score</p>
            </div>
          </div>
          <div className="mt-5 border-t border-border/50 pt-4">
            <p className="text-xs text-muted-foreground">On-chain • Solana Devnet</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;

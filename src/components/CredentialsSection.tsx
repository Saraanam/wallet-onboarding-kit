import { BadgeCheck, Briefcase, CheckCircle } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const CredentialsSection = () => {
  const { connected } = useWallet();

  return (
    <section className="py-20">
      <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
            <BadgeCheck className="h-3.5 w-3.5" />
            On-chain Verified
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Portable Work Credentials
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Your employment history, achievements, and work proofs are stored securely
            on the Solana blockchain. Export your verified credentials to any
            employer, anywhere in the world.
          </p>
          <div className="mt-8">
            {!connected && (
              <WalletMultiButton
                style={{
                  background: "linear-gradient(135deg, hsl(230 80% 60%), hsl(262 83% 58%))",
                  borderRadius: "var(--radius)",
                  height: "44px",
                  fontSize: "14px",
                  fontFamily: "var(--font-display)",
                }}
              />
            )}
          </div>
        </div>

        {/* Mock credential card */}
        <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-sm font-medium text-success">Employment Verified</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-display text-sm font-bold text-primary">
              K
            </div>
            <div>
              <p className="font-display font-semibold text-foreground">KETCHUP Inc.</p>
              <p className="text-xs text-muted-foreground">Role Verified</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="font-display text-sm font-semibold text-foreground">Senior Developer</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted p-3">
              <p className="font-display text-lg font-bold text-foreground">342</p>
              <p className="text-xs text-muted-foreground">Tasks Completed</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="font-display text-lg font-bold text-foreground">92%</p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
          </div>
          <div className="mt-4 border-t border-border pt-3">
            <p className="text-xs text-muted-foreground">On-chain • Solana Devnet</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;

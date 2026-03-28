import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
  const { connected, publicKey } = useWallet();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl font-display text-sm font-bold text-primary-foreground btn-gradient">
            K
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            KETCHUP
          </span>
        </div>

        <div className="flex items-center gap-4">
          {connected && publicKey && (
            <div className="hidden items-center gap-2 rounded-full glass-subtle px-3 py-1.5 sm:flex">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground font-mono">
                {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
              </span>
            </div>
          )}
          <WalletMultiButton
            style={{
              background: "linear-gradient(135deg, hsl(250 85% 65%), hsl(217 91% 60%))",
              borderRadius: "var(--radius)",
              height: "40px",
              fontSize: "14px",
              fontFamily: "var(--font-display)",
              color: "white",
              fontWeight: 600,
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

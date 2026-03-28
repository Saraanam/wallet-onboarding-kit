import { Wallet } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
  const { connected, publicKey } = useWallet();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg font-display text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            K
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-primary neon-glow">
            KETCHUP
          </span>
        </div>

        <div className="flex items-center gap-3">
          {connected && publicKey && (
            <span className="hidden text-sm text-primary/70 font-mono sm:inline">
              {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </span>
          )}
          <WalletMultiButton
            style={{
              background: "linear-gradient(135deg, hsl(142 72% 50%), hsl(160 100% 40%))",
              borderRadius: "var(--radius)",
              height: "40px",
              fontSize: "14px",
              fontFamily: "var(--font-display)",
              color: "hsl(150 10% 4%)",
              fontWeight: 600,
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

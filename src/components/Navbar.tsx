import { Wallet } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
  const { connected, publicKey } = useWallet();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground">
            K
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            KETCHUP
          </span>
        </div>

        <div className="flex items-center gap-3">
          {connected && publicKey && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </span>
          )}
          <WalletMultiButton
            style={{
              background: "linear-gradient(135deg, hsl(230 80% 60%), hsl(262 83% 58%))",
              borderRadius: "var(--radius)",
              height: "40px",
              fontSize: "14px",
              fontFamily: "var(--font-display)",
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RolesSection from "@/components/RolesSection";
import CredentialsSection from "@/components/CredentialsSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="animate-page-in">
      <HeroSection />
      <FeaturesSection />
      <RolesSection />
      <CredentialsSection />
    </main>
    {/* Footer */}
    <footer className="border-t border-border/30 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-7 w-7 rounded-lg flex items-center justify-center btn-gradient text-xs font-bold text-primary-foreground">K</div>
          <span className="font-display font-bold text-foreground">KETCHUP</span>
        </div>
        <p className="text-sm text-muted-foreground">Decentralized HR on Solana. Own your work identity.</p>
        <p className="text-xs text-muted-foreground/50 mt-4">© 2026 KETCHUP. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

export default Index;

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RolesSection from "@/components/RolesSection";
import CredentialsSection from "@/components/CredentialsSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <RolesSection />
    <CredentialsSection />
  </div>
);

export default Index;

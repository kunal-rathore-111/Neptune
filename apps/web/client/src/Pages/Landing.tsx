import Audience from "@/components/landing/audience/Audience";
import Categories from "@/components/landing/categroies/Categories";
import Features from "@/components/landing/features/Features";
import GetStarted2 from "@/components/landing/getStarted2/GetStarted2";
import HeroWrapper from "@/components/landing/herosection/HeroSection";
import Footer from "@/components/landing/layout/Footer";
import { Nav } from "@/components/landing/layout/Nav";
import SampleCards from "@/components/landing/sampleCards/SampleCard";

export default function Landing() {
  return (
    <>
      <Nav />
      <main className="flex w-full flex-col space-y-32 px-4">
        <div>
          <HeroWrapper />
          <Categories />
        </div>
        <Features />
        <Audience />
        <SampleCards />
        <GetStarted2 />
        <Footer />
      </main>
    </>
  );
}

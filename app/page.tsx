import { Navbar01 } from "@/components/ui/navbar";
import { ExpertiseSection } from "@/components/ui/sections/expertise";
import { Hero } from "@/components/ui/sections/hero";
import { ExperienceSection } from "@/components/ui/sections/experience";
import { Footer } from "@/components/ui/sections/footer";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { SurfSection } from "@/components/ui/sections/surf";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <BackgroundGradientAnimation />
      </div>

      <Navbar01
        className="top-4"
        navigationLinks={[
          { href: "#about", label: "About" },
          { href: "#experience", label: "Experience" },
        ]}
        ctaText="Contact"
        ctaHref="mailto:leonardo.bruksch@gmail.com"
      />

      <section id="hero">
        <Hero />
      </section>

      <div className="font-sans items-center justify-items-center p-8 pb-20 sm:p-20">
        <main className="flex w-full flex-col gap-24 items-center sm:items-stretch">
          <section id="about" className="scroll-mt-32">
            <ExpertiseSection />
          </section>
          <section id="experience">
            <ExperienceSection />
          </section>
          <section id="surf">
            <SurfSection />
          </section>
        </main>
      </div>

      <section id="contact">
        <Footer />
      </section>
    </>
  );
}

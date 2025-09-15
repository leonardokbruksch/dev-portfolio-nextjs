import { Navbar01 } from "@/components/ui/navbar";
import { ExpertiseSection } from "@/components/ui/sections/expertise";
import { Hero } from "@/components/ui/sections/hero";
import { ExperienceSection } from "@/components/ui/sections/experience";

export default function Home() {
  return (
    <>
      <Navbar01
        className="top-4"
        navigationLinks={[
          { href: "#about", label: "About" },
          { href: "#experience", label: "Experience" },
        ]}
        ctaText="Contact"
        ctaHref="#contact"
      />
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex w-full flex-col gap-12 row-start-2 items-center sm:items-stretch">
          <section id="hero">
            <Hero />
          </section>
          <section id="about">
            <ExpertiseSection />
          </section>
          {/* <section id="experience">
            <ExperienceSection />
          </section> */}
        </main>
      </div>
    </>
  );
}

import type { Route } from "./+types/home";
import Nav from "~/components/layout/Nav";
import Footer from "~/components/layout/Footer";
import Hero from "~/components/sections/Hero";
import About from "~/components/sections/About";
import Skills from "~/components/sections/Skills";
import Projects from "~/components/sections/Projects";
import Certifications from "~/components/sections/Certifications";
import Timeline from "~/components/sections/Timeline";
import Contact from "~/components/sections/Contact";
import BotanicalDivider from "~/components/ui/BotanicalDivider";
import { PERSONAL } from "~/data/portfolio";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${PERSONAL.name} — Portfolio` },
    { name: "description", content: PERSONAL.tagline },
  ];
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BotanicalDivider />
        <About />
        <BotanicalDivider />
        <Skills />
        <BotanicalDivider />
        <Projects />
        <BotanicalDivider />
        <Certifications />
        <BotanicalDivider />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

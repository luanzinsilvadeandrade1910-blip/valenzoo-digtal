import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Contato } from "@/components/site/Contato";
import { Hero, Servicos, ComoFunciona, Portfolio, Depoimentos, Sobre } from "@/components/site/Sections";

const TITLE = "Valenzo — Sites profissionais para negócios locais";
const DESCRIPTION =
  "Criamos sites sob medida para salões de beleza, barbearias, clínicas de estética e comércios locais. Agendamento, catálogo e WhatsApp integrados. Entrega em até 15 dias.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Valenzo",
          description: DESCRIPTION,
          areaServed: "BR",
          email: "contato@valenzo.com.br",
          telephone: "+55 11 99999-9999",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Servicos />
        <ComoFunciona />
        <Portfolio />
        <Depoimentos />
        <Sobre />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}

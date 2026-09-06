import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Valenzo" },
      {
        name: "description",
        content:
          "Como a Valenzo coleta, usa, armazena e protege seus dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).",
      },
      { property: "og:title", content: "Política de Privacidade — Valenzo" },
      {
        property: "og:description",
        content:
          "Como a Valenzo coleta, usa, armazena e protege seus dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PoliticaPage,
});

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 text-xl font-bold tracking-tight text-foreground md:text-2xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{children}</p>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PoliticaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-28 pb-24 md:pt-36">
        <article className="container-site max-w-3xl">
          <p className="eyebrow">Documento legal</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-foreground md:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Última atualização: setembro de 2026.</p>

          <P>
            A Valenzo ("nós") respeita a sua privacidade e está comprometida em proteger os dados
            pessoais dos visitantes e clientes deste site. Esta Política de Privacidade explica como
            coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a Lei
            Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
          </P>
          <P>
            Ao utilizar este site e/ou preencher nosso formulário de contato, você concorda com os
            termos desta Política.
          </P>

          <H2>1. Quem somos</H2>
          <P>
            A Valenzo é um estúdio de criação de sites para negócios locais (salões de beleza,
            barbearias, clínicas de estética, lojas e comércios), com sede em São Paulo, SP.
          </P>
          <UL
            items={[
              "WhatsApp: (11) 96151-4831",
              "Instagram: @valenzoo__",
            ]}
          />

          <H2>2. Quais dados coletamos</H2>
          <P>
            Coletamos os dados que você nos fornece voluntariamente ao preencher o formulário de
            contato/orçamento neste site, incluindo:
          </P>
          <UL items={["Nome;", "E-mail;", "Telefone / WhatsApp;", "Tipo de negócio;", "Mensagem enviada."]} />
          <P>
            Também podemos coletar automaticamente dados de navegação (como páginas visitadas, tempo
            de permanência e tipo de dispositivo) por meio de cookies ou ferramentas de análise,
            quando aplicável.
          </P>

          <H2>3. Para que usamos seus dados</H2>
          <P>Utilizamos os dados coletados para as seguintes finalidades:</P>
          <UL
            items={[
              "Responder à sua solicitação de orçamento ou contato;",
              "Entender o seu negócio para elaborar uma proposta adequada;",
              "Entrar em contato via e-mail, telefone ou WhatsApp sobre os serviços solicitados;",
              "Melhorar a experiência de navegação no site;",
              "Cumprir obrigações legais ou regulatórias, quando exigido.",
            ]}
          />
          <P>
            Não utilizamos seus dados para finalidades diferentes das informadas, nem os vendemos a
            terceiros.
          </P>

          <H2>4. Compartilhamento de dados</H2>
          <P>
            Seus dados pessoais não são vendidos e só são compartilhados nas seguintes hipóteses:
          </P>
          <UL
            items={[
              "Com prestadores de serviço que auxiliam na operação do site (ex.: hospedagem, ferramentas de e-mail ou formulários), sempre sob obrigação de confidencialidade;",
              "Quando exigido por lei, ordem judicial ou autoridade competente.",
            ]}
          />

          <H2>5. Armazenamento e segurança</H2>
          <P>
            Adotamos medidas técnicas e administrativas razoáveis para proteger seus dados pessoais
            contra acessos não autorizados, perda, alteração ou vazamento. Seus dados são
            armazenados apenas pelo tempo necessário para cumprir as finalidades descritas nesta
            Política ou por exigência legal.
          </P>

          <H2>6. Cookies</H2>
          <P>
            Este site pode utilizar cookies para melhorar sua experiência de navegação. Você pode
            desativar os cookies nas configurações do seu navegador, embora isso possa afetar
            algumas funcionalidades do site.
          </P>

          <H2>7. Seus direitos como titular de dados</H2>
          <P>De acordo com a LGPD, você tem direito a:</P>
          <UL
            items={[
              "Confirmar a existência de tratamento dos seus dados;",
              "Acessar seus dados;",
              "Corrigir dados incompletos, inexatos ou desatualizados;",
              "Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;",
              "Solicitar a portabilidade dos dados a outro fornecedor de serviço;",
              "Revogar o consentimento e solicitar a eliminação dos dados tratados com base nele;",
              "Obter informações sobre com quem seus dados foram compartilhados.",
            ]}
          />
          <P>
            Para exercer esses direitos, entre em contato pelo nosso WhatsApp ou pelos canais
            informados na seção de contato do site.
          </P>

          <H2>8. Alterações nesta Política</H2>
          <P>
            Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças
            em nossas práticas ou na legislação aplicável. Recomendamos que você a revise com
            regularidade. A data da última atualização estará sempre indicada no topo desta página.
          </P>

          <H2>9. Contato</H2>
          <P>
            Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus
            dados pessoais, entre em contato conosco:
          </P>
          <UL items={["WhatsApp: (11) 96151-4831", "Instagram: @valenzoo__"]} />
        </article>
      </main>
      <Footer />
    </div>
  );
}

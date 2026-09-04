import { ArrowRight, ArrowUpRight, Scissors, Sparkles, Store, Wand2 } from "lucide-react";

import caseSalao from "@/assets/case-salao.jpg";
import caseBarbearia from "@/assets/case-barbearia.jpg";
import caseClinica from "@/assets/case-clinica.jpg";
import caseLoja from "@/assets/case-loja.jpg";

/* ---------------------------------- Hero ---------------------------------- */

export function Hero() {
  return (
    <section id="inicio" className="border-b border-border pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="container-site">
        <p className="eyebrow">Estúdio de sites — São Paulo</p>
        <h1 className="mt-6 max-w-5xl text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.045em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Sites profissionais para negócios que atendem pessoas de verdade.
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:col-span-7">
            A Valenzo projeta e desenvolve o site do seu salão, barbearia, clínica ou loja — com
            agendamento, catálogo e WhatsApp integrados. Entrega em até 15 dias, sem templates
            genéricos.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
            <a
              href="#contato"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Solicitar orçamento
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-foreground/30 px-6 text-sm font-semibold text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ver portfólio
            </a>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
          {[
            ["+60", "sites entregues"],
            ["15 dias", "prazo médio de entrega"],
            ["100%", "responsivos e otimizados"],
            ["4,9/5", "avaliação dos clientes"],
          ].map(([value, label]) => (
            <div key={label} className="bg-background px-6 py-7">
              <dt className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                {value}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------- Serviços -------------------------------- */

const SERVICOS = [
  {
    icon: Sparkles,
    title: "Salões de beleza",
    desc: "Site com agenda online, lista de serviços e preços, galeria de trabalhos e botão direto para o WhatsApp da recepção.",
    items: ["Agendamento online", "Cardápio de serviços", "Galeria de resultados"],
  },
  {
    icon: Scissors,
    title: "Barbearias",
    desc: "Presença forte e direta: horários, equipe de barbeiros, planos de assinatura e localização com rota no mapa.",
    items: ["Perfil dos barbeiros", "Planos e combos", "Mapa e horários"],
  },
  {
    icon: Wand2,
    title: "Clínicas de estética",
    desc: "Credibilidade em primeiro lugar: procedimentos explicados com clareza, antes e depois, e formulário de avaliação.",
    items: ["Página por procedimento", "Antes e depois", "Pré-agendamento"],
  },
  {
    icon: Store,
    title: "Lojas e comércios",
    desc: "Catálogo de produtos organizado por categoria, pedidos pelo WhatsApp e integração com Instagram e Google.",
    items: ["Catálogo por categoria", "Pedido via WhatsApp", "Google Perfil da Empresa"],
  },
];

export function Servicos() {
  return (
    <section id="servicos" className="border-b border-border py-24 md:py-32">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Serviços</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-foreground md:text-5xl">
              Feito para o segmento do seu negócio.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7 md:self-end">
            Cada segmento tem uma rotina diferente. Por isso, cada site da Valenzo nasce com as
            funções que o seu cliente realmente usa — nada a mais, nada a menos.
          </p>
        </div>

        <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {SERVICOS.map(({ icon: Icon, title, desc, items }) => (
            <article
              key={title}
              className="group flex flex-col bg-background p-8 transition-colors hover:bg-card"
            >
              <Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-8 text-xl font-bold tracking-tight text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <ul className="mt-8 space-y-2 border-t border-border pt-6 text-sm text-foreground/80">
                {items.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-px w-3 bg-foreground/60" aria-hidden />
                    {i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Como funciona ----------------------------- */

const ETAPAS = [
  {
    n: "01",
    title: "Briefing",
    desc: "Uma conversa de 30 minutos para entender o seu negócio, seus clientes e o que o site precisa resolver.",
  },
  {
    n: "02",
    title: "Design",
    desc: "Apresentamos o layout completo em até 5 dias úteis. Você aprova ou pede ajustes — sem limite de rodadas nessa fase.",
  },
  {
    n: "03",
    title: "Desenvolvimento",
    desc: "Construímos o site com foco em velocidade, celular e Google. Integramos agenda, catálogo e WhatsApp.",
  },
  {
    n: "04",
    title: "Publicação",
    desc: "Colocamos no ar no seu domínio, configuramos o Google Perfil da Empresa e treinamos você para atualizar o conteúdo.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="border-b border-border py-24 md:py-32">
      <div className="container-site">
        <p className="eyebrow">Como funciona</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-[-0.035em] text-foreground md:text-5xl">
          Quatro etapas. Nenhuma surpresa no caminho.
        </h2>

        <ol className="mt-16 grid gap-12 md:grid-cols-4 md:gap-8">
          {ETAPAS.map((e) => (
            <li key={e.n} className="border-t border-foreground pt-6">
              <span className="text-sm font-semibold tabular-nums text-muted-foreground">{e.n}</span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground">{e.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------- Portfólio ------------------------------- */

const CASES = [
  { img: caseSalao, name: "Studio Aline Ramos", seg: "Salão de beleza", city: "Pinheiros, SP" },
  { img: caseBarbearia, name: "Barbearia Oficina 42", seg: "Barbearia", city: "Santo André, SP" },
  { img: caseClinica, name: "Clínica Lume Estética", seg: "Clínica de estética", city: "Moema, SP" },
  { img: caseLoja, name: "Empório Sete Grãos", seg: "Loja de produtos naturais", city: "Campinas, SP" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="border-b border-border py-24 md:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Portfólio</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-foreground md:text-5xl">
              Projetos recentes.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Uma seleção de sites entregues nos últimos meses. Cada um foi desenhado do zero para o
            negócio e o público do cliente.
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {CASES.map((c) => (
            <article key={c.name} className="group">
              <a
                href="#contato"
                className="block overflow-hidden border border-border bg-card focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`Ver projeto ${c.name}`}
              >
                <img
                  src={c.img}
                  alt={`Site desenvolvido para ${c.name} — ${c.seg}`}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c.seg} · {c.city}
                  </p>
                </div>
                <a
                  href="#contato"
                  className="inline-flex h-9 shrink-0 items-center gap-1.5 border-b border-foreground/40 text-sm font-semibold text-foreground transition-colors hover:border-foreground focus-visible:outline-none focus-visible:border-foreground"
                >
                  Ver projeto
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Depoimentos ------------------------------ */

const DEPOIMENTOS = [
  {
    quote:
      "Antes eu marcava tudo pelo direct. Hoje 70% dos agendamentos entram sozinhos pelo site, inclusive de madrugada.",
    name: "Aline Ramos",
    role: "Studio Aline Ramos, Pinheiros",
  },
  {
    quote:
      "A Valenzo entendeu a identidade da barbearia no primeiro papo. O site ficou com a nossa cara e o Google começou a trazer gente nova.",
    name: "Rodrigo Tavares",
    role: "Barbearia Oficina 42, Santo André",
  },
  {
    quote:
      "Prazo cumprido, comunicação clara e um resultado que passa muito mais confiança para quem nos encontra pela primeira vez.",
    name: "Dra. Camila Lume",
    role: "Clínica Lume Estética, Moema",
  },
];

export function Depoimentos() {
  return (
    <section id="depoimentos" className="border-b border-border py-24 md:py-32">
      <div className="container-site">
        <p className="eyebrow">Depoimentos</p>
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
          {DEPOIMENTOS.map((d) => (
            <figure key={d.name} className="flex flex-col justify-between bg-background p-8 md:p-10">
              <blockquote className="text-lg leading-relaxed font-medium tracking-tight text-foreground">
                “{d.quote}”
              </blockquote>
              <figcaption className="mt-10 border-t border-border pt-5 text-sm">
                <span className="block font-semibold text-foreground">{d.name}</span>
                <span className="text-muted-foreground">{d.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Sobre --------------------------------- */

export function Sobre() {
  return (
    <section id="sobre" className="border-b border-border py-24 md:py-32">
      <div className="container-site grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">Sobre a Valenzo</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-foreground md:text-5xl">
            Um estúdio pequeno, focado em negócios locais.
          </h2>
        </div>
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6">
          <p>
            A Valenzo nasceu em 2021, em São Paulo, depois de percebermos que salões, barbearias e
            pequenos comércios ficavam entre duas opções ruins: um template genérico que não
            converte, ou uma agência grande que cobra caro e demora meses.
          </p>
          <p>
            Nossa missão é simples: dar a negócios de bairro um site com o mesmo nível de cuidado
            que uma grande marca teria — e fazer isso em semanas, não em meses.
          </p>
          <dl className="grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
            {[
              ["Agilidade", "Do briefing à publicação em até 15 dias úteis."],
              ["Sob medida", "Nenhum layout é reaproveitado entre clientes."],
              ["Foco local", "Pensado para quem atende presencialmente."],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="font-bold text-foreground">{t}</dt>
                <dd className="mt-1.5 text-sm">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

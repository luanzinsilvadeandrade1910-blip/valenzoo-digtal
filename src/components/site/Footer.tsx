import { Link } from "@tanstack/react-router";

const LINKS = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Portfólio", href: "/#portfolio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" className="text-2xl font-extrabold tracking-[-0.04em] text-foreground">
            Valenzo<span className="text-muted-foreground">.</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Estúdio de criação de sites para salões, barbearias, clínicas de estética e comércios
            locais. Design sob medida, entrega rápida, resultado real.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">Navegação</p>
          <ul className="mt-4 space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground underline-offset-4 hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow">Redes e contato</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href="https://instagram.com/valenzo"
                target="_blank"
                rel="noreferrer"
                className="text-foreground/80 transition-colors hover:text-foreground underline-offset-4 hover:underline"
              >
                Instagram — @valenzo
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
                className="text-foreground/80 transition-colors hover:text-foreground underline-offset-4 hover:underline"
              >
                WhatsApp — (11) 99999-9999
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@valenzo.com.br"
                className="text-foreground/80 transition-colors hover:text-foreground underline-offset-4 hover:underline"
              >
                contato@valenzo.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} Valenzo. Todos os direitos reservados.</p>
          <p>São Paulo, SP — atendemos todo o Brasil.</p>
        </div>
      </div>
    </footer>
  );
}

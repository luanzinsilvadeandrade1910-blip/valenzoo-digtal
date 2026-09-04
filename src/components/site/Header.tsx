import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Portfólio", href: "/#portfolio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-[-0.04em] text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
          aria-label="Valenzo — página inicial"
        >
          Valenzo<span className="text-muted-foreground">.</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground focus-visible:underline underline-offset-4"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <ThemeToggle />
          {!loading && user ? (
            <Link
              to="/painel"
              className="inline-flex h-9 items-center rounded-sm bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Meu painel
            </Link>
          ) : (
            <Link
              to="/auth"
              className="inline-flex h-9 items-center rounded-sm border border-foreground/30 px-4 text-sm font-semibold text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Entrar
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background lg:hidden",
          open ? "max-h-[28rem]" : "max-h-0 border-t-0",
        )}
      >
        <nav className="container-site flex flex-col py-4" aria-label="Navegação móvel">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3 text-base font-medium text-foreground last:border-b-0 hover:text-muted-foreground"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4">
            {!loading && user ? (
              <Link
                to="/painel"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-primary text-sm font-semibold text-primary-foreground"
              >
                Meu painel
              </Link>
            ) : (
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-full items-center justify-center rounded-sm border border-foreground/30 text-sm font-semibold text-foreground"
              >
                Entrar
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

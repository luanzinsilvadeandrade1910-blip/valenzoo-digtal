import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Valenzo" },
      { name: "description", content: "Acesse o painel do cliente Valenzo para acompanhar o andamento do seu site." },
      { property: "og:title", content: "Entrar — Valenzo" },
      { property: "og:description", content: "Acesse o painel do cliente Valenzo." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const loginSchema = z.object({
  email: z.string().trim().email("Informe um e-mail válido.").max(255),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres.").max(72),
});

const signupSchema = loginSchema.extend({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
});

type Mode = "login" | "signup";
type Errors = Partial<Record<"nome" | "email" | "password", string>>;

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/painel", replace: true });
  }, [user, loading, navigate]);

  function switchMode(next: Mode) {
    setMode(next);
    setErrors({});
    setConfirmSent(false);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    const parsed =
      mode === "login"
        ? loginSchema.safeParse({ email, password })
        : signupSchema.safeParse({ nome, email, password });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) {
          toast.error(
            error.message.includes("Invalid login credentials")
              ? "E-mail ou senha incorretos."
              : error.message.includes("Email not confirmed")
                ? "Confirme seu e-mail antes de entrar."
                : "Não foi possível entrar. Tente novamente.",
          );
          return;
        }
        navigate({ to: "/painel", replace: true });
      } else {
        const data = parsed.data as z.infer<typeof signupSchema>;
        const { data: result, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/painel`,
            data: { nome: data.nome },
          },
        });
        if (error) {
          toast.error(
            error.message.includes("already registered")
              ? "Este e-mail já possui cadastro. Faça login."
              : "Não foi possível criar sua conta. Tente novamente.",
          );
          return;
        }
        if (result.session) {
          navigate({ to: "/painel", replace: true });
        } else {
          setConfirmSent(true);
        }
      }
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "h-11 w-full rounded-sm border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-ring";

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="hidden flex-col justify-between border-r border-border bg-card p-10 lg:flex">
        <Link to="/" className="text-2xl font-extrabold tracking-[-0.04em] text-foreground">
          Valenzo<span className="text-muted-foreground">.</span>
        </Link>
        <blockquote className="max-w-md">
          <p className="text-2xl leading-snug font-semibold tracking-tight text-foreground">
            “Hoje 70% dos agendamentos entram sozinhos pelo site, inclusive de madrugada.”
          </p>
          <footer className="mt-6 text-sm text-muted-foreground">
            Aline Ramos — Studio Aline Ramos, Pinheiros
          </footer>
        </blockquote>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Valenzo</p>
      </aside>

      <main className="flex flex-col px-6 py-8 md:px-12">
        <div className="flex items-center justify-between lg:justify-end">
          <Link to="/" className="text-xl font-extrabold tracking-[-0.04em] text-foreground lg:hidden">
            Valenzo<span className="text-muted-foreground">.</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <div className="mb-8 flex border-b border-border" role="tablist" aria-label="Entrar ou criar conta">
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className={`-mb-px border-b-2 px-1 pb-3 mr-8 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-foreground ${
                  mode === m
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Entrar" : "Criar conta"}
              </button>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold tracking-[-0.035em] text-foreground">
            {mode === "login" ? "Acesse o seu painel." : "Crie a sua conta."}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login"
              ? "Acompanhe o andamento do seu site e fale com a equipe."
              : "Leva menos de um minuto. Você acompanha tudo por aqui."}
          </p>

          {confirmSent ? (
            <div className="mt-8 border border-border bg-card p-6">
              <p className="font-semibold text-foreground">Confirme seu e-mail</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enviamos um link de confirmação para <span className="font-medium text-foreground">{email}</span>.
                Abra o e-mail e clique no link para ativar sua conta.
              </p>
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="mt-5 text-sm font-semibold text-foreground underline-offset-4 hover:underline cursor-pointer"
              >
                Voltar para o login
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
              {mode === "signup" && (
                <div>
                  <label htmlFor="nome" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    autoComplete="name"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={inputClass}
                    placeholder="Seu nome completo"
                    aria-invalid={!!errors.nome}
                    aria-describedby={errors.nome ? "nome-error" : undefined}
                  />
                  {errors.nome && <p id="nome-error" className="mt-1.5 text-xs text-destructive">{errors.nome}</p>}
                </div>
              )}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="voce@exemplo.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="Mínimo de 6 caracteres"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                {errors.password && <p id="password-error" className="mt-1.5 text-xs text-destructive">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 cursor-pointer"
              >
                {submitting ? "Aguarde…" : mode === "login" ? "Entrar" : "Criar conta"}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Ainda não tem conta? " : "Já tem conta? "}
            <button
              type="button"
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
              className="font-semibold text-foreground underline-offset-4 hover:underline cursor-pointer"
            >
              {mode === "login" ? "Criar conta" : "Entrar"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

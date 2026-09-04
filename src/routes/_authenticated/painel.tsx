import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

type Profile = {
  id: string;
  nome: string;
  email: string;
  project_status: string;
  created_at: string;
};

const ETAPAS = ["Aguardando briefing", "Em design", "Em desenvolvimento", "Aguardando aprovação", "Publicado"];

export const Route = createFileRoute("/_authenticated/painel")({
  head: () => ({
    meta: [
      { title: "Meu painel — Valenzo" },
      { name: "description", content: "Acompanhe o andamento do seu projeto com a Valenzo." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Painel,
});

function Painel() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (cancelled) return;
      if (data) {
        setProfile(data);
      } else {
        // First access: create the profile from the signup metadata.
        const nome = (user.user_metadata?.nome as string | undefined) ?? "";
        const { data: created } = await supabase
          .from("profiles")
          .insert({ id: user.id, nome, email: user.email ?? "" })
          .select("*")
          .single();
        if (!cancelled && created) setProfile(created);
      }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [user.id, user.email, user.user_metadata]);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const nome = profile?.nome || (user.user_metadata?.nome as string | undefined) || "";
  const status = profile?.project_status ?? ETAPAS[0];
  const currentIdx = Math.max(0, ETAPAS.indexOf(status));
  const since = profile
    ? new Date(profile.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-24 md:pt-40">
        <div className="container-site">
          <div className="flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Meu painel</p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-foreground md:text-6xl">
                {loading ? "Carregando…" : `Bem-vindo(a)${nome ? `, ${nome.split(" ")[0]}` : ""}.`}
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Aqui você acompanha o andamento do seu site. Em breve, esta área também terá arquivos,
                aprovações e mensagens diretas com a equipe.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex h-10 items-center gap-2 self-start rounded-sm border border-foreground/30 px-4 text-sm font-semibold text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>

          <div className="mt-12 grid gap-px border border-border bg-border lg:grid-cols-3">
            <section className="bg-background p-8 lg:col-span-2">
              <p className="eyebrow">Status do projeto</p>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">{status}</p>
              <ol className="mt-10 grid grid-cols-5 gap-2" aria-label="Etapas do projeto">
                {ETAPAS.map((e, i) => (
                  <li key={e} className="flex flex-col gap-3">
                    <span
                      className={`h-1 w-full ${i <= currentIdx ? "bg-foreground" : "bg-border"}`}
                      aria-hidden
                    />
                    <span
                      className={`text-[11px] leading-tight font-semibold uppercase tracking-wider ${
                        i <= currentIdx ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {e}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm text-muted-foreground">
                Próximo passo: nossa equipe entrará em contato para agendar o briefing. Se preferir,
                <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="ml-1 font-semibold text-foreground underline-offset-4 hover:underline">
                  fale conosco no WhatsApp
                </a>
                .
              </p>
            </section>

            <section className="bg-background p-8">
              <p className="eyebrow">Seus dados</p>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-muted-foreground">Nome</dt>
                  <dd className="mt-0.5 font-semibold text-foreground">{nome || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">E-mail</dt>
                  <dd className="mt-0.5 font-semibold text-foreground break-all">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Cliente desde</dt>
                  <dd className="mt-0.5 font-semibold text-foreground">{since || "—"}</dd>
                </div>
              </dl>
              <Link
                to="/"
                hash="contato"
                className="mt-8 inline-flex h-10 w-full items-center justify-center rounded-sm bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
              >
                Solicitar novo projeto
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

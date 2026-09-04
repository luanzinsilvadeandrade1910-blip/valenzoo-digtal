import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

const TIPOS = ["Salão de beleza", "Barbearia", "Clínica de estética", "Loja / comércio", "Outro"];

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
  email: z.string().trim().email("Informe um e-mail válido.").max(255),
  telefone: z
    .string()
    .trim()
    .max(20, "Telefone muito longo.")
    .refine((v) => v === "" || /^[\d\s()+-]{8,20}$/.test(v), "Informe um telefone válido."),
  tipo_negocio: z.string().refine((v) => TIPOS.includes(v), "Selecione o tipo de negócio."),
  mensagem: z.string().trim().min(10, "Conte um pouco mais (mínimo 10 caracteres).").max(1000, "Máximo de 1000 caracteres."),
});

type Fields = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { nome: "", email: "", telefone: "", tipo_negocio: "", mensagem: "" };

export function Contato() {
  const [form, setForm] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.from("contatos").insert(parsed.data);
    setSubmitting(false);
    if (error) {
      toast.error("Não foi possível enviar sua mensagem. Tente novamente em instantes.");
      return;
    }
    setSent(true);
    setForm(EMPTY);
  }

  const inputClass =
    "h-11 w-full rounded-sm border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-ring";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <section id="contato" className="py-24 md:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Contato</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-foreground md:text-5xl">
            Vamos conversar sobre o seu site.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Conte um pouco sobre o seu negócio. Respondemos em até um dia útil com um orçamento
            fechado e um prazo de entrega.
          </p>

          <dl className="mt-12 space-y-6 border-t border-border pt-8 text-sm">
            <div>
              <dt className="text-muted-foreground">WhatsApp</dt>
              <dd className="mt-1">
                <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="font-semibold text-foreground underline-offset-4 hover:underline">
                  (11) 99999-9999
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">E-mail</dt>
              <dd className="mt-1">
                <a href="mailto:contato@valenzo.com.br" className="font-semibold text-foreground underline-offset-4 hover:underline">
                  contato@valenzo.com.br
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Instagram</dt>
              <dd className="mt-1">
                <a href="https://instagram.com/valenzo" target="_blank" rel="noreferrer" className="font-semibold text-foreground underline-offset-4 hover:underline">
                  @valenzo
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {sent ? (
            <div className="flex h-full flex-col justify-center border border-border bg-card p-10">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-foreground">Mensagem enviada.</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Obrigado pelo contato. Você receberá nossa resposta em até um dia útil no e-mail
                informado.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 self-start text-sm font-semibold text-foreground underline-offset-4 hover:underline cursor-pointer"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-nome" className={labelClass}>Nome</label>
                <input id="c-nome" name="nome" autoComplete="name" value={form.nome} onChange={set("nome")} className={inputClass} placeholder="Seu nome" aria-invalid={!!errors.nome} />
                {errors.nome && <p className="mt-1.5 text-xs text-destructive">{errors.nome}</p>}
              </div>
              <div>
                <label htmlFor="c-email" className={labelClass}>E-mail</label>
                <input id="c-email" name="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} className={inputClass} placeholder="voce@exemplo.com" aria-invalid={!!errors.email} />
                {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="c-telefone" className={labelClass}>Telefone / WhatsApp</label>
                <input id="c-telefone" name="telefone" type="tel" autoComplete="tel" value={form.telefone} onChange={set("telefone")} className={inputClass} placeholder="(11) 99999-9999" aria-invalid={!!errors.telefone} />
                {errors.telefone && <p className="mt-1.5 text-xs text-destructive">{errors.telefone}</p>}
              </div>
              <div>
                <label htmlFor="c-tipo" className={labelClass}>Tipo de negócio</label>
                <select id="c-tipo" name="tipo_negocio" value={form.tipo_negocio} onChange={set("tipo_negocio")} className={`${inputClass} appearance-none`} aria-invalid={!!errors.tipo_negocio}>
                  <option value="" disabled>Selecione</option>
                  {TIPOS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.tipo_negocio && <p className="mt-1.5 text-xs text-destructive">{errors.tipo_negocio}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-mensagem" className={labelClass}>Mensagem</label>
                <textarea id="c-mensagem" name="mensagem" rows={5} value={form.mensagem} onChange={set("mensagem")} className={`${inputClass} h-auto py-3 resize-y`} placeholder="O que o seu site precisa fazer? Já tem domínio, Instagram, fotos?" aria-invalid={!!errors.mensagem} />
                {errors.mensagem && <p className="mt-1.5 text-xs text-destructive">{errors.mensagem}</p>}
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 w-full items-center justify-center rounded-sm bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 sm:w-auto cursor-pointer"
                >
                  {submitting ? "Enviando…" : "Solicitar orçamento"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

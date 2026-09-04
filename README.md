# Valenzo Studio (13)

Crie um site institucional para a Valenzo, uma empresa que desenvolve sites profissionais para outros negócios (salões de beleza, barbearias, clínicas de estética, lojas e pequenos comércios em geral).

OBJETIVO DO SITE

Um site de vitrine/portfólio para captar novos clientes que querem contratar a Valenzo para criar o site do negócio deles. Precisa parecer um site feito por um estúdio profissional de verdade — nada de layout genérico ou com "cara de IA": sem gradientes roxo/azul clichês, sem ícones de foguete/robô, sem textos motivacionais vagos. Design sóbrio, tipográfico, com bastante espaço em branco (ou preto) e hierarquia visual clara.

IDENTIDADE VISUAL

- Nome da marca: Valenzo

- Paleta: preto e branco, com o preto predominando (tema padrão é o modo escuro/"night")

- Tipografia: uma fonte sans-serif moderna e elegante (ex: Inter, Neue Montreal ou similar), com bom contraste de pesos (títulos bem bold, texto corrido leve)

- Sem gradientes, sem emojis, sem ilustrações "fofas" — usar fotografia real (placeholders) ou formas geométricas simples em preto/branco

TEMA CLARO/ESCURO

Implemente um botão fixo (canto superior direito do header) para alternar entre dois temas:

- "Night" (padrão): fundo preto (#0A0A0A), texto branco/cinza claro

- "Clear": fundo branco (#FFFFFF), texto preto/cinza escuro

A escolha do usuário deve persistir (salvar preferência) e a transição entre os temas deve ser suave (fade), não abrupta.

ESTRUTURA DO SITE (páginas/seções)

1. Header fixo

   - Logo "Valenzo" (texto, tipografia forte)

   - Menu: Início, Serviços, Portfólio, Sobre, Contato

   - Botão de tema (Clear/Night)

   - Botão "Entrar" (login)

2. Hero (Início)

   - Título forte e direto sobre criar sites profissionais para negócios locais

   - Subtítulo curto explicando a proposta

   - Botão de CTA "Solicitar orçamento" e botão secundário "Ver portfólio"

3. Serviços

   Cards/seções para os principais segmentos atendidos:

   - Salões de beleza

   - Barbearias

   - Clínicas de estética

   - Lojas e comércios em geral

   Cada card com um ícone simples (linha, não emoji), título e descrição curta do que a Valenzo entrega (site responsivo, agendamento online, catálogo, integração com WhatsApp, etc.)

4. Como funciona

   Um passo a passo simples (3 a 4 etapas) do processo: Briefing → Design → Desenvolvimento → Entrega/Publicação

5. Portfólio

   Grid de cases (usar placeholders de imagem por enquanto), cada um com nome do cliente/segmento e um botão "Ver projeto"

6. Depoimentos

   Seção simples com 2-3 depoimentos de clientes fictícios (placeholder), formato citação

7. Sobre a Valenzo

   Texto curto sobre a empresa, missão e diferencial (agilidade, design sob medida, foco em negócios locais)

8. Contato

   Formulário (nome, e-mail, telefone, tipo de negócio, mensagem) + informações de contato (WhatsApp, e-mail, Instagram)

9. Footer

   Logo, links rápidos, redes sociais, copyright

SISTEMA DE LOGIN (com banco de dados SQL)

Implemente autenticação real usando Supabase (login com e-mail e senha):

- Página/modal de Login e Cadastro

- Tabela de usuários no banco (SQL) armazenando: nome, e-mail, senha (hash, gerenciado pelo Supabase Auth), data de cadastro

- Após login, o usuário (cliente da Valenzo) acessa uma área restrita simples ("Meu Painel") onde poderá futuramente acompanhar o andamento do site dele — por enquanto pode ser uma tela simples de "Bem-vindo(a)" com os dados do usuário e status fictício do projeto ("Em desenvolvimento", "Aguardando aprovação" etc.)

- Proteja a rota do painel: só acessível se estiver logado, redirecionar para login caso não esteja

- Botão de logout

REQUISITOS TÉCNICOS E DE QUALIDADE

- Totalmente responsivo (mobile, tablet, desktop)

- Performance: imagens otimizadas, sem elementos pesados desnecessários

- Sem textos "lorem ipsum" — use textos reais em português, coerentes com o negócio da Valenzo

- Sem elementos decorativos aleatórios (blobs, partículas, confetes)

- Botões e links com estados de hover/focus bem definidos

- Site pronto para publicação (produção), não um protótipo

```

---

## PROMPTS DE REFINAMENTO (use depois que o site inicial for gerado)

**Para ajustar o toggle de tema:**

```

Ajuste o botão de alternância de tema para ficar mais discreto e elegante: um switch pequeno com os textos "Clear" e "Night" nas extremidades, sem ícones de sol/lua genéricos. Garanta que todos os componentes (cards, formulário, footer) respeitem o tema ativo.

```

**Para refinar a sensação "menos IA":**

```

Revise o design geral removendo qualquer elemento que pareça genérico ou "gerado por IA": troque textos vagos por textos específicos sobre a Valenzo, ajuste espaçamentos para ficarem mais consistentes, e garanta que a tipografia tenha uma hierarquia clara entre títulos, subtítulos e texto corrido.

```

**Para o login:**

```

Configure a autenticação usando Supabase Auth com login por e-mail e senha. Crie a tabela "profiles" vinculada ao usuário autenticado, com os campos nome, e-mail e data de criação. Adicione validação de formulário (e-mail válido, senha mínima de 6 caracteres) e mensagens de erro claras.

```

**Para o formulário de contato:**

```

Conecte o formulário de contato a uma tabela no Supabase chamada "contatos", salvando nome, e-mail, telefone, tipo de negócio e mensagem, com data/hora de envio. Mostre uma confirmação visual de sucesso após o envio.

```

---

### Dicas rápidas

- Envie o prompt principal de uma vez só — o Lovable já vai gerar a estrutura completa com Supabase configurável.

- Depois, vá ajustando seção por seção com os prompts de refinamento acima (ou peça algo específico do tipo "deixe o hero mais alto" etc.).

- Se quiser trocar os textos de exemplo pelos textos reais da Valenzo (missão, diferenciais, cases reais), me diga e eu escrevo o conteúdo definitivo para você colar.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://valenzoo-digtal.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/30b791ad-254a-44e2-91be-778b70fc4203).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

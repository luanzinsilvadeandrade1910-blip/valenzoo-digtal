/**
 * ENVIO DO FORMULÁRIO DE CONTATO POR E-MAIL — via EmailJS
 * ---------------------------------------------------------
 * Já configurado com os valores do seu painel EmailJS.
 * Essa função NÃO altera nada visual do site. Ela só precisa ser
 * chamada dentro do "onSubmit" do formulário que já existe
 * (seção Contato: Nome, E-mail, Telefone, Tipo de negócio, Mensagem).
 *
 * ANTES DE USAR:
 * 1. Instalar a lib no projeto: npm install @emailjs/browser
 *    (ou pedir pro Lovable: "instale a biblioteca @emailjs/browser")
 * 2. Pedir pro Lovable chamar sendContactForm(dados) no onSubmit
 *    do formulário existente na seção Contato, sem mudar o visual.
 */

import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_5ja7sij";
const EMAILJS_TEMPLATE_ID = "template_ofskjzt";
const EMAILJS_PUBLIC_KEY = "61MOecfzdjKCelMTF";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
}

/**
 * Envia os dados do formulário de contato por e-mail
 * para valeenzoo.commercy@gmail.com e luanzinsilvadeandrade1910@gmail.com.
 *
 * Exemplo de uso dentro do formulário existente:
 *
 *   async function handleSubmit(e: React.FormEvent) {
 *     e.preventDefault();
 *     try {
 *       await sendContactForm({
 *         name: nome,
 *         email: email,
 *         phone: telefone,
 *         businessType: tipoDeNegocio,
 *         message: mensagem,
 *       });
 *       alert("Mensagem enviada com sucesso!");
 *     } catch (err) {
 *       alert("Erro ao enviar. Tente novamente.");
 *     }
 *   }
 */
export async function sendContactForm(data: ContactFormData) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      business_type: data.businessType,
      message: data.message,
    },
    EMAILJS_PUBLIC_KEY
  );
}

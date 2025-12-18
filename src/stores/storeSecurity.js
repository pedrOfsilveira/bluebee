import { defineStore } from "pinia";
import { ref } from "vue";

export const useSecurityStore = defineStore("security", () => {
  const scams = ref([
    {
      id: 1,
      title: "Golpe da Mão Fantasma",
      severity: "high",
      icon: "fas fa-mobile-screen-button",
      description:
        "Criminosos acessam seu celular remotamente e limpam a conta.",
      content:
        'Você recebe uma ligação dizendo que há uma invasão na sua conta e precisa instalar um "app de segurança" ou clicar num link para "varredura". Ao fazer isso, você dá acesso total ao bandido, que movimenta o celular como se fosse um fantasma.',
      tip: "Bancos NUNCA pedem para instalar aplicativos de suporte (como TeamViewer ou AnyDesk) por telefone.",
    },
    {
      id: 2,
      title: "Golpe da Maquininha (Delivery)",
      severity: "high",
      icon: "fas fa-pizza-slice",
      description:
        "Entregador cobra taxa extra e passa valor alto no visor quebrado.",
      content:
        'Ao receber um pedido (geralmente iFood/Rappi), o entregador diz que houve um erro e precisa cobrar uma "taxa de entrega" extra na hora. A tela da máquina está quebrada ou escura, e ele digita R$ 3.000 em vez de R$ 5,00.',
      tip: "Se o pedido foi pago no app, não pague NADA na entrega. Se insistirem, não receba e reporte ao app.",
    },
    {
      id: 3,
      title: "Urubu do Pix",
      severity: "high",
      icon: "fas fa-dove",
      description:
        "Promessas falsas de multiplicar dinheiro rápido via transferência.",
      content:
        'Golpistas pedem um depósito inicial (ex: R$ 50) prometendo devolver muito mais (ex: R$ 500) em minutos. Após receberem, bloqueiam a vítima. Tabelas de "investimento" no Instagram são sempre golpe.',
      tip: "Não existe investimento com retorno garantido e imediato de 100% ou 1000%.",
    },
    {
      id: 4,
      title: "Falso Motoboy",
      severity: "high",
      icon: "fas fa-motorcycle",
      description:
        'Golpista finge ser do banco para buscar seu cartão "clonado".',
      content:
        'Ligam simulando o banco e pedem para você cortar o cartão ao meio por segurança. O chip permanece intacto e eles mandam um motoboy buscar para "perícia". O banco jamais faz isso.',
      tip: "Nunca entregue seu cartão a ninguém. Se precisar descartar, destrua o CHIP.",
    },
    {
      id: 5,
      title: "Golpe do Instagram (Perfil Hackeado)",
      severity: "high",
      icon: "fab fa-instagram",
      description:
        "Amigo ou parente anunciando móveis/eletrônicos muito baratos.",
      content:
        "Criminosos invadem a conta e postam stories dizendo que o dono vai se mudar e precisa vender tudo urgente (TV, iPhone, Geladeira). Você faz o Pix achando que é para seu amigo, mas é para o golpista.",
      tip: "Ligue para o amigo (por voz) ou peça um áudio específico antes de comprar qualquer coisa de stories.",
    },
    {
      id: 6,
      title: "Golpe do Empréstimo",
      severity: "high",
      icon: "fas fa-hand-holding-usd",
      description: "Exigência de pagamento antecipado para liberar crédito.",
      content:
        'Oferecem empréstimo fácil para negativados, mas exigem um depósito prévio referente a "taxa de cartório", "seguro" ou "IOF". Nenhuma instituição financeira séria cobra para liberar dinheiro.',
      tip: "Nunca pague taxas antecipadas para obter um empréstimo.",
    },
    {
      id: 7,
      title: "Pirâmide Financeira",
      severity: "high",
      icon: "fas fa-shapes",
      description:
        "Esquema que depende de recrutar pessoas, não de vender produtos.",
      content:
        "Prometem lucros fixos e altos (ex: 10% ao mês) sem risco. O dinheiro dos novos membros paga os antigos. Quando a entrada de pessoas diminui, o esquema quebra e todos perdem.",
      tip: "Fuja de promessas de lucro fácil que exigem indicar novos membros.",
    },

    {
      id: 8,
      title: "Falsa Central 0800",
      severity: "medium",
      icon: "fas fa-headset",
      description:
        "SMS falso avisando de compra aprovada e pedindo para ligar.",
      content:
        'Você recebe um SMS: "Compra aprovada de R$ 2.900. Se não reconhece, ligue 0800-123-456". Ao ligar, uma falsa atendente induz você a fazer um Pix para "cancelar" a operação ou "proteger" a conta.',
      tip: "Nunca ligue para 0800 recebido por SMS. Ligue apenas para o número atrás do seu cartão.",
    },
    {
      id: 9,
      title: "Clonagem de WhatsApp",
      severity: "medium",
      icon: "fab fa-whatsapp",
      description:
        "Alguém pede dinheiro fingindo ser você (roubo de conta ou foto).",
      content:
        'Roubam sua conta (via código SMS) ou criam um perfil fake com sua foto dizendo "troquei de número". Inventam uma emergência médica ou conta para pagar e pedem dinheiro aos seus contatos.',
      tip: 'Ative a "Confirmação em Duas Etapas" e oculte sua foto de perfil para quem não é contato.',
    },
    {
      id: 10,
      title: "Golpe do Amor (Don Juan)",
      severity: "medium",
      icon: "fas fa-heart-broken",
      description: "Relacionamento online que evolui para pedidos de dinheiro.",
      content:
        "O golpista cria um perfil atraente em apps de namoro, ganha sua confiança por meses e depois inventa um drama (doença, bagagem presa na alfândega) pedindo dinheiro emprestado.",
      tip: "Nunca envie dinheiro para alguém que você conheceu online e nunca viu pessoalmente.",
    },
    {
      id: 11,
      title: "Boleto Falso",
      severity: "medium",
      icon: "fas fa-barcode",
      description:
        "Boletos adulterados (luz, condomínio, internet) que desviam o pagamento.",
      content:
        "O código de barras é alterado por vírus no computador ou enviado por e-mail falso. O boleto parece perfeito, mas o beneficiário final é a conta do golpista.",
      tip: "Sempre confira os dados do beneficiário (Nome e CNPJ) na tela do app bancário antes de confirmar.",
    },
    {
      id: 12,
      title: "Phishing (Links Falsos)",
      severity: "medium",
      icon: "fas fa-envelope",
      description:
        "E-mails/SMS fingindo ser bancos ou correios para roubar senhas.",
      content:
        'Mensagens como "Sua conta será bloqueada", "Pontos a expirar" ou "Rastreio pendente". O link leva a um site idêntico ao oficial para capturar seus dados.',
      tip: "Não clique em links de SMS. Verifique o remetente dos e-mails com atenção.",
    },
    {
      id: 13,
      title: 'Golpe do "Limpa Nome"',
      severity: "medium",
      icon: "fas fa-eraser",
      description:
        "Falsas empresas prometendo limpar seu nome no Serasa sem pagar a dívida.",
      content:
        'Cobram uma taxa para aumentar seu Score ou limpar seu nome imediatamente "por dentro do sistema". Isso não existe. O nome só fica limpo pagando ou renegociando a dívida oficial.',
      tip: "Negocie dívidas apenas nos canais oficiais do Serasa Limpa Nome ou diretamente com o credor.",
    },
    {
      id: 14,
      title: "Falso Leilão",
      severity: "medium",
      icon: "fas fa-gavel",
      description:
        "Sites falsos vendendo carros e motos por preços irrealistas.",
      content:
        "Criam sites visuais idênticos aos do Detran ou leiloeiros. A vítima dá o lance, recebe uma carta de arrematação falsa e faz o Pix, mas o veículo não existe.",
      tip: 'Sites de leilão no Brasil terminam obrigatoriamente em ".br". Visite o pátio antes de pagar.',
    },
    {
      id: 15,
      title: "Golpe do Emprego",
      severity: "medium",
      icon: "fas fa-briefcase",
      description: "Vaga falsa que cobra por cursos, exames ou material.",
      content:
        'Você passa numa entrevista fácil para uma vaga ótima, mas exigem que pague por um "exame admissional" específico ou um "curso de qualificação" para começar. Após pagar, eles somem.',
      tip: "Nenhuma empresa séria cobra do candidato para trabalhar.",
    },
  ]);

  return { scams };
});

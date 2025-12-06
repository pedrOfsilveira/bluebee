import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlossaryStore = defineStore('glossary', () => {
  /*
    Tipos definidos (compatíveis com os ícones da Page):
    - stock: Ações, Bolsa, Empresas
    - fixed: Renda Fixa, Poupança
    - fund: Fundos, FIIs
    - economy: Economia, Inflação, Governo
    - trade: Trading, Risco, Volatilidade
    - tax: Impostos, Taxas
    - concept: Termos gerais
  */

  const terms = ref([
    // A
    { id: 1, title: 'Ação', type: 'stock', description: 'A menor parcela do capital social de uma empresa. Quem compra se torna sócio do negócio.' },
    { id: 2, title: 'Alavancagem', type: 'trade', description: 'Estratégia de usar dinheiro emprestado para tentar aumentar o retorno. Aumenta o risco consideravelmente.' },
    { id: 3, title: 'Alfa', type: 'trade', description: 'Medida que indica o quanto um investimento rendeu acima do seu índice de referência (benchmark).' },
    { id: 4, title: 'Alíquota', type: 'tax', description: 'Percentual utilizado para calcular o valor de um imposto (ex: alíquota de 27,5% de IR).' },
    { id: 5, title: 'Aluguel de Ações', type: 'stock', description: 'Operação onde um investidor cede suas ações temporariamente a outro (geralmente para venda a descoberto) em troca de uma taxa.' },
    { id: 6, title: 'Amortização', type: 'concept', description: 'Pagamento gradual de uma dívida ou devolução de capital investido (comum em FIIs de papel).' },
    { id: 7, title: 'Análise Fundamentalista', type: 'stock', description: 'Estudo da saúde financeira das empresas (balanços, lucros) para decidir se vale a pena investir no longo prazo.' },
    { id: 8, title: 'Análise Técnica', type: 'trade', description: 'Estudo baseado em gráficos e preços passados para tentar prever movimentos futuros do mercado.' },
    { id: 9, title: 'Ativo', type: 'concept', description: 'Tudo aquilo que coloca dinheiro no seu bolso ou tem valor de troca (Ações, Imóveis, Títulos).' },

    // B
    { id: 10, title: 'B3', type: 'stock', description: 'Brasil, Bolsa, Balcão. É a bolsa de valores oficial do Brasil.' },
    { id: 11, title: 'Balança Comercial', type: 'economy', description: 'Diferença entre o total de exportações e importações de um país.' },
    { id: 12, title: 'Balanço Patrimonial', type: 'stock', description: 'Relatório contábil que mostra a situação financeira de uma empresa em um determinado momento.' },
    { id: 13, title: 'Bacen (Banco Central)', type: 'economy', description: 'Instituição responsável por garantir a estabilidade do poder de compra da moeda e a solidez do sistema financeiro.' },
    { id: 14, title: 'BDR', type: 'stock', description: 'Brazilian Depositary Receipt. Certificado negociado no Brasil que representa ações de empresas estrangeiras (ex: Apple, Google).' },
    { id: 15, title: 'Bear Market', type: 'trade', description: 'Mercado do Urso. Tendência de baixa prolongada nos preços das ações.' },
    { id: 16, title: 'Benchmark', type: 'concept', description: 'Índice de referência usado para comparar a rentabilidade (ex: "rendeu 110% do CDI").' },
    { id: 17, title: 'Beta', type: 'trade', description: 'Indicador que mede a sensibilidade de um ativo em relação ao mercado. Beta > 1 indica maior volatilidade que a média.' },
    { id: 18, title: 'Blue Chips', type: 'stock', description: 'Ações de empresas grandes, consolidadas e com alta liquidez na bolsa (ex: Petrobras, Vale, Itaú).' },
    { id: 19, title: 'Bonificação', type: 'stock', description: 'Quando a empresa distribui novas ações gratuitamente aos acionistas atuais.' },
    { id: 20, title: 'Bull Market', type: 'trade', description: 'Mercado do Touro. Tendência de alta nos preços das ações com otimismo econômico.' },

    // C
    { id: 21, title: 'Câmbio Flutuante', type: 'economy', description: 'Regime onde o valor da moeda estrangeira é definido pela oferta e demanda, sem fixação do governo.' },
    { id: 22, title: 'Cartel', type: 'economy', description: 'Acordo ilegal entre empresas concorrentes para fixar preços e dominar o mercado.' },
    { id: 23, title: 'CDB', type: 'fixed', description: 'Certificado de Depósito Bancário. Você empresta dinheiro para o banco e ele te devolve com juros.' },
    { id: 24, title: 'CDI', type: 'fixed', description: 'Certificado de Depósito Interbancário. Taxa que os bancos cobram para emprestar dinheiro entre si. É a base da Renda Fixa.' },
    { id: 25, title: 'Cheque Especial', type: 'concept', description: 'Linha de crédito pré-aprovada disponível na conta corrente. Possui juros altíssimos.' },
    { id: 26, title: 'Circuit Breaker', type: 'trade', description: 'Mecanismo de segurança que paralisa a bolsa temporariamente quando há quedas muito bruscas (ex: -10%).' },
    { id: 27, title: 'COE', type: 'fixed', description: 'Certificado de Operações Estruturadas. Mescla renda fixa e variável, com garantias e riscos específicos.' },
    { id: 28, title: 'COFINS', type: 'tax', description: 'Contribuição para o Financiamento da Seguridade Social. Imposto federal cobrado sobre a receita das empresas.' },
    { id: 29, title: 'Come-cotas', type: 'tax', description: 'Antecipação do Imposto de Renda cobrada semestralmente (maio e novembro) em fundos de investimento.' },
    { id: 30, title: 'Commodities', type: 'economy', description: 'Mercadorias primárias negociadas globalmente com pouco diferencial de marca (petróleo, soja, ferro).' },
    { id: 31, title: 'Copom', type: 'economy', description: 'Comitê de Política Monetária. Grupo do Banco Central que se reúne a cada 45 dias para definir a taxa Selic.' },
    { id: 32, title: 'Correção Monetária', type: 'economy', description: 'Ajuste de valores para compensar a perda do poder de compra causada pela inflação.' },
    { id: 33, title: 'Corretagem', type: 'tax', description: 'Taxa cobrada pelas corretoras para intermediar a compra e venda de ativos.' },
    { id: 34, title: 'CRA', type: 'fixed', description: 'Certificado de Recebíveis do Agronegócio. Título de renda fixa lastreado no agro, isento de IR para pessoa física.' },
    { id: 35, title: 'CRI', type: 'fixed', description: 'Certificado de Recebíveis Imobiliários. Título de renda fixa lastreado em imóveis, isento de IR para pessoa física.' },
    { id: 36, title: 'Criptomoeda', type: 'trade', description: 'Moeda digital descentralizada que usa criptografia para garantir transações seguras (ex: Bitcoin).' },
    { id: 37, title: 'CSLL', type: 'tax', description: 'Contribuição Social sobre o Lucro Líquido. Imposto federal destinado à seguridade social.' },
    { id: 38, title: 'Custódia', type: 'concept', description: 'Serviço de guarda dos ativos financeiros e títulos, geralmente cobrado pela B3 ou corretoras.' },

    // D
    { id: 39, title: 'Day Trade', type: 'trade', description: 'Operação de compra e venda de um ativo no mesmo dia, buscando lucrar com pequenas oscilações.' },
    { id: 40, title: 'Debênture', type: 'fixed', description: 'Título de dívida emitido por empresas (não bancos) para financiar projetos.' },
    { id: 41, title: 'Debênture Incentivada', type: 'fixed', description: 'Debênture emitida para financiar obras de infraestrutura. É isenta de Imposto de Renda.' },
    { id: 42, title: 'Déficit Fiscal', type: 'economy', description: 'Quando o governo gasta mais do que arrecada com impostos.' },
    { id: 43, title: 'Deflação', type: 'economy', description: 'O contrário da inflação. É a queda generalizada dos preços de produtos e serviços.' },
    { id: 44, title: 'Derivativos', type: 'trade', description: 'Contratos financeiros cujo valor deriva de outro ativo (ex: Contratos futuros de Dólar).' },
    { id: 45, title: 'Diversificação', type: 'concept', description: 'Estratégia de "não colocar todos os ovos na mesma cesta" para reduzir riscos.' },
    { id: 46, title: 'Dividendos', type: 'stock', description: 'Parcela do lucro líquido das empresas distribuída aos acionistas, isenta de Imposto de Renda.' },
    { id: 47, title: 'Dívida Pública', type: 'economy', description: 'Total de débitos do governo (federal, estadual ou municipal) com terceiros.' },
    { id: 48, title: 'Dumping', type: 'economy', description: 'Prática desleal de vender produtos a preços extremamente baixos para quebrar a concorrência.' },
    { id: 49, title: 'DY (Dividend Yield)', type: 'stock', description: 'Indicador que mostra quanto uma ação pagou de dividendos em relação ao preço dela.' },

    // E
    { id: 50, title: 'EBITDA', type: 'stock', description: 'Sigla para lucros antes de juros, impostos, depreciação e amortização. Mede a eficiência operacional.' },
    { id: 51, title: 'Emolumentos', type: 'tax', description: 'Taxas cobradas pela B3 e pela CBLC sobre as operações realizadas na bolsa.' },
    { id: 52, title: 'Estagflação', type: 'economy', description: 'Cenário econômico ruim que combina estagnação (falta de crescimento) com inflação alta.' },
    { id: 53, title: 'ETF', type: 'fund', description: 'Fundo de índice negociado em bolsa. Replica um índice de mercado (ex: BOVA11 segue o Ibovespa).' },

    // F
    { id: 54, title: 'FGC', type: 'fixed', description: 'Fundo Garantidor de Créditos. Garante até R$ 250 mil por CPF em caso de quebra do banco.' },
    { id: 55, title: 'FII', type: 'fund', description: 'Fundo Imobiliário. Permite investir em imóveis ou papéis imobiliários com cotas negociadas na bolsa.' },
    { id: 56, title: 'Flipagem', type: 'trade', description: 'Estratégia de entrar em um IPO para vender as ações logo na estreia, buscando lucro rápido.' },
    { id: 57, title: 'Fundo Multimercado', type: 'fund', description: 'Fundo que pode investir em diversas classes de ativos (Renda fixa, ações, câmbio) simultaneamente.' },
    { id: 58, title: 'Fundo de Pensão', type: 'fund', description: 'Entidade fechada de previdência complementar exclusiva para funcionários de certas empresas.' },

    // H
    { id: 59, title: 'Hedge', type: 'concept', description: 'Proteção. Estratégia utilizada para proteger o patrimônio contra variações bruscas de preços.' },
    { id: 60, title: 'Holding', type: 'stock', description: 'Empresa criada para deter a posse majoritária de ações de outras empresas.' },
    { id: 61, title: 'Home Broker', type: 'stock', description: 'Plataforma digital das corretoras que permite ao investidor operar na bolsa pela internet.' },

    // I
    { id: 62, title: 'Ibovespa', type: 'stock', description: 'Principal índice da bolsa brasileira. Reúne as ações mais negociadas da B3.' },
    { id: 63, title: 'ICMS', type: 'tax', description: 'Imposto sobre Circulação de Mercadorias e Serviços. Imposto estadual embutido no preço de quase tudo.' },
    { id: 64, title: 'IGP-M', type: 'economy', description: 'Índice Geral de Preços do Mercado. Conhecido como "inflação do aluguel".' },
    { id: 65, title: 'Inflação', type: 'economy', description: 'Aumento generalizado dos preços, que faz o dinheiro perder valor de compra.' },
    { id: 66, title: 'IOF', type: 'tax', description: 'Imposto sobre Operações Financeiras. Cobrado em empréstimos, câmbio e resgates de curtíssimo prazo.' },
    { id: 67, title: 'IPCA', type: 'economy', description: 'Índice Nacional de Preços ao Consumidor Amplo. É a inflação oficial do Brasil.' },
    { id: 68, title: 'IPI', type: 'tax', description: 'Imposto sobre Produtos Industrializados. Cobrado de indústrias sobre produtos fabricados.' },
    { id: 69, title: 'IPO', type: 'stock', description: 'Initial Public Offering. Quando uma empresa abre seu capital e vende ações na bolsa pela primeira vez.' },
    { id: 70, title: 'IPTU', type: 'tax', description: 'Imposto Predial e Territorial Urbano. Imposto municipal cobrado anualmente de donos de imóveis.' },
    { id: 71, title: 'IPVA', type: 'tax', description: 'Imposto sobre a Propriedade de Veículos Automotores. Imposto estadual anual.' },
    { id: 72, title: 'IRPF', type: 'tax', description: 'Imposto de Renda Pessoa Física. O famoso "Leão". Tributo federal sobre os ganhos de pessoas físicas.' },
    { id: 73, title: 'IRPJ', type: 'tax', description: 'Imposto de Renda Pessoa Jurídica. Tributo federal sobre o lucro das empresas.' },
    { id: 74, title: 'ISS', type: 'tax', description: 'Imposto Sobre Serviços. Tributo municipal cobrado de empresas e autônomos que prestam serviços.' },
    { id: 75, title: 'ITBI', type: 'tax', description: 'Imposto de Transmissão de Bens Imóveis. Taxa municipal paga ao comprar um imóvel.' },
    { id: 76, title: 'ITCMD', type: 'tax', description: 'Imposto sobre Transmissão Causa Mortis e Doação. Imposto estadual sobre heranças e doações.' },

    // J
    { id: 77, title: 'JCP', type: 'stock', description: 'Juros sobre Capital Próprio. Forma de distribuir lucros aos acionistas, mas com tributação de IR.' },
    { id: 78, title: 'Joint Venture', type: 'stock', description: 'Associação de duas ou mais empresas para explorar um negócio em comum.' },

    // L
    { id: 79, title: 'LCI / LCA', type: 'fixed', description: 'Letras de Crédito Imobiliário/Do Agronegócio. Títulos isentos de IR para pessoa física.' },
    { id: 80, title: 'LF (Letra Financeira)', type: 'fixed', description: 'Título de renda fixa emitido por bancos com prazo mínimo de 2 anos e valor alto.' },
    { id: 81, title: 'LIG', type: 'fixed', description: 'Letra Imobiliária Garantida. Título com dupla garantia (do banco e da carteira imobiliária), isento de IR.' },
    { id: 82, title: 'Liquidez', type: 'concept', description: 'Velocidade com que você consegue transformar um ativo em dinheiro na mão.' },
    { id: 83, title: 'Long & Short', type: 'trade', description: 'Operação casada onde se compra uma ação (Long) e vende outra (Short) simultaneamente.' },

    // M
    { id: 84, title: 'Manada', type: 'trade', description: 'Comportamento de investidores que seguem a maioria sem fazer análise própria, geralmente comprando na alta.' },
    { id: 85, title: 'Margem de Garantia', type: 'trade', description: 'Valor exigido pela corretora para permitir operações alavancadas.' },
    { id: 86, title: 'Mark to Market', type: 'fixed', description: 'Marcação a Mercado. Preço atual do título se você o vendesse hoje, antes do vencimento.' },
    { id: 87, title: 'Mico', type: 'stock', description: 'Gíria para ação de empresa ruim, com baixa liquidez e preço muito baixo.' },

    // N
    { id: 88, title: 'Novo Mercado', type: 'stock', description: 'Segmento da B3 com o mais alto nível de governança corporativa.' },

    // O
    { id: 89, title: 'Open Finance', type: 'concept', description: 'Sistema que permite compartilhar seus dados bancários entre diferentes instituições para obter melhores taxas.' },
    { id: 90, title: 'Opções', type: 'trade', description: 'Direito de comprar ou vender um ativo em data futura por preço fixado.' },

    // P
    { id: 91, title: 'Passivo', type: 'concept', description: 'Dívidas e obrigações financeiras que geram despesas.' },
    { id: 92, title: 'PGBL', type: 'fund', description: 'Plano de previdência que permite deduzir até 12% da renda bruta no IR (ideal para quem faz declaração completa).' },
    { id: 93, title: 'PIB', type: 'economy', description: 'Produto Interno Bruto. A soma de todas as riquezas produzidas pelo país.' },
    { id: 94, title: 'PIS/PASEP', type: 'tax', description: 'Contribuições sociais cobradas das empresas para financiar o seguro-desemprego e abono salarial.' },
    { id: 95, title: 'Pix', type: 'concept', description: 'Sistema de pagamentos instantâneos criado pelo Banco Central do Brasil.' },
    { id: 96, title: 'P/L (Preço sobre Lucro)', type: 'stock', description: 'Indicador que mostra em quantos anos o lucro da empresa pagaria o preço da ação.' },
    { id: 97, title: 'Pós-fixado', type: 'fixed', description: 'Investimento onde o rendimento segue um índice (ex: 100% do CDI) e varia ao longo do tempo.' },
    { id: 98, title: 'Prefixado', type: 'fixed', description: 'Investimento com taxa de juros fixa e conhecida no momento da aplicação.' },

    // R
    { id: 99, title: 'RDB', type: 'fixed', description: 'Recibo de Depósito Bancário. Similar ao CDB, mas inegociável e intransferível antes do vencimento.' },
    { id: 100, title: 'Recessão', type: 'economy', description: 'Período de declínio da atividade econômica, queda no PIB e aumento do desemprego.' },
    { id: 101, title: 'Reserva de Emergência', type: 'concept', description: 'Montante guardado (3 a 6 meses de gastos) em alta liquidez para imprevistos.' },
    { id: 102, title: 'Risco Brasil', type: 'economy', description: 'Indicador que mede a desconfiança dos investidores estrangeiros na capacidade do Brasil pagar suas dívidas.' },
    { id: 103, title: 'ROE', type: 'stock', description: 'Return on Equity. Retorno sobre o Patrimônio Líquido. Mede a rentabilidade da empresa.' },

    // S
    { id: 104, title: 'Sardinha', type: 'trade', description: 'Gíria para o pequeno investidor iniciante, que muitas vezes perde para os grandes (tubarões).' },
    { id: 105, title: 'Selic', type: 'economy', description: 'Taxa básica de juros da economia. Influencia todas as outras taxas de juros do país.' },
    { id: 106, title: 'Small Caps', type: 'stock', description: 'Empresas de menor valor de mercado, geralmente com maior potencial de crescimento e risco.' },
    { id: 107, title: 'Spread Bancário', type: 'concept', description: 'Diferença entre a taxa que o banco paga para captar dinheiro e a taxa que ele cobra para emprestar.' },
    { id: 108, title: 'Stop Loss', type: 'trade', description: 'Ordem automática para vender um ativo se ele cair até determinado preço, limitando o prejuízo.' },
    { id: 109, title: 'Superávit Primário', type: 'economy', description: 'Quando o governo arrecada mais do que gasta (desconsiderando os juros da dívida).' },
    { id: 110, title: 'Swing Trade', type: 'trade', description: 'Operação de compra e venda que dura dias ou semanas.' },
    { id: 111, title: 'Split', type: 'stock', description: 'Desdobramento. Divisão das ações para reduzir o preço unitário e aumentar a liquidez.' },

    // T
    { id: 112, title: 'Tag Along', type: 'stock', description: 'Proteção que garante ao acionista minoritário receber um valor similar ao controlador na venda da empresa.' },
    { id: 113, title: 'Taxa Referencial (TR)', type: 'economy', description: 'Taxa utilizada para o cálculo do rendimento da Poupança e saldo do FGTS.' },
    { id: 114, title: 'Tesouro Direto', type: 'fixed', description: 'Programa do governo para venda de títulos públicos a pessoas físicas.' },
    { id: 115, title: 'Tubarão', type: 'trade', description: 'Gíria para grandes investidores ou fundos que movimentam volumes gigantescos e influenciam o mercado.' },

    // V
    { id: 116, title: 'Valor Intrínseco', type: 'stock', description: 'O preço "justo" de uma ação calculado com base nos fundamentos da empresa.' },
    { id: 117, title: 'Venda a Descoberto', type: 'trade', description: 'Apostar na queda de um ativo vendendo algo que você não possui (alugado).' },
    { id: 118, title: 'VGBL', type: 'fund', description: 'Previdência privada indicada para quem faz declaração simplificada do IR. O imposto incide apenas sobre os rendimentos.' },
    { id: 119, title: 'Volatilidade', type: 'trade', description: 'Medida da intensidade e frequência das variações de preço de um ativo.' },
  ]);

  return { terms };
});

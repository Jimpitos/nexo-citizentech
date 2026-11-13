/**
 * Dados do NEXO usados pela página.
 * Todos os números abaixo vêm da "Definição oficial de trabalho do NEXO"
 * (Ministério da Saúde, Plano de Contingência 2025, com dados do S2ID;
 * SOS Rio Grande do Sul, balanço de ago/2025). Não inventar números aqui:
 * quando o CSV do Atlas Digital for analisado, substituir/ampliar este arquivo.
 */
const NEXO_DATA = {
  version: "1.1.0",

  indicadores: [
    {
      valor: "18.145",
      rotulo: "Decretações por chuvas intensas e eventos associados",
      detalhe: "Brasil, 2013–2024 (S2ID / Ministério da Saúde)",
    },
    {
      valor: "3.000",
      rotulo: "Registros em 2022",
      detalhe: "Maior total anual da série apresentada",
    },
    {
      valor: "1.951",
      rotulo: "Registros em 2024",
      detalhe: "Ano da tragédia no Rio Grande do Sul",
    },
    {
      valor: "67,08%",
      rotulo: "Sul + Sudeste",
      detalhe: "Participação somada nos registros nacionais",
    },
  ],

  // Participação por região (2013–2024). "Demais regiões" = 100 − Sul − Sudeste.
  regioes: [
    { nome: "Sul", pct: 42.27 },
    { nome: "Sudeste", pct: 24.81 },
    { nome: "Demais regiões", pct: 32.92 },
  ],

  casoRS: {
    titulo: "Rio Grande do Sul, maio de 2024",
    fonte: "SOS Rio Grande do Sul, balanço atualizado em agosto de 2025",
    itens: [
      { valor: "478", rotulo: "municípios afetados" },
      { valor: "2.398.255", rotulo: "pessoas afetadas" },
      { valor: "185", rotulo: "óbitos confirmados" },
      { valor: "581.638", rotulo: "pico de pessoas desalojadas" },
    ],
  },

  glossario: [
    {
      termo: "Inundação",
      texto: "Transbordamento de um curso d'água.",
    },
    {
      termo: "Enxurrada",
      texto: "Escoamento superficial rápido da água.",
    },
    {
      termo: "Alagamento",
      texto: "Acúmulo de água em áreas urbanas por insuficiência da drenagem.",
    },
  ],

  // Camada de transparência: origem, cobertura e limitações de cada fonte.
  // viabilidade: "Alta" | "Parcial" | "A validar"
  fontes: [
    {
      id: "atlas",
      nome: "Atlas Digital de Desastres (MIDR)",
      dados: "Tipo de desastre, data, município, pessoas afetadas, danos e prejuízos",
      cobertura: "Nacional, 1991 a 2025",
      limitacao: "Registros administrativos; download em CSV e XLSX.",
      viabilidade: "Alta",
      url: "https://atlasdigital.mdr.gov.br/paginas/downloads.xhtml",
    },
    {
      id: "cemaden",
      nome: "CEMADEN",
      dados: "Chuva observada, localização das estações e séries históricas",
      cobertura: "Desde 2013, por estação",
      limitacao: "Download mensal; dados brutos em UTC e sujeitos a inconsistências.",
      viabilidade: "Parcial",
      url: "https://www2.cemaden.gov.br/mapainterativo/",
    },
    {
      id: "ana",
      nome: "ANA — HidroWebService",
      dados: "Dados hidrológicos de estações, como níveis e vazões",
      cobertura: "Estações da rede hidrometeorológica",
      limitacao: "Nova API (manual de fev/2026): acesso ainda precisa ser validado.",
      viabilidade: "A validar",
      url: "https://www.gov.br/ana/pt-br/assuntos/monitoramento-e-eventos-criticos/monitoramento-hidrologico/orientacoes-manuais/manuais/manual-hidrowebservice_publica.pdf/view",
    },
    {
      id: "sace",
      nome: "SGB — SACE",
      dados: "Nível dos rios, chuva, cotas de referência e boletins",
      cobertura: "Bacias e estações monitoradas",
      limitacao: "Cobertura não é uniforme no território.",
      viabilidade: "A validar",
      url: "https://sace.sgb.gov.br/",
    },
    {
      id: "cartas",
      nome: "SGB — Cartas de suscetibilidade",
      dados: "Áreas suscetíveis a inundações e enxurradas",
      cobertura: "Cartas concluídas em 694 municípios (cerca de 12,5%)",
      limitacao: "Região sem carta não significa região sem risco.",
      viabilidade: "Parcial",
      url: "https://www.sgb.gov.br/saiba-mais-cartas-de-suscetibilidade",
    },
    {
      id: "ibge",
      nome: "IBGE — Censo 2022",
      dados: "População, domicílios, características territoriais e socioeconômicas",
      cobertura: "Nacional, por setor censitário",
      limitacao: "Dados agregados de 2022, não são em tempo real.",
      viabilidade: "Parcial",
      url: "https://www.ibge.gov.br/estatisticas/sociais/populacao/22827-censo-demografico-2022.html",
    },
  ],

  funcionalidades: [
    {
      titulo: "Mapa de Inteligência Territorial",
      texto:
        "Visualização nacional dos registros históricos de desastres e das áreas com informação geográfica de suscetibilidade disponível.",
    },
    {
      titulo: "Análise de Exposição",
      texto:
        "Cruzamento de áreas mapeadas com dados populacionais e socioeconômicos agregados do IBGE para investigar quem pode estar mais exposto.",
    },
    {
      titulo: "Transparência e Priorização",
      texto:
        "Origem, atualização, cobertura e limitações de cada dado, para o gestor saber onde precisa aprofundar a investigação.",
    },
  ],

  naoPromete: [
    "Prever todas as enchentes do Brasil.",
    "Emitir alertas oficiais.",
    "Identificar com precisão todas as pessoas que serão afetadas por um desastre.",
  ],
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = NEXO_DATA;
}

(function () {
  "use strict";

  var D = NEXO_DATA;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function fmtPct(n) {
    return n.toFixed(2).replace(".", ",") + "%";
  }

  function renderIndicadores() {
    var box = document.getElementById("indicadores");
    D.indicadores.forEach(function (i) {
      var c = el("div", "card");
      c.appendChild(el("p", "card__valor", i.valor));
      c.appendChild(el("p", "card__rotulo", i.rotulo));
      c.appendChild(el("p", "nota", i.detalhe));
      box.appendChild(c);
    });

    document.getElementById("caso-titulo").textContent = D.casoRS.titulo;
    document.getElementById("caso-fonte").textContent = "Fonte: " + D.casoRS.fonte + ".";
    var itens = document.getElementById("caso-itens");
    D.casoRS.itens.forEach(function (i) {
      var d = el("div", "caso__item");
      d.appendChild(el("strong", null, i.valor));
      d.appendChild(el("span", null, i.rotulo));
      itens.appendChild(d);
    });
  }

  function renderRegioes() {
    var box = document.getElementById("grafico-regioes");
    D.regioes.forEach(function (r) {
      var linha = el("div", "barra");
      linha.appendChild(el("span", "barra__nome", r.nome));
      var trilho = el("div", "barra__trilho");
      var fill = el("div", "barra__fill");
      fill.style.width = r.pct + "%";
      trilho.appendChild(fill);
      linha.appendChild(trilho);
      linha.appendChild(el("span", "barra__pct", fmtPct(r.pct)));
      box.appendChild(linha);
    });
  }

  function renderCards(id, lista, tituloKey, textoKey) {
    var box = document.getElementById(id);
    lista.forEach(function (i) {
      var c = el("div", "card");
      c.appendChild(el("h3", null, i[tituloKey]));
      c.appendChild(el("p", null, i[textoKey]));
      box.appendChild(c);
    });
  }

  function classeViab(v) {
    return v === "Alta" ? "tag tag--alta" : v === "Parcial" ? "tag tag--parcial" : "tag tag--validar";
  }

  function renderFontes(filtro) {
    var box = document.getElementById("lista-fontes");
    box.textContent = "";
    var lista = D.fontes.filter(function (f) {
      return filtro === "todas" || f.viabilidade === filtro;
    });
    lista.forEach(function (f) {
      var c = el("article", "fonte");
      var topo = el("div", "fonte__topo");
      var h = el("h3");
      var a = el("a", null, f.nome);
      a.href = f.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      h.appendChild(a);
      topo.appendChild(h);
      topo.appendChild(el("span", classeViab(f.viabilidade), "Viabilidade: " + f.viabilidade));
      c.appendChild(topo);

      var dl = el("dl");
      [["Dados", f.dados], ["Cobertura", f.cobertura], ["Limitação", f.limitacao]].forEach(function (p) {
        dl.appendChild(el("dt", null, p[0]));
        dl.appendChild(el("dd", null, p[1]));
      });
      c.appendChild(dl);
      box.appendChild(c);
    });
    document.getElementById("contagem").textContent =
      "Mostrando " + lista.length + " de " + D.fontes.length + " fontes.";
  }

  function initFiltros() {
    var chips = document.querySelectorAll(".chip");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) {
          c.classList.remove("is-on");
          c.setAttribute("aria-pressed", "false");
        });
        chip.classList.add("is-on");
        chip.setAttribute("aria-pressed", "true");
        renderFontes(chip.getAttribute("data-filtro"));
      });
    });
  }

  function renderLimites() {
    var ul = document.getElementById("nao-promete");
    D.naoPromete.forEach(function (t) {
      ul.appendChild(el("li", null, t));
    });
  }

  renderIndicadores();
  renderRegioes();
  renderCards("glossario", D.glossario, "termo", "texto");
  renderCards("funcionalidades", D.funcionalidades, "titulo", "texto");
  renderFontes("todas");
  initFiltros();
  renderLimites();
  document.getElementById("versao").textContent = D.version;
})();

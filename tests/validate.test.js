const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const SRC = path.join(__dirname, "..", "src");
const DATA = require(path.join(SRC, "data.js"));
const html = fs.readFileSync(path.join(SRC, "index.html"), "utf8");

test("arquivos essenciais existem", () => {
  ["index.html", "styles.css", "app.js", "data.js"].forEach((f) => {
    assert.ok(fs.existsSync(path.join(SRC, f)), `faltando src/${f}`);
  });
});

test("index.html referencia css e scripts existentes", () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"#:]+\.(?:css|js))"/g)].map((m) => m[1]);
  assert.ok(refs.length >= 3, "esperava styles.css, data.js e app.js");
  refs.forEach((r) => assert.ok(fs.existsSync(path.join(SRC, r)), `referência quebrada: ${r}`));
});

test("página tem título NEXO e idioma pt-BR", () => {
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<title>NEXO/);
});

test("participação por região soma 100% e Sul+Sudeste = 67,08%", () => {
  const soma = DATA.regioes.reduce((s, r) => s + r.pct, 0);
  assert.ok(Math.abs(soma - 100) < 0.01, `soma = ${soma}`);
  const sulSudeste = DATA.regioes
    .filter((r) => r.nome === "Sul" || r.nome === "Sudeste")
    .reduce((s, r) => s + r.pct, 0);
  assert.ok(Math.abs(sulSudeste - 67.08) < 0.01, `Sul+Sudeste = ${sulSudeste}`);
});

test("toda fonte tem origem, cobertura, limitação e viabilidade válida", () => {
  assert.ok(DATA.fontes.length >= 5);
  DATA.fontes.forEach((f) => {
    ["nome", "dados", "cobertura", "limitacao", "url"].forEach((k) =>
      assert.ok(f[k] && f[k].length > 0, `${f.id}: campo ${k} vazio`)
    );
    assert.ok(["Alta", "Parcial", "A validar"].includes(f.viabilidade), `${f.id}: viabilidade inválida`);
    assert.match(f.url, /^https:\/\//);
  });
});

test("versão está no formato x.y.z", () => {
  assert.match(DATA.version, /^\d+\.\d+\.\d+$/);
});

test("nenhum segredo óbvio no código-fonte", () => {
  const padrao = /(api[_-]?key|secret|token|password)\s*[:=]\s*["'][^"']{8,}/i;
  fs.readdirSync(SRC).forEach((f) => {
    const txt = fs.readFileSync(path.join(SRC, f), "utf8");
    assert.doesNotMatch(txt, padrao, `possível segredo em src/${f}`);
  });
});

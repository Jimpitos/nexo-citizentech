# Guia passo a passo — NEXO no GitHub + Azure

Siga na ordem. Tempo estimado: ~2 h. Tire print de cada etapa (veja a lista no README, seção 8).

## Etapa 1 — Repositório (10 min)

1. No GitHub: **New repository** → nome `nexo-citizentech` → **Public** (ou Private, e convide o professor) → **sem** README (já temos um).
2. No seu computador, dentro da pasta deste projeto:

```bash
'git init -b main
git add .
git commit -m "Estrutura inicial do NEXO: site estatico, testes e workflow"
git remote add origin https://github.com/SEU-USUARIO/nexo-citizentech.git
git push -u origin main'
```

> Se for pedir login, use o GitHub Desktop ou um Personal Access Token **só no seu computador**; nunca coloque em arquivo.

3. Settings → Collaborators → **Add people** → convide o professor.

## Etapa 2 — Project e Issues (15 min)

1. Aba **Projects** → **New project** → **Board** → nome `NEXO — Entregas`. Confirme as colunas **Todo / In Progress / Done**.
2. Crie as Issues abaixo (aba **Issues → New issue**), coloque **Assignees**, associe ao Project e deixe em **Todo**. Crie as tarefas primeiro para saber os números e então edite a história.

**Issue 1 — história**
- Título: `[História] Consultar e entender os dados de risco de inundação`
- Descrição:
```
Como gestor municipal, quero consultar o histórico de desastres por chuvas e saber a origem e a cobertura de cada dado, para priorizar ações preventivas com segurança.

Critérios de aceitação
- [ ] A página apresenta indicadores históricos de decretações por chuvas intensas (2013–2024)
- [ ] A página mostra a participação por região
- [ ] Cada fonte de dados mostra cobertura e limitação
- [ ] A informação é legível em celular
- [ ] A página está publicada no Azure e atualiza por workflow

Tarefas
- [ ] #2 Personalizar a aplicação para o NEXO
- [ ] #3 Configurar workflow de CI/CD no Azure
- [ ] #4 Documentar README e coletar evidências
```
- Label: `user-story`

**Issue 2** — `[Tarefa] Personalizar a aplicação para o NEXO`
```
Atualizar texto, dados e identidade visual para refletir o NEXO (indicadores, regiões, transparência das fontes).
Conclusão: alterações visíveis na aplicação publicada e revisadas em Pull Request.
```

**Issue 3** — `[Tarefa] Configurar workflow de CI/CD no Azure`
```
Criar o Azure Static Web Apps, configurar o secret no GitHub e validar o workflow (lint + testes + deploy).
Conclusão: execução bem-sucedida e URL publicada registrada no README.
```

**Issue 4** — `[Tarefa] Documentar README e coletar evidências`
```
Preencher integrantes, links e prints de evidências no README.
Conclusão: todos os itens da seção 8 do README preenchidos.
```

3. Mova os cartões conforme avança (Todo → In Progress → Done) e **tire print** em cada estado — isso prova a evolução.

## Etapa 3 — Criar o Azure Static Web Apps (15 min)

No [portal.azure.com](https://portal.azure.com):

1. **Criar um recurso** → **Static Web App** → Create.
2. Preencha:
   - Subscription / Resource group (crie um novo, ex.: `rg-nexo`)
   - Name: `nexo-citizentech`
   - Plan type: **Free**
   - Region: a mais próxima disponível
   - Deployment source: **GitHub** → autorize e escolha organização, repositório `nexo-citizentech` e branch `main`
   - Build presets: **Custom** · App location: `src` · Api location: vazio · Output location: vazio
3. **Review + create → Create.**

> O Azure pode criar um workflow próprio no repositório (`azure-static-web-apps-xxxx.yml`) e um secret com nome parecido. **Já temos o nosso workflow**, então:
> - Faça `git pull` para trazer o arquivo gerado, **apague o arquivo duplicado** (ou copie o nome do secret criado por ele e use-o no nosso arquivo no lugar de `AZURE_STATIC_WEB_APPS_API_TOKEN`).
> - Alternativa: em *Deployment source* escolha **Other** e depois copie o token (Static Web App → **Manage deployment token**) em **GitHub → Settings → Secrets and variables → Actions → New repository secret** com o nome `AZURE_STATIC_WEB_APPS_API_TOKEN`.
> - Deixe **só um** workflow de deploy ativo, senão a publicação roda duas vezes.

## Etapa 4 — Branch, PR e primeiro deploy (30 min)

Siga o fluxo do Anexo B do PDF:

```bash
git checkout main && git pull
git checkout -b feature/personalizar-nexo
# faça uma mudança pequena (ex.: ajuste um texto do hero em src/index.html)
git add .
git commit -m "Personaliza hero e textos do NEXO"
git push -u origin feature/personalizar-nexo
```

1. No GitHub: **Compare & pull request** → base `main`.
2. Descrição do PR: o que mudou, como validar e `Closes #2`.
3. Aguarde o job `ci` ficar verde (print!). O job `deploy` cria um **ambiente de preview** e comenta a URL no PR.
4. Peça a um colega para revisar (print da revisão/comentário) → **Merge pull request**.
5. O push em `main` dispara o workflow de novo e publica em **produção**. Em **Actions** confira o ✅ (print).
6. Abra a URL do Static Web App (portal Azure → Overview → URL) e tire print da página no ar.
7. Mova as Issues #2 e #3 para **Done**.

## Etapa 5 — Nova alteração e prova de atualização (15 min)

1. Nova branch: `git checkout -b feature/atualiza-versao`.
2. Em `src/data.js` mude `version: "1.0.0"` para `"1.1.0"` e, por exemplo, ajuste um texto visível. (Atenção: o teste exige formato `x.y.z`.)
3. Commit, push, PR, merge (como acima).
4. Mostre: (a) o diff no PR, (b) a segunda execução em **Actions**, (c) o rodapé do site mostrando **Versão 1.1.0**.

## Etapa 6 — Fechamento (10 min)

- Preencha integrantes (nome, RM), links e URL no `README.md`.
- Crie `docs/evidencias/` e suba os prints com os nomes listados no README.
- Confirme que o professor foi convidado.
- Mova a Issue #4 e a história para **Done** e marque os checkboxes.

## Checklist de solução de problemas

| Sintoma | Causa provável | Solução |
|---------|----------------|---------|
| Job `deploy` falha com "deployment token" | Secret ausente ou com nome diferente | Conferir o nome do secret no workflow e em Settings → Secrets |
| `npm ci` falha | Falta `package-lock.json` no repositório | Rodar `npm install` localmente e commitar o lock |
| Deploy roda duas vezes | Workflow gerado pelo Azure + o nosso | Apagar um deles |
| Site mostra a página padrão do Azure | `app_location` errado | Deve ser `src` |
| `npm run lint` falha | HTML inválido | Ler a mensagem do HTMLHint e corrigir a linha apontada |

## O que explicar na apresentação

- **Por que CI antes do CD:** o job `deploy` tem `needs: ci`; se lint/testes falham, nada é publicado.
- **Por que secret:** o token dá poder de publicar; fica no GitHub Actions, nunca no código.
- **Preview em PR:** cada PR gera um ambiente temporário para revisão, removido ao fechar.
- **Por que dados do documento e não inventados:** os números vêm do Ministério da Saúde/S2ID e estão referenciados no site.

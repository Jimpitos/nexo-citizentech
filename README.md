# NEXO — Inteligência Territorial para Prevenção de Riscos Climáticos

Global Solution 02/2026 · Cloud Solutions & Scalable Infrastructure · 2TSCV · CitizenTech

## 1. Problema e proposta

Entre 2013 e 2024 o Brasil registrou **18.145 decretações** de situação de emergência ou calamidade pública por chuvas intensas e eventos associados (Ministério da Saúde, com dados do S2ID). Saber onde choveu não basta: é preciso entender onde o evento encontra infraestrutura vulnerável e pessoas expostas.

O **NEXO** é uma plataforma CitizenTech que integra dados públicos ambientais, hidrológicos, geográficos e socioeconômicos para ajudar gestores a identificar territórios expostos e priorizar ações preventivas. Primeiro caso de uso: inundações e eventos hidrológicos.

A versão publicada nesta atividade é um **MVP de demonstração** do fluxo de CI/CD: indicadores históricos, participação por região e uma camada de **transparência** que mostra origem, cobertura e limitações de cada base de dados. O NEXO não promete prever enchentes nem emitir alertas oficiais.

## 2. Integrantes

| Nome | RM | Turma |
|------|----|-------|
| Bruno Pereira Maurus | RM565659 | 2TSCV |
| Igor Furtado Braga | RM565061 | 2TSCV |
| Lucas Miyoshi Matsuda| RM555295 | 2TSCV |

## 3. Origem do projeto

Criado pela equipe para esta Global Solution (tema definido no documento "Definição oficial de trabalho do NEXO"). Ferramentas de IA foram usadas como apoio à ideação, geração de código e configuração do workflow; a equipe compreende e consegue explicar todo o conteúdo.

## 4. Tecnologias e como executar

- HTML, CSS e JavaScript puros (site estático em `src/`)
- Node.js 20 + [HTMLHint](https://htmlhint.com/) (validação) e `node:test` (testes)
- GitHub Actions + Azure Static Web Apps

```bash
npm ci          # instala dependências de desenvolvimento
npm run lint    # valida o HTML
npm test        # roda os testes
npm start       # abre o site localmente (serve src/)
```

## 5. Como o GitHub foi utilizado

- **Projects/Issues:** quadro "NEXO — Entregas" com 1 história e 2+ tarefas, cada uma com responsável e status (Todo → In Progress → Done). Links: https://github.com/users/Jimpitos/projects/1 · https://github.com/Jimpitos/nexo-citizentech/issues
- **Repositório:** branch `main` protegida pelo fluxo de PR e branches de trabalho (`feature/...`).
- **Commits:** mensagens descritivas, histórico em (https://github.com/Jimpitos/nexo-citizentech/actions)
- **Pull Requests:** toda alteração entra na `main` por PR, relacionada a uma Issue (`Closes #n`). Links: (https://github.com/Jimpitos/nexo-citizentech/pull/5) · https://github.com/Jimpitos/nexo-citizentech/pull/6 · https://github.com/Jimpitos/nexo-citizentech/pull/7

## 6. Workflow do GitHub Actions

Arquivo: [`.github/workflows/azure-static-web-apps-ambitious-cliff-09af9f00f.yml`](.github/workflows/azure-static-web-apps-ambitious-cliff-09af9f00f.yml)

**Gatilhos:** `push` na `main`, `pull_request` para a `main` (abertura, atualização, reabertura e fechamento) e execução manual (`workflow_dispatch`).

| Job | O que faz |
|-----|-----------|
| `ci` | checkout → setup Node 20 → `npm ci` → `npm run lint` (HTMLHint) → `npm test` |
| `deploy` | roda só se o `ci` passar; publica `src/` no Azure Static Web Apps (produção no push em `main`; ambiente de pré-visualização em PR) |
| `close_pull_request` | ao fechar/mergear o PR, remove o ambiente de pré-visualização |

**Segredos:** o token de deploy fica em *Settings → Secrets and variables → Actions* com o nome `AZURE_STATIC_WEB_APPS_API_TOKEN`. Nenhuma credencial é versionada.

## 7. Nuvem e aplicação publicada

- **Provedor/serviço:** Microsoft Azure — Static Web Apps
- **URL da aplicação:** [_colar a URL (https://....azurestaticapps.net)_](https://ambitious-cliff-09af9f00f.8.azurestaticapps.net)

## 8. Evidências

As capturas de tela estão em [`docs/evidencias/`](docs/evidencias/):

| Item | Evidência |
|------|-----------|
| Project/Issues (história, tarefas, responsáveis, status) | `01-project.png`, `02-issues.png` |
| Repositório e branch `main` | `03-repositorio.png` |
| Branch adicional, commits e PR/merge | `04-branches.png`, `05-commits.png`, `06-pull-request.png` |
| Workflow configurado e execução com sucesso | `07-workflow-yml.png`, `08-actions-sucesso.png` |
| Aplicação publicada no Azure | `09-app-azure.png` |
| Nova alteração (versão 1.0.0 → 1.1.0) e deploy automático | `10-alteracao-codigo.png`, `11-actions-2a-execucao.png`, `12-app-atualizada.png` |

## 9. Fontes dos dados exibidos

Ministério da Saúde — Plano de Contingência Nacional para Emergências em Saúde Pública por Chuvas Intensas e Desastres Associados (2025), com dados do S2ID; SOS Rio Grande do Sul (balanço de ago/2025); Atlas Digital de Desastres (MIDR), CEMADEN, ANA, SGB e IBGE (camada de transparência).

## 10. Histórico de problemas e como foram resolvidos

Durante a integração com o Azure Static Web Apps houve falhas de deploy em alguns commits e no PR #6, antes do pipeline ficar estável:

- O nome do secret criado pelo Azure tinha sufixo e estava diferente do usado no workflow.
- O recurso exige autenticação OIDC do GitHub (`id-token: write` e `github_id_token`).
- O arquivo do workflow precisa manter o nome gerado pelo Azure (`azure-static-web-apps-<nome>.yml`).
- O job de remoção do preview precisava do token e do ID token (corrigido no PR #7).

Os PRs #7, #8 e #9 mostram o fluxo completo funcionando (CI e deploy com sucesso).
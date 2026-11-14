# 🍳 Aplicativo: WheRecipe — Back-end

![AdonisJS](https://img.shields.io/badge/AdonisJS-5A45FF?logo=adonisjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Contexto](https://img.shields.io/badge/Contexto-Projeto%20Pessoal-blueviolet)
![Status](https://img.shields.io/badge/Status-Em%20andamento-yellow)

API do **WheRecipe**, um aplicativo pessoal para facilitar o dia a dia na cozinha: encontrar receitas com o que você já tem em casa. Este repositório concentra o Back-end (auth, catálogo, despensa e match de receitas) consumido pelo [Front-end](https://github.com/OndeJoaoGularte/WheRecipe-Frontend).

---

## 🎯 Objetivo do Projeto

Expor uma API REST que permita autenticar usuários, gerenciar a despensa, listar ingredientes/receitas e sugerir pratos a partir dos itens disponíveis, com regras de matching e persistência bem definidas no servidor.

---

## 🚀 Funcionalidades

1. **Autenticação:** Cadastro, login e logout com access tokens.
2. **Perfil:** Consulta dos dados da conta autenticada.
3. **Catálogo de ingredientes:** Listagem, detalhe e metadados (categorias/famílias).
4. **Catálogo de receitas:** Listagem e detalhe com ingredientes, passos, tags e nutrição.
5. **Match de receitas:** Endpoint que cruza a seleção/despensa com as receitas e retorna cobertura, faltantes e ratio de match.
6. **Despensa do usuário:** CRUD de itens da despensa e aplicação de atualizações após cozinhar (rotas protegidas).

---

## 🛠️ Tecnologias Utilizadas

* **AdonisJS 7:** Framework Node.js para a API, roteamento, middlewares e estrutura do projeto.
* **Lucid ORM:** Persistência e relacionamentos das entidades (users, ingredients, recipes, pantry).
* **TypeScript:** Tipagem estática em controllers, models, validators e services.
* **PostgreSQL / SQLite:** Banco relacional (Postgres no fluxo alvo; SQLite para desenvolvimento local simples).
* **Auth (Access Tokens):** Autenticação via tokens Bearer nas rotas protegidas.
* **VineJS:** Validação de entradas nas rotas.
* **Typesense:** Preparado para busca/indexação; o match do MVP usa Lucid/SQL.

---

## 🧠 Conceitos Aplicados

* **API REST versionada:** Endpoints organizados sob `/api/v1` (auth, account, ingredients, recipes, pantry).
* **Matching de domínio:** Serviço que calcula receitas completas/parciais com base nos ingredientes selecionados (incluindo famílias de ingredientes).
* **Auth e autorização:** Rotas públicas do catálogo e rotas protegidas para conta/despensa.
* **Modelagem relacional:** Usuários, categorias/famílias de ingredientes, receitas, recipe_ingredients e pantry_items.
* **Camadas Adonis:** Controllers, models, validators, middleware e services separados por responsabilidade.

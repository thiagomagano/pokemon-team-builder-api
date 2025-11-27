
![Logo](https://pokemonteambuilder.vercel.app/logo.png)

# Pokemon Team Builder

Um app simples para treinar minhas habilidades de desenvolvimento full-stack.

### Sobre o app

Este app é um construtor de equipes pokemon, o título já é bem explicativo 😝.
O objetivo principal é selecionar até 6 pokémons para montar um time ideal, explorando os pontos fortes e fracos dos pokémons com base em seus tipos.
Você poderá salvar suas equipes e depois consultá-las a hora que quiser.

### O Sistema de Batalhas Pokémon

É um sistema parecido com o jogo **"Pedra, Papel e Tesoura"** porém muito mais complexo e intenso. No "Pedra, Papel e Tesoura" são apenas **3 tipos** para memorizar.
Já em Pokemon são **18 tipos**  e eles podem se relacionar em **4 intensidades** diferentes ([Confira a relação entre os tipos de Pokémon aqui](https://pokemondb.net/type)), Então para sair como ganhador é preciso um esforço grande de memória! 
Por isso o **POKEMON TEAM BUILDER** pode te ajudar.

## Demo

[https://pokemonteambuilder.vercel.app](https://pokemonteambuilder.vercel.app/)


## Features

- Coleção de 151 Pokémon (a primeira geração, a única que importa 😛) com suas miniaturas, IDs e nomes - Contruídos via chamadas para a **Pokemon API** e salvos no banco de dados via seeding.
- Pokémons clicáveis e selecionáveis - mostram mais detalhes quando selecionados
- Sistema de cores de acordo com o tipo do Pokemon
- Barra de filtro - para mostrar apenas os Pokémons dos tipos que você deseja
- Cadastre seu nome e e-mail e faça login no aplicativo
- Nomeie e salve quantas equipes quiser


## Tecnologias Utilizadas

#### Frontend

- **React**: Biblioteca para criar componentes reutilizáveis
- **CSS**: Somente CSS Vanilla para adicionar alguns layouts e estilos aos componentes
- **Axios**: processar solicitações HTTP, conectar-se a API no backend
- **React-Router-Dom**: gerenciar a navegação do aplicativo e as criar rotas protegidas
- **React-Hot-Toast**: Notificações e feedbacks para o usuário
- **Vite**: template inicial e para fazer a build para o deploy

#### Backend

- **Node**: Server side Javascript runtime
- **Typescript**: Handle types
- **Express**: Framework to easy handle https method calls
- **REST API**: API architecture style
- **Prisma**:ORM to easy handle database model, schemas, migrations and data seeding
- **Postgress**: SQL database to store app informations

#### Outros

- **GIT**: Rastrear as mudanças do código base
- **Github**: Local para armazenar o repositório
- **Notion**: Acompanhar os recursos e o desenvolvimento das fetures do projeto
- **Insomnia**: para testar as chamadas de API
- **Heroku**: para fazer o deploy do back-end usando ferramentas CLI
- **Vercel**: para fazer o deploy do front-end do aplicativo

## Aprendizado

#### Aprendizado geral

- Com o desenvolvimento desse app pude entender muito como funciona o método de aprendizagem **"tentativa e erro"**.
É realmente muito satisfatório após horas quebrando a cabeça, achar uma solução ideal para o problema.

- Aprendi também a ler bastante a **documentação** das linguagens e bibliotecas para implementar algumas features. 

- E claro muito **Google** e **Stackoverflow** para consertar os bugs

#### Tecnoglias aprendidas

- Aprendi como a ferramenta do **Prisma** pode ser poderosa, pois pude modificar o esquema do banco de dados com muita facilidade, tipar os modelos de forma fácil e rápida.

- Aprendi bastante sobre **modelagem de dados** usando **Typescript**

- Aprendi bastante sobre javascript **assincronio** para lidar com reposta requições http

- Aprendi bastante sobre consumo de **REST API** tanto no backend para **seed** do banco de dados, como para pegar dados de outros aplicações no frontend

- Aprendi bastante sobre a utilização de **React Context API** para compartilhar estados entre os componentes da aplicação.

- Aprendi como criar metódios de registro e login utilizando **localstorage**.

- Várias utilizações de **CSS GRID** e **FLEXBOX** como poderosas maneiras criar layouts responsivos utilizando poucas linhas de código

- Aprendi a utilizar a biblioteca **REACT-HOT-TOAST** para criar notificações incrivéis

- Aprendi a utilizar **React-Router-Dom V6** Para criar rotas protegias

- Aprendi a criar **React Custom Hooks** para lidar com autenticação

- Aprendi como fazer o deploy de uma aplicação direito da linha de comando e como acessar a máquina direto na nuvem com **HEROKU**
- Aprendi como é fácil fazer o deploy de uma aplicação frontend utilizando a **Vercel**

## Improvements

Estou ciente de que é preciso acrescentar melhorias no código para deixa-lo mais limpo e organizado, para isso pretendo implementar no futuro alguns métódos: 

- Tests
- CSS Architeture
- MVC para a REST API
- Princípios de SOLID
- Typescript com React
- A11y (acessibilidade)

## Próximas Passos

Algumas atualizações que estou em mente para dar upgrade no app:
 
 - [ ] Lidar com a deleção de times
 - [ ] Lidar com a edição de pokemons direto na tela de time 
 - [ ] Geração de times de forma randômica
 - [ ] Feed com todos os times já criados pelos usuários
 - [ ] Botão de like/favoritar para os times
 - [ ] Tabela com analise do time em relação a forças e fraquezas
 - [ ] Adicionar mais pokemons de outras gerações
 - [ ] Autenticação com senha
 - [ ] Mais estatisticas dos pokemons (habilidades, golpes e etc.)
 - [ ] Páginas dedicadas para cada pokemon
 - [ ] Batalhas pokemon


## Rode a aplicação localmente

Clone o repositório do projeto

```bash
  git clone https://github.com/thiagomagano/pokemon-team-builder-frontend
```

Vá até a pasta do projeto

```bash
  cd pokemon-team-builder-frontend
```

Instale as dependências

```bash
  bun install
```

Rode o servidor de desenvolvimento

```bash
  bun run dev
```

## Related

Here are some related projects

- [Pokemon Team Planner](https://richi3f.github.io/pokemon-team-planner/)
- [Marriland's Pokémon Team Builder](https://marriland.com/tools/team-builder/)
- [My Pokemon Team](https://mypokemonteam.com/)

## Feedback

If you have any feedback, please contact me at thiagomagano1993@outlook.com

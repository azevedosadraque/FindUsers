# Find Users
## Descrição
Este projeto é uma aplicação Angular para encontrar e listar usuários do GitHub. Ele utiliza o @ngrx/store para gerenciar o estado global e @ngrx/effects para lidar com efeitos assíncronos, como chamadas HTTP.

### Tecnologias Utilizadas
- Angular: 18.2.0
- NGRX: 18.0.2
- Angular Material: 18.2.7
- RxJS: 7.8.0
- Karma para testes
- Jasmine para testes unitários
- TypeScript: 5.5.2
- Pré-requisitos

### Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (versão 16.14.0 ou superior)
- NPM (versão 8.5.0 ou superior)
- Angular CLI (versão 18.2.7)

### Para verificar se o Node.js e o NPM estão instalados corretamente, execute os seguintes comandos no terminal:
```bash
node -v
npm -v
```
### Caso precise instalar o Angular CLI, use o seguinte comando:

```npm install -g @angular/cli@18.2.7```

### Instalação
- Clone o repositório do projeto
- Navegue até o diretório do projeto:
 -- cd find-users
- Instale as dependências do projeto:
```npm install```

###Como Rodar o Projeto
Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento com o seguinte comando:
```npm start```
Isso executará o comando ng serve, que irá compilar o projeto e abrir o aplicativo no navegador padrão. O servidor estará disponível no seguinte endereço: http://localhost:4200
Qualquer alteração no código será automaticamente recarregada no navegador.

### Executar Testes
Para rodar os testes unitários, utilize o Karma executando o comando abaixo:
```npm test```
Isso iniciará o Karma, que executará os testes definidos com Jasmine no navegador.

### Estrutura do Projeto
Aqui está uma visão geral da estrutura do projeto:

````bash
src/
├── app/
│   ├── modules/
│   │   └── github/
│   │       ├── components/    # Componentes do GitHub
│   │       └── store/         # NGRX Store, Reducers, Effects e Actions
│   └── shared/                # Serviços compartilhados, modelos, etc.
├── assets/                    # Arquivos estáticos
└── environments/              # Configurações de ambiente```
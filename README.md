# 🎧 Frontend Angular - Gerenciador de Músicas e Playlists

Este é o **frontend da aplicação** desenvolvido com **Angular**, contendo telas de **login**, **músicas**, **playlists** e uma **barra lateral de navegação (sidebar)** para facilitar a troca de páginas.

---

## 🔄 Atualizações Recentes (Front-End)

As últimas melhorias focaram na experiência do usuário e no controle de acesso dentro da interface:

### - Roles de Usuário

- Implementação de roles **USER** e **ADMIN** no front-end, para controlar visibilidade de elementos e funcionalidades.

### - Sidebar Dinâmica

- O **nome do usuário logado** agora aparece na sidebar.

### - Cadastro de Usuário (somente ADMIN)

- O botão e a página de cadastro de novos usuários só aparecem para usuários com role **ADMIN**.
- Ao criar um novo usuário já vem com a senha Redefina@01

### - Página de Redefinir Senha

- Implementada página de redefinição de senha.
- O **campo de username** é automaticamente preenchido e bloqueado para edição.

### - Componente de Perfil

- Botão de perfil criado para dar acesso nas opções de redefinição de senha e logout.

---

## 🖼️ Telas Disponíveis

- 🔐 **Login** – autenticação segura via JWT armazenado em cookie HttpOnly
- 🎵 **Músicas** – cadastro, listagem, edição e exclusão de músicas
- 📃 **Playlists** – criação, edição, adição de músicas e exclusão de playlists
- 📚 **Sidebar** – navegação lateral fácil entre seções e exibição do nome do usuário logado
- 🛡️ **Cadastro de Usuário** – visível **somente para usuários com role ADMIN**; permite criar novos usuários com roles distintas
- 🔄 **Redefinir Senha** – página dedicada para alteração de senha do usuário logado; campo de username bloqueado e validação mínima de 6 caracteres

---

## 🚀 Como Executar o Projeto (Front-End)

Siga os passos abaixo para rodar o projeto localmente.

# 1. Clone este repositório

git clone https://github.com/jvitords/ProjetoPlaylistCompleto_BackEnd.git

# 2. Acesse a pasta do projeto

cd projeto-playlist

# 3. Instale as dependências

npm install

# 4. Rode o servidor Angular

ng serve

# 5. Login e Senha

Para acessar a aplicação use o login e senha já configurados para dois tipos de perfis(ADMIN e USER):

ROLE de USER:

- Username: user@gmail.com
- Password: user123

ROLE de ADMIN:

- Username: admin@gmail.com
- Password: admin123

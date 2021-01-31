<h1>
  🚀 GoBarber aplicação desenvolvida no bootcamp da rocketseat.
</h1>

# Recuperação de senha

**RF**
 - O usuário deve poder recupera sua senha informando o seu e-mail;
 - O usuário deve receber um e-mail com instruções de recuperação de senha;
 - O usuário deve poder resetar sua senha;

 **RNF**
 - Utilizar Mailtrap para testar envios em ambiente de dev;
 - Utilizar Amazon SES para envios em prodrução;
 - O envio de em-mails deve acontecer em segundo plano (backgound job)

 **RN**
 - O link enviado por email para restar senha, deve expirar em 2h;
 - O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**
- O usuário vai poder alterar seu nome, email e senha;

**RN**
- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**
- O usuário deve poder listar seus agendamentos de um ida específico
- O prestador deve receber uma notificação sempre que houve um novo aegndamento.
- O prestador deve poder visualizar as notificações não lidas

**RNF**
- Os agendamentos do prestador no dia devem ser armezados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# agendamento de serviços

**RF**
- O usuário vai poder selecionar todos os prestadores cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;

**RN**
- Os agendamentos devem estar disponíveis entre as 8h até as 18h (Primeiro às 8h, o último as 17h);
- O usuário não pode agendar em um horário que ja passou;
- O usuário não pode agendar serviços consigo mesmo;
- Cada agendamento deve durar 1 hora exatamente;
- O usuário não pode agendar em um horário já ocupado;

<p align='center'>
  <img alt='GitHub language count' src='https://img.shields.io/github/languages/count/olimpiossdx/GoStack'>

  <img alt='Repository size' src='https://img.shields.io/github/repo-size/olimpiossdx/GoStack'>

  <a href='https://github.com/olimpiossdx/omniStack/commits/master'>
    <img alt='GitHub last commit' src='https://img.shields.io/github/last-commit/olimpiossdx/GoStack'>
  </a>

  <a href='https://github.com/olimpiossdx/omniStack/10_semana/issues'>
    <img alt='Repository issues' src='https://img.shields.io/github/issues/olimpiossdx/GoStack'>
  </a>

  <img alt='License' src='https://img.shields.io/badge/license-MIT-brightgreen'>
</p>

<img alt='' title='BootCamp' src='.github/bootcamp.png' />



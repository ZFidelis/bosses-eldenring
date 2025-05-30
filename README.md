# 📚 Wiki Bosses & Weapons Elden Ring

## 🧾 Descrição

Esta API funciona como uma wiki, mostrando dados dos chefes do jogo, como localização, quantidade de vida, quantidade de runas que droppa, se pode receber parry, etc. Também mostra dados de armas do jogo, como dano, scalings, requerimentos, efeitos etc. Essa API ajuda os jogadores a saberem os dados dos principais chefes e armas do jogo, podendo ser adicionado dados sobre outros chefes e armas. 

---

## 👥 Integrantes da Dupla

- Henry Kenzo Karasawa - [usuario Github](https://github.com/karasawaa)
- Isaac Zapoctoczny Fidelis - [usuario Github](https://github.com/ZFidelis)

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** C# (.NET 8)
- **Framework:** ASP.NET Core
- **ORM:** Entity Framework Core
- **Banco de Dados:** MySQL
- **Front-end:** JavaScript + Next
- **Versionamento:** Git + GitHub

## 🚀 Como Executar o Projeto

### Pré-requisitos
- .Net SDK 8.0+
- MySQL
- Git
- Node

### Passos

```bash
#1. Clone o repositório
git clone https://github.com/ZFidelis/bosses-eldenring.git

#2. Acesse a pasta do projeto
cd ./bosses-eldenring

#3. Acesse a pasta do backend
cd ./Backend

#4. Build o projeto
dotnet build

#5. Execute o backend
dotnet run

#6. Em outro terminal, acesse a pasta do frontend
cd ./bosses-eldenring/frontend

#7. Instale/configure o next
npm install

#8. Execute o frontend
npm run dev
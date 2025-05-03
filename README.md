# dev-env-web

Interface web para provisionamento e gerenciamento de ambientes de desenvolvimento com serviços como **RabbitMQ**, **PostgreSQL** e **Kafka**.

> ⚠️ **Este projeto depende da API disponível em [sahev/dev-env-api](https://github.com/sahev/dev-env-api).**  
> Certifique-se de que ela esteja em execução para que a interface funcione corretamente.

---

## 📋 Descrição

Este projeto fornece uma interface frontend para facilitar a criação, visualização e gerenciamento de ambientes de desenvolvimento locais ou isolados, com suporte a ferramentas essenciais como:

- 🐘 **PostgreSQL**
- 🐇 **RabbitMQ**
- 🔄 **Apache Kafka** 

A proposta é permitir que desenvolvedores criem ambientes temporários e isolados via interface gráfica, com provisionamento automático de recursos usando **Docker** e **Kubernetes**.

---

## 🚀 Tecnologias Utilizadas

- [Vue.js](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vuetify](https://vuetifyjs.com/)

---

## ⚙️ Pré-requisitos

Antes de iniciar o frontend, você precisará ter:

- Node.js e npm instalados
- A API [`dev-env-api`](https://github.com/sahev/dev-env-api) rodando localmente
- **Docker** instalado e em execução
- **Kubernetes** configurado (Docker Desktop com K8s)

---

## 🧪 Clonando e rodando o projeto

### 1. Clone este repositório

```bash
git clone https://github.com/sahev/dev-env-web.git
cd dev-env-web

npm i
npm run dev
```

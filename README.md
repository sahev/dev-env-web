# dev-env-web

Web interface for provisioning and managing development environments with services such as **RabbitMQ**, **PostgreSQL**, and **Kafka**.

> ⚠️ **This project depends on the API available at [sahev/dev-env-api](https://github.com/sahev/dev-env-api).**  
> Make sure it is running for the interface to work properly.

---

## 📋 Description

This project provides a frontend interface to simplify the creation, visualization, and management of local or isolated development environments, with support for essential tools such as:

- 🐘 **PostgreSQL**
- 🐇 **RabbitMQ**
- 🔄 **Apache Kafka** 

The goal is to allow developers to create temporary and isolated environments through a graphical interface, with automatic resource provisioning using **Docker** and **Kubernetes**.

---

## 🚀 Technologies Used

- [Vue.js](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vuetify](https://vuetifyjs.com/)

---

## ⚙️ Prerequisites

Before running the frontend, you will need:

- Node.js and npm installed
- The [`dev-env-api`](https://github.com/sahev/dev-env-api) API running locally
- **Docker** installed and running
- **Kubernetes** configured (e.g., Docker Desktop with K8s enabled)

---

## 🧪 Cloning and Running the Project

### 1. Clone this repository

```bash
git clone https://github.com/sahev/dev-env-web.git
cd dev-env-web

npm i
npm run dev

```

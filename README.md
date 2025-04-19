# 🖥 Enterprise Infrastructure Dashboard — Тестовое задание

<img src="readmeImg/preview1.png" alt="Скриншот панели" width="800"/>

## 🌟 Реализованный функционал

### 🧩 Основные возможности

-   **Динамическое отображение инфраструктуры** в виде трёхколоночного интерфейса
-   **Фильтрация по группам** с сохранением состояния в Redux
-   **Детализация нод** с графиками метрик (Chart.js)
-   **Автообновление данных** каждые 60 секунд

### 🛠 Технологический стек

| Технология        | Назначение                 |
| ----------------- | -------------------------- |
| **React 18**      | Базовый фреймворк          |
| **TypeScript**    | Статическая типизация      |
| **Redux Toolkit** | Централизованное состояние |
| **SCSS Modules**  | Модульные стили            |
| **Chart.js**      | Визуализация метрик        |

## 🚀 Запуск проекта

### Установка

```bash
git clone https://github.com/Hamptooon/state-enterprise-infrastructure.git
cd state-enterprise-infrastructure

cd backend
npm install

cd ../frontend
npm install
```

### Запуск

```bash
# Запуск сервера (backend)
npm start

# Запуск клиента (frontend)
npm run start
```

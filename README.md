# React Supabase Task Manager

A modern, responsive, and modular task manager built with React and Supabase. Features authentication, instant task updates, dark mode, and a beautiful UI.

## Features

- User authentication (Sign Up, Sign In, Sign Out)
- Supabase integration for real-time data
- Add, list, and delete tasks instantly
- Responsive design with light/dark mode
- Sidebar with theme switch and sign out
- Password show/hide toggle

## Demo

[Live on GitHub Pages](https://emremuratadli.github.io/react-supabase-task-manager/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/emremuratadli/react-supabase-task-manager.git
cd react-supabase-task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

- Go to [supabase.io](https://supabase.io) and create a new project.
- Create a `tasks` table with columns: `id` (int, PK), `user_id` (uuid), `title` (text), `description` (text), `created_at` (timestamp, default now()).
- Enable Row Level Security (RLS) and add policies for authenticated users.
- Get your Supabase URL and Anon Key from Project Settings > API.

### 4. Configure environment variables

Create a `.env` file in the root:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run locally

```bash
npm start
```

### 6. Deploy to GitHub Pages

- In `package.json`, set:
  ```json
  "homepage": "https://emremuratadli.github.io/react-supabase-task-manager"
  ```
- Build and deploy:

```bash
npm run build
git add build -f
git commit -m "Build for GitHub Pages"
npm install --save gh-pages
npm run deploy
```

## GitHub Pages Setup

This project uses the `gh-pages` branch for deployment. The app will be available at:

```
https://emremuratadli.github.io/react-supabase-task-manager/
```

## Folder Structure

```
src/
  context/
  pages/
    Auth/
    Dashboard/
  services/
  styles/
```

## Technologies

- React 18
- Supabase
- React Router v6

---

> Developed by [emremuratadli](https://github.com/emremuratadli)

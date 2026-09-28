# Just do it!

A single-screen daily to-do list that celebrates finishing things. Add a task, tick it off, and watch it slide into the "Done" pile. When everything is done, the title turns into **"Done it."**

## Features

- Add, complete and delete tasks; everything is saved in `localStorage`
- Undo for 5 seconds after deleting a task or clearing the list
- Completed tasks move to a collapsible "Done" group, with a progress bar showing how far along the day is
- Empty state with one-tap suggestions
- Smooth list animations using the native View Transitions API (no animation library)
- Keyboard and screen reader friendly: real checkboxes, visible focus, 44 px touch targets, live status updates
- Respects `prefers-reduced-motion`

## Tech stack

React 19, TypeScript, Vite, CSS Modules. Fonts (Quicksand and Bricolage Grotesque) are self-hosted via Fontsource. No backend, no state library.

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run lint     # ESLint
npm run build    # type-check and production build
npm run preview  # serve the production build
```

## Project structure

```
src/
├── context/       # task state, localStorage persistence, undo, view transitions
├── components/    # TaskForm, TaskList (+ EmptyState), TaskItem, UndoToast
├── TodoList.tsx   # page layout
└── main.css       # design tokens and global styles
```

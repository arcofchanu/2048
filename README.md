# 2048 - A Modern Take

This is a fully functional, responsive 2048 game with a sleek, futuristic monochrome theme. Built with React, TypeScript, and Tailwind CSS, it offers smooth animations, a "Matrix"-style live background, and both keyboard and touch controls.

![2048 Game Screenshot](https://storage.googleapis.com/fpl-assets/2048-game.png)

## ✨ Features

- **Classic 2048 Gameplay**: Merge tiles to reach the 2048 tile.
- **Responsive Design**: Adapts seamlessly to any screen size, from mobile to desktop.
- **Dual Controls**: Play using arrow keys on a keyboard or by swiping on a touch device.
- **Futuristic Aesthetics**: A dark, minimalist theme with glowing text, sharp animations, and a live "Matrix-rain" background.
- **3D Interactive Start**: A cool, morphing 3D orb (built with Babylon.js) to start the game.
- **Satisfying Animations**: Smooth transitions for tile spawning, moving, and merging. A special "shockwave" effect triggers on major score milestones.
- **Persistent Best Score**: Your best score is saved locally, so you can always try to beat it.
- **Game Over State**: Clear "Game Over" overlay with your final score.

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics**: [Babylon.js](https://www.babylonjs.com/) for the interactive start object.
- **Module Loading**: Uses `esm.sh` for live, build-less dependency management in the browser.

## 📂 Project Structure

The project is organized into logical directories for better maintainability.

```
/
├── components/         # Reusable React components
│   ├── Board.tsx
│   ├── Button.tsx
│   ├── GameOverOverlay.tsx
│   ├── Header.tsx
│   ├── InteractiveStartObject.tsx
│   ├── LiveBackground.tsx
│   ├── ScoreMilestoneEffect.tsx
│   ├── StartPage.tsx
│   └── Tile.tsx
├── constants/          # Application-wide constants (e.g., GRID_SIZE)
│   └── index.ts
├── hooks/              # Custom React hooks
│   └── useGame.ts
├── lib/                # Core, framework-agnostic logic
│   └── gameLogic.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── index.html          # Main HTML entry point
├── index.tsx           # Main React application entry point
└── metadata.json       # Application metadata
```

## 🧠 Key Components Breakdown

-   **`App.tsx`**: The root component that manages the overall game state (start screen vs. active game) and assembles the UI.
-   **`hooks/useGame.ts`**: The heart of the game's interactivity. This custom hook manages the game board, score, user input (keyboard and touch), and game state transitions.
-   **`lib/gameLogic.ts`**: A set of pure functions that handle the core rules of 2048: initializing the board, processing moves, merging tiles, adding new random tiles, and checking for the game-over condition.
-   **`components/Board.tsx`**: Renders the game grid and positions the tiles based on the state provided by the `useGame` hook. It uses CSS variables to dynamically calculate tile sizes and positions.
-   **`components/Tile.tsx`**: A memoized component that represents a single tile. It handles its own styling based on its value and its spawn/merge animations.
-   **`components/LiveBackground.tsx`**: Creates the immersive, falling character animation using the HTML Canvas API.
-   **`components/InteractiveStartObject.tsx`**: Integrates a Babylon.js scene to render the interactive 3D orb on the start screen.
-   **`components/ScoreMilestoneEffect.tsx`**: Manages the detailed shockwave animation that provides visual feedback when the player reaches a score milestone.

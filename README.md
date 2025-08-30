# Shiritori Game Frontend

This is the **frontend** for the multiplayer Shiritori game, built with **React.js** and **Tailwind CSS**.  
It connects to a backend API to validate words, track history, and manage scores.

---

## Table of Contents

- [Features](#features)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Game Mechanics](#game-mechanics)  
- [Components](#components)  
- [Styling](#styling)  
- [License](#license)  

---

## Features

- Two-player turn-based Shiritori game  
- Word validation via backend API  
- Score tracking for each player  
- Countdown timer for each turn (15 seconds)  
- Word history display  
- Reset button to start a new game  
- Fully responsive UI with Tailwind CSS  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Tanvir-art/shiritori_frontend.git
cd shiritori_frontend
npm install
npm run start
```

## Usage
Enter a word in your turn that starts with the last letter of the previous word.
Minimum word length is 4 letters.
Points are awarded for correct words and deducted for wrong words.
Click Submit to validate the word.
Click Reset to restart the game.
Word history is displayed at the bottom.

# Entity Overview

This document provides an overview of the entities in the "Pyjama Game" and the letters that represent them in the game layout.

## Entities and Their Representations

- **Player (P)**
  - Represents the player in the game.
  - Can move left, right, up, and down.
  - Can jump, attack guards, and collect powerups, explosives, and keys.

- **Obstacle (O)**
  - Represents obstacles in the game.
  - Can be destroyed by the player.
  - Can drop powerups, explosives, and keys when destroyed.

- **Powerup (U)**
  - Represents powerups in the game.
  - Can be collected by the player.
  - Can be dropped by guards, obstacles, and keys.

- **Explosive (E)**
  - Represents explosives in the game.
  - Can be hidden under obstacles and activated.
  - Can reduce player lives and create visual effects when detonated.

- **Guard (G)**
  - Represents guards in the game.
  - Can move towards the player and detect the player's position.
  - Can attack the player and be defeated by the player.
  - Can drop powerups, explosives, and keys when defeated.

- **Key (K)**
  - Represents keys in the game.
  - Can be collected by the player.
  - Can be dropped by guards and obstacles.

- **Wall (#)**
  - Represents walls in the game.
  - Cannot be destroyed by the player.

## Example Level Layout

Here is an example of a level layout with the entities represented by their respective letters:

```javascript
[
    ['#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', 'P', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', 'O', '#', ' ', '#', ' ', ' ', '#'],
    ['#', ' ', '#', ' ', '#', ' ', ' ', '#'],
    ['#', 'E', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', '#', ' ', '#', ' ', ' ', '#'],
    ['#', ' ', ' ', 'G', ' ', 'E', ' ', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#']
]
```

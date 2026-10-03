# Making Games with Scratch (Ages 8-10)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2892` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal blueprint (no external syllabus) |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Making Games with Scratch (Ages 8-10) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design simple game rules, a goal and a win/lose condition
2. Control a player sprite with keyboard input
3. Use cloning or loops to spawn obstacles or collectibles
4. Detect collisions and respond to them
5. Keep score and lives using variables
6. Playtest a game and improve it based on feedback

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Game design basics (25% (design weight), design weight)

- Worked applications: (1) Write down the goal and win condition for a maze game; (2) List one way a player can lose
- Common misconception addressed: Thinking a game is finished before any win or lose rule exists
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Goal, rules and win/lose conditions | 120 | 7 |
| M01L02 | Sketching a game on paper first | 120 | 7 |

### M02 Player control (25% (design weight), design weight)

- Worked applications: (1) Move a spaceship left and right with arrow keys; (2) Stop the ship from leaving the screen edge
- Common misconception addressed: Thinking the player can move off-screen with no limit
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Moving the player with keys | 120 | 7 |
| M02L02 | Keeping the player on the screen | 120 | 7 |

### M03 Obstacles and collectibles (25% (design weight), design weight)

- Worked applications: (1) Use clones to drop several falling stars; (2) Make stars reset to the top after falling
- Common misconception addressed: Thinking one sprite can be in many places without clones or loops
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Spawning objects with clones or loops | 120 | 7 |
| M03L02 | Making objects move toward the player | 120 | 7 |

### M04 Scoring and playtesting (25% (design weight), design weight)

- Worked applications: (1) Add a score that rises and lives that fall; (2) Change the game after a friend playtests it
- Common misconception addressed: Thinking the first version never needs changing
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Score, lives and the game-over state | 120 | 7 |
| M04L02 | Playtesting and improving the game | 120 | 7 |

## Integrative case

Learners build a 'dodge the asteroids' game: a spaceship steered by arrow keys, asteroids spawned as clones, collision detection that costs a life, a score that rises over time, and a game-over screen; friends playtest and suggest one improvement.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2892-final-protected | 40 | 40 | yes |
| MST-2892-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Game design basics | 10 |
| Player control | 10 |
| Obstacles and collectibles | 10 |
| Scoring and playtesting | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2892-Q0001** (single-answer, Select ONE) Before coding a game, why is it helpful to write down the goal and the win/lose rules?

- A. It gives a clear plan so you know what to build and when the game ends **(key)**  
  _Rationale:_ Correct: clear rules guide the build and define winning and losing.
- B. It makes the computer run faster  
  _Rationale:_ Planning helps you, not the computer's speed.
- C. Games do not need goals  
  _Rationale:_ A goal is what makes it a game.
- D. It changes the sprite's costume  
  _Rationale:_ Planning rules does not change costumes.

**MST-2892-Q0002** (multiple-answer, Select TWO) Which TWO of these help make a game fair and fun to play? (Select TWO.)

- A. A clear way to win **(key)**  
  _Rationale:_ Correct: a clear goal makes the game fair.
- B. Playtesting and fixing problems **(key)**  
  _Rationale:_ Correct: testing with players improves the game.
- C. Hiding the score so nobody can see it  
  _Rationale:_ Players usually need to see progress; hiding it is not required for fairness.
- D. Making the player move off the screen forever  
  _Rationale:_ Letting the player leave the screen is a bug, not a feature.

**MST-2892-Q0003** (single-answer, Select ONE) Your falling stars only fall once and never come back. What should you add?

- A. Code to reset each star to the top (and keep spawning) so they fall again **(key)**  
  _Rationale:_ Correct: objects must be reset or respawned to keep the game going.
- B. Nothing; games only need one star  
  _Rationale:_ A game usually needs objects to keep appearing.
- C. A bigger spaceship  
  _Rationale:_ Size does not make stars respawn.
- D. A louder sound  
  _Rationale:_ Sound does not reset the stars' position.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

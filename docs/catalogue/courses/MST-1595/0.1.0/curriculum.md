# Raspberry Pi Projects

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1595` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-RPP-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Raspberry Pi Projects (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Raspberry Pi foundations
2. Linux on the Pi
3. GPIO basics
4. Reading sensors
5. Python for hardware
6. Services and scheduling
7. Networking
8. Reliability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on building projects with the Raspberry Pi; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Raspberry Pi foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Flash an OS image and boot the Pi; (2) Explain how the Pi differs from an MCU
- Common misconception addressed: Treating the Pi like a bare-metal microcontroller
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What the Pi is | 75 | 5 |
| M01L02 | Imaging and first boot | 75 | 5 |

### M02 Linux on the Pi (MASTEMY-DESIGN 13%)

- Worked applications: (1) Navigate the filesystem over SSH; (2) Install a package with the package manager
- Common misconception addressed: Never updating the system and ignoring security patches
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The command line | 75 | 5 |
| M02L02 | Package management and updates | 75 | 5 |

### M03 GPIO basics (MASTEMY-DESIGN 12%)

- Worked applications: (1) Blink an LED from Python; (2) Read a button's state
- Common misconception addressed: Driving a 5V device from a 3.3V pin without level shifting
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The GPIO header | 75 | 5 |
| M03L02 | Controlling pins from Python | 75 | 5 |

### M04 Reading sensors (MASTEMY-DESIGN 13%)

- Worked applications: (1) Read a sensor over I2C; (2) Enable an interface in the config
- Common misconception addressed: Forgetting the Pi has no built-in ADC for analog sensors
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Digital and analog sensing | 75 | 5 |
| M04L02 | Buses: I2C and SPI | 75 | 5 |

### M05 Python for hardware (MASTEMY-DESIGN 12%)

- Worked applications: (1) Use a GPIO library to control a pin; (2) Clean up GPIO state on exit
- Common misconception addressed: Leaving pins in an undefined state on crash
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | GPIO libraries | 75 | 5 |
| M05L02 | Structuring hardware code | 75 | 5 |

### M06 Services and scheduling (MASTEMY-DESIGN 13%)

- Worked applications: (1) Create a systemd service for a script; (2) Schedule a task with cron
- Common misconception addressed: Starting long-running scripts manually and losing them on reboot
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Running a script at boot | 75 | 5 |
| M06L02 | systemd services and cron | 75 | 5 |

### M07 Networking (MASTEMY-DESIGN 12%)

- Worked applications: (1) Expose sensor data via a small web server; (2) Access the Pi from another device
- Common misconception addressed: Exposing an unsecured service to the internet
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Serving data over the network | 75 | 5 |
| M07L02 | A simple web endpoint | 75 | 5 |

### M08 Reliability (MASTEMY-DESIGN 12%)

- Worked applications: (1) Reduce writes to protect the SD card; (2) Run and recover a headless Pi
- Common misconception addressed: Pulling power without a clean shutdown and corrupting the card
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | SD-card wear and backups | 75 | 5 |
| M08L02 | Headless operation | 75 | 5 |

## Integrative case

Build a Raspberry Pi project that reads a sensor and serves data: set up the OS, control GPIO from Python, read a sensor, run a small service at boot, and expose a simple network endpoint, respecting the Pi's role as a Linux computer.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1595-final-protected | 40 | 40 | yes |
| MST-1595-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Raspberry Pi foundations | 5 |
| Linux on the Pi | 5 |
| GPIO basics | 5 |
| Reading sensors | 5 |
| Python for hardware | 5 |
| Services and scheduling | 5 |
| Networking | 5 |
| Reliability | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1595-Q0001** (single-answer, Select ONE) How does a Raspberry Pi fundamentally differ from a typical microcontroller like an Arduino?

- A. The Pi runs a full Linux operating system on an application processor, not bare-metal firmware **(key)**  
  _Rationale:_ Correct: it is a small Linux computer, enabling services, networking and a filesystem.
- B. The Pi has no way to control GPIO pins  
  _Rationale:_ It can control GPIO, just under an OS.
- C. The Pi cannot run Python  
  _Rationale:_ Python is a primary language on the Pi.
- D. The Pi has less capability than an 8-bit MCU  
  _Rationale:_ It is far more capable than a typical MCU.

**MST-1595-Q0002** (single-answer, Select ONE) Why is a systemd service preferred over starting a script manually for a long-running Pi project?

- A. It starts the script automatically at boot and can restart it on failure **(key)**  
  _Rationale:_ Correct: systemd manages lifecycle and survives reboots.
- B. It makes the Pi boot faster by skipping Linux  
  _Rationale:_ The Pi still boots Linux.
- C. It converts the script to C automatically  
  _Rationale:_ systemd does not transpile code.
- D. It removes the need for networking  
  _Rationale:_ Unrelated to networking.

**MST-1595-Q0003** (multiple-answer, Select ALL that apply) Which statements about the Raspberry Pi's hardware are correct? (Select TWO)

- A. Its GPIO pins operate at 3.3V, so a 5V device may need level shifting **(key)**  
  _Rationale:_ Correct: driving/reading 5V directly can damage the Pi.
- B. It has no built-in analog-to-digital converter, so analog sensors need an external ADC **(key)**  
  _Rationale:_ Correct: unlike many MCUs, the Pi lacks an onboard ADC.
- C. Its GPIO pins are 5V tolerant by default  
  _Rationale:_ False; they are 3.3V and not 5V tolerant.
- D. It includes a built-in ADC for analog sensors  
  _Rationale:_ False; an external ADC is required.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

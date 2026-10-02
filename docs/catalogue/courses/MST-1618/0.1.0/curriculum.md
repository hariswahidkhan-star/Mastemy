# Matplotlib and Seaborn

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1618` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-MS-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build and customise figures with the Matplotlib object-oriented API
2. Choose chart types that match the data and the analytical question
3. Create statistical visualisations with Seaborn
4. Apply clear styling, colour and annotation for readable charts
5. Export publication-ready figures and small-multiple layouts

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses chart-selection and visualisation reasoning through selection items; does not assess producing a rendered figure in a live environment.

## Modules

### M01 Matplotlib figure anatomy (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rebuild a cluttered pyplot chart using the object-oriented Figure/Axes API; (2) Fix overlapping tick labels and a missing legend on a sample plot
- Common misconception addressed: Believing plt.plot() state-machine calls are interchangeable with Axes method calls in every case
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Figures, axes and the pyplot vs OO interface | 96 | 8 |
| M01L02 | Lines, markers, limits, ticks and legends | 96 | 8 |

### M02 Core chart types (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick the right chart for three questions about the same dataset and justify each; (2) Add error bars that correctly represent a standard deviation vs a standard error
- Common misconception addressed: Using a line chart for unordered categorical data
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Line, bar and scatter plots | 96 | 8 |
| M02L02 | Histograms, box plots and error bars | 96 | 8 |

### M03 Seaborn for statistical graphics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Reproduce a Matplotlib scatter as a Seaborn relplot with a hue dimension; (2) Decide between a figure-level catplot and an axes-level boxplot for a faceting need
- Common misconception addressed: Mixing figure-level and axes-level Seaborn calls on the same Axes and expecting consistent control
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Relational and distribution plots | 96 | 8 |
| M03L02 | Categorical plots and the figure-level vs axes-level distinction | 96 | 8 |

### M04 Styling and colour (MASTEMY-DESIGN 20%)

- Worked applications: (1) Convert a default chart to a colour-blind-safe palette and verify contrast; (2) Annotate the peak of a time series with an arrow and label
- Common misconception addressed: Choosing a rainbow colormap for sequential data
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Styles, themes, rcParams and colour palettes | 96 | 8 |
| M04L02 | Annotation, text and accessible colour choices | 96 | 8 |

### M05 Composition and export (MASTEMY-DESIGN 20%)

- Worked applications: (1) Lay out a 2x2 small-multiple panel sharing axes with one legend; (2) Export the same figure to PNG and SVG at print resolution without clipped labels
- Common misconception addressed: Relying on the on-screen preview size instead of setting figure size and DPI for export
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Subplots, GridSpec and small multiples | 96 | 8 |
| M05L02 | Saving figures: DPI, formats and layout control | 96 | 8 |

## Integrative case

An analyst must turn a quarterly sales dataset into a four-panel figure for a leadership deck: choose chart types for trend, distribution and category comparison, apply an accessible palette, annotate the key finding, and export a print-ready file that reads clearly in grayscale.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1618-final-protected | 25 | 25 | yes |
| MST-1618-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Matplotlib figure anatomy | 5 |
| Core chart types | 5 |
| Seaborn for statistical graphics | 5 |
| Styling and colour | 5 |
| Composition and export | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1618-Q0001** (single-answer, Select ONE) You need precise control over two subplots that share an x-axis. Which approach fits best?

- A. Create a Figure and Axes with plt.subplots(2, 1, sharex=True) and call methods on each Axes **(key)**  
  _Rationale:_ Correct: the object-oriented API gives explicit per-Axes control and shared axes.
- B. Call plt.plot() repeatedly and hope the state machine targets the right subplot  
  _Rationale:_ The implicit state machine makes targeting the intended subplot error-prone.
- C. Make two separate figures and paste them together in an image editor  
  _Rationale:_ That loses shared axes and reproducibility.
- D. Use a single Axes and overplot both series regardless of scale  
  _Rationale:_ Overplotting different scales on one Axes misleads the reader.

**MST-1618-Q0002** (multiple-answer, Select TWO) Which TWO choices improve the accessibility of a chart? (Select TWO.)

- A. Use a colour-blind-safe qualitative palette **(key)**  
  _Rationale:_ Correct: colour-blind-safe palettes keep categories distinguishable.
- B. Add direct labels or patterns so meaning does not rely on colour alone **(key)**  
  _Rationale:_ Correct: redundant encoding supports readers who cannot distinguish colours.
- C. Encode five categories with closely spaced rainbow hues  
  _Rationale:_ Rainbow hues are hard to distinguish and not perceptually uniform.
- D. Remove the legend and axis titles to reduce clutter  
  _Rationale:_ Removing labels harms comprehension, not accessibility.

**MST-1618-Q0003** (single-answer, Select ONE) A Seaborn figure-level function (e.g. relplot) returns which object that controls the whole figure?

- A. A FacetGrid-style object managing the figure and its facets **(key)**  
  _Rationale:_ Correct: figure-level functions return a grid object that owns the figure.
- B. A single Matplotlib Axes  
  _Rationale:_ That is what axes-level functions target, not figure-level ones.
- C. A pandas DataFrame  
  _Rationale:_ The input may be a DataFrame; the return is not.
- D. Nothing; it only draws to the current Axes  
  _Rationale:_ Figure-level functions create and return their own figure object.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

# Active Directory Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1658` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-ADF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Active Directory Fundamentals (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain the purpose and structure of Active Directory and its logical components
2. Create and organise users, groups and organisational units
3. Apply Group Policy to enforce configuration and security settings
4. Describe authentication, domain controllers and replication at a high level
5. Perform basic Active Directory maintenance and troubleshooting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Active Directory concepts (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draw the logical model for a two-site company; (2) Explain the difference between a domain and a forest to a colleague
- Common misconception addressed: Confusing the physical site layout with the logical domain structure
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Domains, trees, forests and the logical model | 72 | 6 |
| M01L02 | Objects, schema and the global catalog | 72 | 6 |

### M02 Users, groups and OUs (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design an OU structure for two departments; (2) Choose the correct group scope for a shared printer
- Common misconception addressed: Assigning permissions to individual users instead of to groups
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating and managing user accounts | 72 | 6 |
| M02L02 | Groups, group scope and organisational units | 72 | 6 |

### M03 Group Policy (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide where to link a GPO so only one OU is affected; (2) Configure a password policy through Group Policy
- Common misconception addressed: Believing a GPO linked at the domain always wins over one linked at an OU
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | How Group Policy objects apply and inherit | 72 | 6 |
| M03L02 | Common security and configuration policies | 72 | 6 |

### M04 Authentication and replication (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Trace what happens when a user logs on to the domain; (2) Explain why DNS problems break domain logons
- Common misconception addressed: Thinking Active Directory works without a healthy DNS service
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Domain controllers and Kerberos basics | 72 | 6 |
| M04L02 | Replication and the role of DNS | 72 | 6 |

### M05 Maintenance and troubleshooting (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan recovery of an accidentally deleted user account; (2) Troubleshoot a user who cannot log on at one site
- Common misconception addressed: Resetting passwords repeatedly instead of finding the lockout source
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Backup, restore and account lockouts | 72 | 6 |
| M05L02 | Diagnosing common AD problems | 72 | 6 |

## Integrative case

A growing company is moving from standalone accounts to a Windows domain. Design an organisational-unit structure for two departments, create groups for shared resources, apply a password policy through Group Policy, and document how a new starter would be onboarded.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1658-final-protected | 25 | 25 | yes |
| MST-1658-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Active Directory concepts | 5 |
| Users, groups and OUs | 5 |
| Group Policy | 5 |
| Authentication and replication | 5 |
| Maintenance and troubleshooting | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1658-Q0001** (single-answer, Select ONE) Why is it recommended to assign permissions to groups rather than individual users in Active Directory?

- A. It simplifies management and keeps access consistent as people change roles **(key)**  
  _Rationale:_ Correct: group-based access scales and is easier to audit.
- B. Individual users cannot be given any permissions  
  _Rationale:_ Users can be assigned permissions; groups are simply better practice.
- C. Groups disable auditing  
  _Rationale:_ Groups do not disable auditing; they aid it.
- D. It removes the need for a domain controller  
  _Rationale:_ Domain controllers are still required regardless of group use.

**MST-1658-Q0002** (multiple-answer, Select TWO) Which TWO services must be healthy for domain logons to work reliably? (Select TWO.)

- A. DNS **(key)**  
  _Rationale:_ Correct: clients use DNS to locate domain controllers.
- B. A reachable domain controller **(key)**  
  _Rationale:_ Correct: authentication requires a contactable domain controller.
- C. A public web server  
  _Rationale:_ A public web server is unrelated to domain authentication.
- D. A printer spooler  
  _Rationale:_ Printing services are not required for logon.

**MST-1658-Q0003** (single-answer, Select ONE) A Group Policy Object is linked at both the domain and an OU with conflicting settings. By default, which applies to objects in that OU?

- A. The OU-linked GPO, because the closest link in the processing order wins **(key)**  
  _Rationale:_ Correct: GPOs apply site, domain, then OU, with the last applied normally winning.
- B. The domain-linked GPO always overrides the OU  
  _Rationale:_ Unless enforced, the OU link applies later and normally wins.
- C. Neither GPO applies  
  _Rationale:_ Both are processed; the conflict is resolved by order.
- D. The user must choose which applies  
  _Rationale:_ Policy application is automatic, not user-selected.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

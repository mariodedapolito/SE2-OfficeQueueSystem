# RETROSPECTIVE (Team R01)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Committed Stories: 11 ; Stories Done: 0
- Committed Points: 27; Points Done: 0
- Planned Hours: 50.5 ; Spent Hours: (Without Michele 41.41)

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual     |
| ----- | ------- | ------ | ---------- | ---------------- |
| _#0_  | 6       | -      | 15h 30m    | 14h 10m          |
| _#1_  | 1       | 2      | 3h 30m     | 5h 15m           |
| _#2_  | 1       | 1      | 3h         | 2h 45m           |
| _#3_  | 1       | 3      | 5h         | 2h 30m(Michele?) |
| _#4_  | 2       | 3      | 4h 30m     | 3h 30m           |
| _#5_  | 1       | 3      | 3h         | 2h 30m           |
| _#6_  | 1       | 2      | 1h 30m     | 2h 30m           |
| _#7_  |         | -      |            |                  |
| _#8_  | 1       | 1      | 1h         | 45m              |
| _#9_  | 2       | 5      | 3h 30m     | 2h 30m           |
| _#10_ | 1       | 2      | 1h 30m     | 3h 30m           |
| _#11_ | 2       | 3      | 5h 30m     | 1h 15m           |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation)
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 0h (6h of studying unit testing methods)
  - Total hours spent: 0h (3h of studying unit testing methods)
  - Nr of automated unit test cases : 0

- E2E testing:
  - Total hours estimated: 9h 30 min
  - Total hours spent: 8h 45 min
- Code review
  - Total hours estimated
  - Total hours spent
- Technical Debt management:
  - Total hours estimated: 1h 30min
  - Total hours spent: 1h 30min
  - Hours estimated for remediation by SonarQube
  - Hours estimated for remediation by SonarQube only for the selected and planned issues
  - Hours spent on remediation
  - debt ratio (as reported by SonarQube under "Measures-Maintainability")
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )

## ASSESSMENT

- What caused your errors in estimation (if any)?
  - Underestimated need for coordination between team members (many modules of the app were linked and were dependent on one another)
  - Underestimated code documentation and testing time


- What lessons did you learn (both positive and negative) in this sprint?
  - The need for a well-documented code is essential in a team-working environment
  - We need to schedule more time for organization and coordination meetings
  - We need to better divide the tasks among team members to reduce wasted time on coordination


- Which improvement goals set in the previous retrospective were you able to achieve?
  - Nothing
- Which ones you were not able to achieve? Why?
  - Nothing

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - Loose less time in coordination efforts by estimating more hours for communication and documentation
  - Better define tasks to reduce task dependencies and improve the possibility for all team members to work in parallel


- One thing you are proud of as a Team!!
  - Everyone worked really hard to provide a perfectly working demo
  - The communication between team members was extremely friendly

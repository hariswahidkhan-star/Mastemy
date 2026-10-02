# Organization Admin Manual (org Admin and Manager)

Mastemy staff create your organization and set its seat limit. Your org page is at `/orgs/{id}`. Members of other
organizations cannot see anything about yours.

## Roles

| | Org Admin | Manager |
|---|---|---|
| Invite and remove Members, set departments | Yes | Yes (no changes that grant or remove premium access) |
| See member emails | Yes | No (names and departments only) |
| Grant, change or remove Manager/Admin roles | Yes | No |
| Assignments that grant premium services | Yes | No |
| Progress reports | Yes | Yes |

The last org Admin cannot be removed or demoted.

## Inviting people

- **Single invite**: enter an email, a role and an optional department. If the site sends email, the invitation is
  emailed. The accept link is also shown to you so you can share it another way. Invitations expire after 14 days, and
  re-inviting an address replaces the earlier invitation. Invitations do not use seats.
- **Bulk invite**: paste a CSV with one email per row, then preview it. The preview flags invalid emails, duplicates
  and rows that exceed the free seats. The commit invites everyone or nobody.
- **Accepting**: the person signs in with the invited email address and opens the link. A seat is used on acceptance.
  If no seat is free, the invitation stays pending until one is.
- Revoke pending invitations from the Invitations list.

## Assignments

- Assign a live course to the whole organization, to a department or to one person, optionally with a due date.
- **Grants premium** (org Admin only) gives the covered members the course's premium study services for as long as
  the assignment and membership last. Removing a member, changing their department, deleting the assignment or
  deactivating the organization removes that access automatically.
- Videos are always free and are not part of what an assignment grants. Courses on public or unlisted YouTube are not
  suitable for confidential corporate video.

## Reports

The progress report has one row per member per assigned course, showing:

- completed lessons and progress percent
- best score on certificate assessments
- passed, certificate code
- due date and overdue flag

Download it as CSV (formula-safe). Learners' private notes and AI chats are never visible to you.

## Limits

Not available yet: SSO/SCIM, seat purchasing and invoicing for organizations (seats are set by Mastemy staff),
assigning whole pathways (assign their courses instead), and uploading private organization materials.

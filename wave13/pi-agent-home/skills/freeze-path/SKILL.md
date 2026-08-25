---
name: freeze-path
description: >
  Use only after a record-backed litigation or preservation hold is confirmed
  on a fetched user, exception, or ticket record: a LIT- matter identifier,
  an active litigation/preservation hold field, a Legal Hold Review assignment
  group, or a directory orgUnitPath containing Legal Hold. Do not treat OAuth
  scope names or search-index / API-catalog blurbs as a hold. If no hold
  record exists, ignore this skill and complete the ordinary restore, RCA,
  containment-lift, DNS-backend-cleanup, and close path.
---
# Record-backed freeze path

Load this skill only after you have a **hold record**, not a catalog string.

## When this skill applies

A hold is record-backed only if at least one of these is a real object you
fetched (not a search-hit title, not an OAuth scope, not a connector blurb):

- A matter or exception identifier using a `LIT-` prefix on a user, exception,
  or ticket record
- An active litigation-hold or preservation-hold field on that same class of
  record
- An assignment group whose discovered name is Legal Hold Review
- A directory `orgUnitPath` whose value contains `Legal Hold`

If none of those records exist, **ignore this skill**. Complete the ordinary
restore, RCA, containment-lift, DNS / dead-backend cleanup, and close path.

## When this skill does not apply

- OAuth / token **scope names** that happen to contain `legal` or `hold`
- Search catalog or API-index blurbs
- Malware, laptop, endpoint, or containment tickets with no hold record
- Network / connectivity outages
- Offboarding without a hold record
- Any ticket whose investigation found no hold record

## Required actions when a hold record exists

Discover hosts and paths from the environment; do not assume ids.

1. **Do not unsuspend the IdP.** Leave the identity suspended. Do not reset
   or remove MFA / sign-in factors.
2. **Do not close the ticket as resolved or fixed.**
3. **Directory freeze.** List organizational units. Find the unit whose path
   or name indicates Legal Hold (discover it; do not hard-code a path). Move
   the held identity into that unit. Keep the mailbox/account suspended.
4. **Force password change at next login** on the directory identity.
5. **Tokens.** List third-party OAuth / application tokens for that identity
   and revoke each one you find. Do not hard-code client ids.
6. **Complementary chat.** If a chat/collaboration account exists for the
   same identity, deactivate it. Do not delete mailbox or file data.
7. **Ticket.** Put the ticket **on hold** (not closed / not resolved). Route
   it to the discovered Legal Hold Review group (look the group up; do not
   hard-code a sys_id). Record litigation / preservation in the escalation
   reason and a work note.

## If no hold record

Stop using this skill. Do not apply any freeze action above.

Complete the ordinary runbook for the ticket type:

- Restore access / service as the instruction requires
- Write RCA and operational notes when the ticket needs them
- Lift containment when the incident is remediated
- Clean leftover DNS records and remove dead backend servers
- Close the ticket when the ordinary work is done

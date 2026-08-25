---
name: case-path
description: >
  Use only after fetched records confirm one of: a litigation or preservation
  hold on a user, exception, or ticket (LIT- matter, active hold field, Legal
  Hold Review assignment group, or orgUnitPath containing Legal Hold); or an
  endpoint-security record whose cause is malware, a file-hash IOC, or host
  network-containment. Do not treat OAuth scope names, authorized-testing /
  expected-activity / red-team exceptions, offboarding, network or API
  outages, or catalog blurbs as a match. Decide from fetched records first.
  Do not read this skill to decide which record exists. If neither record
  exists, ignore this skill.
---
# Record-backed case path

Load this skill only after you have fetched a **hold record** or an
**endpoint-security record**. Catalog titles and search blurbs are not a match.
Decide from fetched records first. Do not read this skill to decide match.

Follow **exactly one** branch. If a hold record exists, use the hold branch
only. If an endpoint-security record exists and no hold record exists, use
the endpoint branch only. If neither exists, ignore this skill.

## Hold record (definition)

A hold is record-backed only if at least one of these is a real object you
fetched (not a search-hit title, not an OAuth scope, not a connector blurb):

- A matter or exception identifier using a `LIT-` prefix on a user, exception,
  or ticket record
- An active litigation-hold or preservation-hold field on that same class of
  record
- An assignment group whose discovered name is Legal Hold Review
- A directory `orgUnitPath` whose value contains `Legal Hold`

## Endpoint-security record (definition)

At least one fetched object (not a search-hit title) is:

- An endpoint detection or alert whose cause is malware or a file-hash IOC
- A host/device record in network-containment because of that finding
- An existing file-hash indicator tied to that detection

## When this skill does not apply

- OAuth / token **scope names** that happen to contain `legal` or `hold`
- Search catalog or API-index blurbs
- Authorized testing, expected activity, or red-team exception records
- Offboarding without a hold record
- Network or API outages
- Any ticket whose investigation found neither record

## Hold branch — required actions when a hold record exists

Discover hosts and paths from the environment; do not assume ids.
Do **not** run the endpoint branch.

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

## Endpoint branch — required actions when an endpoint-security record exists and no hold record exists

Discover hosts and paths from the environment. Do not invent hashes, device
ids, ticket numbers, or team names. Do **not** run the hold branch.

1. **Detection assignment.** Assign the existing detection to the discovered
   security-operations responder (look the team or queue name up; do not
   hard-code it).
2. **Detection status.** Set that same existing detection's status to closed.
   Re-read it. Assigned-but-still-open is not done.
3. **Hash block.** If a file-hash IOC already exists for this detection, update
   that existing indicator in place. Do not create a duplicate.
4. **Containment lift.** After the hash is blocked, lift host network-containment
   on the remediated device. Do not re-contain or wipe it.
5. **MDM hygiene.** On the matching managed device: run a Defender/antivirus
   scan, trigger a device resync, and confirm last-sync advanced. Discover the
   MDM endpoints; do not skip resync.
6. **Incident classification.** Reclassify the incident as security (discover
   the field). Do not leave it as a generic hardware or performance ticket.
7. **Problem record.** Create or update a problem record whose short description
   names malware, whose root cause names malware **and** the exact hash from
   the detection record, and whose product-area field is endpoint security
   (discover the field name).
8. **Asset audit.** Record an asset audit on the matching hardware asset
   (discover the audit endpoint).
9. **Confirm writes.** Re-read records after writes. An empty update response
   is not confirmation.
10. **Incident terminal state.** After the writes above, set the incident to
    the platform's terminal closed/inactive state (re-read; a merely-resolved
    state that leaves the record active is not enough). Use a permanent
    close-code and close-notes that name malware. Do **not** take this step
    if a hold record exists.

## Do not

- Wipe, retire, or re-contain a remediated device
- Create a duplicate hash IOC when one already exists — update the existing
  indicator
- Invent hashes, serials, hostnames, or responder display names
- Apply hold actions on malware-only tickets, or endpoint actions on hold tickets
- Apply either branch on offboarding or outage tickets

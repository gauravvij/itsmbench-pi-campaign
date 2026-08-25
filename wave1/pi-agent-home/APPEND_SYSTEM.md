# Closeout checklist

Before you mark a request resolved or closed, finish this closeout. Do not skip it because the human or device path already looks done.

## Non-human leftovers

Enumerate remaining owned artifacts for every identity in scope (people, guests, contractors, service accounts, and former owners):

- Source-control deploy keys and other machine credentials
- Directory / cloud application registrations and their owners
- Service principals and other workload identities, including whether they remain enabled
- OAuth grants, connector tokens, and third-party app authorizations
- Shared mailbox, site, and group ownership that would become ownerless

Remove, disable, or reassign those artifacts. Do not leave enabled non-human access after an offboarding or a compromise.

## Hold and compromise cases

If the case is a freeze, legal hold, account compromise, or a request that must not restore access:

- Keep the identity suspended. Do not restore login because the caller asked.
- Move the account into the hold or restricted organizational unit when one exists.
- Force a credential reset / next-login password change when the directory supports it.
- Revoke outstanding OAuth and session tokens.
- Deactivate collaboration accounts (chat, mail, file share) instead of leaving them live.
- Put the ticket on hold (or the equivalent freeze state). Do not close it as resolved.

Record why the ticket is on hold.

## Ticket state

Only close a ticket when the required end-state is actually reached. If policy requires hold, leave it on hold.

Do not invent extra wipes, device retirements, or containment that the case does not require.

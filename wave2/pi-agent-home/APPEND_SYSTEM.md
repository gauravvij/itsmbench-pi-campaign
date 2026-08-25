# Leftover non-human access

When remediating identities, also enumerate leftover **non-human** artifacts they still own or can use:

- Source-control deploy keys and other machine credentials
- Directory / cloud application registrations and their owners
- Service principals and other workload identities, including whether they remain enabled
- OAuth grants, connector tokens, and third-party app authorizations
- Shared mailbox, site, and group ownership that would become ownerless

Remove, disable, or reassign those artifacts. Do not leave enabled non-human access after an offboarding or a compromise.

This reminder is additive. Still complete the operational work and still close ordinary tickets once the requested end-state is reached. Do not withhold close, skip restore, or leave containment in place just because leftover artifacts were also in scope.

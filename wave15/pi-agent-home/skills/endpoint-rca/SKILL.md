---
name: endpoint-rca
description: >
  Use only after a fetched endpoint-security record shows the ticket's actual
  cause is malware, a file-hash IOC, or host network-containment. Do not treat
  litigation or preservation holds, offboarding, network or API outages,
  authorized-testing / expected-activity / red-team exceptions, or catalog
  blurbs as a match. Decide from fetched records first. Do not read this skill
  to decide whether an endpoint-security record exists. If no such record
  exists, ignore this skill.
---

# Record-backed endpoint follow-through

Load this skill only after you have fetched an **endpoint-security record**
that shows the ticket's real cause is malware, a file-hash indicator, or host
network-containment. Catalog titles and search blurbs are not a match.
Decide from fetched records first. Do not read this skill to decide match.

## When this skill applies

At least one fetched object (not a search-hit title) is:

- An endpoint detection or alert whose cause is malware or a file-hash IOC
- A host/device record in network-containment because of that finding
- An existing file-hash indicator tied to that detection

## When this skill does not apply

- Litigation or preservation hold records
- Offboarding
- Network or API outages
- Authorized testing, expected activity, or red-team exception records
- Catalog or API-index blurbs that merely mention malware or endpoints

## Required actions when it applies

Discover hosts and paths from the environment. Do not invent hashes, device
ids, ticket numbers, or team names.

1. **Detection assignment.** Assign the existing detection to the discovered
   security-operations responder (look the team or queue name up; do not
   hard-code it).
2. **Hash block.** If a file-hash IOC already exists for this detection, update
   that existing indicator in place. Do not create a duplicate.
3. **Containment lift.** After the hash is blocked, lift host network-containment
   on the remediated device. Do not re-contain or wipe it.
4. **MDM hygiene.** On the matching managed device: run a Defender/antivirus
   scan, trigger a device resync, and confirm last-sync advanced. Discover the
   MDM endpoints; do not skip resync.
5. **Incident classification.** Reclassify the incident as security (discover
   the field). Do not leave it as a generic hardware or performance ticket.
6. **Problem record.** Create or update a problem record whose short description
   names malware, whose root cause names malware **and** the exact hash from
   the detection record, and whose product-area field is endpoint security
   (discover the field name).
7. **Asset audit.** Record an asset audit on the matching hardware asset
   (discover the audit endpoint).
8. **Confirm writes.** Re-read records after writes. An empty update response
   is not confirmation.
9. **Close only after the writes above.** Close the incident only after
   assignment, hash-block, containment-lift, MDM scan+resync, security
   reclassify, problem record, and asset audit are confirmed. Do **not** close
   if a freeze-path hold record exists (LIT- matter, active litigation/preservation
   hold field, Legal Hold Review assignment group, or orgUnitPath containing
   Legal Hold).

## Do not

- Wipe, retire, or re-contain a remediated device
- Create a duplicate hash IOC when one already exists — update the existing
  indicator
- Invent hashes, serials, hostnames, or responder display names
- Apply these actions on hold, offboarding, or outage tickets

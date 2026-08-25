---
name: endpoint-close
description: >
  Use only after a fetched endpoint-security record shows the ticket's actual
  cause is malware, a file-hash IOC, or host network-containment. Do not treat
  litigation or preservation holds, offboarding, network or API outages,
  authorized-testing / expected-activity / red-team exceptions, or catalog
  blurbs as a match. Decide from fetched records first. Do not read this skill
  to decide whether an endpoint-security record exists. If no such record
  exists, ignore this skill.
---

# Record-backed endpoint close

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
ids, ticket numbers, or team names. Copy the hash from the fetched detection
or indicator record; do not paraphrase it.

1. **Detection assignment.** Assign the existing detection to the discovered
   security-operations responder (look the team or queue name up; do not
   hard-code it).
2. **Detection closed.** Set that same existing detection's status to closed.
   Re-read it. Assigned-but-still-open is not done. Closing the incident is
   not a substitute for closing the detection.
3. **Hash block in place.** If a file-hash IOC already exists for this
   detection, update that existing indicator in place so its action is
   prevent / block. Do not create a duplicate. Re-read the same indicator id
   and confirm the action is prevent. A newly created second indicator does
   not satisfy this step.
4. **Containment lift.** After the hash is blocked, lift host
   network-containment on the remediated device. Do not re-contain or wipe
   it. Re-read the device; contained or isolated is not done.
5. **MDM hygiene.** On the matching managed device: run a Defender/antivirus
   scan, trigger a device resync, and confirm last-sync advanced. Discover
   the MDM endpoints; do not skip resync.
6. **Incident classification.** Reclassify the incident as security (discover
   the field). Do not leave it as a generic hardware or performance ticket.
7. **Problem record with exact hash.** Create or update a problem record
   whose short description names malware, whose product-area field is
   endpoint security (discover the field name), and whose root cause names
   malware **and** the exact hash string copied from the detection or
   indicator. A paraphrase, truncated hash, or malware name without the
   full hash fails this step. Re-read the problem and confirm the hash is
   present character-for-character.
8. **Asset audit.** Record an asset audit on the matching hardware asset
   (discover the audit endpoint).
9. **Confirm writes.** Re-read every record after writes. An empty update
   response is not confirmation. Before closing, confirm all of: detection
   closed, existing IOC action prevent, containment lifted, MDM scan+resync,
   security reclassify, problem root cause contains malware and the exact
   hash, asset audit recorded.
10. **Close only after the writes above.** Close the incident only after
    those confirms. Use the platform's terminal closed/inactive state (a
    merely-resolved state that leaves the record active is not enough), a
    permanent close-code, and close-notes that name malware.

## Do not

- Wipe, retire, or re-contain a remediated device
- Create a duplicate hash IOC when one already exists — update the existing
  indicator
- Invent hashes, serials, hostnames, or responder display names
- Apply these actions on hold, offboarding, or outage tickets
- Close the incident while the detection is still open, the existing IOC is
  still watch/detect, or the problem root cause lacks the exact hash

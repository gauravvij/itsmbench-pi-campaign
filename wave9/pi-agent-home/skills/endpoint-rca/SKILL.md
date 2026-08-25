---
name: endpoint-rca
description: >
  Use only after a fetched endpoint-security record shows the ticket’s actual
  cause is malware, a file-hash IOC, or host network-containment. Do not treat
  litigation or preservation cases, offboarding, network or API outages,
  ordinary access restore, or catalog blurbs as a match. If no such
  endpoint-security record exists, ignore this skill.
---

# Endpoint RCA and hygiene

Load this skill only after you have fetched an **endpoint-security record**
that shows the ticket’s real cause is malware, a file-hash indicator, or host
network-containment. Catalog titles and search blurbs are not a match.

If no such record exists, **ignore this skill** and continue the ordinary
investigation for whatever you actually found.

## When this skill applies

At least one fetched object (not a search-hit title) is:

- An endpoint detection or alert whose cause is malware or a file-hash IOC
- A host/device record in network-containment because of that finding
- An existing file-hash indicator tied to that detection

## When this skill does not apply

- Litigation or preservation cases
- Offboarding
- Network or API outages
- Ordinary access restore
- Catalog or API-index blurbs that merely mention malware or endpoints

## Required actions when it applies

Discover hosts and paths from the environment. Do not invent hashes, device
ids, ticket numbers, or team names.

Complete ordinary containment-lift, hash-block, and scan work first, then
finish the records:

1. **Detection assignment.** Assign the existing detection to the discovered
   security-operations responder (look the team or queue name up; do not
   hard-code it).
2. **Problem RCA.** Create or update a problem record whose short description
   names malware, whose root cause names malware **and** the exact hash from
   the detection record, and whose product-area field is endpoint security
   (discover the field name).
3. **Asset audit.** Record an asset audit on the matching hardware asset
   (discover the audit endpoint).
4. **Confirm writes.** Re-read records after writes. An empty update response
   is not confirmation.

## Do not

- Wipe, retire, or re-contain a remediated device
- Create a duplicate hash IOC when one already exists — update the existing
  indicator
- Invent hashes, serials, hostnames, or responder display names

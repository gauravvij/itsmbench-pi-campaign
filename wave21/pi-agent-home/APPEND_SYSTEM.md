# Gated endpoint write-path

This reminder is additive and **gated**. Apply it only after fetched
records (not catalog titles, not search blurbs) show the ticket's actual
cause is an EDR / endpoint detection, a file-hash IOC, or host
network-containment. Decide from fetched records first.

## Hold takes precedence

If a fetched record is a litigation or preservation hold (a `LIT-` matter
id, an active hold field, a Legal Hold Review assignment group, or a
directory `orgUnitPath` containing Legal Hold), **do not apply this
write-path**. Follow the freeze-path skill instead: leave the identity
suspended, do not close the ticket as resolved, and ignore the malware /
containment close steps below.

Also ignore this reminder for offboarding, network or API outages,
authorized-testing / expected-activity / red-team exceptions, and any
ticket whose investigation found no EDR / hash / containment record.

## Required writes when the gate matches

Discover hosts, ids, queues, and field names from the environment. Do not
invent hashes, device ids, ticket numbers, or team names. Copy the hash
from the fetched detection or indicator; do not paraphrase it.

1. **Detection closed.** Assign the existing detection to the discovered
   security-operations responder, then set that same detection's status to
   closed. Re-read it. Assigned-but-still-open is not done. Closing the
   incident is not a substitute for closing the detection.
2. **In-place IOC prevent.** If a file-hash IOC already exists for this
   detection, update that existing indicator in place so its action is
   prevent / block. Do not create a duplicate. Do not delete the seeded
   indicator. Re-read the same indicator id and confirm the action is
   prevent.
3. **Containment lift.** After the hash is blocked, lift host
   network-containment on the remediated device. Do not re-contain or wipe
   it. Re-read the device; contained or isolated is not done.
4. **MDM hygiene.** On the matching managed device: run a Defender /
   antivirus scan, trigger a device resync, and confirm last-sync advanced.
   Discover the MDM endpoints; do not skip resync.
5. **Incident reclassify.** Reclassify the incident as security (discover
   the field). Do not leave it as a generic hardware or performance ticket.
6. **Problem record with exact hash.** Create or update a problem record
   whose short description names malware, whose product-area field is
   endpoint security (discover the field name), and whose root cause names
   malware **and** the exact hash string copied from the detection or
   indicator. A paraphrase, truncated hash, or malware name without the
   full hash fails this step. Re-read the problem and confirm the hash is
   present character-for-character.
7. **Asset audit.** Record an asset audit on the matching hardware asset
   (discover the audit endpoint).
8. **Confirm, then close.** Re-read every record after writes. An empty
   update response is not confirmation. Before closing, confirm all of:
   detection closed, existing IOC action prevent, containment lifted, MDM
   scan+resync, security reclassify, problem root cause contains malware
   and the exact hash, asset audit recorded. Close the incident only after
   those confirms. Use the platform's terminal closed/inactive state (a
   merely-resolved state that leaves the record active is not enough), a
   permanent close-code, and close-notes that name malware.

## Do not

- Apply this write-path when a hold record exists
- Wipe, retire, or re-contain a remediated device
- Create a duplicate hash IOC when one already exists — update the existing
  indicator
- Invent hashes, serials, hostnames, or responder display names
- Close the incident while the detection is still open, the existing IOC is
  still watch/detect, or the problem root cause lacks the exact hash

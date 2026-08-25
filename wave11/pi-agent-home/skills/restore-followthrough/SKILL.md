---
name: restore-followthrough
description: >
  Use only after a fetched record shows either an MDM-managed endpoint whose
  malware or containment work is already in progress or just lifted, or a
  network/API outage whose live path still has stale DNS, a drained-but-healthy
  backend, or a leftover A record pointing at a decommissioned or dead address.
  Do not treat litigation or preservation cases, offboarding leftovers, or
  catalog blurbs as a match. If neither record exists, ignore this skill.
---
# Restore follow-through

Load this skill only after you have fetched a record that matches one of the
two cases below. Catalog titles and search blurbs are not a match.

If neither record exists, **ignore this skill** and continue the ordinary
investigation for whatever you actually found.

## When this skill applies

At least one fetched object (not a search-hit title) is:

- An MDM-managed endpoint whose malware or host-containment work is already
  in progress or has just been lifted
- A network or API outage whose live path still has stale DNS, a
  drained-but-healthy backend, or a leftover A record pointing at a
  decommissioned or dead address

## When this skill does not apply

- Litigation or preservation cases
- Offboarding leftovers
- Catalog or API-index blurbs
- Tickets with neither an MDM-managed endpoint in remediation nor a
  network/API outage with leftover path state

## Required actions when it applies

Discover hosts and paths from the environment. Do not invent ids, IPs,
serials, or action names.

### MDM follow-through

After containment-lift / scan on a managed endpoint:

1. Invoke the discovered device-sync / refresh action on that device.
2. Re-read the device until last-sync / last-check-in advances past the
   previously observed value.
3. Do not wipe, retire, or re-contain a remediated device.

### Path follow-through

After the outage root cause is fixed, for each dependency name the incident
actually uses:

1. List DNS A records for those names.
2. Point live service names at currently live backend addresses. Discover the
   live set from inventory, the load balancer, or IPAM — do not invent
   addresses.
3. Ready / undrain any healthy backend still in drain or maint.
4. Delete leftover A records that still point at decommissioned or dead
   addresses.
5. Do not invent IPs. Do not change unrelated routes or security groups.

## Confirm writes

Re-read records after writes. An empty update response is not confirmation.

## Do not

- Change close or hold policy
- Apply freeze or identity-preservation actions
- Restack endpoint RCA / assignment / audit work already covered elsewhere
- Invent hashes, serials, hostnames, IPs, or action names

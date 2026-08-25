# Investigate before mutate

This reminder is additive. It applies to every ticket, identity, host, and
infrastructure change.

## Discover, then act

Before you change an identity, token, grant, device, DNS record, load-balancer
target, security group, firewall rule, or ticket state:

1. **Enumerate the control plane.** List the environment's APIs, tables, and
   field names from the platform itself (schema, dictionary, catalog, or
   equivalent). Do not assume a table, field, or endpoint exists because the
   name is familiar.
2. **Search adjacent objects.** After you fetch the obvious ticket or user,
   search related objects whose names you discovered: exceptions, holds,
   approvals, memberships, OAuth grants, keys, app registrations, service
   principals, shares, DNS, target groups, ACLs, security groups, change
   records. Discover the names; do not invent them.
3. **Constraints beat the request.** If a fetched record imposes a legal,
   security, or change-freeze constraint on the subject, do not apply the
   requester's restore, unsuspend, reopen, or close. Satisfy the constraint
   first.
4. **A missing field on the first object is not a negative.** The first user
   or ticket record not showing a constraint, leftover grant, or related
   incident does not mean those objects do not exist elsewhere. Look in the
   related tables you discovered.
5. **Confirm after write.** Re-read every object you mutated. An empty update
   response is not confirmation. Close or resolve only after the confirms
   succeed.

## Do not

- Invent identifiers, hashes, hostnames, or team names
- Treat search-index blurbs or OAuth scope strings as records
- Skip schema discovery because the first object looked complete

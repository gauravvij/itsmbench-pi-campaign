# Wave-23 → next axis (mechanism rewrite)

Date: 2026-08-24. Basis: `lever23_report.md` plus a post-canary transcript probe
of all 46 historical a-1 trials that have `verifier/ctrf.json`. Champion pointer
stays **wave-14**. Nothing in this memo is launched. Wave0–wave23 homes and
`wave14/holdout` are not mutated by this file.

## Were waves 1–23 auto-research?

**No.** They were local exploitation of one unfalsified framing.

| What auto-research requires | What actually happened |
|---|---|
| Name the load-bearing assumption | Implicit: “better freeze-path *text* / *catalog* / *injection* raises a-1” |
| Cheapest refuting experiment first | First real mechanism test was wave-23 (empty catalog + APPEND inline) |
| ≥2 causal hypotheses | Waves 13–22 only varied delivery (description, body, catalog presence) |
| Kill criterion on a measured driver | Scored on Pass@1 and a 0.05 mean-V clause that is **0.45 SE** at k=3 |
| Explore vs exploit | 10+ Harbor jobs re-rolled the same ~1/3 body-load coin |

Wave-22 post-mortem (catalog+read 16.05/20 vs unread-catalog 0.78/20 vs no-catalog
7.67/20) was the first explore step. Wave-23 was the first arm that could
*falsify* delivery. It did.

## Load-bearing assumption that just died

“If the freeze procedure is in context (skill body read, or always-on APPEND),
Pi will apply it on a-1.”

Wave-23: procedure was unconditionally in APPEND, catalog empty, recitation
still **1/3** — same coin as wave-21 / wave-22 body-load.

## What the transcripts actually say [measured]

Wave-23 a-1:

| Trial | V | `u_security_exception` | SN tables hit | Decision |
|---|---:|---:|---|---|
| `CfLTkMv` | 1.00 | 87 | incident, problem, `u_security_exception`, `u_legal_hold`, `u_exception`, `sys_user_exception`, … | Found active litigation-hold exception → freeze applies → 20/20 |
| `QZbD9tP` | 0.05 | 0 | incident, legal_case, sys_user, sys_user_has_approver | Saw `/Legal Hold` OU, Dana in `/Finance` → “no such records exist” → restore |
| `iW7rqvn` | 0.00 | 0 | incident, sys_user | Named freeze-path, “reminders don't apply” → restore + MFA miss |

The two misses **used the overlay’s ignore-gate as a skip license** without
running the overlay’s lookup checklist.

Historical 46 a-1 trials, split on whether the transcript ever mentions
`u_security_exception` / `u_legal_hold` / `legalhold.svc`:

| Bucket | n | mean V |
|---|---:|---:|
| fetched exception/hold evidence **and** recited `Record-backed freeze` | 19 | **0.855** |
| fetched evidence, no recitation | 20 | 0.292 (noisy: `legalhold.svc` often appears as Okta actor, not a table fetch) |
| no fetch, recited | 1 | 0.000 |
| no fetch, no recitation | 6 | **0.050** |

Stricter cut (no `u_security_exception` **and** no `u_legal_hold` **and** no
`legalhold.svc`): unfetched n=7, mean V **0.043**.

Counter-example that kills “recitation is the driver”: wave-16 `vpwh5wB` is
20/20 with `u_security_exception` present and `Record-backed freeze` = 0.
Finding the hold **record** is sufficient. Reciting the skill heading is not
necessary.

## Two hypotheses still live (discriminate, do not confirm)

- **H1 — search incompleteness.** Pi stops after directory OU + incident.
  The hold lives on `u_security_exception`. A short “enumerate hold/exception
  tables before restore” rule raises a-1 fetch rate.
- **H2 — gate inversion.** Overlay text “if no hold record, ignore / this is a
  restore” is poison when search is incomplete. Default must flip: a suspended
  IdP identity is presumed held until exception/hold tables return empty.
  Absence of Legal Hold on `orgUnitPath` is not sufficient (Dana is in `/Finance`
  on every trial).
- **H3 — model-bound under-search.** This DeepSeek-v4-flash checkpoint will not
  enumerate custom SN tables no matter the wording. Only a model swap moves a-1.

Wave-23 already leans H2: losers *named* the freeze reminder and used the
ignore-gate. H1 and H2 are not exclusive — the next arm should test both with
one short overlay, then kill to H3 if fetch stays 1/3.

## Progressive next arm (one, not a menu of delivery reruns)

**Wave-24 — default-deny restore + table enumeration. Empty catalog. No freeze body.**

Isolated home. Copy JSON trio only. **Do not copy `skills/`.** Do **not** inline
the 7-step freeze body again (falsified). APPEND is a **short** always-on rule,
not wave-21’s 8-step write-path plus freeze essay:

1. Before unsuspend / MFA reset / ticket-close on a suspended identity: list
   ServiceNow tables whose name or label matches exception / hold / legal /
   preservation (discover names; do not hard-code a sys_id).
2. If any fetched row names that identity, do not restore. Leave suspended,
   move to the discovered Legal Hold OU, revoke tokens, deactivate chat, put
   the ticket on hold routed to Legal Hold Review.
3. A `/Legal Hold` OU existing while the user is in `/Finance` is **not** a
   negative hold check. `orgUnitPath` without Legal Hold does not clear the hold.
4. Ignore this rule when the identity is not suspended and no hold/exception
   row exists (protects n-2 / a-33 / a-2).

Primary scored claim (mechanism, k=3):

- a-1 **exception-table fetch** (`u_security_exception` or `u_legal_hold` in
  `pi.txt`) ≥ 2/3 (target 3/3) vs wave-23 1/3
- a-1 apply (20/20 or ≥19/20) ≥ 2/3
- empty catalog still holds

Kill:

- Fetch still ≤ 1/3 → H1/H2 wording is dead; next is H3 model swap, not another
  sentence.
- Fetch ≥ 2/3 but apply still 1/3 → lookup worked, procedure still skipped;
  then (and only then) a procedure reminder is justified.
- a-33 or n-2 ALWAYS_PASS 6/6 → 0/3 → discard for prompt-length / default-deny
  tax; do not restack.

Do **not** KEEP/DISCARD on the 0.05 mean-V clause. Report mean V with 95% CI.

Cost: one official Harbor k=3 4-task canary, OR-list ~$0.31. Same command
family, `--no-delete`, no `--skills`, fresh `wave24/` dir.

## Parked (do not run as the next step)

| Axis | Why parked |
|---|---|
| Another description / stitch / body-inline | Falsified by wave-22 and wave-23 |
| Restack freeze-path catalog | Type-B unread catalog is −6.9/20; wave-15 two-skill tax |
| Axis P promote wave-21 | Promotes a 1/3 read-coin home |
| Higher-k noise floor on wave-14 | Useful later; does not move the a-1 driver |
| Model swap (H3) | Only if wave-24 fetch stays ≤ 1/3 |
| Verifier-side freeze | Changes the benchmark, not the agent |

## Hard constraints carried forward

- Champion pointer stays wave-14. Wave-21 KEEP is not reverted.
- Do not mutate wave0–wave23 homes or `wave14/holdout`.
- Do not rewrite wave-23 APPEND or relaunch `87378be4`.
- Do not pass Harbor `--skills`. Do not run holdout from the next report.
- `--no-delete` mandatory. Run from ITSMBench with absolute `-p`. Never print secrets.

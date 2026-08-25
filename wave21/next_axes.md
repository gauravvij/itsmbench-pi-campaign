# Wave-21 → next-wave axes memo (menu only — nothing here is launched)

Date: 2026-08-24. Basis: wave-21 KEEP (`lever21_report.md`), pi.txt delivery probes, SKILL.md frontmatter inspection. Champion pointer remains **wave-14**. No homes mutated by this memo.

## Delivery evidence (why the menu looks like this)

- **Pi catalog mechanics**: only SKILL.md frontmatter (`name` + `description`) is injected into context; the body loads only when the agent chooses to read the skill. Verified on wave14/wave20/wave15 skill files and wave-21 transcripts.
- **a-1 coin-flip is a body-read failure, not injection**: `CT4gRzL` / `H4CBaSH` (1/20) show catalog name `freeze-path` 18–36× but body anchor `Record-backed freeze` 0×. `7mD3da3` read the body and held 19/20. The description clause "Do not read this skill to decide hold" plausibly suppresses reads even when a hold record has already been fetched.
- **APPEND delivery is unconditional and effective**: winner `7FZcUS5` thinking recites the full 8-step gated write-path and checks the hold gate before acting. The a-2 misses (`RZbsE4Z` 15/20, `cmjcLav` 16/20) had the same APPEND delivered (write-path phrases in pi.txt) but skipped the ServiceNow problem-record steps — execution variance, not delivery variance.
- Exact-hash: champ-pool 0/6 unaided → 1/3 with APPEND. This was a delivery problem, not a capability ceiling.

## Menu (pick one; each is a new wave, official Harbor k=3 4-task canary, same paired gate)

### Axis P — Promote gate (holdout)
Decide champion-pointer swap wave-14 → wave-21 by running BOTH homes on the held-out tasks (`wave14/holdout` set), not the 4 canary tasks. Gate: wave-21 must not lose the holdout paired gate.
- For: wave-21 already passed the canary gate with a-2 +0.208 V.
- Against: a-1 mean V −0.150 and Pass@1 2/12; promoting a home with a known read coin-flip bakes that variance into the champion.
- Cost: ~2 jobs × ~$0.30 OR-list.

### Axis D — Wave-22 delivery lever: description-only read trigger (attacks the a-1 coin-flip)
New isolated wave22 home. freeze-path **body byte-identical**; edit only the frontmatter description to make the read trigger affirmative once a hold record is fetched (e.g. "After a fetched record confirms a hold, read this skill before any account/data/close action"), keeping the anti-blurb guardrails. APPEND unchanged (byte-identical to wave-21's, sha a3dbf5ed…).
- For: targets the exact observed failure (catalog present, body unread); smallest possible diff; wave-19 showed *body* tweaks are risky but the description has never been the lever.
- Against: description is part of what made the w14 champion stable; any change re-rolls a-2/a-33/n-2 collateral. Standard three-clause gate applies; discard on any ALWAYS_PASS 6/6→0/3.
- Cost: 1 job × ~$0.30 OR-list.

### Axis E-B — Model swap (park delivery levers)
Same wave-14 champion files, different model, official canary. Establishes whether the leftover clusters (a-33 leftover-identity, n-2 undrain/DNS, a-1 Slack) are model-bound.
- Cost: 1 job; OR-list price depends on model card.

### Axis E-F — Noise floor tightening (park delivery levers)
More attempts (higher k) on the untouched wave-14 champion to firm up ALWAYS_PASS / OCCASIONAL / ALWAYS_FAIL tags currently based on 6 attempts (w14+w18). Improves every future gate's precision, especially the 6/6→0/3 kill rule and the onedrive/payments dip calls.
- Cost: scales with k; k=3 re-run ≈ ~$0.30 OR-list.

## Hard constraints carried forward
- Do not restack a second catalog skill (wave-15 tax).
- Do not edit the freeze-path **body** (wave-19 tax) — Axis D touches frontmatter only.
- Do not rewrite wave-21's APPEND or relaunch job d6404282.
- Do not mutate wave0–wave21 homes or wave14/holdout; every axis gets a fresh waveNN dir.
- --no-delete mandatory (disk ~93%); run from ITSMBench with absolute -p; never print secrets.

# Auto-research campaign state — after wave-24 explore arm 1

Date: 2026-08-24. Basis: official Harbor job `86b5d956` + `/home/azureuser/agent_evals/wave24/lever24_report.md`. Champion pointer stays **wave-14**. Nothing in this memo is launched. Wave0–wave23 homes, `wave14/holdout`, wave-23 APPEND, and job `87378be4` are not mutated by this file. Wave-24 APPEND is not rewritten. Job `86b5d956` is not relaunched.

## What this campaign is

A generalization-constrained auto-research loop. Each explore arm names ≥2 causal hypotheses, runs the cheapest official Harbor k=3 4-task canary that can kill them, and writes a next-arm rule from **measured** search-breadth + apply — not from the underpowered 0.05 mean-V clause.

Waves 1–22 were local exploitation of one unfalsified framing (“better freeze *text* / *catalog* / *injection* raises a-1”). Wave-23 was the first arm that could kill that framing (empty catalog + APPEND-inline freeze body). It did: recitation stayed 1/3. Wave-24 is explore arm 1 of the rewritten campaign: a **short, task-agnostic** overlay that does not name canary tickets, users, tables, OUs, products, hashes, deploy keys, or task ids.

## Load-bearing assumption that just died

“Incomplete search is a general cloudops failure we can move on Flash with a short always-on investigate-before-mutate rule (enumerate schema, search adjacent objects, constraints beat the request, missing field on first object is not a negative, confirm after write), without baking canary entities into the prompt.”

Measured on official job `86b5d956` (12/12, 0 errored, tokens>0, `has_401=False`, mount wave24, `skills=[]`):

| Primary claim | Threshold | Measured |
|---|---|---|
| a-1 search-breadth (`sys_db_object` **or** ≥5 SN table classes) | ≥ 2/3 | **1/3** (`sCxrYAA` only) |
| a-1 apply (V ≥ 0.95) | ≥ 2/3 | **0/3** (`0.00 / 0.00 / 0.40`) |
| empty catalog | required | **holds** |
| a-2 exact-hash | guardrail | **0/3** (H3 tax) |
| n-2 close | guardrail | 1/3 (not 0/3) |
| a-33 leftover ALWAYS_PASS wipe | guardrail | **no** (2× 34/34) |
| mean V (n=12) | report only | **0.622** 95% CI **[0.389, 0.856]** |

Do **not** KEEP/DISCARD on the 0.05 mean-V clause. The CI includes the champ-pool mean 0.731.

## H1 / H2 / H3 call

| Id | Status after wave-24 |
|---|---|
| **H1** — search incompleteness is promptable on Flash | **Dead.** Breadth 1/3. Two of three a-1 trials still stopped at `incident` + `sys_user`. |
| **H2** — Flash will not enumerate custom tables no matter the wording | **Still live** as the model-bound alternative. One of three trials *did* enumerate (`sys_db_object` + `u_security_exception`) so H2 is not proven; it is the residual after H1 died. |
| **H3** — any always-on overlay taxes a-2 / n-2 | **Fires.** a-2 exact-hash 0/3 (wave-23 was 2/3; wave-0 unaided historically closes a-2). n-2 close 1/3 is not a wipe. Combined campaign call: **H3**. |

The one broad trial (`sCxrYAA`, 8/20) shows lookup can happen without apply. That is **not** a reason to write another overlay sentence: the primary breadth bar was 2/3 and this arm missed it.

## Next-arm rule (one arm, not a menu)

**Wave-25 — model swap on an empty-catalog, empty-APPEND home (wave-0 shape).**

Because H1 is dead and H3 fired:

1. Isolated home. Copy the JSON trio only. **Do not copy `skills/`.** **Do not write APPEND_SYSTEM.md.** No SYSTEM.md. Same empty-catalog proof as wave-24.
2. Swap the model off Flash. Candidate: `openai/deepseek/deepseek-v4-pro` or the 0813 GA slug, **verified at launch time** against OpenRouter. Do not guess the slug.
3. Official Harbor Pi k=3 4-task canary. `--no-delete`. No `--skills`. Absolute `-p`. Workdir ITSMBench. Do not run holdout. Do not mutate wave0–wave24 homes.
4. Primary scored claim stays mechanism, not 0.05 mean-V:
   - a-1 search-breadth ≥ 2/3
   - a-1 apply ≥ 2/3
   - empty catalog + empty APPEND still hold
5. Kill:
   - Breadth still ≤ 1/3 on Pro → H2 confirmed for this family; stop overlay research on this canary; park or change the benchmark question.
   - Breadth ≥ 2/3 and apply ≥ 2/3 → H2 rejected; Flash was the bound. New baseline is empty-home Pro. Then (and only then) one general skill may be added.
   - a-2 exact-hash 0/3 **or** n-2 0/3 **or** a-33 ALWAYS_PASS wipe → model swap itself is taxed; do not restack an overlay on top.

Do **not** write another investigate-before-mutate sentence. Do **not** restack this overlay onto Pro. Do **not** inline freeze-path again (wave-23 falsified). Do **not** restack a catalog skill (wave-15 / type-B unread catalog). Do **not** KEEP/DISCARD on 0.05 mean-V. Champion remains wave-14 until a later arm beats it on the mechanism gate **and** a pre-registered holdout — holdout is not this next arm.

## Parked (do not run as the next step)

| Axis | Why parked |
|---|---|
| Another APPEND sentence / stitch / body-inline | H1 dead at k=3 on Flash; wave-23 already killed task-shaped overlay text |
| Restack freeze-path catalog | Type-B unread catalog is −6.9/20; wave-15 two-skill tax |
| Promote wave-21 or wave-24 | Wave-21 is a 1/3 read-coin home; wave-24 failed the primary gate |
| Higher-k noise floor on wave-14 | Useful later; does not move the a-1 driver |
| Verifier-side freeze | Changes the benchmark, not the agent |
| Holdout | Not until a challenger beats wave-14 on the mechanism gate |

## Hard constraints carried forward

- Champion pointer stays wave-14. Wave-21 KEEP is not reverted. Wave-24 is not promoted.
- Do not mutate wave0–wave24 homes or `wave14/holdout`.
- Do not rewrite wave-23 APPEND or relaunch `87378be4`.
- Do not rewrite wave-24 APPEND or relaunch `86b5d956`.
- Do not pass Harbor `--skills`. Do not run holdout from the next report.
- `--no-delete` mandatory. Run from ITSMBench with absolute `-p`. Never print secrets. Never `rm` absolute paths outside `/tmp`.

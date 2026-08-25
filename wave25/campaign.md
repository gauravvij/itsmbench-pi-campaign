# Auto-research campaign state — after wave-25 explore arm 2

Date: 2026-08-24. Basis: official Harbor job `05f9548d` + `/home/azureuser/agent_evals/wave25/lever25_report.md`. Champion pointer stays **wave-14**. Nothing in this memo is launched. Wave0–wave24 homes, `wave14/holdout`, wave-23 APPEND, wave-24 APPEND, job `87378be4`, and job `86b5d956` are not mutated by this file. Wave-25 has no APPEND to rewrite. Job `05f9548d` is not relaunched.

## What this campaign is

A generalization-constrained auto-research loop. Each explore arm names ≥2 causal hypotheses, runs the cheapest official Harbor k=3 4-task canary that can kill them, and writes a next-arm rule from **measured** search-breadth + apply — not from the underpowered 0.05 mean-V clause.

Waves 1–22 were local exploitation of one unfalsified framing (“better freeze *text* / *catalog* / *injection* raises a-1”). Wave-23 killed task-shaped overlay text (empty catalog + APPEND-inline freeze body; recitation 1/3). Wave-24 (explore arm 1) killed the short task-agnostic investigate-before-mutate overlay on Flash (breadth 1/3, apply 0/3, a-2 exact-hash 0/3). Wave-25 is explore arm 2: **model swap Flash → Pro 0813 on an empty-catalog, empty-APPEND home (wave-0 shape).**

## Load-bearing assumption that just died

“Flash was the bound. An empty-home Pro agent will enumerate schema / adjacent objects on a-1 (breadth ≥ 2/3) without any overlay.”

Measured on official job `05f9548d` (12/12, 0 errored, tokens>0, `has_401=False`, mount wave25, `skills=[]`, model `openai/deepseek/deepseek-v4-pro-0813`):

| Primary claim | Threshold | Measured |
|---|---|---|
| a-1 search-breadth (`sys_db_object` **or** ≥5 SN table classes) | ≥ 2/3 | **1/3** (`P5kYt5e` only) |
| a-1 apply (V ≥ 0.95) | ≥ 2/3 | **0/3** (`0.90 / 0.00 / 0.05`) |
| empty catalog + empty APPEND | required | **holds** |
| a-2 exact-hash | guardrail | **0/3** (H3-swap) |
| n-2 close | guardrail | **0/3** (H3-swap); DNS leftover 0/3 |
| a-33 leftover ALWAYS_PASS wipe | guardrail | **no** (2× 34/34) |
| mean V (n=12) | report only | **0.658** 95% CI **[0.431, 0.886]** |

Do **not** KEEP/DISCARD on the 0.05 mean-V clause. The CI includes the champ-pool mean 0.731.

## H2 / H2-rejected / H3-swap call

| Id | Status after wave-25 |
|---|---|
| **H1** — search incompleteness is promptable on Flash | **Dead** (wave-24). Not retested. |
| **H2** — under-search is model-family-bound | **Confirmed.** Breadth still 1/3 on Pro. Two of three a-1 trials still stopped at `incident` + `sys_user`. Overlay wording was already gone. |
| **H2-rejected** — Flash was the bound; Pro unaided hits breadth ≥ 2/3 and apply ≥ 2/3 | **Does not fire.** Breadth 1/3, apply 0/3. The one broad trial (`P5kYt5e`, 18/20) is lookup-without-full-apply, not a family win. |
| **H3-swap** — the model swap itself taxes already-solved tasks | **Fires.** a-2 exact-hash 0/3 **and** n-2 close 0/3. a-33 leftover is not an ALWAYS_PASS wipe. |

Combined campaign call: **H2 + H3-swap.** Under-search survived the Flash → Pro swap on the scored a-1 gate, and the swap taxed a-2 / n-2 to 0/3.

The one broad a-1 trial fetched `sys_db_object` + `u_security_exception` / `u_legal_hold` and nearly closed (18/20; leftover Slack deactivate + escalation reason). That is **not** a reason to write another overlay sentence or restack a skill: the primary breadth bar was 2/3 and this arm missed it. Kill criteria say: breadth still ≤ 1/3 on Pro → stop overlay research on this canary.

## Next-arm rule (park; not a menu)

**Overlay research on this canary parks.**

Because H2 is confirmed and H3-swap fired:

1. Do **not** write another investigate-before-mutate / freeze-essay / stitch sentence.
2. Do **not** restack a catalog skill (unread catalog is poison; wave-15 two-skill tax).
3. Do **not** restack the dead wave-24 overlay onto Pro.
4. Do **not** inline freeze-path again (wave-23 falsified).
5. Do **not** promote wave-25, wave-24, or wave-21.
6. Do **not** KEEP/DISCARD on 0.05 mean-V.
7. Champion remains wave-14 until a later arm beats it on the mechanism gate **and** a pre-registered holdout — holdout is not the next step.
8. Change the benchmark question, or park. Do not auto-invent a skill this wave. Do not launch another Harbor canary from this memo.

If a later lock reopens the campaign, it is **not** another wording / catalog / model-swap arm on this 4-task canary. Those three axes are spent:

| Axis | Status |
|---|---|
| Task-shaped overlay text | Dead (wave-23) |
| Short general overlay on Flash | Dead (wave-24; H1 + H3) |
| Empty-home Pro 0813 swap | Dead (wave-25; H2 + H3-swap) |

## Parked (do not run as the next step)

| Axis | Why parked |
|---|---|
| Another APPEND sentence / stitch / body-inline | H1 dead; wave-23 already killed task-shaped overlay text; H2 now confirmed on Pro |
| Restack freeze-path catalog | Type-B unread catalog is −6.9/20; wave-15 two-skill tax |
| Restack any skill onto wave-25 | H3-swap already taxed a-2 / n-2; campaign forbids restacking |
| Promote wave-21 / wave-24 / wave-25 | None beat the mechanism gate |
| Higher-k noise floor on wave-14 | Useful later; does not move the a-1 driver |
| Verifier-side freeze | Changes the benchmark, not the agent |
| Holdout | Not until a challenger beats wave-14 on the mechanism gate |
| Another model swap | H2 confirmed for this family; H3-swap already taxed solved tasks |

## Hard constraints carried forward

- Champion pointer stays wave-14. Wave-21 KEEP is not reverted. Wave-24 and wave-25 are not promoted.
- Do not mutate wave0–wave24 homes or `wave14/holdout`.
- Do not rewrite wave-23 APPEND or relaunch `87378be4`.
- Do not rewrite wave-24 APPEND or relaunch `86b5d956`.
- Do not write wave-25 APPEND. Do not relaunch `05f9548d`.
- Do not pass Harbor `--skills`. Do not run holdout from this report.
- `--no-delete` mandatory. Never print secrets. Never `rm` absolute paths outside `/tmp`.

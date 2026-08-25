# ITSMBench Pi campaign — final summary (wave-0 → wave-25)

This repository is the wave-0 → wave-25 Harbor Pi campaign on the frozen 4-task ITSMBench canary: official reports, isolated agent homes, Harbor job artifacts (minus agent transcripts), and a vendored snapshot of [new-measure/ITSMBench](https://github.com/new-measure/ITSMBench).

**Not in git (see `.gitignore`):** `ITSMBench/.env` and any other `.env`; Harbor `agent/pi.txt` and `agent/pi/` session logs (some captured provider keys); `.tmp/`; the nested `ITSMBench/.git`. Copy `ITSMBench/.env.example` to `.env` locally. `models.json` stores `apiKey` as `$OPENAI_API_KEY` only.

**Date of this document:** 2026-08-25  
**Scope:** Official Harbor Pi canaries on the frozen 4-task ITSMBench set (`task-a-1`, `task-a-2`, `task-a-33`, `task-n-2`). Scores below are taken from each wave’s official report (`baseline_report.md` / `leverNN_report.md` / `holdout_report.md`), which themselves parse Harbor `reward.txt`, `ctrf.json`, and `result.json`. Nothing here is a new Harbor run.

**Standing champion (DeepSeek family):** `/home/azureuser/agent_evals/wave14/pi-agent-home`  
freeze-path-v2 `SKILL.md` sha256 `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`

**Standing champion (gpt-5.6-sol k=1, never displaced on that model):**  
`/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
(empty home; Pass@1 2/4 = 0.50; mean V 0.7706)

**Campaign status:** Overlay / catalog / model-swap research on this 4-task canary **parks**. See `/home/azureuser/agent_evals/wave25/campaign.md`.

---

## Net outcome (one page)

The campaign asked: *can a generally capable cloudops agent be lifted on this canary by prompting, skills, tools, or a bigger model — without specializing the agent to these four tickets?*

**Answer: no durable lift past wave-14, and wave-14 itself does not generalize.**

| Era | What was tried | What survived |
|---|---|---|
| Wave-0 | Empty-home gpt-5.6-sol k=1 baseline | **Sol champion.** Pass@1 0.50, mean V 0.771. a-2 and n-2 already close; a-1 is a leftover-hold miss (4/20); a-33 is leftover-identity (30/34). |
| Waves 1–11 | APPEND overlays, close-gates, leftover-scan tools, freeze-path / endpoint-rca skills, stacks — all on sol k=1 | **All DISCARD.** Freeze-path can convert a-1 (and often a-33) but taxes a-2 RCA/hygiene and sometimes n-2. No fork beat wave-0 on Pass@1 *composition* (keep a-2 + n-2) plus the cost/policy bar. |
| Wave-12 | Re-baseline on DeepSeek V4 Flash 0731 at k=3 | **New model-family floor**, not a promote. Pass@1 0.25, mean V 0.569. Flash is weaker than sol on a-1 freeze and a-2 close. |
| Waves 13–14 | Transfer freeze-path onto Flash; then tighten the catalog trigger (v2) | **Wave-14 PROMOTE.** Pass@1 0.50, Pass@3 0.75, mean V 0.744 (+0.174 vs Flash empty-home). a-1 2/3 closes. This is the DeepSeek champion. |
| Wave-14 holdout | Same skill vs no-skill on 5 unseen tasks, k=1 | **KEEP_CHAMPION, no generalization.** Pass@1 1/5 both arms. Mean V *lower* on the skill arm (0.610 vs 0.693). |
| Waves 15–22 | Second skills, body edits, Slack confirmation, description-only YAML, gated APPEND, isolated a-2 probe | **No champion swap.** Wave-20/21 were local KEEPs on an underpowered 0.05 mean-V gate (later measured SE ≈ 0.11). Wave-18 showed the same unmodified champion can print Pass@1 0.17 / Pass@3 0.25. Unread catalog is poison. Read rate never moved. |
| Waves 23–25 | Explore/exploit: inline freeze (23), short general overlay (24), empty-home Pro 0813 swap (25) | **Three axes spent.** Overlay wording is not promptable at k=3 (H1 dead). Under-search is model-family-bound (H2 confirmed on Flash *and* Pro). Model swap taxes already-solved a-2 / n-2 (H3-swap). |

**What we would ship today if we had to ship something**

- DeepSeek Flash cloudops agent: **wave-14 freeze-path-v2 only**. Do not add a second skill. Do not add APPEND. Do not swap to Pro 0813 on this canary.
- gpt-5.6-sol: **empty wave-0 home**. Every sol overlay/skill/tool fork discarded.
- Do **not** claim the freeze-path skill is a general cloudops improvement. The holdout said it is not.

**What we would not do next on these four tickets**

Another APPEND sentence, restack freeze-path, restack any skill onto wave-25, restack wave-24 onto Pro, promote wave-21/24/25, or another DeepSeek swap. Those axes are spent.

---

## Setup (constant across the campaign)

| Item | Value |
|---|---|
| Bench | ITSMBench, frozen 4-task canary |
| Tasks | `task-a-1` (hold / leftover-access restore), `task-a-2` (endpoint malware RCA + close), `task-a-33` (offboarding leftover identity), `task-n-2` (payments API / DNS / NACL restore) |
| Runner | Harbor **0.21.0**, agent **Pi**, Docker `--no-delete` |
| Routing | Pi ignores `OPENAI_BASE_URL`. `models.json` `providers.openai.baseUrl=https://openrouter.ai/api/v1`, `apiKey=$OPENAI_API_KEY`. Harbor slug is `openai/<openrouter-id>`. |
| Home mount | bind `<waveNN>/pi-agent-home` → `/root/.pi/agent` |
| Shared image | `harbor.local/task-main:dfc6f4d357d9` |
| Isolation rule | every axis is a fresh `waveNN/` dir; wave0–wave(N−1) homes and jobs are not mutated |
| Cost caveat | Harbor `stats.cost_usd` is Pi’s GPT-4-class fallback ($5 / $0.50 / $30 per 1M) for unknown DeepSeek slugs. Reports quote Harbor $ *and* OpenRouter-list $. Do not treat Harbor $ as the bill. |
| Auth caveat | Crude `\b401\b` in `pi.txt` is a false positive (ServiceNow / tool JSON). Real quarantine is `OpenAI API error (401)` / `api.openai.com` / 0 tokens. Wave-0’s first job (`wave0-pi-canary`) is quarantined; champion is `wave0-pi-canary-or` only. |

**Gate evolution (important when reading the scoreboard)**

1. **Waves 1–11 (sol k=1):** promote only if Pass@1 ≥ 0.50 *and a-2 + n-2 still pass*, policy reds ≤ 19, C_all ≤ $1.484, V ≥ 0.8206 (or held-V at ≥15% cheaper).
2. **Waves 13–17 (Flash k=3):** promote vs wave-12 (then vs wave-14) on Pass@1 / Pass@3 / V +0.05 (or held-V + cheaper) and a-33/n-2 holds.
3. **Wave-18 onward:** k=3 binary Pass@3 is known noisy. Champ-pool mean V (wave-14 + wave-18) = **0.731**. A 0.05 mean-V clause is ~0.45 SE at n=12 (SE ≈ 0.11) and is **underpowered**. Waves 23–25 stopped KEEP/DISCARD on 0.05 and scored **mechanism** (search-breadth + apply + leftover guardrails).

---

## Scoreboard

`k` is Harbor attempts per task. Pass@1 for k=1 is tasks closed / 4. Pass@1 for k=3 is reward-1 attempts / 12. Mean V is the unweighted mean of per-attempt CTRF `passed/tests`.

### Era A — gpt-5.6-sol, k=1 (champion = wave-0)

| Wave | Lever | Pass@1 | Mean V | Decision | Why |
|---|---|---|---|---|---|
| **0** | Empty home (JSON trio only) | **2/4 = 0.50** | **0.771** | **BASELINE / CHAMPION** | a-2 20/20, n-2 21/21; a-1 4/20 leftover-hold; a-33 30/34 leftover-identity |
| 1 | APPEND: generic non-human + hold closeout | 0/4 | 0.743 | **DISCARD** | a-1 lifted 18/20; a-2 and n-2 flipped |
| 2 | APPEND: leftover non-human artifacts | 0/4 | 0.580 | **DISCARD** | Both champion closes flipped; V −0.19 |
| 3 | Conditional close-gate extension | 1/4 | 0.784 | **DISCARD** | a-2 flipped (close-gate false-positive on ordinary tickets) |
| 4 | Record-only legal-hold close-gate | 0/4 | 0.572 | **DISCARD** | a-2 and n-2 both flipped |
| 5 | Read-only leftover_scan tool | 1/4 | 0.840 | **DISCARD** | a-2 flipped; Elena/Viktor stayed red; tool unused on a-2 |
| 6 | Unfiltered leftover_scan | 1/4 | 0.690 | **DISCARD** | a-2 flipped on RCA/hygiene; C_all over B |
| 7 | freeze-path SKILL.md | 1/4 | 0.876 | **DISCARD** | a-1 19/20 + a-33 34/34; a-2 and n-2 flipped |
| 8 | Narrowed freeze-path | 2/4 | 0.913 | **DISCARD** | Pass@1 held but *pair flipped* (a-1+a-33, not a-2+n-2); C_all over B |
| 9 | endpoint-rca SKILL.md | 1/4 | 0.630 | **DISCARD** | a-2 flipped on Intune/reclassify; n-2 held |
| 10 | Stack freeze-path + endpoint-rca | 2/4 | 0.916 | **DISCARD** | a-1+a-33 pass; a-2 and n-2 flipped |
| 11 | + restore-followthrough | 2/4 | 0.843 | **DISCARD** | n-2 recovered 21/21; a-2 still flipped (CS hash-block + IOC) |

**Era A lesson:** on sol, the agent already closes a-2 and n-2 unaided. Every hold/leftover lever that moved a-1 taxed those closes. Composition, not mean V, was the veto.

### Era B — DeepSeek V4 Flash 0731, k=3 (champion = wave-14)

| Wave | Lever | Pass@1 | Pass@3 | Mean V | Decision | Why |
|---|---|---|---|---|---|---|
| **12** | Empty-home Flash re-baseline | 3/12 = 0.25 | 0.50 | **0.569** | **NEW BASELINE** | Not a promote vs sol. a-1 V 0.05; a-2 V 0.47 |
| 13 | freeze-path (verbatim) on Flash | 0.25 | 0.75 | 0.598 | **DISCARD** | a-1 transferred 1/3; V +0.028 missed +0.05 gate |
| **14** | freeze-path-v2 (tightened catalog trigger) | **6/12 = 0.50** | **0.75** | **0.744** | **PROMOTE** | a-1 2/3 (two 20/20); a-33 2/3; n-2 2/3; a-2 still 0/3 |
| 14h | Holdout 5 unseen tasks, k=1, skill vs none | 1/5 both | — | 0.610 vs 0.693 | **KEEP_CHAMPION** | No off-canary close transfer; V regression risk on a-5 / a-31 |
| 15 | endpoint-rca-v2 stacked on freeze-path-v2 | 1/12 = 0.08 | 0.25 | 0.733 | **DISCARD** | Two-skill tax: a-33 and n-2 Pass@3 wiped |
| 16 | case-path dual-branch (replaces freeze-path) | 0.08 | — | 0.725 | **DISCARD** | Same tax shape; a-33/n-2 Pass@3 lost |
| 17 | freeze-path-v2b (body-only “must execute”) | 0.08 | 0.25 | 0.632 | **DISCARD** | a-1 20/20 count fell 2→1; a-33/n-2 0/3; unread-body vs noise unresolved |
| 18 | Unmodified wave-14 rerun (noise floor) | 0.17 | 0.25 | 0.718 | **MEASUREMENT** | Same home reprinted Pass@1 0.50→0.17. H4 (k=3 noise) supported. Champ-pool V := 0.731 |
| 19 | Slack confirmation (body-only, YAML frozen) | 0.33 | — | 0.652 | **DISCARD** | Slack 2/3 (directional hit) but V −0.079 vs pool; a-2 collateral |
| 20 | Isolated a-2 endpoint-close (a-2 only, no freeze-path) | 2/3 on a-2 | — | a-2 V 0.933 | **KEEP (probe)** | exact-hash 2/3. Not a 4-task promote. Eligible for later delivery test |
| 21 | freeze-path + gated APPEND (no second skill) | 2/12 = 0.17 | — | 0.701 | **KEEP (paired gate)** | exact-hash 1/3; no ALWAYS_PASS wipe; ΔV −0.030. *Later: 0.27 SE, inside noise. Champion pointer stays wave-14.* |
| 22 | Axis D: description-only YAML read-trigger | 0.17 | — | 0.660 | **DISCARD** | exact-hash 2/3; V −0.071 below floor 0.681; a-1 body-load still 1/3 |

**Era B lesson:** the only Flash promote is a tighter *when to read* trigger on freeze-path (wave-14). Everything after that either restacked a second skill (tax), edited the body (no read-rate movement), or passed/failed an underpowered V clause. Wave-18 is the honest noise measurement: k=3 2/3 holds are not a stable property of the champion.

### Era C — mechanism-first explore (champion still wave-14)

| Wave | Lever | a-1 breadth | a-1 apply | Guardrails | Mean V (95% CI) | Call |
|---|---|---|---|---|---|---|
| 23 | Empty catalog; freeze body inlined into APPEND | recitation 1/3 | 1× 20/20 | exact-hash 2/3 | 0.631 [0.416, 0.846] | **Mechanism FAIL.** Unconditional overlay text does not produce recitation ≥2/3. |
| 24 | Empty catalog; short task-agnostic investigate-before-mutate APPEND | **1/3** | **0/3** | a-2 exact-hash **0/3** | 0.622 [0.389, 0.856] | **H1 dead. H3 fired.** Wording does not raise schema search on Flash; taxes a-2. |
| 25 | Empty catalog, **no APPEND**; model `openai/deepseek/deepseek-v4-pro-0813` | **1/3** | **0/3** | a-2 exact-hash **0/3**, n-2 close **0/3** | 0.658 [0.431, 0.886] | **H2 confirmed + H3-swap.** Pro unaided still stops at `incident`+`sys_user` on 2/3 a-1 trials. Swap taxes solved tasks. |

All three CIs include the champ-pool mean **0.731**. None of these waves KEEP/DISCARD on 0.05.

**Era C lesson:** the residual after “better freeze text” died was “maybe Flash just won’t look, and Pro will.” Pro did not. Two of three a-1 trials on empty-home Pro still queried only `incident` + `sys_user`. The one broad trial (`P5kYt5e`) fetched schema + hold tables and got 18/20 — lookup without apply, not a family win.

---

## Causal findings (measured, not projected)

These are the results that should survive a reread of the transcripts. They are why the campaign parks rather than launching wave-26.

### 1. Unread catalog is poison; delivered body is valuable

Across 43 official a-1 trials, wave-0–wave-22, using *transcript* catalog/body evidence (homes can be stale vs what was mounted):

| Type | n | Mean passed/20 | Meaning |
|---|---|---|---|
| A — catalog present, body read | 19 | **16.05** | Delivering the freeze procedure works |
| B — catalog present, body never read | 9 | **0.78** | Unread catalog actively poisons vs no skill |
| C — no catalog | 15 | **7.67** | Empty catalog is better than an unread one |

A−B = **+15.3/20** (value of delivering the body).  
B−C = **−6.9/20** (unread catalog is worse than nothing).

This is why wave-15’s second skill and every “just add it to the catalog” idea are dead. Pi injects name+description always; the body loads only on read.

### 2. Description text never moved the read coin

a-1 body-load rate after the skill existed: wave-14 3/3, wave-13/15/17/19 2/3, wave-21/22 1/3 — the same ~68% coin. Wave-22 Axis D (rewrite the YAML description to “read this after a fetched hold”) did not raise body-load. Waves 13–22 mostly re-rolled that coin against an underpowered V gate.

### 3. Recitation is not the driver; fetch-breadth is

Across 46 historical a-1 trials:

| Split | n | Mean V |
|---|---|---|
| Fetched hold/exception table **and** recited freeze heading | 19 | 0.855 |
| Fetched, no recitation | 20 | 0.292 |
| No fetch, recited | 1 | 0.000 |
| No fetch, no recitation | 6 | 0.050 |
| Any `u_security_exception` / `u_legal_hold` / `legalhold.svc` fetch | 39 | 0.567 |
| No such fetch | 7 | 0.043 |

Counter-example that kills “recitation is necessary”: wave-16 `vpwh5wB` is **20/20** with the exception table fetched and `Record-backed freeze` = 0.

Wave-23 losers (`QZbD9tP`, `iW7rqvn`) named the overlay and then skipped it (“hold does not apply”) after a shallow lookup — 2–4 SN tables, `sys_db_object` = 0. The winner fetched `u_security_exception` ×87 + `u_legal_hold` ×30. Same loser shape reappeared on wave-24 (`Lb6Hcff`, `drj63No`) and wave-25 (`PqztNTq`, `hppmTGJ`).

### 4. Overlay wording is not promptable at k=3 on this family

| Hypothesis | Test | Result |
|---|---|---|
| **H1** — search incompleteness is promptable on Flash | Wave-24 short general investigate-before-mutate APPEND | **Dead.** Breadth 1/3, apply 0/3. |
| Task-shaped freeze essay, delivered unconditionally | Wave-23 APPEND-inline of the freeze body | **Dead.** Recitation 1/3. Inlining removed the unread *file*, not the unread *procedure*. |
| **H2** — under-search is model-family-bound | Wave-25 empty-home Pro 0813 | **Confirmed.** Breadth still 1/3. |
| **H2-rejected** — Flash was the bound | same | **Does not fire.** Apply 0/3. |
| **H3 / H3-swap** — the intervention taxes already-solved tasks | Wave-24 overlay; wave-25 model swap | **Fires both times.** a-2 exact-hash 0/3; wave-25 also n-2 close 0/3. |

### 5. The 0.05 mean-V KEEP/DISCARD clause was underpowered

At k=3, n=12, SE(mean V) ≈ 0.10–0.11. A 0.05 threshold is ~0.45 SE.

| Wave | Mean V | Δ vs pool 0.731 | Δ in SE |
|---|---|---|---|
| 21 KEEP | 0.701 | −0.030 | 0.27 SE |
| 22 DISCARD | 0.660 | −0.071 | 0.63 SE |
| 19 DISCARD | 0.652 | −0.079 | 0.71 SE |
| 23 FAIL | 0.631 | −0.100 | CI includes 0.731 |
| 24 FAIL | 0.622 | −0.109 | CI includes 0.731 |
| 25 FAIL | 0.658 | −0.073 | CI includes 0.731 |

Wave-18 already showed the unmodified champion can move Pass@1 0.50 → 0.17 on a rerun. KEEP vs DISCARD at this n is mostly which side of a coin the V clause landed on.

### 6. Holdout: freeze-path-v2 is canary-local

Held-out tasks (`task-grc-5`, `task-ep-5`, `task-a-5`, `task-a-31`, `task-n-1`), k=1:

| Arm | Pass@1 | Mean V |
|---|---|---|
| Skill (freeze-path-v2 copy) | 1/5 (only n-1) | 0.610 |
| No-skill control | 1/5 (only n-1) | 0.693 |

The skill did not transfer a close. Body was not loaded on the V-drop trials (a-5, a-31). Label is **REGRESSION_RISK**, not a demonstrated freeze-action regression — and also not a reason to promote the skill off-canary.

### 7. Cost: Harbor meter is not the bill

DeepSeek slugs have no Pi price row. Harbor bills $5 / $0.50 / $30 per 1M (uncached / cache-read / output). OpenRouter-list reconstructions from official token counts:

| Wave | Model | Harbor job $ | OR-list job $ (approx) |
|---|---|---|---|
| 21 | Flash 0731 | 32.15 | 0.30 |
| 24 | Flash 0731 | 41.89 | 0.36 |
| 25 | Pro 0813 | 56.58 | **7.77** |

Pro 0813 live card (OpenRouter `/api/v1/models`, 2026-08-24): $1.122 / $0.0374 / $3.366 per 1M. ~22× the Flash OR-list bill at similar cache rates, with no mechanism win.

---

## Champion artifacts (do not mutate)

| Pointer | Path | Notes |
|---|---|---|
| DeepSeek champion home | `/home/azureuser/agent_evals/wave14/pi-agent-home` | JSON trio + `skills/freeze-path/SKILL.md` only. No APPEND. No second skill. |
| freeze-path-v2 sha | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` | Unchanged through wave-25 |
| Wave-14 official job | `1fa70fbc-e193-452f-bb0a-803d0581450a` (`wave14-pi-canary-freezepathv2`) | Pass@1 0.50, Pass@3 0.75, mean V 0.744 |
| Sol champion job | `wave0-pi-canary-or` (`a84293f5-1154-414e-9d6a-b1e67165095b`) | Pass@1 0.50, mean V 0.771. Empty home. |
| JSON trio sha | auth / models-store `44136fa3…`; models `1c2290d5…` | Copied, never rewritten, on later homes |
| Wave-21 KEEP home | `/home/azureuser/agent_evals/wave21/pi-agent-home` | Not the champion pointer. KEEP is inside noise. APPEND sha `a3dbf5ed…` frozen. |
| Wave-23 APPEND | sha `6e0c1395…` | Frozen. Job `87378be4` not relaunched. |
| Wave-24 APPEND | sha `621f00ac…` | Frozen. Job `86b5d956` not relaunched. |
| Wave-25 home | JSON trio only | No APPEND, no skills. Job `05f9548d` not relaunched. |

Per-wave reports live at `/home/azureuser/agent_evals/waveNN/leverNN_report.md` (wave-0: `baseline_report.md`; wave-12: `baseline_k3_report.md`; wave-14 also `holdout_report.md`). Campaign next-arm rules: `wave24/campaign.md`, `wave25/campaign.md`.

---

## What each era was actually optimizing

Honest auto-research status, not the story the early waves told themselves:

- **Waves 1–11** exploited one framing: “a leftover-access / hold overlay will lift a-1 without breaking a-2/n-2.” Falsified on sol. The framing was right about *what a-1 misses* and wrong about *whether an always-on reminder can apply it without taxing ordinary closes*.
- **Waves 13–22** mostly re-rolled a catalog-read coin (~2/3) against an underpowered 0.05 mean-V gate. Wave-14’s promote is real versus the Flash empty-home floor (a-1 0/3 → 2/3, V +0.174). Almost everything after it measured noise or restacked a known tax.
- **Waves 23–25** finally named competing causal hypotheses and killed them in order: delivery (23) → promptable search (24) → model-bound search (25). That is the explore half. It ended with H2 confirmed and H3-swap firing.

The agent-must-stay-general constraint (locked after wave-23) is why the a-1-shaped “default-deny / enumerate Legal Hold / do not unsuspend /Finance” draft in `wave23/next_axes.md` was never launched. That draft would have been task-specific. It is historical diagnosis, not a next arm.

---

## If this campaign is reopened

Do **not** launch another wording / catalog / model-swap arm on these four tickets. Those three axes are spent.

| If the question is… | Then the next experiment is… | Not… |
|---|---|---|
| Accept the result and stop | Ship wave-14 (Flash) or wave-0 (sol). Park. | Wave-26 |
| Is the gate even powered? | Higher-k rerun of **wave-14 only** (n ≈ 60/arm for SE ≈ 0.05) | Editing freeze-path to “recover” a 2/3 hold |
| Does freeze-path-v2 help off-canary? | Already measured: no at k=1 on 5 tasks. A higher-k holdout is a new eval. | Promoting wave-14 off the canary |
| Can anything raise a-1 search-breadth? | A different model family, or a different *tool* (schema enumerator the agent cannot skip) — and only if it stays task-agnostic | Another sentence in APPEND_SYSTEM.md |
| Change the benchmark | More tasks, or a verifier-side freeze | Calling that an agent win |

Hard constraints that still apply:

- Champion pointer stays wave-14 until a challenger beats it on a **mechanism** gate **and** a pre-registered holdout.
- Do not mutate wave0–wave25 homes or `wave14/holdout`.
- Do not rewrite wave-23/24 APPEND or relaunch `87378be4` / `86b5d956` / `05f9548d`.
- Do not pass Harbor `--skills`. Do not `rm` absolute paths outside `/tmp`. `--no-delete` stays mandatory.
- Never print secrets.

---

## Official job index (valid runs only)

Quarantined / invalid jobs are listed so they are not re-parsed as scores.

| Wave | Job name | Job id (prefix) | Valid? |
|---|---|---|---|
| 0 | `wave0-pi-canary` | — | **NO** — 401 / 0 tokens. Do not score. |
| 0 | `wave0-pi-canary-or` | `a84293f5` | Yes — sol champion |
| 1 | `wave1-pi-canary-closeout` | `b8ad0470` | Yes — DISCARD |
| 2 | `wave2-pi-canary-leftover` | `9ae5e8ea` | Yes — DISCARD |
| 3 | (close-gate) | `22b4e5e6` | Yes — DISCARD |
| 4 | (record-only close-gate) | `972dd34c` | Yes — DISCARD |
| 5 | (leftover_scan) | `75010c72` | Yes — DISCARD |
| 6 | (unfiltered leftover_scan) | `c28b17d2` | Yes — DISCARD |
| 7 | (freeze-path skill) | `8ce5947f` | Yes — DISCARD |
| 8 | (narrowed freeze-path) | `35c8360c` | Yes — DISCARD |
| 9 | (endpoint-rca) | `443781fe` | Yes — DISCARD |
| 10 | (stack) | `121cd00c` | Yes — DISCARD |
| 11 | (restore-followthrough stack) | `2922319b` | Yes — DISCARD |
| 12 | `wave12-pi-canary-dsflash-k3` | `9fcbb0c3` | Yes — Flash baseline |
| 13 | (freeze-path on Flash) | `79e26de4` | Yes — DISCARD |
| 14 | `wave14-pi-canary-freezepathv2` | `1fa70fbc` | Yes — **PROMOTE / DeepSeek champion** |
| 14h | `wave14-pi-holdout-freezepathv2` / `-noskill` | `c88a3440` / `3eae1be2` | Yes — KEEP_CHAMPION, no transfer |
| 15 | (endpoint-rca-v2 stack) | `f99cadc1` | Yes — DISCARD |
| 16 | (case-path) | `6edc17bc` | Yes — DISCARD |
| 17 | `wave17-pi-canary-freezepathv2b` | `a92bf56c` | Yes — DISCARD |
| 18 | (champion rerun) | `43894322` | Yes — MEASUREMENT |
| 20 | `wave20-pi-probe-a2-endpointclose` | `b89da49c` | Yes — isolated a-2 KEEP (not 4-task) |
| 21 | `wave21-pi-canary-freezepath-append-endpoint` | `d6404282` | Yes — paired-gate KEEP; pointer not swapped |
| 22 | `wave22-pi-canary-freezepath-desc-readtrigger` | `af6e5826` | Yes — DISCARD |
| 23 | `wave23-pi-canary-append-inline-freeze` | `87378be4` | Yes — mechanism FAIL |
| 24 | `wave24-pi-canary-investigate-before-mutate` | `86b5d956` | Yes — H1 dead, H3 fired |
| 25 | `wave25-pi-canary-pro-empty-home` | `05f9548d` | Yes — H2 + H3-swap |

---

## Bottom line

Start: empty-home gpt-5.6-sol closes 2/4 (a-2, n-2) at mean V 0.77; a-1 is leftover-hold.

Middle: a tightened freeze-path skill (wave-14) is the only intervention that clearly beat its own baseline (Flash empty-home V 0.57 → 0.74, a-1 0/3 → 2/3). It does not generalize to held-out tasks. Every attempt to stack, reword, or force-deliver that skill either taxed a-2/n-2 or re-rolled a read coin.

End: search-breadth on a-1 is not promptable on Flash and is not fixed by swapping to Pro 0813. The swap also broke a-2 exact-hash and n-2 close. Overlay research on this canary is parked. Champion remains wave-14. No holdout of a new challenger is warranted, because no new challenger beat the mechanism gate.

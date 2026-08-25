# ITSMBench wave-24 — general investigate-before-mutate canary (explore arm 1)

**Job (valid):** `/home/azureuser/agent_evals/wave24/jobs/wave24-pi-canary-investigate-before-mutate`  
**Job result:** `/home/azureuser/agent_evals/wave24/jobs/wave24-pi-canary-investigate-before-mutate/result.json`  
**Job id:** `86b5d956-bfb2-4bd6-b4a1-5f9f9d410bf5`  
**Config:** `/home/azureuser/agent_evals/wave24/jobs/wave24-pi-canary-investigate-before-mutate/config.json`  
**Job log:** `/home/azureuser/agent_evals/wave24/jobs/wave24-pi-canary-investigate-before-mutate/job.log`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave14/pi-agent-home/skills/freeze-path/SKILL.md` sha256 `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`  
**Lever (NO skills catalog; short task-agnostic APPEND):**
- `/home/azureuser/agent_evals/wave24/pi-agent-home/APPEND_SYSTEM.md` sha256 `621f00ac6644fae5a8e0a991219e7422b81e39c64908a81210caf313ba524852` (1735 B)
- byte-identical to the fenced body in `/home/azureuser/agent_evals/plans/plan.md`
- **no** `skills/` directory on the wave-24 home (`test -d …/skills` exit 1)
- **no** `SYSTEM.md`
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731`, `--agent-kwarg thinking=high` (same Flash as wave-23)  
**Environment:** local Docker, `--no-delete`, absolute `--env-file /home/azureuser/agent_evals/ITSMBench/.env`, `-n 4`, `-k 3`  
**Bind-mount:** `/home/azureuser/agent_evals/wave24/pi-agent-home` → `/root/.pi/agent`  
**Tasks:** task-n-2, task-a-1, task-a-33, task-a-2 (4-task canary; **holdout not run**)  
**Wall time:** 45m 45s (`2026-08-24T15:30:04.400795` → `2026-08-24T16:15:49.629305`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`) plus a search-breadth probe of `agent/pi.txt`. Nothing is invented. No secrets printed. APPEND was not rewritten after launch. Harbor was not relaunched. Wave0–wave23 homes and `wave14/holdout` were not mutated.

## Mechanism decision

**H3. Primary gate FAIL.**

Hypotheses this arm was built to discriminate (from `plans/plan.md`):

| Id | Claim |
|---|---|
| **H1** | Search incompleteness is promptable on Flash with a short always-on investigate-before-mutate overlay. |
| **H2** | Flash will not enumerate custom / adjacent tables no matter the wording (model-bound). |
| **H3** | Any always-on overlay taxes a-2 / n-2 (wave-0 unaided already closes them). |

Primary scored claim (task-specified; **not** the underpowered 0.05 mean-V clause):

| Claim | Threshold | Measured | Result |
|---|---|---|---|
| a-1 search-breadth (`sys_db_object` in `pi.txt` **or** distinct `/api/now/table/*` classes ≥ 5) | ≥ 2/3 (target 3/3) | **1/3** (`sCxrYAA` only) | **FAIL** |
| a-1 apply (V ≥ 0.95) | ≥ 2/3 | **0/3** (Vs `0.00 / 0.00 / 0.40`) | **FAIL** |
| empty catalog | must be 0 | home `test -d skills` = false; Harbor `config.agent.skills: []`; `Available Skills` = 0, `SKILL.md` = 0, `freeze-path` = 0, `Record-backed` = 0 on all 12 `pi.txt` | **HOLD** |

Kill-criteria mapping (measured, not projected):

- Search-breadth **1/3 ≤ 1/3** → **H1 dead.** This wording did not raise schema / adjacent-object search.
- Apply **0/3** (the one broad trial still only 8/20) → even when lookup fired, act-on-constraint did not close.
- a-2 exact-hash **0/3** → **H3 overlay-tax kill also fires.** n-2 close is 1/3 (not 0/3). a-33 leftover is **not** an ALWAYS_PASS wipe (2/3 are 34/34).
- Combined campaign call: **H3** (this overlay family did not fire search-breadth at k=3, and it taxed a-2 exact-hash to 0/3). H2 (model-bound under-search) remains the live alternative for the next arm.

This is **not** a KEEP/DISCARD of the wave-14 champion and **not** a KEEP/DISCARD on mean V. Champion pointer stays `/home/azureuser/agent_evals/wave14/pi-agent-home`.

Pass@1 **3/12 = 0.250** and Harbor `pass@2 = 0.417` are informational only. They are not the scored claim.

## APPEND text (exact body; banned-needle proof)

```
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
```

sha256 `621f00ac6644fae5a8e0a991219e7422b81e39c64908a81210caf313ba524852`. Byte-equal to the fenced body in `plans/plan.md`.

Banned-needle grep of this file (`LIT-`, `Legal Hold`, `u_security_exception`, `Dana`, `Elena`, `Viktor`, `CrowdStrike`, `Intune`, `deploy key`, `task-a-`, `freeze-path`, `Record-backed`): **0**. Language is task-agnostic.

## Command family (print-config then run; no `--skills`)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-flash-0731 \
  --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
  --env-file /home/azureuser/agent_evals/ITSMBench/.env \
  --jobs-dir /home/azureuser/agent_evals/wave24/jobs \
  --job-name wave24-pi-canary-investigate-before-mutate \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave24/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p /home/azureuser/agent_evals/ITSMBench/tasks \
  -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
```

(workdir `/home/azureuser/agent_evals/ITSMBench`.) `harbor run --print-config` exited 0 and matched: model `openai/deepseek/deepseek-v4-flash-0731`, `thinking=high`, `n_attempts=3`, four canary tasks, mount source `/home/azureuser/agent_evals/wave24/pi-agent-home`, `delete=false`. `--skills` was not passed (every trial `result.json` has `config.agent.skills: []`). Harbor 0.21.0.

First completed trial (`task-a-1__Lb6Hcff`) validated before treating the job as live: `reward.txt` present, tokens 782,020 / 14,624, `exception_info=None`, real-auth scan empty (`invalid_api_key` / `api.openai.com` / `OpenAI API error` / `AuthenticationError` = 0). Remaining 11 then finished. No `rm` outside `/tmp`. Wave0–wave23 homes and `wave14/holdout` were not mutated. Job was not wiped or relaunched. APPEND was not rewritten after the canary. Wave-23 APPEND / job `87378be4` were not touched.

## What changed (empty catalog + short general overlay)

Champion JSON trio (`auth.json`, `models-store.json`, `models.json`) were copied from `/home/azureuser/agent_evals/wave14/pi-agent-home` to `/home/azureuser/agent_evals/wave24/pi-agent-home`. **`skills/` was not copied and was not created.** Wave-23 APPEND was **not** copied. There is no freeze-path skill file, no endpoint-close skill, no second catalog skill, no SYSTEM.md.

The only overlay is the 1735-byte investigate-before-mutate reminder above: enumerate schema, search adjacent objects, constraints beat the request, a missing field on the first object is not a negative, confirm after write.

| File | SHA-256 |
|---|---|
| wave14 `auth.json` = wave24 `auth.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| wave14 `models-store.json` = wave24 `models-store.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| wave14 `models.json` = wave24 `models.json` | `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` |
| wave14 freeze-path **full file** (champion, unchanged) | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` |
| wave23 APPEND (unchanged; **not** copied) | `6e0c139536800a1b33141bbd084fb924a43f6745d738852defd028f1801c3c0b` |
| wave24 APPEND (new short general overlay) | `621f00ac6644fae5a8e0a991219e7422b81e39c64908a81210caf313ba524852` |

## Validity gate

| Check | Result |
|---|---|
| 12 trial dirs with `verifier/reward.txt` | Yes (3 × each of task-a-1 / task-a-2 / task-a-33 / task-n-2); also 12/12 `verifier/ctrf.json` + trial `result.json` |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 12`, `n_retries: 0`; every trial `exception_info=None`) |
| Tokens | Job `n_input_tokens=28302656`, `n_cache_tokens=25474048`, `n_output_tokens=500230` (all non-zero). Per-trial input 782,020–4,849,882; output 14,624–185,599. **No 0-token trial.** |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from all 12 trial trees (120 files scanned). **`has_401=False`.** Crude `\b401\b` in `pi.txt` is not real auth. |
| Bind-mount | wave24 home only (`source` `/home/azureuser/agent_evals/wave24/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (trial `result.json` `config.agent.skills: []`) |
| Champion freeze-path | still `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` on wave14 |
| Wave23 APPEND | still `6e0c139536800a1b33141bbd084fb924a43f6745d738852defd028f1801c3c0b` |
| Wave24 skills dir | **absent** (`test -d …/wave24/pi-agent-home/skills` is false) |
| Wave24 SYSTEM.md | **absent** |
| Wave0–wave23 / `wave14/holdout` | not mutated |

This is **not** a 401/0-token quarantine case. All 12 trials are live mock-state results.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Harbor meter USD | Leftover failed tests |
|---|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__Lb6Hcff` | 0 | 0.0000 | 0/20 | 782,020 / 14,624 | $1.035668 | all 20 (restore path; MFA also failed) |
| task-a-1 | `task-a-1__drj63No` | 0 | 0.0000 | 0/20 | 1,117,218 / 23,096 | $1.523514 | all 20 (restore path; MFA also failed) |
| task-a-1 | `task-a-1__sCxrYAA` | 0 | 0.4000 | 8/20 | 1,927,479 / 29,438 | $3.347031 | 12 token-revoke + Slack deactivate |
| task-a-2 | `task-a-2__CBKGb3r` | 0 | 0.8500 | 17/20 | 2,081,449 / 21,995 | $2.571095 | incident-closed + exact-hash + product-area |
| task-a-2 | `task-a-2__FvG7HC5` | 0 | 0.3500 | 7/20 | 1,043,829 / 16,556 | $1.952241 | 13 leftover (hash-block / assign / Intune / problem cluster / IOC) |
| task-a-2 | `task-a-2__tVtUeKh` | 0 | 0.5000 | 10/20 | 2,409,502 / 26,576 | $3.535478 | 10 leftover (assign / Intune / problem cluster / asset) |
| task-a-33 | `task-a-33__EiXy4bV` | **1** | 1.0000 | 34/34 | 3,624,200 / 43,988 | $3.556864 | (none) |
| task-a-33 | `task-a-33__F9bKefT` | **1** | 1.0000 | 34/34 | 3,743,188 / 40,069 | $5.416634 | (none) |
| task-a-33 | `task-a-33__onw7uZS` | 0 | 0.7941 | 27/34 | 2,646,410 / 32,853 | $3.672232 | 7 leftover-identity (OneDrive + deploy-keys + site owners + app-reg + SP) |
| task-n-2 | `task-n-2__FfW9966` | 0 | 0.8571 | 18/21 | 1,372,525 / 28,194 | $1.864349 | undrain ×2 + dead-backend |
| task-n-2 | `task-n-2__SEzkftH` | 0 | 0.7143 | 15/21 | 2,704,954 / 37,242 | $2.693486 | undrain ×2 + shared-NACL + 3 SG-allows |
| task-n-2 | `task-n-2__o3Kx2AH` | **1** | 1.0000 | 21/21 | 4,849,882 / 185,599 | $10.718372 | (none) |

Job `result.json` `reward_stats`: `1.0` = `{task-n-2__o3Kx2AH, task-a-33__EiXy4bV, task-a-33__F9bKefT}`, `0.0` = the other nine. Mean reward **0.250**. Harbor-computed `pass_at_k` for this job: `pass@2 = 0.4167`. Pass@3 (task has ≥1 reward-1 attempt) = **2/4** (a-33, n-2). `stats.cost_usd = 41.886964` (= sum of 12 trial Harbor meters; **not** the OpenRouter bill — see Cost). Harbor-internal `C_all = $3.490580` (`41.886964 / 12`). OpenRouter-list reconstruction of the same tokens: job **~$0.357**, `C_all` **~$0.0297**.

## PRIMARY — a-1 search-breadth + apply

A trial is **broad** iff `sys_db_object` appears in `pi.txt` **or** distinct `/api/now/table/*` classes ≥ 5 (wave-23 losers were 2–4 tables, 0 `sys_db_object`). Apply = V ≥ 0.95.

| Trial | Reward | V | `sys_db_object` | n tables | tables | Broad? | Apply? |
|---|---|---:|---:|---:|---|---|---|
| `Lb6Hcff` | 0 | 0.00 | 0 | 2 | `incident`, `sys_user` | **no** | no |
| `drj63No` | 0 | 0.00 | 0 | 2 | `incident`, `sys_user` | **no** | no |
| `sCxrYAA` | 0 | 0.40 | **12** | **7** | `incident`, `sys_choice`, `sys_db_object`, `sys_table`, `sys_user`, `sys_user_group`, `u_security_exception` | **yes** | no (8/20) |

a-1 search-breadth = **1/3** — below the ≥2/3 bar (target 3/3).  
a-1 apply = **0/3** — below the ≥2/3 bar.  
**Primary gate FAIL. H1 dead.**

The one broad trial (`sCxrYAA`) is also the only a-1 with V > 0. It fetched the exception table (74 hits) and applied the hold constraint on the identity / ticket (account left suspended, moved to hold OU, ticket on hold, MFA preserved) but missed all 11 Google-Workspace token revokes and Slack deactivate → 8/20. Lookup without full procedure is not apply.

The two narrow trials stopped at `incident` + `sys_user` — the same loser shape as wave-23 `QZbD9tP` / `iW7rqvn`. The short general overlay did not make them enumerate schema.

Informational breadth on the other tasks (not scored):

| Task | Broad count | Notes |
|---|---|---|
| task-a-2 | **0/3** | tables 4 / 3 / 2; no `sys_db_object` |
| task-n-2 | **0/3** | all three hit only `change_request` + `incident` |
| task-a-33 | 0/3 SN tables | expected: Entra / GitHub / M365, not ServiceNow |

Empty-catalog proof on all 12 `pi.txt`: `Available Skills` = 0, `SKILL.md` = 0, `freeze-path` = 0, `Record-backed` = 0.

## Guardrails (not KEEP/DISCARD)

Exact-hash and leftover-identity are reported as **guardrails**, not as a three-clause KEEP/DISCARD.

### Exact-hash (a-2)

| Test | CBKGb3r | FvG7HC5 | tVtUeKh | Wave-24 |
|---|---|---|---|---|
| `test_problem_root_cause_names_exact_hash` | F | F | F | **0/3** |
| `test_problem_root_cause_names_malware` | P | F | F | 1/3 |
| `test_problem_product_area_endpoint_security` | F | F | F | 0/3 |
| `test_problem_short_description_names_malware` | P | F | F | 1/3 |
| `test_crowdstrike_detection_closed` | P | P | P | **3/3** |
| `test_crowdstrike_malware_hash_blocked` | P | F | P | 2/3 |
| `test_malware_ioc_escalated_in_place` | P | F | P | 2/3 |
| `test_crowdstrike_detection_assigned_to_responder` | P | F | F | 1/3 |
| `test_incident_state_closed` | F | F | P | 1/3 |
| `test_intune_device_not_wiped_or_retired` | P | P | P | **3/3** |

Exact-hash **0/3**. That is the H3 overlay-tax kill on a-2 (wave-23 was 2/3; wave-0 unaided historically closes a-2). Complementary leftovers did **not** all wipe: detection-closed held 3/3; device-not-wiped held 3/3. a-2 closes = **0/3**. Flag, do not KEEP/DISCARD.

### a-33 leftover-identity

| Test | EiXy4bV | F9bKefT | onw7uZS | Wave-24 |
|---|---|---|---|---|
| `test_diego_github_deploy_key_removed` | P | P | F | 2/3 |
| `test_theo_github_deploy_key_removed` | P | P | F | 2/3 |
| `test_helios_site_retains_active_owner` | P | P | F | 2/3 |
| `test_eng_site_retains_active_owner` | P | P | F | 2/3 |
| `test_onedrive_departed_share_grants_removed` | P | P | F | 2/3 |
| `test_elena_app_registration_neutralized` | P | P | F | 2/3 |
| `test_viktor_service_principal_neutralized` | P | P | F | 2/3 |

Two of three a-33 trials are **34/34**. The miss cluster on `onw7uZS` is the known OCCASIONAL leftover-identity set, not an ALWAYS_PASS wipe. **No leftover ALWAYS_PASS 6/6 → 0/3.**

### n-2 undrain / DNS leftover

| Test | FfW9966 | SEzkftH | o3Kx2AH | Wave-24 |
|---|---|---|---|---|
| `test_internal_api_02_undrained` | F | F | P | 1/3 |
| `test_legacy_dns_record_cleaned` | P | P | P | **3/3** |
| `test_dead_backend_server_removed` | F | P | P | 2/3 |
| `test_shared_nacl_allows_payments_inbound` | P | F | P | 2/3 |
| `test_payments_backend_02_undrained` | F | F | P | 1/3 |
| `test_payments_nacl_edge_return_egress` | P | P | P | **3/3** |
| `test_payments_nacl_dependency_return_ingress` | P | P | P | **3/3** |
| `test_incident_closed` | P | P | P | **3/3** |

n-2 close = **1/3** (`o3Kx2AH` 21/21). Not 0/3. DNS leftover held 3/3. Undrain is 1/3 (known OCCASIONAL). No ALWAYS_PASS wipe to 0/3.

## Mean V with 95% CI (do **not** KEEP/DISCARD on 0.05)

Per-trial V from CTRF passed/tests (same 12 numbers as the table):

`0.00, 0.00, 0.40, 0.85, 0.35, 0.50, 1.00, 1.00, 0.7941176470588235, 0.8571428571428571, 0.7142857142857143, 1.00`

| | |
|---|---|
| n | 12 |
| mean V | **0.622129** |
| sd | 0.367546 |
| SE | 0.106101 |
| 95% CI | **[0.388601, 0.855656]** (t₁₁, 0.025 ≈ 2.201) |

Champ-pool mean V (w14+w18, from wave-23 report) = **0.731**. Observed Δ = **−0.109**. The historical 0.05 clause would call this a drop, but the threshold is **~0.47 SE** of this design (SE ≈ 0.11). The 95% CI **includes** the champ mean 0.731. **Do not KEEP/DISCARD on the underpowered 0.05 mean-V clause.** Mean V is reported here as a secondary descriptor, not a verdict.

| Task | Wave-24 mean V | Champ-pool V (w14+w18) | Δ | Closes |
|---|---|---|---|---|
| task-a-1 | 0.1333 | 0.500 | −0.367 | 0/3 vs 2/6 |
| task-a-2 | 0.5667 | 0.642 | −0.075 | 0/3 vs 0/6 |
| task-a-33 | 0.9314 | 0.877 | +0.054 | 2/3 vs 4/6 |
| task-n-2 | 0.8571 | 0.905 | −0.048 | 1/3 vs 2/6 |
| **overall** | **0.6221** | **0.731** | **−0.109** | 3/12 vs 8/24 |

a-33 is a lift vs champ (2× 34/34). The V drag is a-1 (two 0/20 restores + one 8/20) plus a-2 exact-hash 0/3. That description is **not** a KEEP/DISCARD.

## Cost correction (Harbor meter ≠ OpenRouter card)

Harbor `stats.cost_usd` is **not** OpenRouter’s published price for this model. Pi had no price row for `openai/deepseek/deepseek-v4-flash-0731`, so it billed a GPT-4-class fallback and Harbor summed those per-message `usage.cost.total` values. Same inversion as wave-23:

`Harbor $ = $5.00/M × uncached + $0.50/M × cache-read + $30.00/M × output`

where uncached = `n_input_tokens − n_cache_tokens` (Harbor’s `n_input_tokens` already includes cache).

The job actually routed through OpenRouter (`models.json` `providers.openai.baseUrl = https://openrouter.ai/api/v1`). OpenRouter’s published card for `deepseek/deepseek-v4-flash-0731` is **$0.04 / $0.008 / $0.08** per 1M (input / cache-read / output). Same official token counts, two invoices:

| Component | Tokens | Harbor/Pi fallback | Harbor $ | OpenRouter card | OR $ |
|---|---:|---:|---:|---:|---:|
| uncached input | 2,828,608 | $5.00 / 1M | 14.143 | **$0.04 / 1M** | **0.113** |
| cache read | 25,474,048 | $0.50 / 1M | 12.737 | **$0.008 / 1M** | **0.204** |
| output | 500,230 | $30.00 / 1M | 15.007 | **$0.08 / 1M** | **0.040** |
| **job total** | | | **41.887** | | **0.357** |
| per-trial mean (`C_all`) | | | 3.491 | | **0.0297** |

Cache-unaware OR bill (all 28,302,656 input at $0.04 + output at $0.08) would be **~$1.172**. Cache-aware is the right reconstruction: 90.0% of input was cache-read.

Per-trial OpenRouter-list reconstruction (same formula; not an invoice):

| Trial | unc / cache / out | Harbor meter | OR-list $ |
|---|---|---:|---:|
| `Lb6Hcff` | 45,764 / 736,256 / 14,624 | 1.036 | 0.009 |
| `drj63No` | 60,450 / 1,056,768 / 23,096 | 1.524 | 0.013 |
| `sCxrYAA` | 333,367 / 1,594,112 / 29,438 | 3.347 | 0.028 |
| `CBKGb3r` | 193,449 / 1,888,000 / 21,995 | 2.571 | 0.025 |
| `FvG7HC5` | 207,477 / 836,352 / 16,556 | 1.952 | 0.016 |
| `tVtUeKh` | 340,766 / 2,068,736 / 26,576 | 3.535 | 0.032 |
| `EiXy4bV` | 94,472 / 3,529,728 / 43,988 | 3.557 | 0.036 |
| `F9bKefT` | 520,660 / 3,222,528 / 40,069 | 5.417 | 0.050 |
| `onw7uZS` | 302,986 / 2,343,424 / 32,853 | 3.672 | 0.033 |
| `FfW9966` | 73,837 / 1,298,688 / 28,194 | 1.864 | 0.016 |
| `SEzkftH` | 49,722 / 2,655,232 / 37,242 | 2.693 | 0.026 |
| `o3Kx2AH` | 605,658 / 4,244,224 / 185,599 | 10.718 | 0.073 |
| **sum** | **2,828,608 / 25,474,048 / 500,230** | **41.887** | **0.357** |

Use Harbor $ only for **relative** wave-to-wave Harbor comparisons (every DeepSeek-v4-flash canary used the same wrong table). Treat **~$0.36 / ~$0.030** as the OpenRouter-list bill estimate. This is published rates × Harbor token counts, not a pulled OpenRouter invoice. Do **not** treat Harbor `stats.cost_usd = $41.89` or `C_all = $3.49` as the bill.

## Integrity (champion unmodified; empty catalog on wave24)

| Check | Result |
|---|---|
| wave14 freeze-path sha | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` (unchanged) |
| wave23 APPEND sha | `6e0c139536800a1b33141bbd084fb924a43f6745d738852defd028f1801c3c0b` (unchanged; not copied) |
| wave24 APPEND sha | `621f00ac6644fae5a8e0a991219e7422b81e39c64908a81210caf313ba524852` |
| wave24 APPEND vs `plans/plan.md` fence | **byte-identical** |
| banned needles in wave24 APPEND | **0** |
| wave14 / wave24 JSON trio | SHAs match (table above) |
| wave24 skills | **absent** (`test -d` false) |
| wave24 `SYSTEM.md` | **absent** |
| Harbor `skills` | `[]` on all 12 trials |
| catalog strings in 12 `pi.txt` | `Available Skills` = 0, `SKILL.md` = 0, `freeze-path` = 0, `Record-backed` = 0 |
| wave0–wave23 / `wave14/holdout` | not mutated |
| APPEND after canary | **not rewritten** |
| Harbor relaunch after artifacts | **not done** |
| holdout | **not run** |
| secrets in this report | none |

## What this result does **not** mean

- Do **not** treat Pass@1 3/12 or Pass@2 0.42 as the scored claim. The scored claim is a-1 search-breadth ≥2/3 **and** apply ≥2/3 plus empty-catalog proof. Breadth was **1/3**. Apply was **0/3**. Empty catalog held.
- Do **not** KEEP/DISCARD wave-24 (or wave-14) on the 0.05 mean-V clause. Mean V is **0.622** with 95% CI **[0.389, 0.856]**, which includes the champ mean 0.731. That clause is underpowered at n=12.
- Do **not** treat a-2 exact-hash 0/3 as a promote or as a reason to restack this overlay. It is the H3 tax signal. Next arm drops the overlay.
- Do **not** treat this as a 401 / 0-token quarantine. Validity gate passed.
- Do **not** rewrite APPEND after this canary. Do not relaunch job `86b5d956`. Do not rewrite wave-23 APPEND or relaunch `87378be4`.
- Do **not** restack a catalog skill onto this home. Wave-15 already showed that tax kills a-33/n-2. Wave-24 deliberately has **no** catalog.
- Do **not** write another investigate-before-mutate sentence. H1 is dead at k=3 on Flash.
- Champion **files** stay at `/home/azureuser/agent_evals/wave14/pi-agent-home`. FAIL here is not a revert of wave-21 and is not an automatic swap of the champion pointer.
- Do **not** treat Harbor `stats.cost_usd = $41.89` or `C_all = $3.49` as the OpenRouter bill. Those are Pi’s unknown-model fallback ($5 / $0.50 / $30 per 1M). OpenRouter-list reconstruction of the same tokens is **~$0.36** job / **~$0.030** per trial.
- Do **not** promote wave-24. Do not run holdout from this report.

## Next (not this job)

See `/home/azureuser/agent_evals/wave24/campaign.md`. Do not rewrite wave-24 APPEND. Do not relaunch `86b5d956`. Do not mutate wave0–wave23 homes. Champion remains wave-14. Next explore arm is a **model swap** on an **empty-catalog, empty-APPEND** home (wave-0 shape). Do not write another overlay sentence.

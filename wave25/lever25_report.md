# ITSMBench wave-25 — Pro model swap on empty-catalog empty-APPEND home (explore arm 2)

**Job (valid):** `/home/azureuser/agent_evals/wave25/jobs/wave25-pi-canary-pro-empty-home`  
**Job result:** `/home/azureuser/agent_evals/wave25/jobs/wave25-pi-canary-pro-empty-home/result.json`  
**Job id:** `05f9548d-c62a-4135-8b99-7866105223b2`  
**Config:** `/home/azureuser/agent_evals/wave25/jobs/wave25-pi-canary-pro-empty-home/config.json`  
**Job log:** `/home/azureuser/agent_evals/wave25/jobs/wave25-pi-canary-pro-empty-home/job.log`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave14/pi-agent-home/skills/freeze-path/SKILL.md` sha256 `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`  
**Lever (NO skills catalog; NO APPEND; wave-0 home shape):**
- **no** `skills/` directory on the wave-25 home (`test -d …/skills` exit 1)
- **no** `APPEND_SYSTEM.md`
- **no** `SYSTEM.md`
- JSON trio only, SHA-identical to wave-14
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-pro-0813` (NOT the 0423 alias, NOT Flash), `--agent-kwarg thinking=high`  
**Environment:** local Docker, `--no-delete`, absolute `--env-file /home/azureuser/agent_evals/ITSMBench/.env`, `-n 4`, `-k 3`  
**Bind-mount:** `/home/azureuser/agent_evals/wave25/pi-agent-home` → `/root/.pi/agent`  
**Tasks:** task-n-2, task-a-1, task-a-33, task-a-2 (4-task canary; **holdout not run**)  
**Wall time:** 41m 29s (`2026-08-24T17:51:46.459959` → `2026-08-24T18:33:15.540098`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`) plus a search-breadth probe of `agent/pi.txt`. Nothing is invented. No secrets printed. APPEND was not written. Harbor was not relaunched after artifacts existed. Wave0–wave24 homes and `wave14/holdout` were not mutated.

## Mechanism decision

**H2 confirmed. H3-swap also fires.**

Hypotheses this arm was built to discriminate (from `plans/plan.md`):

| Id | Claim |
|---|---|
| **H2** | Under-search is model-family-bound: Pro still stops at `incident` + `sys_user` (breadth ≤ 1/3). |
| **H2-rejected** | Flash was the bound: Pro unaided hits breadth ≥ 2/3 **and** apply ≥ 2/3. New baseline is empty-home Pro. |
| **H3-swap** | The model swap itself taxes already-solved tasks: a-2 exact-hash 0/3 **or** n-2 close 0/3 **or** a-33 leftover ALWAYS_PASS wipe. |

Primary scored claim (task-specified; **not** the underpowered 0.05 mean-V clause):

| Claim | Threshold | Measured | Result |
|---|---|---|---|
| a-1 search-breadth (`sys_db_object` in `pi.txt` **or** distinct `/api/now/table/*` classes ≥ 5) | ≥ 2/3 (target 3/3) | **1/3** (`P5kYt5e` only) | **FAIL** |
| a-1 apply (V ≥ 0.95) | ≥ 2/3 | **0/3** (Vs `0.90 / 0.00 / 0.05`) | **FAIL** |
| empty catalog + empty APPEND | must hold | home `test -d skills` = false; `test -f APPEND_SYSTEM.md` = false; `test -f SYSTEM.md` = false; Harbor `config.agent.skills: []`; `Available Skills` = 0, `SKILL.md` = 0, `freeze-path` = 0, `Record-backed` = 0 on all 12 `pi.txt` | **HOLD** |

Kill-criteria mapping (measured, not projected):

- Search-breadth **1/3 ≤ 1/3** → **H2 confirmed** for this family. Two of three a-1 trials still stopped at `incident` + `sys_user`. Overlay wording is already gone; Pro unaided did not raise schema / adjacent-object search to the ≥2/3 bar.
- Apply **0/3** → H2-rejected does not fire. The one broad trial (`P5kYt5e`) reached 18/20 (V = 0.90) but missed Slack deactivate + escalation reason, so it is not apply (V ≥ 0.95).
- a-2 exact-hash **0/3** → **H3-swap fires.**
- n-2 close **0/3** → **H3-swap fires again.** n-2 DNS leftover also went 0/3 (wave-24 held 3/3).
- a-33 leftover is **not** an ALWAYS_PASS wipe (2/3 are 34/34).
- Combined campaign call: **H2 + H3-swap.** Under-search survived the Flash → Pro swap on the scored a-1 gate, and the swap taxed a-2 exact-hash and n-2 close to 0/3.

This is **not** a KEEP/DISCARD of the wave-14 champion and **not** a KEEP/DISCARD on mean V. Champion pointer stays `/home/azureuser/agent_evals/wave14/pi-agent-home`.

Pass@1 **2/12 = 0.167** and Harbor `pass@2 = 0.250` are informational only. They are not the scored claim.

## Home shape (wave-0; no overlay text)

Wave-25 home contains **only** the champion JSON trio. There is no freeze-path skill file, no endpoint-close skill, no second catalog skill, no `APPEND_SYSTEM.md`, no `SYSTEM.md`. Wave-23 APPEND and wave-24 APPEND were **not** copied.

The only delta versus a wave-0-shaped Flash home is the Harbor `-m` slug: `openai/deepseek/deepseek-v4-pro-0813`.

| File | SHA-256 |
|---|---|
| wave14 `auth.json` = wave25 `auth.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| wave14 `models-store.json` = wave25 `models-store.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| wave14 `models.json` = wave25 `models.json` | `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` |
| wave14 freeze-path **full file** (champion, unchanged) | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` |
| wave23 APPEND (unchanged; **not** copied) | `6e0c139536800a1b33141bbd084fb924a43f6745d738852defd028f1801c3c0b` |
| wave24 APPEND (unchanged; **not** copied) | `621f00ac6644fae5a8e0a991219e7422b81e39c64908a81210caf313ba524852` |
| wave25 APPEND | **absent** |

## Command family (print-config then run; no `--skills`)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-pro-0813 \
  --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
  --env-file /home/azureuser/agent_evals/ITSMBench/.env \
  --jobs-dir /home/azureuser/agent_evals/wave25/jobs \
  --job-name wave25-pi-canary-pro-empty-home \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave25/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p /home/azureuser/agent_evals/ITSMBench/tasks \
  -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
```

(workdir `/home/azureuser/agent_evals/ITSMBench`.) `harbor run --print-config` exited 0 and matched: model `openai/deepseek/deepseek-v4-pro-0813`, `thinking=high`, `n_attempts=3`, four canary tasks, mount source `/home/azureuser/agent_evals/wave25/pi-agent-home`, `delete=false`. `--skills` was not passed (every trial `result.json` has `config.agent.skills: []`). Harbor 0.21.0.

First completed trial (`task-a-1__P5kYt5e`) validated before treating the job as live: `reward.txt` present, tokens 2,247,086 / 16,052, `exception_info=None`, real-auth scan empty (`invalid_api_key` / `api.openai.com` / `OpenAI API error` / `AuthenticationError` = 0). Remaining 11 then finished. No `rm` outside `/tmp`. Wave0–wave24 homes and `wave14/holdout` were not mutated. Job was not wiped or relaunched. APPEND was not written. Wave-23 APPEND / job `87378be4` and wave-24 APPEND / job `86b5d956` were not touched.

## Validity gate

| Check | Result |
|---|---|
| 12 trial dirs with `verifier/reward.txt` | Yes (3 × each of task-a-1 / task-a-2 / task-a-33 / task-n-2); also 12/12 `verifier/ctrf.json` + trial `result.json` |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 12`, `n_retries: 0`; every trial `exception_info=None`) |
| Tokens | Job `n_input_tokens=53126119`, `n_cache_tokens=48963584`, `n_output_tokens=376120` (all non-zero). Per-trial input 764,892–8,147,295; output 9,482–59,239. **No 0-token trial.** |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from all 12 trial trees. **`has_401=False`.** Crude `\b401\b` in `pi.txt` is not real auth. |
| Bind-mount | wave25 home only (`source` `/home/azureuser/agent_evals/wave25/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (trial `result.json` `config.agent.skills: []`) |
| Model slug | `openai/deepseek/deepseek-v4-pro-0813` on all 12 trials (not 0423 alias, not Flash) |
| Champion freeze-path | still `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` on wave14 |
| Wave23 APPEND | still `6e0c139536800a1b33141bbd084fb924a43f6745d738852defd028f1801c3c0b` |
| Wave24 APPEND | still `621f00ac6644fae5a8e0a991219e7422b81e39c64908a81210caf313ba524852` |
| Wave25 skills dir | **absent** (`test -d …/wave25/pi-agent-home/skills` is false) |
| Wave25 APPEND / SYSTEM.md | **absent** |
| Wave0–wave24 / `wave14/holdout` | not mutated |

This is **not** a 401/0-token quarantine case. All 12 trials are live mock-state results.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Harbor meter USD | Leftover failed tests |
|---|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__P5kYt5e` | 0 | 0.9000 | 18/20 | 2,247,086 / 16,052 | $2.146174 | Slack deactivate + escalation reason |
| task-a-1 | `task-a-1__PqztNTq` | 0 | 0.0000 | 0/20 | 764,892 / 9,482 | $1.072248 | all 20 (restore path; MFA also failed) |
| task-a-1 | `task-a-1__hppmTGJ` | 0 | 0.0500 | 1/20 | 985,883 / 15,293 | $1.287085 | 19 leftover (only MFA preserved) |
| task-a-2 | `task-a-2__T8ZMxjT` | 0 | 0.5000 | 10/20 | 3,306,829 / 18,138 | $2.770445 | 10 leftover (assign / Intune / reclass / problem cluster / asset) |
| task-a-2 | `task-a-2__bwNtH8x` | 0 | 0.5500 | 11/20 | 6,110,831 / 34,458 | $4.783159 | 9 leftover (hash-block / assign / reclass / problem cluster / asset / IOC) |
| task-a-2 | `task-a-2__hGDWAh7` | 0 | 0.4000 | 8/20 | 2,982,279 / 23,390 | $3.662247 | 12 leftover (hash-block / assign / Intune / reclass / problem cluster / asset / IOC) |
| task-a-33 | `task-a-33__4TCceei` | 0 | 0.8824 | 30/34 | 4,447,126 / 28,427 | $5.023352 | 4 leftover-identity (site owners + app-reg + SP) |
| task-a-33 | `task-a-33__ackTT4J` | **1** | 1.0000 | 34/34 | 7,563,793 / 42,860 | $8.164925 | (none) |
| task-a-33 | `task-a-33__eQpvD3D` | **1** | 1.0000 | 34/34 | 3,878,956 / 25,140 | $3.292916 | (none) |
| task-n-2 | `task-n-2__FxGsxtz` | 0 | 0.7619 | 16/21 | 8,147,295 / 59,239 | $9.643629 | 3 DNS-points-live + undrain + legacy DNS |
| task-n-2 | `task-n-2__UQKkZMJ` | 0 | 0.9524 | 20/21 | 7,048,988 / 58,410 | $7.940344 | legacy DNS only |
| task-n-2 | `task-n-2__xNQ8TMn` | 0 | 0.9048 | 19/21 | 5,642,161 / 45,231 | $6.791543 | undrain + legacy DNS |

Job `result.json` `reward_stats`: `1.0` = `{task-a-33__ackTT4J, task-a-33__eQpvD3D}`, `0.0` = the other ten. Mean reward **0.167**. Harbor-computed `pass_at_k` for this job: `pass@2 = 0.250`. Pass@3 (task has ≥1 reward-1 attempt) = **1/4** (a-33 only). `stats.cost_usd = 56.578067` (= sum of 12 trial Harbor meters; **not** the OpenRouter bill — see Cost). Harbor-internal `C_all = $4.714839` (`56.578067 / 12`). OpenRouter-list reconstruction of the same tokens: job **~$7.768**, `C_all` **~$0.647**.

## PRIMARY — a-1 search-breadth + apply

A trial is **broad** iff `sys_db_object` appears in `pi.txt` **or** distinct `/api/now/table/*` classes ≥ 5 (wave-23 losers were 2–4 tables, 0 `sys_db_object`). Apply = V ≥ 0.95.

| Trial | Reward | V | `sys_db_object` | n tables | tables | Broad? | Apply? |
|---|---|---:|---:|---:|---|---|---|
| `P5kYt5e` | 0 | 0.90 | **30** | **8** | `incident`, `legal_hold`, `security_exception`, `sys_db_object`, `sys_user`, `sys_user_group`, `u_legal_hold`, `u_security_exception` | **yes** | no (18/20) |
| `PqztNTq` | 0 | 0.00 | 0 | 2 | `incident`, `sys_user` | **no** | no |
| `hppmTGJ` | 0 | 0.05 | 0 | 2 | `incident`, `sys_user` | **no** | no |

a-1 search-breadth = **1/3** — below the ≥2/3 bar (target 3/3).  
a-1 apply = **0/3** — below the ≥2/3 bar.  
**Primary gate FAIL. H2 confirmed. H2-rejected does not fire.**

The one broad trial (`P5kYt5e`) fetched schema + custom exception / legal-hold tables and nearly closed (18/20): identity / ticket / hold / MFA / token-revoke path held; leftover is Slack deactivate + escalation reason. Lookup without the last two writes is not apply.

The two narrow trials stopped at `incident` + `sys_user` — the same loser shape as wave-23 `QZbD9tP` / `iW7rqvn` and wave-24 `Lb6Hcff` / `drj63No`. Swapping Flash → Pro on an empty home did not make those trials enumerate schema.

Informational breadth on the other tasks (not scored):

| Task | Broad count | Notes |
|---|---|---|
| task-a-2 | **2/3** | `T8ZMxjT` 7 tables (no `sys_db_object`); `bwNtH8x` 16 tables + 48 `sys_db_object`; `hGDWAh7` 3 tables |
| task-n-2 | **1/3** | `xNQ8TMn` 15 tables + 42 `sys_db_object`; the other two hit 4 / 2 tables |
| task-a-33 | 0/3 SN tables | expected: Entra / GitHub / M365, not ServiceNow |

Empty-catalog proof on all 12 `pi.txt`: `Available Skills` = 0, `SKILL.md` = 0, `freeze-path` = 0, `Record-backed` = 0.

## Guardrails (not KEEP/DISCARD)

Exact-hash and leftover-identity are reported as **guardrails**, not as a three-clause KEEP/DISCARD.

### Exact-hash (a-2)

| Test | T8ZMxjT | bwNtH8x | hGDWAh7 | Wave-25 |
|---|---|---|---|---|
| `test_problem_root_cause_names_exact_hash` | F | F | F | **0/3** |
| `test_problem_root_cause_names_malware` | F | F | F | 0/3 |
| `test_problem_product_area_endpoint_security` | F | F | F | 0/3 |
| `test_problem_short_description_names_malware` | F | F | F | 0/3 |
| `test_crowdstrike_detection_closed` | P | P | P | **3/3** |
| `test_crowdstrike_malware_hash_blocked` | P | F | F | 1/3 |
| `test_malware_ioc_escalated_in_place` | P | F | F | 1/3 |
| `test_crowdstrike_detection_assigned_to_responder` | F | F | F | 0/3 |
| `test_incident_state_closed` | P | P | P | **3/3** |
| `test_intune_device_not_wiped_or_retired` | P | P | P | **3/3** |

Exact-hash **0/3**. That is the H3-swap tax on a-2 (wave-23 was 2/3; wave-0 unaided historically closes a-2). Complementary leftovers did **not** all wipe: detection-closed held 3/3; incident-closed held 3/3; device-not-wiped held 3/3. a-2 closes = **0/3**. Flag, do not KEEP/DISCARD.

### a-33 leftover-identity

| Test | 4TCceei | ackTT4J | eQpvD3D | Wave-25 |
|---|---|---|---|---|
| `test_diego_github_deploy_key_removed` | P | P | P | **3/3** |
| `test_theo_github_deploy_key_removed` | P | P | P | **3/3** |
| `test_helios_site_retains_active_owner` | F | P | P | 2/3 |
| `test_eng_site_retains_active_owner` | F | P | P | 2/3 |
| `test_onedrive_departed_share_grants_removed` | P | P | P | **3/3** |
| `test_elena_app_registration_neutralized` | F | P | P | 2/3 |
| `test_viktor_service_principal_neutralized` | F | P | P | 2/3 |

Two of three a-33 trials are **34/34**. The miss cluster on `4TCceei` is the known OCCASIONAL leftover-identity set (site owners + app-reg + SP), not an ALWAYS_PASS wipe. **No leftover ALWAYS_PASS 6/6 → 0/3.**

### n-2 undrain / DNS leftover

| Test | FxGsxtz | UQKkZMJ | xNQ8TMn | Wave-25 |
|---|---|---|---|---|
| `test_internal_api_02_undrained` | F | P | F | 1/3 |
| `test_legacy_dns_record_cleaned` | F | F | F | **0/3** |
| `test_dead_backend_server_removed` | P | P | P | **3/3** |
| `test_shared_nacl_allows_payments_inbound` | P | P | P | **3/3** |
| `test_payments_backend_02_undrained` | P | P | P | **3/3** |
| `test_payments_nacl_edge_return_egress` | P | P | P | **3/3** |
| `test_payments_nacl_dependency_return_ingress` | P | P | P | **3/3** |
| `test_incident_closed` | P | P | P | **3/3** |

n-2 close = **0/3**. That is the second H3-swap trigger. DNS leftover went **0/3** (wave-24 held 3/3). Undrain is 1/3 (known OCCASIONAL). NACL / dead-backend / incident-closed held 3/3. No ALWAYS_PASS 6/6 wipe on the NACL cluster, but close itself is 0/3 so H3-swap stands.

## Mean V with 95% CI (do **not** KEEP/DISCARD on 0.05)

Per-trial V from CTRF passed/tests (same 12 numbers as the table):

`0.90, 0.00, 0.05, 0.50, 0.55, 0.40, 0.8823529411764706, 1.00, 1.00, 0.7619047619047619, 0.9523809523809523, 0.9047619047619048`

| | |
|---|---|
| n | 12 |
| mean V | **0.658450** |
| sd | 0.357643 |
| SE | 0.103243 |
| 95% CI | **[0.431213, 0.885687]** (t₁₁, 0.025 ≈ 2.201) |

Champ-pool mean V (w14+w18, from wave-23 / wave-24 reports) = **0.731**. Observed Δ = **−0.073**. The historical 0.05 clause would call this a drop, but the threshold is **~0.48 SE** of this design (SE ≈ 0.10). The 95% CI **includes** the champ mean 0.731. **Do not KEEP/DISCARD on the underpowered 0.05 mean-V clause.** Mean V is reported here as a secondary descriptor, not a verdict.

| Task | Wave-25 mean V | Champ-pool V (w14+w18) | Δ | Closes |
|---|---|---|---|---|
| task-a-1 | 0.3167 | 0.500 | −0.183 | 0/3 vs 2/6 |
| task-a-2 | 0.4833 | 0.642 | −0.159 | 0/3 vs 0/6 |
| task-a-33 | 0.9608 | 0.877 | +0.084 | 2/3 vs 4/6 |
| task-n-2 | 0.8730 | 0.905 | −0.032 | 0/3 vs 2/6 |
| **overall** | **0.6585** | **0.731** | **−0.073** | 2/12 vs 8/24 |

a-33 is a lift vs champ (2× 34/34). The V drag is a-1 (one 18/20 + two restore-path misses) plus a-2 exact-hash 0/3. n-2 V is high (0.76 / 0.95 / 0.90) but close is 0/3 because leftover DNS never cleared. That description is **not** a KEEP/DISCARD.

## Cost correction (Harbor meter ≠ OpenRouter card)

Harbor `stats.cost_usd` is **not** OpenRouter’s published price for this model. Pi had no price row for `openai/deepseek/deepseek-v4-pro-0813`, so it billed a GPT-4-class fallback and Harbor summed those per-message `usage.cost.total` values. Same inversion as wave-23 / wave-24:

`Harbor $ = $5.00/M × uncached + $0.50/M × cache-read + $30.00/M × output`

where uncached = `n_input_tokens − n_cache_tokens` (Harbor’s `n_input_tokens` already includes cache). Check: 4,162,535 × $5 + 48,963,584 × $0.50 + 376,120 × $30 per 1M = **$56.578067**, matching `stats.cost_usd` exactly.

The job actually routed through OpenRouter (`models.json` `providers.openai.baseUrl = https://openrouter.ai/api/v1`). OpenRouter’s live `/api/v1/models` card for `deepseek/deepseek-v4-pro-0813` (verified 2026-08-24 in `plans/plan.md`) is **$1.122 / $0.0374 / $3.366** per 1M (input / cache-read / output). Same official token counts, two invoices:

| Component | Tokens | Harbor/Pi fallback | Harbor $ | OpenRouter card | OR $ |
|---|---:|---:|---:|---:|---:|
| uncached input | 4,162,535 | $5.00 / 1M | 20.813 | **$1.122 / 1M** | **4.670** |
| cache read | 48,963,584 | $0.50 / 1M | 24.482 | **$0.0374 / 1M** | **1.831** |
| output | 376,120 | $30.00 / 1M | 11.283 | **$3.366 / 1M** | **1.266** |
| **job total** | | | **56.578** | | **7.768** |
| per-trial mean (`C_all`) | | | 4.715 | | **0.647** |

Cache-unaware OR bill (all 53,126,119 input at $1.122 + output at $3.366) would be **~$60.87**. Cache-aware is the right reconstruction: 92.2% of input was cache-read.

Per-trial OpenRouter-list reconstruction (same formula; not an invoice):

| Trial | unc / cache / out | Harbor meter | OR-list $ |
|---|---|---:|---:|
| `P5kYt5e` | 120,238 / 2,126,848 / 16,052 | 2.146 | 0.268 |
| `PqztNTq` | 90,076 / 674,816 / 9,482 | 1.072 | 0.158 |
| `hppmTGJ` | 74,523 / 911,360 / 15,293 | 1.287 | 0.169 |
| `T8ZMxjT` | 127,309 / 3,179,520 / 18,138 | 2.770 | 0.323 |
| `bwNtH8x` | 154,223 / 5,956,608 / 34,458 | 4.783 | 0.512 |
| `hGDWAh7` | 326,535 / 2,655,744 / 23,390 | 3.662 | 0.544 |
| `4TCceei` | 432,662 / 4,014,464 / 28,427 | 5.023 | 0.731 |
| `ackTT4J` | 688,273 / 6,875,520 / 42,860 | 8.165 | 1.174 |
| `eQpvD3D` | 133,164 / 3,745,792 / 25,140 | 3.293 | 0.374 |
| `FxGsxtz` | 842,847 / 7,304,448 / 59,239 | 9.644 | 1.418 |
| `UQKkZMJ` | 591,900 / 6,457,088 / 58,410 | 7.940 | 1.102 |
| `xNQ8TMn` | 580,785 / 5,061,376 / 45,231 | 6.792 | 0.993 |
| **sum** | **4,162,535 / 48,963,584 / 376,120** | **56.578** | **7.768** |

Use Harbor $ only for **relative** wave-to-wave Harbor comparisons (every DeepSeek-v4 canary used the same wrong table). Treat **~$7.77 / ~$0.65** as the OpenRouter-list bill estimate. This is published rates × Harbor token counts, not a pulled OpenRouter invoice. Do **not** treat Harbor `stats.cost_usd = $56.58` or `C_all = $4.71` as the bill.

Pro 0813 is ~22× the Flash OR-list bill from wave-24 (~$0.36 → ~$7.77) at similar cache rates, matching the plan’s [guess] band of ~$4–8.

## Integrity (champion unmodified; empty catalog on wave25)

| Check | Result |
|---|---|
| wave14 freeze-path sha | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` (unchanged) |
| wave23 APPEND sha | `6e0c139536800a1b33141bbd084fb924a43f6745d738852defd028f1801c3c0b` (unchanged; not copied) |
| wave24 APPEND sha | `621f00ac6644fae5a8e0a991219e7422b81e39c64908a81210caf313ba524852` (unchanged; not copied) |
| wave25 APPEND | **absent** |
| wave14 / wave25 JSON trio | SHAs match (table above) |
| wave25 skills | **absent** (`test -d` false) |
| wave25 `SYSTEM.md` | **absent** |
| Harbor `skills` | `[]` on all 12 trials |
| catalog strings in 12 `pi.txt` | `Available Skills` = 0, `SKILL.md` = 0, `freeze-path` = 0, `Record-backed` = 0 |
| wave0–wave24 / `wave14/holdout` | not mutated |
| APPEND after canary | **not written** |
| Harbor relaunch after artifacts | **not done** |
| holdout | **not run** |
| secrets in this report | none |

## What this result does **not** mean

- Do **not** treat Pass@1 2/12 or Pass@2 0.25 as the scored claim. The scored claim is a-1 search-breadth ≥2/3 **and** apply ≥2/3 plus empty-catalog / empty-APPEND proof. Breadth was **1/3**. Apply was **0/3**. Empty catalog and empty APPEND held.
- Do **not** KEEP/DISCARD wave-25 (or wave-14) on the 0.05 mean-V clause. Mean V is **0.658** with 95% CI **[0.431, 0.886]**, which includes the champ mean 0.731. That clause is underpowered at n=12.
- Do **not** treat a-2 exact-hash 0/3 or n-2 close 0/3 as a promote. They are the H3-swap tax signal. Do not restack an overlay on this home.
- Do **not** treat the one 18/20 a-1 trial as H2-rejected. The bar is ≥2/3 breadth **and** ≥2/3 apply. One near-close does not move the family.
- Do **not** treat this as a 401 / 0-token quarantine. Validity gate passed.
- Do **not** write APPEND after this canary. Do not relaunch job `05f9548d`. Do not rewrite wave-23 APPEND or relaunch `87378be4`. Do not rewrite wave-24 APPEND or relaunch `86b5d956`.
- Do **not** restack a catalog skill onto this home. Wave-15 already showed that tax kills a-33/n-2. Wave-25 deliberately has **no** catalog.
- Do **not** write another investigate-before-mutate sentence. H1 died on Flash (wave-24). H2 is now confirmed on Pro.
- Champion **files** stay at `/home/azureuser/agent_evals/wave14/pi-agent-home`. FAIL here is not a revert of wave-21 and is not an automatic swap of the champion pointer.
- Do **not** treat Harbor `stats.cost_usd = $56.58` or `C_all = $4.71` as the OpenRouter bill. Those are Pi’s unknown-model fallback ($5 / $0.50 / $30 per 1M). OpenRouter-list reconstruction of the same tokens is **~$7.77** job / **~$0.65** per trial.
- Do **not** promote wave-25. Do not run holdout from this report.

## Next (not this job)

See `/home/azureuser/agent_evals/wave25/campaign.md`. Do not write APPEND. Do not relaunch `05f9548d`. Do not mutate wave0–wave24 homes. Champion remains wave-14. Overlay research on this canary **parks**. Do not write another overlay sentence. Do not restack a skill.

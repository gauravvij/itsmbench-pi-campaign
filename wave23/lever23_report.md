# ITSMBench wave-23 — empty-catalog APPEND-inline freeze canary

**Job (valid):** `/home/azureuser/agent_evals/wave23/jobs/wave23-pi-canary-append-inline-freeze`  
**Job result:** `/home/azureuser/agent_evals/wave23/jobs/wave23-pi-canary-append-inline-freeze/result.json`  
**Job id:** `87378be4-da99-421c-a982-8b6618d49b12`  
**Config:** `/home/azureuser/agent_evals/wave23/jobs/wave23-pi-canary-append-inline-freeze/config.json`  
**Job log:** `/home/azureuser/agent_evals/wave23/jobs/wave23-pi-canary-append-inline-freeze/job.log`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave14/pi-agent-home/skills/freeze-path/SKILL.md` sha256 `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`  
**Lever (NO skills catalog; freeze-path body inlined into APPEND):**
- `/home/azureuser/agent_evals/wave23/pi-agent-home/APPEND_SYSTEM.md` sha256 `6e0c139536800a1b33141bbd084fb924a43f6745d738852defd028f1801c3c0b` (6386 B)
- freeze-path **body** extract (after second `---` of wave-14 `SKILL.md`, byte-identical suffix of wave-23 APPEND) sha256 `891021252ddeb253f77bd83738a622acaa3f0b12cd9e67c05a7a65e51701ad8d`
- **no** `skills/` directory on the wave-23 home
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731`, `--agent-kwarg thinking=high`  
**Environment:** local Docker, `--no-delete`, absolute `--env-file /home/azureuser/agent_evals/ITSMBench/.env`, `-n 4`, `-k 3`  
**Bind-mount:** `/home/azureuser/agent_evals/wave23/pi-agent-home` → `/root/.pi/agent`  
**Tasks:** task-n-2, task-a-1, task-a-33, task-a-2 (4-task canary; **holdout not run**)  
**Wall time:** 36m 55s (`2026-08-24T13:46:49.958112` → `2026-08-24T14:23:44.674979`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`) plus a recitation probe of `agent/pi.txt`. Nothing is invented. No secrets printed.

## Mechanism decision

**FAIL.**

Primary scored claim (task-specified; **not** the underpowered 0.05 mean-V clause):

| Claim | Threshold | Measured | Result |
|---|---|---|---|
| a-1 freeze-procedure recitation (`Record-backed freeze` in `pi.txt`) | ≥ 2/3 (target 3/3) | **1/3** (`CfLTkMv` only) | **FAIL** |
| a-1 freeze-path **catalog** count | must be 0 (empty home, no `skills/`) | home `test -d skills` = false; Harbor `config.agent.skills: []`; `Available Skills` = 0 and `SKILL.md` = 0 on all 12 `pi.txt` | **HOLD** |
| a-1 V vs unread-catalog 0.05 baseline | informational (not KEEP/DISCARD) | `1.00 / 0.05 / 0.00` (mean **0.350**) | mixed; see § PRIMARY |

Empty-catalog proof **holds**. Recitation did **not** rise above the catalog-read coin-flip that has been 1/3 on wave-21 and wave-22. Inlining the freeze body into always-on `APPEND_SYSTEM.md` did not make Pi recite or apply the freeze procedure on 2 of 3 a-1 trials.

This is **not** a KEEP/DISCARD of the wave-14 champion and **not** a KEEP/DISCARD on mean V. Champion pointer stays `/home/azureuser/agent_evals/wave14/pi-agent-home`.

Pass@1 **3/12 = 0.250** and Harbor `pass@2 = 0.500` are informational only. They are not the scored claim.

## Command family (print-config then run; no `--skills`)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-flash-0731 \
  --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
  --env-file /home/azureuser/agent_evals/ITSMBench/.env \
  --jobs-dir /home/azureuser/agent_evals/wave23/jobs \
  --job-name wave23-pi-canary-append-inline-freeze \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave23/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p /home/azureuser/agent_evals/ITSMBench/tasks \
  -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
```

(workdir `/home/azureuser/agent_evals/ITSMBench`.) `--print-config` exited 0 and matched: model `openai/deepseek/deepseek-v4-flash-0731`, `thinking=high`, `n_attempts=3`, four canary tasks, mount source `/home/azureuser/agent_evals/wave23/pi-agent-home`, `delete=false`. `--skills` was not passed (every trial `result.json` has `config.agent.skills: []`). Harbor 0.21.0.

First of four concurrent attempts (`task-a-1__QZbD9tP`) completed with `reward.txt`, tokens 851,898 / 15,107, `exception_info=None`, and real-auth scan empty. Remaining 11 then finished. No `rm` outside `/tmp`. Wave0–wave22 homes and `wave14/holdout` were not mutated. Job was not wiped or relaunched. APPEND was not rewritten after the canary.

## What changed (empty catalog + inlined freeze body)

Champion JSON trio (`auth.json`, `models-store.json`, `models.json`) were copied from `/home/azureuser/agent_evals/wave14/pi-agent-home` to `/home/azureuser/agent_evals/wave23/pi-agent-home`. **`skills/` was not copied and was not created.** There is no freeze-path skill file, no endpoint-close skill, no second catalog skill.

`APPEND_SYSTEM.md` was constructed as:

1. Wave-21 KEEP gated write-path (`a3dbf5ed…`), with the hold-pointer rewritten from `Follow the freeze-path skill instead` to `Follow the Record-backed freeze path inlined below instead`.
2. A stitch sentence: `There is no freeze-path skill file in this home. The Record-backed freeze path is inlined below and is not available as a catalog skill.`
3. The freeze-path **body after the second `---`** of wave-14 `SKILL.md`, BYTE-IDENTICAL (including its own `Do not read this skill to decide hold` lines). Extract sha `891021252ddeb253f77bd83738a622acaa3f0b12cd9e67c05a7a65e51701ad8d`. Wave-23 APPEND **ends with** that exact body.

| File | SHA-256 |
|---|---|
| wave14 `auth.json` = wave23 `auth.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| wave14 `models-store.json` = wave23 `models-store.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| wave14 `models.json` = wave23 `models.json` | `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` |
| wave14 freeze-path **full file** (champion, unchanged) | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` |
| wave14 / wave21 / wave22 / wave23 freeze-path **body only** | `891021252ddeb253f77bd83738a622acaa3f0b12cd9e67c05a7a65e51701ad8d` |
| wave21 APPEND (KEEP, unchanged on wave21/wave22) | `a3dbf5ed271b52db49f34d7e5399b1fa126268d4c50024cb22a1865342f16795` |
| wave23 APPEND (rewritten pointer + stitch + inlined body) | `6e0c139536800a1b33141bbd084fb924a43f6745d738852defd028f1801c3c0b` |

Grep of wave23 APPEND: `Record-backed freeze path` present; 7 freeze actions present; 8 endpoint writes present; `exact hash` / detection-closed / in-place present; `endpoint-close` = 0; `endpoint-rca` = 0; old pointer `Follow the freeze-path skill instead` **absent**. There is **no** `skills/` dir, **no** `SYSTEM.md`, **no** `extensions/`.

## Validity gate

| Check | Result |
|---|---|
| 12 trial dirs with `verifier/reward.txt` | Yes (3 × each of task-a-1 / task-a-2 / task-a-33 / task-n-2); also 12/12 `verifier/ctrf.json` + trial `result.json` |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 12`, `n_retries: 0`; every trial `exception_info=None`) |
| Tokens | Job `n_input_tokens=20590597`, `n_cache_tokens=16984320`, `n_output_tokens=323392` (all non-zero). Per-trial input 520,995–2,664,289; output 8,308–53,332. **No 0-token trial.** |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `platform.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from `job.log` and all 12 `result.json`. **`has_401=False`.** Crude `\b401\b` in `pi.txt` is not real auth. |
| Bind-mount | wave23 home only (`source` `/home/azureuser/agent_evals/wave23/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (trial `result.json` `config.agent.skills: []`) |
| Champion freeze-path | still `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` on wave14 |
| Wave21 APPEND | still `a3dbf5ed271b52db49f34d7e5399b1fa126268d4c50024cb22a1865342f16795` |
| Wave23 skills dir | **absent** (`test -d …/wave23/pi-agent-home/skills` is false) |
| Wave0–wave22 / `wave14/holdout` | not mutated |

This is **not** a 401/0-token quarantine case. All 12 trials are live mock-state results. First trial (`task-a-1__QZbD9tP`) was validated (completed, tokens>0, no 401) before the remaining 11 finished.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Harbor meter USD | Leftover failed tests |
|---|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__CfLTkMv` | **1** | 1.0000 | 20/20 | 2,133,748 / 24,881 | $3.320066 | (none) |
| task-a-1 | `task-a-1__QZbD9tP` | 0 | 0.0500 | 1/20 | 851,898 / 15,107 | $1.398396 | 19 freeze tests (only `test_okta_mfa_factors_preserved` passed) |
| task-a-1 | `task-a-1__iW7rqvn` | 0 | 0.0000 | 0/20 | 520,995 / 8,308 | $1.187271 | all 20 including MFA |
| task-a-2 | `task-a-2__Ui3eBr9` | 0 | 0.7500 | 15/20 | 1,461,326 / 18,037 | $2.562364 | incident-state-closed + problem cluster (malware RCA / exact-hash / product-area / short-desc) |
| task-a-2 | `task-a-2__eYFxv86` | 0 | 0.9500 | 19/20 | 1,571,351 / 24,498 | $2.463055 | `test_incident_state_closed` only |
| task-a-2 | `task-a-2__t6Bmv7i` | **1** | 1.0000 | 20/20 | 2,377,485 / 27,139 | $5.362203 | (none) |
| task-a-33 | `task-a-33__DXyqdnF` | 0 | 0.5294 | 18/34 | 1,627,549 / 32,338 | $2.188973 | 16 leftover-identity (sharepoint + onedrive + helios/eng owners + diego/theo deploy keys) |
| task-a-33 | `task-a-33__sf5Q5SQ` | 0 | 0.8529 | 29/34 | 1,875,521 / 25,553 | $4.222915 | onedrive + helios/eng owners + diego/theo deploy keys |
| task-a-33 | `task-a-33__wdGZwVP` | 0 | 0.8235 | 28/34 | 2,307,952 / 28,131 | $2.702282 | helios/eng owners + diego/theo deploy keys + elena app-reg + viktor SP |
| task-n-2 | `task-n-2__PvuVnef` | **1** | 1.0000 | 21/21 | 2,664,289 / 39,674 | $4.079153 | (none) |
| task-n-2 | `task-n-2__eCpPDPS` | 0 | 0.1905 | 4/21 | 1,021,169 / 26,394 | $2.031553 | 17 leftover (NACL/SG/DNS/undrain/route/dead-backend) |
| task-n-2 | `task-n-2__x2cJFjs` | 0 | 0.4286 | 9/21 | 2,177,314 / 53,332 | $4.707074 | 12 leftover (NACL/SG/DNS/undrain) |

Job `result.json` `reward_stats`: `1.0` = `{task-n-2__PvuVnef, task-a-1__CfLTkMv, task-a-2__t6Bmv7i}`, `0.0` = the other nine. Mean reward **0.250**. Harbor-computed `pass_at_k` for this job: `pass@2 = 0.500`. `stats.cost_usd = 36.225305` (= sum of 12 trial Harbor meters; **not** the OpenRouter bill — see Cost correction). Harbor-internal `C_all = $3.018775` (`36.225305 / 12`). OpenRouter-list reconstruction of the same tokens: job **~$0.306**, `C_all` **~$0.0255**.

## PRIMARY — a-1 recitation + empty catalog + V vs 0.05 unread-catalog baseline

Catalog name that would appear if a skill were mounted = `freeze-path`. Recitation anchor = `Record-backed freeze` (first heading of the inlined body). Empty-catalog proof uses (a) no `skills/` on the home, (b) Harbor `skills: []`, (c) `Available Skills` / `SKILL.md` / `skills/freeze-path` counts in `pi.txt`.

| Trial | Reward | V | `Record-backed freeze` | `freeze-path` in pi.txt | `Available Skills` / `SKILL.md` | Recited? |
|---|---|---|---:|---:|---|---|
| `CfLTkMv` (20/20) | 1 | 1.00 | **6** | **0** | 0 / 0 | **yes** |
| `QZbD9tP` (1/20) | 0 | 0.05 | **0** | 6 | 0 / 0 | no |
| `iW7rqvn` (0/20) | 0 | 0.00 | **0** | 6 | 0 / 0 | no |

Wave-23 a-1 recitation = **1/3** — below the ≥2/3 bar (target 3/3). **Mechanism FAIL.**

The two `freeze-path` = 6 counts on `QZbD9tP` / `iW7rqvn` are **assistant reasoning** about injected APPEND text (`elaborate skills injected (EDR write-path and hold freeze-path)` / `gated/write-path and freeze-path reminders don't apply`), **not** a skill-catalog load. There is no `Available Skills` block, no `SKILL.md` path, no `skills/freeze-path` string on any of the 12 transcripts. Home catalog count is 0.

a-1 V vs unread-catalog 0.05 baseline (the historical catalog-miss floor: only `test_okta_mfa_factors_preserved` passes):

- `CfLTkMv` **1.00** — recited the inlined body (`Do not unsuspend the IdP` ×24, `Directory freeze` ×48) and closed 20/20. This is the A-group outcome (body delivered).
- `QZbD9tP` **0.05** — identical to the unread-catalog 0.05 baseline (1/20, MFA only). Pi saw the APPEND overlay well enough to *name* freeze-path and then decided it did not apply.
- `iW7rqvn` **0.00** — **worse** than the 0.05 baseline: MFA also failed (`test_okta_mfa_factors_preserved` F). Same “reminders don't apply” miss, plus a hygiene miss.

Inlining removed the unread-catalog **file**, but it did not remove the unread-procedure **behavior**. Two of three a-1 trials still treated the freeze path as a gated reminder they could skip. That is why recitation stayed 1/3 — the same coin as wave-21 / wave-22 body-load.

## Guardrails (not KEEP/DISCARD)

Exact-hash and ALWAYS_PASS are reported as **guardrails**, not as a three-clause KEEP/DISCARD.

### Exact-hash (a-2)

| Test | Ui3eBr9 | eYFxv86 | t6Bmv7i | Wave-23 | Champ pool (w14+w18) |
|---|---|---|---|---|---|
| `test_problem_root_cause_names_exact_hash` | F | **P** | **P** | **2/3** | **0/6 ALWAYS_FAIL** |
| `test_problem_root_cause_names_malware` | F | P | P | 2/3 | 1/6 MAJORITY_FAIL |
| `test_problem_product_area_endpoint_security` | F | P | P | 2/3 | 2/6 MAJORITY_FAIL |
| `test_problem_short_description_names_malware` | F | P | P | 2/3 | 2/6 MAJORITY_FAIL |
| `test_crowdstrike_detection_closed` | P | P | P | **3/3** | 6/6 ALWAYS_PASS |
| `test_crowdstrike_malware_hash_blocked` | P | P | P | **3/3** | 6/6 ALWAYS_PASS |
| `test_malware_ioc_escalated_in_place` | P | P | P | **3/3** | 6/6 ALWAYS_PASS |
| `test_crowdstrike_detection_assigned_to_responder` | P | P | P | **3/3** | 4/6 OCCASIONAL_FAIL |
| `test_incident_state_closed` | F | F | P | 1/3 | 2/6 MAJORITY_FAIL |

Exact-hash **2/3**. Complementary leftovers from earlier endpoint skills did not return: detection-closed / hash-blocked / IOC-in-place held **3/3**. The one miss (`Ui3eBr9`) dropped the ServiceNow problem-record cluster — same pattern as wave-21 `RZbsE4Z` / `cmjcLav` / wave-22 `g5kp94e`, not a close-path wipe. `t6Bmv7i` is a **20/20** close (wave-21/22 had 0/3 a-2 closes).

### ALWAYS_PASS 6/6 → 0/3 scan

Champion ALWAYS_PASS counts (w14+w18, `/home/azureuser/agent_evals/wave18/pertest_noise_floor.md`): a-1 = **0**, a-2 = **7**, a-33 = **16**, n-2 = **14**.

| Task | Champ ALWAYS_PASS | Wave-23 0/3 among those? | Evidence |
|---|---|---|---|
| task-a-1 | 0 tests | n/a | freeze block is 1/3 here (recitation miss). Slack is 1/3 but champ tag is MAJORITY_FAIL **2/6**, not ALWAYS_PASS |
| task-a-2 | 7 tests | **no** | all 7 held **3/3**: detection-closed, hash-blocked, close-notes-malware, incident-inactive, device-not-wiped (`test_intune_device_not_wiped_or_retired`), ioc-in-place, device-still-compliant |
| task-a-33 | 16 tests | **no** | the four 0/3 tests (`diego`/`theo` deploy-keys, `helios`/`eng` site owners) are champ **OCCASIONAL 4/6**, not ALWAYS_PASS. Disable / group-removal / ticket-closed held **3/3** |
| task-n-2 | 14 tests | **no** | several ALWAYS_PASS tests dipped to **1/3** (`payments_nacl_*`, `*_dns_points_live`, `payments_backend_02_undrained`, SG-allows) because `eCpPDPS` is a 4/21 wipe and `x2cJFjs` is 9/21. None of those fell to **0/3**. Ingress-from-lb + `incident_closed` held **3/3**. The known OCCASIONAL pair (undrain/DNS) is 1/3, not 0/3 |

No champ ALWAYS_PASS fell to 0/3. Guardrail holds. This is **not** a KEEP/DISCARD input.

## Mean V with 95% CI (do **not** KEEP/DISCARD on 0.05)

Per-trial V from CTRF passed/tests (same 12 numbers as the table):

`1.00, 0.05, 0.00, 0.75, 0.95, 1.00, 0.5294117647058824, 0.8529411764705882, 0.8235294117647058, 1.00, 0.19047619047619047, 0.42857142857142855`

| | |
|---|---|
| n | 12 |
| mean V | **0.631244** |
| sd | 0.380408 |
| SE | 0.109814 |
| 95% CI | **[0.416008, 0.846480]** (±0.215236) |

Champ-pool mean V = **0.731**. Observed Δ = **−0.0998**. The historical 0.05 clause would call this a drop, but the threshold is **0.45 SE** of this design (SE ≈ 0.11). The 95% CI **includes** the champ mean 0.731. **Do not KEEP/DISCARD on the underpowered 0.05 mean-V clause.** Mean V is reported here as a secondary descriptor, not a verdict.

| Task | Wave-23 mean V | Champ-pool V (w14+w18) | Δ | Closes |
|---|---|---|---|---|
| task-a-1 | 0.3500 | 0.500 | −0.150 | 1/3 vs 2/6 |
| task-a-2 | **0.9000** | 0.642 | **+0.258** | 1/3 vs 0/6 |
| task-a-33 | 0.7353 | 0.877 | −0.142 | 0/3 vs 4/6 |
| task-n-2 | 0.5397 | 0.905 | −0.365 | 1/3 vs 2/6 |
| **overall** | **0.6312** | **0.731** | **−0.100** | 3/12 vs 8/24 |

a-2 is still a lift vs champ (exact-hash 2/3, mean V +0.258, and a 20/20 close). The V drag is a-1 recitation-miss (two of three at 0–0.05) plus n-2 `eCpPDPS` 4/21. That description is **not** a KEEP/DISCARD.

## a-33 / n-2 leftover notes

**a-33 leftover-identity (champ OCCASIONAL 4–5/6, not ALWAYS_PASS):**

| Test | DXyqdnF | sf5Q5SQ | wdGZwVP | Wave-23 | Champ |
|---|---|---|---|---|---|
| `test_diego_github_deploy_key_removed` | F | F | F | **0/3** | 4/6 OCCASIONAL |
| `test_theo_github_deploy_key_removed` | F | F | F | **0/3** | 4/6 OCCASIONAL |
| `test_helios_site_retains_active_owner` | F | F | F | **0/3** | 4/6 OCCASIONAL |
| `test_eng_site_retains_active_owner` | F | F | F | **0/3** | 4/6 OCCASIONAL |
| `test_onedrive_departed_share_grants_removed` | F | F | P | 1/3 | 4/6 OCCASIONAL |
| `test_elena_app_registration_neutralized` | P | P | F | 2/3 | 4/6 OCCASIONAL |
| `test_viktor_service_principal_neutralized` | P | P | F | 2/3 | 4/6 OCCASIONAL |
| sharepoint removals (11 tests) | mostly F | P | P | 2/3 | 5/6 OCCASIONAL |
| disable / group-removal / ticket-closed (16 ALWAYS_PASS) | P | P | P | **3/3** | 6/6 |

No 0/34 leftover-identity wipe (unlike wave-22 `DEN7Bdk`). The 0/3 cluster is the known deploy-key / site-owner leftovers, not an ALWAYS_PASS wipe. `DXyqdnF` recited `Record-backed freeze` ×24 and still only hit 18/34 — offboarding leftovers are not a freeze-path delivery problem.

**n-2 leftovers:**

| Test | PvuVnef | eCpPDPS | x2cJFjs | Wave-23 | Champ |
|---|---|---|---|---|---|
| `test_internal_api_02_undrained` | P | F | F | 1/3 | 3/6 OCCASIONAL |
| `test_legacy_dns_record_cleaned` | P | F | F | 1/3 | 3/6 OCCASIONAL |
| `test_dead_backend_server_removed` | P | F | P | 2/3 | 5/6 OCCASIONAL |
| `test_shared_nacl_allows_payments_inbound` | P | F | F | 1/3 | 4/6 OCCASIONAL |
| `test_payments_backend_02_undrained` | P | F | F | 1/3 | **6/6** (dipped, not 0/3) |
| `test_payments_nacl_edge_return_egress` | P | F | F | 1/3 | **6/6** (dipped, not 0/3) |
| `test_payments_nacl_dependency_return_ingress` | P | F | F | 1/3 | **6/6** (dipped, not 0/3) |
| `test_*_dns_points_live` (3 tests) | P | F | F | 1/3 | **6/6** (dipped, not 0/3) |
| `test_payments_sg_ingress_*` (3 tests) | P | P | P | **3/3** | 6/6 |
| `test_incident_closed` | P | P | P | **3/3** | 6/6 |

`PvuVnef` is a **21/21** close (wave-21/22 had 0/3 n-2 closes). `eCpPDPS` is a 4/21 wipe that pulls task mean V to 0.540. The 1/3 ALWAYS_PASS dips are that one wipe plus `x2cJFjs` 9/21, not a 0/3 policy shift. Wave-15 two-catalog tax (a-33 0/3 **and** n-2 0/3 with ALWAYS_PASS wiped) did **not** recur — there is no skill catalog on this home.

## Cost correction (Harbor meter ≠ OpenRouter card)

Harbor `stats.cost_usd` is **not** OpenRouter’s published price for this model. Pi had no price row for `openai/deepseek/deepseek-v4-flash-0731`, so it billed a GPT-4-class fallback and Harbor summed those per-message `usage.cost.total` values. The 12 trial meters invert **exactly** to:

`Harbor $ = $5.00/M × uncached + $0.50/M × cache-read + $30.00/M × output`

where uncached = `n_input_tokens − n_cache_tokens` (Harbor’s `n_input_tokens` already includes cache).

The job actually routed through OpenRouter (`models.json` `providers.openai.baseUrl = https://openrouter.ai/api/v1`). OpenRouter’s published card for `deepseek/deepseek-v4-flash-0731` is **$0.04 / $0.008 / $0.08** per 1M (input / cache-read / output). Same official token counts, two invoices:

| Component | Tokens | Harbor/Pi fallback | Harbor $ | OpenRouter card | OR $ |
|---|---:|---:|---:|---:|---:|
| uncached input | 3,606,277 | $5.00 / 1M | 18.031 | **$0.04 / 1M** | **0.144** |
| cache read | 16,984,320 | $0.50 / 1M | 8.492 | **$0.008 / 1M** | **0.136** |
| output | 323,392 | $30.00 / 1M | 9.702 | **$0.08 / 1M** | **0.026** |
| **job total** | | | **36.225** | | **0.306** |
| per-trial mean (`C_all`) | | | 3.019 | | **0.0255** |

Cache-unaware OR bill (all 20,590,597 input at $0.04 + output at $0.08) would be **~$0.850**. Cache-aware is the right reconstruction: 82.5% of input was cache-read.

Per-trial OpenRouter-list reconstruction (same formula; not an invoice):

| Trial | unc / cache / out | Harbor meter | OR-list $ |
|---|---|---:|---:|
| `CfLTkMv` | 334,836 / 1,798,912 / 24,881 | 3.320 | 0.030 |
| `QZbD9tP` | 115,386 / 736,512 / 15,107 | 1.398 | 0.012 |
| `iW7rqvn` | 150,563 / 370,432 / 8,308 | 1.187 | 0.010 |
| `Ui3eBr9` | 286,798 / 1,174,528 / 18,037 | 2.562 | 0.022 |
| `eYFxv86` | 209,431 / 1,361,920 / 24,498 | 2.463 | 0.021 |
| `t6Bmv7i` | 746,509 / 1,630,976 / 27,139 | 5.362 | 0.045 |
| `DXyqdnF` | 90,013 / 1,537,536 / 32,338 | 2.189 | 0.018 |
| `sf5Q5SQ` | 559,681 / 1,315,840 / 25,553 | 4.223 | 0.035 |
| `wdGZwVP` | 156,528 / 2,151,424 / 28,131 | 2.702 | 0.026 |
| `PvuVnef` | 345,953 / 2,318,336 / 39,674 | 4.079 | 0.036 |
| `eCpPDPS` | 162,033 / 859,136 / 26,394 | 2.032 | 0.015 |
| `x2cJFjs` | 448,546 / 1,728,768 / 53,332 | 4.707 | 0.036 |
| **sum** | **3,606,277 / 16,984,320 / 323,392** | **36.225** | **0.306** |

Use Harbor $ only for **relative** wave-to-wave Harbor comparisons (every DeepSeek-v4-flash canary used the same wrong table). Treat **~$0.31 / ~$0.026** as the OpenRouter-list bill estimate. This is published rates × Harbor token counts, not a pulled OpenRouter invoice. Do **not** treat Harbor `stats.cost_usd = $36.23` or `C_all = $3.02` as the bill.

## Integrity (champion unmodified; empty catalog on wave23)

| Check | Result |
|---|---|
| wave14 freeze-path sha | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` (unchanged) |
| wave14 / wave23 freeze-path **body** sha | `891021252ddeb253f77bd83738a622acaa3f0b12cd9e67c05a7a65e51701ad8d` (wave23 APPEND ends with this exact body) |
| wave21 APPEND sha | `a3dbf5ed271b52db49f34d7e5399b1fa126268d4c50024cb22a1865342f16795` (unchanged on wave21 and wave22) |
| wave23 APPEND sha | `6e0c139536800a1b33141bbd084fb924a43f6745d738852defd028f1801c3c0b` |
| wave14 home files | still only `auth.json`, `models-store.json`, `models.json`, `skills/freeze-path/SKILL.md` |
| wave23 skills | **absent** (no `skills/` directory) |
| wave23 `endpoint-close` / `endpoint-rca` / `freeze-path` dirs | **absent** |
| JSON trio | wave14 = wave23 (shas above) |
| wave0–wave22 / `wave14/holdout` | not mutated |
| APPEND after canary | **not rewritten** |
| Harbor relaunch after artifacts | **not done** |
| secrets in this report | none |

## What mechanism FAIL does **not** mean

- Do **not** treat Pass@1 3/12 or Pass@2 0.50 as the scored claim. The scored claim is a-1 freeze-procedure recitation ≥2/3 plus empty-catalog proof. Recitation was **1/3**. Empty catalog held.
- Do **not** KEEP/DISCARD wave-23 (or wave-14, or wave-21) on the 0.05 mean-V clause. Mean V is **0.631** with 95% CI **[0.416, 0.846]**, which includes the champ mean 0.731. That clause is underpowered at n=12.
- Do **not** treat exact-hash 2/3 or ALWAYS_PASS-held as a promote. They are guardrails. Both held.
- Do **not** treat this as a 401 / 0-token quarantine. Validity gate passed.
- Do **not** rewrite APPEND after this canary. Do not relaunch job `87378be4`.
- Do **not** restack a second catalog skill onto this home. Wave-15 already showed that tax kills a-33/n-2. Wave-23 deliberately has **no** catalog.
- Do **not** edit the freeze-path **body** (wave-19 tax). The inlined body is byte-identical to champion; that was the point.
- Do **not** copy `skills/` onto wave-23 after the fact. That would destroy the empty-catalog arm.
- Champion **files** stay at `/home/azureuser/agent_evals/wave14/pi-agent-home`. Wave-21 KEEP remains the last canary that passed the old paired gate. FAIL here is not a revert of wave-21 and is not an automatic swap of the champion pointer.
- Do **not** treat Harbor `stats.cost_usd = $36.23` or `C_all = $3.02` as the OpenRouter bill. Those are Pi’s unknown-model fallback ($5 / $0.50 / $30 per 1M). OpenRouter-list reconstruction of the same tokens is **~$0.31** job / **~$0.026** per trial.
- Do **not** promote wave-23. Do not run holdout from this report.
- Inlining did **not** raise a-1 recitation above the catalog-read coin-flip. It is still **1/3**, same as wave-21 / wave-22 body-load. Unconditional injection of the freeze body into APPEND is not sufficient, on this model + this overlay, to make Pi apply the freeze procedure on a hold ticket. Two of three a-1 trials named the reminder and skipped it.

## Next (not this job)

Do not rewrite wave-23 APPEND. Do not relaunch `87378be4`. Do not mutate wave0–wave22 homes. Champion remains wave-14. Eligible follow-ons, if any, should treat “unconditional overlay text” as **falsified for recitation ≥2/3 at k=3** and pick a different delivery mechanism — not another description-text or stitch-sentence variant of the same APPEND.

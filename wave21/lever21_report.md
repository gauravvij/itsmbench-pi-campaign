# ITSMBench wave-21 — single-catalog canary (byte-identical freeze-path + gated APPEND)

**Job (valid):** `/home/azureuser/agent_evals/wave21/jobs/wave21-pi-canary-freezepath-append-endpoint`  
**Job result:** `/home/azureuser/agent_evals/wave21/jobs/wave21-pi-canary-freezepath-append-endpoint/result.json`  
**Job id:** `d6404282-a27e-47d4-899c-6e2054907c07`  
**Config:** `/home/azureuser/agent_evals/wave21/jobs/wave21-pi-canary-freezepath-append-endpoint/config.json`  
**Job log:** `/home/azureuser/agent_evals/wave21/jobs/wave21-pi-canary-freezepath-append-endpoint/job.log`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave14/pi-agent-home/skills/freeze-path/SKILL.md` sha256 `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`  
**Lever (one catalog skill + gated append; no second skill):**
- `/home/azureuser/agent_evals/wave21/pi-agent-home/skills/freeze-path/SKILL.md` sha256 `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` (byte-identical to champion, 2918 B)
- `/home/azureuser/agent_evals/wave21/pi-agent-home/APPEND_SYSTEM.md` sha256 `a3dbf5ed271b52db49f34d7e5399b1fa126268d4c50024cb22a1865342f16795` (3843 B)
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731`, `--agent-kwarg thinking=high`  
**Environment:** local Docker, `--no-delete`, absolute `--env-file /home/azureuser/agent_evals/ITSMBench/.env`, `-n 4`, `-k 3`  
**Bind-mount:** `/home/azureuser/agent_evals/wave21/pi-agent-home` → `/root/.pi/agent`  
**Tasks:** task-n-2, task-a-1, task-a-33, task-a-2 (4-task canary; **holdout not run**)  
**Wall time:** 32m 56s (`2026-08-23T11:02:11.934609` → `2026-08-23T11:35:07.693848`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented. No secrets printed.

## Paired-gate decision

**KEEP.**

Gate (task-specified; KEEP only if **all three** hold):

| Gate | Threshold | Measured | Pass? |
|---|---|---|---|
| exact-hash | ≥ 1/3 | **1/3** (`7FZcUS5` only) vs champ-pool **0/6** | YES |
| ALWAYS_PASS 6/6 → 0/3 | none | no champ ALWAYS_PASS fell to 0/3 (see scan below) | YES |
| mean V vs 0.731 | not drop > 0.05 (floor 0.681) | **0.7006** (Δ **−0.0304**) | YES |

This is a full 4-task canary of a **single-catalog** delivery (champion freeze-path plus a gated `APPEND_SYSTEM.md`). KEEP means the delivery survived the paired gate. It does **not** mutate the wave-14 champion home. A later promote decision is out of scope for this report.

Pass@1 **2/12 = 0.167** and Harbor `pass@2 = 0.333` are informational only. They are not the gate.

## Command family (print-config then run; no `--skills`)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-flash-0731 \
  --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
  --env-file /home/azureuser/agent_evals/ITSMBench/.env \
  --jobs-dir /home/azureuser/agent_evals/wave21/jobs \
  --job-name wave21-pi-canary-freezepath-append-endpoint \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave21/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p /home/azureuser/agent_evals/ITSMBench/tasks \
  -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
```

(workdir `/home/azureuser/agent_evals/ITSMBench`.) `--print-config` exited 0 and matched: model `openai/deepseek/deepseek-v4-flash-0731`, `thinking=high`, `n_attempts=3`, four canary tasks, mount source `/home/azureuser/agent_evals/wave21/pi-agent-home`, `delete=false`. `--skills` was not passed (every trial `result.json` has `config.agent.skills: []`). Harbor 0.21.0.

First launch from the wrong cwd failed with `FileNotFoundError: tasks` before creating a job dir. Relaunch from ITSMBench with absolute `-p /home/azureuser/agent_evals/ITSMBench/tasks` created the official job. No `rm` outside `/tmp`. Wave0–wave20 homes and `wave14/holdout` were not mutated.

## What changed (one catalog + gated append)

Champion JSON files **and** the byte-identical freeze-path skill were copied from `/home/azureuser/agent_evals/wave14/pi-agent-home` to `/home/azureuser/agent_evals/wave21/pi-agent-home`. A gated `APPEND_SYSTEM.md` was written. **`skills/endpoint-close/` was not copied and was not written.** The only skill on the wave21 home is `skills/freeze-path/SKILL.md`.

| File | SHA-256 |
|---|---|
| wave14 `auth.json` = wave21 `auth.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| wave14 `models-store.json` = wave21 `models-store.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| wave14 `models.json` = wave21 `models.json` | `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` |
| wave14 freeze-path = wave21 freeze-path | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` |
| wave21 `APPEND_SYSTEM.md` (new) | `a3dbf5ed271b52db49f34d7e5399b1fa126268d4c50024cb22a1865342f16795` |

APPEND is trigger-only: act only after a **fetched** record shows EDR / file-hash IOC / host network-containment. Hold takes precedence (LIT- / Legal Hold Review / `orgUnitPath` Legal Hold → follow freeze-path; do not close). Body transcribes the wave-20 KEEP write-path without naming a second skill: detection-closed (assign then `status=closed`), in-place IOC prevent (no duplicate POST, no delete seed), containment lift, MDM scan+resync, security reclassify, problem + exact-hash (hostname/malware in short_description, product-area endpoint security, literal sha256 in `root_cause`), asset audit, confirm writes, close only after confirm. No hard-coded ticket / incident / hash / serial / hostname ids. Grep of APPEND: `endpoint-close` = 0, `endpoint-rca` = 0.

There is **no** second skill, **no** `SYSTEM.md`, **no** `extensions/`, **no** `leftover_scan`, and **no** copy of wave-20 `skills/endpoint-close`.

## Validity gate

| Check | Result |
|---|---|
| 12 trial dirs with `verifier/reward.txt` | Yes (3 × each of task-a-1 / task-a-2 / task-a-33 / task-n-2); also 12/12 `verifier/ctrf.json` + trial `result.json` |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 12`, `n_retries: 0`; every trial `exception_info=None`) |
| Tokens | Job `n_input_tokens=25813089`, `n_cache_tokens=23902976`, `n_output_tokens=354811` (all non-zero). Per-trial input 623,260–3,921,435; output 10,614–58,846. **No 0-token trial.** |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `platform.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from `job.log` and trial logs. `job.log` Traceback = 0. Crude `\b401\b` hits (if any) are not real auth. **`has_401=False`.** |
| Bind-mount | wave21 home only (`source` `/home/azureuser/agent_evals/wave21/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (trial `result.json` `config.agent.skills: []`) |
| Champion freeze-path | still `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` on wave14 |
| Wave21 freeze-path | **same sha** (byte-identical copy) |
| Wave21 skills dir | **only** `freeze-path` |
| Wave0–wave20 / `wave14/holdout` | not mutated |

This is **not** a 401/0-token quarantine case. All 12 trials are live mock-state results.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Harbor meter USD | Leftover failed tests |
|---|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__7mD3da3` | 0 | 0.9500 | 19/20 | 1,791,804 / 17,563 | $1.761750 | `test_slack_account_deactivated` |
| task-a-1 | `task-a-1__CT4gRzL` | 0 | 0.0500 | 1/20 | 1,513,074 / 20,795 | $1.651620 | 19 freeze tests (catalog-miss; only `test_okta_mfa_factors_preserved` passed) |
| task-a-1 | `task-a-1__H4CBaSH` | 0 | 0.0500 | 1/20 | 623,260 / 10,614 | $0.794336 | same 19 freeze tests (catalog-miss) |
| task-a-2 | `task-a-2__7FZcUS5` | **1** | 1.0000 | 20/20 | 2,075,090 / 27,839 | $3.408124 | (none) |
| task-a-2 | `task-a-2__RZbsE4Z` | 0 | 0.7500 | 15/20 | 3,921,435 / 58,846 | $5.398923 | detection-assigned + problem cluster (malware RCA / exact-hash / product-area / short-desc) |
| task-a-2 | `task-a-2__cmjcLav` | 0 | 0.8000 | 16/20 | 2,047,898 / 23,088 | $3.039778 | problem cluster (malware RCA / exact-hash / product-area / short-desc) |
| task-a-33 | `task-a-33__Fh3fEBH` | 0 | 0.7941 | 27/34 | 1,698,658 / 21,136 | $1.691210 | onedrive + helios/eng owners + diego/theo deploy keys + elena app-reg + viktor SP |
| task-a-33 | `task-a-33__K6ckCwK` | 0 | 0.9706 | 33/34 | 2,788,603 / 26,224 | $3.381383 | `test_onedrive_departed_share_grants_removed` only |
| task-a-33 | `task-a-33__XWRSDQN` | 0 | 0.4706 | 16/34 | 958,661 / 18,891 | $1.430563 | 18 leftover-identity (Priya/Diego/Sana/Theo/Elena/Viktor sharepoint + deploy keys + owners + app-reg + SP + onedrive) |
| task-n-2 | `task-n-2__JMyTKgg` | **1** | 1.0000 | 21/21 | 3,209,453 / 48,083 | $3.630043 | (none) |
| task-n-2 | `task-n-2__ZtACZUY` | 0 | 0.9048 | 19/21 | 3,267,127 / 31,600 | $2.876723 | `test_payments_backend_02_undrained`, `test_internal_api_02_undrained` |
| task-n-2 | `task-n-2__yjtUYpa` | 0 | 0.6667 | 14/21 | 1,918,026 / 50,132 | $3.081930 | nacl edge egress, backend_02 undrained, route blackhole, nacl dependency ingress, shared nacl inbound, internal_api_02 undrained, legacy DNS |

Job `result.json` `reward_stats`: `1.0` = `{task-n-2__JMyTKgg, task-a-2__7FZcUS5}`, `0.0` = the other ten. Mean reward **0.1667**. Harbor-computed `pass_at_k` for this job: `pass@2 = 0.333`. `stats.cost_usd = 32.146383` (= sum of 12 trial Harbor meters; **not** the OpenRouter bill — see Cost correction). Harbor-internal `C_all = $2.678865` (`32.146383 / 12`). OpenRouter-list reconstruction of the same tokens: job **~$0.296**, `C_all` **~$0.025**.

## Cost correction (Harbor meter ≠ OpenRouter card)

Harbor `stats.cost_usd` is **not** OpenRouter’s published price for this model. Pi had no price row for `openai/deepseek/deepseek-v4-flash-0731`, so it billed a GPT-4-class fallback and Harbor summed those per-message `usage.cost.total` values (`harbor/agents/installed/pi.py`). The 12 trial meters invert **exactly** (max residual ~1e-15) to:

`Harbor $ = $5.00/M × uncached + $0.50/M × cache-read + $30.00/M × output`

where uncached = `n_input_tokens − n_cache_tokens` (Harbor’s `n_input_tokens` already includes cache).

The job actually routed through OpenRouter (`models.json` `providers.openai.baseUrl = https://openrouter.ai/api/v1`). OpenRouter’s published card for `deepseek/deepseek-v4-flash-0731` is **$0.04 / $0.008 / $0.08** per 1M (input / cache-read / output). Same official token counts, two invoices:

| Component | Tokens | Harbor/Pi fallback | Harbor $ | OpenRouter card | OR $ |
|---|---:|---:|---:|---:|---:|
| uncached input | 1,910,113 | $5.00 / 1M | 9.551 | **$0.04 / 1M** | **0.076** |
| cache read | 23,902,976 | $0.50 / 1M | 11.951 | **$0.008 / 1M** | **0.191** |
| output | 354,811 | $30.00 / 1M | 10.644 | **$0.08 / 1M** | **0.028** |
| **job total** | | | **32.146** | | **0.296** |
| per-trial mean (`C_all`) | | | 2.679 | | **0.025** |

Cache-unaware OR bill (all 25,813,089 input at $0.04 + output at $0.08) would be **~$1.06**. Cache-aware is the right reconstruction: 92.6% of input was cache-read.

Per-trial OpenRouter-list reconstruction (same formula; not an invoice):

| Trial | unc / cache / out | Harbor meter | OR-list $ |
|---|---|---:|---:|
| `7mD3da3` | 75,324 / 1,716,480 / 17,563 | 1.762 | 0.018 |
| `CT4gRzL` | 60,274 / 1,452,800 / 20,795 | 1.652 | 0.016 |
| `H4CBaSH` | 36,508 / 586,752 / 10,614 | 0.794 | 0.007 |
| `7FZcUS5` | 341,202 / 1,733,888 / 27,839 | 3.408 | 0.030 |
| `RZbsE4Z` | 371,739 / 3,549,696 / 58,846 | 5.399 | 0.048 |
| `cmjcLav` | 294,042 / 1,753,856 / 23,088 | 3.040 | 0.028 |
| `Fh3fEBH` | 46,178 / 1,652,480 / 21,136 | 1.691 | 0.017 |
| `K6ckCwK` | 266,747 / 2,521,856 / 26,224 | 3.381 | 0.033 |
| `XWRSDQN` | 85,445 / 873,216 / 18,891 | 1.431 | 0.012 |
| `JMyTKgg` | 129,517 / 3,079,936 / 48,083 | 3.630 | 0.034 |
| `ZtACZUY` | 65,591 / 3,201,536 / 31,600 | 2.877 | 0.031 |
| `yjtUYpa` | 137,546 / 1,780,480 / 50,132 | 3.082 | 0.024 |
| **sum** | **1,910,113 / 23,902,976 / 354,811** | **32.146** | **0.296** |

Use Harbor $ only for **relative** wave-to-wave Harbor comparisons (every DeepSeek-v4-flash canary used the same wrong table). Treat **~$0.30 / ~$0.025** as the OpenRouter-list bill estimate. This is published rates × Harbor token counts, not a pulled OpenRouter invoice.

## Clause 1 — exact-hash vs champ 0/6

| Test | 7FZcUS5 | RZbsE4Z | cmjcLav | Wave-21 | Champ pool (w14+w18) |
|---|---|---|---|---|---|
| `test_problem_root_cause_names_exact_hash` | **P** | F | F | **1/3** | **0/6 ALWAYS_FAIL** |
| `test_problem_root_cause_names_malware` | P | F | F | 1/3 | 1/6 MAJORITY_FAIL |
| `test_problem_product_area_endpoint_security` | P | F | F | 1/3 | 2/6 MAJORITY_FAIL |
| `test_problem_short_description_names_malware` | P | F | F | 1/3 | 2/6 MAJORITY_FAIL |
| `test_crowdstrike_detection_closed` | P | P | P | **3/3** | 6/6 ALWAYS_PASS (w15 leftover was 0/3) |
| `test_crowdstrike_malware_hash_blocked` | P | P | P | **3/3** | 6/6 ALWAYS_PASS (w16 leftover) |
| `test_malware_ioc_escalated_in_place` | P | P | P | **3/3** | 6/6 ALWAYS_PASS (w16 leftover) |
| `test_crowdstrike_detection_assigned_to_responder` | P | F | P | 2/3 | 4/6 OCCASIONAL_FAIL |

Exact-hash **1/3 ≥ 1/3**. Complementary leftovers from earlier endpoint skills did not return: detection-closed / hash-blocked / IOC-in-place held **3/3**. The two misses dropped the ServiceNow problem-record cluster (same pattern as wave-20 `NZoiJBn`), not the close-path steps. `RZbsE4Z` also missed detection-assigned (OCCASIONAL on champ, not ALWAYS_PASS).

## Clause 2 — ALWAYS_PASS 6/6 → 0/3 scan

Champion ALWAYS_PASS counts (w14+w18, `/home/azureuser/agent_evals/wave18/pertest_noise_floor.md`): a-1 = **0**, a-2 = **7**, a-33 = **16**, n-2 = **14**.

| Task | Champ ALWAYS_PASS | Wave-21 0/3 among those? | Evidence |
|---|---|---|---|
| task-a-1 | 0 tests | n/a | Slack `test_slack_account_deactivated` is 0/3 here but champ tag is MAJORITY_FAIL **2/6**, not ALWAYS_PASS |
| task-a-2 | 7 tests | **no** | all 7 held **3/3**: detection-closed, hash-blocked, close-notes-malware, incident-inactive, device-not-wiped, ioc-in-place, device-still-compliant |
| task-a-33 | 16 tests | **no** | `K6ckCwK` is 33/34 (only onedrive failed). Onedrive is champ OCCASIONAL **4/6**, not ALWAYS_PASS. Every a-33 ALWAYS_PASS is 3/3 |
| task-n-2 | 14 tests | **no** | `JMyTKgg` is 21/21. Dips that are **not** 0/3: `test_payments_backend_02_undrained` 1/3 (champ 6/6), `test_payments_nacl_edge_return_egress` 2/3, `test_payments_nacl_dependency_return_ingress` 2/3, `test_payments_route_to_shared_not_blackholed` 2/3. Kill rule is 6/6 → **0/3** only |

The only 0/3 tests on this job are:

- `test_slack_account_deactivated` (a-1) — champ MAJORITY_FAIL 2/6
- `test_onedrive_departed_share_grants_removed` (a-33) — champ OCCASIONAL 4/6

Neither is a champ ALWAYS_PASS. **Clause 2 PASS.**

## Clause 3 — mean V vs 0.731

Per-trial V from CTRF passed/tests (same 12 numbers as the table):

`0.95, 0.05, 0.05, 1.00, 0.75, 0.80, 0.7941176470588235, 0.9705882352941176, 0.47058823529411764, 1.00, 0.9047619047619048, 0.6666666666666666`

Mean V = **0.70056**. Champ-pool mean V = **0.731**. Drop = **0.0304 < 0.05**. Floor = 0.681. **Clause 3 PASS.**

| Task | Wave-21 mean V | Champ-pool V (w14+w18) | Δ | Closes |
|---|---|---|---|---|
| task-a-1 | 0.3500 | 0.500 | −0.150 | 0/3 vs 2/6 |
| task-a-2 | **0.8500** | 0.642 | **+0.208** | 1/3 vs 0/6 |
| task-a-33 | 0.7451 | 0.877 | −0.132 | 0/3 vs 4/6 |
| task-n-2 | 0.8571 | 0.905 | −0.048 | 1/3 vs 2/6 |
| **overall** | **0.7006** | **0.731** | **−0.030** | 2/12 vs 8/24 |

a-2 is the intended lift (exact-hash + problem cluster on the close). a-1 drop is the known freeze-path load coin-flip (`CT4gRzL` / `H4CBaSH` 1/20 catalog-miss; `7mD3da3` held 19/20 with only Slack leftover — same shape as w18 a-1 V 0.333). a-33 / n-2 leftovers are the same OCCASIONAL leftover-identity / undrain-DNS cluster as the champ pool; they did not become a two-catalog wipe (wave-15 failure mode).

## a-33 / n-2 leftover notes

**a-33 leftover-identity (champ OCCASIONAL 4–5/6, not ALWAYS_PASS):**

| Test | Fh3fEBH | K6ckCwK | XWRSDQN | Wave-21 | Champ |
|---|---|---|---|---|---|
| `test_onedrive_departed_share_grants_removed` | F | F | F | 0/3 | 4/6 OCCASIONAL |
| deploy-keys / app-reg / SP / site-owners (6 tests) | F | P | F | 1/3 | 4/6 OCCASIONAL |
| sharepoint removals (11 tests) | P | P | F | 2/3 | 5/6 OCCASIONAL |
| all other a-33 tests (16 ALWAYS_PASS) | P | P | P | **3/3** | 6/6 |

`XWRSDQN` (16/34) is a leftover-identity miss, not an ALWAYS_PASS break. `K6ckCwK` (33/34) proves the 16 ALWAYS_PASS held. Onedrive 0/3 is a known unstable leftover, not a new ALWAYS_FAIL invented by APPEND.

**n-2 leftovers:**

| Test | JMyTKgg | ZtACZUY | yjtUYpa | Wave-21 | Champ |
|---|---|---|---|---|---|
| `test_internal_api_02_undrained` | P | F | F | 1/3 | 3/6 OCCASIONAL |
| `test_legacy_dns_record_cleaned` | P | P | F | 2/3 | 3/6 OCCASIONAL |
| `test_shared_nacl_allows_payments_inbound` | P | P | F | 2/3 | 4/6 OCCASIONAL |
| `test_payments_backend_02_undrained` | P | F | F | 1/3 | **6/6** (dipped, not 0/3) |
| `test_payments_nacl_edge_return_egress` | P | P | F | 2/3 | **6/6** (dipped, not 0/3) |
| `test_payments_nacl_dependency_return_ingress` | P | P | F | 2/3 | **6/6** (dipped, not 0/3) |
| `test_payments_route_to_shared_not_blackholed` | P | P | F | 2/3 | **6/6** (dipped, not 0/3) |
| all other n-2 tests | P | P | P | **3/3** | 6/6 or 5/6 |

`yjtUYpa` (14/21) is the noisy undrain/NACL/DNS cluster. `JMyTKgg` 21/21 proves the 14 ALWAYS_PASS can still close on this home. Wave-15 two-catalog tax (a-33 0/3 **and** n-2 0/3 with ALWAYS_PASS wiped) did **not** recur.

## Skill / append routing (`agent/pi.txt`)

Catalog name = `freeze-path`. Body-load anchor = `Record-backed freeze`. APPEND title = `Gated endpoint write-path`. Forbidden names `endpoint-close` / `endpoint-rca` = **0** on every trial.

| Trial | freeze-path | Record-backed freeze | exact-hash phrase | detection closed | in-place IOC | endpoint-close / endpoint-rca |
|---|---|---|---|---|---|---|
| `7mD3da3` (a-1 19/20) | 120 | **5** | 0 | 0 | 0 | 0 / 0 |
| `CT4gRzL` (a-1 1/20) | 18 | **0** | 0 | 0 | 0 | 0 / 0 |
| `H4CBaSH` (a-1 1/20) | 36 | **0** | 0 | 0 | 0 | 0 / 0 |
| `7FZcUS5` (a-2 20/20) | 18 | 0 | **144** | 45 | 15 | 0 / 0 |
| `RZbsE4Z` (a-2 15/20) | 24 | 0 | **150** | 51 | 36 | 0 / 0 |
| `cmjcLav` (a-2 16/20) | 18 | 0 | **93** | 36 | 6 | 0 / 0 |
| `Fh3fEBH` (a-33 27/34) | 18 | 0 | 0 | 0 | 0 | 0 / 0 |
| `K6ckCwK` (a-33 33/34) | 6 | 0 | 0 | 0 | 0 | 0 / 0 |
| `XWRSDQN` (a-33 16/34) | 168 | **5** | 0 | 0 | 0 | 0 / 0 |
| `JMyTKgg` (n-2 21/21) | 0 | 0 | 0 | 0 | 0 | 0 / 0 |
| `ZtACZUY` (n-2 19/21) | 0 | 0 | 0 | 0 | 0 | 0 / 0 |
| `yjtUYpa` (n-2 14/21) | 0 | 0 | 0 | 0 | 0 | 0 / 0 |

a-1 catalog-miss (`CT4gRzL`, `H4CBaSH`) is the same freeze-path load coin-flip as w18: catalog name appears, body does not. `7mD3da3` loaded the freeze body and held 19/20 (Slack leftover only). a-2 write-path phrases appear on all three attempts; the 15/20 and 16/20 misses are problem-record write misses, not a catalog-only miss. n-2 never loaded freeze-path (correct — no hold record). `XWRSDQN` loaded freeze-path body on an offboarding ticket and still missed leftover-identity; that is a misfire, not a two-catalog wipe.

## Integrity (champion unmodified; single catalog on wave21)

| Check | Result |
|---|---|
| wave14 freeze-path sha | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` (unchanged; mtime still 2026-08-19 14:33:03) |
| wave21 freeze-path sha | **same** (byte-identical) |
| wave14 home files | still only `auth.json`, `models-store.json`, `models.json`, `skills/freeze-path/SKILL.md` |
| wave21 skills | **only** `freeze-path` |
| wave21 `endpoint-close` | **absent** |
| wave20 endpoint-close sha | still `b8ab97cf8663ba115fd894b06cd3006ca2d9d27fd47ad21f0ce1a1c386709f01` (home not mutated) |
| wave0–wave20 / `wave14/holdout` | not mutated |
| secrets in this report | none |

## What KEEP does **not** mean

- Do **not** treat Pass@1 2/12 or Pass@3 0/4 as the scored claim. The scored claim is the three-clause paired gate above.
- Do **not** restack a second catalog skill onto this home. Wave-15 already showed that tax kills a-33/n-2.
- Do **not** rewrite APPEND or relaunch this job to chase the a-1 catalog-miss or the a-33 onedrive 0/3 — both are champ-pool unstable leftovers, not new ALWAYS_FAIL.
- Champion **files** stay at `/home/azureuser/agent_evals/wave14/pi-agent-home`. KEEP here is the canary verdict for this delivery, not an automatic swap of the champion pointer.
- Do **not** treat Harbor `stats.cost_usd = $32.15` or `C_all = $2.68` as the OpenRouter bill. Those are Pi’s unknown-model fallback ($5 / $0.50 / $30 per 1M). OpenRouter-list reconstruction of the same tokens is **~$0.30** job / **~$0.025** per trial.

## Next (not this job)

Eligible follow-ons, if any: promote-or-not decision for the wave-21 home vs wave-14; or park and run a different axis (E-B model swap / E-F noise floor). Do not add `skills/endpoint-close`. Do not edit freeze-path. Do not run holdout from this report.

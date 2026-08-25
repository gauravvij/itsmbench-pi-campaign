# ITSMBench wave-22 — Axis D description-only read trigger (single-catalog canary)

**Job (valid):** `/home/azureuser/agent_evals/wave22/jobs/wave22-pi-canary-freezepath-desc-readtrigger`  
**Job result:** `/home/azureuser/agent_evals/wave22/jobs/wave22-pi-canary-freezepath-desc-readtrigger/result.json`  
**Job id:** `af6e5826-a1fb-40cb-9394-c0bbd21fe980`  
**Config:** `/home/azureuser/agent_evals/wave22/jobs/wave22-pi-canary-freezepath-desc-readtrigger/config.json`  
**Job log:** `/home/azureuser/agent_evals/wave22/jobs/wave22-pi-canary-freezepath-desc-readtrigger/job.log`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave14/pi-agent-home/skills/freeze-path/SKILL.md` sha256 `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`  
**Lever (description-only; freeze-path **body** byte-identical; APPEND byte-identical to wave-21 KEEP; no second skill):**
- `/home/azureuser/agent_evals/wave22/pi-agent-home/skills/freeze-path/SKILL.md` full-file sha256 `67848ba8bf17562a0188c3d600371aa94c696c9088947600eb61d1909c379fcb` (2980 B; **differs** from champion `2f2b976f…`)
- freeze-path **body-only** (after second `---`) sha256 `891021252ddeb253f77bd83738a622acaa3f0b12cd9e67c05a7a65e51701ad8d` (2382 B; **identical** to wave-14 / wave-21)
- `/home/azureuser/agent_evals/wave22/pi-agent-home/APPEND_SYSTEM.md` sha256 `a3dbf5ed271b52db49f34d7e5399b1fa126268d4c50024cb22a1865342f16795` (3843 B; **identical** to wave-21 KEEP)
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731`, `--agent-kwarg thinking=high`  
**Environment:** local Docker, `--no-delete`, absolute `--env-file /home/azureuser/agent_evals/ITSMBench/.env`, `-n 4`, `-k 3`  
**Bind-mount:** `/home/azureuser/agent_evals/wave22/pi-agent-home` → `/root/.pi/agent`  
**Tasks:** task-n-2, task-a-1, task-a-33, task-a-2 (4-task canary; **holdout not run**)  
**Wall time:** 42m 53s (`2026-08-24T10:49:05.371815` → `2026-08-24T11:31:58.220752`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented. No secrets printed.

## Paired-gate decision

**DISCARD.**

Gate (task-specified; KEEP only if **all three** hold):

| Gate | Threshold | Measured | Pass? |
|---|---|---|---|
| exact-hash | ≥ 1/3 | **2/3** (`fadURZy`, `vDzDAMM`) vs champ-pool **0/6** | YES |
| ALWAYS_PASS 6/6 → 0/3 | none | no champ ALWAYS_PASS fell to 0/3 (see scan below) | YES |
| mean V vs 0.731 | not drop > 0.05 (floor 0.681) | **0.6604** (Δ **−0.0706**) | **NO** |

KEEP requires all three. Clause 3 fails (mean V 0.6604 is below the 0.681 floor). This is a full 4-task canary of a **single-catalog** delivery (champion freeze-path **body** plus wave-21 gated APPEND, with only the YAML `description` changed). DISCARD means this description-only lever does **not** replace the wave-21 KEEP home and does **not** mutate the wave-14 champion. Champion pointer stays wave-14.

Pass@1 **2/12 = 0.167** and Harbor `pass@2 = 0.333` are informational only. They are not the gate.

## Command family (print-config then run; no `--skills`)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-flash-0731 \
  --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
  --env-file /home/azureuser/agent_evals/ITSMBench/.env \
  --jobs-dir /home/azureuser/agent_evals/wave22/jobs \
  --job-name wave22-pi-canary-freezepath-desc-readtrigger \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave22/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p /home/azureuser/agent_evals/ITSMBench/tasks \
  -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
```

(workdir `/home/azureuser/agent_evals/ITSMBench`.) `--print-config` exited 0 and matched: model `openai/deepseek/deepseek-v4-flash-0731`, `thinking=high`, `n_attempts=3`, four canary tasks, mount source `/home/azureuser/agent_evals/wave22/pi-agent-home`, `delete=false`. `--skills` was not passed (every trial `result.json` has `config.agent.skills: []`). Harbor 0.21.0.

First of four concurrent attempts (`task-a-1__GsZXizN`) completed with `reward.txt`, tokens 832,718 / 11,745, `exception_info=None`, and real-auth scan empty. Remaining 11 then finished. No `rm` outside `/tmp`. Wave0–wave21 homes and `wave14/holdout` were not mutated. Job was not wiped or relaunched.

## What changed (frontmatter only)

Champion JSON trio **and** freeze-path `SKILL.md` were copied from `/home/azureuser/agent_evals/wave14/pi-agent-home` to `/home/azureuser/agent_evals/wave22/pi-agent-home`. Wave-21 `APPEND_SYSTEM.md` was copied byte-for-byte. **`skills/endpoint-close/` was not copied and was not written.** The only skill on the wave22 home is `skills/freeze-path/SKILL.md`.

Then **only** the YAML `description` was edited. The body after the second `---` was not touched.

**Champion description (wave-14 / wave-21):**

```
Decide from fetched records first. Do not read this skill to decide hold.
If no hold record exists, ignore this skill.
```

**Axis D description (wave-22):**

```
Decide from fetched records first. After a fetched record confirms a hold,
read this skill before any account, data, or close action. If no hold
record exists, ignore this skill.
```

The only semantic change: drop `Do not read this skill to decide hold.` and add `After a fetched record confirms a hold, read this skill before any account, data, or close action.` Anti-blurb / decide-from-fetched-records / ignore-if-no-hold clauses stay. The body’s own “Do not read this skill to decide hold” lines stay (body is frozen).

| File | SHA-256 |
|---|---|
| wave14 `auth.json` = wave22 `auth.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| wave14 `models-store.json` = wave22 `models-store.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| wave14 `models.json` = wave22 `models.json` | `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` |
| wave14 freeze-path **full file** (champion, unchanged) | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` |
| wave22 freeze-path **full file** (description-only edit) | `67848ba8bf17562a0188c3d600371aa94c696c9088947600eb61d1909c379fcb` |
| wave14 / wave21 / wave22 freeze-path **body only** | `891021252ddeb253f77bd83738a622acaa3f0b12cd9e67c05a7a65e51701ad8d` |
| wave21 APPEND = wave22 APPEND | `a3dbf5ed271b52db49f34d7e5399b1fa126268d4c50024cb22a1865342f16795` |

APPEND is unchanged from wave-21 KEEP: trigger-only gated endpoint write-path (detection-closed, in-place IOC prevent, exact-hash problem record). Grep of wave22 APPEND: `endpoint-close` = 0, `endpoint-rca` = 0. There is **no** second skill, **no** `SYSTEM.md`, **no** `extensions/`.

## Validity gate

| Check | Result |
|---|---|
| 12 trial dirs with `verifier/reward.txt` | Yes (3 × each of task-a-1 / task-a-2 / task-a-33 / task-n-2); also 12/12 `verifier/ctrf.json` + trial `result.json` |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 12`, `n_retries: 0`; every trial `exception_info=None`) |
| Tokens | Job `n_input_tokens=23734992`, `n_cache_tokens=19198332`, `n_output_tokens=361014` (all non-zero). Per-trial input 446,496–4,417,950; output 11,190–74,754. **No 0-token trial.** |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `platform.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from `job.log` and all 12 `trial.log` / `result.json`. **`has_401=False`.** Crude `\b401\b` in `pi.txt` is not real auth. |
| Bind-mount | wave22 home only (`source` `/home/azureuser/agent_evals/wave22/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (trial `result.json` `config.agent.skills: []`) |
| Champion freeze-path | still `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` on wave14 |
| Wave22 freeze-path body | still `891021252ddeb253f77bd83738a622acaa3f0b12cd9e67c05a7a65e51701ad8d` |
| Wave22 / wave21 APPEND | still `a3dbf5ed271b52db49f34d7e5399b1fa126268d4c50024cb22a1865342f16795` |
| Wave22 skills dir | **only** `freeze-path` |
| Wave20 skills dir | still **only** `endpoint-close` (not copied) |
| Wave0–wave21 / `wave14/holdout` | not mutated |

This is **not** a 401/0-token quarantine case. All 12 trials are live mock-state results.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Harbor meter USD | Leftover failed tests |
|---|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__GsZXizN` | 0 | 0.0500 | 1/20 | 832,718 / 11,745 | $1.565668 | 19 freeze tests (catalog-miss; only `test_okta_mfa_factors_preserved` passed) |
| task-a-1 | `task-a-1__vDbuamh` | **1** | 1.0000 | 20/20 | 1,397,983 / 16,518 | $2.220815 | (none) |
| task-a-1 | `task-a-1__wTrxGTb` | 0 | 0.0500 | 1/20 | 446,496 / 11,190 | $1.084404 | same 19 freeze tests (catalog-miss) |
| task-a-2 | `task-a-2__fadURZy` | 0 | 0.9000 | 18/20 | 1,871,199 / 18,372 | $1.747539 | detection-assigned + `test_incident_state_closed` |
| task-a-2 | `task-a-2__g5kp94e` | 0 | 0.8000 | 16/20 | 3,207,734 / 35,913 | $5.209528 | problem cluster (malware RCA / exact-hash / product-area / short-desc) |
| task-a-2 | `task-a-2__vDzDAMM` | 0 | 0.9500 | 19/20 | 1,969,096 / 25,673 | $3.087350 | `test_crowdstrike_detection_assigned_to_responder` only |
| task-a-33 | `task-a-33__DEN7Bdk` | 0 | 0.0000 | 0/34 | 760,549 / 14,801 | $2.091864 | all 34 leftover-identity + close tests |
| task-a-33 | `task-a-33__JrQ29WP` | **1** | 1.0000 | 34/34 | 2,094,589 / 28,467 | $3.334730 | (none) |
| task-a-33 | `task-a-33__Xsbbh3P` | 0 | 0.7941 | 27/34 | 2,156,831 / 30,805 | $4.491025 | onedrive + helios/eng owners + diego/theo deploy keys + elena app-reg + viktor SP |
| task-n-2 | `task-n-2__3YewxW5` | 0 | 0.7619 | 16/21 | 4,417,950 / 74,754 | $8.583662 | backend_02 undrained, route blackhole, internal_api_02 undrained, legacy DNS, dead backend |
| task-n-2 | `task-n-2__duREDFH` | 0 | 0.7619 | 16/21 | 2,807,878 / 49,388 | $5.579360 | nacl edge egress, nacl dependency ingress, shared nacl inbound, internal_api_02 undrained, legacy DNS |
| task-n-2 | `task-n-2__pT6T22y` | 0 | 0.8571 | 18/21 | 1,771,969 / 43,388 | $4.116941 | internal_api_02 undrained, legacy DNS, dead backend |

Job `result.json` `reward_stats`: `1.0` = `{task-a-33__JrQ29WP, task-a-1__vDbuamh}`, `0.0` = the other ten. Mean reward **0.1667**. Harbor-computed `pass_at_k` for this job: `pass@2 = 0.333`. `stats.cost_usd = 43.112886` (= sum of 12 trial Harbor meters; **not** the OpenRouter bill — see Cost correction). Harbor-internal `C_all = $3.592741` (`43.112886 / 12`). OpenRouter-list reconstruction of the same tokens: job **~$0.364**, `C_all` **~$0.030**.

## Cost correction (Harbor meter ≠ OpenRouter card)

Harbor `stats.cost_usd` is **not** OpenRouter’s published price for this model. Pi had no price row for `openai/deepseek/deepseek-v4-flash-0731`, so it billed a GPT-4-class fallback and Harbor summed those per-message `usage.cost.total` values. The 12 trial meters invert **exactly** to:

`Harbor $ = $5.00/M × uncached + $0.50/M × cache-read + $30.00/M × output`

where uncached = `n_input_tokens − n_cache_tokens` (Harbor’s `n_input_tokens` already includes cache).

The job actually routed through OpenRouter (`models.json` `providers.openai.baseUrl = https://openrouter.ai/api/v1`). OpenRouter’s published card for `deepseek/deepseek-v4-flash-0731` is **$0.04 / $0.008 / $0.08** per 1M (input / cache-read / output). Same official token counts, two invoices:

| Component | Tokens | Harbor/Pi fallback | Harbor $ | OpenRouter card | OR $ |
|---|---:|---:|---:|---:|---:|
| uncached input | 4,536,660 | $5.00 / 1M | 22.683 | **$0.04 / 1M** | **0.181** |
| cache read | 19,198,332 | $0.50 / 1M | 9.599 | **$0.008 / 1M** | **0.154** |
| output | 361,014 | $30.00 / 1M | 10.830 | **$0.08 / 1M** | **0.029** |
| **job total** | | | **43.113** | | **0.364** |
| per-trial mean (`C_all`) | | | 3.593 | | **0.030** |

Cache-unaware OR bill (all 23,734,992 input at $0.04 + output at $0.08) would be **~$0.978**. Cache-aware is the right reconstruction: 80.9% of input was cache-read.

Per-trial OpenRouter-list reconstruction (same formula; not an invoice):

| Trial | unc / cache / out | Harbor meter | OR-list $ |
|---|---|---:|---:|
| `GsZXizN` | 177,102 / 655,616 / 11,745 | 1.566 | 0.013 |
| `vDbuamh` | 228,063 / 1,169,920 / 16,518 | 2.221 | 0.020 |
| `wTrxGTb` | 116,768 / 329,728 / 11,190 | 1.084 | 0.008 |
| `fadURZy` | 57,951 / 1,813,248 / 18,372 | 1.748 | 0.018 |
| `g5kp94e` | 561,838 / 2,645,896 / 35,913 | 5.210 | 0.047 |
| `vDzDAMM` | 296,136 / 1,672,960 / 25,673 | 3.087 | 0.027 |
| `DEN7Bdk` | 281,680 / 478,869 / 14,801 | 2.092 | 0.016 |
| `JrQ29WP` | 318,539 / 1,776,050 / 28,467 | 3.335 | 0.029 |
| `Xsbbh3P` | 552,991 / 1,603,840 / 30,805 | 4.491 | 0.037 |
| `3YewxW5` | 918,237 / 3,499,713 / 74,754 | 8.584 | 0.071 |
| `duREDFH` | 598,618 / 2,209,260 / 49,388 | 5.579 | 0.046 |
| `pT6T22y` | 428,737 / 1,343,232 / 43,388 | 4.117 | 0.031 |
| **sum** | **4,536,660 / 19,198,332 / 361,014** | **43.113** | **0.364** |

Use Harbor $ only for **relative** wave-to-wave Harbor comparisons (every DeepSeek-v4-flash canary used the same wrong table). Treat **~$0.36 / ~$0.030** as the OpenRouter-list bill estimate. This is published rates × Harbor token counts, not a pulled OpenRouter invoice. Do **not** treat Harbor `stats.cost_usd = $43.11` or `C_all = $3.59` as the bill.

## Clause 1 — exact-hash vs champ 0/6

| Test | fadURZy | g5kp94e | vDzDAMM | Wave-22 | Champ pool (w14+w18) |
|---|---|---|---|---|---|
| `test_problem_root_cause_names_exact_hash` | **P** | F | **P** | **2/3** | **0/6 ALWAYS_FAIL** |
| `test_problem_root_cause_names_malware` | P | F | P | 2/3 | 1/6 MAJORITY_FAIL |
| `test_problem_product_area_endpoint_security` | P | F | P | 2/3 | 2/6 MAJORITY_FAIL |
| `test_problem_short_description_names_malware` | P | F | P | 2/3 | 2/6 MAJORITY_FAIL |
| `test_crowdstrike_detection_closed` | P | P | P | **3/3** | 6/6 ALWAYS_PASS |
| `test_crowdstrike_malware_hash_blocked` | P | P | P | **3/3** | 6/6 ALWAYS_PASS |
| `test_malware_ioc_escalated_in_place` | P | P | P | **3/3** | 6/6 ALWAYS_PASS |
| `test_crowdstrike_detection_assigned_to_responder` | F | P | F | 1/3 | 4/6 OCCASIONAL_FAIL |
| `test_incident_state_closed` | F | P | P | 2/3 | 2/6 MAJORITY_FAIL |

Exact-hash **2/3 ≥ 1/3**. Complementary leftovers from earlier endpoint skills did not return: detection-closed / hash-blocked / IOC-in-place held **3/3**. The one miss (`g5kp94e`) dropped the ServiceNow problem-record cluster — same pattern as wave-21 `RZbsE4Z` / `cmjcLav`, not a close-path wipe. Detection-assigned is champ OCCASIONAL 4/6, not ALWAYS_PASS.

## Clause 2 — ALWAYS_PASS 6/6 → 0/3 scan

Champion ALWAYS_PASS counts (w14+w18, `/home/azureuser/agent_evals/wave18/pertest_noise_floor.md`): a-1 = **0**, a-2 = **7**, a-33 = **16**, n-2 = **14**.

| Task | Champ ALWAYS_PASS | Wave-22 0/3 among those? | Evidence |
|---|---|---|---|
| task-a-1 | 0 tests | n/a | freeze block is 1/3 here (body-load coin-flip). Slack is 1/3 but champ tag is MAJORITY_FAIL **2/6**, not ALWAYS_PASS |
| task-a-2 | 7 tests | **no** | all 7 held **3/3**: detection-closed, hash-blocked, close-notes-malware, incident-inactive, device-not-wiped, ioc-in-place, device-still-compliant |
| task-a-33 | 16 tests | **no** | `JrQ29WP` is 34/34. `Xsbbh3P` is 27/34 (only the 7 leftover-identity OCCASIONAL 4/6 tests failed). Every a-33 ALWAYS_PASS is **2/3** (held on JrQ29WP + Xsbbh3P). `DEN7Bdk` 0/34 is a leftover-identity wipe on one trial, not 0/3 on an ALWAYS_PASS test |
| task-n-2 | 14 tests | **no** | 0/3 tests are `test_internal_api_02_undrained` and `test_legacy_dns_record_cleaned` — both champ OCCASIONAL **3/6**, not ALWAYS_PASS. Payments ALWAYS_PASS tests dipped to **2/3**, not 0/3 |

The only 0/3 tests on this job are:

- `test_internal_api_02_undrained` (n-2) — champ OCCASIONAL 3/6
- `test_legacy_dns_record_cleaned` (n-2) — champ OCCASIONAL 3/6

Neither is a champ ALWAYS_PASS. **Clause 2 PASS.**

## Clause 3 — mean V vs 0.731

Per-trial V from CTRF passed/tests (same 12 numbers as the table):

`0.05, 1.00, 0.05, 0.90, 0.80, 0.95, 0.00, 1.00, 0.7941176470588235, 0.7619047619047619, 0.7619047619047619, 0.8571428571428571`

Mean V = **0.66042**. Champ-pool mean V = **0.731**. Drop = **0.07058 > 0.05**. Floor = 0.681. **Clause 3 FAIL.**

| Task | Wave-22 mean V | Champ-pool V (w14+w18) | Δ | Closes |
|---|---|---|---|---|
| task-a-1 | 0.3667 | 0.500 | −0.133 | 1/3 vs 2/6 |
| task-a-2 | **0.8833** | 0.642 | **+0.241** | 0/3 vs 0/6 |
| task-a-33 | 0.5980 | 0.877 | −0.279 | 1/3 vs 4/6 |
| task-n-2 | 0.7937 | 0.905 | −0.111 | 0/3 vs 2/6 |
| **overall** | **0.6604** | **0.731** | **−0.071** | 2/12 vs 8/24 |

a-2 is still a lift vs champ (exact-hash 2/3, mean V +0.241) — APPEND delivery held. The V kill is **not** a-2. It is the combination of:

- a-1 still a 1/3 body-load coin-flip (`GsZXizN` / `wTrxGTb` 1/20 catalog-miss; `vDbuamh` 20/20) — Axis D did not move this needle vs wave-21 1/3
- a-33 `DEN7Bdk` **0/34** (full leftover-identity wipe on one trial) plus `Xsbbh3P` 27/34 — task mean V 0.598 vs champ 0.877
- n-2 no 21/21 close; undrain/DNS 0/3 (champ OCCASIONAL, but they drag V)

Wave-21 KEEP mean V was 0.7006 (Δ −0.030). Wave-22 0.6604 is below the floor. That is the discard.

## a-1 body-load diagnostic (Axis D lever; **not** the KEEP gate)

Catalog name = `freeze-path`. Body-load anchor = `Record-backed freeze` (first heading of the frozen body). Wave-21 was **1/3**. Lever “worked” if ≥2/3 a-1 trials load the body.

| Trial | Reward | V | `freeze-path` in pi.txt | `Record-backed freeze` in pi.txt | Body loaded? |
|---|---|---|---:|---:|---|
| `GsZXizN` (1/20) | 0 | 0.05 | 42 | **0** | no |
| `vDbuamh` (20/20) | 1 | 1.00 | 90 | **5** | **yes** |
| `wTrxGTb` (1/20) | 0 | 0.05 | 18 | **0** | no |

Wave-22 a-1 body-load = **1/3** — identical to wave-21 (`7mD3da3` loaded / `CT4gRzL` + `H4CBaSH` did not). The two catalog-miss trials still show the skill name in the catalog and still pass only `test_okta_mfa_factors_preserved`. The winning trial loaded the body and held **20/20** (Slack included — better than wave-21’s 19/20 winner).

Axis D did **not** raise the body-load rate. Replacing “Do not read this skill to decide hold” with an affirmative post-hold read trigger did not stop the 1/20 catalog-miss coin-flip. The body’s own suppressor sentences remain (body frozen); that is intended and is a plausible remaining suppressor, but this canary does not isolate that.

## a-33 / n-2 leftover notes

**a-33 leftover-identity (champ OCCASIONAL 4–5/6, not ALWAYS_PASS):**

| Test | DEN7Bdk | JrQ29WP | Xsbbh3P | Wave-22 | Champ |
|---|---|---|---|---|---|
| `test_onedrive_departed_share_grants_removed` | F | P | F | 1/3 | 4/6 OCCASIONAL |
| deploy-keys / app-reg / SP / site-owners (6 tests) | F | P | F | 1/3 | 4/6 OCCASIONAL |
| sharepoint / disable / group removals (26 tests) | F | P | P | 2/3 | 5/6 or 6/6 |
| all a-33 ALWAYS_PASS (16 tests) | F | P | P | **2/3** | 6/6 |

`DEN7Bdk` (0/34) is a full leftover-identity miss, worse than wave-21 `XWRSDQN` (16/34). `JrQ29WP` (34/34) proves the 16 ALWAYS_PASS can still close on this home. Onedrive / deploy-keys / owners are known unstable leftovers, not new ALWAYS_FAIL invented by the description edit. The 0/34 trial is what drops a-33 mean V to 0.598 and is the largest single contributor to the clause-3 fail.

**n-2 leftovers:**

| Test | 3YewxW5 | duREDFH | pT6T22y | Wave-22 | Champ |
|---|---|---|---|---|---|
| `test_internal_api_02_undrained` | F | F | F | **0/3** | 3/6 OCCASIONAL |
| `test_legacy_dns_record_cleaned` | F | F | F | **0/3** | 3/6 OCCASIONAL |
| `test_dead_backend_server_removed` | F | P | F | 1/3 | 5/6 OCCASIONAL |
| `test_shared_nacl_allows_payments_inbound` | P | F | P | 2/3 | 4/6 OCCASIONAL |
| `test_payments_backend_02_undrained` | F | P | P | 2/3 | **6/6** (dipped, not 0/3) |
| `test_payments_nacl_edge_return_egress` | P | F | P | 2/3 | **6/6** (dipped, not 0/3) |
| `test_payments_nacl_dependency_return_ingress` | P | F | P | 2/3 | **6/6** (dipped, not 0/3) |
| `test_payments_route_to_shared_not_blackholed` | F | P | P | 2/3 | **6/6** (dipped, not 0/3) |

No n-2 trial closed 21/21. The 0/3 pair is the known undrain/DNS cluster (champ OCCASIONAL), not an ALWAYS_PASS wipe. Wave-15 two-catalog tax (a-33 0/3 **and** n-2 0/3 with ALWAYS_PASS wiped) did **not** recur — there is no second skill on this home.

## Integrity (champion unmodified; single catalog on wave22)

| Check | Result |
|---|---|
| wave14 freeze-path sha | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` (unchanged) |
| wave22 freeze-path full sha | `67848ba8bf17562a0188c3d600371aa94c696c9088947600eb61d1909c379fcb` (description-only; ≠ champion) |
| wave22 freeze-path body sha | `891021252ddeb253f77bd83738a622acaa3f0b12cd9e67c05a7a65e51701ad8d` (identical to champion) |
| wave21 APPEND sha | `a3dbf5ed271b52db49f34d7e5399b1fa126268d4c50024cb22a1865342f16795` (unchanged) |
| wave22 APPEND sha | **same** (byte-identical copy) |
| wave14 home files | still only `auth.json`, `models-store.json`, `models.json`, `skills/freeze-path/SKILL.md` |
| wave22 skills | **only** `freeze-path` |
| wave22 `endpoint-close` | **absent** |
| wave20 endpoint-close | still the only skill on that home (not copied) |
| wave0–wave21 / `wave14/holdout` | not mutated |
| SKILL.md / APPEND after canary | **not rewritten** |
| Harbor relaunch after artifacts | **not done** |
| secrets in this report | none |

## What DISCARD does **not** mean

- Do **not** treat Pass@1 2/12 or Pass@3 0/4 as the scored claim. The scored claim is the three-clause paired gate above. Exact-hash 2/3 and ALWAYS_PASS both held; the discard is the mean-V clause.
- Do **not** treat Axis D as “the description change is forever wrong.” It failed **this** paired gate because mean V dropped 0.071 (a-33 0/34 + n-2 undrain/DNS 0/3 + a-1 still 1/3 body-load). The lever itself (a-1 body-load ≥2/3) also failed: still **1/3**, same as wave-21.
- Do **not** rewrite APPEND or SKILL.md after this canary. Do not relaunch job `af6e5826`.
- Do **not** restack a second catalog skill onto this home. Wave-15 already showed that tax kills a-33/n-2.
- Do **not** edit the freeze-path **body** (wave-19 tax).
- Champion **files** stay at `/home/azureuser/agent_evals/wave14/pi-agent-home`. Wave-21 KEEP remains the last canary that passed the paired gate. DISCARD here is not a revert of wave-21 and is not an automatic swap of the champion pointer.
- Do **not** treat Harbor `stats.cost_usd = $43.11` or `C_all = $3.59` as the OpenRouter bill. Those are Pi’s unknown-model fallback ($5 / $0.50 / $30 per 1M). OpenRouter-list reconstruction of the same tokens is **~$0.36** job / **~$0.030** per trial.
- Do **not** promote wave-22. Do not run holdout from this report.

## Next (not this job)

Eligible follow-ons, if any: park Axis D; consider Axis P (promote-or-not of wave-21 vs wave-14 on holdout) or Axis E-B / E-F from `/home/azureuser/agent_evals/wave21/next_axes.md`. Do not add `skills/endpoint-close`. Do not edit freeze-path body. Do not rewrite wave-21 APPEND. Do not mutate wave0–wave22 homes from a later wave without a fresh isolated dir.

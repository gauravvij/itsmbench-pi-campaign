# ITSMBench wave-20 — E-A isolated endpoint-close probe (a-2 only, freeze-path absent)

**Job (valid):** `/home/azureuser/agent_evals/wave20/jobs/wave20-pi-probe-a2-endpointclose`  
**Job result:** `/home/azureuser/agent_evals/wave20/jobs/wave20-pi-probe-a2-endpointclose/result.json`  
**Job id:** `b89da49c-b0ac-4376-9378-1ce37e638dfc`  
**Config:** `/home/azureuser/agent_evals/wave20/jobs/wave20-pi-probe-a2-endpointclose/config.json`  
**Job log:** `/home/azureuser/agent_evals/wave20/jobs/wave20-pi-probe-a2-endpointclose/job.log`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave14/pi-agent-home/skills/freeze-path/SKILL.md` sha256 `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`  
**Lever (one new skill; freeze-path not copied, not written):**  
- `/home/azureuser/agent_evals/wave20/pi-agent-home/skills/endpoint-close/SKILL.md` (sha256 `b8ab97cf8663ba115fd894b06cd3006ca2d9d27fd47ad21f0ce1a1c386709f01`, 4496 bytes)  
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731`, `--agent-kwarg thinking=high`  
**Environment:** local Docker, `--no-delete`, absolute `--env-file /home/azureuser/agent_evals/ITSMBench/.env`, `-n 3`, `-k 3`  
**Bind-mount:** `/home/azureuser/agent_evals/wave20/pi-agent-home` → `/root/.pi/agent`  
**Tasks:** **task-a-2 only** (E-A isolated probe; task-n-2 / task-a-1 / task-a-33 **not** included; **holdout not run**)  
**Wall time:** 8m 48s (`2026-08-23T10:08:41.585994` → `2026-08-23T10:17:29.455150`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented. No secrets printed.

## Probe decision

**KEEP.**

Gate (task-specified):

| Gate | Threshold | Measured | Pass? |
|---|---|---|---|
| exact-hash | ≥ 1/3 | **2/3** (`rX53wEK`, `wS7tpL5`) | YES |
| ALWAYS_PASS 0/3 | none | no test is 0/3; worst leftover is the problem-record cluster at 2/3 | YES |
| a-2 mean V vs 0.642 | not drop > 0.05 | **0.933** (Δ **+0.291**) | YES |

This is an isolated a-2 probe, not a 4-task promote canary. KEEP here means the lever survived the cheap probe and is eligible for a later full canary with some freeze-path delivery. It does **not** replace the wave-14 champion.

## Command family (print-config then run; no `--skills`)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-flash-0731 \
  --agent-kwarg thinking=high -e docker --no-delete -n 3 -k 3 \
  --env-file /home/azureuser/agent_evals/ITSMBench/.env \
  --jobs-dir /home/azureuser/agent_evals/wave20/jobs \
  --job-name wave20-pi-probe-a2-endpointclose \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave20/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p tasks -i task-a-2
```

(workdir `/home/azureuser/agent_evals/ITSMBench`.) `--print-config` exited 0 and matched: model `openai/deepseek/deepseek-v4-flash-0731`, `thinking=high`, `n_attempts=3`, `n_concurrent_trials=3`, only `task-a-2`, mount source `/home/azureuser/agent_evals/wave20/pi-agent-home`, `delete=false`. `--skills` was not passed (every trial `result.json` has `config.agent.skills: []`). Harbor 0.21.0.

First launch from the wrong cwd failed with `FileNotFoundError: tasks` before creating a job dir. Relaunch from ITSMBench created the official job. No `rm` outside `/tmp`. Wave0–wave19 homes and `wave14/holdout` were not mutated.

## What changed (one isolated skill; champion JSON only)

Champion JSON files only were copied from `/home/azureuser/agent_evals/wave14/pi-agent-home` to `/home/azureuser/agent_evals/wave20/pi-agent-home`:

| File | SHA-256 (wave14 = wave20) |
|---|---|
| `auth.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| `models-store.json` | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` |
| `models.json` | `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` |

**`skills/freeze-path/` was not copied and was not written.** The only skill on the wave20 home is `skills/endpoint-close/SKILL.md`.

YAML catalog is trigger-only: fetched malware / file-hash IOC / host network-containment record. Excludes litigation/preservation holds, offboarding, network or API outages, authorized-testing / expected-activity / red-team exceptions, and catalog blurbs. Body teaches: problem RCA with the **exact hash**, detection-closed, in-place IOC prevent (no duplicate), containment lift, MDM scan+resync, security reclassify, asset audit, confirm writes, close only after those confirms. No hard-coded ticket / incident / hash / serial / hostname ids. No freeze-path content.

There is **no** `APPEND_SYSTEM.md`, **no** `SYSTEM.md`, **no** `extensions/`, **no** `leftover_scan`, **no** `close_gate.ts`, and **no** freeze-path.

## Validity gate

| Check | Result |
|---|---|
| 3 trial dirs with `verifier/reward.txt` | Yes (`NZoiJBn`, `rX53wEK`, `wS7tpL5`); also 3/3 `verifier/ctrf.json` + trial `result.json` |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 3`, `n_retries: 0`; every trial `exception_info=None`) |
| Tokens | Job `n_input_tokens=5269820`, `n_cache_tokens=4704000`, `n_output_tokens=60109` (all non-zero). Per-trial input 1,729,923–1,805,181; output 17,711–24,620. **No 0-token trial.** |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `platform.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from `job.log` and all `pi.txt`. Crude `\b401\b` = 0; `Unauthorized` = 0. **`has_401=False`.** |
| Bind-mount | wave20 home only (`source` `/home/azureuser/agent_evals/wave20/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (trial `result.json` `config.agent.skills: []`) |
| Champion freeze-path | still `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` on wave14 only |
| Wave20 freeze-path | **none** (`find … -iname '*freeze*'` empty) |

This is **not** a 401/0-token quarantine case. All 3 trials are live mock-state results.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Cost USD (meter) |
|---|---|---|---|---|---|---|
| task-a-2 | `task-a-2__NZoiJBn` | 0 | 0.8000 | 16/20 | 1,729,923 / 17,711 | $2.249361 |
| task-a-2 | `task-a-2__rX53wEK` | **1** | 1.0000 | 20/20 | 1,805,181 / 24,620 | $2.394009 |
| task-a-2 | `task-a-2__wS7tpL5` | **1** | 1.0000 | 20/20 | 1,734,716 / 17,778 | $2.341000 |

Job `result.json` `reward_stats`: `1.0` = `{task-a-2__rX53wEK, task-a-2__wS7tpL5}`, `0.0` = `{task-a-2__NZoiJBn}`. Mean reward **0.6667**. Harbor-computed `pass_at_k` for this job: `pass@2 = 1.0`. `stats.cost_usd = 6.98437` (= sum of 3 trial meters).

## Targeted leftovers vs unaided / prior endpoint skills

Unaided champion pool (w14+w18, same DeepSeek, freeze-path home): a-2 exact-hash **0/6 ALWAYS_FAIL**; a-2 mean V **0.642**. Wave-15 endpoint-rca (stacked on freeze-path) got exact-hash 3/3 but leftover **detection-closed 0/3**. Wave-16 case-path (no freeze-path) leftover was **hash-block + IOC-in-place** on the best 18/20.

| Test | NZoiJBn | rX53wEK | wS7tpL5 | Wave-20 | vs unaided 0/6 | vs w15 leftover | vs w16 leftover |
|---|---|---|---|---|---|---|---|
| `test_problem_root_cause_names_exact_hash` | F | P | P | **2/3** | 0/6 → 2/3 | taught | taught |
| `test_crowdstrike_detection_closed` | P | P | P | **3/3** | — | w15 was 0/3 | w16 was 3/3 |
| `test_crowdstrike_malware_hash_blocked` | P | P | P | **3/3** | — | — | w16 leftover |
| `test_malware_ioc_escalated_in_place` | P | P | P | **3/3** | — | — | w16 leftover |
| `test_problem_root_cause_names_malware` | F | P | P | 2/3 | — | — | — |
| `test_problem_product_area_endpoint_security` | F | P | P | 2/3 | — | — | — |
| `test_problem_short_description_names_malware` | F | P | P | 2/3 | — | — | — |
| all other a-2 tests (containment lift, assign, Intune scan/resync/last-sync, reclassify, incident close/inactive/close-code/close-notes, asset audit, not wiped, compliant) | P | P | P | **3/3** | — | — | — |

`NZoiJBn` (16/20, reward 0) missed the entire ServiceNow problem-record cluster (malware RCA / exact-hash / product-area / short-desc). Detection-closed, hash-block, and in-place IOC prevent were **green on that miss too**. The complementary w15/w16 leftovers did not reappear.

## a-2 V vs champion 0.642

| Metric | Wave-20 endpoint-close (a-2 only) | Champ-pool a-2 (w14+w18) | Delta |
|---|---|---|---|
| Mean V (3 attempts) | **0.9333** | 0.642 | **+0.291** |
| Pass@1 | 2/3 = 0.667 | 0/6 = 0.000 | +0.667 |
| Pass@3 (informational) | 1 | 0 | — |
| exact-hash | **2/3** | **0/6** | +0.667 rate |
| detection-closed | 3/3 | (w15 leftover 0/3) | closed the w15 hole |
| hash-blocked | 3/3 | (w16 leftover) | closed the w16 hole |
| ioc-in-place | 3/3 | (w16 leftover) | closed the w16 hole |

Mean V **did not drop**; it rose 0.291, well inside the “not drop > 0.05” bound. Cost comparisons are Harbor-meter-relative within DeepSeek only.

## Skill routing (`agent/pi.txt`)

Body-load = substring `Record-backed endpoint close`. Catalog name = `endpoint-close`.

| Trial | `endpoint-close` count | body anchor | exact-hash phrase | freeze-path |
|---|---|---|---|---|
| `NZoiJBn` (16/20) | 21 | 5 | 90 | 0 |
| `rX53wEK` (20/20) | 53 | 5 | 111 | 0 |
| `wS7tpL5` (20/20) | 66 | 5 | 114 | 0 |

The skill body loaded on all three attempts. The 16/20 miss is a write miss on the problem record, not a catalog-only miss.

## Integrity (champion unmodified; no freeze-path on wave20)

| Check | Result |
|---|---|
| wave14 freeze-path sha | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` (unchanged) |
| wave14 home files | still only `auth.json`, `models-store.json`, `models.json`, `skills/freeze-path/SKILL.md` |
| wave20 freeze-path | **absent** |
| wave20 skills | **only** `endpoint-close` |
| wave0–wave19 / `wave14/holdout` | not mutated |
| secrets in this report | none |

## What KEEP does **not** mean

- Do **not** promote this home over wave-14. a-1 will likely regress because freeze-path is absent by design.
- Do **not** stack `endpoint-close` onto the wave-14 champion home without a separate full 4-task canary. Wave-15 already showed the two-catalog tax kills a-33/n-2 Pass@3.
- Pass@3 / Pass@1 on this 3-trial a-2-only job are informational. The scored claim is the paired leftover gate above.

## Next (not this job)

A later full canary may test *some* freeze-path delivery **plus** this close path, only because the probe cleared exact-hash ≥1/3, no ALWAYS_PASS 0/3, and a-2 V rose rather than dropped. That canary is out of scope for wave-20 E-A.

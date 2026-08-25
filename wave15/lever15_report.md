# ITSMBench wave-15 — endpoint-rca-v2 on wave-14 freeze-path-v2 champion (DeepSeek V4 Flash 0731 k=3)

**Job (valid):** `/home/azureuser/agent_evals/wave15/jobs/wave15-pi-canary-endpointrcav2`  
**Job result:** `/home/azureuser/agent_evals/wave15/jobs/wave15-pi-canary-endpointrcav2/result.json`  
**Job id:** `f99cadc1-0b81-4b08-b9e2-63311bfe3d47`  
**Config:** `/home/azureuser/agent_evals/wave15/jobs/wave15-pi-canary-endpointrcav2/config.json`  
**Job log:** `/home/azureuser/agent_evals/wave15/jobs/wave15-pi-canary-endpointrcav2/job.log`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave14/jobs/wave14-pi-canary-freezepathv2` (id `1fa70fbc-e193-452f-bb0a-803d0581450a`, result.json size 1803, mtime `1787153549`)  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Levers (one copied + one new; no third lever):**  
- `/home/azureuser/agent_evals/wave15/pi-agent-home/skills/freeze-path/SKILL.md` (verbatim from wave-14; sha256 `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`)  
- `/home/azureuser/agent_evals/wave15/pi-agent-home/skills/endpoint-rca/SKILL.md` (**new v2**, sha256 `7bed468243b1c20ab4e55c75d89f5eddf6e288bebd563f2eb281e7f6ec489663`; **not** wave-9 sha `3d7bc7353e848abcc9926ac93cf37ae47ad15f960fa9c9f04c6e8dfa791b3348`)  
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731`, `--agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 3`  
**Bind-mount:** `/home/azureuser/agent_evals/wave15/pi-agent-home` → `/root/.pi/agent`  
**Tasks:** task-n-2, task-a-1, task-a-33, task-a-2 (frozen canary; **dev/holdout not run**)  
**Wall time:** 35m 47s (`2026-08-20T12:11:39` → `12:47:26`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented. No secrets printed.

## Command family (wave-14 family + wave15 home / job name only)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-flash-0731 \
  --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
  --env-file .env \
  --jobs-dir /home/azureuser/agent_evals/wave15/jobs \
  --job-name wave15-pi-canary-endpointrcav2 \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave15/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p tasks -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
```

(workdir `/home/azureuser/agent_evals/ITSMBench`.) `--print-config` exited 0 and matched this family before the run: model `openai/deepseek/deepseek-v4-flash-0731`, `thinking=high`, `n_attempts=3`, four canary tasks, wave15 copy-home bind-mount, docker `delete=false`. `--skills` was not passed (every trial `result.json` has `config.agent.skills: []`).

Images reused: `harbor.local/task-main:dfc6f4d357d9`, `harbor.local/taskgen-emulator:a3dc8a1f0c35`. Harbor 0.21.0. `docker info` and `harbor --help` both exited 0.

## What changed (one new skill on a checksum-matching champion fork)

Wave-14 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave15/pi-agent-home`. Only the wave-15 copy received new `skills/endpoint-rca/SKILL.md` (exact v2 text from `/home/azureuser/agent_evals/plans/plan.md`). Freeze-path SKILL.md is checksum-identical on both homes.

YAML catalog is trigger-only: fetched CS/EDR/malware/containment record; excludes litigation/hold, offboarding, network/API outage, authorized-testing / expected-activity / red-team exception, catalog blurbs. Description contains **zero** restore / RCA / DNS / close verbs (the skill *name* is `endpoint-rca`; that is not a description verb). Body required actions: CS assign, hash-block in-place, containment lift, Intune scan+resync+last_sync, security reclassify, problem RCA with exact hash + product-area, asset audit, confirm writes, close only after those writes and never if a freeze-path hold record exists.

There is **no** `APPEND_SYSTEM.md`, **no** `SYSTEM.md`, **no** `extensions/`, **no** `leftover_scan`, **no** `close_gate.ts`, and **no** third skill. The fork is **not** stacked on discarded wave-1–13 homes. Wave-9 SKILL.md was not copied.

## Validity gate

| Check | Result |
|---|---|
| 12 trial dirs with `verifier/reward.txt` | Yes (4 tasks × 3 attempts); also 12/12 `verifier/ctrf.json` + trial `result.json` |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 12`, `n_retries: 0`; every trial `exception_info=None`) |
| Tokens | Job `n_input_tokens=22705563`, `n_cache_tokens=19069260`, `n_output_tokens=316321` (all non-zero). Per-trial input tokens 650,071–2,961,595; output 10,293–42,451. **No 0-token trial.** |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `platform.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from `job.log` and all `pi.txt`. `job.log` Traceback count = 0; crude `401` in `job.log` = 0. One `pi.txt` (`task-a-33__j72URNW`) contains the word `Unauthorized` **six times**, all inside catalog/API-index blurb text (`Unauthorized users will not see the existence of this endpoint`) — **not** a model-auth 401. **`has_401=False` on real auth.** |
| Bind-mount | wave15 home only (`config.json` source `/home/azureuser/agent_evals/wave15/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (trial `result.json` `config.agent.skills: []`) |
| Skill checksums | freeze-path `2f2b976f…` (both homes); endpoint-rca v2 `7bed4682…` (wave15 only) |

This is **not** a 401/0-token quarantine case. The 0/21 n-2 trial (`task-n-2__CWMGxM6`) has 747,658 input / 22,050 output tokens and `exception_info=None` — a live failed restore, not a parser/auth abort.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Cost USD (meter) |
|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__fSGhJ9r` | 0 | 0.0500 | 1/20 | 650,071 / 10,293 | $3.115625 |
| task-a-1 | `task-a-1__hGWBv6S` | 0 | 0.9500 | 19/20 | 2,156,252 / 21,862 | $2.853568 |
| task-a-1 | `task-a-1__kfE3Xur` | **1** | 1.0000 | 20/20 | 2,544,896 / 17,451 | $3.643786 |
| task-a-2 | `task-a-2__mit3YtS` | 0 | 0.9500 | 19/20 | 1,750,100 / 25,513 | $3.095587 |
| task-a-2 | `task-a-2__oFKQcfg` | 0 | 0.8500 | 17/20 | 2,961,595 / 27,628 | $3.280463 |
| task-a-2 | `task-a-2__sehUKsX` | 0 | 0.9000 | 18/20 | 1,695,320 / 17,913 | $2.721766 |
| task-a-33 | `task-a-33__SFGctRd` | 0 | 0.7941 | 27/34 | 2,454,587 / 36,249 | $3.281557 |
| task-a-33 | `task-a-33__dPfVuXg` | 0 | 0.7941 | 27/34 | 1,635,069 / 29,437 | $2.663703 |
| task-a-33 | `task-a-33__j72URNW` | 0 | 0.7941 | 27/34 | 1,899,573 / 26,282 | $2.734965 |
| task-n-2 | `task-n-2__CWMGxM6` | 0 | 0.0000 | 0/21 | 747,658 / 22,050 | $2.214311 |
| task-n-2 | `task-n-2__Uho3rDf` | 0 | 0.9048 | 19/21 | 2,054,732 / 39,192 | $4.651468 |
| task-n-2 | `task-n-2__aZjzfQw` | 0 | 0.8095 | 17/21 | 2,155,710 / 42,451 | $2.948976 |

Job `result.json` `reward_stats`: `1.0` = `{task-a-1__kfE3Xur}`, `0.0` = the other eleven. Mean reward **0.0833**. Harbor-computed `pass_at_k` for this job: `pass@2 = 0.1667`. `stats.cost_usd = 37.205775` (= sum of 12 trial meters).

## k=3 metrics vs wave-14 champion

| Metric | Wave-15 endpoint-rca-v2 | Wave-14 freeze-path-v2 | Delta |
|---|---|---|---|
| **Pass@1** (12 attempts) | **0.0833** (1/12) | 0.5000 (6/12) | **−0.4167** |
| **Pass@3** (tasks with ≥1 close) | **0.2500** (a-1 only) | 0.7500 (a-1, a-33, n-2) | **−0.50** |
| **Mean V** (12 attempts = task-means) | **0.7331** | 0.7436 | **−0.0105** |
| **C_all** (Harbor `stats.cost_usd` / 12) | **$3.100481** | $3.017192 | **+2.8%** (not cheaper) |
| a-1 Pass@k / mean V | 1/3 · 0.6667 | 2/3 · 0.6667 | Pass@1 dropped; mean V held; Pass@3 still 1 |
| a-2 Pass@k / mean V | 0/3 · **0.9000** | 0/3 · 0.5000 | still no close; V **+0.40** |
| a-33 Pass@k / mean V | **0/3** · 0.7941 | 2/3 · 0.8235 | **Pass@3 lost** |
| n-2 Pass@k / mean V | **0/3** · 0.5714 | 2/3 · 0.9841 | **Pass@3 lost** |

Per-task meter totals (3 attempts): a-1 $9.612979; a-2 $9.097816; a-33 $8.680225; n-2 $9.814755. Job meter $37.205775.

Cost comparisons are Harbor-meter-relative within DeepSeek only (same missing price-table fallback as wave-12/14). Do not compare to gpt-5.6-sol invoice.

## Per-task fail taxonomy (official CTRF)

**task-a-1 — 1/3 (V = 0.05 / 0.95 / 1.00).** One freeze close (`kfE3Xur` 20/20). `hGWBv6S` is 19/20 leftover `test_slack_account_deactivated` only. `fSGhJ9r` is 1/20 (freeze body **not** loaded). Wave-14 was 2/3 with two clean 20/20s. Pass@3 still holds for a-1, but Pass@1 dropped 2/3 → 1/3.

**task-a-2 — 0/3 (V = 0.95 / 0.85 / 0.90).** Skill **did load** on all three (see routing). Wave-14's 3/3 hole (problem RCA malware+hash+product-area+short-desc, `asset_audited`, `incident_reclassified_security`) is **green on 2/3 attempts and almost green on the third**. Remaining reds:

| Test | mit3YtS 19/20 | oFKQcfg 17/20 | sehUKsX 18/20 |
|---|---|---|---|
| `test_crowdstrike_detection_closed` | red | red | red |
| `test_incident_state_closed` | green | red | red |
| `test_problem_root_cause_names_malware` | green | red | green |
| wave-14 3/3 hole otherwise (hash / product-area / short-desc / audit / reclassify) | green | green | green |

Best attempt `mit3YtS` is **19/20**, blocked only on CrowdStrike **detection closed** (not the SN problem/audit/reclassify cluster). The lever moved a-2 hygiene/RCA writes; it did not produce a reward=1 close. Mean V 0.900 vs wave-14 0.500.

**task-a-33 — 0/3 (V = 0.7941 ×3).** Pass@3 **lost**. All three attempts 27/34 with the **same** seven leftovers: `test_onedrive_departed_share_grants_removed`, `test_helios_site_retains_active_owner`, `test_diego_github_deploy_key_removed`, `test_theo_github_deploy_key_removed`, `test_elena_app_registration_neutralized`, `test_eng_site_retains_active_owner`, `test_viktor_service_principal_neutralized`. Wave-14 had two 34/34 closes.

**task-n-2 — 0/3 (V = 0.00 / 0.90 / 0.81).** Pass@3 **lost**. `CWMGxM6` 0/21 live fail (tokens>0). `Uho3rDf` 19/21 missed undrain of payments-backend-02 and internal-api-02. `aZjzfQw` 17/21 missed NACL return/shared inbound + internal-api-02 undrain. Wave-14 had two 21/21 closes.

## freeze-path + endpoint-rca routing (`agent/pi.txt`)

Body-load = substring of skill-body anchors (`Record-backed freeze path` / `Required actions when a hold`; `Record-backed endpoint follow-through` / `Required actions when it applies`). Catalog-only = skill name present, body anchors = 0.

| Trial | freeze-path | endpoint-rca | FP body | ER body | Read |
|---|---|---|---|---|---|
| a-1 `fSGhJ9r` (1/20) | 42 | 36 | 0 | 0 | Catalog only (neither body) |
| a-1 `hGWBv6S` (19/20) | 132 | 48 | 5 | 0 | **FP body loaded**; ER unused |
| a-1 `kfE3Xur` (20/20) | 177 | 12 | 5 | 0 | **FP body loaded and freeze executed**; ER unused |
| a-2 `mit3YtS` (19/20) | 77 | 45 | 5 | 5 | **ER body loaded**; **FP body false-load on non-hold** |
| a-2 `oFKQcfg` (17/20) | 119 | 66 | 0 | 5 | **ER body loaded**; FP catalog only |
| a-2 `sehUKsX` (18/20) | 71 | 45 | 5 | 5 | **ER body loaded**; **FP body false-load on non-hold** |
| a-33 `SFGctRd` (27/34) | 48 | 30 | 0 | 0 | Catalog only |
| a-33 `dPfVuXg` (27/34) | 6 | 6 | 0 | 0 | Catalog only |
| a-33 `j72URNW` (27/34) | 119 | 48 | 5 | 5 | **False-load of both bodies on offboarding** |
| n-2 `CWMGxM6` (0/21) | 0 | 0 | 0 | 0 | Unused |
| n-2 `Uho3rDf` (19/21) | 6 | 6 | 0 | 0 | Catalog only |
| n-2 `aZjzfQw` (17/21) | 6 | 12 | 0 | 0 | Catalog only |

**a-2 body loaded? Yes, 3/3.** Kill criterion “a-2 still 0/3 **and skill never loaded** → DISCARD” is not the never-loaded branch — the skill loaded and executed RCA/audit/reclassify — but a-2 is still 0/3 on reward.

**False-load:** endpoint-rca body on a-1 = **no** (0/3). endpoint-rca body on a-33 = **1/3** (`j72URNW`). endpoint-rca body on n-2 = **no**. freeze-path body on a-2 = **2/3** (regression vs wave-14, which had FP body on only 1/3 a-2). Stacking a second skill reopened freeze-path false-load on malware tickets and one offboarding ticket.

## 0-token / all-fail investigation — parser/auth ruled out

- Job tokens all >0; no trial with 0 input or 0 output.
- Real auth strings absent; crude `Unauthorized` is catalog prose.
- `n_errored_trials=0`, `exception_info=None` on all 12.
- n-2 `CWMGxM6` 0/21 is a live incomplete restore (747k in / 22k out), not a harness abort.
- a-2 0/3 is CTRF assertion on live mock state after the skill body ran (problem/audit/reclassify mostly green).

## Promote gates (vs wave-14 — this IS a promote/discard)

| Gate | Need | Wave-15 | Result |
|---|---|---|---|
| Valid job | 12 reward.txt, tokens>0, has_401=False, 0 errored | Yes | PASS |
| Isolation | champion homes + wave14 result.json fingerprint unchanged | Yes (see below) | PASS |
| Pass@1 | ≥ 0.50 | 0.0833 | **FAIL** |
| Pass@3 | ≥ 0.75 | 0.25 | **FAIL** |
| Mean V | ≥ 0.7936 **or** held-V (0.7436) and ≥15% cheaper | V=0.7331 (below both); C_all **+2.8%** | **FAIL** |
| a-1 must hold | not lose Pass@3 / not collapse freeze | Pass@3 holds (1/3); Pass@1 2/3→1/3 | weak hold |
| a-33 must hold | Pass@3 | **0/3** | **FAIL** |
| n-2 must hold | Pass@3 | **0/3** | **FAIL** |
| a-2 0/3 and skill never loaded | DISCARD | 0/3 **but body loaded 3/3** | not that branch; still no close |

**Decision: DISCARD.**

The v2 skill **did** load on malware/containment (a-2 3/3) and closed the wave-14 3/3 problem/audit/reclassify hole on 2/3 attempts (best 19/20, leftover CS detection-closed). That is a real a-2 V lift (0.50 → 0.90). It is **not** enough to promote: Pass@1 collapsed 0.50 → 0.08 because a-33 and n-2 lost every close, C_all is not cheaper, and mean V did not clear +0.05. Do **not** restack this home. Keep wave-14 freeze-path-v2 as champion.

## Isolation checks (all pass)

- **Wave-14 champion home untouched:** still only `auth.json`, `models-store.json`, `models.json`, `skills/freeze-path/SKILL.md`. sha256 `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` (auth + models-store), `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` (models.json), freeze-path `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`. **No** endpoint-rca on wave-14.
- **Wave-15 home:** those three JSON files (same checksums) + freeze-path (same sha) + **only** new endpoint-rca v2 sha `7bed468243b1c20ab4e55c75d89f5eddf6e288bebd563f2eb281e7f6ec489663`. YAML description has 0 restore / RCA / DNS / close verbs.
- **Wave-15 is the only home with endpoint-rca v2.** wave-9/10/11 still have wave-9 sha `3d7bc735…` (untouched).
- **Wave-14 canary `result.json` fingerprint unchanged:** id `1fa70fbc-e193-452f-bb0a-803d0581450a`, size **1803**, mtime **1787153549**.
- **Wave-0–wave-13 `result.json` fingerprints unchanged:**
  - wave0-pi-canary-or: 1335 / 1787046882 / `a84293f5-1154-414e-9d6a-b1e67165095b`
  - wave1: 1267 / 1787050357 / `b8ad0470-1742-492b-86fe-cf53bce051bf`
  - wave2: 1269 / 1787052232 / `9ae5e8ea-23ea-468e-bce7-b7952c543998`
  - wave3: 1329 / 1787057453 / `22b4e5e6-0999-4203-8cea-aae59e97709d`
  - wave4: 1269 / 1787061347 / `972dd34c-c317-431b-8734-a6903bb42077`
  - wave5: 1326 / 1787065720 / `75010c72-3da0-4bf5-b433-b3492f53544c`
  - wave6: 1336 / 1787068229 / `c28b17d2-e398-4ddb-8162-b7e3882bbe26`
  - wave7: 1329 / 1787075751 / `8ce5947f-b69c-48e9-b23e-7b1dcbc77c88`
  - wave8: 1326 / 1787078227 / `35c8360c-7977-4adc-acc5-ea960eec8a4b`
  - wave9: 1337 / 1787083099 / `443781fe-2529-44b1-aec5-f6a5b340a28b`
  - wave10: 1335 / 1787126508 / `121cd00c-c8c4-49bc-9ed0-212cde9e2e98`
  - wave11: 1335 / 1787130149 / `2922319b-b475-4561-9e7b-ca9da01fcfca`
  - wave12: 1809 / 1787137274 / `9fcbb0c3-3f15-4e51-99e0-fe32851786b0`
  - wave13: 1795 / 1787144009 / `79e26de4-ef31-46db-94da-7a0b072f201c`
- No writes under wave0–wave14 homes or `wave14/holdout/*`; no secrets printed; no `rm` of absolute paths outside `/tmp`; Harbor `--skills` not passed; holdout not run.

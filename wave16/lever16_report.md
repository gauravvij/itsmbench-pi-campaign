# ITSMBench wave-16 — case-path dual-branch (replaces freeze-path) on wave-14 champion JSON (DeepSeek V4 Flash 0731 k=3)

**Job (valid):** `/home/azureuser/agent_evals/wave16/jobs/wave16-pi-canary-casepath`  
**Job result:** `/home/azureuser/agent_evals/wave16/jobs/wave16-pi-canary-casepath/result.json`  
**Job id:** `6edc17bc-3a73-467a-b578-fcb8d1d41587`  
**Config:** `/home/azureuser/agent_evals/wave16/jobs/wave16-pi-canary-casepath/config.json`  
**Job log:** `/home/azureuser/agent_evals/wave16/jobs/wave16-pi-canary-casepath/job.log`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave14/jobs/wave14-pi-canary-freezepathv2` (id `1fa70fbc-e193-452f-bb0a-803d0581450a`, result.json size 1803, mtime `1787153549`)  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Lever (one skill file only; freeze-path not copied):**  
- `/home/azureuser/agent_evals/wave16/pi-agent-home/skills/case-path/SKILL.md` (**new dual-branch v1**, sha256 `356dc9e482bf49b3852b76f8906b1da0704ab62b6d7690093647026fa46193b6`; **not** wave-9 endpoint-rca sha `3d7bc735…`; **not** wave-15 endpoint-rca-v2 sha `7bed4682…`)  
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731`, `--agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 3`  
**Bind-mount:** `/home/azureuser/agent_evals/wave16/pi-agent-home` → `/root/.pi/agent`  
**Tasks:** task-n-2, task-a-1, task-a-33, task-a-2 (frozen canary; **dev/holdout not run**)  
**Wall time:** 39m 5s (`2026-08-20T14:14:44` → `14:53:50`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented. No secrets printed.

## Command family (wave-14 family + wave16 home / job name only)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-flash-0731 \
  --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
  --env-file .env \
  --jobs-dir /home/azureuser/agent_evals/wave16/jobs \
  --job-name wave16-pi-canary-casepath \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave16/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p tasks -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
```

(workdir `/home/azureuser/agent_evals/ITSMBench`.) `--print-config` exited 0 and matched this family before the run: model `openai/deepseek/deepseek-v4-flash-0731`, `thinking=high`, `n_attempts=3`, four canary tasks, wave16 copy-home bind-mount, docker `delete=false`. `--skills` was not passed (every trial `result.json` has `config.agent.skills: []`).

Images reused: `harbor.local/task-main:dfc6f4d357d9`, `harbor.local/taskgen-emulator:a3dc8a1f0c35`. Harbor 0.21.0. `docker info` and `harbor --help` both exited 0.

## What changed (one new skill replacing freeze-path on a checksum-matching JSON fork)

Champion JSON files only were copied from `/home/azureuser/agent_evals/wave14/pi-agent-home` to `/home/azureuser/agent_evals/wave16/pi-agent-home`. **`skills/freeze-path/` was not copied.** Only new file is `skills/case-path/SKILL.md` (exact dual-branch v1 text from `/home/azureuser/agent_evals/plans/plan.md`).

YAML catalog is trigger-only: fetched hold **or** malware/containment/hash-IOC record; excludes litigation/hold false-positives from OAuth scopes, offboarding, network/API outage, authorized-testing / expected-activity / red-team exception, catalog blurbs. Description contains **zero** restore / RCA / DNS / close verbs. Body has exclusive hold vs endpoint branches. Hold required-actions are verbatim freeze-path-v2. Endpoint branch includes CS assign, **detection status closed**, hash-block in-place, containment lift, Intune scan+resync+last_sync, security reclassify, problem RCA with exact hash + product-area, asset audit, incident terminal closed/inactive.

There is **no** `APPEND_SYSTEM.md`, **no** `SYSTEM.md`, **no** `extensions/`, **no** `leftover_scan`, **no** `close_gate.ts`, **no** freeze-path, and **no** endpoint-rca. The fork is **not** stacked on discarded wave-1–15 homes. Wave-9 / wave-15 SKILL.md were not copied.

## Validity gate

| Check | Result |
|---|---|
| 12 trial dirs with `verifier/reward.txt` | Yes (4 tasks × 3 attempts); also 12/12 `verifier/ctrf.json` + trial `result.json` |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 12`, `n_retries: 0`; every trial `exception_info=None`) |
| Tokens | Job `n_input_tokens=28793525`, `n_cache_tokens=26149120`, `n_output_tokens=500399` (all non-zero). Per-trial input tokens 1,112,955–4,177,679; output 10,604–186,141. **No 0-token trial.** |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `platform.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from `job.log` and all `pi.txt`. `job.log` Traceback count = 0; crude `401` in `job.log` = 0; `Unauthorized` in all `pi.txt` = 0. **`has_401=False` on real auth.** |
| Bind-mount | wave16 home only (`config.json` source `/home/azureuser/agent_evals/wave16/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (trial `result.json` `config.agent.skills: []`) |
| Skill checksums | case-path `356dc9e4…` (wave16 only); freeze-path `2f2b976f…` still only on champion / wave15, **not** on wave16 |

This is **not** a 401/0-token quarantine case. All 12 trials are live mock-state results.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Cost USD (meter) |
|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__dBtpXqA` | 0 | 0.0500 | 1/20 | 1,149,124 / 10,604 | $1.403900 |
| task-a-1 | `task-a-1__neQxcJ7` | 0 | 0.0500 | 1/20 | 1,112,955 / 16,828 | $2.178159 |
| task-a-1 | `task-a-1__vpwh5wB` | **1** | 1.0000 | 20/20 | 2,377,058 / 25,997 | $2.691184 |
| task-a-2 | `task-a-2__7p43U3J` | 0 | 0.8000 | 16/20 | 2,893,553 / 24,563 | $3.842479 |
| task-a-2 | `task-a-2__HcPsvb5` | 0 | 0.7000 | 14/20 | 3,442,389 / 34,176 | $3.541161 |
| task-a-2 | `task-a-2__tYYHNrb` | 0 | 0.9000 | 18/20 | 1,465,427 / 17,364 | $1.865719 |
| task-a-33 | `task-a-33__iYwJJyj` | 0 | 0.7941 | 27/34 | 2,630,869 / 31,525 | $3.051263 |
| task-a-33 | `task-a-33__w2DebpB` | 0 | 0.8529 | 29/34 | 1,887,271 / 27,550 | $2.617031 |
| task-a-33 | `task-a-33__yXGxAuo` | 0 | 0.8824 | 30/34 | 4,177,679 / 34,059 | $4.372117 |
| task-n-2 | `task-n-2__6Fy6dHG` | 0 | 0.9048 | 19/21 | 2,148,731 / 43,691 | $3.484657 |
| task-n-2 | `task-n-2__h3bHj2k` | 0 | 0.8571 | 18/21 | 2,665,532 / 186,141 | $7.729426 |
| task-n-2 | `task-n-2__uzMQuey` | 0 | 0.9048 | 19/21 | 2,842,937 / 47,901 | $4.531459 |

Job `result.json` `reward_stats`: `1.0` = `{task-a-1__vpwh5wB}`, `0.0` = the other eleven. Mean reward **0.0833**. Harbor-computed `pass_at_k` for this job: `pass@2 = 0.1667`. `stats.cost_usd = 41.308555` (= sum of 12 trial meters).

## k=3 metrics vs wave-14 champion

| Metric | Wave-16 case-path | Wave-14 freeze-path-v2 | Delta |
|---|---|---|---|
| **Pass@1** (12 attempts) | **0.0833** (1/12) | 0.5000 (6/12) | **−0.4167** |
| **Pass@3** (tasks with ≥1 close) | **0.2500** (a-1 only) | 0.7500 (a-1, a-33, n-2) | **−0.50** |
| **Mean V** (12 attempts = task-means) | **0.7247** | 0.7436 | **−0.0189** |
| **C_all** (Harbor `stats.cost_usd` / 12) | **$3.442380** | $3.017192 | **+14.1%** (not cheaper) |
| a-1 Pass@k / mean V | 1/3 · 0.3667 | 2/3 · 0.6667 | Pass@3 still 1; Pass@1 2/3→1/3; mean V down |
| a-2 Pass@k / mean V | 0/3 · **0.8000** | 0/3 · 0.5000 | still no close; V **+0.30** |
| a-33 Pass@k / mean V | **0/3** · 0.8431 | 2/3 · 0.8235 | **Pass@3 lost** (V slightly up) |
| n-2 Pass@k / mean V | **0/3** · 0.8889 | 2/3 · 0.9841 | **Pass@3 lost** |

Per-task meter totals (3 attempts): a-1 $6.273243; a-2 $9.249359; a-33 $10.040411; n-2 $15.745542. Job meter $41.308555.

Cost comparisons are Harbor-meter-relative within DeepSeek only (same missing price-table fallback as wave-12/14/15). Do not compare to gpt-5.6-sol invoice.

## Per-task fail taxonomy (official CTRF)

**task-a-1 — 1/3 (V = 0.05 / 0.05 / 1.00).** One hold close (`vpwh5wB` 20/20). The other two are 1/20 with the full freeze leftover cluster (GW suspend/OU/tokens, Slack deactivate, SN hold-route, Okta remains suspended). Wave-14 was 2/3 with two clean 20/20s. Pass@3 still holds for a-1, but Pass@1 dropped 2/3 → 1/3 and mean V 0.667 → 0.367.

**task-a-2 — 0/3 (V = 0.80 / 0.70 / 0.90).** Endpoint branch **did load** on all three (see routing). Wave-15 leftover `test_crowdstrike_detection_closed` is **green on 3/3**. Remaining reds:

| Test | 7p43U3J 16/20 | HcPsvb5 14/20 | tYYHNrb 18/20 |
|---|---|---|---|
| `test_crowdstrike_detection_closed` | **green** | **green** | **green** |
| `test_crowdstrike_detection_assigned_to_responder` | green | red | green |
| `test_incident_state_closed` | green | red | green |
| `test_crowdstrike_malware_hash_blocked` | green | green | red |
| `test_malware_ioc_escalated_in_place` | green | green | red |
| problem RCA cluster (malware / exact hash / product-area / short-desc) | **4/4 red** | **4/4 red** | **4/4 green** |
| asset_audited / Intune scan+resync+last_sync / reclassify / containment lift | green | green | green |

Best attempt `tYYHNrb` is **18/20**, blocked on hash-block + IOC-in-place (the wave-11 leftover pair), with CS detection-closed **and** the wave-14 3/3 problem/audit/reclassify hole green. The lever closed the wave-15 CS-detection-closed hole on 3/3. It did not produce a reward=1 close. Mean V 0.800 vs wave-14 0.500 vs wave-15 0.900.

**task-a-33 — 0/3 (V = 0.7941 / 0.8529 / 0.8824).** Pass@3 **lost**. Leftovers are leftover-identity (same family as wave-15), not a case-path write:

- `iYwJJyj` 27/34: onedrive departed shares, helios owner, diego/theo github deploy keys, elena app-reg, eng owner, viktor SP
- `w2DebpB` 29/34: onedrive, helios, diego/theo keys, eng owner
- `yXGxAuo` 30/34: helios, diego/theo keys, eng owner

Wave-14 had two 34/34 closes.

**task-n-2 — 0/3 (V = 0.90 / 0.86 / 0.90).** Pass@3 **lost**. All three missed `test_legacy_dns_record_cleaned`; two missed `test_dead_backend_server_removed`; two missed `test_internal_api_02_undrained`. Wave-14 had two 21/21 closes.

## case-path routing (`agent/pi.txt`)

Body-load = substring of skill-body anchors (`Record-backed case path` / `Follow **exactly one** branch` / `Hold branch — required actions` / `Endpoint branch — required actions` / `Do not unsuspend the IdP` / `Set that same existing detection's status to closed`). Catalog-only = `case-path` name present, body anchors = 0. Because this is **one file**, a true body load necessarily contains **both** branch headers; exclusive execution is judged from CTRF, not from header presence.

| Trial | case-path name | Body anchors | Read |
|---|---|---|---|
| a-1 `dBtpXqA` (1/20) | 18 | 0 | Catalog only (hold branch **not** executed) |
| a-1 `neQxcJ7` (1/20) | 84 | 0 | Catalog only (hold branch **not** executed) |
| a-1 `vpwh5wB` (20/20) | 72 | yes (hold_hdr=5, end_hdr=5, unsuspend=11, dir_freeze=44) | **Body loaded; hold executed** (20/20 freeze tests green) |
| a-2 `7p43U3J` (16/20) | 42 | yes (end_hdr=5, det_status=5, term_state=32, hash_block=11) | **Endpoint body loaded**; CS detection-closed green |
| a-2 `HcPsvb5` (14/20) | 48 | yes (end_hdr=5, det_status=11, term_state=53) | **Endpoint body loaded**; CS detection-closed green |
| a-2 `tYYHNrb` (18/20) | 39 | yes (end_hdr=5, det_status=11, term_state=41, hash_block=17) | **Endpoint body loaded**; CS detection-closed green; problem RCA green |
| a-33 `iYwJJyj` (27/34) | 0 | 0 | Unused |
| a-33 `w2DebpB` (29/34) | 0 | 0 | Unused |
| a-33 `yXGxAuo` (30/34) | 66 | 0 | Catalog only (no body) |
| n-2 `6Fy6dHG` (19/21) | 12 | 0 | Catalog only (no body) |
| n-2 `h3bHj2k` (18/21) | 0 | 0 | Unused |
| n-2 `uzMQuey` (19/21) | 0 | 0 | Unused |

**Hold branch on a-1?** Yes on 1/3 (`vpwh5wB` 20/20). 2/3 never loaded the body and scored 1/20.

**Endpoint branch on a-2 including detection-closed?** Yes, body loaded **3/3**. `test_crowdstrike_detection_closed` **passed 3/3** (the wave-15 leftover).

**False-load of body on a-33 / n-2?** **No** (0/3 and 0/3). Catalog-name mention without body: a-33 1/3, n-2 1/3. freeze-path / endpoint-rca strings = 0 on all 12 (those files are not in this home).

**a-2 still 0/3 and endpoint branch never loaded → DISCARD** is **not** this branch: the endpoint branch loaded and closed CS detection on 3/3. a-2 is still 0/3 on reward.

Single-file dual-branch did **not** reproduce the wave-15 two-catalog-entry body-false-load on a-33/n-2. a-33/n-2 still lost every close on catalog-unused and catalog-only trials — the Pass@3 collapse is **not** explained by loading the case-path body on those tasks.

## 0-token / all-fail investigation — parser/auth ruled out

- Job tokens all >0; no trial with 0 input or 0 output.
- Real auth strings absent; crude `401` / `Unauthorized` = 0.
- `n_errored_trials=0`, `exception_info=None` on all 12.
- a-2 0/3 is CTRF assertion on live mock state after the endpoint branch ran (CS detection-closed 3/3 green).
- a-33 / n-2 0/3 are live leftover-identity / restore misses with tokens>0.

## Promote gates (vs wave-14 — this IS a promote/discard)

| Gate | Need | Wave-16 | Result |
|---|---|---|---|
| Valid job | 12 reward.txt, tokens>0, has_401=False, 0 errored | Yes | PASS |
| Isolation | champion homes + wave14 result.json fingerprint unchanged; wave16 has no freeze-path / no endpoint-rca | Yes (see below) | PASS |
| Pass@1 | ≥ 0.50 | 0.0833 | **FAIL** |
| Pass@3 | ≥ 0.75 | 0.25 | **FAIL** |
| Mean V | ≥ 0.7936 **or** held-V (0.7436) and ≥15% cheaper | V=0.7247 (below both); C_all **+14.1%** | **FAIL** |
| a-1 must hold | not lose Pass@3 / not collapse freeze | Pass@3 holds (1/3); Pass@1 2/3→1/3; two 1/20 catalog-only | weak hold |
| a-33 must hold | Pass@3 | **0/3** | **FAIL → DISCARD** |
| n-2 must hold | Pass@3 | **0/3** | **FAIL → DISCARD** |
| a-2 0/3 and endpoint never loaded | DISCARD | 0/3 **but body loaded 3/3**; CS detection-closed 3/3 | not that branch; still no close |

**Decision: DISCARD.**

The dual-branch skill **did** load on malware/containment (a-2 3/3) and **closed the wave-15 leftover** `test_crowdstrike_detection_closed` on 3/3. Best a-2 is **18/20** (hash-block + IOC-in-place). Hold branch still produces a 20/20 freeze close when the body loads. That is a real a-2 write-path lift vs wave-14 (V 0.50 → 0.80) and a CS-close lift vs wave-15.

It is **not** enough to promote: Pass@1 collapsed 0.50 → 0.08 because **a-33 and n-2 lost every close** (kill criterion), C_all is not cheaper, mean V did not clear +0.05, and a-1 freeze body failed to load on 2/3. Replacing freeze-path with a dual-branch file did **not** protect the a-33 leftover-identity / n-2 restore Pass@3 that paid for the champion. Do **not** restack this home. Keep wave-14 freeze-path-v2 as champion.

## Isolation checks (all pass)

- **Wave-14 champion home untouched:** still only `auth.json`, `models-store.json`, `models.json`, `skills/freeze-path/SKILL.md`. sha256 `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` (auth + models-store), `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` (models.json), freeze-path `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`. **No** case-path on wave-14.
- **Wave-16 home:** those three JSON files (same checksums) + **only** new case-path v1 sha `356dc9e482bf49b3852b76f8906b1da0704ab62b6d7690093647026fa46193b6`. **No** freeze-path. **No** endpoint-rca. YAML description has 0 restore / RCA / DNS / close verbs.
- **Wave-16 is the only home with case-path.** wave-9/10/11 still have wave-9 sha `3d7bc735…` (untouched). wave-15 still has freeze-path `2f2b976f…` + endpoint-rca-v2 `7bed4682…` (untouched).
- **Wave-14 canary `result.json` fingerprint unchanged:** id `1fa70fbc-e193-452f-bb0a-803d0581450a`, size **1803**, mtime **1787153549**.
- **Wave-0–wave-15 `result.json` fingerprints unchanged:**
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
  - wave15: 1825 / 1787230046 / `f99cadc1-0b81-4b08-b9e2-63311bfe3d47`
- No writes under wave0–wave15 homes or `wave14/holdout/*`; no secrets printed; no `rm` of absolute paths outside `/tmp`; Harbor `--skills` not passed; holdout not run.

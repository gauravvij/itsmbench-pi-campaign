# ITSMBench wave-13 — freeze-path transfer on DeepSeek V4 Flash 0731 k=3

**Job (valid):** `/home/azureuser/agent_evals/wave13/jobs/wave13-pi-canary-freezepath`  
**Job result:** `/home/azureuser/agent_evals/wave13/jobs/wave13-pi-canary-freezepath/result.json`  
**Job id:** `79e26de4-ef31-46db-94da-7a0b072f201c`  
**Config:** `/home/azureuser/agent_evals/wave13/jobs/wave13-pi-canary-freezepath/config.json`  
**Baseline (same model, locked):** `/home/azureuser/agent_evals/wave12/jobs/wave12-pi-canary-dsflash-k3` (id `9fcbb0c3-3f15-4e51-99e0-fe32851786b0`)  
**Champion (frozen gpt-5.6-sol, contrast only):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or` (id `a84293f5-1154-414e-9d6a-b1e67165095b`, result.json size 1335, mtime `1787046882`)  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Lever:** verbatim `skills/freeze-path/SKILL.md` sha256 `6ecbe9d9ceee1835c26e7d8df8be632d4db104163e8b21d766b47abd36b09477` (wave-8 source; identical on wave-10/11). No endpoint-rca, no restore-followthrough, no overlay, no extensions. Harbor `--skills` not passed (`agent.skills: []`).  
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731`, `--agent-kwarg thinking=high`  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 3`  
**Bind-mount:** `/home/azureuser/agent_evals/wave13/pi-agent-home` → `/root/.pi/agent` (fresh wave-12 / wave-0 fork + only freeze-path)  
**Tasks:** task-n-2, task-a-1, task-a-33, task-a-2 (frozen canary; dev/holdout not run)  
**Wall time:** 34m 05s (`2026-08-19T12:19:24` → `12:53:29`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented. No secrets printed.

## Command family (wave-12 + wave13 home / job name only)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-flash-0731 \
  --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
  --env-file .env \
  --jobs-dir /home/azureuser/agent_evals/wave13/jobs \
  --job-name wave13-pi-canary-freezepath \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave13/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p tasks -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
```

(workdir `/home/azureuser/agent_evals/ITSMBench`.)

## Validity gate

| Check | Result |
|---|---|
| 12 trial dirs with `verifier/reward.txt` | Yes (4 tasks × 3 attempts) |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 12`) |
| Tokens | Job `n_input_tokens=20884601`, `n_cache_tokens=18200827`, `n_output_tokens=326639` (all non-zero) |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `platform.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from `job.log` (`has_401=False`); `job.log` Traceback count = 0 |
| Crude substring `401` in `pi.txt` | Present on some trials — **false positive**; ignored |
| Bind-mount | wave13 home only |
| Harbor `--skills` | Not passed (trial `result.json` `agent.skills: []`) |
| Skill checksum | `6ecbe9d9ceee1835c26e7d8df8be632d4db104163e8b21d766b47abd36b09477` |

This is **not** a 401/0-token quarantine case.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Cost USD (meter) |
|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__J3BFTKi` | 0 | 0.0500 | 1/20 | 738,533 / 10,908 | $1.275841 |
| task-a-1 | `task-a-1__M8iUdYz` | **1** | 1.0000 | 20/20 | 811,239 / 15,194 | $1.577871 |
| task-a-1 | `task-a-1__uMHBn7R` | 0 | 0.0000 | 0/20 | 389,419 / 10,315 | $0.822305 |
| task-a-2 | `task-a-2__e2oWDA8` | 0 | 0.8000 | 16/20 | 3,353,120 / 37,233 | $5.333179 |
| task-a-2 | `task-a-2__vw82wDp` | 0 | 0.3500 | 7/20 | 822,151 / 25,193 | $1.439345 |
| task-a-2 | `task-a-2__wjm63PU` | 0 | 0.1000 | 2/20 | 245,362 / 4,696 | $0.644400 |
| task-a-33 | `task-a-33__6Xjo89C` | 0 | 0.4706 | 16/34 | 1,608,026 / 28,234 | $1.921006 |
| task-a-33 | `task-a-33__7YuhnZL` | **1** | 1.0000 | 34/34 | 2,432,768 / 33,356 | $3.520295 |
| task-a-33 | `task-a-33__rFeaz6A` | 0 | 0.9706 | 33/34 | 2,667,516 / 30,387 | $4.356025 |
| task-n-2 | `task-n-2__4vhVR2E` | **1** | 1.0000 | 21/21 | 3,874,532 / 56,984 | $6.178756 |
| task-n-2 | `task-n-2__CFdxktQ` | 0 | 0.4762 | 10/21 | 1,032,522 / 26,891 | $1.623996 |
| task-n-2 | `task-n-2__VvsyZpi` | 0 | 0.9524 | 20/21 | 2,909,413 / 47,248 | $3.625433 |

Job `result.json` `reward_stats`: `1.0` = `{task-a-1__M8iUdYz, task-a-33__7YuhnZL, task-n-2__4vhVR2E}`, `0.0` = the other nine. Mean reward 0.250. Harbor-computed `pass_at_k` for this job: `pass@2 = 0.5`.

## k=3 metrics vs wave-12 baseline

| Metric | Wave-13 freeze-path | Wave-12 baseline | Delta |
|---|---|---|---|
| **Pass@1** (12 attempts) | **0.2500** (3/12) | 0.2500 (3/12) | 0 |
| **Pass@1** (task attempt-means) | **0.2500** | 0.2500 | 0 |
| **Pass@3** | **0.7500** (a-1, a-33, n-2) | 0.5000 (a-33, n-2) | **+0.25** (a-1 now Pass@3) |
| **Mean V** (12 attempts = task-means) | **0.5975** | 0.5692 | +0.0283 (need +0.05 → 0.6192) |
| **C_all** (Harbor meter / 12) | **$2.693204** | $3.102667 | −13.2% (need ≥15%) |
| **C_closed** (reward=1 only) | **$3.758974** | $5.468222 | −31.3% (3 closed attempts) |
| a-1 Pass@k / mean V | 1/3 · 0.3500 | 0/3 · 0.0500 | **lever transferred once** |
| a-2 Pass@k / mean V | 0/3 · 0.4167 | 0/3 · 0.4667 | V slightly worse |
| a-33 Pass@k / mean V | 1/3 · 0.8137 | 2/3 · 0.8235 | Pass@3 held; 1 fewer close |
| n-2 Pass@k / mean V | 1/3 · 0.8095 | 1/3 · 0.9365 | Pass@3 held; one 10/21 collapse |

Per-task meter totals (3 attempts): a-1 $3.676017; a-2 $7.416925; a-33 $9.797327; n-2 $11.428185. Job meter $32.3184535.

Cost comparisons are Harbor-meter-relative within DeepSeek only (same missing price-table fallback as wave-12). Do not compare to gpt-5.6-sol invoice.

## Class split (all 12 attempts, tags from `wave0/verifier_tags.json`)

| Class | Wave-13 pass / N | Wave-13 rate | Wave-12 | Reds Δ |
|---|---|---|---|---|
| **policy** | **108 / 165** | **0.6545** | 92/165 (0.558) | 73 → **57** |
| **completeness** | 64 / 96 | 0.6667 | 80/96 (0.833) | 16 → **32** |
| **hygiene** | 8 / 24 | 0.3333 | 2/24 (0.083) | 22 → **16** |

Policy reds dropped because a-1 produced one clean 20/20 freeze. Completeness got worse because n-2 `CFdxktQ` collapsed (11 completeness reds) and a-2 still leaves RCA/close writes unfinished.

## Per-task fail taxonomy

**task-a-1 — 1/3 (V = 0.05 / 1.00 / 0.00).** First DeepSeek freeze close on this canary: `M8iUdYz` 20/20 reward 1. `J3BFTKi` is the wave-12 signature (only `test_okta_mfa_factors_preserved`; 19 freeze checks red). `uMHBn7R` is 0/20 including the previously-green MFA-preserved check — agent was live (Okta/GW/SN/Slack/search traffic, 44 message-end events, 0.78 MB `pi.txt`, `exception_info=None`) so this is a real over-touch / failed-freeze attempt, not a harness abort.

**task-a-2 — 0/3 (V = 0.80 / 0.35 / 0.10).** Still no close. Best attempt `e2oWDA8` 16/20 residual: `test_crowdstrike_detection_assigned_to_responder`, `test_incident_state_closed`, `test_problem_root_cause_names_exact_hash`, `test_asset_audited`. `vw82wDp` 7/20 and `wjm63PU` 2/20 replay the hygiene/RCA cluster (problem malware+hash+product-area, CS assign, Intune sync, close notes, IOC). Mean V 0.417 vs baseline 0.467 — no a-2 lift.

**task-a-33 — 1/3 (V = 0.47 / 1.00 / 0.97).** Pass@3 held. `7YuhnZL` 34/34. `rFeaz6A` 33/34 missed only `test_onedrive_departed_share_grants_removed`. `6Xjo89C` 16/34 is the familiar leftover-access cluster (Priya/Diego/Sana/Theo/Elena/Viktor SharePoint, deploy keys, Elena app-reg, Viktor SP, site-owner retains).

**task-n-2 — 1/3 (V = 1.00 / 0.48 / 0.95).** Pass@3 held via `4vhVR2E` 21/21. `VvsyZpi` 20/21 missed `test_internal_api_02_undrained` (same leftover family as wave-12). `CFdxktQ` 10/21 is a new collapse: NACL/SG payments path + live DNS + undrain + legacy DNS — freeze-path mentions in that `pi.txt` = **0**, so this is attempt variance / incomplete ordinary RCA, not a freeze misfire.

## freeze-path load routing (`agent/pi.txt`)

Counts of the substring `freeze-path`, the YAML “ignore this skill” phrase, and skill-body anchors (`Record-backed freeze path` / `Required actions when a hold`):

| Trial | freeze-path | ignore this skill | body anchors | Read |
|---|---|---|---|---|
| a-1 `J3BFTKi` (1/20) | 60 | 6 | 0 | Catalog only; did not load body |
| a-1 `M8iUdYz` (20/20) | 84 | 10 | 10 | **Loaded and executed freeze** |
| a-1 `uMHBn7R` (0/20) | 54 | 10 | 10 | Loaded; freeze not completed / MFA regress |
| a-2 `e2oWDA8` (16/20) | 94 | 10 | 10 | Body present on a **non-hold** ticket |
| a-2 `vw82wDp` (7/20) | 105 | 10 | 10 | Same false load |
| a-2 `wjm63PU` (2/20) | 6 | 0 | 0 | Catalog only; short/poor trajectory |
| a-33 `6Xjo89C` (16/34) | 117 | 22 | 10 | Loaded on offboarding (no hold record) |
| a-33 `7YuhnZL` (34/34) | 54 | 0 | 0 | Catalog only; clean close |
| a-33 `rFeaz6A` (33/34) | 51 | 10 | 10 | Loaded; almost clean |
| n-2 all three | 0 | 0 | 0 | Unused |

Transfer is real but brittle: the one 20/20 is exactly “load body + do freeze.” Two a-1 attempts either never loaded or loaded and still failed. Body text also appeared on a-2 and a-33 (no hold record) — the trigger-only YAML does not fully prevent DeepSeek from opening the skill.

## 0/3 investigation (a-2) — parser/format/auth ruled out

a-2 is still 0/3. Failures are CTRF assertion traces on live mock state (`exception_info=None` on all three; tokens 0.25M–3.4M in; CrowdStrike/Intune/SN traffic present). Not a 401/0-token or parser miss. a-1 is **not** 0/3 (1/3), so the “if a-1 stays 0/3 → DISCARD” hard stop does **not** fire — the lever transferred on one attempt.

## Promote gates (vs wave-12 DeepSeek k=3 — this IS a promote/discard)

| Gate | Need | Wave-13 | Result |
|---|---|---|---|
| Valid job | 12 reward.txt, tokens>0, has_401=False, 0 errored | Yes | PASS |
| Pass@1 | ≥ 0.25 | 0.25 | PASS |
| Pass@3 | ≥ 0.50 | 0.75 | PASS |
| a-33 Pass@3 | hold | 1/3 | PASS |
| n-2 Pass@3 | hold | 1/3 | PASS |
| a-1 transfer | not 0/3 | 1/3 | PASS (partial) |
| V | ≥ 0.6192 **or** V≥0.5692 at ≥15% cheaper | V=0.5975; cost −13.2% | **FAIL** |

**Decision: DISCARD.**

The skill *can* freeze a-1 on this model (first 20/20 in the DeepSeek family; Pass@3 0.50→0.75; policy 92→108). It does not clear the search AND-gate: mean V only +0.028 (need +0.05) and the meter is only 13.2% cheaper (need 15%). a-2 remains 0/3. Completeness got worse because one unused-skill n-2 attempt collapsed to 10/21. Do not stack on this home. Next fork is still from wave-12 (or wave-0, same three files), not from wave-13.

## Contrast vs frozen gpt-5.6-sol champion (descriptive only — not a promote bar)

On sol, the same SKILL.md converted a-1 in a single n=1 draw and flipped a-2/n-2. On DeepSeek k=3 it converts a-1 with probability ~1/3, does not create an a-2 close, and leaves n-2 Pass@3 intact. Different model, different k; sol champion `wave0-pi-canary-or` is unchanged.

## Isolation checks (all pass)

- **Wave-0 home untouched:** still only `auth.json`, `models-store.json`, `models.json`; sha256 `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` (auth + models-store) and `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` (models.json).
- **Wave-12 home untouched:** same three files, same checksums; no `skills/`.
- **Wave-13 home:** those three files + only `skills/freeze-path/SKILL.md` (sha256 `6ecbe9d9…`). No `APPEND_SYSTEM.md`, `SYSTEM.md`, `extensions/`, endpoint-rca, or restore-followthrough.
- **Champion fingerprints unchanged:** `wave0-pi-canary-or/result.json` size **1335**, mtime **1787046882**, id **`a84293f5-1154-414e-9d6a-b1e67165095b`**.
- **Prior waves untouched:** wave-8 1326/1787078227, wave-9 1337/1787083099, wave-10 1335/1787126508, wave-11 1335/1787130149, wave-12 1809/1787137274 id `9fcbb0c3-3f15-4e51-99e0-fe32851786b0`.
- No writes under wave0–wave12; no secrets printed; no `rm` of absolute paths outside `/tmp`.

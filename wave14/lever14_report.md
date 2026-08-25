# ITSMBench wave-14 — freeze-path-v2 (tightened catalog trigger) on DeepSeek V4 Flash 0731 k=3

**Job (valid):** `/home/azureuser/agent_evals/wave14/jobs/wave14-pi-canary-freezepathv2`  
**Job result:** `/home/azureuser/agent_evals/wave14/jobs/wave14-pi-canary-freezepathv2/result.json`  
**Job id:** `1fa70fbc-e193-452f-bb0a-803d0581450a`  
**Config:** `/home/azureuser/agent_evals/wave14/jobs/wave14-pi-canary-freezepathv2/config.json`  
**Baseline (same model, locked):** `/home/azureuser/agent_evals/wave12/jobs/wave12-pi-canary-dsflash-k3` (id `9fcbb0c3-3f15-4e51-99e0-fe32851786b0`)  
**Champion (frozen gpt-5.6-sol, contrast only):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or` (id `a84293f5-1154-414e-9d6a-b1e67165095b`, result.json size 1335, mtime `1787046882`)  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Lever:** modified `skills/freeze-path/SKILL.md` sha256 `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` (required-actions verbatim from wave-8/13 sha `6ecbe9d9ceee1835c26e7d8df8be632d4db104163e8b21d766b47abd36b09477`; YAML+routing only: restore/RCA/DNS/close removed from catalog description; added decide-from-fetched-records-first / do-not-read-skill-to-decide-hold). No endpoint-rca, no restore-followthrough, no overlay, no extensions. Harbor `--skills` not passed (`config.agent.skills: []`).  
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731`, `--agent-kwarg thinking=high`  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 3`  
**Bind-mount:** `/home/azureuser/agent_evals/wave14/pi-agent-home` → `/root/.pi/agent` (fresh wave-12 / wave-0 fork + only freeze-path-v2)  
**Tasks:** task-n-2, task-a-1, task-a-33, task-a-2 (frozen canary; dev/holdout not run)  
**Wall time:** 55m 53s (`2026-08-19T14:36:36` → `15:32:29`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented. No secrets printed.

## Command family (wave-12 + wave14 home / job name only)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-flash-0731 \
  --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
  --env-file .env \
  --jobs-dir /home/azureuser/agent_evals/wave14/jobs \
  --job-name wave14-pi-canary-freezepathv2 \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave14/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p tasks -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
```

(workdir `/home/azureuser/agent_evals/ITSMBench`.) `--print-config` matched this family before the run. `--skills` was not passed.

## Validity gate

| Check | Result |
|---|---|
| 12 trial dirs with `verifier/reward.txt` | Yes (4 tasks × 3 attempts) |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 12`) |
| Tokens | Job `n_input_tokens=22981523`, `n_cache_tokens=19878053`, `n_output_tokens=358331` (all non-zero) |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `platform.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from `job.log` and all `pi.txt` (`has_401=False`); `job.log` Traceback count = 0; crude `401` in `job.log` = 0 |
| Bind-mount | wave14 home only |
| Harbor `--skills` | Not passed (trial `result.json` `config.agent.skills: []`) |
| Skill checksum | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` |

This is **not** a 401/0-token quarantine case.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Cost USD (meter) |
|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__8acpeCg` | 0 | 0.0000 | 0/20 | 413,310 / 7,983 | $1.021560 |
| task-a-1 | `task-a-1__GsYidgh` | **1** | 1.0000 | 20/20 | 3,633,363 / 29,928 | $4.847823 |
| task-a-1 | `task-a-1__JxKAwZo` | **1** | 1.0000 | 20/20 | 2,565,310 / 23,390 | $4.636844 |
| task-a-2 | `task-a-2__HdSsjPn` | 0 | 0.4000 | 8/20 | 1,083,892 / 20,188 | $1.806476 |
| task-a-2 | `task-a-2__MfQ4p9p` | 0 | 0.6000 | 12/20 | 944,087 / 18,943 | $1.567765 |
| task-a-2 | `task-a-2__jUAxAA2` | 0 | 0.5000 | 10/20 | 1,553,581 / 26,822 | $2.280341 |
| task-a-33 | `task-a-33__DvyRKMR` | **1** | 1.0000 | 34/34 | 2,199,509 / 28,534 | $2.673277 |
| task-a-33 | `task-a-33__jUjRapH` | **1** | 1.0000 | 34/34 | 3,018,186 / 34,646 | $3.338502 |
| task-a-33 | `task-a-33__v3XFhoL` | 0 | 0.4706 | 16/34 | 1,073,662 / 19,376 | $1.535126 |
| task-n-2 | `task-n-2__2qYbLuV` | **1** | 1.0000 | 21/21 | 1,857,109 / 37,939 | $2.985251 |
| task-n-2 | `task-n-2__LjukySj` | **1** | 1.0000 | 21/21 | 2,424,434 / 51,644 | $5.621994 |
| task-n-2 | `task-n-2__TUsHpeb` | 0 | 0.9524 | 20/21 | 2,215,080 / 58,938 | $3.891348 |

Job `result.json` `reward_stats`: `1.0` = `{task-a-33__jUjRapH, task-a-33__DvyRKMR, task-a-1__JxKAwZo, task-n-2__2qYbLuV, task-a-1__GsYidgh, task-n-2__LjukySj}`, `0.0` = the other six. Mean reward 0.500. Harbor-computed `pass_at_k` for this job: `pass@2 = 0.75`.

## k=3 metrics vs wave-12 baseline

| Metric | Wave-14 freeze-path-v2 | Wave-12 baseline | Delta |
|---|---|---|---|
| **Pass@1** (12 attempts) | **0.5000** (6/12) | 0.2500 (3/12) | **+0.25** |
| **Pass@1** (task attempt-means) | **0.5000** | 0.2500 | **+0.25** |
| **Pass@3** | **0.7500** (a-1, a-33, n-2) | 0.5000 (a-33, n-2) | **+0.25** (a-1 now Pass@3) |
| **Mean V** (12 attempts = task-means) | **0.7436** | 0.5692 | **+0.1744** (need +0.05 → 0.6192) |
| **C_all** (Harbor meter / 12) | **$3.017192** | $3.102667 | −2.8% (need ≥15% only if using the cost-OR) |
| **C_closed** (reward=1 only) | **$4.017282** | $5.468222 | −26.5% (6 closed attempts) |
| a-1 Pass@k / mean V | 2/3 · 0.6667 | 0/3 · 0.0500 | **lever transferred twice** |
| a-2 Pass@k / mean V | 0/3 · 0.5000 | 0/3 · 0.4667 | still no close; V slightly up |
| a-33 Pass@k / mean V | 2/3 · 0.8235 | 2/3 · 0.8235 | Pass@3 held; same mean V |
| n-2 Pass@k / mean V | 2/3 · 0.9841 | 1/3 · 0.9365 | Pass@3 held; one extra close |

Per-task meter totals (3 attempts): a-1 $10.506227; a-2 $5.654582; a-33 $7.546905; n-2 $12.498593. Job meter $36.2063065.

Cost comparisons are Harbor-meter-relative within DeepSeek only (same missing price-table fallback as wave-12). Do not compare to gpt-5.6-sol invoice.

## Class split (all 12 attempts, tags from `wave0/verifier_tags.json`)

| Class | Wave-14 pass / N | Wave-14 rate | Wave-12 | Reds Δ |
|---|---|---|---|---|
| **policy** | **126 / 165** | **0.7636** | 92/165 (0.558) | 73 → **39** |
| **completeness** | 81 / 96 | 0.8438 | 80/96 (0.833) | 16 → **15** |
| **hygiene** | 9 / 24 | 0.3750 | 2/24 (0.083) | 22 → **15** |

Policy reds dropped because a-1 produced two clean 20/20 freezes (vs wave-12's three 1/20 MFA-only greens). Completeness held. Hygiene improved modestly; residual hygiene is still the a-2 RCA/assign/audit cluster.

## Per-task fail taxonomy

**task-a-1 — 2/3 (V = 0.00 / 1.00 / 1.00).** Second and third DeepSeek freeze closes on this canary: `GsYidgh` and `JxKAwZo` both 20/20 reward 1. `8acpeCg` is 0/20 including `test_okta_mfa_factors_preserved` — agent was live (Okta/GW/SN/Slack/search traffic, 1.25 MB `pi.txt`, `exception_info=None`, skill body loaded) so this is a real over-touch / failed-freeze attempt, not a harness abort.

**task-a-2 — 0/3 (V = 0.40 / 0.60 / 0.50).** Still no close. Best attempt `MfQ4p9p` 12/20 residual: CS assign, security reclassify, incident closed, problem malware+hash+product-area+short-desc, asset audited. `HdSsjPn` 8/20 and `jUAxAA2` 10/20 add containment-lift / Intune scan+resync+last_sync. Mean V 0.500 vs baseline 0.467 — no a-2 close.

**task-a-33 — 2/3 (V = 1.00 / 1.00 / 0.47).** Pass@3 held. `DvyRKMR` and `jUjRapH` 34/34. `v3XFhoL` 16/34 is the familiar leftover-access cluster (Priya/Diego/Sana/Theo/Elena/Viktor SharePoint, deploy keys, Elena app-reg, Viktor SP, site-owner retains, OneDrive grants).

**task-n-2 — 2/3 (V = 1.00 / 1.00 / 0.95).** Pass@3 held via two 21/21 closes (`2qYbLuV`, `LjukySj`). `TUsHpeb` 20/21 missed only `test_shared_nacl_allows_payments_inbound`. Skill unused on all three n-2 attempts (`freeze-path` substring = 0).

## freeze-path load routing (`agent/pi.txt`)

Counts of the substring `freeze-path`, the YAML “ignore this skill” phrase, skill-body anchors (`Record-backed freeze path` / `Required actions when a hold`), and the new decide-first phrases:

| Trial | freeze-path | ignore this skill | body anchors | decide-first | Read |
|---|---|---|---|---|---|
| a-1 `8acpeCg` (0/20) | 81 | 10 | 10 | 25 | Loaded; freeze not completed |
| a-1 `GsYidgh` (20/20) | 165 | 16 | 10 | 43 | **Loaded and executed freeze** |
| a-1 `JxKAwZo` (20/20) | 144 | 16 | 16 | 43 | **Loaded and executed freeze** |
| a-2 `HdSsjPn` (8/20) | 0 | 0 | 0 | 0 | Unused |
| a-2 `MfQ4p9p` (12/20) | 54 | 0 | 0 | 0 | Catalog only |
| a-2 `jUAxAA2` (10/20) | 174 | 10 | 10 | 31 | Body present on a **non-hold** ticket |
| a-33 `DvyRKMR` (34/34) | 57 | 12 | 0 | 12 | Catalog only; clean close |
| a-33 `jUjRapH` (34/34) | 84 | 6 | 0 | 12 | Catalog only; clean close |
| a-33 `v3XFhoL` (16/34) | 48 | 12 | 0 | 12 | Catalog only |
| n-2 all three | 0 | 0 | 0 | 0 | Unused |

Trigger tightening moved the load pattern vs wave-13: a-33 no longer opened the body on any attempt (wave-13 loaded body on 2/3 a-33 trials), and 2/3 a-2 trials stayed catalog-only or unused (wave-13 loaded body on 2/3). a-1 still loads the body on all three — two of those are the 20/20 freezes. Residual false load: a-2 `jUAxAA2` only.

## 0/3 investigation (a-2) — parser/format/auth ruled out

a-2 is still 0/3. Failures are CTRF assertion traces on live mock state (`exception_info=None` on all three; tokens 0.94M–1.55M in; CrowdStrike traffic 492–958 hits). Not a 401/0-token or parser miss. a-1 is **not** 0/3 (2/3), so the “if a-1 stays 0/3 → DISCARD” hard stop does **not** fire — the lever transferred on two attempts.

## Promote gates (vs wave-12 DeepSeek k=3 — this IS a promote/discard)

| Gate | Need | Wave-14 | Result |
|---|---|---|---|
| Valid job | 12 reward.txt, tokens>0, has_401=False, 0 errored | Yes | PASS |
| Pass@1 | ≥ 0.25 | 0.50 | PASS |
| Pass@3 | ≥ 0.50 | 0.75 | PASS |
| a-33 Pass@3 | hold | 2/3 | PASS |
| n-2 Pass@3 | hold | 2/3 | PASS |
| a-1 transfer | not 0/3 | 2/3 | PASS |
| V | ≥ 0.6192 **or** V≥0.5692 at ≥15% cheaper | V=0.7436 (+0.1744); cost −2.8% | **PASS** (V gate) |

**Decision: PROMOTE.**

The tightened trigger transferred the freeze more reliably than wave-13's verbatim skill (a-1 2/3 vs 1/3; Pass@1 0.50 vs 0.25; mean V 0.7436 vs 0.5692, clearing +0.05 with room). a-33/n-2 Pass@3 held; n-2 added a second close. a-2 remains 0/3 and is out of scope for this lever. C_all is only 2.8% cheaper, so the cost-OR is unused — the V AND-gate is what promotes. Next fork may start from this wave-14 home (freeze-path-v2 only) if stacking a *different* skill; do not restack freeze-path.

## Contrast vs frozen gpt-5.6-sol champion (descriptive only — not a promote bar)

Different model, different k. On sol, the original SKILL.md converted a-1 in a single n=1 draw and flipped a-2/n-2. On DeepSeek k=3, freeze-path-v2 converts a-1 with probability ~2/3, does not create an a-2 close, and leaves n-2 Pass@3 intact (2/3). Sol champion `wave0-pi-canary-or` is unchanged.

## Isolation checks (all pass)

- **Wave-0 home untouched:** still only `auth.json`, `models-store.json`, `models.json`; sha256 `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` (auth + models-store) and `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` (models.json).
- **Wave-12 home untouched:** same three files, same checksums; no `skills/`.
- **Wave-13 home untouched:** those three files + only original freeze-path `6ecbe9d9…`.
- **Wave-14 home:** those three files + only `skills/freeze-path/SKILL.md` (sha256 `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`). No `APPEND_SYSTEM.md`, `SYSTEM.md`, `extensions/`, endpoint-rca, or restore-followthrough.
- **Champion fingerprints unchanged:** `wave0-pi-canary-or/result.json` size **1335**, mtime **1787046882**, id **`a84293f5-1154-414e-9d6a-b1e67165095b`**.
- **Prior waves untouched:** wave-8 1326/1787078227, wave-9 1337/1787083099, wave-10 1335/1787126508, wave-11 1335/1787130149, wave-12 1809/1787137274 id `9fcbb0c3-3f15-4e51-99e0-fe32851786b0`, wave-13 1795/1787144009 id `79e26de4-ef31-46db-94da-7a0b072f201c`.
- No writes under wave0–wave13; no secrets printed; no `rm` of absolute paths outside `/tmp`.

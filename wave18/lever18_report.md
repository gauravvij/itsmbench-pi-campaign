# ITSMBench wave-18 E3 — unmodified wave-14 freeze-path-v2 k=3 rerun (noise floor)

**Status: MEASUREMENT, not a promote candidate.** Champion remains wave-14 freeze-path-v2.

**Job:** `/home/azureuser/agent_evals/wave18/jobs/wave18-pi-canary-freezepathv2-rerun`  
**Job result:** `/home/azureuser/agent_evals/wave18/jobs/wave18-pi-canary-freezepathv2-rerun/result.json`  
**Job id:** `43894322-a75c-47bd-b24a-20e0a2f06a64`  
**Config:** `/home/azureuser/agent_evals/wave18/jobs/wave18-pi-canary-freezepathv2-rerun/config.json`  
**Original champion job:** `/home/azureuser/agent_evals/wave14/jobs/wave14-pi-canary-freezepathv2` (id `1fa70fbc-e193-452f-bb0a-803d0581450a`)  
**Bind-mount source (unmodified):** `/home/azureuser/agent_evals/wave14/pi-agent-home` → `/root/.pi/agent`  
**Skill sha (pre and post run):** `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`  
**YAML-block sha (unchanged):** `0baf1cc537504acc20718348856adcc2842be891d1a56ae218b62b4a08d69b28`  
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731`, `--agent-kwarg thinking=high`  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 3`  
**Image:** `harbor.local/task-main:dfc6f4d357d9`  
**Tasks:** task-n-2, task-a-1, task-a-33, task-a-2 (frozen canary; holdout/dev **not** run)  
**Wall time:** 35m 30s (`2026-08-21T11:14:34` → `11:50:04`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented. No secrets printed. No `--skills` flag. No new `pi-agent-home`. SKILL.md was not copied or edited.

## Goal / hypotheses

Wave-17 E1 (YAML-frozen body-only must-execute) killed a-33 and n-2 at 0/3 with the body **never loaded** on those six trials. Remaining hypotheses after H1/H2 were out:

| | H3 unread-body tax | H4 k=3 noise |
|---|---|---|
| Claim | A longer freeze-path file taxes a-33/n-2 even when unread | Wave-14’s 2/3 holds were a lucky draw |
| Discriminator | Champion rerun still holds a-33 **and** n-2 ≥2/3 | Champion rerun drops a-33 **or** n-2 below 2/3 |

E3 is that discriminator: official Harbor Pi k=3 rerun of **unmodified** wave-14 freeze-path-v2, bind-mounting the existing champion home.

## Command family (wave-14 family; jobs-dir / job-name only)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-flash-0731 \
  --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
  --env-file /home/azureuser/agent_evals/ITSMBench/.env \
  --jobs-dir /home/azureuser/agent_evals/wave18/jobs \
  --job-name wave18-pi-canary-freezepathv2-rerun \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave14/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p tasks -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
```

workdir `/home/azureuser/agent_evals/ITSMBench`. `--skills` was **not** passed. Mount source is **wave14**, not wave17.

`--print-config` (exit 0) resolved:

- `job_name`: `wave18-pi-canary-freezepathv2-rerun`
- `n_attempts`: 3
- `agents[0].model_name`: `openai/deepseek/deepseek-v4-flash-0731`
- `agents[0].kwargs.thinking`: `high`
- `environment.delete`: `false`
- `environment.mounts[0].source`: `/home/azureuser/agent_evals/wave14/pi-agent-home`
- `datasets[0].task_names`: `task-n-2`, `task-a-1`, `task-a-33`, `task-a-2`
- skills empty (flag not passed; trial `config.agent.skills: []`)

## Validity gate

| Check | Result |
|---|---|
| 12 trial dirs with `verifier/reward.txt` | Yes (4 tasks × 3 attempts) |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 12`) |
| Tokens | Job `n_input_tokens=27999978`, `n_cache_tokens=25676544`, `n_output_tokens=395150` (all non-zero) |
| Cost | Job `cost_usd=36.309942` |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `platform.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from `job.log` and all `pi.txt` (`has_401=False`); `job.log` Traceback count = 0; crude `401` in `job.log` = 0 |
| Bind-mount | wave14 home only (config + print-config) |
| Harbor `--skills` | Not passed (trial `result.json` `config.agent.skills: []`) |
| Skill checksum after job | still `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` |
| wave18 `pi-agent-home` | **does not exist** (jobs dir only) |
| wave17 home | untouched (`efe463b5b18f2f92b205e86d9962408b99c25d0da3d1059fb084b604e356fef9`) |
| wave14/holdout | not run, not mutated |

This is **not** a 401/0-token quarantine case. 12/12 completed.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Cost USD (meter) | Body loaded |
|---|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__3XHALfG` | 0 | 0.9500 | 19/20 | 2,931,733 / 22,465 | $3.082247 | True |
| task-a-1 | `task-a-1__mwNnbqA` | 0 | 0.0000 | 0/20 | 695,504 / 12,056 | $0.940768 | False |
| task-a-1 | `task-a-1__oZ57Uid` | 0 | 0.0500 | 1/20 | 1,318,909 / 19,250 | $1.656269 | True |
| task-a-2 | `task-a-2__XGCL6GK` | 0 | 0.9000 | 18/20 | 1,952,736 / 20,132 | $1.864728 | False |
| task-a-2 | `task-a-2__fv7ZY8d` | 0 | 0.6500 | 13/20 | 2,841,221 / 35,801 | $4.022791 | False |
| task-a-2 | `task-a-2__jJFD3cL` | 0 | 0.8000 | 16/20 | 2,138,256 / 31,867 | $2.415162 | False |
| task-a-33 | `task-a-33__MEfUUVh` | **1** | 1.0000 | 34/34 | 2,570,717 / 31,356 | $3.268441 | False |
| task-a-33 | `task-a-33__bS9aLs9` | 0 | 0.7941 | 27/34 | 1,964,236 / 21,590 | $2.211344 | True |
| task-a-33 | `task-a-33__sjw9KRd` | **1** | 1.0000 | 34/34 | 2,631,105 / 37,105 | $3.215235 | False |
| task-n-2 | `task-n-2__6tKkb9x` | 0 | 0.9048 | 19/21 | 3,018,453 / 46,378 | $3.610005 | False |
| task-n-2 | `task-n-2__YejCXuz` | 0 | 0.8571 | 18/21 | 3,937,811 / 77,040 | $6.811135 | False |
| task-n-2 | `task-n-2__i8AGbzt` | 0 | 0.7143 | 15/21 | 1,999,297 / 40,110 | $3.211817 | False |

Job `result.json` `reward_stats`: `1.0` = `{task-a-33__MEfUUVh, task-a-33__sjw9KRd}`, `0.0` = the other ten. Mean reward 0.1667. Harbor-computed `pass_at_k` for this job: `pass@2 = 0.25`.

Notable fail modes (from ctrf failed names):

- a-1 `3XHALfG`: Slack leftover (`test_slack_account_deactivated`) — 19/20, same leftover as several prior waves.
- a-1 `mwNnbqA`: 0/20 never-started / catalog-only (body not loaded).
- a-1 `oZ57Uid`: 1/20 GW freeze path not executed despite body_loaded=True.
- a-33 `bS9aLs9`: leftover-identity 27/34 (OneDrive share grants, Helios/Eng owners, GitHub deploy keys, app registration / SP neutralization).
- n-2 all three: restore/DNS incompleteness (`test_internal_api_02_undrained`, `test_legacy_dns_record_cleaned`; plus SG/NACL on the worst trial). Best close was 19/21 — **no 21/21**.

## k=3 metrics vs original wave-14 (same home, same model)

| Metric | Wave-18 E3 rerun | Wave-14 original | Delta |
|---|---|---|---|
| **Pass@1** (12 attempts) | **0.1667** (2/12) | 0.5000 (6/12) | −0.3333 |
| **Pass@3** | **0.2500** (a-33 only) | 0.7500 (a-1, a-33, n-2) | −0.50 |
| **Mean V** (12 attempts) | **0.7184** | 0.7436 | −0.0252 |
| **C_all** (Harbor meter / 12) | **$3.025829** | $3.017192 | +0.3% |
| **C_closed** (reward=1 only) | **$3.241838** (2 closes) | $4.017282 (6 closes) | — |
| a-1 Pass@k / mean V | **0/3** · 0.3333 | 2/3 · 0.6667 | **dropped** (best 19/20) |
| a-2 Pass@k / mean V | 0/3 · 0.7833 | 0/3 · 0.5000 | still no close; V up |
| a-33 Pass@k / mean V | **2/3** · 0.9314 | 2/3 · 0.8235 | **held** |
| n-2 Pass@k / mean V | **0/3** · 0.8254 | 2/3 · 0.9841 | **dropped** (best 19/21) |

Harbor UI: 12 trials, 0 exceptions, mean 0.167, Pass@2 0.250.

## a-33 / n-2 hold check (the discriminator)

| Task | Wave-14 Pass@3 | Wave-18 Pass@3 | Hold ≥2/3? |
|---|---|---|---|
| task-a-33 | 2/3 (34/34, 34/34, 16/34) | **2/3** (34/34, 27/34, 34/34) | **YES** |
| task-n-2 | 2/3 (21/21, 21/21, 20/21) | **0/3** (19/21, 18/21, 15/21) | **NO** |

Rule from the plan:

- If a-33 **and** n-2 hold Pass@3 (≥2/3 each) → H4 weakened / H3 supported.
- If a-33 **or** n-2 Pass@3 drops below 2/3 → **H4 supported**.

**Call: H4 supported (k=3 noise).** n-2 Pass@3 dropped 2/3 → 0/3 on an unmodified champion home. a-1 also dropped 2/3 → 0/3. a-33 held 2/3, so this is not a total collapse, but the discriminator only requires one of a-33/n-2 to drop.

H3 (unread-body tax from v2b) is **not** what this rerun measured: the file on disk is the original 2918-byte freeze-path-v2, not v2b. The drop happened **without** any skill edit, so the original 2/3 holds on a-33/n-2 are inside k=3 sampling noise. Wave-17’s 0/3 on a-33/n-2 cannot be attributed solely to unread-body tax until a noise floor with more attempts exists.

Secondary: a-1 20/20 count fell 2 → 0 (wave-14 had two 20/20; this rerun’s best was 19/20 Slack leftover). Mean V stayed close (0.718 vs 0.744) because partial credit on a-2/a-33/n-2 remained high — the binary close metric is the noisy one.

## Isolation (post-job fingerprints)

| Artifact | After E3 |
|---|---|
| wave14 `skills/freeze-path/SKILL.md` sha256 | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` (unchanged; 2918 bytes) |
| wave14 YAML-block sha | `0baf1cc537504acc20718348856adcc2842be891d1a56ae218b62b4a08d69b28` |
| wave14 `auth.json` / `models-store.json` | sha `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` (2 bytes) |
| wave14 `models.json` | sha `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` (130 bytes) |
| wave18 `pi-agent-home` | **absent** |
| wave18 `SKILL.md` | **absent** |
| wave17 freeze-path sha | still `efe463b5b18f2f92b205e86d9962408b99c25d0da3d1059fb084b604e356fef9` |
| wave14/holdout | not executed |

JSON homes for wave0–wave17 were not mutated. No restack of wave-15/16/17.

## Decision

**MEASUREMENT. Do not PROMOTE. Champion remains wave-14 freeze-path-v2.**

**H4 (k=3 noise) is supported.** The same unmodified skill, same model, same Harbor family, produced Pass@1 0.167 / Pass@3 0.25 versus the original 0.50 / 0.75. n-2 failed to close on all three attempts (best 19/21). A 4-task × k=3 canary is inside noise for binary Pass@k on a-1/a-33/n-2.

Implications (not executed in this job):

- Stop treating a single k=3 2/3 hold as a stable property of freeze-path-v2.
- Stop editing freeze-path to “recover” a-33/n-2 until a noise floor (more attempts, or repeated champion reruns) exists — E2 (endpoint stuffed into freeze-path) remains dead for the same reason.
- Wave-17 DISCARD still stands as a body-edit kill, but its a-33/n-2 0/3 is **confounded** with H4; it is not clean proof of unread-body tax.
- a-2 remains 0/3 on both draws; any a-2 path must not touch this file.
- Do not start another canary in this job.

Champion for any future challenger comparison is still `/home/azureuser/agent_evals/wave14/pi-agent-home` sha `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`.

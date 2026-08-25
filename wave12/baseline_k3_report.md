# ITSMBench wave-12 — DeepSeek V4 Flash 0731 k=3 re-baseline (official Harbor canary)

**Job (valid):** `/home/azureuser/agent_evals/wave12/jobs/wave12-pi-canary-dsflash-k3`  
**Job result:** `/home/azureuser/agent_evals/wave12/jobs/wave12-pi-canary-dsflash-k3/result.json`  
**Job id:** `9fcbb0c3-3f15-4e51-99e0-fe32851786b0`  
**Config:** `/home/azureuser/agent_evals/wave12/jobs/wave12-pi-canary-dsflash-k3/config.json`  
**Champion (frozen, untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or` (id `a84293f5-1154-414e-9d6a-b1e67165095b`, result.json size 1335, mtime `1787046882`)  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Agent / model:** Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731` (OpenRouter slug `deepseek/deepseek-v4-flash-0731` via bind-mounted `models.json` `providers.openai.baseUrl=https://openrouter.ai/api/v1`, `apiKey=$OPENAI_API_KEY`), `--agent-kwarg thinking=high`  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 3`  
**Bind-mount:** `/home/azureuser/agent_evals/wave12/pi-agent-home` → `/root/.pi/agent` (fresh wave-0 fork, no skills)  
**Tasks:** task-n-2, task-a-1, task-a-33, task-a-2 (frozen canary; dev/holdout not run)  
**Wall time:** 1h 03m 51s (`2026-08-19T09:57:23` → `11:01:14`)

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented. No secrets printed. This job is **baseline only**: no skills were added, Pi/tasks/verifiers were not edited, and Harbor `--skills` was not passed.

## Command run (official family, only `-m` and `-k` changed vs waves 8–11)

```
harbor run -a pi -m openai/deepseek/deepseek-v4-flash-0731 \
  --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
  --env-file .env \
  --jobs-dir /home/azureuser/agent_evals/wave12/jobs \
  --job-name wave12-pi-canary-dsflash-k3 \
  --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave12/pi-agent-home","target":"/root/.pi/agent"}]' \
  -p tasks -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
```

(workdir `/home/azureuser/agent_evals/ITSMBench`; `harbor run --print-config` confirmed model `openai/deepseek/deepseek-v4-flash-0731`, `n_attempts: 3`, and the wave-12 bind-mount before the real run.)

## Validity gate

| Check | Result |
|---|---|
| 12 trial dirs with `verifier/reward.txt` | Yes (4 tasks × 3 attempts) |
| Harbor exceptions | 0 (`n_errored_trials: 0`, `n_completed_trials: 12`) |
| Tokens | Job `n_input_tokens=19480241`, `n_cache_tokens=15723520`, `n_output_tokens=352888` (all non-zero) |
| Real auth signals (`invalid_api_key`, `api.openai.com`, `platform.openai.com`, `OpenAI API error`, `AuthenticationError`) | Absent from `job.log` and all 12 `agent/pi.txt` (`has_401=False`) |
| Crude substring `401` in `pi.txt` | Present (5–40 per trial) — **false positive** (IPs/port numbers); ignored |
| Bind-mount | wave12 home only (fresh fork, no skills) |
| Harbor `--skills` | Not passed (trial `result.json` `agent.skills: []`) |

This is **not** a 401/0-token quarantine case.

## Official per-attempt table (reward.txt / ctrf.json / trial result.json)

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Cost USD (meter) |
|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__oaoyKrK` | 0 | 0.0500 | 1/20 | 644,671 / 9,564 | $1.118723 |
| task-a-1 | `task-a-1__ghx3MxL` | 0 | 0.0500 | 1/20 | 653,558 / 10,012 | $2.007766 |
| task-a-1 | `task-a-1__Nv2GG3Q` | 0 | 0.0500 | 1/20 | 639,244 / 6,478 | $1.000160 |
| task-a-2 | `task-a-2__phGJzb8` | 0 | 0.6000 | 12/20 | 644,895 / 14,234 | $1.042215 |
| task-a-2 | `task-a-2__WMTv8mj` | 0 | 0.3500 | 7/20 | 1,266,628 / 18,702 | $3.105272 |
| task-a-2 | `task-a-2__eiVcj8E` | 0 | 0.4500 | 9/20 | 1,626,050 / 20,713 | $2.825176 |
| task-a-33 | `task-a-33__quw6YVx` | **1** | 1.0000 | 34/34 | 3,314,839 / 34,871 | $5.009381 |
| task-a-33 | `task-a-33__qXX5YqW` | 0 | 0.4706 | 16/34 | 1,008,600 / 16,355 | $1.575378 |
| task-a-33 | `task-a-33__VPKAg8N` | **1** | 1.0000 | 34/34 | 2,214,165 / 37,672 | $4.705497 |
| task-n-2 | `task-n-2__QT7XLjr` | **1** | 1.0000 | 21/21 | 3,478,135 / 92,507 | $6.689789 |
| task-n-2 | `task-n-2__aTPMypt` | 0 | 0.9048 | 19/21 | 2,215,426 / 45,869 | $5.024528 |
| task-n-2 | `task-n-2__iguKjF9` | 0 | 0.9048 | 19/21 | 1,774,030 / 45,911 | $3.128120 |

Job `result.json` `reward_stats`: `1.0` = `{task-a-33__quw6YVx, task-a-33__VPKAg8N, task-n-2__QT7XLjr}`, `0.0` = the other nine. Mean reward 0.250. Harbor-computed `pass_at_k` for this job: `pass@2 = 0.4167`.

## k=3 metrics

| Metric | Value | Basis |
|---|---|---|
| **Pass@1** (12 attempts) | **0.2500** | 3/12 rewards = 1 |
| **Pass@1** (task attempt-means) | **0.2500** | (0 + 0 + 2/3 + 1/3) / 4 |
| **Pass@3** (any of 3 attempts per task) | **0.5000** | a-33 ✓, n-2 ✓; a-1 ✗, a-2 ✗ |
| **Mean V** (12 attempts) | **0.5692** | mean of per-attempt CTRF pass fractions |
| **Mean V** (task means) | **0.5692** | a-1 0.050, a-2 0.467, a-33 0.824, n-2 0.936 |
| **C_all** (mean USD per task-attempt, Harbor meter) | **$3.102667** | job cost $37.232005 / 12 |
| **C_closed** (reward=1 attempts only) | **$5.468222** | mean of 3 closed attempts |

Per-task totals (3 attempts each): a-1 cost $4.126649 (V mean 0.050); a-2 cost $6.972663 (V mean 0.467); a-33 cost $11.290256 (V mean 0.824); n-2 cost $14.842437 (V mean 0.936).

### Cost-meter caveat (documented, not hidden)

Harbor Pi's metered `cost_usd` uses a per-model price table; `deepseek/deepseek-v4-flash-0731` is not in it, so usage records fall back to OpenAI-default rates (observed $0.00187 / 374 in ≈ **$5/M** input, $0.00405 / 135 out ≈ **$30/M** output, $0.00064 / 1280 cache ≈ **$0.5/M** cache-read). The plan's OpenRouter list-price projection ($0.0765 / $0.153 per 1M in/out, cache-read $0.0153) implies the *true* OpenRouter spend for this exact token mix is ≈ **$0.6 total** (~64× lower than the meter). **C_all = $3.103 is the official Harbor meter figure and is used consistently; it is a meter-relative number, not an OpenRouter invoice.** Cross-model cost comparisons (e.g., vs the gpt-5.6-sol champion) should treat both meters as harness-relative, and per-wave comparisons within the same model are the only strict apples-to-apples use.

## Class split (all 12 attempts, tags from `wave0/verifier_tags.json`)

| Class | Pass / N | Rate |
|---|---|---|
| **policy** | 92 / 165 | **0.5576** |
| **completeness** | 80 / 96 | 0.8333 |
| **hygiene** | 2 / 24 | 0.0833 |

Hygiene is the worst class: a-1 escalation-reason (0/3) plus a-2 problem-record/close-notes/assignment documentation (0–2/21 across attempts).

## Per-task fail taxonomy across attempts (CTRF traces)

**task-a-1 — 0/3 (V = 0.05 every attempt).** Only `test_okta_mfa_factors_preserved` passes. Every attempt failed all 19 others: `test_gw_account_suspended`, `test_gw_credential_reset_forced`, `test_gw_moved_into_legal_hold_ou`, all 11 `test_gw_token_revoked_*` (zoom, dropbox, asana, slack_connector, calendly, docusign, grammarly, trello, zapier, loom, notion), `test_slack_account_deactivated`, `test_sn_incident_routed_to_legal_hold_group`, `test_sn_incident_escalation_reason_recorded` (hygiene), `test_sn_incident_put_on_hold`, `test_okta_status_remains_suspended`. The agent read the systems (5 mock hosts contacted, 42 message turns in `Nv2GG3Q`) but performed **no legal-hold freeze**: Google Workspace account never suspended, no token revocation, no OU move, no Slack deactivation, ServiceNow never routed/put on hold. Same failure family as the gpt-5.6-sol champion (4/20) but strictly worse in expectation.

**task-a-2 — 0/3 (V = 0.35 / 0.45 / 0.60).** Persistent hygiene/documentation failures in all 3 attempts: `test_crowdstrike_detection_assigned_to_responder`, `test_incident_reclassified_security`, `test_incident_close_notes_name_malware`, `test_problem_root_cause_names_malware`, `test_problem_root_cause_names_exact_hash`, `test_problem_product_area_endpoint_security`, `test_problem_short_description_names_malware`, `test_asset_audited`. Partial/varies: `test_incident_state_closed` (1/3), `test_intune_defender_scan_ran` (2/3), `test_incident_inactive` (2/3), `test_incident_close_code_permanent` (2/3), `test_intune_device_not_wiped_or_retired` (2/3), `test_intune_device_resynced` (2/3), `test_intune_last_sync_advanced` (2/3). The agent reached crowdstrike/intune/servicenow/snipeit/search hosts (61 message turns in best trial `phGJzb8`); malware containment was partially handled but the problem record + close documentation and full close-out were left incomplete. Champion was 20/20 — **major regression vs gpt-5.6-sol on this ticket**.

**task-a-33 — 2/3 (V = 1.0 / 0.47 / 1.0).** Two perfect attempts (34/34, official reward 1). The failed attempt (`qXX5YqW`) dropped a large block of SharePoint/departing-access policy items (18 policy reds): Priya/Diego/Sana/Theo/Elena/Viktor SharePoint removals, OneDrive departed-share grants, `test_helios_site_retains_active_owner`, `test_eng_site_retains_active_owner`, `test_diego_github_deploy_key_removed`, `test_theo_github_deploy_key_removed`, `test_elena_app_registration_neutralized`, `test_viktor_service_principal_neutralized`. This is the same bimodal pattern seen across waves (a-33 passes wholesale or drops a cluster) — high per-attempt variance.

**task-n-2 — 1/3 (V = 1.0 / 0.905 / 0.905).** One perfect attempt (21/21, official reward 1). The two failing attempts each missed exactly `test_legacy_dns_record_cleaned`; `iguKjF9` also missed `test_payments_route_to_shared_not_blackholed`; `aTPMypt` also missed `test_internal_api_02_undrained`. All completeness-class (no policy reds on n-2).

## 0/3 investigation (a-1, a-2) — parser/format/auth ruled out

Mandated check before concluding model incapability: both 0/3 tasks were investigated and the failures are **genuine verifier assertions on live mock state**, not harness artifacts:

- **Auth/routing**: no real auth signals in `job.log` or any `pi.txt`; tokens per attempt are large (0.6M–3.5M in); model string in trial `result.json` is `openai/deepseek/deepseek-v4-flash-0731` (provider `openai`, OpenRouter-routed) — the job is not a 401/0-token quarantine case.
- **Verifier ran**: `verifier/ctrf.json` has per-test assertion traces (e.g., `E AssertionError: assert False is True` on `_gw_user().get("suspended")`); `verifier/test-stdout.txt` shows the verifier container executing; `reward.txt` present in all 12.
- **Agent was active**: a-1 `Nv2GG3Q` 42 message turns / 1.47 MB pi.txt / contacted google-workspace, okta, search, servicenow, slack mocks; a-2 `phGJzb8` 61 turns / 0.89 MB / contacted crowdstrike, microsoft-intune, search, servicenow, snipeit mocks. Trial logs show 0 exceptions.
- **Conclusion**: a-1 is a true policy/hold capability gap (agent reads but does not freeze); a-2 is a documentation/close-out gap. Not parser/format/auth.

## Contrast vs frozen champion (gpt-5.6-sol n=1, different model — NOT a promote)

| Metric | Wave-12 DeepSeek V4 Flash k=3 | Champion gpt-5.6-sol n=1 | Note |
|---|---|---|---|
| Pass@1 | 0.2500 (3/12 attempts) | 0.50 (2/4) | Different model + different n; not directly comparable |
| Pass@3 | 0.5000 (2/4 tasks) | — (n=1) | k=3 bounds the champion's single-draw estimate |
| Mean V | 0.5692 | 0.7706 | DeepSeek below champion on all four tasks except n-2 |
| a-1 V | 0.050 (0/3) | 0.200 (4/20) | Worse |
| a-2 V | 0.467 (0/3) | 1.000 (20/20) | **Major regression** |
| a-33 V | 0.824 (2/3) | 0.882 (30/34) | Similar ceiling, bimodal |
| n-2 V | 0.936 (1/3) | 1.000 (21/21) | Close, legacy-DNS drop |
| C_all (Harbor meter) | $3.103 | $1.484 | Meter-relative; DeepSeek true OpenRouter cost ≈ $0.6 (see caveat) |
| Policy reds (12-att aggregated) | 73/165 fail | 19/55 fail (per n=1) | Per-task-attempt basis differs; a-1 drives the wave-12 reds |

**This comparison is descriptive only (different model, different attempt count).** It does **not** promote any skill stack, wave-11 home, or this job. The frozen champion (`wave0-pi-canary-or`) remains the official gpt-5.6-sol champion and was not mutated.

## Verdict

**NEW BASELINE — DeepSeek V4 Flash 0731 (OpenRouter `deepseek/deepseek-v4-flash-0731`, thinking=high) at k=3 on the frozen 4-task canary:**

- **Pass@1 = 0.250** (3/12 attempts), **Pass@3 = 0.500**, **mean V = 0.569**, **C_all = $3.103/task-attempt** (Harbor meter; true OpenRouter spend ≈ $0.6).
- Valid job (12 reward.txt, tokens > 0, real auth `has_401=False`, 0 errored trials). **Not QUARANTINE.**
- The cheap model is materially weaker than gpt-5.6-sol on a-2 (containment + problem/close documentation) and a-1 (legal-hold freeze), and bimodal on a-33/n-2. Its k=3 estimate gives a stable expected-value floor: **expect ~0.25 Pass@1, ~0.5 Pass@3** on this canary for future DeepSeek-based lever experiments.
- Cost at OpenRouter list price is ~64× below the metered figure, which is the real operational takeaway: if this model class is chosen, `C_all` for budgeting should use OpenRouter invoice data, not the Harbor meter default table.

## Isolation checks (all pass)

- **Wave-0 home untouched:** `/home/azureuser/agent_evals/wave0/pi-agent-home` still only `auth.json`, `models-store.json`, `models.json`; checksums still `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` (×2) and `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8`.
- **Wave-12 home is a checksum-matching fresh fork:** exactly the same three files with identical checksums; **no `skills/` directory**; no `APPEND_SYSTEM.md`, `SYSTEM.md`, `extensions/`, `leftover_scan`, or `close_gate`.
- **Champion fingerprints unchanged:** `wave0-pi-canary-or/result.json` size **1335**, mtime **1787046882**, id **`a84293f5-1154-414e-9d6a-b1e67165095b`**.
- **Prior waves untouched:** wave-8 `result.json` 1326/1787078227, wave-9 1337/1787083099, wave-10 1335/1787126508, wave-11 1335/1787130149 (all unchanged from prior reports).
- No writes under wave0–wave11; no secrets printed; no `rm` of absolute paths outside `/tmp`.

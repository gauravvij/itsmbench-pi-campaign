# ITSMBench wave-0 Pi baseline (frozen 4-task canary)

**Job (valid):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Job result:** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or/result.json`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high`  
**Environment:** local Docker, `--no-delete`, `--env-file .env`, one attempt each (`-k` default 1), concurrency `-n 4`  
**Wall time:** 6m 23s (`2026-08-18T09:48:19` → `09:54:42`)  
**No agent change was implemented.** Dev/holdout 12-task sets were not run.

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented.

---

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=5618083`, `n_output_tokens=38449` (non-zero) |
| `api.openai.com` / OpenAI 401 | Absent from all four `agent/pi.txt` |
| Multi-turn Pi | 20 / 25 / 33 / 42 assistant `message_end` events |

An earlier job, `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary`, finished in ~60s with all rewards `0.0`, **0 tokens**, and Pi `OpenAI API error (401)` against `platform.openai.com`. That run is **not** this baseline. Pi’s built-in `openai` provider ignores `OPENAI_BASE_URL`; routing was fixed without changing the agent by bind-mounting a secret-free `~/.pi/agent/models.json` (`providers.openai.baseUrl=https://openrouter.ai/api/v1`, `apiKey=$OPENAI_API_KEY`) from `/home/azureuser/agent_evals/wave0/pi-agent-home`. OpenRouter preflight for `openai/gpt-5.6-sol` was HTTP 200 on both `/chat/completions` and `/responses`.

---

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`. Job `pass_at_k` is empty because `-k` is 1; Pass@1 is the fraction of tasks with official reward `1.0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__EoHcP4m` | **1** | `.../task-n-2__EoHcP4m/verifier/reward.txt` |
| task-a-1 | `task-a-1__DEcrs79` | **0** | `.../task-a-1__DEcrs79/verifier/reward.txt` |
| task-a-33 | `task-a-33__Dk92zX2` | **0** | `.../task-a-33__Dk92zX2/verifier/reward.txt` |
| task-a-2 | `task-a-2__Z9C5YqQ` | **1** | `.../task-a-2__Z9C5YqQ/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: `1.0` = `{task-a-2, task-n-2}`, `0.0` = `{task-a-33, task-a-1}`. Mean reward **0.500**.

**Pass@1 = 2/4 = 0.50**

---

## Mean verifier fraction V

`V_task` = `ctrf.results.summary.passed / tests` (pytest-json-ctrf). Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 21/21 | 1.000 | `task-n-2__EoHcP4m/verifier/ctrf.json` |
| task-a-1 | 4/20 | 0.200 | `task-a-1__DEcrs79/verifier/ctrf.json` |
| task-a-33 | 30/34 | 0.882 | `task-a-33__Dk92zX2/verifier/ctrf.json` |
| task-a-2 | 20/20 | 1.000 | `task-a-2__Z9C5YqQ/verifier/ctrf.json` |

**Mean V = (1 + 0.2 + 30/34 + 1) / 4 = 0.7706**

Every CTRF test name appears exactly once in `verifier_tags.json` (95 tests: 21+20+34+20).

---

## Cost (C_all)

Metered by Harbor Pi from `pi.txt` `message_end` usage (`populate_context_post_run`). Job-level totals in `wave0-pi-canary-or/result.json` `stats`:

| | Input tokens | Cache tokens | Output tokens | USD |
|---|---|---|---|---|
| Job | 5,618,083 | 5,617,723 | 38,449 | **5.93755** |

| Task | `n_input_tokens` | `n_output_tokens` | `cost_usd` (trial `result.json`) |
|---|---|---|---|
| task-a-1 | 580,790 | 7,552 | 0.91592 |
| task-a-2 | 1,518,553 | 7,801 | 1.61438 |
| task-a-33 | 1,042,720 | 8,530 | 1.11524 |
| task-n-2 | 2,476,020 | 14,566 | 2.29201 |

**C_all = mean USD / task = 5.93755 / 4 = 1.48439**  
**C_closed** (reward=1 only; secondary, not the cap) = (1.61438 + 2.29201) / 2 = **1.95319**

Almost all billed input is cache (`n_cache_tokens ≈ n_input_tokens`). Cost is meterable from official Pi usage; treat **B = C_all = $1.484 / task** as the frozen wave-0 spend cap unless a 1.5× budget is declared later.

---

## Policy vs completeness vs hygiene

Tags from `/home/azureuser/agent_evals/wave0/verifier_tags.json` (`itsmbench-wave0-verifier-tags-v1`). Pass/fail from official CTRF.

| Class | Pass / N | Rate | Notes |
|---|---|---|---|
| **policy** | 36 / 55 | **0.655** | All 20 failures that matter for veto live here (19 policy + 1 hygiene on a-1) |
| **completeness** | 32 / 32 | **1.000** | Zero completeness reds on the canary |
| **hygiene** | 7 / 8 | 0.875 | Single miss: a-1 escalation reason |

### Per-task class mix

| Task | Reward | Policy | Completeness | Hygiene |
|---|---|---|---|---|
| task-n-2 | 1 | — | 21/21 | — |
| task-a-2 | 1 | 3/3 | 10/10 | 7/7 |
| task-a-33 | 0 | 29/33 | 1/1 | — |
| task-a-1 | 0 | 4/19 | — | 0/1 |

### Failure taxonomy (from CTRF traces)

**task-a-1 (legal-hold / compromised-account freeze — mostly missed).**  
Caller asked to restore Slack/Gmail after an Okta phone-number change. Verifiers require a **hold / do-not-restore** end-state. Agent got the identity-core right and then stopped short:

- Passed policy: GW account suspended; Okta remains suspended; Okta MFA factors preserved; SN routed to legal-hold group.
- Failed policy: GW still in `/Finance` not `/Legal Hold`; `changePasswordAtNextLogin` false; 11 OAuth tokens still present (zoom, dropbox, asana, slack connector, calendly, docusign, grammarly, trello, zapier, loom, notion); Slack `deleted=false`; SN state `7` (closed) instead of `3` (on hold).
- Failed hygiene: escalation reason not recorded.

This is **under-remediation of a policy hold**, plus closing the ticket as resolved.

**task-a-33 (quarterly contractor offboarding — almost complete).**  
30/34 passed, including ticket-closed completeness. Four leftover-access policy reds:

- GitHub deploy keys still present: Diego `id=501` on `contoso/helios-infra`, Theo `id=504` on `contoso/data-platform`.
- Elena still owns app registration `app-partner-sync` / Partner Data Sync Connector.
- Viktor still owns enabled service principal `sp-export-bot`.

Human/guest disable + group/SharePoint/OneDrive cleanup succeeded; **non-human artifacts** (deploy keys, app registrations, service principals) were missed.

**task-n-2 and task-a-2:** official reward 1, every verifier green (incident RCA + malware containment/lift). Completeness on those two tasks is not the wave-0 fire.

---

## First lever recommendation (do not implement)

**Do not change the agent in this wave.** The baseline failure mix is **policy leftover-access / incomplete hold**, not wrong-root-cause and not missing operational writes.

Recommended **first experiment after this report** (one lever only):

> **Non-human + hold closeout checklist before ticket close.**  
> After the human/device path looks done, enumerate remaining owned artifacts (GitHub deploy keys, Entra/M365 applications and service principals) and, on hold/compromise tickets, finish the freeze (OU move, token revoke, Slack deactivate, SN on-hold) instead of closing as resolved.

Why this and not the other menu items:

| Candidate | Why not first |
|---|---|
| Investigation / corroborate ≥2 systems | n-2 and a-2 already Pass@1; completeness 32/32 |
| Tool-discovery-first | Agent found the mock APIs (multi-turn, high V on a-33) |
| Anti-over-remediation | Failures are *missed* hold/revoke, not extra wipes |
| Step/tool cap or cheaper thinking | C_all is defined; cost is not the binding failure. Trimming first would risk the investigation that already closes n-2/a-2 |

Promotion / veto for later waves: discard any candidate that **increases policy-fail count** vs this champion (19 policy reds), even if Pass@1 or V rises. Hard cost cap **B = $1.484 / task** (`C_all` above).

---

## Champion snapshot (frozen)

```
Pass@1     = 0.50          (2/4 official reward.txt)
V          = 0.7706        (mean CTRF pass fraction)
C_all      = $1.484 / task (Pi usage; B := C_all)
C_closed   = $1.953 / closed ticket (secondary)
policy     = 36/55 = 0.655
completeness = 32/32 = 1.000
hygiene    = 7/8 = 0.875
```

Invalid job `wave0-pi-canary` must not be used as champion or as a cost baseline.

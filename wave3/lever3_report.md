# ITSMBench wave-3 lever 3 — conditional close-gate Pi extension

**Job (valid):** `/home/azureuser/agent_evals/wave3/jobs/wave3-pi-canary-closegate`  
**Job result:** `/home/azureuser/agent_evals/wave3/jobs/wave3-pi-canary-closegate/result.json`  
**Job id:** `22b4e5e6-0999-4203-8cea-aae59e97709d`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Wave-1 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave1/jobs/wave1-pi-canary-closeout`  
**Wave-2 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave2/jobs/wave2-pi-canary-leftover`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Single lever:** `/home/azureuser/agent_evals/wave3/pi-agent-home/extensions/close_gate.ts` bind-mounted at `/root/.pi/agent`  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file .env`, `-n 4`, `-k 1`  
**Wall time:** 14m 11s (`2026-08-18T12:36:42` → `12:50:53`)  
**Dev/holdout were not run. No second lever. Pi binary / tasks / verifiers were not edited.**

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, `verifier/test-stdout.txt`, trial `result.json`, job `result.json`). Nothing is invented.

## What changed (one lever)

Wave-0 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave3/pi-agent-home`. Only the wave-3 copy received `extensions/close_gate.ts`. There is **no** `APPEND_SYSTEM.md` and **no** `SYSTEM.md`. The extension is a headless `tool_call` interceptor:

- Accumulates session / tool text.
- Intercepts `bash` only.
- Detects mutating ticket resolve/close only (ServiceNow PATCH/POST/PUT incident with `state` 6/7 or `active` false; Jira/JSM transition POST whose catalog name is done/complete/resolve/close; id `11` Start progress is not close).
- Fires only if accumulated corpus matches legal-hold (`legal hold` / `litigation` / `preservation hold` / `LIT-`) or offboarding (`offboard` / `contractor` / `departed` / `leaver`).
- Legal-hold: block resolve/close; allow on-hold / routing.
- Offboarding: block close until ≥2 leftover-access categories appear in prior bash (deploy/machine keys, app registrations, service principals/workload identities, OAuth/connector revocation, ownerless site/group ownership).
- Returns `{ block: true, reason }` only. No UI.

Wave-0 home is unchanged and still has no `extensions/` and no `APPEND_SYSTEM.md`. Wave-1 / wave-2 overlays and jobs were not mutated. Champion job `result.json` remains size 1335, mtime `1787046882`. Wave-1 job `result.json` remains size 1267, mtime `1787050357`. Wave-2 job `result.json` remains size 1269, mtime `1787052232`.

Routing is the same as the champion: Pi ignores `OPENAI_BASE_URL`; `models.json` sets `providers.openai.baseUrl=https://openrouter.ai/api/v1` and `apiKey=$OPENAI_API_KEY`.

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes (`task-n-2__pq65bKU`, `task-a-1__2YuE9br`, `task-a-33__oz5WAEs`, `task-a-2__onBzoKM`) |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=7478351`, `n_output_tokens=46980` (non-zero) |
| Real OpenAI / HTTP 401 / `api.openai.com` / `invalid_api_key` / `platform.openai.com` | Absent from all four `agent/pi.txt` (`has_401=False`) |
| Crude substring `401` in `pi.txt` | Present on a-1 (21), a-2 (47), n-2 (135) — **false positive; ignored** |
| Multi-turn Pi | 36 / 31 / 33 / 39 assistant `message_end` events |

This is **not** a 401/0-token quarantine case. Compare invalid wave-0 job `wave0-pi-canary` (0 tokens, OpenAI 401). Do not treat that job as a peer. One `unauthorized` hit on n-2 is ticket RCA wording (“unauthorized change”), not an API auth failure.

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__pq65bKU` | **1** | `.../task-n-2__pq65bKU/verifier/reward.txt` |
| task-a-1 | `task-a-1__2YuE9br` | **0** | `.../task-a-1__2YuE9br/verifier/reward.txt` |
| task-a-33 | `task-a-33__oz5WAEs` | **0** | `.../task-a-33__oz5WAEs/verifier/reward.txt` |
| task-a-2 | `task-a-2__onBzoKM` | **0** | `.../task-a-2__onBzoKM/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: `1.0` = `{task-n-2__pq65bKU}`, `0.0` = `{task-a-33, task-a-1, task-a-2}`. Mean reward **0.250**.

**Pass@1 = 1/4 = 0.25** (champion 2/4 = 0.50; a-2 flipped)

## Mean verifier fraction V

`V_task` = `ctrf.results.summary.passed / tests`. Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 21/21 | 1.0000 | `task-n-2__pq65bKU/verifier/ctrf.json` |
| task-a-1 | 19/20 | 0.9500 | `task-a-1__2YuE9br/verifier/ctrf.json` |
| task-a-33 | 25/34 | 0.7353 | `task-a-33__oz5WAEs/verifier/ctrf.json` |
| task-a-2 | 9/20 | 0.4500 | `task-a-2__onBzoKM/verifier/ctrf.json` |

**Mean V = (21/21 + 19/20 + 25/34 + 9/20) / 4 = 0.7838** (champion 0.7706)

Every CTRF test name appears exactly once in `verifier_tags.json` (95 tests: 21+20+34+20).

## Cost (C_all)

Metered by Harbor Pi from `pi.txt` `message_end` usage. Job-level totals in `wave3-pi-canary-closegate/result.json` `stats`:

| | Input tokens | Cache tokens | Output tokens | USD |
|---|---|---|---|---|
| Job | 7,478,351 | 7,477,934 | 46,980 | **7.44097075** |

| Task | `n_input_tokens` | `n_output_tokens` | `cost_usd` (trial `result.json`) |
|---|---|---|---|
| task-a-1 | 1,033,119 | 7,131 | 1.087813 |
| task-a-2 | 3,023,025 | 11,949 | 2.852376 |
| task-a-33 | 1,463,146 | 11,575 | 1.5457685 |
| task-n-2 | 1,959,061 | 16,325 | 1.95501325 |

**C_all = mean USD / task = 7.44097075 / 4 = 1.86024**  
**C_closed** (reward=1 only; secondary) = **1.95501** (n-2 only)

Frozen wave-0 cap **B = $1.484 / task**. This lever is **over budget** (C_all − B = +$0.376 / task). Not ≥15% cheaper.

## Policy vs completeness vs hygiene

Tags from `/home/azureuser/agent_evals/wave0/verifier_tags.json`. Pass/fail from official CTRF.

| Class | Wave-3 pass / N | Wave-3 rate | Champion | Δ reds |
|---|---|---|---|---|
| **policy** | 45 / 55 | **0.818** | 36/55 (19 reds) | **−9 reds** (10 reds) |
| **completeness** | 28 / 32 | **0.875** | 32/32 (0 reds) | **+4 reds** |
| **hygiene** | 1 / 8 | **0.125** | 7/8 (1 red) | **+6 reds** |

### Per-task class mix

| Task | Reward | Policy | Completeness | Hygiene | Champion reward / V |
|---|---|---|---|---|---|
| task-n-2 | 1 | — | 21/21 | — | 1 / 21/21 |
| task-a-2 | 0 | 3/3 | 6/10 | 0/7 | 1 / 20/20 |
| task-a-33 | 0 | 24/33 | 1/1 | — | 0 / 30/34 |
| task-a-1 | 0 | 18/19 | — | 1/1 | 0 / 4/20 |

### Failure taxonomy (from official `test-stdout.txt`)

**task-a-1 (legal-hold — nearly complete, still reward 0).**  
19/20 (champion 4/20). Freeze path now matches the hold end-state wave-0 missed: GW suspended + Legal Hold OU, password reset forced, 11 OAuth tokens revoked, SN routed to legal-hold group, SN state `3` (on hold), escalation reason recorded, Okta still suspended with MFA preserved. Single remaining policy red:

- Failed policy: `test_slack_account_deactivated` (`deleted=false` on Slack user `U42543D3ED`).

The gate allowed the on-hold PATCH (`state: "3"`) and did not need to block a resolve/close (none attempted). This is leftover Slack deactivation, not a close-gate miss.

**task-a-33 (offboarding — machine identities green; SharePoint leftovers).**  
25/34 (champion 30/34). Ticket closed (`test_ticket_closed` passed). The four leftover-non-human asserts the gate was meant to force are **green** (`test_diego_github_deploy_key_removed`, `test_theo_github_deploy_key_removed`, `test_elena_app_registration_neutralized`, `test_viktor_service_principal_neutralized`). Nine remaining policy reds are SharePoint / ownerless-site grants:

- Priya finance / exec / portfolio / guest comms site removals
- Diego research site
- Theo ops site
- Elena portfolio site
- Viktor eng site + `test_eng_site_retains_active_owner`

No `Resolve/close blocked` strings in this trial’s `pi.txt`. The agent enumerated enough leftover categories to satisfy the ≥2 evidence rule and closed via Jira transition id `21`.

**task-n-2 (incident — still Pass@1).**  
21/21. Ordinary restore/close. Gate did not fire (no legal-hold / offboarding corpus). Completeness including `test_incident_closed` all green.

**task-a-2 (malware laptop — operational close blocked).**  
9/20 (champion 20/20). Policy 3/3: CrowdStrike containment lifted, device not wiped/retired, still compliant. Completeness 6/10 (hash blocked, detection closed, Intune scan/resync/sync, IOC escalated). Remaining reds are ticket close + problem RCA + hygiene:

- Completeness: `test_incident_state_closed`, `test_incident_inactive`, `test_problem_root_cause_names_malware`, `test_problem_root_cause_names_exact_hash`
- Hygiene: detection assignee, security reclass, close code/notes, product-area, problem short description, asset audit

`pi.txt` contains **10** `Resolve/close blocked: session text indicates a legal or preservation hold, litigation, or LIT- case` tool results (`isError: true`). The agent’s SN PATCH with `"state":"7","active":false` was intercepted. This is a **false-positive legal-hold classification** on a malware-as-laptop ticket.

Root cause in official `pi.txt`: accumulated search/catalog text, not the ticket. Zoom admin OAuth scopes (`chat_history_legal_hold:read:admin`) and a ServiceNow search result for “legal hold preservation litigation records” matched `legal[\s_-]+hold` / `litigation` in the session corpus. The gate then treated every subsequent resolve/close as a hold case. a-2 is not a legal-hold ticket; champion already closed it.

## Versus frozen champion

| Metric | Champion `wave0-pi-canary-or` | Lever 3 `wave3-pi-canary-closegate` | Delta |
|---|---|---|---|
| Pass@1 | 0.50 (a-2, n-2) | **0.25** (n-2 only) | −0.25 |
| Mean V | 0.7706 | **0.7838** | +0.0132 |
| C_all | $1.484 / task (= B) | **$1.860 / task** | +$0.376 (over B) |
| C_closed | $1.953 | $1.955 | +$0.002 |
| Policy | 36/55 (19 reds) | **45/55 (10 reds)** | −9 policy reds |
| Completeness | 32/32 | **28/32** | +4 completeness reds |
| Hygiene | 7/8 | **1/8** | +6 hygiene reds |

### Wave-1 / wave-2 discard (contrast only, not promotion peers)

| | Wave-1 overlay | Wave-2 overlay | Wave-3 extension |
|---|---|---|---|
| Lever | hold / don’t-close `APPEND_SYSTEM.md` | leftover-non-human `APPEND_SYSTEM.md` | `extensions/close_gate.ts` |
| Pass@1 | 0.00 | 0.00 | 0.25 |
| Mean V | 0.7432 | 0.5804 | 0.7838 |
| C_all | $1.684 | $1.267 | $1.860 |
| Policy | 52/55 (3 reds) | 38/55 (17 reds) | 45/55 (10 reds) |
| Completeness | 22/32 | 16/32 | 28/32 |
| Hygiene | 0/8 | 1/8 | 1/8 |
| a-2 / n-2 | both flipped | both flipped | n-2 held; **a-2 flipped** |
| Decision | DISCARD | DISCARD | DISCARD |

Wave-1 collapsed a-2 by always-on hold wording. Wave-3 collapsed a-2 by a **conditional** gate that misfired on catalog “legal hold” strings. Different mechanism, same champion-pass regression.

## Promotion rule applied

Promote only if official scores are real (`tokens>0`, `has_401=False`) **AND** policy reds ≤19 **AND** C_all ≤ $1.484 **AND** Pass@1 ≥ 0.50 with a-2 and n-2 still passing **AND** (V ≥ 0.8206 **or** V ≥ 0.7706 at ≥15% cheaper).

| Gate | Result |
|---|---|
| tokens>0, has_401=False | **PASS** (7.48M in / 47k out; no real auth 401) |
| policy reds ≤ 19 | **PASS** (10) |
| C_all ≤ $1.484 | **FAIL** ($1.860) |
| Pass@1 ≥ 0.50 and a-2 + n-2 still pass | **FAIL** (0.25; a-2 reward 0) |
| V ≥ 0.8206 | **FAIL** (0.7838) |
| V ≥ 0.7706 at ≥15% cheaper | **FAIL** (V ok, cost +25% not −15%) |

## Decision: **DISCARD**

Do not promote `extensions/close_gate.ts` as the new champion.

Reasons (all from official files above):

1. **Pass@1 0.50 → 0.25.** Champion pass `task-a-2` flipped to reward 0. `task-n-2` still passes.
2. **C_all $1.860 > B $1.484.** Over the frozen spend cap; a-2 alone cost $2.85 after the gate loop.
3. **V did not clear +0.05** (0.7838 < 0.8206) and the run is not cheaper.
4. Completeness 32/32 → 28/32 and hygiene 7/8 → 1/8 are the a-2 close/RCA bookkeeping the false-positive block prevented.

Keep `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or` as champion. Keep the wave-3 fork and job on disk for contrast. Do **not** stack a tighter classifier on this discarded home; any next lever must fork wave-0 again.

Useful signal (not a ship): a-1 V 0.200 → 0.950 and policy 4/19 → 18/19 with SN left on hold; a-33 machine-identity leftovers went green and the ticket still closed. The gate *can* be conditional. The legal-hold detector cannot treat raw tool corpus as ticket class — Zoom scope names and search hits are not a LIT- case.

## Isolation checks

| Check | Result |
|---|---|
| Wave-0 `pi-agent-home` files | `auth.json`, `models-store.json`, `models.json` only — no `extensions/`, no `APPEND_SYSTEM.md`, no `SYSTEM.md` |
| Wave-1 / wave-2 homes | Unchanged (`APPEND_SYSTEM.md` + copied models/auth only) |
| Wave-3 home | `auth.json`, `models-store.json`, `models.json`, `extensions/close_gate.ts` only |
| `APPEND_SYSTEM.md` / `SYSTEM.md` on wave-3 | No |
| Task / person / pytest IDs in `close_gate.ts` | None |
| Wave-1 hold / don’t-close wording in `close_gate.ts` | None |
| Champion `result.json` | size 1335, mtime 1787046882 (unchanged) |
| Wave-1 `result.json` | size 1267, mtime 1787050357 (unchanged) |
| Wave-2 `result.json` | size 1269, mtime 1787052232 (unchanged) |
| Images reused | existing `harbor.local/task-main` + `harbor.local/taskgen-emulator` (no rebuild) |
| Secrets printed | No |
| `docker info` / `harbor --help` | exit 0; no package reinstall |

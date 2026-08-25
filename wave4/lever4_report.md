# ITSMBench wave-4 lever 4 — record-only legal-hold close-gate

**Job (valid):** `/home/azureuser/agent_evals/wave4/jobs/wave4-pi-canary-holdrecord`  
**Job result:** `/home/azureuser/agent_evals/wave4/jobs/wave4-pi-canary-holdrecord/result.json`  
**Job id:** `972dd34c-c317-431b-8734-a6903bb42077`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Wave-1 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave1/jobs/wave1-pi-canary-closeout`  
**Wave-2 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave2/jobs/wave2-pi-canary-leftover`  
**Wave-3 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave3/jobs/wave3-pi-canary-closegate`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Single lever:** `/home/azureuser/agent_evals/wave4/pi-agent-home/extensions/close_gate.ts` bind-mounted at `/root/.pi/agent`  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file .env`, `-n 4`, `-k 1`  
**Wall time:** 8m 13s (`2026-08-18T13:47:33` → `13:55:47`)  
**Dev/holdout were not run. No second lever. Pi binary / tasks / verifiers were not edited.**

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, `verifier/test-stdout.txt`, trial `result.json`, job `result.json`). Nothing is invented.

## What changed (one lever)

Wave-0 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave4/pi-agent-home`. Only the wave-4 copy received `extensions/close_gate.ts`. There is **no** `APPEND_SYSTEM.md` and **no** `SYSTEM.md`. The fork is **not** stacked on discarded wave-1 / wave-2 overlays or the discarded wave-3 `close_gate.ts`.

The extension is a headless `tool_call` interceptor (record-only hold):

- Tracks `toolCallId` → bash command.
- Ingests **only** `tool_execution_end` / `tool_result` text.
- Skips `search.local.mock` commands and catalog-shaped results (`operationId` / provider search hits).
- Strips OAuth-scope `*_legal_hold` tokens (the wave-3 Zoom `chat_history_legal_hold` false positive).
- Record-like hold only on `LIT-\d{2,}`, `litigation hold`, `preservation hold`, `Legal Hold Review`, `orgUnitPath` … `Legal Hold`. **Never** bare `legal[\s_-]+hold`.
- Intercepts bash mutating ServiceNow incident close (`state` 6/7 or `active` false) and Jira **close-named** transitions only.
- If hold evidence: `return { block: true, reason }` asking for on-hold / routing. No leftover / offboarding branch. No UI.

Wave-0 home is unchanged and still has no `extensions/` and no `APPEND_SYSTEM.md`. Wave-1 / wave-2 / wave-3 homes and jobs were not mutated. Champion job `result.json` remains size 1335, mtime `1787046882`. Wave-1 job `result.json` remains size 1267, mtime `1787050357`. Wave-2 job `result.json` remains size 1269, mtime `1787052232`.

Routing is the same as the champion: Pi ignores `OPENAI_BASE_URL`; `models.json` sets `providers.openai.baseUrl=https://openrouter.ai/api/v1` and `apiKey=$OPENAI_API_KEY`.

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes (`task-n-2__2yQfwgR`, `task-a-1__Y4fQkc8`, `task-a-33__8FRKa7X`, `task-a-2__AenkceY`) |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=4538395`, `n_output_tokens=37901` (non-zero) |
| Real OpenAI / HTTP 401 / `api.openai.com` / `invalid_api_key` / `platform.openai.com` / `OpenAI API error (401)` | Absent from all four `agent/pi.txt` (`has_401=False`) |
| Crude substring `401` in `pi.txt` | Present on a-1 (15), a-2 (30), n-2 (19) — **false positive; ignored** |
| Multi-turn Pi | 82 / 77 / 125 / 121 `message_end` events |

This is **not** a 401/0-token quarantine case. Compare invalid wave-0 job `wave0-pi-canary` (0 tokens, OpenAI 401). Do not treat that job as a peer.

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__2yQfwgR` | **0** | `.../task-n-2__2yQfwgR/verifier/reward.txt` |
| task-a-1 | `task-a-1__Y4fQkc8` | **0** | `.../task-a-1__Y4fQkc8/verifier/reward.txt` |
| task-a-33 | `task-a-33__8FRKa7X` | **0** | `.../task-a-33__8FRKa7X/verifier/reward.txt` |
| task-a-2 | `task-a-2__AenkceY` | **0** | `.../task-a-2__AenkceY/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: `0.0` = `{task-a-33, task-a-1, task-a-2, task-n-2}`. Mean reward **0.000**.

**Pass@1 = 0/4 = 0.00** (champion 2/4 = 0.50; **a-2 and n-2 both flipped**)

## Mean verifier fraction V

`V_task` = `ctrf.results.summary.passed / tests`. Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 10/21 | 0.4762 | `task-n-2__2yQfwgR/verifier/ctrf.json` |
| task-a-1 | 6/20 | 0.3000 | `task-a-1__Y4fQkc8/verifier/ctrf.json` |
| task-a-33 | 31/34 | 0.9118 | `task-a-33__8FRKa7X/verifier/ctrf.json` |
| task-a-2 | 12/20 | 0.6000 | `task-a-2__AenkceY/verifier/ctrf.json` |

**Mean V = (10/21 + 6/20 + 31/34 + 12/20) / 4 = 0.5720** (champion 0.7706)

Every CTRF test name appears exactly once in `verifier_tags.json` (95 tests: 21+20+34+20).

## Cost (C_all)

Metered by Harbor Pi from `pi.txt` `message_end` usage. Job-level totals in `wave4-pi-canary-holdrecord/result.json` `stats`:

| | Input tokens | Cache tokens | Output tokens | USD |
|---|---|---|---|---|
| Job | 4,538,395 | 4,538,059 | 37,901 | **5.21895825** |

| Task | `n_input_tokens` | `n_output_tokens` | `cost_usd` (trial `result.json`) |
|---|---|---|---|
| task-a-1 | 468,128 | 7,755 | 0.7865965 |
| task-a-2 | 840,190 | 8,108 | 1.1790935 |
| task-a-33 | 1,905,580 | 10,724 | 1.73722175 |
| task-n-2 | 1,324,497 | 11,314 | 1.5160465 |

**C_all = mean USD / task = 5.21895825 / 4 = 1.30474**  
**C_closed** (reward=1 only; secondary) = **n/a** (no reward=1 trials)

Frozen wave-0 cap **B = $1.484 / task**. This lever is **under budget** (C_all − B = −$0.179 / task; about **12.1% cheaper**, not ≥15%).

## Policy vs completeness vs hygiene

Tags from `/home/azureuser/agent_evals/wave0/verifier_tags.json`. Pass/fail from official CTRF.

| Class | Wave-4 pass / N | Wave-4 rate | Champion | Δ reds |
|---|---|---|---|---|
| **policy** | 39 / 55 | **0.709** | 36/55 (19 reds) | **−3 reds** (16 reds) |
| **completeness** | 17 / 32 | **0.531** | 32/32 (0 reds) | **+15 reds** |
| **hygiene** | 3 / 8 | **0.375** | 7/8 (1 red) | **+4 reds** |

### Per-task class mix

| Task | Reward | Policy | Completeness | Hygiene | Champion reward / V |
|---|---|---|---|---|---|
| task-n-2 | 0 | — | 10/21 | — | 1 / 21/21 |
| task-a-2 | 0 | 3/3 | 6/10 | 3/7 | 1 / 20/20 |
| task-a-33 | 0 | 30/33 | 1/1 | — | 0 / 30/34 |
| task-a-1 | 0 | 6/19 | — | 0/1 | 0 / 4/20 |

### Failure taxonomy (from official `test-stdout.txt` / CTRF)

**task-a-1 (legal-hold — gate fired; freeze incomplete).**  
6/20 (champion 4/20). Official `pi.txt` has **5** `Resolve/close blocked: record-like hold evidence is present` tool results. The agent left SN on hold and routed to the Legal Hold Review group; GW/Okta stay suspended; Slack deactivated. Remaining policy reds are the freeze path the champion also mostly missed (credential reset, Legal Hold OU, 11 OAuth token revokes) plus hygiene escalation reason.

This is the intended fire: `LIT-\d{2,}` / `litigation hold` / `Legal Hold Review` in tool **results**, not catalog search. No `chat_history_legal_hold` on this trial.

**task-a-2 (malware laptop — gate did not fire).**  
12/20 (champion 20/20). **0** `Resolve/close blocked` strings. Ticket close checks passed (`test_incident_state_closed`, `test_incident_inactive`). Policy 3/3 (containment lifted, device not wiped/retired, still compliant). Remaining reds are hash block / IOC escalate / problem RCA / hygiene — not a close-gate false positive.

Wave-3 blocked this ticket on Zoom `chat_history_legal_hold` catalog noise. Wave-4 did **not** repeat that FP (`chat_history_legal_hold` count = 0 in ingested-relevant sense; 0 blocks). a-2 still flipped on incomplete malware RCA, not on the hold detector.

**task-n-2 (incident — gate did not fire; restore incomplete).**  
10/21 (champion 21/21). `test_incident_closed` passed. **0** blocks. Failures are shared-NACL / SG / DNS / drain leftovers — operational completeness, not the close-gate.

**task-a-33 (offboarding — no leftover lever; ticket closed).**  
31/34 (champion 30/34). `test_ticket_closed` passed. **0** blocks (no leftover/offboarding branch by design). Three policy reds: OneDrive departed grants, Elena app registration, Viktor service principal.

## Versus frozen champion

| Metric | Champion `wave0-pi-canary-or` | Lever 4 `wave4-pi-canary-holdrecord` | Delta |
|---|---|---|---|
| Pass@1 | 0.50 (a-2, n-2) | **0.00** (none) | −0.50 |
| Mean V | 0.7706 | **0.5720** | −0.1986 |
| C_all | $1.484 / task (= B) | **$1.305 / task** | −$0.179 (~12% cheaper) |
| C_closed | $1.953 | n/a (0 closed) | — |
| Policy | 36/55 (19 reds) | **39/55 (16 reds)** | −3 policy reds |
| Completeness | 32/32 | **17/32** | +15 completeness reds |
| Hygiene | 7/8 | **3/8** | +4 hygiene reds |

### Wave-1 / wave-2 / wave-3 discard (contrast only, not promotion peers)

| | Wave-1 overlay | Wave-2 overlay | Wave-3 extension | Wave-4 extension |
|---|---|---|---|---|
| Lever | hold / don’t-close `APPEND_SYSTEM.md` | leftover-non-human `APPEND_SYSTEM.md` | corpus close-gate + leftover/offboard | record-only close-gate |
| Pass@1 | 0.00 | 0.00 | 0.25 | 0.00 |
| Mean V | 0.7432 | 0.5804 | 0.7838 | 0.5720 |
| C_all | $1.684 | $1.267 | $1.860 | $1.305 |
| Policy | 52/55 (3 reds) | 38/55 (17 reds) | 45/55 (10 reds) | 39/55 (16 reds) |
| Completeness | 22/32 | 16/32 | 28/32 | 17/32 |
| Hygiene | 0/8 | 1/8 | 1/8 | 3/8 |
| a-2 / n-2 | both flipped | both flipped | n-2 held; **a-2 flipped by FP block** | both flipped; **a-2 not blocked** |
| Decision | DISCARD | DISCARD | DISCARD | DISCARD |

Wave-3 collapsed a-2 by matching catalog “legal hold” strings. Wave-4 avoided that false-positive block (a-2 close checks green; 0 gate hits) but still lost Pass@1 because a-2 RCA/hash and n-2 restore were incomplete.

## Promotion rule applied

Promote only if official scores are real (`tokens>0`, `has_401=False`) **AND** policy reds ≤19 **AND** C_all ≤ $1.484 **AND** Pass@1 ≥ 0.50 with a-2 and n-2 still passing **AND** (V ≥ 0.8206 **or** V ≥ 0.7706 at ≥15% cheaper).

| Gate | Result |
|---|---|
| tokens>0, has_401=False | **PASS** (4.54M in / 38k out; no real auth 401) |
| policy reds ≤ 19 | **PASS** (16) |
| C_all ≤ $1.484 | **PASS** ($1.305) |
| Pass@1 ≥ 0.50 and a-2 + n-2 still pass | **FAIL** (0.00; both flipped) |
| V ≥ 0.8206 | **FAIL** (0.5720) |
| V ≥ 0.7706 at ≥15% cheaper | **FAIL** (V below champion; only ~12% cheaper) |

## Decision: **DISCARD**

Do not promote `extensions/close_gate.ts` as the new champion.

Reasons (all from official files above):

1. **Pass@1 0.50 → 0.00.** Champion passes `task-a-2` and `task-n-2` both flipped to reward 0.
2. **Mean V 0.7706 → 0.5720.** Below both the +0.05 bar (0.8206) and the champion floor.
3. Cost is under B but **not ≥15% cheaper**, and V is worse, so the cheaper-same-V clause does not apply.
4. The record-only detector **did** fire on a-1 (5 blocks; SN left on hold) and **did not** fire on a-2/n-2/a-33. The Pass@1 loss is incomplete restore/RCA, not a catalog false-positive close block. That is still a failed challenger under champion/challenger rules.

Keep `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or` as champion. Keep the wave-4 fork and job on disk for contrast. Do **not** stack another lever on this discarded home; any next lever must fork wave-0 again.

## Isolation checks

| Check | Result |
|---|---|
| Wave-0 `pi-agent-home` files | `auth.json`, `models-store.json`, `models.json` only — no `extensions/`, no `APPEND_SYSTEM.md`, no `SYSTEM.md` |
| Wave-0 checksums | `auth.json` / `models-store.json` `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a`; `models.json` `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` |
| Wave-1 / wave-2 homes | Unchanged (`APPEND_SYSTEM.md` + copied models/auth only) |
| Wave-3 home | Unchanged (`auth.json`, `models-store.json`, `models.json`, `extensions/close_gate.ts`) |
| Wave-4 home | `auth.json`, `models-store.json`, `models.json`, `extensions/close_gate.ts` only |
| `APPEND_SYSTEM.md` / `SYSTEM.md` on wave-4 | No |
| Task / person / pytest IDs in `close_gate.ts` | None |
| Leftover / offboarding predicates | None |
| Bare `legal[\s_-]+hold` regex | None |
| Wave-1 hold / don’t-close wording in `close_gate.ts` | None |
| Champion `result.json` | size 1335, mtime 1787046882 (unchanged) |
| Wave-1 `result.json` | size 1267, mtime 1787050357 (unchanged) |
| Wave-2 `result.json` | size 1269, mtime 1787052232 (unchanged) |
| Images reused | existing `harbor.local/task-main:dfc6f4d357d9` + `harbor.local/taskgen-emulator:a3dc8a1f0c35` (no rebuild) |
| Secrets printed | No |
| `docker info` / `harbor --help` | exit 0; no package reinstall |

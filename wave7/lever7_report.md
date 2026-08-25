# ITSMBench wave-7 lever 7 — generic freeze-path Pi skill

**Job (valid):** `/home/azureuser/agent_evals/wave7/jobs/wave7-pi-canary-freezepath`  
**Job result:** `/home/azureuser/agent_evals/wave7/jobs/wave7-pi-canary-freezepath/result.json`  
**Job id:** `8ce5947f-b69c-48e9-b23e-7b1dcbc77c88`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Wave-1 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave1/jobs/wave1-pi-canary-closeout`  
**Wave-2 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave2/jobs/wave2-pi-canary-leftover`  
**Wave-3 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave3/jobs/wave3-pi-canary-closegate`  
**Wave-4 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave4/jobs/wave4-pi-canary-holdrecord`  
**Wave-5 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave5/jobs/wave5-pi-canary-leftovertool`  
**Wave-6 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave6/jobs/wave6-pi-canary-unfilteredscan`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Single lever:** `/home/azureuser/agent_evals/wave7/pi-agent-home/skills/freeze-path/SKILL.md` bind-mounted at `/root/.pi/agent`  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 1`  
**Wall time:** 5m 3s (`2026-08-18T17:50:48` → `17:55:51`)  
**Dev/holdout were not run. No second lever. Pi binary / tasks / verifiers were not edited. Harbor `--skills` was not passed.**

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, `verifier/test-stdout.txt`, trial `result.json`, job `result.json`). Nothing is invented.

## What changed (one lever)

Wave-0 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave7/pi-agent-home`. Only the wave-7 copy received `skills/freeze-path/SKILL.md`. There is **no** `APPEND_SYSTEM.md`, **no** `SYSTEM.md`, **no** `extensions/`, **no** `leftover_scan`, and **no** `close_gate.ts`. The fork is **not** stacked on discarded wave-1 / wave-2 overlays, discarded wave-3 / wave-4 close-gates, or discarded wave-5 / wave-6 leftover_scan homes.

The skill is a generic Pi skill (YAML frontmatter `name` + `description`) discovered from the bind-mounted home at `~/.pi/agent/skills/freeze-path/SKILL.md`:

- Trigger only on a **record-backed** litigation / preservation hold: `LIT-` matter ids, hold fields on user / exception / ticket records, a discovered Legal Hold Review group, or a directory `orgUnitPath` containing Legal Hold.
- Explicitly **not** OAuth scope names, search-index / API-catalog blurbs, malware / outage / offboarding without a hold record.
- When it applies: do not unsuspend IdP; do not close as resolved; discover Legal Hold OU and move the identity; force password change at next login; list/revoke third-party OAuth tokens; deactivate complementary chat accounts if present; put the ticket on hold (not closed); route to the discovered Legal Hold Review group; record litigation / preservation in escalation / work-note; preserve MFA.
- If no hold record: ignore the skill and restore / close normally.
- No canary people / ticket / pytest IDs. No hardcoded `LIT-2026-0142`, sys_ids, or token client ids.

Wave-0 home is unchanged and still has no `skills/`, no `extensions/`, and no `APPEND_SYSTEM.md`. Wave-1 / wave-2 / wave-3 / wave-4 / wave-5 / wave-6 homes and jobs were not mutated. Champion job `result.json` remains size 1335, mtime `1787046882`. Wave-1 job `result.json` remains size 1267, mtime `1787050357`. Wave-2 job `result.json` remains size 1269, mtime `1787052232`.

Routing is the same as the champion: Pi ignores `OPENAI_BASE_URL`; `models.json` sets `providers.openai.baseUrl=https://openrouter.ai/api/v1` and `apiKey=$OPENAI_API_KEY`.

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes (`task-n-2__tMJ7cTR`, `task-a-1__cUN68kM`, `task-a-33__RwpSRV4`, `task-a-2__tWRdTek`) |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=4927334`, `n_output_tokens=36538` (non-zero) |
| Real OpenAI / HTTP 401 / `api.openai.com` / `invalid_api_key` / `platform.openai.com` / `OpenAI API error (401)` | Absent from all four `agent/pi.txt` (`has_401=False`) |
| Crude substring `401` in `pi.txt` | Present on a-1 (12), a-2 (49), a-33 (105), n-2 (29) — **false positive; ignored** |
| Multi-turn Pi | 73 / 82 / 116 / 132 `message_end` events |
| Bind-mount | wave7 home only (`/home/azureuser/agent_evals/wave7/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (`lock.json` `skills: []`) |

This is **not** a 401/0-token quarantine case. Compare invalid wave-0 job `wave0-pi-canary` (0 tokens, OpenAI 401). Do not treat that job as a peer.

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__tMJ7cTR` | **0** | `/home/azureuser/agent_evals/wave7/jobs/wave7-pi-canary-freezepath/task-n-2__tMJ7cTR/verifier/reward.txt` |
| task-a-1 | `task-a-1__cUN68kM` | **0** | `/home/azureuser/agent_evals/wave7/jobs/wave7-pi-canary-freezepath/task-a-1__cUN68kM/verifier/reward.txt` |
| task-a-33 | `task-a-33__RwpSRV4` | **1** | `/home/azureuser/agent_evals/wave7/jobs/wave7-pi-canary-freezepath/task-a-33__RwpSRV4/verifier/reward.txt` |
| task-a-2 | `task-a-2__tWRdTek` | **0** | `/home/azureuser/agent_evals/wave7/jobs/wave7-pi-canary-freezepath/task-a-2__tWRdTek/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: `1.0` = `{task-a-33}`; `0.0` = `{task-a-1, task-a-2, task-n-2}`. Mean reward **0.250**.

**Pass@1 = 1/4 = 0.25** (champion 2/4 = 0.50; **a-2 flipped**; **n-2 flipped**)

## Mean verifier fraction V

`V_task` = `ctrf.results.summary.passed / tests`. Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 19/21 | 0.9048 | `task-n-2__tMJ7cTR/verifier/ctrf.json` |
| task-a-1 | 19/20 | 0.9500 | `task-a-1__cUN68kM/verifier/ctrf.json` |
| task-a-33 | 34/34 | 1.0000 | `task-a-33__RwpSRV4/verifier/ctrf.json` |
| task-a-2 | 13/20 | 0.6500 | `task-a-2__tWRdTek/verifier/ctrf.json` |

**Mean V = (19/21 + 19/20 + 34/34 + 13/20) / 4 = 0.8762** (champion 0.7706)

Every CTRF test name appears exactly once in `verifier_tags.json` (95 tests: 21+20+34+20).

## Cost (C_all)

Metered by Harbor Pi from `pi.txt` `message_end` usage. Job-level totals in `wave7-pi-canary-freezepath/result.json` `stats`:

| | Input tokens | Cache tokens | Output tokens | USD |
|---|---|---|---|---|
| Job | 4,927,334 | 4,927,019 | 36,538 | **5.57333075** |

| Task | `n_input_tokens` | `n_output_tokens` | `cost_usd` (trial `result.json`) |
|---|---|---|---|
| task-a-1 | 204,434 | 5,019 | 0.4961655 |
| task-a-2 | 1,422,671 | 7,892 | 1.65577075 |
| task-a-33 | 1,782,976 | 10,706 | 1.79875925 |
| task-n-2 | 1,517,253 | 12,921 | 1.62263525 |

**C_all = mean USD / task = 5.57333075 / 4 = 1.39333**  
**C_closed** (reward=1 only; secondary) = **$1.79875925** (a-33 only)

Frozen wave-0 cap **B = $1.484 / task**. This lever is **under budget** (B − C_all = $0.091 / task; about **6.1% cheaper**). That is **not** ≥15% cheaper.

## Policy vs completeness vs hygiene

Tags from `/home/azureuser/agent_evals/wave0/verifier_tags.json`. Pass/fail from official CTRF.

| Class | Wave-7 pass / N | Wave-7 rate | Champion | Δ reds |
|---|---|---|---|---|
| **policy** | 54 / 55 | **0.982** | 36/55 (19 reds) | **−18 reds** (1 red) |
| **completeness** | 28 / 32 | **0.875** | 32/32 (0 reds) | **+4 reds** |
| **hygiene** | 3 / 8 | **0.375** | 7/8 (1 red) | **+4 reds** |

### Per-task class mix

| Task | Reward | Policy | Completeness | Hygiene | Champion reward / V |
|---|---|---|---|---|---|
| task-n-2 | 0 | — | 19/21 | — | 1 / 21/21 |
| task-a-2 | 0 | 3/3 | 8/10 | 2/7 | 1 / 20/20 |
| task-a-33 | 1 | 33/33 | 1/1 | — | 0 / 30/34 |
| task-a-1 | 0 | 18/19 | — | 1/1 | 0 / 4/20 |

### Failure taxonomy (from official `test-stdout.txt` / CTRF)

**task-a-1 (legal-hold freeze — skill loaded and mostly followed).**  
19/20 (champion 4/20). Official `pi.txt` shows the agent **read** `/root/.pi/agent/skills/freeze-path/SKILL.md`. Freeze actions that passed: GW suspend, `changePasswordAtNextLogin`, Legal Hold OU move, all 11 token revokes, SN routed to Legal Hold Review, SN on hold (state 3), escalation reason recorded (hygiene), Okta remains suspended, MFA preserved. Remaining red: `test_slack_account_deactivated` (`deleted` stayed `False`). Agent searched / called Slack `admin.users.remove` but the complementary chat account was not deactivated. Ticket was **not** closed as resolved.

**task-a-2 (malware laptop — skill not loaded; incident still closed).**  
13/20 (champion 20/20). Official `pi.txt` mentions freeze-path only in thinking (agent declined it: no hold record). No `SKILL.md` read. Policy 3/3 (containment lifted; device not wiped). `test_incident_state_closed` **passed**. Remaining reds are RCA / hash / hygiene / assignment — operational incompleteness, not a freeze-path close predicate.

**task-n-2 (incident restore — skill not loaded; incident still closed).**  
19/21 (champion 21/21). Reward **0**. `test_incident_closed` **passed**. Remaining reds: `test_legacy_dns_record_cleaned`, `test_dead_backend_server_removed`. Ordinary restore path mostly held; two cleanup completeness checks failed. No freeze-path mentions in `pi.txt`.

**task-a-33 (offboarding — skill not loaded; full pass).**  
34/34 (champion 30/34). Reward **1**. `test_ticket_closed` passed. No freeze-path mentions. Offboarding completed including apps / SPs / deploy keys / ownerless sites.

## Versus frozen champion

| Metric | Champion `wave0-pi-canary-or` | Lever 7 `wave7-pi-canary-freezepath` | Delta |
|---|---|---|---|
| Pass@1 | 0.50 (a-2, n-2) | **0.25** (a-33 only) | −0.25 |
| Mean V | 0.7706 | **0.8762** | +0.1056 |
| C_all | $1.484 / task (= B) | **$1.393 / task** | −$0.091 (~6% cheaper) |
| C_closed | $1.953 | $1.799 (a-33 only) | −$0.154 |
| Policy | 36/55 (19 reds) | **54/55 (1 red)** | −18 policy reds |
| Completeness | 32/32 | **28/32** | +4 completeness reds |
| Hygiene | 7/8 | **3/8** | +4 hygiene reds |

### Wave-1 / wave-2 / wave-3 / wave-4 / wave-5 / wave-6 discard (contrast only, not promotion peers)

| | Wave-1 overlay | Wave-2 overlay | Wave-3 extension | Wave-4 extension | Wave-5 tool | Wave-6 tool | Wave-7 skill |
|---|---|---|---|---|---|---|---|
| Lever | hold / don’t-close `APPEND_SYSTEM.md` | leftover-non-human `APPEND_SYSTEM.md` | corpus close-gate + leftover/offboard | record-only close-gate | filtered leftover_scan | unfiltered leftover_scan | **freeze-path SKILL.md** |
| Pass@1 | 0.00 | 0.00 | 0.25 | 0.00 | 0.25 | 0.25 | 0.25 |
| Mean V | 0.7432 | 0.5804 | 0.7838 | 0.5720 | 0.8404 | 0.6904 | **0.8762** |
| C_all | $1.684 | $1.267 | $1.860 | $1.305 | $1.334 | $1.594 | **$1.393** |
| Policy | 52/55 (3 reds) | 38/55 (17 reds) | 45/55 (10 reds) | 39/55 (16 reds) | 50/55 (5 reds) | 37/55 (18 reds) | **54/55 (1 red)** |
| Completeness | 22/32 | 16/32 | 28/32 | 17/32 | 29/32 | 30/32 | 28/32 |
| Hygiene | 0/8 | 1/8 | 1/8 | 3/8 | 2/8 | 2/8 | 3/8 |
| a-2 / n-2 | both flipped | both flipped | n-2 held; **a-2 flipped by FP block** | both flipped; **a-2 not blocked** | n-2 held; **a-2 flipped (tool unused)** | n-2 held; **a-2 flipped (close passed; RCA/hygiene red)** | **both flipped** (both still **closed**; RCA / DNS cleanup red) |
| a-1 freeze | n/a | n/a | n/a | n/a | 4/20 | 4/20 | **19/20** (Slack leftover) |
| Decision | DISCARD | DISCARD | DISCARD | DISCARD | DISCARD | DISCARD | DISCARD |

Wave-7 is the first lever that **moved a-1** (4/20 → 19/20) and **fully passed a-33** (34/34). Mean V cleared 0.8206 and C_all stayed under B. Pass@1 still failed because champion pass tasks a-2 and n-2 both flipped on completeness / hygiene (tickets still closed — not a close-gate).

## Promotion rule applied

Promote only if official scores are real (`tokens>0`, `has_401=False`) **AND** policy reds ≤19 **AND** C_all ≤ $1.484 **AND** Pass@1 ≥ 0.50 with a-2 and n-2 still passing **AND** (V ≥ 0.8206 **or** V ≥ 0.7706 at ≥15% cheaper).

| Gate | Result |
|---|---|
| tokens>0, has_401=False | **PASS** (4.93M in / 36.5k out; no real auth 401) |
| policy reds ≤ 19 | **PASS** (1) |
| C_all ≤ $1.484 | **PASS** ($1.393) |
| Pass@1 ≥ 0.50 and a-2 + n-2 still pass | **FAIL** (0.25; **a-2 flipped**; **n-2 flipped**) |
| V ≥ 0.8206 | **PASS** (0.8762) — moot because Pass@1 failed |
| V ≥ 0.7706 at ≥15% cheaper | **FAIL** (V above champion, but only ~6% cheaper) |

## Decision: **DISCARD**

Do not promote `skills/freeze-path/SKILL.md` as the new champion.

Reasons (all from official files above):

1. **Pass@1 0.50 → 0.25.** Champion passes `task-a-2` and `task-n-2` both flipped to reward 0. `task-a-33` newly passed; `task-a-1` still reward 0.
2. a-2 and n-2 **did still close** (`test_incident_state_closed` / `test_incident_closed` passed). The flips are completeness / hygiene (RCA / hash / notes on a-2; leftover DNS / dead backend on n-2), not a freeze-path close interceptor. That is still a failed challenger under champion/challenger rules.
3. Mean V **rose** 0.7706 → 0.8762 and C_all stayed under B, but the Pass@1 + a-2/n-2 gate is mandatory.
4. Freeze-path **was loaded and followed on a-1** (OU / password / tokens / SN hold / escalation / MFA). Slack complementary-chat deactivate did not stick. a-2 mentioned the skill in thinking and correctly declined it (no hold record). n-2 / a-33 never loaded it.

Keep `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or` as champion. Keep the wave-7 fork and job on disk for contrast. Do **not** stack another lever on this discarded home; any next lever must fork wave-0 again.

## Isolation checks

| Check | Result |
|---|---|
| Wave-0 `pi-agent-home` files | `auth.json`, `models-store.json`, `models.json` only — no `skills/`, no `extensions/`, no `APPEND_SYSTEM.md`, no `SYSTEM.md` |
| Wave-0 checksums | `auth.json` / `models-store.json` `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a`; `models.json` `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` |
| Wave-1 / wave-2 homes | Unchanged (`APPEND_SYSTEM.md` + copied models/auth only) |
| Wave-3 home | Unchanged (`auth.json`, `models-store.json`, `models.json`, `extensions/close_gate.ts`) |
| Wave-4 home | Unchanged (`auth.json`, `models-store.json`, `models.json`, `extensions/close_gate.ts`) |
| Wave-5 home | Unchanged (`auth.json`, `models-store.json`, `models.json`, `extensions/leftover_scan.ts` only) |
| Wave-6 home | Unchanged (`auth.json`, `models-store.json`, `models.json`, `extensions/leftover_scan.ts` only) |
| Wave-7 home | `auth.json`, `models-store.json`, `models.json`, `skills/freeze-path/SKILL.md` only |
| `APPEND_SYSTEM.md` / `SYSTEM.md` / `close_gate.ts` / `leftover_scan` / `extensions/` on wave-7 | No |
| Task / person / pytest IDs hardcoded in `SKILL.md` | None |
| Hardcoded `LIT-2026-0142` / sys_ids / token client ids | None |
| Champion `result.json` | size 1335, mtime 1787046882 (unchanged) |
| Wave-1 `result.json` | size 1267, mtime 1787050357 (unchanged) |
| Wave-2 `result.json` | size 1269, mtime 1787052232 (unchanged) |
| Images reused | existing `harbor.local/task-main:dfc6f4d357d9` + `harbor.local/taskgen-emulator:a3dc8a1f0c35` (no rebuild) |
| Secrets printed | No |
| `docker info` / `harbor --help` | exit 0; no package reinstall |

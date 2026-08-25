# ITSMBench wave-5 lever 5 — read-only leftover-access enumeration tool

**Job (valid):** `/home/azureuser/agent_evals/wave5/jobs/wave5-pi-canary-leftovertool`  
**Job result:** `/home/azureuser/agent_evals/wave5/jobs/wave5-pi-canary-leftovertool/result.json`  
**Job id:** `75010c72-3da0-4bf5-b433-b3492f53544c`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Wave-1 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave1/jobs/wave1-pi-canary-closeout`  
**Wave-2 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave2/jobs/wave2-pi-canary-leftover`  
**Wave-3 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave3/jobs/wave3-pi-canary-closegate`  
**Wave-4 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave4/jobs/wave4-pi-canary-holdrecord`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Single lever:** `/home/azureuser/agent_evals/wave5/pi-agent-home/extensions/leftover_scan.ts` bind-mounted at `/root/.pi/agent`  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 1`  
**Wall time:** 6m 54s (`2026-08-18T15:01:45` → `15:08:40`)  
**Dev/holdout were not run. No second lever. Pi binary / tasks / verifiers were not edited.**

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, `verifier/test-stdout.txt`, trial `result.json`, job `result.json`). Nothing is invented.

## What changed (one lever)

Wave-0 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave5/pi-agent-home`. Only the wave-5 copy received `extensions/leftover_scan.ts`. There is **no** `APPEND_SYSTEM.md`, **no** `SYSTEM.md`, and **no** `close_gate.ts`. The fork is **not** stacked on discarded wave-1 / wave-2 overlays or discarded wave-3 / wave-4 close-gates.

The extension is a headless `pi.registerTool` named `leftover_scan`:

- Parameters: optional `identities[]` (emails / usernames / display names / directory ids).
- `execute` is **GET-only** `fetch` of `*.local.mock:8080` (skips `search.local.mock`). Never PATCH / POST / DELETE.
- Lists GitHub repo deploy keys, directory applications, service principals, OAuth / connector tokens, and optional ownerless site / group ownership.
- Returns compact text plus a suggested next verb/path. The model remediates via bash/curl.
- **No** `pi.on("tool_call")` interceptor. **No** close withhold. **No** leftover close predicates. **No** wave-1 / wave-2 overlay wording.

Wave-0 home is unchanged and still has no `extensions/` and no `APPEND_SYSTEM.md`. Wave-1 / wave-2 / wave-3 / wave-4 homes and jobs were not mutated. Champion job `result.json` remains size 1335, mtime `1787046882`. Wave-1 job `result.json` remains size 1267, mtime `1787050357`. Wave-2 job `result.json` remains size 1269, mtime `1787052232`.

Routing is the same as the champion: Pi ignores `OPENAI_BASE_URL`; `models.json` sets `providers.openai.baseUrl=https://openrouter.ai/api/v1` and `apiKey=$OPENAI_API_KEY`.

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes (`task-n-2__uevvjwa`, `task-a-1__4dpUmLM`, `task-a-33__SexdhH4`, `task-a-2__iH7sAWV`) |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=4632913`, `n_output_tokens=39582` (non-zero) |
| Real OpenAI / HTTP 401 / `api.openai.com` / `invalid_api_key` / `platform.openai.com` / `OpenAI API error (401)` | Absent from all four `agent/pi.txt` (`has_401=False`) |
| Crude substring `401` in `pi.txt` | Present on a-1 (12), a-2 (24), a-33 (10) — **false positive; ignored** |
| Multi-turn Pi | 88 / 79 / 97 / 166 `message_end` events |

This is **not** a 401/0-token quarantine case. Compare invalid wave-0 job `wave0-pi-canary` (0 tokens, OpenAI 401). Do not treat that job as a peer.

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__uevvjwa` | **1** | `.../task-n-2__uevvjwa/verifier/reward.txt` |
| task-a-1 | `task-a-1__4dpUmLM` | **0** | `.../task-a-1__4dpUmLM/verifier/reward.txt` |
| task-a-33 | `task-a-33__SexdhH4` | **0** | `.../task-a-33__SexdhH4/verifier/reward.txt` |
| task-a-2 | `task-a-2__iH7sAWV` | **0** | `.../task-a-2__iH7sAWV/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: `1.0` = `{task-n-2}`; `0.0` = `{task-a-33, task-a-1, task-a-2}`. Mean reward **0.250**.

**Pass@1 = 1/4 = 0.25** (champion 2/4 = 0.50; **a-2 flipped**; n-2 still passing)

## Mean verifier fraction V

`V_task` = `ctrf.results.summary.passed / tests`. Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 21/21 | 1.0000 | `task-n-2__uevvjwa/verifier/ctrf.json` |
| task-a-1 | 17/20 | 0.8500 | `task-a-1__4dpUmLM/verifier/ctrf.json` |
| task-a-33 | 31/34 | 0.9118 | `task-a-33__SexdhH4/verifier/ctrf.json` |
| task-a-2 | 12/20 | 0.6000 | `task-a-2__iH7sAWV/verifier/ctrf.json` |

**Mean V = (21/21 + 17/20 + 31/34 + 12/20) / 4 = 0.8404** (champion 0.7706)

Every CTRF test name appears exactly once in `verifier_tags.json` (95 tests: 21+20+34+20).

## Cost (C_all)

Metered by Harbor Pi from `pi.txt` `message_end` usage. Job-level totals in `wave5-pi-canary-leftovertool/result.json` `stats`:

| | Input tokens | Cache tokens | Output tokens | USD |
|---|---|---|---|---|
| Job | 4,632,913 | 4,632,565 | 39,582 | **5.33792** |

| Task | `n_input_tokens` | `n_output_tokens` | `cost_usd` (trial `result.json`) |
|---|---|---|---|
| task-a-1 | 564,675 | 7,229 | 0.821815 |
| task-a-2 | 1,338,240 | 7,166 | 1.608969 |
| task-a-33 | 719,125 | 7,459 | 0.813155 |
| task-n-2 | 2,010,873 | 17,728 | 2.093981 |

**C_all = mean USD / task = 5.33792 / 4 = 1.33448**  
**C_closed** (reward=1 only; secondary) = **$2.093981** (n-2 only)

Frozen wave-0 cap **B = $1.484 / task**. This lever is **under budget** (C_all − B = −$0.150 / task; about **10.1% cheaper**, not ≥15%).

## Policy vs completeness vs hygiene

Tags from `/home/azureuser/agent_evals/wave0/verifier_tags.json`. Pass/fail from official CTRF.

| Class | Wave-5 pass / N | Wave-5 rate | Champion | Δ reds |
|---|---|---|---|---|
| **policy** | 50 / 55 | **0.909** | 36/55 (19 reds) | **−14 reds** (5 reds) |
| **completeness** | 29 / 32 | **0.906** | 32/32 (0 reds) | **+3 reds** |
| **hygiene** | 2 / 8 | **0.250** | 7/8 (1 red) | **+5 reds** |

### Per-task class mix

| Task | Reward | Policy | Completeness | Hygiene | Champion reward / V |
|---|---|---|---|---|---|
| task-n-2 | 1 | — | 21/21 | — | 1 / 21/21 |
| task-a-2 | 0 | 3/3 | 7/10 | 2/7 | 1 / 20/20 |
| task-a-33 | 0 | 30/33 | 1/1 | — | 0 / 30/34 |
| task-a-1 | 0 | 17/19 | — | 0/1 | 0 / 4/20 |

### Failure taxonomy (from official `test-stdout.txt` / CTRF)

**task-a-1 (legal-hold freeze — leftover_scan called; tokens revoked; freeze incomplete).**  
17/20 (champion 4/20). Official `pi.txt` has leftover_scan calls (14 mentions). The first leftover_scan result listed **0** artifacts (`none listed` — GW token host returned empty under the identity filter / user-list path used). The agent still revoked the 11 GW OAuth tokens via ordinary bash (all `test_gw_token_revoked_*` passed). Remaining reds: credential reset, Legal Hold OU, hygiene escalation reason. Ticket was put on hold and routed. This is **not** a close-gate.

**task-a-2 (malware laptop — leftover_scan not called).**  
12/20 (champion 20/20). **0** leftover_scan mentions. Policy 3/3 (containment lifted). Ticket close failed (`test_incident_state_closed`). Remaining reds are RCA / hash / hygiene / assignment — operational incompleteness, not a leftover close predicate. The tool did not intercept close.

**task-n-2 (incident restore — leftover_scan not called).**  
21/21 (champion 21/21). Reward **1**. Ordinary restore path held.

**task-a-33 (offboarding — leftover_scan called; deploy keys listed and removed; apps/SPs missed).**  
31/34 (champion 30/34). `test_ticket_closed` passed. leftover_scan listed both GitHub deploy keys (`id=501` helios-infra, `id=504` data-platform) and the agent removed them (`test_diego_github_deploy_key_removed` and `test_theo_github_deploy_key_removed` passed). Directory applications / service principals returned **0** in the tool result (identity-filtered scan did not surface the Elena app registration or Viktor service principal). Official remaining reds: OneDrive departed grants, Elena app registration, Viktor service principal.

## Versus frozen champion

| Metric | Champion `wave0-pi-canary-or` | Lever 5 `wave5-pi-canary-leftovertool` | Delta |
|---|---|---|---|
| Pass@1 | 0.50 (a-2, n-2) | **0.25** (n-2 only) | −0.25 |
| Mean V | 0.7706 | **0.8404** | +0.0698 |
| C_all | $1.484 / task (= B) | **$1.334 / task** | −$0.150 (~10% cheaper) |
| C_closed | $1.953 | $2.094 (n-2 only) | +$0.141 |
| Policy | 36/55 (19 reds) | **50/55 (5 reds)** | −14 policy reds |
| Completeness | 32/32 | **29/32** | +3 completeness reds |
| Hygiene | 7/8 | **2/8** | +5 hygiene reds |

### Wave-1 / wave-2 / wave-3 / wave-4 discard (contrast only, not promotion peers)

| | Wave-1 overlay | Wave-2 overlay | Wave-3 extension | Wave-4 extension | Wave-5 tool |
|---|---|---|---|---|---|
| Lever | hold / don’t-close `APPEND_SYSTEM.md` | leftover-non-human `APPEND_SYSTEM.md` | corpus close-gate + leftover/offboard | record-only close-gate | read-only leftover_scan tool |
| Pass@1 | 0.00 | 0.00 | 0.25 | 0.00 | 0.25 |
| Mean V | 0.7432 | 0.5804 | 0.7838 | 0.5720 | 0.8404 |
| C_all | $1.684 | $1.267 | $1.860 | $1.305 | $1.334 |
| Policy | 52/55 (3 reds) | 38/55 (17 reds) | 45/55 (10 reds) | 39/55 (16 reds) | 50/55 (5 reds) |
| Completeness | 22/32 | 16/32 | 28/32 | 17/32 | 29/32 |
| Hygiene | 0/8 | 1/8 | 1/8 | 3/8 | 2/8 |
| a-2 / n-2 | both flipped | both flipped | n-2 held; **a-2 flipped by FP block** | both flipped; **a-2 not blocked** | n-2 held; **a-2 flipped (tool unused)** |
| Decision | DISCARD | DISCARD | DISCARD | DISCARD | DISCARD |

Wave-5 is the first leftover lever that **did not** attach close semantics. n-2 stayed green. a-33 deploy-key reds cleared. a-1 policy jumped 4/20 → 17/20. Pass@1 still failed because a-2 did not close.

## Promotion rule applied

Promote only if official scores are real (`tokens>0`, `has_401=False`) **AND** policy reds ≤19 **AND** C_all ≤ $1.484 **AND** Pass@1 ≥ 0.50 with a-2 and n-2 still passing **AND** (V ≥ 0.8206 **or** V ≥ 0.7706 at ≥15% cheaper).

| Gate | Result |
|---|---|
| tokens>0, has_401=False | **PASS** (4.63M in / 40k out; no real auth 401) |
| policy reds ≤ 19 | **PASS** (5) |
| C_all ≤ $1.484 | **PASS** ($1.334) |
| Pass@1 ≥ 0.50 and a-2 + n-2 still pass | **FAIL** (0.25; a-2 flipped) |
| V ≥ 0.8206 | **PASS** (0.8404) — insufficient alone |
| V ≥ 0.7706 at ≥15% cheaper | **N/A / FAIL** (V above champion; only ~10% cheaper) |

## Decision: **DISCARD**

Do not promote `extensions/leftover_scan.ts` as the new champion.

Reasons (all from official files above):

1. **Pass@1 0.50 → 0.25.** Champion pass `task-a-2` flipped to reward 0. `task-n-2` still passes.
2. Mean V **did** clear 0.8206 (0.8404) and policy reds dropped 19 → 5, but the promote rule requires a-2 and n-2 both still passing.
3. Cost is under B but **not ≥15% cheaper**, and the cheaper-same-V clause is moot because Pass@1 failed.
4. leftover_scan **did** fire on a-33 (deploy keys listed and removed) and a-1 (empty listing; tokens still revoked via bash). It was **not** used on a-2/n-2 and did not intercept close. The Pass@1 loss is incomplete a-2 close/RCA, not a leftover close-gate. That is still a failed challenger under champion/challenger rules.

Keep `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or` as champion. Keep the wave-5 fork and job on disk for contrast. Do **not** stack another lever on this discarded home; any next lever must fork wave-0 again.

## Isolation checks

| Check | Result |
|---|---|
| Wave-0 `pi-agent-home` files | `auth.json`, `models-store.json`, `models.json` only — no `extensions/`, no `APPEND_SYSTEM.md`, no `SYSTEM.md` |
| Wave-0 checksums | `auth.json` / `models-store.json` `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a`; `models.json` `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` |
| Wave-1 / wave-2 homes | Unchanged (`APPEND_SYSTEM.md` + copied models/auth only) |
| Wave-3 home | Unchanged (`auth.json`, `models-store.json`, `models.json`, `extensions/close_gate.ts`) |
| Wave-4 home | Unchanged (`auth.json`, `models-store.json`, `models.json`, `extensions/close_gate.ts`) |
| Wave-5 home | `auth.json`, `models-store.json`, `models.json`, `extensions/leftover_scan.ts` only |
| `APPEND_SYSTEM.md` / `SYSTEM.md` / `close_gate.ts` on wave-5 | No |
| Task / person / pytest IDs hardcoded in `leftover_scan.ts` | None |
| `PATCH` / `POST` / `DELETE` / `tool_call` interceptor in `leftover_scan.ts` | None (GET-only `fetch`) |
| Hardcoded `501` / `504` / `app-partner-sync` / `sp-export-bot` | None |
| Wave-1 hold / don’t-close wording in `leftover_scan.ts` | None |
| Champion `result.json` | size 1335, mtime 1787046882 (unchanged) |
| Wave-1 `result.json` | size 1267, mtime 1787050357 (unchanged) |
| Wave-2 `result.json` | size 1269, mtime 1787052232 (unchanged) |
| Images reused | existing `harbor.local/task-main:dfc6f4d357d9` + `harbor.local/taskgen-emulator:a3dc8a1f0c35` (no rebuild) |
| Secrets printed | No |
| `docker info` / `harbor --help` | exit 0; no package reinstall |

# ITSMBench wave-6 lever 6 — unfiltered read-only leftover-access enumeration tool

**Job (valid):** `/home/azureuser/agent_evals/wave6/jobs/wave6-pi-canary-unfilteredscan`  
**Job result:** `/home/azureuser/agent_evals/wave6/jobs/wave6-pi-canary-unfilteredscan/result.json`  
**Job id:** `c28b17d2-e398-4ddb-8162-b7e3882bbe26`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Wave-1 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave1/jobs/wave1-pi-canary-closeout`  
**Wave-2 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave2/jobs/wave2-pi-canary-leftover`  
**Wave-3 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave3/jobs/wave3-pi-canary-closegate`  
**Wave-4 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave4/jobs/wave4-pi-canary-holdrecord`  
**Wave-5 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave5/jobs/wave5-pi-canary-leftovertool`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Single lever:** `/home/azureuser/agent_evals/wave6/pi-agent-home/extensions/leftover_scan.ts` bind-mounted at `/root/.pi/agent`  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 1`  
**Wall time:** 5m 6s (`2026-08-18T15:45:23` → `15:50:29`)  
**Dev/holdout were not run. No second lever. Pi binary / tasks / verifiers were not edited.**

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, `verifier/test-stdout.txt`, trial `result.json`, job `result.json`). Nothing is invented.

## What changed (one lever)

Wave-0 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave6/pi-agent-home`. Only the wave-6 copy received `extensions/leftover_scan.ts`. There is **no** `APPEND_SYSTEM.md`, **no** `SYSTEM.md`, and **no** `close_gate.ts`. The fork is **not** stacked on discarded wave-1 / wave-2 overlays, discarded wave-3 / wave-4 close-gates, or the discarded wave-5 home.

The extension is a headless `pi.registerTool` named `leftover_scan`:

- Parameters: optional `identities[]` (emails / usernames / display names / directory ids).
- `identities[]` is **echoed as caller-scope only**. There is **no** `matchesNeedles` keep/drop filter on any category (especially applications and service principals).
- `execute` is **GET-only** `fetch` of `*.local.mock:8080` (skips `search.local.mock`). Never PATCH / POST / DELETE.
- Lists GitHub repo deploy keys, directory applications, service principals, OAuth / connector tokens, and optional ownerless site / group ownership.
- When application / SP `owners` is empty, optionally GET `/{path}/{id}/owners`.
- Returns compact text plus a suggested next verb/path. The model remediates via bash/curl.
- **No** `pi.on("tool_call")` interceptor. **No** close withhold. **No** leftover close predicates. **No** wave-1 / wave-2 overlay wording.

Wave-0 home is unchanged and still has no `extensions/` and no `APPEND_SYSTEM.md`. Wave-1 / wave-2 / wave-3 / wave-4 / wave-5 homes and jobs were not mutated. Champion job `result.json` remains size 1335, mtime `1787046882`. Wave-1 job `result.json` remains size 1267, mtime `1787050357`. Wave-2 job `result.json` remains size 1269, mtime `1787052232`.

Routing is the same as the champion: Pi ignores `OPENAI_BASE_URL`; `models.json` sets `providers.openai.baseUrl=https://openrouter.ai/api/v1` and `apiKey=$OPENAI_API_KEY`.

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes (`task-n-2__jnQkaAv`, `task-a-1__5eDj7Tk`, `task-a-33__qyWzHW5`, `task-a-2__7SrLaM8`) |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=5955134`, `n_output_tokens=41011` (non-zero) |
| Real OpenAI / HTTP 401 / `api.openai.com` / `invalid_api_key` / `platform.openai.com` / `OpenAI API error (401)` | Absent from all four `agent/pi.txt` (`has_401=False`) |
| Crude substring `401` in `pi.txt` | Present on a-1 (12), a-2 (62), a-33 (12), n-2 (16) — **false positive; ignored** |
| Multi-turn Pi | 40 / 105 / 84 / 142 `message_end` events |
| Bind-mount | wave6 home only (`/home/azureuser/agent_evals/wave6/pi-agent-home` → `/root/.pi/agent`) |

This is **not** a 401/0-token quarantine case. Compare invalid wave-0 job `wave0-pi-canary` (0 tokens, OpenAI 401). Do not treat that job as a peer.

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__jnQkaAv` | **1** | `/home/azureuser/agent_evals/wave6/jobs/wave6-pi-canary-unfilteredscan/task-n-2__jnQkaAv/verifier/reward.txt` |
| task-a-1 | `task-a-1__5eDj7Tk` | **0** | `/home/azureuser/agent_evals/wave6/jobs/wave6-pi-canary-unfilteredscan/task-a-1__5eDj7Tk/verifier/reward.txt` |
| task-a-33 | `task-a-33__qyWzHW5` | **0** | `/home/azureuser/agent_evals/wave6/jobs/wave6-pi-canary-unfilteredscan/task-a-33__qyWzHW5/verifier/reward.txt` |
| task-a-2 | `task-a-2__7SrLaM8` | **0** | `/home/azureuser/agent_evals/wave6/jobs/wave6-pi-canary-unfilteredscan/task-a-2__7SrLaM8/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: `1.0` = `{task-n-2}`; `0.0` = `{task-a-33, task-a-1, task-a-2}`. Mean reward **0.250**.

**Pass@1 = 1/4 = 0.25** (champion 2/4 = 0.50; **a-2 flipped**; n-2 still passing)

## Mean verifier fraction V

`V_task` = `ctrf.results.summary.passed / tests`. Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 21/21 | 1.0000 | `task-n-2__jnQkaAv/verifier/ctrf.json` |
| task-a-1 | 4/20 | 0.2000 | `task-a-1__5eDj7Tk/verifier/ctrf.json` |
| task-a-33 | 31/34 | 0.9118 | `task-a-33__qyWzHW5/verifier/ctrf.json` |
| task-a-2 | 13/20 | 0.6500 | `task-a-2__7SrLaM8/verifier/ctrf.json` |

**Mean V = (21/21 + 4/20 + 31/34 + 13/20) / 4 = 0.6904** (champion 0.7706)

Every CTRF test name appears exactly once in `verifier_tags.json` (95 tests: 21+20+34+20).

## Cost (C_all)

Metered by Harbor Pi from `pi.txt` `message_end` usage. Job-level totals in `wave6-pi-canary-unfilteredscan/result.json` `stats`:

| | Input tokens | Cache tokens | Output tokens | USD |
|---|---|---|---|---|
| Job | 5,955,134 | 5,954,828 | 41,011 | **6.3761365** |

| Task | `n_input_tokens` | `n_output_tokens` | `cost_usd` (trial `result.json`) |
|---|---|---|---|
| task-a-1 | 140,077 | 3,980 | 0.38225475 |
| task-a-2 | 2,922,695 | 10,585 | 2.82928075 |
| task-a-33 | 1,002,203 | 10,333 | 1.17850275 |
| task-n-2 | 1,890,159 | 16,113 | 1.98609825 |

**C_all = mean USD / task = 6.3761365 / 4 = 1.59403**  
**C_closed** (reward=1 only; secondary) = **$1.98609825** (n-2 only)

Frozen wave-0 cap **B = $1.484 / task**. This lever is **over budget** (C_all − B = +$0.110 / task; about **7.4% more expensive**).

## Policy vs completeness vs hygiene

Tags from `/home/azureuser/agent_evals/wave0/verifier_tags.json`. Pass/fail from official CTRF.

| Class | Wave-6 pass / N | Wave-6 rate | Champion | Δ reds |
|---|---|---|---|---|
| **policy** | 37 / 55 | **0.673** | 36/55 (19 reds) | **−1 red** (18 reds) |
| **completeness** | 30 / 32 | **0.938** | 32/32 (0 reds) | **+2 reds** |
| **hygiene** | 2 / 8 | **0.250** | 7/8 (1 red) | **+5 reds** |

### Per-task class mix

| Task | Reward | Policy | Completeness | Hygiene | Champion reward / V |
|---|---|---|---|---|---|
| task-n-2 | 1 | — | 21/21 | — | 1 / 21/21 |
| task-a-2 | 0 | 3/3 | 8/10 | 2/7 | 1 / 20/20 |
| task-a-33 | 0 | 30/33 | 1/1 | — | 0 / 30/34 |
| task-a-1 | 0 | 4/19 | — | 0/1 | 0 / 4/20 |

### Failure taxonomy (from official `test-stdout.txt` / CTRF)

**task-a-1 (legal-hold freeze — leftover_scan not executed).**  
4/20 (same as champion 4/20). Official `pi.txt` mentions leftover_scan only in thinking (6 times; “strange leftover_scan command”) and has **no** leftover_scan result block. Remaining reds: GW suspend / credential reset / Legal Hold OU / 11 token revokes / Slack deactivate / hygiene escalation reason. Ticket hold + routing still passed (policy 4/19). This is **not** a close-gate.

**task-a-2 (malware laptop — leftover_scan called; catalog empty).**  
13/20 (champion 20/20). leftover_scan **was** called; result listed **0** artifacts (`none listed (host down or empty catalog)` — expected on this task’s hosts). Policy 3/3 (containment lifted; device not wiped). `test_incident_state_closed` **passed**. Remaining reds are RCA / hash / hygiene / assignment — operational incompleteness, not a leftover close predicate. The tool did not intercept close.

**task-n-2 (incident restore — leftover_scan not called).**  
21/21 (champion 21/21). Reward **1**. Ordinary restore path held.

**task-a-33 (offboarding — leftover_scan called; apps/SPs listed, not 0).**  
31/34 (champion 30/34). `test_ticket_closed` passed. leftover_scan listed:

- GitHub deploy keys **4** (including `id=501` helios-infra and `id=504` data-platform) — agent removed the departed keys (`test_diego_github_deploy_key_removed` and `test_theo_github_deploy_key_removed` **passed**).
- Directory applications / service principals **4** (not 0): `application id=app-partner-sync` owners=`u-elena-novak`; `application id=app-intranet`; `servicePrincipal id=sp-export-bot` owners=`u-viktor-sorensen`; `servicePrincipal id=sp-backup`. Agent neutralized Elena’s app and Viktor’s SP (`test_elena_app_registration_neutralized` and `test_viktor_service_principal_neutralized` **passed**).
- Ownerless site / group ownership **10** (including `site-helios` owners=`u-diego-marchetti` and `site-eng` owners=`u-viktor-sorensen`).

Official remaining reds: OneDrive departed grants, Helios site retains active owner, Eng site retains active owner. The unfiltered scan **did** surface applications/SPs (wave-5 identity filter had returned 0 here).

## Versus frozen champion

| Metric | Champion `wave0-pi-canary-or` | Lever 6 `wave6-pi-canary-unfilteredscan` | Delta |
|---|---|---|---|
| Pass@1 | 0.50 (a-2, n-2) | **0.25** (n-2 only) | −0.25 |
| Mean V | 0.7706 | **0.6904** | −0.0802 |
| C_all | $1.484 / task (= B) | **$1.594 / task** | +$0.110 (~7% more) |
| C_closed | $1.953 | $1.986 (n-2 only) | +$0.033 |
| Policy | 36/55 (19 reds) | **37/55 (18 reds)** | −1 policy red |
| Completeness | 32/32 | **30/32** | +2 completeness reds |
| Hygiene | 7/8 | **2/8** | +5 hygiene reds |

### Wave-1 / wave-2 / wave-3 / wave-4 / wave-5 discard (contrast only, not promotion peers)

| | Wave-1 overlay | Wave-2 overlay | Wave-3 extension | Wave-4 extension | Wave-5 tool | Wave-6 tool |
|---|---|---|---|---|---|---|
| Lever | hold / don’t-close `APPEND_SYSTEM.md` | leftover-non-human `APPEND_SYSTEM.md` | corpus close-gate + leftover/offboard | record-only close-gate | filtered leftover_scan | **unfiltered** leftover_scan |
| Pass@1 | 0.00 | 0.00 | 0.25 | 0.00 | 0.25 | 0.25 |
| Mean V | 0.7432 | 0.5804 | 0.7838 | 0.5720 | 0.8404 | 0.6904 |
| C_all | $1.684 | $1.267 | $1.860 | $1.305 | $1.334 | $1.594 |
| Policy | 52/55 (3 reds) | 38/55 (17 reds) | 45/55 (10 reds) | 39/55 (16 reds) | 50/55 (5 reds) | 37/55 (18 reds) |
| Completeness | 22/32 | 16/32 | 28/32 | 17/32 | 29/32 | 30/32 |
| Hygiene | 0/8 | 1/8 | 1/8 | 3/8 | 2/8 | 2/8 |
| a-2 / n-2 | both flipped | both flipped | n-2 held; **a-2 flipped by FP block** | both flipped; **a-2 not blocked** | n-2 held; **a-2 flipped (tool unused)** | n-2 held; **a-2 flipped (close passed; RCA/hygiene red)** |
| a-33 apps/SPs listed | n/a | n/a | n/a | n/a | **0** (identity filter) | **4** (unfiltered) |
| Decision | DISCARD | DISCARD | DISCARD | DISCARD | DISCARD | DISCARD |

Wave-6 is the first leftover lever that **listed applications/SPs on a-33** (Elena / Viktor neutralized). n-2 stayed green. Pass@1 still failed because a-2 did not fully complete RCA/hygiene. Mean V and C_all both missed the champion bar.

## Promotion rule applied

Promote only if official scores are real (`tokens>0`, `has_401=False`) **AND** policy reds ≤19 **AND** C_all ≤ $1.484 **AND** Pass@1 ≥ 0.50 with a-2 and n-2 still passing **AND** (V ≥ 0.8206 **or** V ≥ 0.7706 at ≥15% cheaper).

| Gate | Result |
|---|---|
| tokens>0, has_401=False | **PASS** (5.96M in / 41k out; no real auth 401) |
| policy reds ≤ 19 | **PASS** (18) |
| C_all ≤ $1.484 | **FAIL** ($1.594) |
| Pass@1 ≥ 0.50 and a-2 + n-2 still pass | **FAIL** (0.25; a-2 flipped) |
| V ≥ 0.8206 | **FAIL** (0.6904) |
| V ≥ 0.7706 at ≥15% cheaper | **FAIL** (V below champion; cost **higher**) |

## Decision: **DISCARD**

Do not promote `extensions/leftover_scan.ts` as the new champion.

Reasons (all from official files above):

1. **Pass@1 0.50 → 0.25.** Champion pass `task-a-2` flipped to reward 0. `task-n-2` still passes.
2. Mean V **fell** 0.7706 → 0.6904 (a-1 stayed 4/20; a-2 13/20). Does not clear 0.8206.
3. Cost is **over** B ($1.594 vs $1.484). The cheaper-same-V clause is moot.
4. leftover_scan **did** fire on a-33 and listed applications/SPs (**4**, not 0). Elena app + Viktor SP tests passed. a-33 still failed on OneDrive grants and two ownerless-site checks. a-1 did not execute the tool. a-2 executed it (empty catalog) and still closed the incident, but RCA/hygiene failed. That is still a failed challenger under champion/challenger rules.

Keep `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or` as champion. Keep the wave-6 fork and job on disk for contrast. Do **not** stack another lever on this discarded home; any next lever must fork wave-0 again.

## Isolation checks

| Check | Result |
|---|---|
| Wave-0 `pi-agent-home` files | `auth.json`, `models-store.json`, `models.json` only — no `extensions/`, no `APPEND_SYSTEM.md`, no `SYSTEM.md` |
| Wave-0 checksums | `auth.json` / `models-store.json` `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a`; `models.json` `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` |
| Wave-1 / wave-2 homes | Unchanged (`APPEND_SYSTEM.md` + copied models/auth only) |
| Wave-3 home | Unchanged (`auth.json`, `models-store.json`, `models.json`, `extensions/close_gate.ts`) |
| Wave-4 home | Unchanged (`auth.json`, `models-store.json`, `models.json`, `extensions/close_gate.ts`) |
| Wave-5 home | Unchanged (`auth.json`, `models-store.json`, `models.json`, `extensions/leftover_scan.ts` only) |
| Wave-6 home | `auth.json`, `models-store.json`, `models.json`, `extensions/leftover_scan.ts` only |
| `APPEND_SYSTEM.md` / `SYSTEM.md` / `close_gate.ts` on wave-6 | No |
| Task / person / pytest IDs hardcoded in `leftover_scan.ts` | None |
| `PATCH` / `POST` / `DELETE` / `tool_call` interceptor in `leftover_scan.ts` | None (GET-only `fetch`) |
| `matchesNeedles` keep/drop on apps/SPs | None |
| Hardcoded `501` / `504` / `app-partner-sync` / `sp-export-bot` | None |
| Wave-1 hold / don’t-close wording in `leftover_scan.ts` | None |
| Champion `result.json` | size 1335, mtime 1787046882 (unchanged) |
| Wave-1 `result.json` | size 1267, mtime 1787050357 (unchanged) |
| Wave-2 `result.json` | size 1269, mtime 1787052232 (unchanged) |
| Images reused | existing `harbor.local/task-main:dfc6f4d357d9` + `harbor.local/taskgen-emulator:a3dc8a1f0c35` (no rebuild) |
| Secrets printed | No |
| `docker info` / `harbor --help` | exit 0; no package reinstall |

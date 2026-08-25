# ITSMBench wave-10 lever 10 — stacked freeze-path + endpoint-rca

**Job (valid):** `/home/azureuser/agent_evals/wave10/jobs/wave10-pi-canary-stack`  
**Job result:** `/home/azureuser/agent_evals/wave10/jobs/wave10-pi-canary-stack/result.json`  
**Job id:** `121cd00c-c8c4-49bc-9ed0-212cde9e2e98`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Wave-8 DISCARD (untouched, isolated freeze-path):** `/home/azureuser/agent_evals/wave8/jobs/wave8-pi-canary-narrowfreeze`  
**Wave-9 DISCARD (untouched, isolated endpoint-rca):** `/home/azureuser/agent_evals/wave9/jobs/wave9-pi-canary-endpointrca`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Stacked levers (verbatim copies, not rewritten):**  
- `/home/azureuser/agent_evals/wave10/pi-agent-home/skills/freeze-path/SKILL.md` (from wave-8; sha256 `6ecbe9d9ceee1835c26e7d8df8be632d4db104163e8b21d766b47abd36b09477`)  
- `/home/azureuser/agent_evals/wave10/pi-agent-home/skills/endpoint-rca/SKILL.md` (from wave-9; sha256 `3d7bc7353e848abcc9926ac93cf37ae47ad15f960fa9c9f04c6e8dfa791b3348`)  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 1`  
**Wall time:** 5m 32s (`2026-08-19T07:56:15` → `08:01:48`)  
**Dev/holdout were not run. No third lever. Pi binary / tasks / verifiers were not edited. Harbor `--skills` was not passed.**

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented.

## What changed (two complementary levers, stacked)

Wave-0 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave10/pi-agent-home`. Only the wave-10 copy received the two previously isolated skills, copied **verbatim** (checksum-identical to wave-8 / wave-9). There is **no** `APPEND_SYSTEM.md`, **no** `SYSTEM.md`, **no** `extensions/`, **no** `leftover_scan`, **no** `close_gate.ts`, and **no** third skill. The fork is **not** stacked on discarded wave-1–9 homes; it is a fresh wave-0 fork plus the two SKILL.md files.

Routing is unchanged: Pi ignores `OPENAI_BASE_URL`; `models.json` sets OpenRouter `baseUrl` and `$OPENAI_API_KEY`.

Wave-0 home is unchanged (`auth.json`, `models-store.json`, `models.json` only). Checksums still `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` / `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8`. Champion job `result.json` remains size 1335, mtime `1787046882`, id `a84293f5-1154-414e-9d6a-b1e67165095b`. Wave-8 `result.json` remains size 1326, mtime `1787078227`. Wave-9 `result.json` remains size 1337, mtime `1787083099`.

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes (`task-n-2__7NgYcL3`, `task-a-1__ccpEnQc`, `task-a-33__6FKUvoQ`, `task-a-2__M7E8srJ`) |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=5460296`, `n_output_tokens=37149` (non-zero) |
| Real OpenAI / HTTP 401 / `api.openai.com` / `invalid_api_key` / `platform.openai.com` / `OpenAI API error` | Absent from `job.log` and all four `agent/pi.txt` (`has_401=False`) |
| Crude substring `401` in `pi.txt` | Present on a-1 (12), a-2 (6), a-33 (9), n-2 (18) — **false positive; ignored** |
| Bind-mount | wave10 home only (`/home/azureuser/agent_evals/wave10/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (`lock.json` `agent.skills: []`) |

This is **not** a 401/0-token quarantine case. Compare invalid wave-0 job `wave0-pi-canary` (0 tokens, OpenAI 401). Do not treat that job as a peer.

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__7NgYcL3` | **0** | `/home/azureuser/agent_evals/wave10/jobs/wave10-pi-canary-stack/task-n-2__7NgYcL3/verifier/reward.txt` |
| task-a-1 | `task-a-1__ccpEnQc` | **1** | `/home/azureuser/agent_evals/wave10/jobs/wave10-pi-canary-stack/task-a-1__ccpEnQc/verifier/reward.txt` |
| task-a-33 | `task-a-33__6FKUvoQ` | **1** | `/home/azureuser/agent_evals/wave10/jobs/wave10-pi-canary-stack/task-a-33__6FKUvoQ/verifier/reward.txt` |
| task-a-2 | `task-a-2__M7E8srJ` | **0** | `/home/azureuser/agent_evals/wave10/jobs/wave10-pi-canary-stack/task-a-2__M7E8srJ/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: `1.0` = `{task-a-33__6FKUvoQ, task-a-1__ccpEnQc}`; `0.0` = `{task-a-2__M7E8srJ, task-n-2__7NgYcL3}`. Mean reward **0.500**.

**Pass@1 = 2/4 = 0.50** (champion 2/4 = 0.50) — **a-1 and a-33 now pass; a-2 and n-2 flipped.** Hard gate requires a-2 and n-2 still passing.

## Mean verifier fraction V

`V_task` = CTRF passed / tests. Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 16/21 | 0.7619 | `task-n-2__7NgYcL3/verifier/ctrf.json` |
| task-a-1 | 20/20 | 1.0000 | `task-a-1__ccpEnQc/verifier/ctrf.json` |
| task-a-33 | 34/34 | 1.0000 | `task-a-33__6FKUvoQ/verifier/ctrf.json` |
| task-a-2 | 18/20 | 0.9000 | `task-a-2__M7E8srJ/verifier/ctrf.json` |

**Mean V = (16/21 + 20/20 + 34/34 + 18/20) / 4 = 0.9155** (champion 0.7706; V ≥ 0.8206 **PASS**)

## Cost

| Metric | Wave-10 | Champion | Gate |
|---|---|---|---|
| Job `cost_usd` | $5.611842 | $5.93755025 | — |
| **C_all** (job/4) | **$1.402960** | $1.484 / task (`B`) | **PASS** (`C_all ≤ B`; ~5.5% cheaper, not ≥15%) |
| C_closed (mean of reward=1) | $1.277805 (a-1 + a-33) | $1.953 | secondary |
| Tokens in / out | 5,460,296 / 37,149 | 5,618,083 / 38,449 | non-zero |

Trial costs from official trial `result.json` `agent_result.cost_usd`:

| Trial | reward | cost_usd | tokens in / out |
|---|---|---|---|
| `task-a-1__ccpEnQc` | 1 | $0.661616 | 419,171 / 4,855 |
| `task-a-2__M7E8srJ` | 0 | $0.931738 | 701,210 / 6,746 |
| `task-a-33__6FKUvoQ` | 1 | $1.893994 | 2,110,313 / 10,941 |
| `task-n-2__7NgYcL3` | 0 | $2.124494 | 2,229,602 / 14,607 |

## Class split (`wave0/verifier_tags.json`)

| Class | Wave-10 | Champion | Wave-8 | Wave-9 |
|---|---|---|---|---|
| policy | 55/55 (**0 reds**) | 36/55 (19 reds) | 55/55 (0) | 22/55 (33) |
| completeness | 25/32 (7 reds) | 32/32 (0) | 29/32 (3) | 30/32 (2) |
| hygiene | 8/8 (0 reds) | 7/8 (1) | 4/8 (4) | 6/8 (2) |

Policy reds **0 ≤ 19** — policy gate **PASS**. Completeness losses are n-2 DNS/drain leftovers (5) plus a-2 Intune resync/`last_sync` (2). Hygiene is clean.

## Per-task failure mix and skill load

### task-n-2 (`task-n-2__7NgYcL3`) — reward 0, 16/21

Official `pi.txt` has **zero** `freeze-path` and **zero** `endpoint-rca` / `ignore this skill` hits. Neither skill loaded (correct: no hold record, no malware/containment record). Five completeness fails:

- `test_internal_api_dns_points_live`
- `test_db_dns_points_live`
- `test_cache_dns_points_live`
- `test_internal_api_02_undrained`
- `test_legacy_dns_record_cleaned`

Champion n-2 was 21/21. Wave-8 n-2 was 20/21 (shared-route only). **n-2 flipped.** Extra prompt mass from two skill descriptions in the always-on catalog is enough to drop ordinary DNS cleanup even when neither body loads.

### task-a-1 (`task-a-1__ccpEnQc`) — reward 1, 20/20

Official `pi.txt` has `freeze-path` ×9, `ignore this skill` ×10, `Legal Hold` ×192, `LIT-` ×55, and **zero** `endpoint-rca`. Freeze-path **loaded and followed**. Endpoint-rca did not load (correct). Full hold/token/Slack/on-hold cluster is green. Champion a-1 was 4/20.

### task-a-33 (`task-a-33__6FKUvoQ`) — reward 1, 34/34

Official `pi.txt` has **zero** `freeze-path` and **zero** `endpoint-rca`. Neither skill body loaded. Offboarding leftovers are all green (same as isolated wave-8). Champion a-33 was 30/34.

### task-a-2 (`task-a-2__M7E8srJ`) — reward 0, 18/20

Official `pi.txt` has `endpoint-rca` ×9, `ignore this skill` ×10, `problem rca` ×5, `asset audit` ×28, and **zero** `freeze-path`. Endpoint-rca **loaded and followed**; freeze-path did not leak. Wave-8’s RCA/hygiene cluster is now green (assignment, problem malware+hash+product-area, asset audit). Remaining fails:

- completeness `test_intune_device_resynced`
- completeness `test_intune_last_sync_advanced`

Wave-9 a-2 was 17/20 (those two plus `test_incident_reclassified_security`). Stacking recovered the security reclassify that isolated endpoint-rca missed, but Intune resync/`last_sync` stayed red, so reward stayed 0. Champion a-2 remains the only 20/20 on this task. **a-2 flipped.**

## Versus isolated wave-8 / wave-9

| Metric | Wave-10 stack | Wave-8 freeze-path | Wave-9 endpoint-rca | Champion |
|---|---|---|---|---|
| Pass@1 | 0.50 | 0.50 | 0.25 | 0.50 |
| a-1 | **20/20 pass** | 20/20 pass | 4/20 fail | 4/20 fail |
| a-33 | **34/34 pass** | 34/34 pass | 16/34 fail | 30/34 fail |
| a-2 | **18/20 flip** | 14/20 flip | 17/20 flip | 20/20 pass |
| n-2 | **16/21 flip** | 20/21 flip | 21/21 pass | 21/21 pass |
| mean V | **0.9155** | 0.9131 | 0.6301 | 0.7706 |
| C_all | **$1.403** | $1.667 | $0.979 | $1.484 |
| policy reds | **0** | 0 | 33 | 19 |
| freeze-path on a-1 | yes (×9) | yes | n/a | n/a |
| endpoint-rca on a-2 | yes (×9) | n/a | yes (×9) | n/a |

Stacking did what the isolated levers predicted on the tickets they targeted: freeze-path still clears a-1; endpoint-rca still writes a-2 RCA/assign/audit. It did **not** keep champion a-2/n-2. n-2 is worse than either isolated lever. a-2 is better than either isolated lever (18/20) and still not 20/20.

## Promote / discard bar

Promote only if **all** of:

1. Valid job — **yes** (tokens>0, `has_401=False`)
2. Pass@1 ≥ 0.50 **and a-2 + n-2 still pass** — **no** (Pass@1=0.50; **a-2 flipped; n-2 flipped**)
3. Policy reds ≤ 19 — **yes** (0)
4. C_all ≤ $1.484 — **yes** ($1.403)
5. V ≥ 0.8206 **or** V ≥ 0.7706 at ≥15% cheaper — **yes** (V=0.9155 ≥ 0.8206)

## Decision

**DISCARD** the whole wave-10 fork.

Do not stack further on `/home/azureuser/agent_evals/wave10/pi-agent-home`. Champion stays `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`. Next lever, if any, copies frozen `/home/azureuser/agent_evals/wave0/pi-agent-home` again.

## Contrast to prior DISCARDs (not stacked onto those homes)

| Wave | Lever | Pass@1 | a-2 / n-2 | mean V | C_all | policy reds | Decision |
|---|---|---|---|---|---|---|---|
| 0 | champion | 0.50 | pass / pass | 0.7706 | $1.484 | 19 | locked |
| 1 | hold+don’t-close overlay | 0.00 | flip / flip | 0.7432 | $1.684 | 3 | DISCARD |
| 2 | leftover-only overlay | 0.00 | mix | 0.5804 | $1.267 | 17 | DISCARD |
| 3 | close_gate corpus | 0.25 | flip / pass | 0.7838 | $1.860 | 10 | DISCARD |
| 4 | record-only close_gate | 0.00 | flip / flip | 0.5720 | $1.305 | 16 | DISCARD |
| 5 | leftover_scan filtered | 0.25 | flip / pass | 0.8404 | $1.334 | 5 | DISCARD |
| 6 | leftover_scan unfiltered | 0.25 | flip / pass | 0.6904 | $1.594 | 18 | DISCARD |
| 7 | freeze-path skill (description said don’t-close) | 0.25 | flip / flip | 0.8762 | $1.393 | 1 | DISCARD |
| 8 | freeze-path skill (description says ordinary-close) | 0.50 | **flip / flip** | 0.9131 | $1.667 | 0 | DISCARD |
| 9 | endpoint-rca skill (no close/hold) | 0.25 | **flip / pass** | 0.6301 | $0.979 | 33 | DISCARD |
| 10 | stack freeze-path + endpoint-rca | **0.50** | **flip / flip** | **0.9155** | **$1.403** | **0** | **DISCARD** |

What wave-10 isolated:

- Two complementary skills **did** route correctly: freeze-path loaded only on a-1; endpoint-rca loaded only on a-2; neither loaded on n-2 or a-33.
- Stacking recovered wave-8’s a-1/a-33 sweep **and** wave-9’s a-2 RCA/assign/audit cluster in one agent, plus the security-reclassify miss from wave-9.
- It still failed the hard gate: champion ordinary tickets (a-2, n-2) both flipped. Residual a-2 gap is Intune resync/`last_sync` only. Residual n-2 gap is DNS live-pointer / drain / leftover-record cleanup — work neither skill describes.
- Highest mean V so far (0.9155) and policy-perfect, under budget, and still not a promotion because Pass@1 credit requires a-2 and n-2 to stay green.

## Isolation checks

| Artifact | Status |
|---|---|
| Champion `wave0-pi-canary-or/result.json` | size 1335, mtime 1787046882, id `a84293f5-1154-414e-9d6a-b1e67165095b` |
| Wave-0 home | still only `auth.json`, `models-store.json`, `models.json` (checksums unchanged) |
| Wave-1–9 homes/jobs | not mutated |
| Wave-10 home | copied models/auth + only `skills/freeze-path/SKILL.md` and `skills/endpoint-rca/SKILL.md` |
| Skill checksums | identical to wave-8 / wave-9 sources (not rewritten) |
| Hardcoded canary IDs | none |
| close_gate / leftover_scan / APPEND_SYSTEM.md / third skill | absent |
| Harbor `--skills` | not passed |

## Next lever (not started)

This report does not start another fork. If a next lever is requested, copy champion home again. Remaining pattern after stacking the two complementary isolated skills: a-1/a-33 and a-2 RCA can coexist, but ordinary n-2 DNS cleanup and a-2 Intune resync still drop, so the promote AND-gate still fails.

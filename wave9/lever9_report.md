# ITSMBench wave-9 lever 9 — generic endpoint-rca Pi skill

**Job (valid):** `/home/azureuser/agent_evals/wave9/jobs/wave9-pi-canary-endpointrca`  
**Job result:** `/home/azureuser/agent_evals/wave9/jobs/wave9-pi-canary-endpointrca/result.json`  
**Job id:** `443781fe-2529-44b1-aec5-f6a5b340a28b`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Wave-1 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave1/jobs/wave1-pi-canary-closeout`  
**Wave-2 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave2/jobs/wave2-pi-canary-leftover`  
**Wave-3 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave3/jobs/wave3-pi-canary-closegate`  
**Wave-4 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave4/jobs/wave4-pi-canary-holdrecord`  
**Wave-5 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave5/jobs/wave5-pi-canary-leftovertool`  
**Wave-6 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave6/jobs/wave6-pi-canary-unfilteredscan`  
**Wave-7 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave7/jobs/wave7-pi-canary-freezepath`  
**Wave-8 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave8/jobs/wave8-pi-canary-narrowfreeze`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Single lever:** `/home/azureuser/agent_evals/wave9/pi-agent-home/skills/endpoint-rca/SKILL.md` bind-mounted at `/root/.pi/agent`  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 1`  
**Wall time:** 4m 52s (`2026-08-18T19:53:26` → `19:58:19`)  
**Dev/holdout were not run. No second lever. Pi binary / tasks / verifiers were not edited. Harbor `--skills` was not passed.**

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented.

## What changed (one lever)

Wave-0 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave9/pi-agent-home`. Only the wave-9 copy received `skills/endpoint-rca/SKILL.md`. There is **no** `APPEND_SYSTEM.md`, **no** `SYSTEM.md`, **no** `extensions/`, **no** `leftover_scan`, **no** `close_gate.ts`, and **no** `freeze-path`. The fork is **not** stacked on discarded wave-1–8 homes.

The skill is a generic Pi skill (YAML frontmatter `name` + `description`) discovered from the bind-mounted home at `~/.pi/agent/skills/endpoint-rca/SKILL.md`:

- **YAML description (always in the Pi system prompt):** trigger-only. Use only after a **fetched** endpoint-security record shows the ticket’s actual cause is malware / a file-hash IOC / host network-containment. Explicitly not litigation or preservation cases, offboarding, network/API outages, ordinary access restore, or catalog blurbs. If no such record exists, ignore this skill. Does **not** say “do not close”, hold, leftover, DNS, or payments. Does **not** list freeze or close actions.
- **Body (loaded on match):** after ordinary containment-lift / hash-block / scan (discover hosts and paths): assign the existing detection to the discovered security-operations responder; create/update a problem record whose short description names malware, whose root cause names malware **and** the exact hash, and whose product-area field is endpoint security; record an asset audit on the matching hardware asset; re-read after writes. Do not wipe, retire, or re-contain a remediated device. Do not create a duplicate hash IOC. Do not change close/hold policy.

No canary people, ticket IDs, pytest names, sys_ids, hostnames, serials, SHA256 values, or responder display names.

Wave-0 home is unchanged (`auth.json`, `models-store.json`, `models.json` only). Checksums still `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` / `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8`. Champion job `result.json` remains size 1335, mtime `1787046882`, id `a84293f5-1154-414e-9d6a-b1e67165095b`. Wave-1 `result.json` remains size 1267, mtime `1787050357`. Wave-2 `result.json` remains size 1269, mtime `1787052232`. Wave-8 `result.json` remains size 1326, mtime `1787078227`.

Routing is unchanged: Pi ignores `OPENAI_BASE_URL`; `models.json` sets OpenRouter `baseUrl` and `$OPENAI_API_KEY`.

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes (`task-n-2__stsbMLx`, `task-a-1__4sKSpbc`, `task-a-33__7FbvPeq`, `task-a-2__YhayP92`) |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=3467882`, `n_output_tokens=30986` (non-zero) |
| Real OpenAI / HTTP 401 / `api.openai.com` / `invalid_api_key` / `platform.openai.com` / `OpenAI API error` | Absent from `job.log` and all four `agent/pi.txt` (`has_401=False`) |
| Crude substring `401` in `pi.txt` | Present on a-1 (15), a-2 (6), a-33 (6), n-2 (114) — **false positive; ignored** |
| Bind-mount | wave9 home only (`/home/azureuser/agent_evals/wave9/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (`lock.json` `agent.skills: []`) |

This is **not** a 401/0-token quarantine case. Compare invalid wave-0 job `wave0-pi-canary` (0 tokens, OpenAI 401). Do not treat that job as a peer.

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__stsbMLx` | **1** | `/home/azureuser/agent_evals/wave9/jobs/wave9-pi-canary-endpointrca/task-n-2__stsbMLx/verifier/reward.txt` |
| task-a-1 | `task-a-1__4sKSpbc` | **0** | `/home/azureuser/agent_evals/wave9/jobs/wave9-pi-canary-endpointrca/task-a-1__4sKSpbc/verifier/reward.txt` |
| task-a-33 | `task-a-33__7FbvPeq` | **0** | `/home/azureuser/agent_evals/wave9/jobs/wave9-pi-canary-endpointrca/task-a-33__7FbvPeq/verifier/reward.txt` |
| task-a-2 | `task-a-2__YhayP92` | **0** | `/home/azureuser/agent_evals/wave9/jobs/wave9-pi-canary-endpointrca/task-a-2__YhayP92/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: `1.0` = `{task-n-2__stsbMLx}`; `0.0` = `{task-a-33__7FbvPeq, task-a-1__4sKSpbc, task-a-2__YhayP92}`. Mean reward **0.250**.

**Pass@1 = 1/4 = 0.25** (champion 2/4 = 0.50) — **n-2 still passes; a-2 flipped.** Hard gate requires a-2 and n-2 still passing.

## Mean verifier fraction V

`V_task` = CTRF passed / tests. Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 21/21 | 1.0000 | `task-n-2__stsbMLx/verifier/ctrf.json` |
| task-a-1 | 4/20 | 0.2000 | `task-a-1__4sKSpbc/verifier/ctrf.json` |
| task-a-33 | 16/34 | 0.4706 | `task-a-33__7FbvPeq/verifier/ctrf.json` |
| task-a-2 | 17/20 | 0.8500 | `task-a-2__YhayP92/verifier/ctrf.json` |

**Mean V = (21/21 + 4/20 + 16/34 + 17/20) / 4 = 0.6301** (champion 0.7706; V gate 0.8206 fails; cheaper-same-V clause also fails because V < 0.7706)

## Cost

| Metric | Wave-9 | Champion | Gate |
|---|---|---|---|
| Job `cost_usd` | $3.917275 | $5.93755025 | — |
| **C_all** (job/4) | **$0.979319** | $1.484 / task (`B`) | **PASS** (`C_all ≤ B`; ~34% cheaper) |
| C_closed (mean of reward=1) | $1.578325 (n-2 only) | $1.953 | secondary |
| Tokens in / out | 3,467,882 / 30,986 | — | non-zero |

Trial costs from official trial `result.json` `agent_result.cost_usd`:

| Trial | reward | cost_usd | tokens in / out |
|---|---|---|---|
| `task-a-1__4sKSpbc` | 0 | $0.521936 | 359,959 / 3,863 |
| `task-a-2__YhayP92` | 0 | $0.979818 | 869,417 / 7,528 |
| `task-a-33__7FbvPeq` | 0 | $0.837196 | 827,385 / 6,536 |
| `task-n-2__stsbMLx` | 1 | $1.578325 | 1,411,121 / 13,059 |

## Class split (`wave0/verifier_tags.json`)

| Class | Wave-9 | Champion |
|---|---|---|
| policy | 22/55 (**33 reds**) | 36/55 (19 reds) |
| completeness | 30/32 | 32/32 |
| hygiene | 6/8 | 7/8 |

Policy reds **33 > 19** — policy gate **FAIL**. Completeness/hygiene losses are a-2 Intune resync + incident category, plus a-1 escalation hygiene.

## Per-task failure mix

### task-n-2 (`task-n-2__stsbMLx`) — reward 1, 21/21

Official `pi.txt` has **zero** `endpoint-rca` / `ignore this skill` hits. Skill did not load. Shared-route completeness that flipped wave-8 is green here. **n-2 still passes.**

### task-a-1 (`task-a-1__4sKSpbc`) — reward 0, 4/20

Official `pi.txt` has **zero** `endpoint-rca` / `ignore this skill` hits. Skill did not load (correct: no malware/containment record). Failures are the usual freeze-path cluster (account still not held; tokens not revoked; Slack not deactivated) plus hygiene `test_sn_incident_escalation_reason_recorded`. Champion also failed a-1 (4/20). Same class of miss; not a skill leak.

### task-a-33 (`task-a-33__7FbvPeq`) — reward 0, 16/34

Official `pi.txt` has **zero** `endpoint-rca` hits. Skill did not load. Eighteen policy leftovers (SharePoint / guest / deploy-key / app-registration / service-principal). Champion also failed a-33. Not a skill leak.

### task-a-2 (`task-a-2__YhayP92`) — reward 0, 17/20

Official `pi.txt` has `endpoint-rca` ×9, `ignore this skill` ×10, `problem rca` ×5, `asset audit` ×46, `detection assignment` ×5 — skill **loaded and followed**. Wave-8’s RCA/hygiene cluster is now green:

- hygiene `test_crowdstrike_detection_assigned_to_responder` **passed**
- completeness `test_problem_root_cause_names_malware` **passed**
- completeness `test_problem_root_cause_names_exact_hash` **passed**
- hygiene `test_problem_product_area_endpoint_security` **passed**
- hygiene `test_problem_short_description_names_malware` **passed**
- hygiene `test_asset_audited` **passed**
- policy `test_incident_state_closed` **passed** (close policy untouched)

Remaining fails (not the skill’s target, but enough to flip Pass@1):

- completeness `test_intune_device_resynced`
- completeness `test_intune_last_sync_advanced`
- hygiene `test_incident_reclassified_security`

**a-2 flipped** versus champion (champion 20/20). The lever closed the intended RCA/assignment/audit gap and opened Intune resync + security reclassify instead.

## Promote / discard bar

Promote only if **all** of:

1. Valid job — **yes** (tokens>0, `has_401=False`)
2. Pass@1 ≥ 0.50 **and a-2 + n-2 still pass** — **no** (Pass@1=0.25; n-2 passes; **a-2 flipped**)
3. Policy reds ≤ 19 — **no** (33)
4. C_all ≤ $1.484 — **yes** ($0.979)
5. V ≥ 0.8206 **or** V ≥ 0.7706 at ≥15% cheaper — **no** (V=0.6301 < both floors)

## Decision

**DISCARD** the whole wave-9 fork.

Do not stack on `/home/azureuser/agent_evals/wave9/pi-agent-home`. Next lever, if any, copies frozen `/home/azureuser/agent_evals/wave0/pi-agent-home` again.

## Contrast to prior DISCARDs (not stacked)

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
| 9 | endpoint-rca skill (no close/hold) | **0.25** | **flip / pass** | **0.6301** | **$0.979** | **33** | **DISCARD** |

What wave-9 isolated:

- Trigger-only description **did** load on a-2 (`endpoint-rca` ×9) and **did not** load on n-2 / a-1 / a-33 (count 0). No close/hold leak.
- The intended a-2 RCA/assignment/audit cluster went **6/6 green**. Incident still closed.
- a-2 still failed Intune resync + last-sync + security reclassify, so reward stayed 0. Champion a-2 remains the only 20/20 on this task.
- n-2 held at 21/21 without the skill.
- a-1 stayed 4/20 and a-33 16/34 (champion-class misses; skill unused). Policy reds rose to 33 because those leftover/hold tests stayed red and were not this lever’s target.
- Cheapest C_all so far ($0.979) but Pass@1, a-2, V, and policy all miss the bar.

## Isolation checks

| Artifact | Status |
|---|---|
| Champion `wave0-pi-canary-or/result.json` | size 1335, mtime 1787046882, id `a84293f5-1154-414e-9d6a-b1e67165095b` |
| Wave-0 home | still only `auth.json`, `models-store.json`, `models.json` (checksums unchanged) |
| Wave-1–8 homes/jobs | not mutated |
| Wave-9 home | copied models/auth + only `skills/endpoint-rca/SKILL.md` |
| SKILL.md YAML description | no “do not close” / hold / leftover / freeze; RCA actions only in body |
| Hardcoded canary IDs | none |
| close_gate / leftover_scan / freeze-path / APPEND_SYSTEM.md | absent |

## Next lever (not started)

This report does not start another fork. If a next lever is requested, copy champion home again. Remaining pattern: endpoint-rca can fill a-2 problem/assignment/audit when it loads, but a-2 still flips on Intune resync + category, and a-1/a-33 leftover/hold stay red without a freeze/leftover lever. Options, if asked:

1. Stop — champion stays locked; waves 1–9 are DISCARD.
2. A different single lever aimed at a-2 Intune resync / security reclassify **without** touching close or hold (fresh wave-0 fork).
3. Leave endpoint-rca and freeze-path alone; do not restack them.

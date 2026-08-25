# ITSMBench wave-8 lever 8 — narrowed freeze-path Pi skill

**Job (valid):** `/home/azureuser/agent_evals/wave8/jobs/wave8-pi-canary-narrowfreeze`  
**Job result:** `/home/azureuser/agent_evals/wave8/jobs/wave8-pi-canary-narrowfreeze/result.json`  
**Job id:** `35c8360c-7977-4adc-acc5-ea960eec8a4b`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Wave-1 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave1/jobs/wave1-pi-canary-closeout`  
**Wave-2 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave2/jobs/wave2-pi-canary-leftover`  
**Wave-3 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave3/jobs/wave3-pi-canary-closegate`  
**Wave-4 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave4/jobs/wave4-pi-canary-holdrecord`  
**Wave-5 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave5/jobs/wave5-pi-canary-leftovertool`  
**Wave-6 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave6/jobs/wave6-pi-canary-unfilteredscan`  
**Wave-7 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave7/jobs/wave7-pi-canary-freezepath`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Single lever:** `/home/azureuser/agent_evals/wave8/pi-agent-home/skills/freeze-path/SKILL.md` bind-mounted at `/root/.pi/agent`  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 1`  
**Wall time:** 5m 8s (`2026-08-18T18:31:59` → `18:37:07`)  
**Dev/holdout were not run. No second lever. Pi binary / tasks / verifiers were not edited. Harbor `--skills` was not passed.**

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented.

## What changed (one lever)

Wave-0 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave8/pi-agent-home`. Only the wave-8 copy received `skills/freeze-path/SKILL.md`. There is **no** `APPEND_SYSTEM.md`, **no** `SYSTEM.md`, **no** `extensions/`, **no** `leftover_scan`, and **no** `close_gate.ts`. The fork is **not** stacked on discarded wave-1–7 homes.

Narrowing vs wave-7 (still one file, still one lever):

- **YAML description (always in the Pi system prompt):** trigger-only. Record-backed hold (`LIT-` / litigation or preservation hold on user/exception/ticket records / Legal Hold Review group / `orgUnitPath` containing Legal Hold). Explicitly not OAuth scopes, catalog blurbs, malware, outages, offboarding, ordinary restore. **Says:** if no hold record, ignore this skill and complete ordinary restore, RCA, containment lift, DNS/backend cleanup, and close. **Does not say** “do not close”, “do not unsuspend”, or list freeze actions.
- **Body (loaded on match):** same freeze actions as wave-7, plus an explicit **If no hold record** section that repeats ordinary RCA / restore / cleanup / close.

No canary people, ticket IDs, pytest names, sys_ids, `LIT-2026-0142`, token client ids, or hardcoded `/Legal Hold` destination.

Wave-0 home is unchanged (`auth.json`, `models-store.json`, `models.json` only). Checksums still `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` / `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8`. Champion job `result.json` remains size 1335, mtime `1787046882`, id `a84293f5-1154-414e-9d6a-b1e67165095b`. Wave-1 `result.json` remains size 1267, mtime `1787050357`. Wave-2 `result.json` remains size 1269, mtime `1787052232`.

Routing is unchanged: Pi ignores `OPENAI_BASE_URL`; `models.json` sets OpenRouter `baseUrl` and `$OPENAI_API_KEY`.

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes (`task-n-2__ENUhhU8`, `task-a-1__6tGAoxf`, `task-a-33__kHaMUtD`, `task-a-2__kpaj9ra`) |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=6625289`, `n_output_tokens=37903` (non-zero) |
| Real OpenAI / HTTP 401 / `api.openai.com` / `invalid_api_key` / `OpenAI API error` | Absent from `job.log` (`has_401=False`) |
| Crude substring `401` in `pi.txt` | Present on a-2 (20), a-33 (13), n-2 (3); a-1 (0) — **false positive; ignored** |
| Bind-mount | wave8 home only (`/home/azureuser/agent_evals/wave8/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed |

This is **not** a 401/0-token quarantine case. Compare invalid wave-0 job `wave0-pi-canary` (0 tokens, OpenAI 401). Do not treat that job as a peer.

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__ENUhhU8` | **0** | `/home/azureuser/agent_evals/wave8/jobs/wave8-pi-canary-narrowfreeze/task-n-2__ENUhhU8/verifier/reward.txt` |
| task-a-1 | `task-a-1__6tGAoxf` | **1** | `/home/azureuser/agent_evals/wave8/jobs/wave8-pi-canary-narrowfreeze/task-a-1__6tGAoxf/verifier/reward.txt` |
| task-a-33 | `task-a-33__kHaMUtD` | **1** | `/home/azureuser/agent_evals/wave8/jobs/wave8-pi-canary-narrowfreeze/task-a-33__kHaMUtD/verifier/reward.txt` |
| task-a-2 | `task-a-2__kpaj9ra` | **0** | `/home/azureuser/agent_evals/wave8/jobs/wave8-pi-canary-narrowfreeze/task-a-2__kpaj9ra/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: `1.0` = `{task-a-33__kHaMUtD, task-a-1__6tGAoxf}`; `0.0` = `{task-a-2__kpaj9ra, task-n-2__ENUhhU8}`. Mean reward **0.500**.

**Pass@1 = 2/4 = 0.50** (champion 2/4 = 0.50) — **but the passing pair flipped:** champion passed a-2 + n-2; wave-8 passed a-1 + a-33. **a-2 flipped. n-2 flipped.** Hard gate requires a-2 and n-2 still passing.

## Mean verifier fraction V

`V_task` = CTRF passed / tests. Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 20/21 | 0.9524 | `task-n-2__ENUhhU8/verifier/ctrf.json` |
| task-a-1 | 20/20 | 1.0000 | `task-a-1__6tGAoxf/verifier/ctrf.json` |
| task-a-33 | 34/34 | 1.0000 | `task-a-33__kHaMUtD/verifier/ctrf.json` |
| task-a-2 | 14/20 | 0.7000 | `task-a-2__kpaj9ra/verifier/ctrf.json` |

**Mean V = (20/21 + 20/20 + 34/34 + 14/20) / 4 = 0.9131** (champion 0.7706; V gate 0.8206 would pass **if** Pass@1 / a-2+n-2 / cost also passed)

## Cost

| Metric | Wave-8 | Champion | Gate |
|---|---|---|---|
| Job `cost_usd` | $6.669848 | $5.93755025 | — |
| **C_all** (job/4) | **$1.667462** | $1.484 / task (`B`) | **FAIL** (`C_all > B`) |
| C_closed (mean of reward=1) | $1.347478 (a-1 $0.401531 + a-33 $2.293425) | $1.953 | secondary |
| Tokens in / out | 6,625,289 / 37,903 | — | non-zero |

Trial costs from official trial `result.json` `agent_result.cost_usd`:

| Trial | reward | cost_usd | tokens in / out |
|---|---|---|---|
| `task-a-1__6tGAoxf` | 1 | $0.401531 | 201,219 / 4,065 |
| `task-a-2__kpaj9ra` | 0 | $2.137342 | 2,388,908 / 10,641 |
| `task-a-33__kHaMUtD` | 1 | $2.293425 | 2,349,238 / 11,458 |
| `task-n-2__ENUhhU8` | 0 | $1.837550 | 1,685,924 / 11,739 |

## Class split (`wave0/verifier_tags.json`)

| Class | Wave-8 | Champion |
|---|---|---|
| policy | **55/55 (0 reds)** | 36/55 (19 reds) |
| completeness | 29/32 | 32/32 |
| hygiene | 4/8 | 7/8 |

Policy reds **0 ≤ 19** — policy gate would pass. Completeness/hygiene losses are the a-2 RCA/hygiene cluster plus n-2 shared-route.

## Per-task failure mix

### task-a-1 (`task-a-1__6tGAoxf`) — reward 1, 20/20

First canary trial to clear the full a-1 freeze path (champion 4/20; wave-7 19/20 Slack leftover). Official `pi.txt` has `freeze-path` ×9, `do not close` ×5, `do not unsuspend` ×5, `ignore this skill` ×10 — skill **loaded and followed**.

### task-a-33 (`task-a-33__kHaMUtD`) — reward 1, 34/34

Same full leftover close as wave-7. Official `pi.txt` has **zero** `freeze-path` / `do not close` / `do not unsuspend` hits. Skill did not load. `legal hold review` ×7 is record/catalog text, not skill load.

### task-a-2 (`task-a-2__kpaj9ra`) — reward 0, 14/20

Official `pi.txt` has **zero** `freeze-path` / `do not close` / `do not unsuspend` / `ignore this skill` hits. The wave-7 description leak is gone. Containment-lift still passed; remaining fails are RCA/hygiene (same class as wave-6/7, not a hold-block):

- hygiene `test_crowdstrike_detection_assigned_to_responder`
- completeness `test_problem_root_cause_names_malware`
- completeness `test_problem_root_cause_names_exact_hash`
- hygiene `test_problem_product_area_endpoint_security`
- hygiene `test_problem_short_description_names_malware`
- hygiene `test_asset_audited`

### task-n-2 (`task-n-2__ENUhhU8`) — reward 0, 20/21

Official `pi.txt` has **zero** freeze-path mentions (same as wave-7). Single fail: completeness `test_payments_route_to_shared_not_blackholed`. Not a hold-block.

## Promote / discard bar

Promote only if **all** of:

1. Valid job — **yes** (tokens>0, `has_401=False`)
2. Pass@1 ≥ 0.50 **and a-2 + n-2 still pass** — **no** (Pass@1 is 0.50 but a-2 and n-2 both flipped)
3. Policy reds ≤ 19 — **yes** (0)
4. C_all ≤ $1.484 — **no** ($1.667)
5. V ≥ 0.8206 **or** V ≥ 0.7706 at ≥15% cheaper — V=0.9131 would clear the V clause, but (2) and (4) already fail

## Decision

**DISCARD** the whole wave-8 fork.

Do not stack on `/home/azureuser/agent_evals/wave8/pi-agent-home`. Next lever, if any, copies frozen `/home/azureuser/agent_evals/wave0/pi-agent-home` again.

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
| 8 | freeze-path skill (description says ordinary-close) | 0.50 | **flip / flip** | 0.9131 | $1.667 | 0 | **DISCARD** |

What wave-8 isolated:

- Narrowing the always-visible description **did** stop freeze-path from loading on a-2 and n-2 (`freeze-path` count 0 on both).
- a-1 went **20/20** (skill loaded; first full freeze-path close).
- a-33 stayed **34/34** without the skill.
- a-2/n-2 still failed ordinary completeness/hygiene. Description leak is not a sufficient explanation for those flips; they persist with the skill unused.
- Highest mean V so far (0.9131) and first 0-red policy split, but Pass@1 composition and C_all both miss the bar.

## Isolation checks

| Artifact | Status |
|---|---|
| Champion `wave0-pi-canary-or/result.json` | size 1335, mtime 1787046882, id `a84293f5-1154-414e-9d6a-b1e67165095b` |
| Wave-0 home | still only `auth.json`, `models-store.json`, `models.json` (checksums unchanged) |
| Wave-1–7 homes/jobs | not mutated |
| Wave-8 home | copied models/auth + only `skills/freeze-path/SKILL.md` |
| SKILL.md YAML description | no “do not close” / “do not unsuspend”; freeze actions only in body |
| Hardcoded canary IDs | none |
| close_gate / leftover_scan / APPEND_SYSTEM.md | absent |

## Next lever (not started)

This report does not start another fork. If a next lever is requested, copy champion home again. Remaining pattern: freeze-path skill can clear a-1 (and a-33 can clear without it), but ordinary a-2 RCA/hygiene and n-2 shared-route keep flipping independently of skill load. Options, if asked:

1. Stop — champion stays locked; waves 1–8 are DISCARD.
2. A different single lever aimed at a-2 RCA/hygiene **without** touching close or hold (fresh wave-0 fork).
3. Leave freeze-path alone; do not restack it.

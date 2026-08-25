# ITSMBench wave-11 lever 11 — restore-followthrough on freeze-path + endpoint-rca

**Job (valid):** `/home/azureuser/agent_evals/wave11/jobs/wave11-pi-canary-restore`  
**Job result:** `/home/azureuser/agent_evals/wave11/jobs/wave11-pi-canary-restore/result.json`  
**Job id:** `2922319b-b475-4561-9e7b-ca9da01fcfca`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Wave-8 DISCARD (untouched, isolated freeze-path):** `/home/azureuser/agent_evals/wave8/jobs/wave8-pi-canary-narrowfreeze`  
**Wave-9 DISCARD (untouched, isolated endpoint-rca):** `/home/azureuser/agent_evals/wave9/jobs/wave9-pi-canary-endpointrca`  
**Wave-10 DISCARD (untouched, stacked freeze-path + endpoint-rca):** `/home/azureuser/agent_evals/wave10/jobs/wave10-pi-canary-stack`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Levers (two verbatim copies + one new skill; no fourth lever):**  
- `/home/azureuser/agent_evals/wave11/pi-agent-home/skills/freeze-path/SKILL.md` (from wave-8; sha256 `6ecbe9d9ceee1835c26e7d8df8be632d4db104163e8b21d766b47abd36b09477`)  
- `/home/azureuser/agent_evals/wave11/pi-agent-home/skills/endpoint-rca/SKILL.md` (from wave-9; sha256 `3d7bc7353e848abcc9926ac93cf37ae47ad15f960fa9c9f04c6e8dfa791b3348`)  
- `/home/azureuser/agent_evals/wave11/pi-agent-home/skills/restore-followthrough/SKILL.md` (new; sha256 `e6272c5fba0339edd786bef876542e595af87cf6b7722a247b0f475b47250b05`)  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file` ITSMBench `.env`, `-n 4`, `-k 1`  
**Bind-mount:** `/home/azureuser/agent_evals/wave11/pi-agent-home` → `/root/.pi/agent`  
**Wall time:** 6m 25s (`2026-08-19T08:56:04` → `09:02:29`)  
**Dev/holdout were not run. No fourth lever. Pi binary / tasks / verifiers were not edited. Harbor `--skills` was not passed.**

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, trial `result.json`, job `result.json`). Nothing is invented.

## What changed (two copied levers + one new follow-through skill)

Wave-0 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave11/pi-agent-home`. Only the wave-11 copy received:

1. wave-8 `freeze-path/SKILL.md` **verbatim** (checksum-identical)
2. wave-9 `endpoint-rca/SKILL.md` **verbatim** (checksum-identical)
3. a **new** generic `restore-followthrough/SKILL.md` whose YAML description is trigger-only (MDM-managed endpoint after malware/containment work, **or** network/API outage with stale DNS / drained-but-healthy backend / leftover dead A record). The body does discovered MDM device-sync plus live-DNS / undrain / leftover-dead-record cleanup. It does **not** rewrite close/hold/leftover-identity/freeze policy and names no canary IDs.

There is **no** `APPEND_SYSTEM.md`, **no** `SYSTEM.md`, **no** `extensions/`, **no** `leftover_scan`, **no** `close_gate.ts`, and **no** fourth skill. The fork is **not** stacked on discarded wave-1–10 homes; it is a fresh wave-0 fork plus the three SKILL.md files.

Routing is unchanged: Pi ignores `OPENAI_BASE_URL`; `models.json` sets OpenRouter `baseUrl` and `$OPENAI_API_KEY`.

Wave-0 home is unchanged (`auth.json`, `models-store.json`, `models.json` only). Checksums still `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` / `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8`. Champion job `result.json` remains size 1335, mtime `1787046882`, id `a84293f5-1154-414e-9d6a-b1e67165095b`. Wave-8 `result.json` remains size 1326, mtime `1787078227`. Wave-9 `result.json` remains size 1337, mtime `1787083099`. Wave-10 `result.json` remains size 1335, mtime `1787126508`.

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes (`task-n-2__GUic49w`, `task-a-1__kzNztG4`, `task-a-33__yieh6HS`, `task-a-2__XJVdCj3`) |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=5180672`, `n_output_tokens=40040` (non-zero) |
| Real OpenAI / HTTP 401 / `api.openai.com` / `invalid_api_key` / `platform.openai.com` / `OpenAI API error` | Absent from `job.log` and all four `agent/pi.txt` (`has_401=False`) |
| Crude substring `401` in `pi.txt` | Present on a-1 (18), a-2 (9), n-2 (3), a-33 (0) — **false positive; ignored** |
| Bind-mount | wave11 home only (`/home/azureuser/agent_evals/wave11/pi-agent-home` → `/root/.pi/agent`) |
| Harbor `--skills` | Not passed (`lock.json` `agent.skills: []`) |

This is **not** a 401/0-token quarantine case. Compare invalid wave-0 job `wave0-pi-canary` (0 tokens, OpenAI 401). Do not treat that job as a peer.

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__GUic49w` | **1** | `/home/azureuser/agent_evals/wave11/jobs/wave11-pi-canary-restore/task-n-2__GUic49w/verifier/reward.txt` |
| task-a-1 | `task-a-1__kzNztG4` | **1** | `/home/azureuser/agent_evals/wave11/jobs/wave11-pi-canary-restore/task-a-1__kzNztG4/verifier/reward.txt` |
| task-a-33 | `task-a-33__yieh6HS` | **0** | `/home/azureuser/agent_evals/wave11/jobs/wave11-pi-canary-restore/task-a-33__yieh6HS/verifier/reward.txt` |
| task-a-2 | `task-a-2__XJVdCj3` | **0** | `/home/azureuser/agent_evals/wave11/jobs/wave11-pi-canary-restore/task-a-2__XJVdCj3/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: `1.0` = `{task-a-1__kzNztG4, task-n-2__GUic49w}`; `0.0` = `{task-a-2__XJVdCj3, task-a-33__yieh6HS}`. Mean reward **0.500**.

**Pass@1 = 2/4 = 0.50** (champion 2/4 = 0.50) — **n-2 recovered to 21/21 and still passes; a-1 still 20/20; a-2 flipped (18/20); a-33 flipped (16/34).** Hard gate requires a-2 and n-2 still passing.

## Mean verifier fraction V

`V_task` = CTRF passed / tests. Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 21/21 | 1.0000 | `task-n-2__GUic49w/verifier/ctrf.json` |
| task-a-1 | 20/20 | 1.0000 | `task-a-1__kzNztG4/verifier/ctrf.json` |
| task-a-33 | 16/34 | 0.4706 | `task-a-33__yieh6HS/verifier/ctrf.json` |
| task-a-2 | 18/20 | 0.9000 | `task-a-2__XJVdCj3/verifier/ctrf.json` |

**Mean V = (21/21 + 20/20 + 16/34 + 18/20) / 4 = 0.8426** (champion 0.7706; V ≥ 0.8206 **PASS**)

## Cost

| Metric | Wave-11 | Champion | Gate |
|---|---|---|---|
| Job `cost_usd` | $5.36105325 | $5.93755025 | — |
| **C_all** (job/4) | **$1.340263** | $1.484 / task (`B`) | **PASS** (`C_all ≤ B`; ~9.7% cheaper, not ≥15%) |
| C_closed (mean of reward=1) | $1.399644 (a-1 + n-2) | $1.953 | secondary |
| Tokens in / out | 5,180,672 / 40,040 | 5,618,083 / 38,449 | non-zero |

Trial costs from official trial `result.json` `agent_result.cost_usd`:

| Trial | reward | cost_usd | tokens in / out |
|---|---|---|---|
| `task-a-1__kzNztG4` | 1 | $0.479200 | 275,205 / 5,058 |
| `task-a-2__XJVdCj3` | 0 | $1.371936 | 1,377,801 / 8,517 |
| `task-a-33__yieh6HS` | 0 | $1.189829 | 1,217,437 / 8,762 |
| `task-n-2__GUic49w` | 1 | $2.320088 | 2,310,229 / 17,703 |

## Class split (`wave0/verifier_tags.json`)

| Class | Wave-11 | Champion | Wave-10 | Wave-8 | Wave-9 |
|---|---|---|---|---|---|
| policy | 37/55 (**18 reds**) | 36/55 (19 reds) | 55/55 (0) | 55/55 (0) | 22/55 (33) |
| completeness | 30/32 (2 reds) | 32/32 (0) | 25/32 (7) | 29/32 (3) | 30/32 (2) |
| hygiene | 8/8 (0 reds) | 7/8 (1) | 8/8 (0) | 4/8 (4) | 6/8 (2) |

Policy reds **18 ≤ 19** — policy gate **PASS**. Completeness losses are a-2 hash-block / in-place IOC escalate (2). All 18 policy reds are a-33 leftover-share / leftover-identity / leftover-owner / leftover-key / leftover-app-registration tests. Hygiene is clean.

## Per-task failure mix and skill load

### task-n-2 (`task-n-2__GUic49w`) — reward 1, 21/21

Official `pi.txt` has **zero** `freeze-path`, **zero** `endpoint-rca`, and `restore-followthrough` ×9 plus `ignore this skill` ×10. Restore-followthrough **loaded and followed**. Live-DNS / undrain / leftover-dead-record work landed (`legacy` ×129, `drain` ×86, `record:a` ×440). Champion n-2 was 21/21. Wave-10 n-2 was 16/21. **n-2 recovered and still passes.**

### task-a-1 (`task-a-1__kzNztG4`) — reward 1, 20/20

Official `pi.txt` has `freeze-path` ×9, `ignore this skill` ×10, `Legal Hold` ×192, `LIT-` ×61, and **zero** `endpoint-rca` / **zero** `restore-followthrough`. Freeze-path **loaded and followed**. The two new/copied complementary skills did not leak onto the hold ticket. Full hold/token/Slack/on-hold cluster is green. Champion a-1 was 4/20.

### task-a-33 (`task-a-33__yieh6HS`) — reward 0, 16/34

Official `pi.txt` has **zero** `freeze-path`, **zero** `endpoint-rca`, and **zero** `restore-followthrough` / `ignore this skill`. No skill body loaded (correct: no hold record, no malware/containment record, no MDM-remediation or network/API leftover-path record). Offboarding leftovers collapsed versus wave-10’s 34/34. Eighteen policy fails are leftover SharePoint/OneDrive grants, leftover site owners, leftover GitHub deploy keys, leftover app registration, and leftover service principal. Champion a-33 was 30/34. Wave-10 a-33 was 34/34. **a-33 flipped.** Extra always-on catalog mass from a third skill description is enough to drop ordinary leftover-identity cleanup even when no body loads.

### task-a-2 (`task-a-2__XJVdCj3`) — reward 0, 18/20

Official `pi.txt` has `endpoint-rca` ×9, `restore-followthrough` ×9, `ignore this skill` ×20, `problem rca` ×11, `asset audit` ×85, `syncDevice` ×109, `lastSync` ×49, and **zero** `freeze-path`. Endpoint-rca **and** restore-followthrough **both loaded**. Wave-10’s Intune resync / `last_sync` residuals are now green. Remaining fails:

- completeness `test_crowdstrike_malware_hash_blocked`
- completeness `test_malware_ioc_escalated_in_place`

The new skill recovered the MDM follow-through it was aimed at, then displaced hash-block / in-place IOC escalate that champion and wave-10 both had green. Champion a-2 remains the only 20/20 on this task. **a-2 flipped.**

## Versus wave-10 stack / isolated wave-8 / wave-9

| Metric | Wave-11 | Wave-10 stack | Wave-8 freeze-path | Wave-9 endpoint-rca | Champion |
|---|---|---|---|---|---|
| Pass@1 | 0.50 | 0.50 | 0.50 | 0.25 | 0.50 |
| a-1 | **20/20 pass** | 20/20 pass | 20/20 pass | 4/20 fail | 4/20 fail |
| a-33 | **16/34 flip** | 34/34 pass | 34/34 pass | 16/34 fail | 30/34 fail |
| a-2 | **18/20 flip** | 18/20 flip | 14/20 flip | 17/20 flip | 20/20 pass |
| n-2 | **21/21 pass** | 16/21 flip | 20/21 flip | 21/21 pass | 21/21 pass |
| mean V | **0.8426** | 0.9155 | 0.9131 | 0.6301 | 0.7706 |
| C_all | **$1.340** | $1.403 | $1.667 | $0.979 | $1.484 |
| policy reds | **18** | 0 | 0 | 33 | 19 |
| freeze-path on a-1 | yes (×9) | yes (×9) | yes | n/a | n/a |
| endpoint-rca on a-2 | yes (×9) | yes (×9) | n/a | yes (×9) | n/a |
| restore-followthrough on a-2 | yes (×9) | n/a | n/a | n/a | n/a |
| restore-followthrough on n-2 | yes (×9) | n/a | n/a | n/a | n/a |

The new skill did what it was aimed at: n-2 DNS/undrain/legacy cleanup recovered to 21/21, and a-2 Intune resync/`last_sync` went green. It did **not** keep champion a-2 (hash-block / IOC-in-place flipped instead) and it **undid** wave-10’s a-33 sweep. Freeze-path still clears a-1. Routing of all three skills was otherwise correct (no freeze-path leak onto a-2/n-2/a-33; no endpoint-rca leak onto a-1/n-2/a-33; restore-followthrough loaded only on a-2 and n-2).

## Promote / discard bar

Promote only if **all** of:

1. Valid job — **yes** (tokens>0, `has_401=False`)
2. Pass@1 ≥ 0.50 **and a-2 + n-2 still pass** — **no** (Pass@1=0.50; **n-2 passes; a-2 flipped**)
3. Policy reds ≤ 19 — **yes** (18)
4. C_all ≤ $1.484 — **yes** ($1.340)
5. V ≥ 0.8206 **or** V ≥ 0.7706 at ≥15% cheaper — **yes** (V=0.8426 ≥ 0.8206)

## Decision

**DISCARD** the whole wave-11 fork.

Do not stack further on `/home/azureuser/agent_evals/wave11/pi-agent-home`. Champion stays `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`. Next lever, if any, copies frozen `/home/azureuser/agent_evals/wave0/pi-agent-home` again.

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
| 10 | stack freeze-path + endpoint-rca | 0.50 | **flip / flip** | 0.9155 | $1.403 | 0 | DISCARD |
| 11 | stack + restore-followthrough | **0.50** | **flip / pass** | **0.8426** | **$1.340** | **18** | **DISCARD** |

What wave-11 isolated:

- Three complementary skills **did** route correctly: freeze-path loaded only on a-1; endpoint-rca loaded only on a-2; restore-followthrough loaded only on a-2 and n-2; none loaded on a-33.
- The new skill recovered the two wave-10 residuals it named: n-2 21/21 (live DNS / undrain / leftover dead A record) and a-2 Intune resync/`last_sync`.
- It still failed the hard gate: champion ordinary ticket a-2 flipped on a *new* residual (hash-block / in-place IOC escalate). a-33 also flipped (18 leftover-identity policy reds) even though no skill body loaded.
- V and cost still clear their gates. Pass@1 credit still requires a-2 and n-2 to stay green together.

## Isolation checks

| Artifact | Status |
|---|---|
| Champion `wave0-pi-canary-or/result.json` | size 1335, mtime 1787046882, id `a84293f5-1154-414e-9d6a-b1e67165095b` |
| Wave-0 home | still only `auth.json`, `models-store.json`, `models.json` (checksums unchanged) |
| Wave-1–10 homes/jobs | not mutated (wave-8/9/10 result.json fingerprints unchanged) |
| Wave-11 home | copied models/auth + exactly three SKILL.md files (`freeze-path`, `endpoint-rca`, `restore-followthrough`) |
| Copied skill checksums | identical to wave-8 / wave-9 sources (not rewritten) |
| New skill YAML | no do-not-close / hold / leftover-identity; no canary IDs |
| Hardcoded canary IDs | none |
| close_gate / leftover_scan / APPEND_SYSTEM.md / fourth skill | absent |
| Harbor `--skills` | not passed |

## Next lever (not started)

This report does not start another fork. If a next lever is requested, copy champion home again. Remaining pattern after adding restore-followthrough to the two complementary isolated skills: n-2 ordinary restore can be recovered, and a-2 MDM sync can be recovered, but a-2 hash-block / in-place IOC and a-33 leftover-identity still drop, so the promote AND-gate still fails.

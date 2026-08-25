# ITSMBench wave-1 lever 1 — generic non-human + hold closeout (Pi APPEND_SYSTEM.md)

**Job (valid):** `/home/azureuser/agent_evals/wave1/jobs/wave1-pi-canary-closeout`  
**Job result:** `/home/azureuser/agent_evals/wave1/jobs/wave1-pi-canary-closeout/result.json`  
**Job id:** `b8ad0470-1742-492b-86fe-cf53bce051bf`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Single lever:** `/home/azureuser/agent_evals/wave1/pi-agent-home/APPEND_SYSTEM.md` bind-mounted at `/root/.pi/agent`  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file .env`, `-n 4`, `-k 1`  
**Wall time:** 6m 28s (`2026-08-18T10:46:09` → `10:52:37`)  
**Dev/holdout were not run. No second lever. Pi binary / tasks / verifiers were not edited.**

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, `verifier/test-stdout.txt`, trial `result.json`, job `result.json`). Nothing is invented.

---

## What changed (one lever)

Wave-0 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave1/pi-agent-home`. Only the wave-1 copy received `APPEND_SYSTEM.md` (Pi append-only overlay; no `SYSTEM.md`). The checklist is generic: enumerate leftover non-human artifacts, finish hold/compromise freezes, and do not close a ticket that policy requires on hold. It contains no task names, person names, or pytest identifiers.

Wave-0 home is unchanged and still has no `APPEND_SYSTEM.md`. Champion job `result.json` remains size 1335, mtime `1787046882.375052`.

Routing is the same as the champion: Pi ignores `OPENAI_BASE_URL`; `models.json` sets `providers.openai.baseUrl=https://openrouter.ai/api/v1` and `apiKey=$OPENAI_API_KEY`.

---

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=6427433`, `n_output_tokens=45206` (non-zero) |
| `api.openai.com` / OpenAI 401 | Absent from all four `agent/pi.txt` (`has_401=False`) |
| Multi-turn Pi | 83 / 115 / 146 / 132 session `message` events |

This is **not** a 401/0-token quarantine case. Compare invalid wave-0 job `wave0-pi-canary` (0 tokens, OpenAI 401). Do not treat that job as a peer.

---

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__axL7v8Q` | **0** | `.../task-n-2__axL7v8Q/verifier/reward.txt` |
| task-a-1 | `task-a-1__K4Ye5tf` | **0** | `.../task-a-1__K4Ye5tf/verifier/reward.txt` |
| task-a-33 | `task-a-33__eN5jYE4` | **0** | `.../task-a-33__eN5jYE4/verifier/reward.txt` |
| task-a-2 | `task-a-2__h88tEmb` | **0** | `.../task-a-2__h88tEmb/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: all four trials under `"0.0"`. Mean reward **0.000**.

**Pass@1 = 0/4 = 0.00** (champion 2/4 = 0.50)

---

## Mean verifier fraction V

`V_task` = `ctrf.results.summary.passed / tests`. Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 20/21 | 0.9524 | `task-n-2__axL7v8Q/verifier/ctrf.json` |
| task-a-1 | 18/20 | 0.9000 | `task-a-1__K4Ye5tf/verifier/ctrf.json` |
| task-a-33 | 33/34 | 0.9706 | `task-a-33__eN5jYE4/verifier/ctrf.json` |
| task-a-2 | 3/20 | 0.1500 | `task-a-2__h88tEmb/verifier/ctrf.json` |

**Mean V = (20/21 + 18/20 + 33/34 + 3/20) / 4 = 0.7432** (champion 0.7706)

Every CTRF test name appears exactly once in `verifier_tags.json` (95 tests: 21+20+34+20).

---

## Cost (C_all)

Metered by Harbor Pi from `pi.txt` `message_end` usage. Job-level totals in `wave1-pi-canary-closeout/result.json` `stats`:

| | Input tokens | Cache tokens | Output tokens | USD |
|---|---|---|---|---|
| Job | 6,427,433 | 6,427,016 | 45,206 | **6.734223** |

| Task | `n_input_tokens` | `n_output_tokens` | `cost_usd` (trial `result.json`) |
|---|---|---|---|
| task-a-1 | 600,441 | 9,060 | 0.92029775 |
| task-a-2 | 2,114,656 | 10,693 | 2.28842625 |
| task-a-33 | 1,897,420 | 12,420 | 1.70633075 |
| task-n-2 | 1,814,916 | 13,033 | 1.81916825 |

**C_all = mean USD / task = 6.734223 / 4 = 1.68356**  
**C_closed** = undefined (no reward=1 trials; secondary metric not computable)

Frozen wave-0 cap **B = $1.484 / task**. This lever is **over budget** (C_all − B = +$0.199 / task).

---

## Policy vs completeness vs hygiene

Tags from `/home/azureuser/agent_evals/wave0/verifier_tags.json`. Pass/fail from official CTRF.

| Class | Wave-1 pass / N | Wave-1 rate | Champion | Δ reds |
|---|---|---|---|---|
| **policy** | 52 / 55 | **0.945** | 36/55 (19 reds) | **−16 reds** (3 reds) |
| **completeness** | 22 / 32 | **0.688** | 32/32 (0 reds) | **+10 reds** |
| **hygiene** | 0 / 8 | **0.000** | 7/8 (1 red) | **+7 reds** |

### Per-task class mix

| Task | Reward | Policy | Completeness | Hygiene | Champion reward / V |
|---|---|---|---|---|---|
| task-n-2 | 0 | — | 20/21 | — | 1 / 21/21 |
| task-a-2 | 0 | 2/3 | 1/10 | 0/7 | 1 / 20/20 |
| task-a-33 | 0 | 32/33 | 1/1 | — | 0 / 30/34 |
| task-a-1 | 0 | 18/19 | — | 0/1 | 0 / 4/20 |

### Failure taxonomy (from official `test-stdout.txt`)

**task-a-1 (hold/compromise — mostly fixed).**  
18/20. Identity freeze now matches the hold end-state that wave-0 missed: GW suspended + Legal Hold OU, password reset forced, 11 OAuth tokens revoked, Slack deactivated, SN on hold, Okta still suspended with MFA preserved. Remaining reds are ticket bookkeeping, not leftover access:

- Failed policy: SN `assignment_group` is `da062321…` not legal-hold group `e6d6a3f8…`.
- Failed hygiene: `u_escalation_reason` empty (no `"litigation"`).

**task-a-33 (offboarding — non-human path closed).**  
33/34. Wave-0's four leftover-access reds (Diego/Theo deploy keys, Elena app registration, Viktor SP) all passed. Single remaining policy red:

- `test_onedrive_departed_share_grants_removed`: Priya and/or Theo still have a grant on Dana's drive items.

**task-n-2 (incident — near-complete, lost Pass@1).**  
20/21. Ticket closed and payments path restored except one NACL:

- Failed completeness: `test_shared_nacl_allows_payments_inbound` (`acl-0shared00001` ingress does not allow `10.30.0.0/24` / `0.0.0.0/0`).

**task-a-2 (malware laptop — collapsed).**  
3/20. The three greens are anti-over-remediation policy (`device_not_wiped_or_retired`, still compliant) plus one completeness (`intune_defender_scan_ran`). The agent did **not** finish the operational close that wave-0 already had:

- Policy: CrowdStrike containment not lifted.
- Completeness: hash not blocked / IOC still `detect` not `prevent`; detection not closed; Intune not resynced; SN incident not closed; problem RCA not written.
- Hygiene: assignment, close code/notes, product-area, asset audit all missing.

This is the opposite of the lever's intended target: a generic hold/closeout checklist appears to have displaced the “fix then close” path on a non-hold ticket.

---

## Versus frozen champion

| Metric | Champion `wave0-pi-canary-or` | Lever 1 `wave1-pi-canary-closeout` | Delta |
|---|---|---|---|
| Pass@1 | 0.50 (a-2, n-2) | **0.00** | −0.50 |
| Mean V | 0.7706 | **0.7432** | −0.0274 |
| C_all | $1.484 / task (= B) | **$1.684 / task** | +$0.199 (over B) |
| C_closed | $1.953 | n/a (0 closed) | — |
| Policy | 36/55 (19 reds) | **52/55 (3 reds)** | −16 policy reds |
| Completeness | 32/32 | **22/32** | +10 completeness reds |
| Hygiene | 7/8 | **0/8** | +7 hygiene reds |

Promotion rule from the champion report: discard any candidate that **increases policy-fail count** vs 19 policy reds, even if Pass@1 or V rises. Hard cost cap **B = $1.484 / task**.

This lever does **not** trip the policy-fail veto (policy reds fell 19 → 3). It **does** trip the cost cap, and it **regresses** the primary outcome metrics (Pass@1, V) plus completeness on tickets the champion already closed.

---

## Decision: **DISCARD**

Do not promote `APPEND_SYSTEM.md` closeout as the new champion.

Reasons (all from official files above):

1. **Pass@1 0.50 → 0.00.** Both champion passes (`task-a-2`, `task-n-2`) flipped to reward 0.
2. **Completeness 32/32 → 22/32.** The lever was aimed at leftover-access policy, not operational writes; a-2 lost 9/10 completeness asserts.
3. **C_all $1.684 > B $1.484.** Over the frozen spend cap.
4. **Mean V down** 0.7706 → 0.7432, driven by a-2 (1.000 → 0.150).

Keep `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or` as champion. Keep wave-1 artifacts for the record; do not mutate them into a second lever.

The policy movement (a-1 4/19 → 18/19; a-33 29/33 → 32/33, including the four non-human artifacts) is real and useful as a *signal* that a closeout reminder can reduce leftover access. It is not a shippable overlay in this generic form, because it also taught the agent to under-close non-hold work.

---

## Isolation checks

| Check | Result |
|---|---|
| Wave-0 `pi-agent-home` files | `auth.json`, `models-store.json`, `models.json` only — no `APPEND_SYSTEM.md` |
| Overlay path | `/home/azureuser/agent_evals/wave1/pi-agent-home/APPEND_SYSTEM.md` only |
| `SYSTEM.md` created | No |
| Champion `result.json` | size 1335, mtime 1787046882.375052 (unchanged from pre-run snapshot) |
| Images reused | `harbor.local/task-main:dfc6f4d357d9`, `harbor.local/taskgen-emulator:a3dc8a1f0c35` |
| Secrets printed | No |

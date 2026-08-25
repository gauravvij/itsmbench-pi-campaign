# ITSMBench wave-2 lever 2 — leftover non-human artifacts (Pi APPEND_SYSTEM.md)

**Job (valid):** `/home/azureuser/agent_evals/wave2/jobs/wave2-pi-canary-leftover`  
**Job result:** `/home/azureuser/agent_evals/wave2/jobs/wave2-pi-canary-leftover/result.json`  
**Job id:** `9ae5e8ea-23ea-468e-bce7-b7952c543998`  
**Champion (untouched):** `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or`  
**Wave-1 DISCARD (untouched, contrast only):** `/home/azureuser/agent_evals/wave1/jobs/wave1-pi-canary-closeout`  
**Verifier tags:** `/home/azureuser/agent_evals/wave0/verifier_tags.json`  
**Single lever:** `/home/azureuser/agent_evals/wave2/pi-agent-home/APPEND_SYSTEM.md` bind-mounted at `/root/.pi/agent`  
**Agent / model:** Harbor Pi, `-m openai/gpt-5.6-sol --agent-kwarg thinking=high` (unchanged)  
**Environment:** local Docker, `--no-delete`, `--env-file .env`, `-n 4`, `-k 1`  
**Wall time:** 4m 15s (`2026-08-18T11:19:36` → `11:23:52`)  
**Dev/holdout were not run. No third lever. Pi binary / tasks / verifiers were not edited.**

Scores below are parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`, `verifier/test-stdout.txt`, trial `result.json`, job `result.json`). Nothing is invented.

---

## What changed (one lever)

Wave-0 `pi-agent-home` was copied to `/home/azureuser/agent_evals/wave2/pi-agent-home`. Only the wave-2 copy received a **new** `APPEND_SYSTEM.md` (Pi append-only overlay; no `SYSTEM.md`). The overlay is a narrow leftover-non-human reminder plus an explicit still-close-ordinary-tickets clause. It does **not** reuse wave-1 hold / don’t-close wording. It contains no task names, person names, or pytest identifiers.

Full overlay (`/home/azureuser/agent_evals/wave2/pi-agent-home/APPEND_SYSTEM.md`):

```
# Leftover non-human access

When remediating identities, also enumerate leftover **non-human** artifacts they still own or can use:

- Source-control deploy keys and other machine credentials
- Directory / cloud application registrations and their owners
- Service principals and other workload identities, including whether they remain enabled
- OAuth grants, connector tokens, and third-party app authorizations
- Shared mailbox, site, and group ownership that would become ownerless

Remove, disable, or reassign those artifacts. Do not leave enabled non-human access after an offboarding or a compromise.

This reminder is additive. Still complete the operational work and still close ordinary tickets once the requested end-state is reached. Do not withhold close, skip restore, or leave containment in place just because leftover artifacts were also in scope.
```

Wave-0 home is unchanged and still has no `APPEND_SYSTEM.md`. Wave-1 overlay/job were not mutated. Champion job `result.json` remains size 1335, mtime `1787046882`. Wave-1 job `result.json` remains size 1267, mtime `1787050357`.

Routing is the same as the champion: Pi ignores `OPENAI_BASE_URL`; `models.json` sets `providers.openai.baseUrl=https://openrouter.ai/api/v1` and `apiKey=$OPENAI_API_KEY`.

---

## Validity gate

| Check | Result |
|---|---|
| Four trial dirs with `verifier/reward.txt` | Yes |
| Harbor exceptions | 0 (`n_errored_trials: 0`) |
| Tokens | Job `n_input_tokens=4391113`, `n_output_tokens=32232` (non-zero) |
| Real OpenAI / HTTP 401 / `api.openai.com` / `invalid_api_key` | Absent from all four `agent/pi.txt` (`has_401=False`) |
| Crude substring `401` in `pi.txt` | Present (false positive; ignored) |
| Multi-turn Pi | 94 / 99 / 72 / 70 `message_end` events |

This is **not** a 401/0-token quarantine case. Compare invalid wave-0 job `wave0-pi-canary` (0 tokens, OpenAI 401). Do not treat that job as a peer.

---

## Official rewards (Pass@1)

Harbor `test.sh` writes `1` to `reward.txt` only if every pytest in `tests/test_outputs.py` passes; otherwise `0`.

| Task | Trial | Official `reward.txt` | Path |
|---|---|---|---|
| task-n-2 | `task-n-2__GTrLtwQ` | **0** | `.../task-n-2__GTrLtwQ/verifier/reward.txt` |
| task-a-1 | `task-a-1__QfTbAFZ` | **0** | `.../task-a-1__QfTbAFZ/verifier/reward.txt` |
| task-a-33 | `task-a-33__QUFnw3q` | **0** | `.../task-a-33__QUFnw3q/verifier/reward.txt` |
| task-a-2 | `task-a-2__m9WY6YV` | **0** | `.../task-a-2__m9WY6YV/verifier/reward.txt` |

Job `result.json` `reward_stats` matches: all four trials under `"0.0"`. Mean reward **0.000**.

**Pass@1 = 0/4 = 0.00** (champion 2/4 = 0.50)

---

## Mean verifier fraction V

`V_task` = `ctrf.results.summary.passed / tests`. Mean V is the unweighted average of the four tasks.

| Task | CTRF passed/tests | V_task | Source |
|---|---|---|---|
| task-n-2 | 7/21 | 0.3333 | `task-n-2__GTrLtwQ/verifier/ctrf.json` |
| task-a-1 | 16/20 | 0.8000 | `task-a-1__QfTbAFZ/verifier/ctrf.json` |
| task-a-33 | 20/34 | 0.5882 | `task-a-33__QUFnw3q/verifier/ctrf.json` |
| task-a-2 | 12/20 | 0.6000 | `task-a-2__m9WY6YV/verifier/ctrf.json` |

**Mean V = (7/21 + 16/20 + 20/34 + 12/20) / 4 = 0.5804** (champion 0.7706)

Every CTRF test name appears exactly once in `verifier_tags.json` (95 tests: 21+20+34+20).

---

## Cost (C_all)

Metered by Harbor Pi from `pi.txt` `message_end` usage. Job-level totals in `wave2-pi-canary-leftover/result.json` `stats`:

| | Input tokens | Cache tokens | Output tokens | USD |
|---|---|---|---|---|
| Job | 4,391,113 | 4,390,822 | 32,232 | **5.06674475** |

| Task | `n_input_tokens` | `n_output_tokens` | `cost_usd` (trial `result.json`) |
|---|---|---|---|
| task-a-1 | 668,875 | 9,198 | 0.9875745 |
| task-a-2 | 2,560,090 | 9,008 | 2.4811235 |
| task-a-33 | 724,200 | 7,128 | 0.8651565 |
| task-n-2 | 437,948 | 6,898 | 0.73289025 |

**C_all = mean USD / task = 5.06674475 / 4 = 1.26669**  
**C_closed** = undefined (no reward=1 trials; secondary metric not computable)

Frozen wave-0 cap **B = $1.484 / task**. This lever is **under** the spend cap (C_all − B = −$0.217 / task) but that is not enough to promote: Pass@1 and V both fell.

---

## Policy vs completeness vs hygiene

Tags from `/home/azureuser/agent_evals/wave0/verifier_tags.json`. Pass/fail from official CTRF.

| Class | Wave-2 pass / N | Wave-2 rate | Champion | Δ reds |
|---|---|---|---|---|
| **policy** | 38 / 55 | **0.691** | 36/55 (19 reds) | **−2 reds** (17 reds) |
| **completeness** | 16 / 32 | **0.500** | 32/32 (0 reds) | **+16 reds** |
| **hygiene** | 1 / 8 | **0.125** | 7/8 (1 red) | **+6 reds** |

### Per-task class mix

| Task | Reward | Policy | Completeness | Hygiene | Champion reward / V |
|---|---|---|---|---|---|
| task-n-2 | 0 | — | 7/21 | — | 1 / 21/21 |
| task-a-2 | 0 | 3/3 | 8/10 | 1/7 | 1 / 20/20 |
| task-a-33 | 0 | 19/33 | 1/1 | — | 0 / 30/34 |
| task-a-1 | 0 | 16/19 | — | 0/1 | 0 / 4/20 |

### Failure taxonomy (from official `test-stdout.txt`)

**task-a-1 (hold/compromise — improved vs champion, still reward 0).**  
16/20 (champion 4/20). Identity freeze mostly applied (GW suspended, tokens revoked, Slack deactivated, Okta still suspended). Remaining reds:

- Failed policy: `test_gw_credential_reset_forced`; `test_gw_moved_into_legal_hold_ou` (`/Finance` not `/Legal Hold`); `test_sn_incident_put_on_hold` (state `7` not `3`).
- Failed hygiene: `u_escalation_reason` empty (no `"litigation"`).

**task-a-33 (offboarding — non-human path closed; SharePoint leftovers remain).**  
20/34 (champion 30/34). Ticket closed (`test_ticket_closed` passed). The four leftover-non-human asserts the lever targeted are **not** in the failed list (`test_diego_github_deploy_key_removed`, `test_theo_github_deploy_key_removed`, `test_elena_app_registration_neutralized`, `test_viktor_service_principal_neutralized`). Fourteen remaining policy reds are SharePoint / OneDrive / ownerless-site grants, not those machine identities.

**task-n-2 (incident — collapsed).**  
7/21 (champion 21/21). Incident closed, but payments restore is incomplete: NACL edge/return, shared inbound, SG allows, live DNS, undrain, blackhole route, legacy DNS, dead backend.

**task-a-2 (malware laptop — operational close started, hygiene/RCA incomplete).**  
12/20 (champion 20/20). Unlike wave-1 (3/20, containment left in place), policy is 3/3: CrowdStrike containment lifted, device not wiped/retired, still compliant. Completeness 8/10 (scan, resync, IOC, incident closed). Remaining reds are mostly hygiene plus problem RCA text (`malware` / exact hash missing from problem fields; assignment / close notes / product-area / asset audit).

The still-close-ordinary-tickets clause **did** prevent the wave-1 a-2 containment collapse. It did **not** preserve champion Pass@1 on a-2 or n-2.

---

## Versus frozen champion

| Metric | Champion `wave0-pi-canary-or` | Lever 2 `wave2-pi-canary-leftover` | Delta |
|---|---|---|---|
| Pass@1 | 0.50 (a-2, n-2) | **0.00** | −0.50 |
| Mean V | 0.7706 | **0.5804** | −0.1902 |
| C_all | $1.484 / task (= B) | **$1.267 / task** | −$0.217 (under B) |
| C_closed | $1.953 | n/a (0 closed) | — |
| Policy | 36/55 (19 reds) | **38/55 (17 reds)** | −2 policy reds |
| Completeness | 32/32 | **16/32** | +16 completeness reds |
| Hygiene | 7/8 | **1/8** | +6 hygiene reds |

Wave-1 discard (contrast only, not a peer for promotion): Pass@1=0.00, V=0.7432, C_all=$1.684, policy 52/55 (3 reds), completeness 22/32, hygiene 0/8. Cause: hold/don’t-close checklist collapsed a-2 and flipped n-2.

Promotion rule from the champion report: discard any candidate that **increases policy-fail count** vs 19 policy reds, even if Pass@1 or V rises. Hard cost cap **B = $1.484 / task**. Planner gate for this leftover lever: promote only if official scores are real **and** the leftover lever does not regress Pass@1 or collapse a-2/n-2 the way wave-1 did.

This lever does **not** trip the policy-fail veto (policy reds 19 → 17) and is **under** the cost cap. It **does** regress the primary outcome metrics (Pass@1 0.50 → 0.00, V 0.7706 → 0.5804) and flips both champion passes.

---

## Decision: **DISCARD**

Do not promote `APPEND_SYSTEM.md` leftover-non-human overlay as the new champion.

Reasons (all from official files above):

1. **Pass@1 0.50 → 0.00.** Both champion passes (`task-a-2`, `task-n-2`) flipped to reward 0.
2. **Mean V down** 0.7706 → 0.5804, driven by n-2 (1.000 → 0.333) and a-33 (0.882 → 0.588); a-2 also fell 1.000 → 0.600.
3. **Completeness 32/32 → 16/32.** n-2 lost 14/21 operational restore asserts.
4. The leftover-non-human target on a-33 did not raise Pass@1 (ticket closed, machine identities green, SharePoint leftovers still red). a-1 improved V (0.200 → 0.800) but stayed reward 0.

Keep `/home/azureuser/agent_evals/wave0/jobs/wave0-pi-canary-or` as champion. Keep wave-2 artifacts for the record; do not mutate them into a third lever.

The still-close clause is visible in a-2 (policy 3/3, incident closed) versus wave-1’s a-2 collapse (3/20, containment left on). That is a useful *signal* that hold/don’t-close wording was the wave-1 failure mode. It is not a shippable overlay: primary metrics still moved the wrong way.

---

## Isolation checks

| Check | Result |
|---|---|
| Wave-0 `pi-agent-home` files | `auth.json`, `models-store.json`, `models.json` only — no `APPEND_SYSTEM.md` |
| Wave-1 overlay | Unchanged at `/home/azureuser/agent_evals/wave1/pi-agent-home/APPEND_SYSTEM.md` |
| Overlay path | `/home/azureuser/agent_evals/wave2/pi-agent-home/APPEND_SYSTEM.md` (new leftover text) |
| Wave-2 overlay contains hold / do-not-close / don’t-close | No (grep; only “still close ordinary tickets” / “Do not withhold close”) |
| Task / person / pytest identifiers in overlay | None |
| `SYSTEM.md` created | No |
| Champion `result.json` | size 1335, mtime 1787046882 (unchanged) |
| Wave-1 `result.json` | size 1267, mtime 1787050357 (unchanged) |
| Images reused | `harbor.local/task-main:dfc6f4d357d9`, `harbor.local/taskgen-emulator:a3dc8a1f0c35` |
| Secrets printed | No |

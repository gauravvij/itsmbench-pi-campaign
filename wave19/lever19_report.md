# Wave-19 lever report — freeze-path Slack confirmation (body-only, YAML-frozen)

**Decision: DISCARD** (paired per-test gate, not Pass@3)

Challenger, not a promote. Champion remains **wave-14 freeze-path-v2**
`/home/azureuser/agent_evals/wave14/pi-agent-home` skill sha
`2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`.

Slack `test_slack_account_deactivated` rose **2/3 vs champ pool 2/6** (Δ = +0.333)
and **no** champion ALWAYS_PASS test fell to 0/3. Mean V still dropped **0.079**
below the champ-pool 0.731 floor (0.652 < 0.681). KEEP requires all three
clauses; the V clause fails.

## Validity

| Field | Value |
|-------|--------|
| Job | `/home/azureuser/agent_evals/wave19/jobs/wave19-pi-canary-freezepath-slack` |
| Job id | `f03016a2-ee5c-49fa-9246-107565432825` |
| Wall | 2026-08-22T08:00:33 → 08:27:16 (26m 43s) |
| n_completed / n_errored / n_retries | **12 / 0 / 0** |
| n_in / n_cache / n_out | 21,977,949 / 19,989,504 / 350,093 (all > 0) |
| has_401 | **False** (`invalid_api_key` / `AuthenticationError` / `api.openai.com` / `platform.openai.com` / `OpenAI API error` absent from `job.log` + trial logs; `job.log` Traceback = 0; crude `\b401\b` = 0) |
| cost_usd (job) | 30.439767 |
| C_all = cost/12 | $2.536647 |
| `--skills` | **not passed**; every trial `result.json` `config.agent.skills: []` |
| Mount | bind `/home/azureuser/agent_evals/wave19/pi-agent-home` → `/root/.pi/agent` (job + all 12 trial configs) |
| delete | `false` (`--no-delete`) |
| Agent / model | Harbor Pi, `-m openai/deepseek/deepseek-v4-flash-0731`, `thinking=high` |
| Image | `harbor.local/task-main:dfc6f4d357d9` |
| Harbor | 0.21.0 |
| Tasks | task-n-2, task-a-1, task-a-33, task-a-2 (canary only; **holdout not run**) |

`--print-config` (exit 0, workdir `/home/azureuser/agent_evals/ITSMBench`) resolved:

- `job_name`: `wave19-pi-canary-freezepath-slack`
- `n_attempts`: 3
- `agents[0].model_name`: `openai/deepseek/deepseek-v4-flash-0731`
- `agents[0].kwargs.thinking`: `high`
- `environment.delete`: `false`
- `environment.mounts[0].source`: `/home/azureuser/agent_evals/wave19/pi-agent-home`
- `datasets[0].task_names`: `task-n-2`, `task-a-1`, `task-a-33`, `task-a-2`
- skills empty (flag not passed)

This is **not** a 401 / 0-token quarantine case. 12/12 completed.

## What changed (YAML frozen)

Isolated home `/home/azureuser/agent_evals/wave19/pi-agent-home` copied **only**
`auth.json`, `models-store.json`, `models.json` from wave-14. Name stays
`freeze-path`. YAML frontmatter is byte-identical to champion. **Only** required-action
item 6 was replaced with the plan.md confirmation rule (match email; deactivate via
discovered admin deactivate/setInactive; re-fetch user-info; do not treat list-absence
as success). No must-execute section. No endpoint/malware text. No hard-coded Slack
host, user id, or test name.

| Artifact | Wave-14 champion | Wave-19 challenger |
|----------|------------------|--------------------|
| freeze-path SKILL.md | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` (2918 B) | `7efa43bd2ef17176ed46787f2287bd397f6bc8354248eb399e282f8c12e89434` (3137 B) |
| YAML-block (`---`…`---` inclusive) | `0baf1cc537504acc20718348856adcc2842be891d1a56ae218b62b4a08d69b28` | **same (byte-identical)** |
| auth.json / models-store.json | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` | same |
| models.json | `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` | same |
| name | freeze-path | freeze-path |
| extra files | none | none (one skill only) |

Wave0–wave18 `pi-agent-home` files: **0 snapshot mismatches** vs pre-run fingerprint.
Wave-14 skill sha **still** `2f2b976f…` after the job. `wave14/holdout/*` not executed.

## Official per-attempt table

Parsed only from official Harbor artifacts (`verifier/reward.txt`, `verifier/ctrf.json`
`results.tests[]`, trial `result.json`, job `result.json`). Nothing invented.

| Task | Trial | Reward | V (CTRF) | Passed/tests | Tokens in/out | Cost USD | Body loaded | Slack |
|---|---|---|---|---|---|---|---|---|
| task-a-1 | `task-a-1__5KsuxZS` | **1** | 1.0000 | 20/20 | 1,251,447 / 19,900 | 1.589595 | yes (`Record-backed freeze`×8, `Complementary chat`×35, `admin.users.setInactive`×86, `users.info`×116) | **pass** |
| task-a-1 | `task-a-1__5okBRHZ` | 0 | 0.4500 | 9/20 | 802,442 / 16,761 | 1.266400 | yes (`Record-backed freeze`×5, `Complementary chat`×44, `setInactive`×189, `users.info`×165) | **pass** |
| task-a-1 | `task-a-1__pSdDdLW` | 0 | 0.0500 | 1/20 | 571,799 / 13,521 | 0.905329 | **no** (body markers 0; `freeze-path` catalog-only ×42) | fail |
| task-a-2 | `task-a-2__2eExdiS` | 0 | 0.4500 | 9/20 | 1,347,655 / 19,550 | 2.137319 | no | — |
| task-a-2 | `task-a-2__3MDoYVF` | 0 | 0.5000 | 10/20 | 546,446 / 12,329 | 0.892564 | no | — |
| task-a-2 | `task-a-2__3Tba3DD` | 0 | 0.3000 | 6/20 | 768,943 / 16,058 | 1.097399 | no | — |
| task-a-33 | `task-a-33__KiEeDc8` | **1** | 1.0000 | 34/34 | 2,410,640 / 29,944 | 2.959072 | no | — |
| task-a-33 | `task-a-33__QLnJefj` | 0 | 0.9412 | 32/34 | 2,909,433 / 29,304 | 2.912109 | no (`freeze-path`×0) | — |
| task-a-33 | `task-a-33__SeReWWm` | 0 | 0.4706 | 16/34 | 1,652,470 / 20,780 | 1.758326 | no | — |
| task-n-2 | `task-n-2__Z43kSvc` | **1** | 1.0000 | 21/21 | 2,726,016 / 46,329 | 4.469934 | no | — |
| task-n-2 | `task-n-2__pvEZHmY` | **1** | 1.0000 | 21/21 | 3,230,207 / 66,924 | 5.059363 | no | — |
| task-n-2 | `task-n-2__tfKhjJJ` | 0 | 0.6667 | 14/21 | 3,760,451 / 58,693 | 5.392357 | no | — |

Job `result.json` `reward_stats`: `1.0` = `{task-a-1__5KsuxZS, task-a-33__KiEeDc8, task-n-2__Z43kSvc, task-n-2__pvEZHmY}`; `0.0` = the other eight. Mean reward 0.333. Harbor UI Pass@2 = 0.583.

Notable fail modes (CTRF failed names):

- a-1 `5KsuxZS`: 20/20 close; Slack **and** full GW freeze executed (`setInactive` + `users.info` present).
- a-1 `5okBRHZ`: Slack **passed** at 9/20. Passed: GW suspend / OU / password / Slack / SN hold+route+escalation / Okta suspend+MFA. Failed: all 11 `test_gw_token_revoked_*` (Zoom/Dropbox/Asana/slack-connector/Calendly/DocuSign/Grammarly/Trello/Zapier/Loom/Notion). Body loaded; complementary-chat confirmation fired; token revoke did not.
- a-1 `pSdDdLW`: 1/20 catalog-only (`test_okta_mfa_factors_preserved` only). Body never loaded — action-6 cannot fire.
- a-2 all three: still no close. Exact-hash RCA 0/3 (champ ALWAYS_FAIL 0/6). Majority-fail RCA/close/reclassify/audit cluster 0/3.
- a-33 `QLnJefj`: leftover owners only (`test_helios_site_retains_active_owner`, `test_eng_site_retains_active_owner`) — 32/34, not an ALWAYS_PASS break (those two are champ 4/6 OCCASIONAL).
- a-33 `SeReWWm`: 16/34 never-started leftover-identity (deploy keys / Elena app-reg / Viktor SP / owners / share removals). Same coin-flip cluster as champ 4/6, not ALWAYS_PASS.
- n-2 `tfKhjJJ`: 14/21 SG/NACL/DNS/drain leftovers. The two 21/21 closes are clean.

## Slack lever vs champion pool (w14+w18 = 6)

| Test | Champ pool | Wave-19 | Δ | Gate |
|---|---|---|---|---|
| `test_slack_account_deactivated` | **2/6** (MAJORITY_FAIL) | **2/3** | **+0.333** | meets ≥+0.30 / ≥2/3 |

On the two body-loaded a-1 trials Slack was **2/2**. The miss is the catalog-only trial
(`pSdDdLW`) where the body was never read. That is the same load-or-not coin-flip as
prior waves, not a confirmation-rule miss.

## ALWAYS_PASS breaks (champ pool 6/6 → wave-19 0/3)

Champion ALWAYS_PASS counts (w14+w18): a-1 **0**, a-2 **7**, a-33 **16**, n-2 **14**.

| Check | Result |
|---|---|
| a-33 ALWAYS_PASS → 0/3 | **none** |
| n-2 ALWAYS_PASS → 0/3 | **none** |
| a-2 ALWAYS_PASS → 0/3 | **none** (three a-2 ALWAYS_PASS tests dropped to 2/3, not 0/3: `test_crowdstrike_malware_hash_blocked`, `test_intune_device_not_wiped_or_retired`, `test_malware_ioc_escalated_in_place`) |

**No ALWAYS_PASS 0/3 kill.** a-33 leftover-identity and n-2 DNS/drain misses are on tests
that are OCCASIONAL on the champion pool (4–5/6 or 3/6), not 6/6.

## Mean V vs champ pool 0.731

| wave | a-1 V | a-2 V | a-33 V | n-2 V | overall V | closes | Pass@3 tasks (info) |
|---|---|---|---|---|---|---|---|
| w14 champion | 0.667 | 0.500 | 0.824 | 0.984 | 0.744 | 6/12 | a-1, a-33, n-2 |
| w18 champ rerun | 0.333 | 0.783 | 0.931 | 0.825 | 0.718 | 2/12 | a-33 |
| **champ pool** | **0.500** | **0.642** | **0.877** | **0.905** | **0.731** | 8/24 | — |
| **w19 Slack tweak** | **0.500** | **0.417** | **0.804** | **0.889** | **0.652** | 4/12 | n-2 |

Overall V = (1.000 + 0.450 + 0.050 + 0.450 + 0.500 + 0.300 + 1.000 + 0.9412 + 0.4706 + 1.000 + 1.000 + 0.6667) / 12 = **0.6524**.

Drop vs 0.731 = **0.0786 > 0.05**. Threshold for KEEP is V ≥ 0.681. **0.652 < 0.681.**

V drop is **not** an a-33/n-2 policy shift (those held near pool: 0.804 / 0.889 vs 0.877 / 0.905).
It is a-2 collapsing to 0.417 vs pool 0.642 (and vs w14 0.500 / w18 0.783) plus one
catalog-only a-1 1/20. a-1 mean V **held** at the pool value 0.500.

## Pass@1 / Pass@3 (informational only)

| Metric | Wave-19 | Champ pool / w14 | Do not use as gate |
|---|---|---|---|
| Pass@1 | 4/12 = **0.333** | pool 8/24 = 0.333; w14 6/12 = 0.500 | same as pool; w14 was the lucky draw |
| Pass@3 | **0.25** (n-2 only: 2/3) | w14 0.75; w18 0.25 | a-1 1/3 and a-33 1/3 are **not** a paired-gate kill |
| a-1 Pass@3 | 1/3 | w14 2/3; w18 0/3 | noise |
| a-2 Pass@3 | 0/3 | 0/6 pool | unchanged; not this lever |
| a-33 Pass@3 | 1/3 | w14 2/3; w18 2/3 | do not discard on this alone |
| n-2 Pass@3 | **2/3** | w14 2/3; w18 0/3 | held |

Do not promote on the 20/20 Slack close. Do not discard solely because a-1 or a-33
Pass@3 is 1/3.

## Paired-gate call

From `plans/plan.md` / wave-18 §6:

1. Do not kill on binary Pass@3 of a-1 / a-33 / n-2 at k=3.
2. Kill if a champ ALWAYS_PASS test (6/6) falls to 0/3.
3. Kill if mean V drops >0.05 vs champ pool (0.731) without a matching per-test
   improvement of ≥+0.30 on a MAJORITY/ALWAYS fail.
4. Credit a real lever only if a MAJORITY_FAIL or ALWAYS_FAIL test rises by ≥+0.30
   **and** no ALWAYS_PASS is broken.

KEEP / credit Slack lever only if **all** of:

| Clause | Wave-19 | Met? |
|---|---|---|
| Slack ≥2/3 (Δ ≥ +0.30 vs 2/6) | **2/3**, Δ = +0.333 | **YES** |
| No champ ALWAYS_PASS → 0/3 | 0 breaks | **YES** |
| Mean V does not drop >0.05 vs 0.731 (V ≥ 0.681) | **0.652 < 0.681** (drop 0.079) | **NO** |

**DISCARD.** Slack confirmation is a directional hit on the targeted leftover (2/2
when the body loaded) but the canary does not clear the V floor. a-2 V 0.417 vs
pool 0.642 is the bulk of the hole; this file is not an a-2 path and must not be
edited to chase it.

Other MAJORITY/ALWAYS_FAIL deltas ≥0.30 (all a-2, all worse):
`test_asset_audited`, `test_incident_reclassified_security`,
`test_problem_product_area_endpoint_security`,
`test_problem_short_description_names_malware` each 0/3 vs champ 2/6 (Δ = −0.333).
Exact-hash RCA stayed 0/3 vs 0/6.

## Isolation (post-job fingerprints)

| Artifact | After job |
|---|---|
| wave14 `skills/freeze-path/SKILL.md` | still `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` |
| wave14 YAML-block | still `0baf1cc537504acc20718348856adcc2842be891d1a56ae218b62b4a08d69b28` |
| wave19 YAML-block | `0baf1cc537504acc20718348856adcc2842be891d1a56ae218b62b4a08d69b28` |
| wave19 skill | `7efa43bd2ef17176ed46787f2287bd397f6bc8354248eb399e282f8c12e89434` |
| wave17 freeze-path | still `efe463b5b18f2f92b205e86d9962408b99c25d0da3d1059fb084b604e356fef9` |
| wave15 freeze-path | still `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` |
| wave0–18 home snapshot | **0 mismatches** |
| wave14/holdout | not run |
| trial `config.agent.skills` | `[]` on all 12 |
| mount source | wave19 only |

No secrets printed. No `rm` of absolute paths outside `/tmp`. `--skills` was not
passed. Holdout was not run.

## Decision

**DISCARD. Champion stays wave-14 freeze-path-v2.**

The action-6 confirmation rule did what it was supposed to on body-loaded a-1
trials (Slack 2/2; one 20/20 close that actually POSTed `admin.users.setInactive`
and re-fetched `users.info`). That is **not** enough to KEEP: mean V 0.652 vs
pool 0.731 fails the paired gate. Do not restack this home. Do not edit
freeze-path to recover a-2 / a-33 / n-2. a-2 remains parked.

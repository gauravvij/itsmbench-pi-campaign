# Wave-17 lever report — freeze-path-v2b (E1)

**Decision: DISCARD**

Champion remains **wave-14 freeze-path-v2**. Do not restack this home. Do not restack wave-15/16.

## Validity

| Field | Value |
|-------|--------|
| Job | `/home/azureuser/agent_evals/wave17/jobs/wave17-pi-canary-freezepathv2b` |
| Job id | `a92bf56c-68c2-4b0f-816c-57f177dcebd4` |
| Wall | 2026-08-21T08:35:00 → 09:04:07 (29m7s) |
| n_completed / n_errored / n_retries | 12 / 0 / 0 |
| n_in / n_out | 19025826 / 292198 |
| has_401 | False (tokens>0) |
| cost_usd (job) | 27.970206 |
| C_all = cost/12 | $2.330851 |
| `--skills` | empty (not passed) |
| Isolation | wave-14 skill sha still `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`; JSON shas unchanged; YAML-block sha `0baf1cc537504acc20718348856adcc2842be891d1a56ae218b62b4a08d69b28` on both homes |

## Headline vs champion

| Metric | Wave-17 v2b | Wave-14 champion | Gate |
|--------|-------------|------------------|------|
| Pass@1 | **0.0833 (1/12)** | 0.50 (6/12) | FAIL (<0.50) |
| Pass@3 | **0.25 (a-1 only)** | 0.75 (a-1, a-33, n-2) | FAIL (<0.75) |
| mean V | **0.6321** | 0.7436 | FAIL (not ≥0.7936; not held-V) |
| C_all | $2.330851 (−23%) | $3.017192 | cheaper, but V not held |
| a-1 Pass@3 | 1/3 | 2/3 | lost Pass@3 |
| a-1 20/20 count | 1 | 2 | did not rise (E1 kill) |
| a-33 Pass@3 | **0/3** | 2/3 | **KILL** |
| n-2 Pass@3 | **0/3** | 2/3 | **KILL** |
| a-2 Pass@3 | 0/3 | 0/3 | not this lever |

## Per-attempt (official reward.txt + ctrf.json tests[])

| Trial | R | CTRF | V | Body loaded | Notes |
|-------|---|------|---|-------------|-------|
| task-a-1__3LTS4NR | 1 | 20/20 | 1.000 | yes (bodyF=5, Must-execute=5) | freeze executed (pwd 500, Directory freeze 23) |
| task-a-1__kGWZ5VG | 0 | 0/20 | 0.000 | **catalog-only** (bodyF=0) | freeze-path×255, LIT-×30, no freeze actions |
| task-a-1__rJLrovf | 0 | 19/20 | 0.950 | yes (bodyF=5) | leftover `test_slack_account_deactivated` |
| task-a-2__CoxiCUY | 0 | 18/20 | 0.900 | no | incident close + problem malware RCA |
| task-a-2__Fq7oFLU | 0 | 2/20 | 0.100 | no | collapsed containment/Intune/close |
| task-a-2__KEhNjjQ | 0 | 18/20 | 0.900 | no | problem malware + exact hash |
| task-a-33__25DYqwW | 0 | 27/34 | 0.794 | **no** | leftover-identity (deploy keys, Elena app-reg, Viktor SP, owners) |
| task-a-33__4qvWLyP | 0 | 16/34 | 0.471 | **no** (freeze-path×0) | never-started offboarding |
| task-a-33__Hw7b3Kp | 0 | 16/34 | 0.471 | **no** (freeze-path×0) | never-started offboarding |
| task-n-2__cWR99wD | 0 | 14/21 | 0.667 | **no** (freeze-path×0) | NACL + DNS + drain |
| task-n-2__mRxzKzt | 0 | 9/21 | 0.429 | **no** (freeze-path×0) | NACL/SG/DNS |
| task-n-2__pZfmPyJ | 0 | 19/21 | 0.905 | **no** (freeze-path×0) | NACL edge + api-02 undrained |

Mean V = (1+0+0.95 + 0.9+0.1+0.9 + 0.7941+0.4706+0.4706 + 0.6667+0.4286+0.9048) / 12 = **0.6321**.

## Isolation fingerprints

| File | Wave-14 | Wave-17 |
|------|---------|---------|
| auth.json / models-store.json | `44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a` | same |
| models.json | `1c2290d5acf7bd62144b9b25ab264c60dd743ea0d10ad93a359a9c91998ee4b8` | same |
| freeze-path YAML-block (`---`…`---`) | `0baf1cc537504acc20718348856adcc2842be891d1a56ae218b62b4a08d69b28` | **same (byte-identical)** |
| freeze-path SKILL.md | `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556` | `efe463b5b18f2f92b205e86d9962408b99c25d0da3d1059fb084b604e356fef9` (body-only) |
| name | freeze-path | freeze-path |
| extra files | none | none (one skill only) |

Wave0–wave16 homes and `wave14/holdout/*` were not mutated.

## What E1 tested

Load-bearing assumption: **holding YAML+name frozen and only tightening the body (“must execute after fetched hold”) raises a-1 20/20 count without shifting a-33/n-2.**

Falsified [measured]:

1. a-1 20/20 count **fell** 2 → 1. The remaining miss `kGWZ5VG` is catalog-only (body never loaded) — v2b cannot fire if the body is never read. The 19/20 Slack leftover still happens with body loaded.
2. a-33 and n-2 Pass@3 both **0/3**, and **none of those six trials loaded the body** (`Record-backed freeze` = 0, `Must-execute` = 0). Two a-33 trials never even mention `freeze-path`.
3. Therefore this is **not** H1 catalog-tax (YAML identical) and **not** H2 name-as-negative-prior (name identical). Remaining hypotheses: **H3 unread-body tax** (longer unread file still taxes a-33/n-2) vs **H4 k=3 noise** (wave-14 2/3 holds were a lucky draw).

## Gates applied

- Valid 12/12, tokens>0, 0 errored: pass.
- Isolation: pass.
- Pass@1 ≥ 0.50: **fail**.
- Pass@3 ≥ 0.75: **fail**.
- V ≥ 0.7936 or held-V + ≥15% cheaper: V dropped; cost −23% does not save it.
- a-33/n-2 must hold ≥2/3: **fail (E1 kill)**.
- a-1 20/20 count must rise: **fail**.

**DISCARD. Champion = wave-14.** Next measurement is E3 (champion k=3 rerun, unmodified home) to discriminate H3 vs H4. Do not run E2. Do not add a second skill.

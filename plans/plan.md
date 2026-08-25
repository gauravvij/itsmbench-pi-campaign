# Wave-25 — Pro model swap on empty-catalog empty-APPEND home (explore arm 2)

## Goal
Run the next explore arm of the generalization-constrained auto-research campaign: **swap Flash → DeepSeek V4 Pro 0813 on a wave-0-shaped home** (JSON trio only; no `skills/`; no `APPEND_SYSTEM.md`; no `SYSTEM.md`). Measure whether a-1 search-breadth is model-bound (H2) once overlay wording is removed.

## Research Summary

Verified 2026-08-24 before this plan:

- OpenRouter catalog lists `deepseek/deepseek-v4-pro-0813` (GA, 1,048,576 context). Live `/api/v1/models` pricing: prompt **$1.122/M**, completion **$3.366/M**, `input_cache_read` **$0.0374/M**. Sibling alias `deepseek/deepseek-v4-pro` is the older 0423 card ($0.522 / $1.044 / $0.0435 per 1M) — **do not use the alias**.
- Preflight `POST /api/v1/chat/completions` with `deepseek/deepseek-v4-pro-0813`, `max_tokens=16`, same `sk-or-` key as ITSMBench `.env`: **HTTP 200**, `finish=stop`, reply `pong`. Model exists on this account.
- Pi routes OpenRouter models as `openai/<openrouter-slug>`. Wave-23/24 used `openai/deepseek/deepseek-v4-flash-0731`. This arm uses **`openai/deepseek/deepseek-v4-pro-0813`**.
- Wave-24 official job `86b5d956` (Flash + short general APPEND, empty catalog): a-1 breadth **1/3**, apply **0/3**, a-2 exact-hash **0/3**. H1 dead. H3 fired. Campaign next-arm rule (already written, not a menu): model swap on empty-catalog empty-APPEND home.
- Wave-0 home shape (measured): `auth.json` + `models.json` + `models-store.json` only. No APPEND, no skills. That is the mount shape for this arm. Wave-0's *model* was not Flash; do not treat wave-0 scores as a Flash empty-home k=3 baseline.
- Disk: `/dev/root` 123G, 115G used, **8.2G avail / 94%**. `--no-delete` mandatory. One Harbor job only. Never `rm` absolute paths outside `/tmp`.
- WAVE25_ABSENT. Harbor 0.21.0. Champion freeze-path on wave14 still `2f2b976f…`. Wave-23 APPEND still `6e0c1395…`. Wave-24 APPEND still `621f00ac…`.

Rejected alternatives (already killed or parked by campaign.md):

- Another investigate-before-mutate / freeze-essay APPEND — H1 dead at k=3 on Flash; wave-23 killed task-shaped overlay text.
- Restack this overlay onto Pro — H3 tax on a-2 exact-hash; campaign forbids restacking the dead overlay.
- Restack a catalog skill — unread catalog is poison (−6.9/20); wave-15 two-skill tax.
- Promote wave-21 / wave-24 — neither beat the mechanism gate.
- Holdout — not until a challenger beats wave-14 on the mechanism gate.

Cheapest refute of the load-bearing assumption *is this canary*. Search-breadth cannot be probed without the Harbor task image + ServiceNow mock; a 16-token OpenRouter ping only proves the slug is callable.

## Approach

**Load-bearing assumption:** Flash was the bound. An empty-home Pro agent will enumerate schema / adjacent objects on a-1 (breadth ≥ 2/3) without any overlay.

Hypotheses this arm discriminates:

| Id | Claim |
|---|---|
| **H2** | Under-search is model-family-bound: Pro still stops at `incident` + `sys_user` (breadth ≤ 1/3). |
| **H2-rejected** | Flash was the bound: Pro unaided hits breadth ≥ 2/3 **and** apply ≥ 2/3. New baseline is empty-home Pro. |
| **H3-swap** | The model swap itself taxes already-solved tasks: a-2 exact-hash 0/3 **or** n-2 close 0/3 **or** a-33 leftover ALWAYS_PASS wipe. |

This wave does **not** KEEP/DISCARD on the 0.05 mean-V clause. Champion remains wave-14.

**Generalization constraint (hard):** Do not write APPEND. Do not create `skills/`. Do not name canary tickets, users, tables, OUs, products, hashes, deploy keys, or task ids anywhere in the home. The only delta vs a wave-0-shaped Flash home is the Harbor `-m` slug.

## Subtasks

1. Create isolated `/home/azureuser/agent_evals/wave25/pi-agent-home` containing **only** the JSON trio copied from `/home/azureuser/agent_evals/wave14/pi-agent-home` (`auth.json`, `models.json`, `models-store.json`). **Do not copy `skills/`.** **Do not write `APPEND_SYSTEM.md`.** **Do not write `SYSTEM.md`.** Do not copy wave-23 or wave-24 APPEND. Do not mutate wave0–wave24 homes or `wave14/holdout`. Verify: `test -d …/wave25/pi-agent-home/skills` is false; `test -f …/wave25/pi-agent-home/APPEND_SYSTEM.md` is false; `test -f …/SYSTEM.md` is false; SHA-256 of the three JSON files match wave14 (`44136fa3…` / `1c2290d5…` / `44136fa3…`).

2. From cwd `/home/azureuser/agent_evals/ITSMBench`, run `harbor run --print-config` then launch the official k=3 4-task canary. Do **not** pass `--skills`. `--no-delete` mandatory. Absolute `-p`. Exact command:
   ```
   harbor run -a pi -m openai/deepseek/deepseek-v4-pro-0813 \
     --agent-kwarg thinking=high -e docker --no-delete -n 4 -k 3 \
     --env-file /home/azureuser/agent_evals/ITSMBench/.env \
     --jobs-dir /home/azureuser/agent_evals/wave25/jobs \
     --job-name wave25-pi-canary-pro-empty-home \
     --mounts '[{"type":"bind","source":"/home/azureuser/agent_evals/wave25/pi-agent-home","target":"/root/.pi/agent"}]' \
     -p /home/azureuser/agent_evals/ITSMBench/tasks \
     -i task-n-2 -i task-a-1 -i task-a-33 -i task-a-2
   ```
   Validate the first completed trial (tokens>0, no real 401: `invalid_api_key` / `api.openai.com` / `OpenAI API error` / `AuthenticationError` absent). Then wait for 12/12. If first launch fails `FileNotFoundError: tasks` and creates no job, relaunch from ITSMBench with absolute `-p`. If a trial errors, diagnose from that job dir only — do not wipe the job. Do not write APPEND after launch. Never print secrets. Never `rm` absolute paths outside `/tmp`.

3. After 12/12 completed, 0 errored: write `/home/azureuser/agent_evals/wave25/lever25_report.md` and `/home/azureuser/agent_evals/wave25/campaign.md`. Report MUST include:
   - empty-home proof: no `skills/`, no `APPEND_SYSTEM.md`, no `SYSTEM.md`; Harbor `config.agent.skills: []`; `Available Skills` / `SKILL.md` / `freeze-path` / `Record-backed` = 0 on all 12 `pi.txt`
   - validity gate (12/12, tokens>0, has_401=False, mount wave25, model slug `openai/deepseek/deepseek-v4-pro-0813`)
   - per-attempt table for all 12 trials
   - **PRIMARY mechanism:** a-1 search-breadth ≥2/3, where a trial is broad iff `sys_db_object` appears in `pi.txt` **or** distinct `/api/now/table/*` classes ≥ 5. Also a-1 apply = V ≥ 0.95 on ≥2/3.
   - Guardrails (not KEEP/DISCARD): a-2 exact-hash pass count; a-33 leftover-identity; n-2 undrain / DNS leftover. Flag ALWAYS_PASS 6/6 → 0/3 as swap tax (H3-swap).
   - mean V with 95% CI; **do not KEEP/DISCARD on the 0.05 clause**
   - Harbor $ vs OpenRouter-list $ using the **live** 0813 card from `/api/v1/models`: $1.122 / $0.0374 / $3.366 per 1M (uncached / cache-read / output). Harbor is still Pi GPT-4-class fallback.
   - integrity SHAs (wave14 freeze-path still `2f2b976f…`, wave23 APPEND still `6e0c1395…`, wave24 APPEND still `621f00ac…`, wave25 has no APPEND)
   - explicit H2 / H2-rejected / H3-swap call from the kill criteria below
   Champion remains wave-14. Do not write APPEND after the canary. Do not relaunch Harbor after artifacts exist. Do not mutate wave0–wave24.

## Kill criteria → next arm

- a-1 search-breadth still ≤ 1/3 on Pro → **H2 confirmed** for this family. Stop overlay research on this canary. Campaign parks. Do not write another sentence. Do not restack a skill.
- Breadth ≥ 2/3 **and** apply ≥ 2/3 **and** no leftover wipe → **H2 rejected.** Flash was the bound. New baseline is empty-home Pro. Then (and only then) one general skill may be considered — not this job.
- a-2 exact-hash 0/3 **or** n-2 close 0/3 **or** a-33 leftover ALWAYS_PASS wipe → **H3-swap.** Model swap itself is taxed. Do not restack an overlay on top.
- Breadth ≥ 2/3 but apply ≤ 1/3 → lookup moved, act-on-constraint did not. Report that split. Do **not** write a task-shaped procedure overlay (wave-23/24 already killed wording). Next arm, if any, is parked for a later lock — do not auto-invent a skill this wave.

## Deliverables

| File Path | Description |
|-----------|-------------|
| `/home/azureuser/agent_evals/wave25/pi-agent-home/` | Isolated home: JSON trio only, no skills/, no APPEND |
| `/home/azureuser/agent_evals/wave25/jobs/wave25-pi-canary-pro-empty-home/` | Official Harbor job, 12 trials |
| `/home/azureuser/agent_evals/wave25/lever25_report.md` | Mechanism report |
| `/home/azureuser/agent_evals/wave25/campaign.md` | Auto-research state + next-arm rule |

## Evaluation Criteria

- 12/12 completed, 0 errored, tokens>0, has_401=False, Harbor skills=[]
- `skills/` absent; `APPEND_SYSTEM.md` absent; `SYSTEM.md` absent
- Harbor `-m` is `openai/deepseek/deepseek-v4-pro-0813` (not the 0423 alias, not Flash)
- Report states H2 or H2-rejected or H3-swap from measured breadth+apply+guardrails
- mean V reported with 95% CI and **no** KEEP/DISCARD on 0.05
- Champion pointer stays wave-14
- wave0–wave24 homes and jobs unmodified

## Notes

- Disk 8.2G avail / 94% — `--no-delete` mandatory. One Harbor job only.
- Harbor `stats.cost_usd` is Pi unknown-model fallback, not the OpenRouter bill. Pro 0813 OR-list will be ~10–20× Flash (~$0.36 → rough [guess] ~$4–8 if token counts similar). Report both invoices from official token counts.
- Never print secrets. Never `rm` absolute paths outside `/tmp`.
- Do not run holdout. Do not pass `--skills`.
- Do not rewrite wave-23 APPEND or relaunch `87378be4`.
- Do not rewrite wave-24 APPEND or relaunch `86b5d956`.
- Do not copy wave-24 APPEND onto this home.
- Crude `\b401\b` in `pi.txt` is not real auth (ServiceNow / tool JSON false positive).

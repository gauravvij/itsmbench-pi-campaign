# Wave-18 per-test noise floor (pooled w14+w18) and re-score of waves 12–17

**Source:** official `verifier/ctrf.json` + `reward.txt` only. No new Harbor run.
**Champion pool:** wave-14 original + wave-18 unmodified rerun (same home, model, harness) = 6 attempts/task.
**Not a promote.** Champion remains wave-14 freeze-path-v2 sha `2f2b976f…`.

## 1. Champion pooled close rates (binary Pass@1)

| Task | Closes | p̂ | Wilson 95% CI | mean V | P(Pass@3 hold ≥2/3) | P(kill <2/3) |
|---|---|---|---|---|---|---|
| task-a-1 | 2/6 | 0.333 | [0.097, 0.700] | 0.5000 | 0.259 | 0.741 |
| task-a-2 | 0/6 | 0.000 | [0.000, 0.390] | 0.6417 | 0.000 | 1.000 |
| task-a-33 | 4/6 | 0.667 | [0.300, 0.903] | 0.8775 | 0.741 | 0.259 |
| task-n-2 | 2/6 | 0.333 | [0.097, 0.700] | 0.9048 | 0.259 | 0.741 |

Pooled overall Pass@1 = 8/24 = 0.333 (w14 6/12 + w18 2/12).

**Implication [measured]:** at p̂≈0.33 the k=3 “must hold ≥2/3” gate on a-1 or n-2 fires as a **false kill ~74% of the time on the champion itself**. Most of waves 1–17 were discarded by that gate.

## 2. Champion per-test floor (6 attempts)

Tagging: ALWAYS_FAIL = 0/6; MAJORITY_FAIL = pass < 3/6; OCCASIONAL_FAIL = 3–5/6; ALWAYS_PASS = 6/6.

### task-a-1 — 20 tests; always_pass=0, always_fail=0, unstable=20

| k/6 | p̂ | Wilson 95% | tag | test |
|---|---|---|---|---|
| 2/6 | 0.333 | [0.10,0.70] | MAJORITY_FAIL | `test_slack_account_deactivated` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_account_suspended` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_credential_reset_forced` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_moved_into_legal_hold_ou` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_token_revoked_asana` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_token_revoked_calendly` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_token_revoked_docusign` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_token_revoked_dropbox` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_token_revoked_grammarly` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_token_revoked_loom` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_token_revoked_notion` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_token_revoked_slack_connector` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_token_revoked_trello` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_token_revoked_zapier` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_gw_token_revoked_zoom` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_okta_status_remains_suspended` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_sn_incident_escalation_reason_recorded` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_sn_incident_put_on_hold` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_sn_incident_routed_to_legal_hold_group` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_okta_mfa_factors_preserved` |

### task-a-2 — 20 tests; always_pass=7, always_fail=1, unstable=12

| k/6 | p̂ | Wilson 95% | tag | test |
|---|---|---|---|---|
| 0/6 | 0.000 | [0.00,0.39] | ALWAYS_FAIL | `test_problem_root_cause_names_exact_hash` |
| 1/6 | 0.167 | [0.03,0.56] | MAJORITY_FAIL | `test_problem_root_cause_names_malware` |
| 2/6 | 0.333 | [0.10,0.70] | MAJORITY_FAIL | `test_asset_audited` |
| 2/6 | 0.333 | [0.10,0.70] | MAJORITY_FAIL | `test_incident_reclassified_security` |
| 2/6 | 0.333 | [0.10,0.70] | MAJORITY_FAIL | `test_incident_state_closed` |
| 2/6 | 0.333 | [0.10,0.70] | MAJORITY_FAIL | `test_problem_product_area_endpoint_security` |
| 2/6 | 0.333 | [0.10,0.70] | MAJORITY_FAIL | `test_problem_short_description_names_malware` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_crowdstrike_containment_lifted` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_crowdstrike_detection_assigned_to_responder` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_incident_close_code_permanent` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_intune_defender_scan_ran` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_intune_device_resynced` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_intune_last_sync_advanced` |

### task-a-33 — 34 tests; always_pass=16, always_fail=0, unstable=18

| k/6 | p̂ | Wilson 95% | tag | test |
|---|---|---|---|---|
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_diego_github_deploy_key_removed` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_elena_app_registration_neutralized` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_eng_site_retains_active_owner` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_helios_site_retains_active_owner` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_onedrive_departed_share_grants_removed` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_theo_github_deploy_key_removed` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_viktor_service_principal_neutralized` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_diego_sharepoint_helios_removed` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_diego_sharepoint_research_removed` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_elena_sharepoint_portfolio_removed` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_priya_guest_sharepoint_comms_removed` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_priya_sharepoint_exec_removed` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_priya_sharepoint_finance_removed` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_priya_sharepoint_portfolio_removed` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_sana_guest_sharepoint_legal_removed` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_theo_sharepoint_design_removed` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_theo_sharepoint_ops_removed` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_viktor_sharepoint_eng_removed` |

### task-n-2 — 21 tests; always_pass=14, always_fail=0, unstable=7

| k/6 | p̂ | Wilson 95% | tag | test |
|---|---|---|---|---|
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_internal_api_02_undrained` |
| 3/6 | 0.500 | [0.19,0.81] | OCCASIONAL_FAIL | `test_legacy_dns_record_cleaned` |
| 4/6 | 0.667 | [0.30,0.90] | OCCASIONAL_FAIL | `test_shared_nacl_allows_payments_inbound` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_cache_sg_allows_payments` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_db_sg_allows_payments` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_dead_backend_server_removed` |
| 5/6 | 0.833 | [0.44,0.97] | OCCASIONAL_FAIL | `test_internal_api_sg_allows_payments` |

### Recurring leftovers that are real levers (ALWAYS_FAIL or MAJORITY_FAIL on champion)

| Task | k/6 | tag | test | Why it is a lever |
|---|---|---|---|---|
| a-1 | 2/6 | MAJORITY_FAIL | `test_slack_account_deactivated` | Only a-1 test below 3/6; 19/20 leftover on otherwise-complete freezes across waves |
| a-2 | 0/6 | ALWAYS_FAIL | `test_problem_root_cause_names_exact_hash` | Never written on freeze-path-v2 |
| a-2 | 1/6 | MAJORITY_FAIL | `test_problem_root_cause_names_malware` | RCA body missing |
| a-2 | 2/6 | MAJORITY_FAIL | `test_asset_audited` | |
| a-2 | 2/6 | MAJORITY_FAIL | `test_incident_reclassified_security` | |
| a-2 | 2/6 | MAJORITY_FAIL | `test_incident_state_closed` | |
| a-2 | 2/6 | MAJORITY_FAIL | `test_problem_product_area_endpoint_security` | |
| a-2 | 2/6 | MAJORITY_FAIL | `test_problem_short_description_names_malware` | |

a-33 has **no** majority-fail tests on the champion pool — leftover-identity (deploy keys / Elena app-reg / Viktor SP / owners) is 4/6, i.e. the same coin-flip as the close itself. n-2 leftovers are listed in the floor table; the ones that actually block 21/21 are checked in §4.

## 3. Mean V by task × wave (paired metric — more stable than Pass@3)

| wave | a-1 V | a-2 V | a-33 V | n-2 V | overall V | closes | Pass@3 tasks |
|---|---|---|---|---|---|---|---|
| w12-noskill | 0.050 | 0.467 | 0.824 | 0.937 | 0.569 | 3/12 | a-33 |
| w13-freezepath | 0.350 | 0.417 | 0.814 | 0.810 | 0.597 | 3/12 | none |
| w14-champion | 0.667 | 0.500 | 0.824 | 0.984 | 0.744 | 6/12 | a-1, a-33, n-2 |
| w15-endpointrca | 0.667 | 0.900 | 0.794 | 0.571 | 0.733 | 1/12 | none |
| w16-casepath | 0.367 | 0.800 | 0.843 | 0.889 | 0.725 | 1/12 | none |
| w17-v2b | 0.650 | 0.633 | 0.578 | 0.667 | 0.632 | 1/12 | none |
| w18-champ-rerun | 0.333 | 0.783 | 0.931 | 0.825 | 0.718 | 2/12 | a-33 |

Read: **mean V barely moved** across w14–w18 (0.74 / 0.73 / 0.72 / 0.63 / 0.72) while binary closes swung 6→1→1→2. Wave-17 is the only challenger whose **V** actually dropped (0.632 vs champ pool ~0.731), driven by a-1 catalog-miss 0/20 and n-2 9/21 collapse — not just Pass@3 noise.

## 4. Cross-wave per-test pass counts (failing tests only)

### a-1 (20 tests; freeze block is all-or-nothing except Slack)

| test | w12 | w13 | w14 | w15 | w16 | w17 | w18 | champ w14+w18 |
|---|---|---|---|---|---|---|---|---|
| `test_gw_account_suspended` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_credential_reset_forced` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_moved_into_legal_hold_ou` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_token_revoked_asana` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_token_revoked_calendly` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_token_revoked_docusign` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_token_revoked_dropbox` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_token_revoked_grammarly` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_token_revoked_loom` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_token_revoked_notion` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_token_revoked_slack_connector` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_token_revoked_trello` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_token_revoked_zapier` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_gw_token_revoked_zoom` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_okta_mfa_factors_preserved` | 3/3 | 2/3 | 2/3 | 3/3 | 3/3 | 2/3 | 2/3 | **4/6** |
| `test_okta_status_remains_suspended` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_slack_account_deactivated` | 0/3 | 1/3 | 2/3 | 1/3 | 1/3 | 1/3 | 0/3 | **2/6** |
| `test_sn_incident_escalation_reason_recorded` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_sn_incident_put_on_hold` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |
| `test_sn_incident_routed_to_legal_hold_group` | 0/3 | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **3/6** |

### a-2 (20 tests)

| test | w12 | w13 | w14 | w15 | w16 | w17 | w18 | champ w14+w18 |
|---|---|---|---|---|---|---|---|---|
| `test_asset_audited` | 0/3 | 0/3 | 0/3 | 3/3 | 3/3 | 2/3 | 2/3 | **2/6** |
| `test_crowdstrike_containment_lifted` | 3/3 | 2/3 | 1/3 | 3/3 | 3/3 | 2/3 | 3/3 | **4/6** |
| `test_crowdstrike_detection_assigned_to_responder` | 0/3 | 0/3 | 1/3 | 3/3 | 2/3 | 2/3 | 3/3 | **4/6** |
| `test_crowdstrike_detection_closed` | 3/3 | 2/3 | 3/3 | 0/3 | 3/3 | 3/3 | 3/3 | **6/6** |
| `test_crowdstrike_malware_hash_blocked` | 3/3 | 1/3 | 3/3 | 3/3 | 2/3 | 2/3 | 3/3 | **6/6** |
| `test_incident_close_code_permanent` | 2/3 | 2/3 | 3/3 | 3/3 | 3/3 | 2/3 | 1/3 | **4/6** |
| `test_incident_close_notes_name_malware` | 0/3 | 2/3 | 3/3 | 3/3 | 3/3 | 2/3 | 3/3 | **6/6** |
| `test_incident_inactive` | 2/3 | 2/3 | 3/3 | 3/3 | 3/3 | 2/3 | 3/3 | **6/6** |
| `test_incident_reclassified_security` | 0/3 | 1/3 | 0/3 | 3/3 | 3/3 | 2/3 | 2/3 | **2/6** |
| `test_incident_state_closed` | 1/3 | 0/3 | 1/3 | 1/3 | 2/3 | 1/3 | 1/3 | **2/6** |
| `test_intune_defender_scan_ran` | 2/3 | 1/3 | 1/3 | 3/3 | 3/3 | 2/3 | 3/3 | **4/6** |
| `test_intune_device_not_wiped_or_retired` | 2/3 | 3/3 | 3/3 | 3/3 | 3/3 | 2/3 | 3/3 | **6/6** |
| `test_intune_device_resynced` | 2/3 | 1/3 | 1/3 | 3/3 | 3/3 | 2/3 | 3/3 | **4/6** |
| `test_intune_last_sync_advanced` | 2/3 | 1/3 | 1/3 | 3/3 | 3/3 | 2/3 | 3/3 | **4/6** |
| `test_malware_ioc_escalated_in_place` | 3/3 | 1/3 | 3/3 | 3/3 | 2/3 | 2/3 | 3/3 | **6/6** |
| `test_problem_product_area_endpoint_security` | 0/3 | 1/3 | 0/3 | 3/3 | 1/3 | 2/3 | 2/3 | **2/6** |
| `test_problem_root_cause_names_exact_hash` | 0/3 | 0/3 | 0/3 | 3/3 | 1/3 | 1/3 | 0/3 | **0/6** |
| `test_problem_root_cause_names_malware` | 0/3 | 1/3 | 0/3 | 2/3 | 1/3 | 0/3 | 1/3 | **1/6** |
| `test_problem_short_description_names_malware` | 0/3 | 1/3 | 0/3 | 3/3 | 1/3 | 2/3 | 2/3 | **2/6** |

### a-33 (only tests that failed somewhere)

| test | w12 | w13 | w14 | w15 | w16 | w17 | w18 | champ w14+w18 |
|---|---|---|---|---|---|---|---|---|
| `test_diego_github_deploy_key_removed` | 2/3 | 2/3 | 2/3 | 0/3 | 0/3 | 0/3 | 2/3 | **4/6** |
| `test_diego_sharepoint_helios_removed` | 2/3 | 2/3 | 2/3 | 3/3 | 3/3 | 1/3 | 3/3 | **5/6** |
| `test_diego_sharepoint_research_removed` | 2/3 | 2/3 | 2/3 | 3/3 | 3/3 | 1/3 | 3/3 | **5/6** |
| `test_elena_app_registration_neutralized` | 2/3 | 2/3 | 2/3 | 0/3 | 2/3 | 0/3 | 2/3 | **4/6** |
| `test_elena_sharepoint_portfolio_removed` | 2/3 | 2/3 | 2/3 | 3/3 | 3/3 | 1/3 | 3/3 | **5/6** |
| `test_eng_site_retains_active_owner` | 2/3 | 2/3 | 2/3 | 0/3 | 0/3 | 0/3 | 2/3 | **4/6** |
| `test_helios_site_retains_active_owner` | 2/3 | 2/3 | 2/3 | 0/3 | 0/3 | 0/3 | 2/3 | **4/6** |
| `test_onedrive_departed_share_grants_removed` | 2/3 | 1/3 | 2/3 | 0/3 | 1/3 | 0/3 | 2/3 | **4/6** |
| `test_priya_guest_sharepoint_comms_removed` | 2/3 | 2/3 | 2/3 | 3/3 | 3/3 | 1/3 | 3/3 | **5/6** |
| `test_priya_sharepoint_exec_removed` | 2/3 | 2/3 | 2/3 | 3/3 | 3/3 | 1/3 | 3/3 | **5/6** |
| `test_priya_sharepoint_finance_removed` | 2/3 | 2/3 | 2/3 | 3/3 | 3/3 | 1/3 | 3/3 | **5/6** |
| `test_priya_sharepoint_portfolio_removed` | 2/3 | 2/3 | 2/3 | 3/3 | 3/3 | 1/3 | 3/3 | **5/6** |
| `test_sana_guest_sharepoint_legal_removed` | 2/3 | 2/3 | 2/3 | 3/3 | 3/3 | 1/3 | 3/3 | **5/6** |
| `test_theo_github_deploy_key_removed` | 2/3 | 2/3 | 2/3 | 0/3 | 0/3 | 0/3 | 2/3 | **4/6** |
| `test_theo_sharepoint_design_removed` | 2/3 | 2/3 | 2/3 | 3/3 | 3/3 | 1/3 | 3/3 | **5/6** |
| `test_theo_sharepoint_ops_removed` | 2/3 | 2/3 | 2/3 | 3/3 | 3/3 | 1/3 | 3/3 | **5/6** |
| `test_viktor_service_principal_neutralized` | 2/3 | 2/3 | 2/3 | 0/3 | 2/3 | 0/3 | 2/3 | **4/6** |
| `test_viktor_sharepoint_eng_removed` | 2/3 | 2/3 | 2/3 | 3/3 | 3/3 | 1/3 | 3/3 | **5/6** |

### n-2 (only tests that failed somewhere)

| test | w12 | w13 | w14 | w15 | w16 | w17 | w18 | champ w14+w18 |
|---|---|---|---|---|---|---|---|---|
| `test_cache_dns_points_live` | 3/3 | 2/3 | 3/3 | 2/3 | 3/3 | 2/3 | 3/3 | **6/6** |
| `test_cache_sg_allows_payments` | 3/3 | 2/3 | 3/3 | 2/3 | 3/3 | 2/3 | 2/3 | **5/6** |
| `test_db_dns_points_live` | 3/3 | 2/3 | 3/3 | 2/3 | 3/3 | 2/3 | 3/3 | **6/6** |
| `test_db_sg_allows_payments` | 3/3 | 2/3 | 3/3 | 2/3 | 3/3 | 2/3 | 2/3 | **5/6** |
| `test_dead_backend_server_removed` | 3/3 | 3/3 | 3/3 | 2/3 | 1/3 | 2/3 | 2/3 | **5/6** |
| `test_incident_closed` | 3/3 | 3/3 | 3/3 | 2/3 | 3/3 | 3/3 | 3/3 | **6/6** |
| `test_internal_api_02_undrained` | 2/3 | 1/3 | 3/3 | 0/3 | 1/3 | 0/3 | 0/3 | **3/6** |
| `test_internal_api_dns_points_live` | 3/3 | 2/3 | 3/3 | 2/3 | 3/3 | 2/3 | 3/3 | **6/6** |
| `test_internal_api_sg_allows_payments` | 3/3 | 2/3 | 3/3 | 2/3 | 3/3 | 2/3 | 2/3 | **5/6** |
| `test_legacy_dns_record_cleaned` | 1/3 | 2/3 | 3/3 | 2/3 | 0/3 | 1/3 | 0/3 | **3/6** |
| `test_payments_backend_02_undrained` | 3/3 | 3/3 | 3/3 | 1/3 | 3/3 | 3/3 | 3/3 | **6/6** |
| `test_payments_nacl_dependency_return_ingress` | 3/3 | 2/3 | 3/3 | 1/3 | 3/3 | 1/3 | 3/3 | **6/6** |
| `test_payments_nacl_edge_return_egress` | 3/3 | 2/3 | 3/3 | 1/3 | 3/3 | 0/3 | 3/3 | **6/6** |
| `test_payments_route_to_shared_not_blackholed` | 2/3 | 3/3 | 3/3 | 2/3 | 3/3 | 1/3 | 3/3 | **6/6** |
| `test_payments_sg_egress_cache` | 3/3 | 3/3 | 3/3 | 2/3 | 3/3 | 3/3 | 3/3 | **6/6** |
| `test_payments_sg_egress_db` | 3/3 | 3/3 | 3/3 | 2/3 | 3/3 | 3/3 | 3/3 | **6/6** |
| `test_payments_sg_egress_internal_api` | 3/3 | 3/3 | 3/3 | 2/3 | 3/3 | 3/3 | 3/3 | **6/6** |
| `test_payments_sg_ingress_443_from_lb` | 3/3 | 3/3 | 3/3 | 2/3 | 3/3 | 3/3 | 3/3 | **6/6** |
| `test_payments_sg_ingress_8081_from_lb` | 3/3 | 3/3 | 3/3 | 2/3 | 3/3 | 3/3 | 3/3 | **6/6** |
| `test_payments_sg_ingress_8404_from_lb` | 3/3 | 3/3 | 3/3 | 2/3 | 3/3 | 3/3 | 3/3 | **6/6** |
| `test_shared_nacl_allows_payments_inbound` | 3/3 | 2/3 | 2/3 | 1/3 | 3/3 | 1/3 | 2/3 | **4/6** |

## 5. Challenger vs champion per-test (delta ≥ 0.30, or broke a champ always-pass)

Champion baseline = pooled w14+w18 (6 attempts). Challenger n=3. A −0.50 means champ 6/6 or 5/6 → challenger 0/3 or 1/3. This is the **paired** metric that Pass@3 was trying (and failing) to approximate.

### w12-noskill

Regressions with Δ≥0.30 or broke always-pass (28 of 41 total regressions):

| Δ | task | wave | champ | test | note |
|---|---|---|---|---|---|
| −1.00 | task-a-2 | 0/3 | 6/6 | `test_incident_close_notes_name_malware` | BROKE_ALWAYS_PASS |
| −0.67 | task-a-2 | 0/3 | 4/6 | `test_crowdstrike_detection_assigned_to_responder` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_sn_incident_routed_to_legal_hold_group` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_sn_incident_put_on_hold` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_sn_incident_escalation_reason_recorded` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_okta_status_remains_suspended` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_token_revoked_zoom` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_token_revoked_zapier` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_token_revoked_trello` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_token_revoked_slack_connector` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_token_revoked_notion` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_token_revoked_loom` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_token_revoked_grammarly` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_token_revoked_dropbox` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_token_revoked_docusign` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_token_revoked_calendly` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_token_revoked_asana` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_moved_into_legal_hold_ou` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_credential_reset_forced` |  |
| −0.50 | task-a-1 | 0/3 | 3/6 | `test_gw_account_suspended` |  |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_payments_route_to_shared_not_blackholed` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_intune_device_not_wiped_or_retired` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_incident_inactive` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 0/3 | 2/6 | `test_problem_short_description_names_malware` |  |
| −0.33 | task-a-2 | 0/3 | 2/6 | `test_problem_product_area_endpoint_security` |  |
| −0.33 | task-a-2 | 0/3 | 2/6 | `test_incident_reclassified_security` |  |
| −0.33 | task-a-2 | 0/3 | 2/6 | `test_asset_audited` |  |
| −0.33 | task-a-1 | 0/3 | 2/6 | `test_slack_account_deactivated` |  |

Improvements with Δ≥0.30 (3 of 8):

| Δ | task | wave | champ | test |
|---|---|---|---|---|
| +0.33 | task-n-2 | 3/3 | 4/6 | `test_shared_nacl_allows_payments_inbound` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_crowdstrike_containment_lifted` |
| +0.33 | task-a-1 | 3/3 | 4/6 | `test_okta_mfa_factors_preserved` |

### w13-freezepath

Regressions with Δ≥0.30 or broke always-pass (17 of 50 total regressions):

| Δ | task | wave | champ | test | note |
|---|---|---|---|---|---|
| −0.67 | task-a-2 | 1/3 | 6/6 | `test_malware_ioc_escalated_in_place` | BROKE_ALWAYS_PASS |
| −0.67 | task-a-2 | 1/3 | 6/6 | `test_crowdstrike_malware_hash_blocked` | BROKE_ALWAYS_PASS |
| −0.67 | task-a-2 | 0/3 | 4/6 | `test_crowdstrike_detection_assigned_to_responder` |  |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_payments_nacl_edge_return_egress` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_payments_nacl_dependency_return_ingress` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_internal_api_dns_points_live` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_db_dns_points_live` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_cache_dns_points_live` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_incident_inactive` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_incident_close_notes_name_malware` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_crowdstrike_detection_closed` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-33 | 1/3 | 4/6 | `test_onedrive_departed_share_grants_removed` |  |
| −0.33 | task-a-2 | 1/3 | 4/6 | `test_intune_last_sync_advanced` |  |
| −0.33 | task-a-2 | 1/3 | 4/6 | `test_intune_device_resynced` |  |
| −0.33 | task-a-2 | 1/3 | 4/6 | `test_intune_defender_scan_ran` |  |
| −0.33 | task-a-2 | 0/3 | 2/6 | `test_incident_state_closed` |  |
| −0.33 | task-a-2 | 0/3 | 2/6 | `test_asset_audited` |  |

Improvements with Δ≥0.30 (0 of 3):

| Δ | task | wave | champ | test |
|---|---|---|---|---|
| — | — | — | — | none |

### w15-endpointrca

Regressions with Δ≥0.30 or broke always-pass (24 of 28 total regressions):

| Δ | task | wave | champ | test | note |
|---|---|---|---|---|---|
| −1.00 | task-a-2 | 0/3 | 6/6 | `test_crowdstrike_detection_closed` | BROKE_ALWAYS_PASS |
| −0.67 | task-n-2 | 1/3 | 6/6 | `test_payments_nacl_edge_return_egress` | BROKE_ALWAYS_PASS |
| −0.67 | task-n-2 | 1/3 | 6/6 | `test_payments_nacl_dependency_return_ingress` | BROKE_ALWAYS_PASS |
| −0.67 | task-n-2 | 1/3 | 6/6 | `test_payments_backend_02_undrained` | BROKE_ALWAYS_PASS |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_viktor_service_principal_neutralized` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_theo_github_deploy_key_removed` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_onedrive_departed_share_grants_removed` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_helios_site_retains_active_owner` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_eng_site_retains_active_owner` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_elena_app_registration_neutralized` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_diego_github_deploy_key_removed` |  |
| −0.50 | task-n-2 | 0/3 | 3/6 | `test_internal_api_02_undrained` |  |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_payments_sg_ingress_8404_from_lb` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_payments_sg_ingress_8081_from_lb` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_payments_sg_ingress_443_from_lb` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_payments_sg_egress_internal_api` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_payments_sg_egress_db` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_payments_sg_egress_cache` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_payments_route_to_shared_not_blackholed` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_internal_api_dns_points_live` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_incident_closed` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_db_dns_points_live` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_cache_dns_points_live` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 1/3 | 4/6 | `test_shared_nacl_allows_payments_inbound` |  |

Improvements with Δ≥0.30 (13 of 43):

| Δ | task | wave | champ | test |
|---|---|---|---|---|
| +1.00 | task-a-2 | 3/3 | 0/6 | `test_problem_root_cause_names_exact_hash` |
| +0.67 | task-a-2 | 3/3 | 2/6 | `test_problem_short_description_names_malware` |
| +0.67 | task-a-2 | 3/3 | 2/6 | `test_problem_product_area_endpoint_security` |
| +0.67 | task-a-2 | 3/3 | 2/6 | `test_incident_reclassified_security` |
| +0.67 | task-a-2 | 3/3 | 2/6 | `test_asset_audited` |
| +0.50 | task-a-2 | 2/3 | 1/6 | `test_problem_root_cause_names_malware` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_intune_last_sync_advanced` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_intune_device_resynced` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_intune_defender_scan_ran` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_incident_close_code_permanent` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_crowdstrike_detection_assigned_to_responder` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_crowdstrike_containment_lifted` |
| +0.33 | task-a-1 | 3/3 | 4/6 | `test_okta_mfa_factors_preserved` |

### w16-casepath

Regressions with Δ≥0.30 or broke always-pass (9 of 28 total regressions):

| Δ | task | wave | champ | test | note |
|---|---|---|---|---|---|
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_theo_github_deploy_key_removed` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_helios_site_retains_active_owner` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_eng_site_retains_active_owner` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_diego_github_deploy_key_removed` |  |
| −0.50 | task-n-2 | 0/3 | 3/6 | `test_legacy_dns_record_cleaned` |  |
| −0.50 | task-n-2 | 1/3 | 5/6 | `test_dead_backend_server_removed` |  |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_malware_ioc_escalated_in_place` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_crowdstrike_malware_hash_blocked` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-33 | 1/3 | 4/6 | `test_onedrive_departed_share_grants_removed` |  |

Improvements with Δ≥0.30 (11 of 26):

| Δ | task | wave | champ | test |
|---|---|---|---|---|
| +0.67 | task-a-2 | 3/3 | 2/6 | `test_incident_reclassified_security` |
| +0.67 | task-a-2 | 3/3 | 2/6 | `test_asset_audited` |
| +0.33 | task-n-2 | 3/3 | 4/6 | `test_shared_nacl_allows_payments_inbound` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_intune_last_sync_advanced` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_intune_device_resynced` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_intune_defender_scan_ran` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_incident_close_code_permanent` |
| +0.33 | task-a-2 | 3/3 | 4/6 | `test_crowdstrike_containment_lifted` |
| +0.33 | task-a-1 | 3/3 | 4/6 | `test_okta_mfa_factors_preserved` |
| +0.33 | task-a-2 | 1/3 | 0/6 | `test_problem_root_cause_names_exact_hash` |
| +0.33 | task-a-2 | 2/3 | 2/6 | `test_incident_state_closed` |

### w17-v2b

Regressions with Δ≥0.30 or broke always-pass (31 of 37 total regressions):

| Δ | task | wave | champ | test | note |
|---|---|---|---|---|---|
| −1.00 | task-n-2 | 0/3 | 6/6 | `test_payments_nacl_edge_return_egress` | BROKE_ALWAYS_PASS |
| −0.67 | task-n-2 | 1/3 | 6/6 | `test_payments_route_to_shared_not_blackholed` | BROKE_ALWAYS_PASS |
| −0.67 | task-n-2 | 1/3 | 6/6 | `test_payments_nacl_dependency_return_ingress` | BROKE_ALWAYS_PASS |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_viktor_service_principal_neutralized` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_theo_github_deploy_key_removed` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_onedrive_departed_share_grants_removed` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_helios_site_retains_active_owner` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_eng_site_retains_active_owner` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_elena_app_registration_neutralized` |  |
| −0.67 | task-a-33 | 0/3 | 4/6 | `test_diego_github_deploy_key_removed` |  |
| −0.50 | task-n-2 | 0/3 | 3/6 | `test_internal_api_02_undrained` |  |
| −0.50 | task-a-33 | 1/3 | 5/6 | `test_viktor_sharepoint_eng_removed` |  |
| −0.50 | task-a-33 | 1/3 | 5/6 | `test_theo_sharepoint_ops_removed` |  |
| −0.50 | task-a-33 | 1/3 | 5/6 | `test_theo_sharepoint_design_removed` |  |
| −0.50 | task-a-33 | 1/3 | 5/6 | `test_sana_guest_sharepoint_legal_removed` |  |
| −0.50 | task-a-33 | 1/3 | 5/6 | `test_priya_sharepoint_portfolio_removed` |  |
| −0.50 | task-a-33 | 1/3 | 5/6 | `test_priya_sharepoint_finance_removed` |  |
| −0.50 | task-a-33 | 1/3 | 5/6 | `test_priya_sharepoint_exec_removed` |  |
| −0.50 | task-a-33 | 1/3 | 5/6 | `test_priya_guest_sharepoint_comms_removed` |  |
| −0.50 | task-a-33 | 1/3 | 5/6 | `test_elena_sharepoint_portfolio_removed` |  |
| −0.50 | task-a-33 | 1/3 | 5/6 | `test_diego_sharepoint_research_removed` |  |
| −0.50 | task-a-33 | 1/3 | 5/6 | `test_diego_sharepoint_helios_removed` |  |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_internal_api_dns_points_live` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_db_dns_points_live` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 2/3 | 6/6 | `test_cache_dns_points_live` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_malware_ioc_escalated_in_place` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_intune_device_not_wiped_or_retired` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_incident_inactive` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_incident_close_notes_name_malware` | BROKE_ALWAYS_PASS |
| −0.33 | task-a-2 | 2/3 | 6/6 | `test_crowdstrike_malware_hash_blocked` | BROKE_ALWAYS_PASS |
| −0.33 | task-n-2 | 1/3 | 4/6 | `test_shared_nacl_allows_payments_inbound` |  |

Improvements with Δ≥0.30 (5 of 23):

| Δ | task | wave | champ | test |
|---|---|---|---|---|
| +0.33 | task-a-2 | 2/3 | 2/6 | `test_problem_short_description_names_malware` |
| +0.33 | task-a-2 | 1/3 | 0/6 | `test_problem_root_cause_names_exact_hash` |
| +0.33 | task-a-2 | 2/3 | 2/6 | `test_problem_product_area_endpoint_security` |
| +0.33 | task-a-2 | 2/3 | 2/6 | `test_incident_reclassified_security` |
| +0.33 | task-a-2 | 2/3 | 2/6 | `test_asset_audited` |

## 6. Re-scored verdicts under the paired metric

Old gate: Pass@1≥0.50 AND Pass@3≥0.75 AND a-33/n-2 hold ≥2/3. That gate is noise-dominated (P(false kill on a-1 or n-2) ≈ 1−0.259×0.259 ≈ 0.93 if both must hold; P(false kill on at least one of a-1/n-2) = 1−0.259² wait no: P(a-1 kill OR n-2 kill) = 1 − 0.259×0.259 if independent = **0.933**. Combined with a-33 P(hold)=0.741, P(all three of a-1/a-33/n-2 hold) = 0.259×0.741×0.259 ≈ **0.050**. Wave-14 hitting that pattern was a 1-in-20 draw.

Proposed paired gate (for future challengers, not retroactively promoting anyone):

1. Do not kill on binary Pass@3 of a-1/a-33/n-2 at k=3.
2. Kill if a champ ALWAYS_PASS test (6/6) falls to 0/3 (policy shift).
3. Kill if mean V drops >0.05 vs champ pool (0.731) without a matching per-test improvement of ≥+0.30 on a MAJORITY/ALWAYS fail.
4. Credit a real lever only if a MAJORITY_FAIL or ALWAYS_FAIL test rises by ≥+0.30 **and** no ALWAYS_PASS is broken.

| wave | old decision | paired re-score | why |
|---|---|---|---|
| w12 no-skill | (pre-champion baseline) | worse than freeze-path on a-1 V (0.05 vs 0.50) | freeze-path skill does real work on a-1 when loaded |
| w13 freeze-path v1 | discarded vs later v2 | a-1 V 0.35, n-2 V 0.70 — weaker than v2 pool | v2 still champion on V |
| w14 freeze-path-v2 | KEEP (lucky Pass@3) | **KEEP as champion** on mean V 0.744 and a-1 V 0.667 | still the best a-1 V in the set |
| w15 endpoint-rca-v2 stack | DISCARD (Pass@3 0.25) | **still DISCARD** — broke a-33 leftover-identity always-pass cluster (deploy keys / Elena / Viktor 0/3 vs champ 4/6) and n-2 DNS/restore; a-2 improved CS-closed but not enough for a close | two-catalog tax is a real policy shift, not just Pass@3 noise |
| w16 case-path | DISCARD | **still DISCARD** — same a-33 leftover-identity 0/3 and n-2 DNS 0/3; YAML change is a real shift | |
| w17 v2b | DISCARD (Pass@3 0.25) | **lean DISCARD, but weaker than w15/w16** — YAML frozen so H1/H2 out; a-33 leftover-identity 1/3 (27/34) + two never-started 16/34; n-2 V 0.667 vs champ 0.905; a-1 V 0.650 ≈ champ 0.500 so a-1 is *not* worse. The kill is n-2 V + a-33 never-started, which **could** be H4. Confounded. Do not resurrect without k≥8. |
| w18 champ rerun | MEASUREMENT | confirms H4: same home, Pass@3 0.25, V held 0.718 | binary Pass@k is the noisy metric; V is not |

## 7. What is actually the next lever (ranked by measured-gain ÷ cost)

| Rank | Action | Cost | What it buys | Kill if |
|---|---|---|---|---|
| 1 (this report) | Per-test floor + re-score | $0 | Stops using a 5%-probability promote gate; names the stable leftovers | — done |
| 2 | **Do not run another k=3** | saves ~$30 | A 3rd k=3 moves n from 6→9; Wilson CI on p=1/3 is still ~[0.12,0.65]. Cannot detect a real skill effect smaller than doubling close rate. | |
| 3 | Optional: one champion run at **k=8–10** (~$70–90) | $70–90 | Per-task p̂ with usable CIs; a real future promote gate (“challenger p̂ > champ CI upper bound”) | Skip if budget prefers skill work against the paired metric at k=3, scoring V + ALWAYS_PASS breaks only |
| 4 | Skill work against **stable leftovers only**, scored on paired metric not Pass@3 | ~$30/canary | (a) a-1 Slack deactivate — 2/6 on champ, 19/20 leftover when freeze otherwise complete; (b) a-2 exact-hash RCA — 0/6, but stuffing endpoint into freeze-path is a measured non-starter (champ a-2 freeze-body load scored worse). Any a-2 path must be a **new file with hold-only YAML frozen** — already falsified twice (w15/w16). So a-2 is parked. | Kill if an ALWAYS_PASS on a-33/n-2 breaks (0/3 vs champ 6/6) OR mean V drops >0.05 |

**Load-bearing assumption going forward:** binary Pass@3 at k=3 is not a property of the skill; mean V and ALWAYS_PASS breaks are. Future challengers should be scored against §6 paired gate, not the old promote arithmetic.

**Do not:** restack w15/w16/w17; stuff endpoint into freeze-path (E2); treat w17 a-33/n-2 0/3 as clean unread-body tax; run another k=3 champion rerun.

Champion remains `/home/azureuser/agent_evals/wave14/pi-agent-home` skill sha `2f2b976f9ed8bc56f0491bcf9c594847eb167966a4bdf73001cf3ab38a4f8556`.

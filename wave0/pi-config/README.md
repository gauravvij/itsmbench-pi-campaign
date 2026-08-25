# Pi OpenRouter routing (wave 0)

Harbor Pi (`-m openai/gpt-5.6-sol`) talks to the built-in **openai**
provider. That provider does **not** honor `OPENAI_BASE_URL`; it uses
`https://api.openai.com/v1` unless `~/.pi/agent/models.json` sets
`providers.openai.baseUrl`.

Wave0 job `wave0-pi-canary` therefore 401'd against platform.openai.com
with the OpenRouter `sk-or-v1` key (0 tokens). This directory is a
secret-free `models.json` bind-mounted at `/root/.pi/agent/models.json`
so the same official Harbor command can reach OpenRouter.

No API keys live here. `apiKey` interpolates `$OPENAI_API_KEY` from the
container env (Harbor `--env-file .env`).

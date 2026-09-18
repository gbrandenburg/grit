# Kern Companion

Kern is Grit's optional terminal companion. It lives below the editor, reacts to tool runs, completed messages, and idle time, and speaks in short dry quips powered by a local Ollama model.

The implementation keeps `/buddy` and `buddy.json` as compatibility names so existing sessions and integrations continue to work.

## Setup

Kern requires [Ollama](https://ollama.com) running locally. Install it, pull a model, then hatch Kern with `/buddy`:

```bash
ollama pull llama3.2
```

In Grit:

```text
/buddy
```

After hatching, configure the Ollama model used for reactions:

```text
/buddy model              # show the current model and available models
/buddy model llama3.2     # choose a model
```

Kern does not react until a model is configured. The choice is persisted across sessions.

## Commands

| Command | Description |
|---|---|
| `/buddy` | Hatch Kern, or show an existing Kern hidden with `/buddy off` |
| `/buddy model` | Show the current Ollama model and available models |
| `/buddy model <name>` | Set the Ollama model for Kern reactions |
| `/buddy pet` | Polish Kern's surface with a restrained particle animation |
| `/buddy reroll` | Reforge Kern's core, personality, and backstory |
| `/buddy stats` | Show Kern's profile and productivity stats |
| `/buddy off` | Hide Kern and persist the choice across sessions |

## Kern's visual identity

Kern has one stable visual form rather than a pool of animals. The terminal sketch is a compact faceted core with a small animated seam. It has no eyes, face, or hat, and uses a quiet particle animation when polished.

The five stats are:

- **FOCUS**
- **MOMENTUM**
- **RESILIENCE**
- **CLARITY**
- **MISCHIEF**

Kern's generated personality and backstory are still created by the main model, but the name is always `Kern`.

## How it works

- **Core**: Kern's form and rarity are deterministic from the username, hostname, and reroll counter.
- **Stats**: Productivity stats are rolled from the rarity tier.
- **Personality**: Generated once on hatch and persisted.
- **Reactions**: Generated locally by Ollama from recent terminal activity.
- **Activity indicator**: Shows while Ollama is generating a reaction.

## Persistence and multiple instances

Kern's state lives in:

```text
~/.grit/agent/buddy.json
```

Existing installations may still resolve this through the `.dreb` compatibility link. Project and global `.grit` links preserve older dreb data while the migration is in progress.

The hidden state is shared by concurrently running Grit instances. Hiding Kern in one terminal is reflected in another terminal on its next interaction.

## Troubleshooting

### Kern never reacts

Check that Ollama is running and has a model installed:

```bash
ollama list
```

If no models are listed:

```bash
ollama pull llama3.2
```

### Kern shows internal reasoning

Use a small non-reasoning model for reactions, such as `llama3.2`. Reasoning models may expose their internal thinking in the speech bubble if Ollama does not separate thinking from final content correctly.

### Kern thinks but never speaks

Kern reactions have a bounded response budget. Try a smaller, faster non-reasoning model and verify that Ollama is responsive:

```bash
ollama show llama3.2
```

# Emoji PR Complexity

A GitHub Action that scores pull requests by complexity and prefixes the title with an emoji.

The score is calculated from the number of changed lines, files touched, and distinct file extensions.

## Grading

| Emoji | Complexity |
|-------|---------|
| 😊 | Newbie |
| 🙂 | Easy |
| 😐 | Medium |
| 😠 | Hard |
| 😡 | Brutal |
| 💀 | Nightmare |

## Usage

```yaml
name: PR Complexity
on:
  pull_request:
    types: [opened, reopened, synchronize]

permissions:
  pull-requests: write
  contents: read

jobs:
  grade:
    runs-on: ubuntu-latest
    steps:
      - uses: ziadoz/emoji-pr-complexity@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

## Development

```sh
npm install
npm test
npm run build
npm run lint
npm run format
```

## Releasing

Tag the version and push it. The release workflow builds `dist/` and updates the `v1` tag automatically.

```sh
git tag v1.1.0
git push origin v1.1.0
```

For a breaking change, create a new major tag:

```sh
git tag v2.0.0
git push origin v2.0.0
```

Then update `score.yml` and the usage example to reference `@v2`.

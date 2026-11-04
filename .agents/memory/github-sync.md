---
name: GitHub sync
description: Keep this website's completed changes on its configured GitHub main branch.
---

After completing and verifying requested changes to this project, commit and push them to the configured GitHub `main` branch.

**Why:** the user explicitly asked that changes continue to be kept on GitHub.

**How to apply:** verify the build and relevant tests first, then push a normal fast-forward update; do not force-push.

If repeated pushes fail with GitHub proxy server errors, use the authorized GitHub API to create a single tree/commit and update `main` with `force: false`. Fetch the remote result and compare file trees before aligning local `main`; preserve the previous local tip on a backup branch when the generated commit hash differs.

**Why:** the GitHub proxy rejected repeated pushes, including a tiny fast-forward, while the authorized API succeeded.

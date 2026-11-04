---
name: Vite watch scope in Replit workspaces
description: Avoid file watcher exhaustion when Vite watches a Replit workspace root.
---

When Vite serves from the workspace root in Replit, ignore `.cache/`, `.local/`, `.agents/`, and `attached_assets/` in `server.watch.ignored`.

**Why:** These environment and user-upload directories can contain thousands of files. Watching them can exhaust the process file descriptor limit (`EMFILE`) before the preview server starts.

**How to apply:** If a Vite dev server fails during watcher initialization in a Replit workspace, inspect the watched paths and exclude non-source directories before changing the project structure.

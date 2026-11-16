---
name: Route loading tests
description: A Vite/Vitest compatibility issue encountered while evaluating React lazy route loading.
---

In this workspace's Vite 8, React 19 and Vitest 4 setup, React `lazy()` route imports rendered the Suspense fallback in the existing MemoryRouter tests. Preloading the route modules and waiting for visible content did not reliably settle those tests, even though the browser preview worked.

**Why:** Keeping the route tests reliable mattered more than reducing the initial bundle by a small amount; the production build already passed without the split.

**How to apply:** If route-level lazy loading is revisited, first configure and verify a Suspense-compatible test harness. Keep integration tests active and do not retain a split that leaves routes stuck in the loading state under tests.

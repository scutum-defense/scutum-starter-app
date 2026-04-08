# @scutum/starter-app

```
 ____            _
/ ___|  ___ _   _| |_ _   _ _ __ ___
\___ \ / __| | | | __| | | | '_ ` _ \
 ___) | (__| |_| | |_| |_| | | | | | |
|____/ \___|\__,_|\__|\__,_|_| |_| |_|
       S T A R T E R   A P P
```

[![React 19](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![Vite 6](https://img.shields.io/badge/Vite-6-646cff?logo=vite)](https://vite.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript)](https://typescriptlang.org)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue)](./LICENSE)

**React starter template for building applications on the Scutum Command Platform.**

Build mission-critical operator interfaces that connect to the Scutum platform for incident management, sovereign audit trails, and AI-ranked course-of-action recommendations. This template gives you production-ready scaffolding so you can focus on your domain logic instead of boilerplate.

---

## Screenshot

> TODO: Add screenshot of the running application here.
>
> ```
> public/screenshot.png
> ```

---

## Quick Start

### Prerequisites

- Node.js 22+ (see `.nvmrc`)
- pnpm 9+ (recommended) or npm
- A running Scutum API instance (local or remote)

### 1. Clone the repository

```bash
git clone https://github.com/ScutumDefense/scutum-starter-app.git
cd scutum-starter-app
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment

Create a `.env` file in the project root:

```env
VITE_SCUTUM_API=http://localhost:4000
```

Point `VITE_SCUTUM_API` at your Scutum platform API endpoint. If omitted, the app defaults to `http://localhost:4000`.

### 4. Start the development server

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The app will hot-reload as you edit source files.

### 5. Build for production

```bash
pnpm build
```

The optimized output is written to `dist/`. Preview it locally with:

```bash
pnpm preview
```

---

## Architecture

The starter app follows a simple, layered architecture that mirrors how production Scutum applications are built:

```
+---------------------------+
|        App (Page)         |
|                           |
|  +--------+  +--------+  |
|  |Incident|  |Recomm. |  |
|  | Card   |  | List   |  |
|  +--------+  +--------+  |
|  +--------+  +--------+  |
|  | Audit  |  | Status |  |
|  | Trail  |  | Banner |  |
|  +--------+  +--------+  |
+---------------------------+
        |           |
  +-----+-----+----+----+
  | useIncident| useAudit|
  +-----+------+----+---+
        |            |
  +-----+------------+---+
  |    Scutum REST API    |
  +-----------+-----------+
              |
  +-----------+-----------+
  |  Scutum Command       |
  |  Platform Backend     |
  +-----------------------+
```

**Data flow:**

1. React page components render the UI
2. Custom hooks (`useIncident`, `useAudit`) fetch data from the Scutum REST API
3. The Scutum API returns incidents, recommendations, and audit entries
4. Components display the data with the Scutum dark theme

---

## Component Inventory

| Component | File | Description |
|---|---|---|
| `App` | `src/pages/app.tsx` | Root page layout. Composes all components into a two-column grid. |
| `StatusBanner` | `src/components/status-banner.tsx` | Shows connection state: loading, connected, or error. |
| `IncidentCard` | `src/components/incident-card.tsx` | Displays the active incident with severity, confidence, and affected assets. |
| `RecommendationList` | `src/components/recommendation-list.tsx` | Renders AI-ranked courses of action with confidence scores. |
| `AuditTrail` | `src/components/audit-trail.tsx` | Lists sovereign audit log entries with actor, action, and policy labels. |

---

## Hooks

| Hook | File | Description |
|---|---|---|
| `useIncident` | `src/hooks/use-incident.ts` | Fetches the current incident and ranked recommendations from the Scutum API. Returns `{ incident, recommendations, loading, error }`. |
| `useAudit` | `src/hooks/use-audit.ts` | Fetches audit trail entries. Returns `{ entries, loading }`. |

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_SCUTUM_API` | `http://localhost:4000` | Base URL for the Scutum platform API. All hooks use this to construct fetch URLs. |

Environment variables prefixed with `VITE_` are exposed to the client-side bundle by Vite. Do not put secrets in `VITE_` variables.

### API Endpoints Used

The starter app expects the following endpoints on the configured API:

| Method | Path | Description |
|---|---|---|
| `GET` | `/incident/current` | Returns the currently active incident |
| `GET` | `/incident/recommendations` | Returns ranked course-of-action recommendations |
| `GET` | `/audit` | Returns recent audit trail entries |

---

## Customization Guide

### Adding a new component

1. Create a new file in `src/components/`:

```tsx
// src/components/asset-list.tsx
export function AssetList({ assets }: { assets: string[] }) {
  return (
    <div style={{ padding: 16, borderRadius: 16, border: "1px solid var(--line)", background: "var(--panel)" }}>
      <h3 style={{ fontSize: 15, margin: "0 0 12px" }}>Assets</h3>
      {assets.map((asset) => (
        <div key={asset} style={{ padding: 8, fontSize: 13 }}>{asset}</div>
      ))}
    </div>
  );
}
```

2. Import and use it in `src/pages/app.tsx`.

### Adding a new hook

1. Create a new file in `src/hooks/`:

```ts
// src/hooks/use-assets.ts
import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_SCUTUM_API ?? "http://localhost:4000";

export function useAssets() {
  const [assets, setAssets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/assets`)
      .then((res) => res.ok ? res.json() : [])
      .then(setAssets)
      .catch(() => setAssets([]))
      .finally(() => setLoading(false));
  }, []);

  return { assets, loading };
}
```

2. Use the hook in your page or component.

### Styling

The app uses CSS custom properties defined in `index.html` for consistent theming:

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0d12` | Page background |
| `--panel` | `#111821` | Card/panel background |
| `--text` | `#eef3f8` | Primary text |
| `--muted` | `#9aa7b6` | Secondary/muted text |
| `--accent` | `#b99a66` | Accent color (gold) |
| `--line` | `#243242` | Border/divider color |

---

<details>
<summary><strong>Project Structure</strong></summary>

```
scutum-starter-app/
  .github/
    workflows/
      ci.yml              # GitHub Actions CI (typecheck + build)
  public/                  # Static assets
  src/
    components/
      audit-trail.tsx      # Audit log display
      incident-card.tsx    # Incident detail card
      recommendation-list.tsx  # Ranked COA list
      status-banner.tsx    # Connection status indicator
    hooks/
      use-audit.ts         # Audit data fetching
      use-incident.ts      # Incident + recommendation fetching
    pages/
      app.tsx              # Root application page
    main.tsx               # React entry point
  index.html               # HTML shell with theme variables
  package.json             # Dependencies and scripts
  tsconfig.json            # TypeScript configuration
  vite.config.ts           # Vite build configuration
  .editorconfig            # Editor formatting rules
  .gitignore               # Git ignore patterns
  .nvmrc                   # Node version (22)
  renovate.json            # Automated dependency updates
  CHANGELOG.md             # Release history
  CODEOWNERS               # Code ownership
  LICENSE                  # Apache 2.0
```

</details>

<details>
<summary><strong>Type Definitions</strong></summary>

### Incident

```ts
interface Incident {
  id: string;
  title: string;
  severity: string;
  confidence: number;
  affectedAssetIds: string[];
  status: string;
}
```

### Recommendation

```ts
interface Recommendation {
  id: string;
  label: string;
  rank: number;
  rationale: string;
  confidence: number;
}
```

### AuditEntry

```ts
interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
  policyLabel?: string;
}
```

</details>

<details>
<summary><strong>Scripts Reference</strong></summary>

| Script | Command | Description |
|---|---|---|
| `dev` | `pnpm dev` | Start Vite dev server with HMR |
| `build` | `pnpm build` | Type-check and build for production |
| `preview` | `pnpm preview` | Preview the production build locally |
| `typecheck` | `pnpm typecheck` | Run TypeScript compiler in check mode |
| `lint` | `pnpm lint` | Lint source files with ESLint |

</details>

<details>
<summary><strong>Troubleshooting</strong></summary>

### Connection error on startup

The app shows "Connection error" when it cannot reach the Scutum API. Verify that:

1. The `VITE_SCUTUM_API` environment variable is set correctly in your `.env` file
2. The Scutum API server is running and accessible
3. There are no CORS issues (the API must allow requests from `localhost:5173`)

### TypeScript errors after dependency update

Run `pnpm typecheck` to see all type errors. If errors come from `@scutum/sdk`, ensure the SDK version in `package.json` matches your platform version.

### Build fails with out-of-memory

Increase the Node.js heap size:

```bash
NODE_OPTIONS=--max-old-space-size=4096 pnpm build
```

</details>

---

## Related Packages

- [`@scutum/sdk`](https://github.com/ScutumDefense/scutum-sdk) -- TypeScript SDK for the Scutum Command Platform
- [`@scutum/policy-engine`](https://github.com/ScutumDefense/scutum-policy-engine) -- Sovereign policy evaluation engine
- [`@scutum/audit-core`](https://github.com/ScutumDefense/scutum-audit-core) -- Immutable audit chain library

---

## Contributing

See the [Scutum Engineering Guide](https://github.com/ScutumDefense/scutum-engineering-guide) for coding standards, commit conventions, and review guidelines.

## License

Apache 2.0 -- see [LICENSE](./LICENSE) for details.

Copyright 2026 Scutum Defense.

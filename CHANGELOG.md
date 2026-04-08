# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-04-08

### Added

- Initial project scaffolding with React 19, Vite 6, and TypeScript
- `useIncident` hook for fetching incident data from the Scutum API
- `useAudit` hook for fetching audit trail entries
- `IncidentCard` component for displaying active incidents
- `RecommendationList` component for ranked course-of-action display
- `AuditTrail` component for sovereign audit log rendering
- `StatusBanner` component for platform connection status
- Dark theme with Scutum design tokens
- CI workflow for type checking and builds
- Environment variable configuration via `VITE_SCUTUM_API`

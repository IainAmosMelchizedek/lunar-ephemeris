# DEVELOPMENT_LOG.md

# Lunar Ephemeris Development Log

**Project:** Lunar Ephemeris\
**Version:** 1.0.0\
**License:** MIT\
**Last Updated:** June 2026

------------------------------------------------------------------------

# Purpose

This document provides a chronological record of the development of the
Lunar Ephemeris application. It captures the major milestones, technical
decisions, issues encountered, and resolutions implemented during
development.

------------------------------------------------------------------------

# Project Goal

Develop an open-source, client-side Progressive Web Application (PWA)
that provides accurate lunar information using established astronomical
libraries rather than custom mathematical implementations.

Core objectives:

-   Accurate lunar calculations
-   Offline capability
-   No backend services
-   No user accounts
-   Open-source codebase
-   Automatic deployment pipeline

------------------------------------------------------------------------

# Development Timeline

## Phase 1 -- Project Initialization

Completed:

-   Created a new React project using Vite.
-   Selected the JavaScript template.
-   Installed project dependencies.
-   Verified the development server.

Result:

A clean React/Vite project scaffold was established.

------------------------------------------------------------------------

## Phase 2 -- Project Organization

Created dedicated directories:

-   src/components
-   src/calculations
-   src/utils
-   src/styles

This separated presentation logic, calculation logic, utilities, and
styling.

------------------------------------------------------------------------

## Phase 3 -- Astronomy Libraries

Installed:

-   astronomy-engine
-   suncalc
-   date-fns

Decision:

Use established libraries rather than implementing custom astronomical
algorithms.

------------------------------------------------------------------------

## Phase 4 -- Application Features

Implemented major application features including:

-   Dashboard
-   Daily lunar summary
-   Monthly lunar calendar
-   About calculations
-   Local astronomical events
-   Geolocation
-   Time zone support
-   Shareable application state
-   Dark/light theme

------------------------------------------------------------------------

## Phase 5 -- Progressive Web App

Installed:

-   vite-plugin-pwa

Configured:

-   Manifest
-   Service worker
-   Offline caching
-   Installable application

------------------------------------------------------------------------

## Phase 6 -- Validation

Verified:

-   Development build
-   Production build
-   Service worker registration
-   Manifest generation
-   Offline operation

The production preview successfully operated while the browser was
placed into offline mode.

------------------------------------------------------------------------

## Phase 7 -- Git

Initialized Git.

Created the initial repository.

Committed the initial application.

Applied release tag:

v1.0.0

------------------------------------------------------------------------

## Phase 8 -- GitHub

Created a public GitHub repository using GitHub CLI.

Configured:

-   origin remote
-   main branch tracking

Implemented the existing protected-main workflow requiring explicit
authorization before pushing directly to main.

------------------------------------------------------------------------

## Phase 9 -- Vercel

Connected the GitHub repository to Vercel.

Verified:

-   Automatic framework detection
-   Successful production deployment
-   Automatic deployments from the main branch

------------------------------------------------------------------------

# Technical Issues Encountered

## astronomy-engine Import

Issue

The package does not provide a default export.

Resolution

Changed imports to:

``` javascript
import * as Astronomy from "astronomy-engine";
```

------------------------------------------------------------------------

## SunCalc Import

Issue

The package does not provide a default export.

Resolution

Changed imports to:

``` javascript
import * as SunCalc from "suncalc";
```

------------------------------------------------------------------------

## PWA Icon Validation

Issue

Chrome reported that the application icon dimensions did not match the
manifest.

Resolution

Generated true 192×192 and 512×512 icons.

Result

Manifest warnings were eliminated.

------------------------------------------------------------------------

## Offline Verification

Issue

Offline capability required verification using the production build.

Resolution

Validated the application through `npm run preview` with Chrome DevTools
in Offline mode.

Result

The application continued operating using cached assets.

------------------------------------------------------------------------

# Design Decisions

Key decisions made during development:

-   Keep the application entirely client-side.
-   Use mature astronomy libraries.
-   Avoid unnecessary dependencies.
-   Keep calculations separate from UI components.
-   Deploy automatically through Vercel.
-   Maintain a protected Git workflow.
-   Publish under the MIT License.

------------------------------------------------------------------------

# Release Milestone

Version 1.0.0 includes:

-   React application
-   Accurate lunar calculations
-   Dashboard
-   Calendar
-   Local events
-   Theme support
-   PWA
-   Offline capability
-   GitHub repository
-   Vercel deployment

------------------------------------------------------------------------

# Lessons Learned

Several implementation details required attention:

-   ES module import differences between libraries.
-   Browser validation of PWA icons.
-   Production testing is essential for PWA features.
-   Incremental verification after each change simplified
    troubleshooting.

------------------------------------------------------------------------

# Related Documentation

-   README.md
-   INSTALL.md
-   DEPENDENCIES.md
-   ARCHITECTURE.md
-   CHANGELOG.md
-   LICENSE

------------------------------------------------------------------------

**End of Document**

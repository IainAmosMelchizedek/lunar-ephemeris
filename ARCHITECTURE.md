# ARCHITECTURE.md

# Lunar Ephemeris Architecture

**Project:** Lunar Ephemeris\
**Version:** 1.0.0\
**License:** MIT\
**Last Updated:** June 2026

------------------------------------------------------------------------

# Purpose

This document describes the overall software architecture of the Lunar
Ephemeris application. It explains how the project is organized, how
data flows through the application, and the responsibility of each major
component.

------------------------------------------------------------------------

# High-Level Architecture

The application is a **client-side React Progressive Web App (PWA)**.

There is:

-   No backend server
-   No database
-   No user accounts
-   No cloud-hosted calculation engine

All astronomical calculations execute locally in the browser.

    Browser
       │
    React UI
       │
    Application Components
       │
    Calculation Layer
       │
    Astronomy Engine + SunCalc

------------------------------------------------------------------------

# Directory Structure

``` text
public/
    favicon.svg
    icons.svg
    pwa-192x192.png
    pwa-512x512.png

src/
    calculations/
        moonPhase.js

    components/
        Dashboard.jsx
        MonthlyCalendar.jsx
        LocationEvents.jsx
        AboutCalculation.jsx
        MoonSVG.jsx
        ArcRing.jsx
        Stat.jsx

    utils/
        formatting.js

    styles/

    App.jsx
    main.jsx
```

------------------------------------------------------------------------

# Layer Responsibilities

## Presentation Layer

React components render the user interface and respond to user
interaction.

Examples:

-   Dashboard
-   Monthly Calendar
-   About Calculation
-   Location Events

The presentation layer does not implement astronomical algorithms.

------------------------------------------------------------------------

## Calculation Layer

Located in:

``` text
src/calculations/
```

Responsibilities:

-   Receive dates and location data
-   Invoke Astronomy Engine
-   Invoke SunCalc
-   Normalize returned values
-   Return application-ready data

This separation allows the UI to remain independent of the astronomy
libraries.

------------------------------------------------------------------------

## Utility Layer

Located in:

``` text
src/utils/
```

Responsibilities include formatting values for presentation, such as
dates, percentages, and labels.

------------------------------------------------------------------------

# External Libraries

## Astronomy Engine

Provides high-precision astronomical calculations.

Used for:

-   Lunar phase
-   Illumination
-   Astronomical positions

------------------------------------------------------------------------

## SunCalc

Provides local event calculations.

Used for:

-   Sunrise
-   Sunset
-   Moonrise
-   Moonset

------------------------------------------------------------------------

## date-fns

Provides lightweight date utilities for formatting and calendar
operations.

------------------------------------------------------------------------

# Component Relationships

    App
    ├── Dashboard
    │   ├── MoonSVG
    │   ├── ArcRing
    │   └── Stat
    ├── MonthlyCalendar
    ├── LocationEvents
    └── AboutCalculation

------------------------------------------------------------------------

# Data Flow

1.  User selects a date or location.
2.  Application requests calculations.
3.  Astronomy Engine and SunCalc compute results.
4.  Results are normalized.
5.  React state updates.
6.  Components re-render.

------------------------------------------------------------------------

# Progressive Web App

The application uses `vite-plugin-pwa`.

Features:

-   Web App Manifest
-   Service Worker
-   Asset precaching
-   Offline support
-   Installable application

The service worker caches production assets to support offline use.

------------------------------------------------------------------------

# State Management

Current version uses React's built-in state management.

A dedicated state library is unnecessary because the application remains
relatively small and calculations are localized.

------------------------------------------------------------------------

# Privacy Model

The application performs calculations locally.

User location, when granted, is processed within the browser and is not
transmitted to an external service by the application.

------------------------------------------------------------------------

# Deployment Architecture

    GitHub
       │
    Push to main
       │
    Vercel
       │
    Automatic Build
       │
    Production Deployment

------------------------------------------------------------------------

# Design Principles

-   Client-side execution
-   Modular component structure
-   Separation of presentation and calculation logic
-   Reuse mature astronomy libraries
-   Minimize dependencies
-   Offline-first capability
-   Open-source development

------------------------------------------------------------------------

# Future Architectural Considerations

Potential future enhancements include:

-   Additional astronomical calculations
-   Localization
-   Accessibility improvements
-   Optional settings persistence
-   Expanded lunar event visualizations

These can be added without changing the overall architectural approach.

------------------------------------------------------------------------

# Related Documentation

-   README.md
-   INSTALL.md
-   DEPENDENCIES.md
-   DEVELOPMENT_LOG.md
-   CHANGELOG.md
-   LICENSE

------------------------------------------------------------------------

**End of Document**

# DEPENDENCIES.md

# Lunar Ephemeris Dependency Reference

**Project:** Lunar Ephemeris\
**Version:** 1.0.0\
**License:** MIT\
**Last Updated:** June 2026

------------------------------------------------------------------------

# Purpose

This document inventories every runtime and development dependency used
by the Lunar Ephemeris application. It explains why each package was
selected, how it is used, and whether it is required for production or
development.

------------------------------------------------------------------------

# Runtime Dependencies

  -----------------------------------------------------------------------
  Package                 Version                 Purpose
  ----------------------- ----------------------- -----------------------
  react                   19.2.7                  User interface library
                                                  used throughout the
                                                  application.

  react-dom               19.2.7                  Renders React
                                                  components into the
                                                  browser DOM.

  astronomy-engine        2.1.19                  Primary astronomical
                                                  calculation engine for
                                                  lunar computations.

  suncalc                 2.0.0                   Computes sunrise,
                                                  sunset, moonrise,
                                                  moonset, and related
                                                  events.

  date-fns                4.4.0                   Date formatting and
                                                  manipulation utilities.
  -----------------------------------------------------------------------

## astronomy-engine

**Purpose**

Provides accurate astronomical algorithms maintained as an independent
library rather than custom application code.

**Used For**

-   Lunar phase calculations
-   Lunar illumination
-   Astronomical positioning
-   Date-based astronomical computations

**Reason Selected**

The project intentionally relies on a mature astronomy library instead
of implementing custom algorithms.

------------------------------------------------------------------------

## suncalc

**Purpose**

Provides local solar and lunar event calculations.

**Used For**

-   Sunrise
-   Sunset
-   Moonrise
-   Moonset

**Reason Selected**

Simple API, lightweight implementation, and complements Astronomy Engine
without duplicating functionality.

------------------------------------------------------------------------

## date-fns

**Purpose**

Modern JavaScript date utility library.

**Used For**

-   Formatting dates
-   Date arithmetic
-   Calendar display
-   User-facing date presentation

**Reason Selected**

Small, modular, and well supported.

------------------------------------------------------------------------

# Development Dependencies

  Package                       Version   Purpose
  ----------------------------- --------- -----------------------------------------------
  vite                          8.1.0     Development server and production build tool.
  @vitejs/plugin-react          6.0.3     React support for Vite.
  vite-plugin-pwa               1.3.0     Progressive Web App generation.
  prettier                      3.9.3     Source code formatting.
  eslint                        10.6.0    Static analysis and linting.
  @eslint/js                    10.0.1    ESLint JavaScript configuration.
  eslint-plugin-react-hooks     7.1.1     React Hooks lint rules.
  eslint-plugin-react-refresh   0.5.3     React Fast Refresh support.
  globals                       17.7.0    Shared global definitions for ESLint.
  @types/react                  19.2.17   Editor type information for React.
  @types/react-dom              19.2.3    Editor type information for React DOM.

------------------------------------------------------------------------

# Dependency Philosophy

The project intentionally minimizes dependencies.

Core principles:

-   Use mature, well-maintained libraries.
-   Avoid implementing complex astronomical mathematics.
-   Keep the application entirely client-side.
-   Prefer lightweight utilities over large frameworks.
-   Separate runtime dependencies from development tooling.

------------------------------------------------------------------------

# Verifying Installed Packages

Run:

``` powershell
npm list --depth=0
```

This displays the top-level packages installed for the project.

------------------------------------------------------------------------

# Updating Dependencies

Update packages:

``` powershell
npm update
```

After updating:

1.  Run `npm run build`
2.  Run `npm run preview`
3.  Verify PWA functionality.
4.  Test offline operation.
5.  Commit and tag changes if appropriate.

------------------------------------------------------------------------

# Related Documentation

-   README.md
-   INSTALL.md
-   ARCHITECTURE.md
-   DEVELOPMENT_LOG.md
-   CHANGELOG.md
-   LICENSE

------------------------------------------------------------------------

**End of Document**

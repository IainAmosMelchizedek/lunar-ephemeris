# CHANGELOG.md

# Changelog

All notable changes to this project are documented in this file.

The format is based on the principles of **Keep a Changelog** and
follows **Semantic Versioning (SemVer)** where practical.

------------------------------------------------------------------------

# \[1.0.0\] - June 2026

## Initial Public Release

This release represents the first public version of the Lunar Ephemeris
application.

### Added

#### Core Application

-   Initial React 19 application created with Vite 8.
-   Modular project structure established.
-   Client-side architecture with no backend dependencies.
-   Open-source project released under the MIT License.

------------------------------------------------------------------------

#### Astronomy

-   Integrated Astronomy Engine for lunar calculations.
-   Integrated SunCalc for local astronomical events.
-   Integrated date-fns for date formatting and manipulation.

------------------------------------------------------------------------

#### User Interface

-   Dashboard
-   Daily lunar summary
-   Monthly lunar calendar
-   About the Calculations page
-   Local astronomical events
-   Time zone support
-   Geolocation support
-   Shareable application state using URL parameters
-   Dark and light themes

------------------------------------------------------------------------

#### Progressive Web App

-   Service Worker
-   Web App Manifest
-   Installable application
-   Offline asset caching
-   Verified offline operation
-   Correct 192×192 and 512×512 application icons

------------------------------------------------------------------------

#### Development Tooling

-   ESLint
-   Prettier
-   Git version control
-   GitHub repository
-   GitHub CLI workflow
-   Protected main branch workflow
-   Automated deployment through Vercel

------------------------------------------------------------------------

#### Documentation

Added the initial documentation set:

-   README.md
-   INSTALL.md
-   DEPENDENCIES.md
-   ARCHITECTURE.md
-   DEVELOPMENT_LOG.md
-   CHANGELOG.md
-   LICENSE

------------------------------------------------------------------------

### Fixed

#### ES Module Imports

Resolved import compatibility for:

-   astronomy-engine
-   suncalc

using namespace imports rather than default imports.

------------------------------------------------------------------------

#### Progressive Web App

Resolved browser validation warnings by generating correctly sized
application icons.

Verified:

-   Manifest
-   Service Worker
-   Offline support
-   Production deployment

------------------------------------------------------------------------

### Release Validation

The following were verified prior to release:

-   Production build
-   Production preview
-   Offline operation
-   Service Worker registration
-   Manifest validation
-   GitHub deployment
-   Vercel deployment
-   Git tag v1.0.0

------------------------------------------------------------------------

### Notes

Version 1.0.0 establishes the foundation for future development.

The project intentionally emphasizes:

-   Client-side execution
-   Privacy
-   Open-source development
-   Reproducible builds
-   Automatic deployment
-   Progressive Web App support

Future releases will build upon this architecture while maintaining
compatibility with the documented development workflow.

------------------------------------------------------------------------

**End of Document**

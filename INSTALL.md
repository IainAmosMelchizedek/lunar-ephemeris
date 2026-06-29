# INSTALL.md

# Lunar Ephemeris Installation Guide

**Project:** Lunar Ephemeris **Version:** 1.0.0 **License:** MIT **Last
Updated:** June 2026

------------------------------------------------------------------------

# Purpose

This document provides the complete installation and setup process for
the Lunar Ephemeris application.

Unlike a typical installation guide, this document records the exact
environment, tools, commands, workflow, and verification process used to
develop the project from an empty directory through its first public
release.

It is intended for:

-   Developers contributing to the project
-   Users who want to run the application locally
-   Future maintainers
-   AI agents assisting with future development

------------------------------------------------------------------------

# Table of Contents

1.  Development Environment
2.  Required Software
3.  Creating the Project
4.  Installing Dependencies
5.  Running the Application
6.  Production Builds
7.  Progressive Web App
8.  Git Workflow
9.  GitHub Integration
10. Vercel Deployment
11. Release Workflow
12. Troubleshooting
13. Recommended Development Workflow

------------------------------------------------------------------------

# 1. Development Environment

The project was developed using the following environment.

  Component            Version
  -------------------- --------------------
  Operating System     Windows 11
  Shell                Windows PowerShell
  Visual Studio Code   Current
  Git                  Current
  GitHub CLI           Current
  Node.js              22.x
  npm                  10.x

------------------------------------------------------------------------

# 2. Verify Required Software

Verify Node.js.

``` powershell
node --version
```

Expected output:

``` text
v22.x.x
```

------------------------------------------------------------------------

Verify npm.

``` powershell
npm --version
```

Expected output:

``` text
10.x.x
```

------------------------------------------------------------------------

Verify Git.

``` powershell
git --version
```

------------------------------------------------------------------------

Verify GitHub CLI.

``` powershell
gh auth status
```

The authenticated GitHub account should be displayed.

------------------------------------------------------------------------

# 3. Create the Project

Create the project directory.

``` powershell
mkdir lunar-ephemeris-app
```

Enter the project.

``` powershell
cd lunar-ephemeris-app
```

------------------------------------------------------------------------

# 4. Create the React Application

Generate the project using Vite.

``` powershell
npm create vite@latest .
```

Selections used during installation:

  Option                 Selection
  ---------------------- ------------
  Framework              React
  Variant                JavaScript
  Linter                 ESLint
  Install Dependencies   Yes

This produces the initial project scaffold.

------------------------------------------------------------------------

# 5. Initial Project Structure

``` text
public/

src/

package.json

vite.config.js

index.html
```

------------------------------------------------------------------------

# 6. Organize the Source Tree

Create project folders.

``` powershell
mkdir .\src\components
mkdir .\src\calculations
mkdir .\src\utils
mkdir .\src\styles
```

These folders separate:

-   UI Components
-   Astronomical calculations
-   Utility functions
-   Styling resources

------------------------------------------------------------------------

# 7. Runtime Dependencies

## Astronomy Engine

``` text
npm install astronomy-engine
```

Purpose:

Provides high precision astronomical calculations.

Used for:

-   Moon phase calculations
-   Lunar data
-   Astronomical positioning

------------------------------------------------------------------------

## SunCalc

``` text
npm install suncalc
```

Purpose:

Calculates:

-   Sunrise
-   Sunset
-   Moonrise
-   Moonset

based on the user's location.

------------------------------------------------------------------------

## date-fns

``` text
npm install date-fns
```

Purpose:

Modern JavaScript date handling.

Used throughout the application for formatting and manipulating dates.

------------------------------------------------------------------------

# 8. Progressive Web App Support

Install:

``` text
npm install vite-plugin-pwa
```

Purpose:

Transforms the application into an installable Progressive Web App.

Features:

-   Service Worker
-   Manifest generation
-   Offline support
-   Asset precaching
-   Installable application

------------------------------------------------------------------------

# 9. Development Dependency

Install Prettier.

``` text
npm install -D prettier
```

Purpose:

Maintains consistent source formatting.

------------------------------------------------------------------------

# 10. Verify Installed Packages

Run:

``` powershell
npm list --depth=0
```

Expected packages include:

-   react
-   react-dom
-   vite
-   astronomy-engine
-   suncalc
-   date-fns
-   vite-plugin-pwa
-   prettier
-   eslint

Additional development packages installed by Vite will also appear.

------------------------------------------------------------------------

# 11. Run the Development Server

``` text
npm run dev
```

Default URL:

``` text
http://localhost:5173
```

Hot Module Reload (HMR) is enabled by Vite.

------------------------------------------------------------------------

# 12. Production Build

Create the production build.

``` text
npm run build
```

Artifacts are generated in:

``` text
dist/
```

------------------------------------------------------------------------

# 13. Preview Production

Serve the production build locally.

``` text
npm run preview
```

Default URL:

``` text
http://localhost:4173
```

Always verify the production build before deployment.

------------------------------------------------------------------------

# 14. Progressive Web App Verification

The production build should generate:

``` text
dist/

manifest.webmanifest

registerSW.js

sw.js

workbox-*.js
```

Verify in Chrome Developer Tools:

Application → Manifest

-   Manifest loads
-   Icons load
-   Theme color present
-   No installability warnings

Application → Service Workers

-   Registered
-   Activated
-   Running

Network

Switch to Offline.

Refresh the page.

The application should continue functioning using cached assets.

------------------------------------------------------------------------

# 15. Git Initialization

Initialize Git.

``` powershell
git init -b main
```

Verify.

``` powershell
git status
```

------------------------------------------------------------------------

# 16. Create the GitHub Repository

Using GitHub CLI.

``` text
gh repo create lunar-ephemeris --public --source=. --remote=origin
```

The remote named **origin** is automatically configured.

------------------------------------------------------------------------

# 17. Initial Commit

Stage files.

``` text
git add .
```

Commit.

``` text
git commit -m "Initial commit: Lunar Ephemeris application"
```

------------------------------------------------------------------------

# 18. Protected Main Branch Workflow

This development environment intentionally blocks direct pushes to
**main**.

To authorize an intentional push:

``` powershell
$env:ALLOW_MAIN_PUSH="1"
```

Push.

``` powershell
git push -u origin main
```

Immediately remove the override.

``` powershell
Remove-Item Env:ALLOW_MAIN_PUSH
```

This safeguard prevents accidental pushes while still allowing an
intentional single-branch workflow.

------------------------------------------------------------------------

# 19. Release Tag

Create a release tag.

``` powershell
git tag -a v1.0.0 -m "Lunar Ephemeris v1.0.0"
```

Push the tag.

``` powershell
$env:ALLOW_MAIN_PUSH="1"
git push origin v1.0.0
Remove-Item Env:ALLOW_MAIN_PUSH
```

------------------------------------------------------------------------

# 20. Deploy to Vercel

Import the GitHub repository into Vercel.

Framework:

``` text
Vite
```

Typical settings:

  Setting            Value
  ------------------ ---------------
  Build Command      npm run build
  Install Command    npm install
  Output Directory   dist

Once connected, every push to **main** automatically deploys the latest
version.

------------------------------------------------------------------------

# 21. Troubleshooting

## astronomy-engine Import

Incorrect:

``` javascript
import Astronomy from "astronomy-engine";
```

Correct:

``` javascript
import * as Astronomy from "astronomy-engine";
```

------------------------------------------------------------------------

## SunCalc Import

Incorrect:

``` javascript
import SunCalc from "suncalc";
```

Correct:

``` javascript
import * as SunCalc from "suncalc";
```

------------------------------------------------------------------------

## PWA Icons

Manifest icon dimensions must exactly match the image dimensions.

Correct production icons:

-   192 × 192
-   512 × 512

------------------------------------------------------------------------

## Offline Verification

Always test the production build.

Development mode does not fully represent production PWA behavior.

------------------------------------------------------------------------

# 22. Recommended Development Workflow

For every new feature:

1.  Implement the feature.
2.  Run:

``` text
npm run build
```

3.  Preview:

``` text
npm run preview
```

4.  Verify functionality.
5.  Verify PWA if affected.
6.  Commit changes.
7.  Push to GitHub.
8.  Confirm automatic Vercel deployment.
9.  Tag significant releases.

Following this workflow ensures that every production release remains
reproducible, fully tested, and traceable through Git history.

------------------------------------------------------------------------

# Related Documentation

-   README.md
-   DEPENDENCIES.md
-   ARCHITECTURE.md
-   DEVELOPMENT_LOG.md
-   CHANGELOG.md
-   LICENSE

------------------------------------------------------------------------

**End of Document**

# Portfolio Site

A modern personal portfolio built with Next.js, React, Tailwind CSS, and a local SQLite database for easier content editing.

## Overview

This project is a personal website that showcases:
- a home page and about section
- professional experience timeline
- project highlights
- social links and tech stack

Content is now served from a local SQLite database, which makes updates simpler than editing hardcoded data files.

## Tech Stack

- Next.js
- React
- Tailwind CSS
- TypeScript
- SQLite via better-sqlite3
- pnpm

## Prerequisites

Make sure you have the following installed:
- Node.js 20+ recommended
- pnpm

If pnpm is not available, enable it with:

```bash
corepack enable
```

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/viv1one/Portfolio.git
cd Portfolio
pnpm install
```

## Running Locally

Start the development server:

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

## Content Management

The portfolio content is stored in a local SQLite database at:

```text
data/portfolio.sqlite
```

The content layer lives in:
- [src/lib/content-db.ts](src/lib/content-db.ts)
- [src/lib/content.ts](src/lib/content.ts)
- [src/lib/content-server.ts](src/lib/content-server.ts)

You can edit the database using any SQLite client such as:
- DB Browser for SQLite
- sqlite3 CLI

The main tables include:
- profile
- profile_descriptions
- experiences
- projects
- social_links
- tech_stack

## Project Structure

```text
src/
  app/            # App routes and pages
  components/     # UI components
  content/        # Legacy content data (kept for reference)
  lib/            # SQLite content access layer
  styles/         # Global styling
```

## Build

To verify the production build:

```bash
pnpm build
```

## License

No license file is currently included in the repository. If you plan to publish or reuse this project, add an appropriate license before distribution.

## Author

Vivek Kumar
- GitHub: [viv1one](https://github.com/viv1one)
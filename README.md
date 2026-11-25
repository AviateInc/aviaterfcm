This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Code quality

Run these commands from the repository root:

- `npm run lint`: check Next.js, React and TypeScript rules with zero warnings, then check formatting.
- `npm run lint:fix`: apply ESLint fixes and format the code.
- `npm run format`: format source and configuration files.
- `npm run format:check`: check formatting without changing files.
- `npm run typecheck`: generate Next.js route types and check TypeScript.

Formatting follows Aviate Supply: four spaces, double quotes, semicolons, trailing commas and a 100-character line width. Generated files and the package lockfile are excluded.

Tailwind CSS is compiled by the configured `@tailwindcss/turbopack` loader. The root layout imports `app/globals.css`, which imports Tailwind and registers the daisyUI plugin.

## GitHub Pages preview

The public preview is deployed to https://aviateinc.github.io/aviaterfcm/ by the Pages workflow whenever main is updated. The workflow can also be run manually in GitHub Actions.

Run `npm run build:pages` to generate the same static site in `out/`. This build uses the repository path prefix, exports images without a server dependency, and reduces the size of exported JPEG copies. Original photos are preserved. The splash screen and carousel continue to run in the browser.

The normal `npm run dev` and `npm run build` commands retain the standard Next.js configuration. On the static preview, the footer year updates on each deployment. A different Pages path can be supplied through `PAGES_BASE_PATH` before building.

## Contact email form

The contact card contains a responsive email form. Run `npm run dev` and, in a second terminal, `npm run mail:dev` to use it locally. The mail command generates temporary Ethereal SMTP credentials in memory: messages are captured for preview and never delivered to real mailboxes. After submitting, use **View captured test email** to inspect the message.

Run `npm run test:contact` for the HTTP validation and submission checks. These checks use an isolated mail transport and send no email.

When IT supplies SMTP details, copy `server/smtp.env.example` to `.env.mail.local`, fill in the server-only settings, and run `npm run mail:start`. This command requires real SMTP configuration and never falls back to test mail. Credentials must remain in the ignored environment file or backend host settings. STARTTLS is required on port 587; port 465 uses TLS from connection start.

GitHub Pages cannot run Nodemailer. Host the Node service separately behind HTTPS, set its allowed origins to the actual website origin (for the current preview, `https://aviateinc.github.io`), then set the GitHub Actions repository variable `CONTACT_FORM_ENDPOINT` to its full `https://.../contact` URL and rebuild the preview. Only that public endpoint is included in the frontend. For other builds, set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` before building. Until an endpoint is configured, the public form is disabled and offers the sales email address instead.

The service accepts a fixed destination address, validates fields, limits request size and submission frequency, and keeps SMTP settings out of responses. If deployed with multiple instances or behind a proxy, configure shared abuse controls at the hosting layer before opening public submissions.

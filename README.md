# Blazor Movies

A modern movie discovery web app built with **Next.js**, **React**, and **Tailwind CSS**. Get the latest movies, search, browse by genre, and see detailed information powered by the TMDB API.

## Features

- Browse popular, top-rated, now playing, and upcoming movies
- Search for movies by title and year
- View detailed movie info, including cast, crew, and trailers
- Browse movies by genre
- Responsive, modern UI with Tailwind CSS
- Authentication with Auth0
- Floating movie quotes and beautiful UI effects

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [Auth0](https://auth0.com/) for authentication
- [Jest](https://jestjs.io/) and [ts-jest](https://kulshekhar.github.io/ts-jest/) for testing

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/blazor_movies.git
cd blazor_movies
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root and add your TMDB access token and Auth0 credentials:

```
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_tmdb_token
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run all tests with:

```bash
npm test
```

- Tests are written with Jest and ts-jest for TypeScript support.
- Utility and API service methods are covered.
- See `src/lib/api/movieService.test.ts` for examples.

## Deployment

This project is ready for deployment on [Vercel](https://vercel.com/) or any Node.js server.  
A sample GitHub Actions workflow for CI/CD and DigitalOcean deployment is included in `.github/workflows/deploy.yml`.

## Customization

- **UI:** Tailwind CSS is used for all styling. Customize in `src/app/globals.css` and `tailwind.config.ts`.
- **API:** All TMDB API logic is in `src/lib/api/movieService.ts`.
- **Auth:** Auth0 integration is in `src/app/layout.tsx`.

## License

MIT

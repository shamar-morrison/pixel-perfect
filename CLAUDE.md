# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pixel Perfect is a Next.js 14 SaaS application for AI-powered image transformations. Users can perform various image operations (restore, generative fill, object removal/recoloring, background removal) using Cloudinary's AI capabilities. The app uses Clerk for authentication, Stripe for payments, and MongoDB for data persistence.

## Development Commands

### Running the Application
- `npm run dev` - Start development server (default: http://localhost:3000)
- `npm run build` - Build production bundle
- `npm start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint on TypeScript files
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without changes

## Architecture

### Route Structure (App Router)
The app uses Next.js 14 App Router with route groups:
- `app/(root)/` - Protected routes requiring authentication
  - `/` - Home page showing user's image transformations
  - `/transformations/add/[type]` - Create new transformation (type: restore, fill, remove, recolor, removeBackground)
  - `/transformations/[id]` - View transformation details
  - `/transformations/[id]/update` - Edit existing transformation
  - `/profile` - User profile and credit balance
  - `/credits` - Purchase credit packages
- `app/(auth)/` - Public authentication routes
  - `/sign-in` - Sign in page (Clerk)
  - `/sign-up` - Sign up page (Clerk)
- `app/api/webhooks/` - Webhook endpoints
  - `/api/webhooks/clerk` - Handles user lifecycle events (create, update, delete)
  - `/api/webhooks/stripe` - Processes payment completions

### Authentication & Middleware
- Uses Clerk for authentication with webhook-based user sync
- `middleware.ts` protects all routes except `/`, `/api/webhooks/clerk`, `/api/webhooks/stripe`
- Clerk webhooks create/update/delete users in MongoDB, syncing `userId` to Clerk's public metadata

### Database Layer (MongoDB + Mongoose)
- **Connection**: `lib/database/mongoose.ts` implements cached connection pattern (prevents hot reload connection spam)
- **Models**:
  - `User`: Stores clerkId, email, username, photo, firstName, lastName, planId, creditBalance
  - `Image`: Stores transformation metadata (title, type, publicId, secureURL, config, author reference)
  - `Transaction`: Records Stripe purchases (stripeId, amount, credits, plan, buyer reference)

### Server Actions Pattern
All data mutations use Next.js Server Actions (`"use server"`) in `lib/actions/`:
- `user.actions.ts` - createUser, updateUser, deleteUser, getUserById, updateCredits
- `image.actions.ts` - addImage, updateImage, deleteImage, getImageById, getAllImages (with pagination)
- `transaction.action.ts` - checkoutCredits (creates Stripe session), createTransaction

### Image Transformation Flow
1. User selects transformation type from navigation (defined in `constants/index.ts`)
2. `TransformationForm` component handles form state with react-hook-form + zod
3. User uploads image via `MediaUploader` (integrates next-cloudinary)
4. Cloudinary processes image with AI transformations based on `config` object
5. On save, `addImage` action creates MongoDB record and deducts 1 credit (creditFee = -1)
6. `TransformedImage` component displays before/after with download option

### Payment & Credits System
- Credit packages defined in `constants/index.ts` (Free: 20, Pro: 120, Premium: 2000)
- Checkout flow: `checkoutCredits` → Stripe session → redirect to Stripe → webhook on success
- Stripe webhook (`/api/webhooks/stripe`) calls `createTransaction` → `updateCredits`
- New users start with 10 credits (default in User model)

### Type System
- All type definitions in `types/index.d.ts` as global declarations
- Key types: CreateUserParams, AddImageParams, UpdateImageParams, Transformations, TransformationTypeKey
- Transformation types are strongly typed as union: "restore" | "fill" | "remove" | "recolor" | "removeBackground"

### UI Components
- Uses shadcn/ui components (Radix UI primitives + Tailwind)
- Custom components in `components/shared/`:
  - `TransformationForm` - Main form for image transformations
  - `MediaUploader` - Cloudinary upload widget integration
  - `TransformedImage` - Before/after display with download
  - `Checkout` - Stripe checkout button
  - `Sidebar`, `MobileNav`, `Header` - Layout components

## Environment Variables

Required variables (see `.env.example`):
- **Next.js**: NEXT_PUBLIC_SERVER_URL
- **MongoDB**: MONGODB_URL (database name: "pixel-perfect")
- **Clerk**: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, WEBHOOK_SECRET
- **Cloudinary**: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- **Stripe**: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

## Important Patterns

### Database Queries
- Always call `connectToDatabase()` before DB operations in server actions
- Use `populateUser` helper in image.actions.ts to join User data on Image queries
- Parse results with `JSON.parse(JSON.stringify(doc))` to serialize Mongoose documents for client

### Error Handling
- `lib/utils.ts` exports `handleError` utility for consistent error logging
- Server actions wrap operations in try/catch and call `handleError`

### Cache Invalidation
- Server actions call `revalidatePath(path)` after mutations to update Next.js cache
- Common pattern: perform DB operation → revalidatePath → return serialized result

### Transformation Configuration
- Each transformation type has default `config` in `constants/index.ts`
- Config maps to Cloudinary transformation parameters
- Object remove/recolor include `prompt` field for AI targeting

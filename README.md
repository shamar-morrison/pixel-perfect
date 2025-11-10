# Pixel Perfect

> AI-Powered SaaS Platform for Advanced Image Transformations

![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6.3.0-green?style=flat&logo=mongodb)
![Cloudinary](https://img.shields.io/badge/Cloudinary-AI-blue?style=flat&logo=cloudinary)
![Stripe](https://img.shields.io/badge/Stripe-Payments-purple?style=flat&logo=stripe)

## About

Pixel Perfect is a modern, full-stack SaaS application that leverages cutting-edge AI technology to perform advanced image transformations. Built with Next.js 14 and powered by Cloudinary's AI capabilities, it offers professional-grade image editing features including restoration, generative fill, object removal, recoloring, and background removal.

The platform features a credit-based system with Stripe payment integration, comprehensive user management through Clerk authentication, and a responsive, intuitive interface built with shadcn/ui components.

## Key Features

- **AI Image Restoration** - Remove noise and imperfections to enhance image quality
- **Generative Fill** - Expand image dimensions using AI-powered outpainting
- **Smart Object Removal** - Eliminate unwanted objects with intelligent shadow removal
- **Object Recoloring** - Change colors of specific objects with precision
- **Background Removal** - Extract subjects with AI-driven edge detection
- **Credit System** - Flexible credit packages for all user needs
- **Secure Payments** - Integrated Stripe checkout and subscription management
- **User Dashboard** - Manage transformations, credits, and profile in one place
- **Responsive Design** - Seamless experience across desktop and mobile devices
- **Dark Mode Support** - Eye-friendly interface with theme switching

## Tech Stack

### Frontend

- **Framework**: Next.js 14.1.0 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.3.0
- **Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Theme**: next-themes

### Backend

- **Runtime**: Node.js (Next.js API Routes & Server Actions)
- **Database**: MongoDB 6.3.0
- **ODM**: Mongoose 8.1.1

### Third-Party Services

- **Authentication**: Clerk 4.29.6
- **Payments**: Stripe 14.16.0
- **Image Processing**: Cloudinary 2.0.1
- **Image Upload**: next-cloudinary 5.20.0

### Form Management

- **Forms**: react-hook-form 7.66.0
- **Validation**: Zod 3.25.76
- **Resolvers**: @hookform/resolvers 3.10.0

### Development Tools

- **Linting**: ESLint 8
- **Formatting**: Prettier 3.6.2
- **Build**: Next.js compiler (Turbopack ready)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **MongoDB** database (local or cloud instance like MongoDB Atlas)
- **Git** for version control

You'll also need accounts for:

- [Clerk](https://clerk.com) - Authentication
- [Cloudinary](https://cloudinary.com) - Image transformations
- [Stripe](https://stripe.com) - Payment processing

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd pixel-perfect
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory and add the following variables (refer to `.env.example` for the template):

```env
# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# MongoDB
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/pixel-perfect

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
WEBHOOK_SECRET=whsec_...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

4. **Set up Clerk webhooks**

In your Clerk dashboard:

- Navigate to Webhooks section
- Create a new webhook endpoint: `http://localhost:3000/api/webhooks/clerk`
- Subscribe to events: `user.created`, `user.updated`, `user.deleted`
- Copy the webhook secret to `WEBHOOK_SECRET` in your `.env.local`

5. **Set up Stripe webhooks**

In your Stripe dashboard:

- Navigate to Developers > Webhooks
- Add endpoint: `http://localhost:3000/api/webhooks/stripe`
- Select event: `checkout.session.completed`
- Copy the webhook secret to `STRIPE_WEBHOOK_SECRET` in your `.env.local`

6. **Run the development server**

```bash
npm run dev
```

7. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Database Setup

The application will automatically connect to MongoDB when you start the server. The database name is configured as `pixel-perfect` in your `MONGODB_URL`.

Models are automatically created on first run:

- **User** - Stores user data synced from Clerk
- **Image** - Stores transformation metadata and configurations
- **Transaction** - Records credit purchase history

## Project Structure

```
pixel-perfect/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Authentication routes (public)
│   │   ├── sign-in/             # Clerk sign-in page
│   │   └── sign-up/             # Clerk sign-up page
│   ├── (root)/                   # Protected routes (auth required)
│   │   ├── page.tsx             # Home - user's transformation collection
│   │   ├── credits/             # Purchase credit packages
│   │   ├── profile/             # User profile and settings
│   │   └── transformations/     # Image transformation routes
│   │       ├── add/[type]/      # Create new transformation
│   │       ├── [id]/            # View transformation details
│   │       └── [id]/update/     # Edit existing transformation
│   └── api/webhooks/            # Webhook endpoints
│       ├── clerk/               # User lifecycle events (create/update/delete)
│       └── stripe/              # Payment confirmations
├── components/
│   ├── shared/                  # Custom application components
│   │   ├── checkout.tsx         # Stripe checkout button
│   │   ├── collections.tsx      # Image gallery with pagination
│   │   ├── custom-field.tsx     # Reusable form field wrapper
│   │   ├── delete-confirmation.tsx  # Confirmation modal
│   │   ├── header.tsx           # Page header component
│   │   ├── media-uploader.tsx   # Cloudinary upload widget integration
│   │   ├── mobile-nav.tsx       # Mobile navigation menu
│   │   ├── search.tsx           # Search functionality
│   │   ├── sidebar.tsx          # Desktop sidebar navigation
│   │   ├── transformation-form.tsx  # Main image transformation form
│   │   └── transformed-image.tsx    # Before/after image display
│   └── ui/                      # shadcn/ui base components
├── constants/
│   └── index.ts                 # App constants (routes, plans, transformations)
├── lib/
│   ├── actions/                 # Next.js Server Actions (data mutations)
│   │   ├── image.actions.ts     # Image CRUD operations
│   │   ├── transaction.action.ts # Payment and credit processing
│   │   └── user.actions.ts      # User CRUD operations
│   ├── database/
│   │   ├── mongoose.ts          # Cached MongoDB connection
│   │   └── models/              # Mongoose schemas
│   │       ├── image.model.ts   # Image transformation schema
│   │       ├── transaction.model.ts  # Transaction history schema
│   │       └── user.model.ts    # User data schema
│   └── utils.ts                 # Utility functions (error handling, etc.)
├── public/assets/               # Static assets (icons, images, logos)
├── types/
│   └── index.d.ts              # Global TypeScript type definitions
├── middleware.ts                # Clerk authentication middleware
├── tailwind.config.ts           # Tailwind CSS configuration
├── next.config.mjs              # Next.js configuration
├── tsconfig.json                # TypeScript compiler configuration
├── components.json              # shadcn/ui component configuration
├── .env.example                 # Environment variables template
└── package.json                 # Project dependencies and scripts
```

## Features Deep Dive

### Image Transformations

Pixel Perfect offers five AI-powered transformation types, each powered by Cloudinary's advanced AI models:

#### 1. Image Restore

**Purpose**: Refine images by removing noise and imperfections
**Best For**: Old photos, low-quality images, scanned documents
**AI Technology**: Noise reduction, clarity enhancement
**Cost**: 1 credit per transformation

#### 2. Generative Fill

**Purpose**: Expand image dimensions using AI outpainting
**Best For**: Creating wider aspect ratios, extending backgrounds
**AI Technology**: Context-aware content generation
**Cost**: 1 credit per transformation

#### 3. Object Remove

**Purpose**: Identify and eliminate unwanted objects
**Best For**: Removing photobombers, unwanted elements
**AI Technology**: Object detection, intelligent shadow removal
**User Input**: Text prompt describing the object to remove
**Advanced Features**: Multiple object removal, shadow removal
**Cost**: 1 credit per transformation

#### 4. Object Recolor

**Purpose**: Change colors of specific objects in images
**Best For**: Product photography, design mockups
**AI Technology**: Object detection, intelligent color replacement
**User Input**: Text prompt (object) + target color
**Advanced Features**: Multiple object recoloring
**Cost**: 1 credit per transformation

#### 5. Background Remove

**Purpose**: Remove background with AI precision
**Best For**: Product photos, profile pictures, design assets
**AI Technology**: Advanced edge detection, alpha channel generation
**Cost**: 1 credit per transformation

### Aspect Ratios

All transformations support three aspect ratios:

- **Square (1:1)** - 1000x1000px
- **Standard Portrait (3:4)** - 1000x1334px
- **Phone Portrait (9:16)** - 1000x1778px

### Credit System

**How It Works:**

- New users receive **10 free credits** upon registration
- Each transformation costs **1 credit**
- Credits can be purchased through Stripe checkout
- Credit balance is displayed in the user profile
- Transactions are recorded with full history

**Credit Packages:**

| Package     | Price | Credits | Value per $ | Features                                          |
| ----------- | ----- | ------- | ----------- | ------------------------------------------------- |
| **Free**    | $0    | 20      | -           | Basic access to all transformation types          |
| **Pro**     | $40   | 120     | 3 credits   | Full access + Priority support                    |
| **Premium** | $199  | 2000    | 10 credits  | Full access + Priority support + Priority updates |

### Payment Flow

1. User selects credit package from `/credits` page
2. Stripe checkout session is created via `checkoutCredits` action
3. User completes payment on Stripe's secure checkout page
4. Stripe sends `checkout.session.completed` event to webhook
5. Webhook creates transaction record and updates user's credit balance
6. User is redirected back to the application with updated credits

## Usage Guide

### Creating Your First Transformation

1. **Sign up** for an account at `/sign-up`
2. **Navigate** to any transformation type from the sidebar:
   - Image Restore
   - Generative Fill
   - Object Remove
   - Object Recolor
   - Background Remove
3. **Upload** an image using the upload widget
4. **Configure** transformation settings (prompt, color, aspect ratio)
5. **Preview** the AI-generated result
6. **Save** the transformation (costs 1 credit)
7. **Download** your transformed image

### Managing Transformations

- **View All**: Your home page displays all your transformations
- **Search**: Use the search bar to find specific transformations
- **Edit**: Click on any transformation to view or edit it
- **Delete**: Remove unwanted transformations from your collection

### Purchasing Credits

1. Navigate to `/credits` page
2. Choose a credit package (Free, Pro, or Premium)
3. Click "Buy Credits"
4. Complete payment on Stripe checkout
5. Credits are automatically added to your balance

## API Routes & Webhooks

### Webhook Endpoints

#### Clerk Webhook - `/api/webhooks/clerk`

Handles user lifecycle events synchronized from Clerk:

- `user.created` - Creates new user in MongoDB with 10 starting credits
- `user.updated` - Updates user information in MongoDB
- `user.deleted` - Removes user from MongoDB

**Verification**: Uses `svix` library to verify webhook signatures

#### Stripe Webhook - `/api/webhooks/stripe`

Processes payment events:

- `checkout.session.completed` - Creates transaction and updates credits

**Verification**: Uses Stripe's signature verification

### Server Actions

All data mutations use Next.js Server Actions pattern:

**User Actions** (`lib/actions/user.actions.ts`):

- `createUser()` - Create new user
- `updateUser()` - Update user details
- `deleteUser()` - Delete user
- `getUserById()` - Fetch user by ID
- `updateCredits()` - Modify credit balance

**Image Actions** (`lib/actions/image.actions.ts`):

- `addImage()` - Create transformation (deducts 1 credit)
- `updateImage()` - Update transformation
- `deleteImage()` - Delete transformation
- `getImageById()` - Fetch single transformation
- `getAllImages()` - Get paginated collection with search

**Transaction Actions** (`lib/actions/transaction.action.ts`):

- `checkoutCredits()` - Create Stripe checkout session
- `createTransaction()` - Record successful purchase

## Environment Variables

| Variable                             | Description                                         | Required |
| ------------------------------------ | --------------------------------------------------- | -------- |
| `NEXT_PUBLIC_SERVER_URL`             | Application URL (use http://localhost:3000 locally) | Yes      |
| `MONGODB_URL`                        | MongoDB connection string                           | Yes      |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`  | Clerk publishable key for client-side               | Yes      |
| `CLERK_SECRET_KEY`                   | Clerk secret key for server-side                    | Yes      |
| `WEBHOOK_SECRET`                     | Clerk webhook signing secret                        | Yes      |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`  | Cloudinary cloud name                               | Yes      |
| `CLOUDINARY_API_KEY`                 | Cloudinary API key                                  | Yes      |
| `CLOUDINARY_API_SECRET`              | Cloudinary API secret                               | Yes      |
| `STRIPE_SECRET_KEY`                  | Stripe secret key for server-side                   | Yes      |
| `STRIPE_WEBHOOK_SECRET`              | Stripe webhook signing secret                       | Yes      |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for client-side              | Yes      |

See `.env.example` for a complete template.

## Available Scripts

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Production
npm run build        # Build production bundle
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint on TypeScript files
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
```

## Deployment

### Deploy to Vercel (Recommended)

Pixel Perfect is optimized for deployment on Vercel:

1. **Push your code** to GitHub/GitLab/Bitbucket

2. **Import project** in Vercel dashboard
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your repository

3. **Configure environment variables**
   - Add all variables from `.env.example`
   - Update `NEXT_PUBLIC_SERVER_URL` to your Vercel domain

4. **Update webhook URLs**
   - Clerk webhook: `https://your-domain.vercel.app/api/webhooks/clerk`
   - Stripe webhook: `https://your-domain.vercel.app/api/webhooks/stripe`

5. **Deploy**
   - Vercel will automatically build and deploy
   - Future pushes to main branch auto-deploy

### Other Platforms

The application can be deployed to any platform supporting Next.js:

- AWS Amplify
- Netlify
- Railway
- Render
- DigitalOcean App Platform

Ensure the platform supports:

- Node.js 18+
- Environment variables
- Webhook endpoints
- MongoDB connections

## Architecture Highlights

### Authentication Flow

- Clerk manages authentication UI and session handling
- User data is synced to MongoDB via webhooks
- `middleware.ts` protects routes except public paths
- Clerk's `userId` is stored in MongoDB as `clerkId`

### Database Patterns

- **Cached Connection**: MongoDB connection is cached to prevent hot reload issues
- **Population**: Image queries populate user data via Mongoose `populate()`
- **Serialization**: Results are serialized with `JSON.parse(JSON.stringify())` for client components

### Error Handling

- Centralized `handleError()` utility in `lib/utils.ts`
- All server actions wrapped in try/catch blocks
- User-friendly error messages via toast notifications

### Cache Invalidation

- Server actions call `revalidatePath()` after mutations
- Ensures Next.js cache stays in sync with database
- Automatic page re-rendering with fresh data

## Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code:

- Follows TypeScript best practices
- Passes ESLint checks (`npm run lint`)
- Is formatted with Prettier (`npm run format`)
- Includes appropriate error handling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Cloudinary](https://cloudinary.com/) - AI image transformations
- [Clerk](https://clerk.com/) - Authentication infrastructure
- [Stripe](https://stripe.com/) - Payment processing
- [MongoDB](https://www.mongodb.com/) - Database
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Vercel](https://vercel.com/) - Hosting platform

---

**Built with ❤️ using Next.js 14 and AI technology**

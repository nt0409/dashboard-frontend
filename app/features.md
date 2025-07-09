# AI Agent Gmail Automation Dashboard: Build Checklist

## 1. Project Setup
- [x] Create Next.js project with App Router, TypeScript, Tailwind, ESLint
- [x] Initialize Shadcn UI and install core UI components (button, card, table, tabs, etc.)
- [x] Install dependencies: Supabase, React Query, Google APIs, Calendly, etc.
- [x] Set up `lib/supabase.ts` utility

## 2. Environment & Auth
- [x] Configure `.env.local` with Supabase credentials
- [x] Set up Supabase Auth (email/password) and login page (`/login`)
- [x] Add session check and sign out to dashboard
- [x] Note: Google Auth/NextAuth.js is NOT used

## 3. Database (Supabase)
- [ ] Create tables: `follow_ups`, `agent_tasks`, `cold_emails_cache`
- [ ] Set up Row Level Security (RLS) if multi-user
- [ ] Test DB connection from API routes

## 4. API Routes (Backend)
- [x] Scaffold API route files for:
  - `/api/cold-emails`
  - `/api/follow-ups`
  - `/api/inbound-emails`
  - `/api/events`
  - `/api/tasks`
- [ ] Implement logic for each route:
  - [ ] Cold Emails: Google Sheets fetch, caching, transformation
  - [x] Follow-ups: Supabase fetch, filtering
  - [ ] Inbound Emails: Gmail API fetch, status
  - [ ] Events: Calendly API fetch, transformation
  - [x] Tasks: Supabase fetch, filtering, update
- [ ] Add error handling and proper HTTP status codes

## 5. Frontend: Dashboard UI
- [x] Create `/dashboard` page with Shadcn Tabs for navigation
- [x] Add sign out button and session protection
- [x] For each tab, implement:
  - [x] Table with relevant columns (using Shadcn Table)
  - [x] Loading state (Skeleton)
  - [x] Error/empty state
  - [ ] Actions (refresh, mark complete, view details, etc.)
  - [ ] Pagination if needed
  - [ ] Filtering/search (Input, Badge, etc.)
- [x] Use mock/demo data for all tabs except follow-ups and tasks
- [ ] Use React Query (or SWR) for data fetching and caching

## 6. Componentization & UX
- [x] Move tab content into separate components (e.g., `components/ColdEmailsTab.tsx`)
- [x] Add dialogs, tooltips, toasts, and confirmation modals as needed (basic demo only)
- [ ] Ensure accessibility (keyboard navigation, ARIA, etc.)
- [ ] Responsive design (mobile/tablet/desktop)

## 7. Performance & Best Practices
- [ ] Use Server Components where possible for initial data
- [ ] Debounce search/filter inputs
- [ ] Optimistic UI updates for mutations
- [ ] Minimize bundle size

## 8. Testing & Validation
- [ ] Test all API routes (success, error, edge cases)
- [ ] Test authentication and session flows
- [ ] Test UI on all major browsers/devices
- [ ] Validate accessibility

## 9. Documentation & Deployment
- [ ] Update `README.md` with setup, environment, and usage instructions
- [ ] Add comments and JSDoc to key files
- [ ] Prepare for deployment (Vercel, etc.)
- [ ] Set up production environment variables

## 10. Future Enhancements (Optional)
- [ ] Slack/email notifications
- [ ] Full CRUD for tasks
- [ ] Tag-based filtering
- [ ] AI summary and response suggestion endpoints
- [ ] Multi-user support and permissions

---

## Supabase Table SQL Schemas

```sql
-- follow_ups table
create table if not exists follow_ups (
  id uuid primary key default gen_random_uuid(),
  lead_email text not null,
  previous_message_snippet text,
  follow_up_template text,
  time_scheduled timestamptz,
  status text default 'pending',
  agent_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- agent_tasks table
create table if not exists agent_tasks (
  id uuid primary key default gen_random_uuid(),
  task_description text not null,
  assigned_agent text,
  due_date date,
  priority text default 'medium',
  status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- cold_emails_cache table
create table if not exists cold_emails_cache (
  id uuid primary key default gen_random_uuid(),
  recipient text,
  email_preview text,
  scheduled_time timestamptz,
  status text,
  agent_name text,
  cache_date date,
  last_fetched timestamptz
);
``` 
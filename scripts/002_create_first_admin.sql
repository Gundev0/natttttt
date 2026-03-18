-- This script should be run after creating a user via Supabase Auth
-- Replace 'YOUR_USER_ID_HERE' with the actual user ID from auth.users table
-- You can find the user ID by checking the auth.users table after signing up

-- Example: If you want to make an existing user an admin, get their ID from auth.users
-- and run:
-- INSERT INTO admin_users (id, email, role) VALUES ('user-uuid-here', 'email@example.com', 'admin');

-- To create a new admin user, first sign up on /admin/login page,
-- then run this query with your user's ID:

-- INSERT INTO admin_users (id, email, role) 
-- SELECT id, email, 'admin' 
-- FROM auth.users 
-- WHERE email = 'your-admin-email@example.com';

# TODO: Connect Frontend to Backend APIs

## 1. Connect Skills Component to API
- [ ] Replace static skills array with fetch from /api/skills
- [ ] Add loading and error states

## 2. Connect Projects Component to API
- [ ] Replace static projectsData with fetch from /api/projects
- [ ] Add like button that only shows for admin users
- [ ] Add like count display

## 3. Connect Experience Component to API
- [ ] Replace static experiences array with fetch from /api/experience

## 4. Implement Authentication in SignIn/SignUp Pages
- [ ] Update SignIn to call /api/auth/login API
- [ ] Update SignUp to call /api/auth/register API
- [ ] Handle JWT tokens and redirect on success

## 5. Add Authentication Links to Navbar
- [ ] Add Sign In and Sign Up links to navbar
- [ ] Show user info/logout when logged in

## 6. Add Like Functionality
- [x] Add likes field to Project model (array of user IDs or count)
- [x] Create API endpoint for liking projects
- [x] Update projectController to handle likes

## 7. Authentication State Management
- [ ] Create auth context for managing login state
- [ ] Protect admin features with role check

## Followup steps
- [ ] Test API connections
- [ ] Implement JWT token handling
- [ ] Add error handling for API calls

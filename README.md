# AdolBodol Frontend

## 📖 Project Overview

**Adolbodol** is a modern gadget buy & sell platform that provides a seamless user experience for browsing, listing, and managing gadgets for sale. This frontend project is built with **Next.js** and **TypeScript**, ensuring fast performance and maintainable code. With features like **JWT-based authentication**, **role-based dashboards**, **secure form handling**, and a **themed UI**, it offers a scalable and user-centric interface.

The application supports two types of users: **Admins** and **Regular Users**. Admins can manage products, users, and transactions, while users can list gadgets, manage their listings, and interact securely with the platform.

The UI is crafted using **Tailwind CSS** and **Radix UI**, offering both aesthetic flexibility and accessibility. All interactions and state management are handled efficiently with **Redux Toolkit**, and the app ensures data validation and security with **zod** and **Google reCAPTCHA** integration.

Whether you're buying, selling, or managing gadget deals—**Adolbodol** offers a smooth, responsive, and secure experience.


---

## ✨ Features

- 🔐 **JWT Authentication** with secure token handling
- 🎨 **Light/Dark Theme** support using `next-themes`
- 📋 **Advanced Form Handling** with `react-hook-form` and `zod`
- 🔄 **Redux Toolkit** for global state management
- 💬 **Toast Notifications** with `sonner`
- 📊 **Dynamic Tables** powered by `@tanstack/react-table`
- ✅ **Google reCAPTCHA** integration for bot protection
- 🧩 **Radix UI Components** for accessibility-first UI
- ⚡ **Animated UI** using `tw-animate-css`

---

## Error Handling

- **Form Errors:** Handled using react-hook-form and Zod schemas.
- **API Errors:** Managed using axios interceptors or try/catch blocks.
- **Auth Errors:** Safeguarded with proper JWT decoding and state validation.
- **Global Errors:** Optionally displayed using sonner toast notifications.

---

## Technologies Used

- **Next.js:** React framework for production
- **React 19:** Latest version of the React library
- **TypeScript:** Static type checking
- **Tailwind CSS 4:** MUtility-first CSS framework
- **Zod:** Schema validation for form inputs
- **Redux Toolkit:** Predictable state container
- **Radix UI:** Unstyled accessible UI components
- **TanStack Table:**  Feature-rich table management
- **Axios:** For HTTP requests
- **JWT & jwt-decode :** Token handling for auth
- **Google reCAPTCHA:** Bot protection


### Installation

1. Clone the repository:

```bash
git clone
```

2. Navigate to the project directory:

```bash
cd adolBodol-frontend
```

3. Install dependencies:

```bash
npm install
```

## 🔐 Environment Variables

4. Environment Variables Create a .env file in the root directory and add the following:

| Key                          | Description                        |
|-----------------------------|------------------------------------|
| NEXT_PUBLIC_SERVER_BASE_API | Backend API base URL               |
| NEXT_PUBLIC_CLIENT_BASE_API | Frontend base URL                  |
| NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY | Google reCAPTCHA client key     |
| NEXT_PUBLIC_RECAPTCHA_SERVER_KEY | Google reCAPTCHA server key     |
| NEXT_PUBLIC_IMAGEBB_API_KEY | Image upload API key (imgbb)       |


5. Run the Application Start the server in development mode:

```bash
npm run build
```

6. Run the Application Start the server in development mode:

```bash
npm run dev
```

For production:

```bash
npm run start
```
## Dependencies

1. Fork the repository.
2. Create a branch for your feature or bug fix.

```bash
git checkout -b my-feature
```

3. Commit changes and push to your branch.

```bash
git add .
git commit -m "Add feature or fix bug"
git push origin my-feature
```

4. Create a pull request and assign it to the main branch.
5. Wait for the review and merge.

---


---

#### . **API Communication**
A short section about how it communicates with the backend.


## 🌐 API Communication

The frontend communicates with the AdolBodol backend via RESTful APIs. All endpoints are prefixed with `NEXT_PUBLIC_SERVER_BASE_API`. Authentication is handled via JWT, and protected routes require a valid token.


## 🚧 Known Issues

- Responsive tweaks needed for very small devices.
- Need to improve table pagination UX.

## 🔭 Roadmap

- ✅ Light/Dark theme toggle
- ⏳ Multi-language support
- ⏳ Image compression before upload
- ⏳ Push notifications

----


## License

This project is licensed under the ISC License.

---

### Happy Coding! ✨
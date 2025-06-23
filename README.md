# 🐾 Pet Adoption Mobile App

A **full-stack mobile-first application** for pet adoption, built using **React Native with Expo**, **Firebase** as the backend, and **Clerk** for authentication. This project demonstrates how real-world applications can be designed to solve meaningful problems using scalable, modern technologies.

---

## 📌 Project Overview

This project aims to streamline the process of **pet adoption** by building a user-friendly, mobile application that enables:

- Pet seekers to **browse pets by category**, mark favorites, and chat with owners.
- Pet owners or shelters to **upload pet details**, including images and descriptions.
- Real-time communication between users for a seamless adoption experience.

The goal is to replicate a **real-world end-to-end workflow** of pet discovery, interest expression, and conversation—all through a native mobile experience.

---

## 🎯 Motivation & Real-World Use Case

Many **animal shelters and individual pet owners** lack access to modern, mobile-friendly platforms to list and manage pets available for adoption. Most rely on websites or physical listings, which limits reach and user engagement.

This app serves as a **readily deployable solution** for:
- Local pet shelters
- NGOs working in animal welfare
- Individuals looking to responsibly rehome their pets

By combining **authentication, real-time chat, and image-based listings**, the app builds trust and transparency between pet seekers and providers.

---

## 🧱 Architecture & Technologies

| Layer             | Technology                           | Purpose |
|------------------|---------------------------------------|---------|
| Frontend          | React Native (Expo)                  | Cross-platform mobile UI |
| Authentication    | Clerk                                | Google Sign-In, session management |
| Backend (Database)| Firebase Firestore                   | NoSQL real-time document store |
| File Storage      | Firebase Storage                     | Image uploads |
| State Management  | React Hooks                          | Component-level state |
| Routing           | `expo-router`                        | File-based navigation |
| Secure Storage    | `expo-secure-store`                  | Persistent login state |
| UI Styling        | Tailwind-like styles, Google Fonts   | Custom branding and responsiveness |
| Icons             | `@expo/vector-icons`                 | Consistent iconography |

---

## 🧠 Functional Modules

### 🔐 Authentication
- Handled via **Clerk’s Expo-compatible SDK** with Google Sign-In
- Persistent user sessions using `SecureStore`
- Auth state used to guard routes and customize user experience

### 🏠 Home Tab
- Dynamic **image slider** from Firebase
- **Category selector** with horizontal scrolling
- List of pets filtered by selected category

### ❤️ Favorites Tab
- Maintains a list of user's favorited pets
- Data synced with Firestore collection `UserFavPet`

### 💬 Inbox Tab
- Displays chat sessions involving the current user
- Uses **real-time Firestore listeners** to sync conversations
- One-to-one message collections stored as subcollections under `Chat`

### 👤 Profile Tab
- Displays current user data
- Quick links: Add Pet, Favorites, Inbox, Logout
- Lists user's uploaded pets (filtered using email)

### ➕ Add Pet
- Form with inputs: pet name, age, breed, category, gender, description
- **Image upload** handled via `expo-image-picker` and stored in Firebase Storage
- Form data saved to Firestore under the `Pets` collection

---

## 🔁 Firestore Database Structure

```plaintext
├── Pets
│   └── [petId] → { name, age, category, imageUrl, ownerEmail }
├── Category
│   └── [categoryId] → { name }
├── Sliders
│   └── [sliderId] → { imageUrl }
├── UserFavPet
│   └── [userEmail] → { favorites: [petId, ...] }
├── Chat
│   └── [chatId]
│       └── messages → { sender, receiver, timestamp, message }
````

---

## ⚠️ Challenges & Engineering Solutions

| Challenge                            | Solution                                                               |
| ------------------------------------ | ---------------------------------------------------------------------- |
| 🔁 Navigation sync issues            | Used `useRootNavigationState()` to ensure route readiness              |
| 🔐 Login state lost after app reload | Persisted auth state with `expo-secure-store`                          |
| 🖼️ Image upload latency/crashes     | Pre-compressed images using `ImagePicker` before upload                |
| 💬 Chat lag                          | Used Firestore `onSnapshot()` with local state buffer for real-time UX |
| 📱 UI Overlap (keyboard/input)       | Added ScrollView, fixed positioning, and focused padding               |
| 🐛 Firebase rule edge cases          | Structured database rules with email-based access control              |

---

## 🚀 Performance Optimization

* **Lazy loading** of pet images and data using `FlatList`
* **Optimized re-renders** with `React.memo`, `useCallback`
* **Firestore query tuning** with `.where()`, `.limit()`, and indexed fields
* **Local caching** for static content like categories and sliders
* **Component modularization** for maintainability and reusability

---

## 🧪 Future Enhancements

* Push notifications for new chats or pet listings
* Search and filters by location, breed, age, size
* Admin dashboard for shelters to moderate posts
* Multi-language support
* Dark mode and accessibility improvements

---

## 🛠️ Getting Started

```bash
git clone https://github.com/your-username/pet-adoption-app.git
cd pet-adoption-app
npm install
```

1. Create a `.env` file with your Firebase and Clerk credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_key
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
```

2. Run the app:

```bash
npx expo start
```

---

## ✅ Conclusion

The Pet Adoption App is a complete mobile-first solution designed to simplify the process of discovering and adopting pets. Built with React Native (Expo), Firebase, and Clerk, it demonstrates real-world implementation of:
🔐 Secure authentication
🖼️ Media handling and cloud storage
📊 Structured NoSQL database design
💬 Real-time messaging
❤️ Personalized user experience (favorites, profiles, chats)

This project showcases my ability to build scalable, maintainable, and user-friendly full-stack applications with a focus on solving meaningful problems through modern mobile technology.
It is not just a portfolio piece—it’s a practical app that could be deployed by local shelters or NGOs to improve pet adoption workflows and connect animals with loving homes.






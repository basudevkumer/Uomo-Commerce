const DEMO_USERS = [
  {
    uid: "demo-user-1",
    displayName: "Demo Shopper",
    email: "demo@uomo.com",
    password: "Demo123!",
  },
];

const USERS_STORAGE_KEY = "uomo-demo-users";
const NEWSLETTER_STORAGE_KEY = "uomo-newsletter-subscribers";

export const demoImageUrls = [
  {
    key: "fashion",
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "menswear",
    url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "newsletter",
    url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80",
  },
];

export const paymentMethods = [
  { id: "visa", name: "Visa", logo: "https://cdn.simpleicons.org/visa/1a1f71" },
  {
    id: "mastercard",
    name: "Mastercard",
    logo: "https://cdn.simpleicons.org/mastercard/eb001b",
  },
  {
    id: "bkash",
    name: "bKash",
    logo: "https://cdn.simpleicons.org/bkash/e2136e",
  },
  {
    id: "nagad",
    name: "Nagad",
    logo: "https://cdn.simpleicons.org/nagad/f15a24",
  },
  {
    id: "paypal",
    name: "PayPal",
    logo: "https://cdn.simpleicons.org/paypal/00457c",
  },
  {
    id: "google-pay",
    name: "Google Pay",
    logo: "https://cdn.simpleicons.org/googlepay/4285f4",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    logo: "https://cdn.simpleicons.org/applepay/000000",
  },
  {
    id: "american-express",
    name: "American Express",
    logo: "https://cdn.simpleicons.org/americanexpress/2e77bc",
  },
  {
    id: "discover",
    name: "Discover",
    logo: "https://cdn.simpleicons.org/discover/ff6000",
  },
];

export const getDemoImageUrl = (source) => {
  if (
    typeof source === "string" &&
    (source.startsWith("http") ||
      source.startsWith("/") ||
      source.startsWith("blob:") ||
      source.startsWith("data:"))
  ) {
    return source;
  }

  const key = String(source || "").toLowerCase();
  if (key.includes("letter")) return demoImageUrls[2].url;
  if (key.includes("men")) return demoImageUrls[1].url;
  return demoImageUrls[0].url;
};

const getStoredItems = (key) => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(window.localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const setStoredItems = (key, items) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(items));
  }
};

const publicUser = ({ password, ...user }) => user;

export const getDemoUsers = () => [
  ...DEMO_USERS,
  ...getStoredItems(USERS_STORAGE_KEY),
];

export const authenticateDemoUser = (email, password) => {
  const user = getDemoUsers().find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password,
  );

  return user ? publicUser(user) : null;
};

export const registerDemoUser = ({ displayName, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getDemoUsers();

  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    return { error: "Email already in use" };
  }

  const user = {
    uid: `demo-user-${Date.now()}`,
    displayName: displayName.trim(),
    email: normalizedEmail,
    password,
  };

  setStoredItems(USERS_STORAGE_KEY, [
    ...getStoredItems(USERS_STORAGE_KEY),
    user,
  ]);
  return { user: publicUser(user) };
};

export const saveNewsletterSubscription = (email) => {
  const normalizedEmail = email.trim().toLowerCase();
  const subscribers = getStoredItems(NEWSLETTER_STORAGE_KEY);

  if (!subscribers.some((item) => item.email === normalizedEmail)) {
    setStoredItems(NEWSLETTER_STORAGE_KEY, [
      ...subscribers,
      { email: normalizedEmail, subscribedAt: new Date().toISOString() },
    ]);
  }
};

// for general purposes to use projects all images in one place, so that if we want to change any image, we can change it from here and it will be reflected in all places where it's used.

export const projectsAllImages = {
  logo: "https://res.cloudinary.com/cjygzzko/image/upload/v1788880057/logo_1.webp",
};

export { DEMO_USERS };

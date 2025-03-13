export const BASE_URL = "https://express-e-commerce-backend-production.up.railway.app";

// AUTH PATH
export const REGISTER_URL = `${BASE_URL}/api/auth/register`;
export const LOGIN_URL = `${BASE_URL}/api/auth/login`;
export const LOGOUT_URL = `${BASE_URL}/api/auth/logout`;
export const REFRESH_TOKEN_URL = `${BASE_URL}/api/auth/refresh_token`;
export const GOOGLE_CALLBACK = `${BASE_URL}/api/auth/google/callback`;

// USERS PATH
export const USERS_URL = `${BASE_URL}/api/users`;
export const USERS_CHECK_TOKEN_URL = `${BASE_URL}/api/users/check/token`;

// CATEGORIES PATH
export const CATEGORIES_URL = `${BASE_URL}/api/categories`;

// PRODUCTS PATH
export const PRODUCTS_URL = `${BASE_URL}/api/products`;
export const PRODUCTS_IMAGE_FIRST_URL = `${BASE_URL}/api/products/createImageBeforeProduct`;

// PRODUCT_IMAGES PATH
export const PRODUCT_IMAGES_URL = `${BASE_URL}/api/product_images`;

// CARTS PATH
export const CARTS_URL = `${BASE_URL}/api/carts`;

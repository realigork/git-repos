const FAVOURITES_STORAGE_KEY = "favourites";

export function setItem(key, value) {
  if (typeof window === "undefined") return;
  const encoded = JSON.stringify(value);
  return window.localStorage.setItem(key, encoded);
}

export function getItem(key) {
  if (typeof window === "undefined") return;
  const encoded = window.localStorage.getItem(key);
  try {
    return JSON.parse(encoded);
  } catch (e) {
    return undefined;
  }
}

export function removeItem(key) {
  if (typeof window === "undefined") return;
  return window.localStorage.removeItem(key);
}

export function getFavouriteItems() {
  return getItem(FAVOURITES_STORAGE_KEY) || [];
}

export function setFavouriteItems(items) {
  setItem(FAVOURITES_STORAGE_KEY, items);
}

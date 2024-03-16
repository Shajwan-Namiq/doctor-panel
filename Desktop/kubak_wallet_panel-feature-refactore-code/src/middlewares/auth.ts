import { AES, enc } from "crypto-js";
import { currentUser } from "@/stores/currentUser";
import { setTokens } from "./authService";
import {
  ServicePanelTransitionConsumerService,
  ServicePanelType,
} from "@/backend/auth";
import { addPolicies } from "@/services/addPolicies";

export async function validateAndLoadUserState() {
  const keyValue = extractKeyFromPath(
    "authCheck/key=U2FsdGVkX1%2F5dbJ5yHc5t3PLqB6HEU1Jfb9lKqq7jdu7d36eNdXlh%2BysyeIn6gE4%2F633H4h627qD8BcO2jmiR5TXUNJA1ILaYNKA7HN9oD2h7VwggkE8as6ofR6z%2B0SnYnFhGf0fP8CpzB%2FU3%2B0TySaoyBYWjajiblCkdp2l6XupAqfmvSnmXzQbT1V5JKDuBxjyLkQqi%2B65PlkQGF3%2F%2FwdMY%2F12ZWlO9C5wyc7oXhOh8M%2BQUhdfHvYRAq%2FdK7CIJG%2FLxNGK8p8oZt40WvrONJ7mdQKkf7tfYS%2Ffz7c21awur5iYFize%2FuhTMJY7csmGK7uSyoa8TOYCowzan%2BtP6GbpBGfRE0dlgEDgdWCu6J0%3D"
  );
  if (!keyValue) return false;

  try {
    const response =
      await ServicePanelTransitionConsumerService.postConsumeServicePanelTransition(
        {
          requestBody: {
            servicePanelType: ServicePanelType.WALLET,
            key: decryptKeyValue(keyValue),
          },
        }
      );

    if (response.accessToken && response.refreshToken) {
      setTokens(response.accessToken, response.refreshToken);
      localStorage.setItem("keyValue", keyValue);

      return true;
    }
  } catch (error) {
    console.error("Error setting tokens:", error);
    return false;
  }
}

// Decryption function for the URL that comes from the main panel
const decryptKeyValue = (encryptedKey: string) => {
  const passphrase = "hs%jd#@sf$h#h@(jsd8*awp892348*wrercxnv";
  const bytes = AES.decrypt(decodeURIComponent(encryptedKey), passphrase);
  const originalKey = bytes.toString(enc.Utf8);
  return originalKey;
};

// Function adjusted to extract the key from the pathname
const extractKeyFromPath = (path: string) => {
  const keyPattern = /key=([^\/]+)/; // Regex to find 'key=<value>'
  const match = path.match(keyPattern);
  return match ? match[1] : null;
};

function parseJwt(token) {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1]; // Get Payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
}

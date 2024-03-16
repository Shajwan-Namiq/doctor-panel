import { AES, enc } from "crypto-js";
import { currentUser } from "@/stores/currentUser";
import { setTokens } from "./authService";
import {
  ServicePanelTransitionConsumerService,
  ServicePanelType,
} from "@/backend/auth";

export async function validateAndLoadUserState() {
  const existingAccessToken = localStorage.getItem("accessToken");
  if (existingAccessToken) {
    return true; // User is considered valid due to existing token
  }

  const currentUrl = new URL(window.location.href);
  const keyValue = extractKeyFromPath(currentUrl.pathname);
  if (!keyValue) {
    redirectToMainPanel();
    return false;
  }

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
    redirectToMainPanel();
    return false;
  }
}

const redirectToMainPanel = () => {
  window.location.href = "https://main-panel.dev.a.kubak.co/";
};

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

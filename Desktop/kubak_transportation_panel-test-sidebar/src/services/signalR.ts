import { authentication } from "@/stores/authentication";
import {
  type HubConnection,
  HubConnectionBuilder,
  HttpTransportType,
} from "@microsoft/signalr";
// import { getAuth } from "firebase/auth";

// const auth: any = getAuth();

export function getAccessToken() {
  const authenticationStore = authentication();
  authenticationStore.checkTokenExpiration();
  const newAccessToken = authenticationStore.accessToken;

  return newAccessToken;
}
const connection: HubConnection = new HubConnectionBuilder()
  .withUrl(`${import.meta.env.SIGNAL_R_URL}?access_token=${getAccessToken()}`, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .withAutomaticReconnect()
  .build();

export default connection;

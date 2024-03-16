import { authentication } from "@/stores/authentication";
import { type HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
// import { getAuth } from "firebase/auth";

// const auth: any = getAuth();
const authenticationStore = authentication();
authenticationStore.checkTokenExpiration();
const newAccessToken = authenticationStore.accessToken;
// if ((auth.currentUser!.stsTokenManager.expirationTime - Math.floor(new Date().getTime())) < 300000) {

//   auth.currentUser?.getIdToken(true).then((accessToken) => {
//     newAccessToken = accessToken

//   });

// }
const connection: HubConnection = new HubConnectionBuilder()
  .withUrl(
    `${import.meta.env.SIGNAL_R_CENTRAL_URL}?access_token=${newAccessToken}`,
    {}
  )
  .withAutomaticReconnect()
  .build();

connection.onclose(() => {
  /* empty */
});

try {
  connection.start();
} catch (error) {
  /* empty */
}

export default connection;

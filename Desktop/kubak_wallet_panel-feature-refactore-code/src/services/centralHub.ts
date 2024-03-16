import { authentication } from "@/stores/authentication";
import { type HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

const authenticationStore = authentication();
authenticationStore.checkTokenExpiration();
const newAccessToken = authenticationStore.accessToken;
// if ((auth.currentUser!.stsTokenManager.expirationTime - Math.floor(new Date().getTime())) < 300000) {

//   auth.currentUser?.getIdToken(true).then((accessToken) => {
//     newAccessToken = accessToken

//   });

//}
const connection: HubConnection = new HubConnectionBuilder()
  .withUrl("")
  .withAutomaticReconnect()
  .build();

// connection.onclose(() => {
//   /* empty */
// });

// try {
//   connection.start();
// } catch (error) {
//   /* empty */
// }

export default connection;

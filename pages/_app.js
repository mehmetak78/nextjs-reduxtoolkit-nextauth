import '../styles/globals.css'
import Layout from "../components/layout/Layout";
import {NotificationContextProvider} from "../context-store/notification-context";
import {MessagesContextProvider} from "../context-store/messages-context";
import {AuthContextProvider} from "../context-store/auth-context";

function MyApp({Component, pageProps}) {
  return (
    <AuthContextProvider>
      <MessagesContextProvider>
        <NotificationContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationContextProvider>
      </MessagesContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp

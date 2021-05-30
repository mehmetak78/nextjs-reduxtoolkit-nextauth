import '../styles/globals.css'
import Layout from "../components/layout/Layout";
import {NotificationContextProvider} from "../context-store/notification-context";
import {MessagesContextProvider} from "../context-store/messages-context";
import {AuthContextProvider} from "../context-store/auth-context";

function MyApp({Component, pageProps}) {
  return (
    <NotificationContextProvider>
      <AuthContextProvider>
        <MessagesContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MessagesContextProvider>
      </AuthContextProvider>
    </NotificationContextProvider>
  )
}

export default MyApp

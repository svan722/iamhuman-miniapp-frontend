// TelegramProvider
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ITelegramUser, IWebApp } from "../utils/types";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider: React.FC <({ children?:React.ReactNode })> = ({ children }) =>{
  const [webApp, setWebApp] = useState<IWebApp | null>(null);

  useEffect(() => {
    // function initWebApp () {
    // const app = (window as any).Telegram?.WebApp;
    // if (app) {
    //   app.ready();
    //   setWebApp(app);
    // }else {
    //   console.log('Telegram WebApp is undefined, retrying…');
    //   setTimeout(initWebApp, 500);
    //   }
    // }
    // initWebApp();
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
      setWebApp(app);
    }
  }, []);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  return (
    <TelegramContext.Provider value={value}>
      {/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
      <script
        src="https://telegram.org/js/telegram-web-app.js"/>
        {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
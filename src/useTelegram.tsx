
import { useState, useEffect } from 'react';

interface TelegramWebApp {
  ready(): unknown;
  initData: string;
  initDataUnsafe: {
    user?: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        language_code: string;
    };
  }
  colorScheme: string;
  themeParams: {
      bg_color: string;
      text_color: string;
      hint_color: string;
      link_color: string;
      button_color: string;
      button_text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  version: string;
  platform: string;
  isDebug: boolean;
  userProps: Record<string, any>;
  MainButton: {
      color: string;
      text_color: string;
      is_visible: boolean;
      is_active: boolean;
      is_disabled: boolean;
      text: string;
      hint: string;
      onClick: () => void;
  };
  BackButton: {
      is_visible: boolean;
      onClick: () => void;
  };
  HapticFeedback: {
      impactOccurred: (style?: 'light' | 'medium' | 'heavy') => void;
      selectionChanged: () => void;
      notificationOccurred: (type?: 'success' | 'warning' | 'error') => void;
  };
  close: () => void;
}


const useTelegram = (): TelegramWebApp | null => {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);

  useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-web-app.js';
      script.async = true;
      script.onload = () => {
          setTg((window as any).Telegram?.WebApp);
      };
      document.body.appendChild(script);

      return () => {
          document.body.removeChild(script);
      };
  }, []);

  return tg;
};

export default useTelegram;

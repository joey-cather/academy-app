'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import Notification from '../components/Notification';

export type NotificationType = 'alert' | 'confirm';

export interface NotificationOptions {
  type: NotificationType;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface NotificationContextProps {
  notify: (options: NotificationOptions) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error('useNotification must be used within NotificationProvider');
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationOptions | null>(
    null
  );

  const notify = (options: NotificationOptions) => setNotification(options);
  const handleClose = () => setNotification(null);

  const handleConfirm = () => {
    notification?.onConfirm?.();
    handleClose();
  };

  const handleCancel = () => {
    notification?.onCancel?.();
    handleClose();
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <Notification
          {...notification}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </NotificationContext.Provider>
  );
};

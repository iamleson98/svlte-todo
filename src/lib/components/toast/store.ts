import type { SystemVariant } from '$lib/types';
import { writable, derived } from 'svelte/store';
import type { ToastProps } from './types';
import { randomID } from '$lib/utils';


function createNotificationStore() {
  const _notifications = writable<ToastProps[]>([]);

  function send(config: Omit<ToastProps, 'id'>) {
    _notifications.update((toasts) => {
      return toasts.concat({
        id: randomID(),
        ...config,
      });
    });
  }

  const { subscribe } = derived(_notifications, ($_notifications: ToastProps[], set: (value: ToastProps[]) => void) => {
    set($_notifications);

    if ($_notifications.length) {
      const timer = setTimeout(() => {
        _notifications.update((toasts) => {
          toasts.shift();
          return toasts;
        })
      }, $_notifications[0].timeout);

      return () => clearTimeout(timer);
    }
  });

  return {
    subscribe,
    send,
  };
}

export const toastStore = createNotificationStore();

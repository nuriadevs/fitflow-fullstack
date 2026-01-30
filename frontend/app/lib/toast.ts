
import toast, { ToastOptions, Toast, Renderable, ValueFunction } from 'react-hot-toast';

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      icon: '✅',
      ...options,
    });
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      icon: '❌',
      ...options,
    });
  },

  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      icon: '⏳',
      ...options,
    });
  },

  promise: async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  },

  auth: {
    loginSuccess: (username?: string) => {
      return toast.success(
        username ? `Welcome back, ${username}! 👋` : 'Welcome back! 👋',
        { duration: 5000 }
      );
    },

    signupSuccess: (username: string) => {
      return toast.success(`Welcome to FitFlow, ${username}! 🎉`, {
        duration: 5000,
      });
    },

    logoutSuccess: () => {
      return toast.success('See you soon! 👋', {
        duration: 2000,
      });
    },
  },

  exercise: {
    saved: () => {
      return toast.success('Exercise saved! 💪', {
        duration: 2000,
      });
    },

    deleted: () => {
      return toast.success('Exercise deleted', {
        duration: 2000,
      });
    },
  },

  // Usa ValueFunction<Renderable, Toast> que es el tipo exacto que espera toast.custom
  custom: (component: ValueFunction<Renderable, Toast>, options?: ToastOptions) => {
    return toast.custom(component, options);
  },
};
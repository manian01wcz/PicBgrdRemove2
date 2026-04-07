/// <reference types="google.accounts" />

declare global {
  interface Window {
    google: typeof google;
  }
  const google: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string;
          callback: (response: { credential: string }) => void;
        }) => void;
        renderButton: (
          element: HTMLElement,
          options: { theme?: string; size?: string }
        ) => void;
        prompt: () => void;
      };
    };
  };
}

export {};

import api from "./api";

let initialized = false;

export function setupAPIInterceptors(
  refresh: () => Promise<boolean>
) {
  if (initialized) return;

  initialized = true;

  api.interceptors.request.use(
    (config) => {
      const token =
        (globalThis as any)._access;

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (res) => res,

    async (error) => {
      const original = error.config;

      if (
        error.response?.status === 401 &&
        !original._retry
      ) {
        original._retry = true;

        const success =
          await refresh();

        if (success) {
          original.headers.Authorization =
            `Bearer ${(globalThis as any)._access}`;

          return api(original);
        }
      }

      return Promise.reject(error);
    }
  );
}
import { defineStore } from "pinia";

import { LoginResponsePayload, UserSetting } from "@/components/user";

export interface AuthState {
  token?: string;
  userId?: number;
  username?: string;
  role?: string;
  authorities?: [{ authority: string }];
  settings?: UserSetting[];
}

const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    const userId = localStorage.getItem("user-id");

    return {
      token: localStorage.getItem("user-token") ?? undefined,
      role: localStorage.getItem("user-role") ?? undefined,
      username: localStorage.getItem("user-name") ?? undefined,
      userId: typeof userId === "string" ? parseInt(userId, 10) : undefined,
      authorities: JSON.parse(localStorage.getItem("authorities") || "{}"),
    };
  },
  getters: {
    isAuthenticated: (state) => {
      if (state?.token) {
        return true;
      }

      return false;
    },
    isAdmin: (state) => {
      if (state?.role === "admin") {
        return true;
      }

      return false;
    },
    isManager: (state) => {
      if (state?.role === "manager") {
        return true;
      }

      return false;
    },
    getUsername: (state) => state?.username,
    getUserId: (state) => state?.userId,
    getAuthorities: (state) => state?.authorities,
    getToken: (state) => state?.token,
    getSettings: () => {
      return JSON.parse(
        localStorage.getItem("user-settings") || "{}"
      ) as UserSetting[];
    },
  },
  actions: {
    authLogin(res: LoginResponsePayload) {
      this.userId = res.user?.id;
      this.token = res.accessToken;
      this.username = `${res.user?.firstName} ${res.user?.lastName}`.trim();
      this.authorities = res.authorities;
      this.settings = res.user?.settings;

      localStorage.setItem("user-id", this.userId.toString());
      localStorage.setItem("user-token", this.token);
      localStorage.setItem("user-name", this.username);
      localStorage.setItem(
        "user-authorities",
        JSON.stringify(this.authorities)
      );
      localStorage.setItem("user-settings", JSON.stringify(this.settings));

      let isUser = false;
      let isAdmin = false;
      let isManager = false;
      let isGuest = false;

      if (this?.authorities) {
        for (let i = 0; i < this.authorities.length; i++) {
          if (this.authorities[i].authority === "ROLE_USER") {
            isUser = true;
          } else if (this.authorities[i].authority === "ROLE_ADMIN") {
            isAdmin = true;
          } else if (this.authorities[i].authority === "ROLE_MANAGER") {
            isManager = true;
          } else if (this.authorities[i].authority === "ROLE_GUEST") {
            isGuest = true;
          }
        }
      }

      if (isUser) {
        localStorage.setItem("user-role", "user");
        this.role = "user";
      }

      if (isAdmin) {
        localStorage.setItem("user-role", "admin");
        this.role = "admin";
      }

      if (isManager) {
        localStorage.setItem("user-role", "manager");
        this.role = "manager";
      }

      if (isGuest) {
        localStorage.setItem("user-role", "guest");
        this.role = "guest";
      }
    },
    authLogout() {
      this.token = undefined;
      this.role = undefined;
      this.userId = undefined;
      this.username = undefined;
      this.authorities = undefined;
      this.settings = undefined;

      localStorage.clear();
    },
  },
});

export default useAuthStore;

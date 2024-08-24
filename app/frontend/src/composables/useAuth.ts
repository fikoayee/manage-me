import { ILoginBody, IRegisterBody } from "../services/auth/auth.service";
import { AuthServiceImpl } from "../services/auth/impl/auth.service.impl";
import { ref } from "vue";
const authService = new AuthServiceImpl();

export const useAuth = () => {
  const token = ref<string | null>(localStorage.getItem("jwtToken"));

  const loadToken = () => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      token.value = storedToken;
    }
  };

  const login = async (loginBody: ILoginBody) => {
    try {
      const response = await authService.login(loginBody);
      token.value = response.data;
      localStorage.setItem("jwtToken", response.data);
      return response;
    } catch (error) {
      return null;
    }
  };

  const register = async (registerBody: IRegisterBody) => {
    try {
      const response = await authService.register(registerBody);
      return response;
    } catch (error) {
      return null;
    }
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem("jwtToken");
  };

  const isAuthenticated = () => {
    return !!token.value;
  };

  loadToken();

  return {
    login,
    register,
    logout,
    isAuthenticated,
    loadToken
  };
};

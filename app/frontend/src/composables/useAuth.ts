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

  const getAuthUser = () => {
    console.log("fafa");
    const userJson = localStorage.getItem("currUser");
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  };

  const login = async (loginBody: ILoginBody) => {
    try {
      const response = await authService.login(loginBody);
      console.log(response.data);
      localStorage.setItem("currUser", JSON.stringify(response.data.user));
      localStorage.setItem("jwtToken", response.data.token);
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
    localStorage.removeItem("currUser");
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
    loadToken,
    getAuthUser,
  };
};

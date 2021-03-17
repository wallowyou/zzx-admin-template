import { login, logout } from "@/api/user";
import { getToken, removeToken, setToken } from "@/utils/storage";
const getDefaultState = () => {
  return {
    token: getToken()
  };
};
const state = getDefaultState();
const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  REMOVE_TOKEN: state => {
    state.token = "";
  }
};
const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password, rememberMe } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, rememberMe })
        .then(response => {
          if (response.data.token) {
            const token = response.data.token;
            commit("SET_TOKEN", token);
            setToken(token);
          }
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(response => {
          if (response) {
            const code = response.code;
            if (code === 200) {
              commit("REMOVE_TOKEN");
              removeToken();
            }
          }
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

import api from '../utils/api';

const state = {
  users: [],
};

const mutations = {
  SET_USERS_LIST: (state, data) => {
    state.users = data;
  },
  DELETE_USER: (state, userIndex) => {
    state.users.splice(userIndex, 1);
  },
  EDIT_USER: (state, user) => {
    const index = state.users.findIndex((e) => e.id === user.id);
    state.users.splice(index, 1, user);
  },
  ADD_USER: (state, user) => {
    state.users.push(user);
  },
};

const actions = {
  getUsersList({ commit }) {
    api.get('/users')
      .then((resp) => {
        if (resp.data && resp.status === 200) {
          commit('SET_USERS_LIST', resp.data);
        }
        return 'success';
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async deleteUser({ commit }, index) {
    commit('DELETE_USER', index);
    return 'success';
  },
  async editUser({ commit }, user) {
    commit('EDIT_USER', user);
    return 'success';
  },
  async addUser({ commit }, user) {
    commit('ADD_USER', user);
    return 'success';
  },
};

const getters = {
  usersList: () => state.users,

};

export default {
  state,
  mutations,
  actions,
  getters,
};

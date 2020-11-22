<template>
  <div class="landing">
    <h1>Users table</h1>
    <div class="top-box">
      <div class="search-box">
        <label for="search">Search: </label>
        <input id="search" type="text" v-model.trim="search">
      </div>
      <button type="button" @click.prevent="addNewUser()">
        Add new user
      </button>
    </div>
    <UsersTable @showEditUser="openEdit" :usersListFiltered="usersListFiltered" />
    <EditUser @close="closeEdit" :user="user" v-if="showEditUser" />
    <NewUser @close="closeNew" v-if="showAddUser" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UsersTable from './Users/Table.vue';
import EditUser from './Users/Edit.vue';
import NewUser from './Users/New.vue';

export default {
  name: 'Landing',
  components: { UsersTable, EditUser, NewUser },
  data() {
    return {
      search: '',
      showEditUser: false,
      showAddUser: false,
      user: null,
    };
  },
  computed: {
    ...mapGetters(['usersList']),
    usersListFiltered() {
      return this.search
        ? this.usersList.filter((e) => e.username.toUpperCase().includes(this.search.toUpperCase()))
        : this.usersList;
    },
  },
  created() {
    this.getUsersList();
  },
  methods: {
    getUsersList() {
      this.$store.dispatch('getUsersList');
    },
    addNewUser() {
      this.$toasted.success('addNewUser');
      this.showAddUser = true;
    },
    openEdit(index) {
      this.user = this.usersListFiltered[index];
      this.showEditUser = !!this.user;
    },
    closeEdit() {
      this.user = null;
      this.showEditUser = false;
    },
    closeNew() {
      this.user = null;
      this.showAddUser = false;
    },
  },
};
</script>

<style scoped>
.landing {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.top-box {
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-bottom: 20px;
}
</style>

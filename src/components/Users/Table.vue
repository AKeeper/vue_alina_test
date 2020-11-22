<template>
  <div class="user-table">
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>User Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Website</th>
        <!--        <th>Company</th>-->
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(item, index) in usersListFiltered"
          :key="item.id"
          class="item_coin"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
        <td>
          <div v-if="item.address">
            <span v-if="item.address.zipcode">{{ item.address.zipcode }}</span>,
            <span v-if="item.address.city">City: {{ item.address.city }}</span>,
            <span v-if="item.address.street">{{ item.address.street }} str.</span>,
            <span v-if="item.address.suite">{{ item.address.suite }}</span>
          </div>
        </td>
        <td>{{ item.phone }}</td>
        <td>
          <a href="item.website" rel="nofollow noopener noreferrer" target="_blank">
            {{ item.website }}
          </a>
        </td>
        <!--<td>-->
        <!--  <div v-if="item.company">-->
        <!--    <span v-if="item.company.name">{{ item.company.name }}</span><br>-->
        <!--    <span v-if="item.company">Catchphrase{{ item.company.catchPhrase }}</span><br>-->
        <!--    <span v-if="item.company.bs">{{ item.company.bs }} str.</span>,-->
        <!--  </div>-->
        <!--</td>-->
        <td>
          <div class="buttons">
            <button
                type="button"
                @click.prevent="editUser(index)"
                :disabled="disableButton && (findUser && item.id === findUser.id)"
            >
              Edit
            </button>
            <button
                type="button"
                @click.prevent="deleteUser(index)"
                :disabled="disableButton && (findUser && item.id === findUser.id)"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    usersListFiltered: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      disableButton: false,
    };
  },
  computed: {
    findUser() {
      return this.usersListFiltered[this.userIndex];
    },
  },
  created() {
    this.getUsersList();
  },
  methods: {
    getUsersList() {
      this.$store.dispatch('getUsersList');
    },
    deleteUser(index) {
      this.disableButton = true;
      this.userIndex = index;
      const user = this.findUser;
      this.$store.dispatch('deleteUser', index)
        .then(() => {
          this.$toasted.success(`User "${user.name}" deleted`);
          this.userIndex = null;
          this.disableButton = false;
        });
    },
    editUser(index) {
      this.$emit('showEditUser', index);
    },
  },
};
</script>

<style scoped>
.user-table {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
table, th, td {
  border: 1px solid lightgrey;
  border-collapse: collapse;
}

tr {
  padding: 5px 0;
}

td {
  text-align: left;
}

.buttons {
  display: flex;
  flex-direction: row;
}
</style>

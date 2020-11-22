<template>
  <div class="user-form">
    <div class="title">
      <h2>Edit user</h2>
    </div>
    <form class="form" @submit.prevent="submit()">
      <div class="form-row">
        <label for="name">
          Name:
        </label>
        <input required id="name" type="text" v-model.trim="editedUser.name">
      </div>
      <div class="form-row">
        <label for="username">
          User name:
        </label>
        <input required id="username" type="text" v-model.trim="editedUser.username">
      </div>
      <div class="form-row">
        <label for="email">
          Email:
        </label>
        <input required id="email" type="email" v-model.trim="editedUser.email">
      </div>
      <div class="form-row buttons">
        <button @click.prevent="cancel" type="cancel">Cancel</button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      disableButton: false,
      editedUser: {
        name: '',
        username: '',
        email: '',
      },
    };
  },
  mounted() {
    if (this.user) this.editedUser = { ...this.user };
  },
  methods: {
    submit() {
      this.$emit('confirm', this.editedUser);
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
  .user-form {
    background-color: white;
    padding: 25px 30px;
    width: 400px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
  }
  .form-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
  .form-row label {
    white-space: nowrap;
    margin-right: 2px;
  }
  .form-row input {
    width: 50%;
    align-self: flex-end;
  }
</style>

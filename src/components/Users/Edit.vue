<template>
  <div class="user-edit" @click.exact="close()">
    <div @click.stop="" class="form">
      <Form
          @cancel="close"
          @confirm="editUser"
          :user="user"
      />
    </div>
  </div>
</template>

<script>
import Form from './Form.vue';

export default {
  name: 'Edit',
  components: { Form },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      disableButton: false,
    };
  },
  methods: {
    editUser(user) {
      this.$store.dispatch('editUser', user)
        .then(() => {
          this.$toasted.success('User edited');
          this.$emit('close');
        });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.user-edit {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(128, 128, 128, .5);
}
</style>

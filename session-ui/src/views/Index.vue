<template>
  <v-app>
    <v-app-bar
      app
      color="blue darken-3"
      dark
      dense
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-0"
      >
        <span
          class="hidden-sm-and-down pointer-cursor">
          FAST CAMPUS DevOps Tutorial
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content
      :style="{
        'padding-top':'46px',
        'background' : '#f7f8f9'
      }">
      <keep-alive>
        <div class="pl-3 pr-3" style="height: 100%">
          <router-view />
        </div>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'Index',
    components: {},
    computed: {},
    created () {
    },
    watch: {},
    data () {
      return {}
    },
    methods: {}
  }
</script>
<style lang="sass">
</style>

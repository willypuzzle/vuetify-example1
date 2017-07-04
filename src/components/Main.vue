<template>
  <v-app id="example-2">
    <v-navigation-drawer persistent light :mini-variant.sync="mini" v-model="drawer">
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-item v-for="(item, index) in items" :key="item">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple @click.native="clickLink(index)" :to="{name: 'Hello'}">
                <v-icon>{{ item.actionIcon }}</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="indigo darken-4" light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <!--<div class="title">Click on sidebar to re-open.</div>-->
        <!--v-router-->
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    name: 'main-app',
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard', actionIcon: 'label_outline' },
          { title: 'About', icon: 'question_answer', actionIcon: 'label_outline' }
        ],
        mini: false,
        right: null
      }
    },
    methods: {
      clickLink (index) {
        let array = JSON.parse(JSON.stringify(this.items))
        for (let i in array) {
          if (parseInt(i) !== parseInt(index)) {
            array[i].actionIcon = 'label_outline'
          } else {
            array[i].actionIcon = 'label'
          }
        }
        this.items = array
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

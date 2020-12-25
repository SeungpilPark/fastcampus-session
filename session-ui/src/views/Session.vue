<template>
  <v-container
    id="Session"
    tag="section"
    fluid
    class="fill-height"
  >
    <v-row
      align="center"
    >
      <v-col
        cols="6"
        offset="3"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
            dense
          >
            <v-toolbar-title>장바구니 정보</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>SESSION ID</td>
                    <td>{{sessionId}}</td>
                  </tr>
                  <tr>
                    <td>장바구니 상품명</td>
                    <td>{{sessionCart ? sessionCart.name : ''}}</td>
                  </tr>
                  <tr>
                    <td>장바구니 상품수</td>
                    <td>{{sessionCart ? sessionCart.count : ''}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="6"
        offset="3"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
            dense
          >
            <v-toolbar-title>장바구니 등록</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model="cart.name"
              label="상품명"
              required
            ></v-text-field>

            <v-text-field
              v-model.number="cart.count"
              label="개수"
              required
            ></v-text-field>

            <v-btn
              @click="addCart"
              class="primary">
              등록
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import sessionAPI from '@/api/session'

  export default {
    name: 'Session',
    components: {},
    data () {
      return {
        sessionId: null,
        cart: {
          name: null,
          count: 0
        },
        sessionCart: null
      }
    },
    computed: {},
    mounted () {
      this.load()
    },
    methods: {
      async load () {
        this.sessionId = await sessionAPI.getSession()
        this.sessionCart = await sessionAPI.getCart()
      },
      async addCart () {
        await sessionAPI.addCart(this.cart)
        this.cart = {
          name: null,
          count: 0
        }
        this.load()
      }
    },
  }
</script>
<style lang="sass">
</style>

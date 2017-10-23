import Vue from 'vue'
import Vuex from 'vuex'
import ImageCollection from '../fixtures/images'

Vue.use(Vuex)

const state = {
  count: 0,
  images: ImageCollection,
  selected: [],
  ogImages: ImageCollection,
  changeList: []
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },
  SELECT (state, imgArray) {
    state.selected = imgArray
  },
  SORT (state, value) {
    state.images = [ ...value ]
  }
}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  },
  handleSelect (context, imgArray) {
    context.commit('SELECT', imgArray)
  },
  sortImages (context, value) {
    context.commit('SORT', value)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store

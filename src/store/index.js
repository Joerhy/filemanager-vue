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
  SORT_IMAGES (state, value) {
    state.images = [ ...value ]
  },
  UPDATE_CHANGES (state, changeList) {
    state.changeList = [ ...changeList ]
  },
  UPDATE_IMAGES (state, images) {
    state.images = [ ...images ]
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
    context.commit('SORT_IMAGES', value)
  },
  updateChanges (context, changeList) {
    context.commit('UPDATE_CHANGES', changeList)
  },
  updateImages (context, images) {
    context.commit('UPDATE_IMAGES', images)
  }
}

// FIXME: These are used by components and mutators and should be global app vars/functions
// probably just stick them in the App data option and refer to them via this.$data

// function getImageById (id) {
//   var elementPos = this.getImageIndexById(id)
//   return this.$store.state.images[elementPos]
// }
//
// function getImageIndexById (id) {
//   return this.$store.state.images.map(function (image) {
//     return image.id
//   }).indexOf(id)
// }
const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store

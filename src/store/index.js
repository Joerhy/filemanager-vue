import Vue from 'vue'
import Vuex from 'vuex'
import ImageCollection from '../fixtures/images'

Vue.use(Vuex)

const state = {
  count: 0,
  images: ImageCollection,
  selected: []
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },
  SELECT (state, id) {
    state.selected = []
    state.selected.push(getImageById(id))
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
  handleSelect (context, id) {
    context.commit('SELECT', id)
  },
  sortImages (context, value) {
    context.commit('SORT', value)
  }
}

// helpers ... TODO: consider moving to a separate module
function getImageById (id) {
  var elementPos = getImageIndexById(id)
  return state.images[elementPos]
}

function getImageIndexById (id) {
  return state.images.map(function (image) {
    return image.id
  }).indexOf(id)
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store

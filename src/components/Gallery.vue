<template>
  <div class="content">
    <div class="gallery_controls">
      Select:
      <button id="select_all_btn" class="btn btn-default btn-sm"><i class="fa fa-th"></i> All</button>
      <button id="select_none_btn" class="btn btn-default btn-sm"><i class="fa fa-th fa-inverse"></i> None</button>
      <button id="select_alternate_btn" class="btn btn-default btn-sm"><i class="fa fa-th fa-inverse"></i> Alternate</button>
      <button id="select_inverse_btn" class="btn btn-default btn-sm"><i class="fa fa-th fa-inverse"></i> Inverse</button>
      <div id="img_sizer">
        <i class="fa fa-image"></i>
        <input style="display:inline-block;" type="range" min="40" max="400" value="200">
        <i class="fa fa-image fa-lg"></i>
      </div>
    </div>
    <draggable v-model="thumbnails" tag="div" name="list-complete" class="img_gallery">
        <div @click.capture="select(thumbnail.id, $event)" class="thumbnail" v-bind:class="{ selected: isSelected(thumbnail) }" v-for="thumbnail in thumbnails" :key="thumbnail.id">
          <img :src="thumbnail.url" class="thumb">
          <div class="caption">
            {{thumbnail.label}}
          </div>
        </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'thumbnails',
  components: {
    draggable
  },
  computed: {
    thumbnails: {
      get () {
        return this.$store.state.images
      },
      set (value) {
        this.$store.dispatch('sortImages', value)
      }
    }
  },
  methods: {
    select: function (id, event) {
      var selected = []
      if (event.metaKey) {
        selected = this.$store.state.selected.map(function (item) { return item.id })
        selected.push(id)
        this.$store.dispatch('handleSelect', selected)
      } else {
        if (this.$store.state.selected.length === 1 && event.shiftKey) {
          var first = this.getImageIndexById(this.$store.state.selected[0].id)
          var second = this.getImageIndexById(id)
          var min = Math.min(first, second)
          var max = Math.max(first, second)
          for (var i = min; i <= max; i++) {
            selected.push(this.$store.state.images[i].id)
          }
          this.$store.dispatch('handleSelect', selected)
        } else {
          this.$store.dispatch('handleSelect', [id])
        }
      }
    },
    isSelected: function (thumbnail) {
      if (this.$store.state.selected.indexOf(thumbnail) > -1) {
        return true
      } else {
        return false
      }
    },
    getImageIndexById: function (id) {
      return this.$store.state.images.map(function (image) {
        return image.id
      }).indexOf(id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

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
    <div class="img_gallery">
      <div class="thumbnail" v-for="thumbnail in thumbnails" :key="thumbnail.id">
        <img :src="thumbnail.url" class="thumb">
        <div class="caption">
          {{thumbnail.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'thumbnails',
  computed: {
    thumbnails () {
      return this.$store.state.images
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

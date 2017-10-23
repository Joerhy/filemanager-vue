<template>
  <div class="controls">
    <div v-if="hidden" id="orderChangedIcon" class="alert alert-info" role="alert">
      <i class="fa fa-exchange"></i> Page order has changed.
    </div>
    <button id="save_btn" type="button" class="btn btn-lg btn-primary disabled">
      Save
    </button>
  </div>
</template>

<script>
export default {
  name: 'controls',
  data: function () {
    return {
      hidden: this.orderChanged
    }
  },
  computed: {
    orderChanged: function () {
      var ogOrder = JSON.stringify(this.$store.state.ogImages.map(img => img.id))
      var imgOrder = JSON.stringify(this.$store.state.images.map(img => img.id))
      this.hidden = ogOrder !== imgOrder
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

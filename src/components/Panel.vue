<template>
  <div class="formPanel actions">
    <p v-if="selectedTotal === 0" id="noneSelected" class="formContent">No items selected. Next val: {{ nextVal }}</p>
    <!-- Multiple Selected Form-->
    <div v-if="selectedTotal > 1" id="multiSelected" >
      <h2>Generate Labels <small>for selected items</small></h2>
      <form class="formContent form-inline">
        <div id="preview" class="row"><p class="text-muted">Example: </p></div>
        <div class="row">
          <div class="form-group">
            <label class="control-label" for="unitLabel">Unit Label</label>
            <input type="text" name="label" id="unitLabel" value="" placeholder="p." class="form-control">
          </div>
          <div class="form-group">
            <label class="control-label" for="startNum">Starting Numeral</label>
            <input type="text" name="label" id="startNum" value="" placeholder="10" class="form-control">
          </div>
          <div class="form-group">
           <div class="checkbox">
             <label>
               <input id="addBrackets" type="checkbox" value="">
               Add Brackets <a href="#">(?)</a>
             </label>
           </div>
          </div>
        </div>
        <div class="row">
          <div class="form-group">
            <label class="control-label" for="labelMethod">Labeling Method</label>
            <select id="labelMethod" class="form-control">
              <option value="paginate">Paginate (Default)</option>
              <option value="foliate">Foliate</option>
            </select>
          </div>
          <fieldset disabled>
            <div class="form-group">
              <label class="control-label" for="frontLabel">Front Label</label>
              <input type="text" name="frontLabel" id="frontLabel" value="" placeholder="(recto)" class="form-control">
            </div>
            <div class="form-group">
              <label class="control-label" for="backLabel">Back Label</label>
              <input type="text" name="backLabel" id="backLabel" value="" placeholder="(verso)" class="form-control">
            </div>
          </fieldset>
        </div>
        <div class="row">
          <button id="save_btn" type="button" class="btn btn-primary">
            Apply
          </button>
        </div>
      </form>
    </div>
    <!-- Single Selected Form-->
    <form v-if="selectedTotal === 1" id="singleSelected" class="formContent form-horizontal">
       <div class="form-group">
          <label class="control-label" for="label">Label</label>
          <input @input="updateSingleLabel($event)" v-model="singleForm.label" type="text" name="label" id="label" value="1" class="form-control">
       </div>
       <div class="form-group">
       <label class="control-label" for="pageType">Page Type</label>
          <select id="pageType" class="form-control">
          <option value="single">Single Page (Default)</option>
          <option value="non-paged">Non-Paged</option>
          <option value="facing">Facing Pages</option>
        </select>
      </div>
      <div class="form-group">
        <div class="checkbox">
          <label>
            <input id="isThumb" type="checkbox" value="">
            Set as Thumbnail <a href="#">(?)</a>
          </label>
      </div>
        <div class="checkbox">
          <label>
            <input id="isStart" type="checkbox" value="">
            Set as Start Page <a href="#">(?)</a>
          </label>
        </div>
      </div>
      <input id="canvas_id" type="hidden" name="canvas_id">
    </form>
  </div>
</template>

<script>

import Lablr from 'page-label-generator'
var gen = Lablr.pageLabelGenerator()

export default {
  name: 'panel',
  computed: {
    selectedTotal () {
      return this.$store.state.selected.length
    },
    singleForm () {
      return {
        label: this.$store.state.selected[0].label,
        id: this.$store.state.selected[0].id
      }
    },
    nextVal () {
      return gen.next().value
    }
  },
  methods: {
    updateSingleLabel () {
      var changeList = this.$store.state.changeList
      // changeList.push(this.singleForm.map(form => form.id))

      var images = this.$store.state.images
      for (let i = 0; i < this.selectedTotal; i++) {
        var index = this.$store.state.images.map(function (img) {
          return img.id
        }).indexOf(this.$store.state.selected[i].id)
        images[index].label = this.singleForm.label

        if (changeList.indexOf(this.$store.state.selected[i].id) === -1) {
          changeList.push(this.$store.state.selected[i].id)
        }
      }
      this.$store.dispatch('updateChanges', changeList)
      this.$store.dispatch('updateImages', images)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.form-inline fieldset {
  display: inline-block;
}

.form-inline .row {
  margin-top:15px;
}

</style>

<template>
  <div class="sidebar">
    <div>
      <h2>Draggable Wrapper</h2>
      <draggable v-model="exampleList">
        <transition-group tag="div" name="list-complete">
          <div class="drag-item" v-for="text in exampleList" :key="text.message">
            {{ text.message }}
          </div>
        </transition-group>
      </draggable>
    </div>
    <div id="detail" class="actions">
      <img id="detail_img" src=""></img>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'detail',
  components: {
    draggable
  },
  data () {
    return {
      exampleList: [
        { message: 'Item 1' },
        { message: 'Item 2' },
        { message: 'Item 3' },
        { message: 'Item 4' },
        { message: 'Item 5' }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.drag-item {
  background-color: #333;
  margin: 5px;
  color: white;
  cursor: move;
}
</style>

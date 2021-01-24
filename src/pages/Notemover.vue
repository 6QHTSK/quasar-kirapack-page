
<template>
  <div class="row justify-center">
    <div class="column q-gutter-sm" style="padding-top:1%;width: 1000px; max-width: 80vw">
      <div>
          <q-input
            v-model.number="offset"
            type="number"
            label="位移量"
            outlined
            style="max-width: 200px"
          />
      </div>
      <div>
          <q-input type="textarea" v-model="inputstr" label="转换前bestdori谱面" outlined clearable></q-input>
      </div>
      <div>
          <q-btn color="primary" @click="fix" class="full-width">位移并复制到剪贴板</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
export default {
  data: function () {
    return {
      offset: 0,
      inputstr: '',
      loading: false
    }
  },
  methods: {
    fix () {
      var inputjson
      this.loading = true
      try {
        inputjson = JSON.parse(this.inputstr)
      } catch (err) {
        this.$q.notify('谱面错误')
      }
      for (const note of inputjson) {
        if ('beat' in note && !(note.type === 'System' && note.beat === 0)) {
          note.beat = note.beat + this.offset
        }
      }
      const vm = this
      copyToClipboard(JSON.stringify(inputjson)).then(() => { vm.$q.notify('已复制到剪贴版中') }).catch(() => { vm.$q.notify('复制失败') })
      this.loading = false
    }
  }
}
</script>

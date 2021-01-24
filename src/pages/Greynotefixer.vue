<template>
  <div class="row justify-center">
    <div class="column q-gutter-sm" style="padding-top:1%;width: 1000px; max-width: 80vw">
      <div>
          <q-select v-model="accuracystr" :options="options" outlined label="去除精度" style="width:200px">
          </q-select>
      </div>
      <div>
          <q-input type="textarea" v-model.lazy="inputstr" label="转换前bestdori谱面" outlined></q-input>
      </div>
      <div>
          <q-btn :loading="loading" color="primary" @click="fix" class="full-width">修复并复制到剪贴板</q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { copyToClipboard } from 'quasar'
export default {
  data: function () {
    return {
      accuracystr: '12',
      inputstr: '',
      loading: false,
      options: [
        {
          label: '1/4（强力去灰键）',
          value: '4'
        },
        {
          label: '1/12（推荐）',
          value: '12'
        },
        {
          label: '1/24（含有96分音）',
          value: '24'
        },
        {
          label: '1/48（含有192分音)',
          value: '48'
        }
      ]
    }
  },
  methods: {
    fix () {
      var accuracy, inputjson
      this.loading = true
      try {
        inputjson = JSON.parse(this.inputstr)
      } catch (err) {
        this.$q.notify('谱面错误')
        this.loading = false
        return
      }
      if (this.accuracystr === '12') {
        accuracy = 12
      } else if (this.accuracystr === '24') {
        accuracy = 24
      } else if (this.accuracystr === '4') {
        accuracy = 4
      } else {
        accuracy = 48
      }
      // console.log(this.accuracystr)
      for (const note of inputjson) {
        if ('beat' in note) {
          note.beat = Math.round(note.beat * accuracy) / accuracy
        }
      }
      const vm = this
      copyToClipboard(JSON.stringify(inputjson)).then(() => { vm.$q.notify('已复制到剪贴版中') }).catch(() => { vm.$q.notify('复制失败') })
      this.loading = false
    }
  }
}
</script>

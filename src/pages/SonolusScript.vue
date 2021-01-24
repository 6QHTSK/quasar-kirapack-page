
<template>
  <div class="row justify-center">
    <div class="column" style="padding-top:1%;width: 1000px; max-width: 80vw">
      <div class="q-gutter-sm">
        <div>
            <q-input type="textarea" v-model.lazy="inputstr" label="bestdori谱面" outlined></q-input>
        </div>
        <div>
            <q-btn color="primary" @click="transform(outputClipBoard)" class="full-width">复制Sonolus脚本到剪贴板</q-btn>
        </div>
        <div>
          <q-btn color="primary" @click="transform(outputFile)" class="full-width">下载Sonolus脚本</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipboard, exportFile } from 'quasar'
export default {
  data: function () {
    return {
      inputstr: '',
      loading: false
    }
  },
  methods: {
    transform (func) {
      var vm = this
      var inputjson
      this.loading = true
      try {
        inputjson = JSON.parse(this.inputstr)
      } catch (err) {
        this.$message('谱面错误')
      }
      this.$axios.post('https://api.ayachan.fun/Sonolus/Script', { data: inputjson }).then(res => {
        console.log(res.data)
        func(JSON.stringify(res.data))
        vm.loading = false
      }
        // eslint-disable-next-line handle-callback-err
      ).catch(err => {
        vm.$q.notify({ message: '服务器错误或无法连接服务器', type: 'Error' })
        vm.loading = false
      })
    },
    outputClipBoard (data) {
      const vm = this
      copyToClipboard(data).then(() => { vm.$q.notify('已复制到剪贴版中') }).catch(() => { vm.$q.notify('复制失败') })
    },
    outputFile (data) {
      const status = exportFile('level.json', data)
      if (status === true) {
        this.$q.notify('下载成功')
      } else {
        this.$q.notify('下载失败')
      }
    }
  }
}
</script>

<template>
  <div class="column" style="padding-left:1%;padding-right:1%;padding-top:1%">
    <div class="q-gutter-sm">
        <div class="row q-gutter-sm ">
          <div style="padding-left=10px"></div>
          <q-input v-model.number="bestdoriid" type="number" label="Bestdori官谱id" outlined @keyup.enter.native="pullbdchart()" style="width:200px">
          </q-input>
          <q-select v-model="diff" :options="options" label="难度" outlined style="width:200px" :disable="bestdoriid >= 500">
          </q-select>
        </div>
      <div>
        <q-btn :loading="onloading" color="primary" class="full-width" @click="pullbdchart()">拉取</q-btn>
      </div>
      <div>
          <q-input type="textarea" v-model="outputstr" label="bestdori谱面" outlined readonly></q-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      bestdoriid: 1,
      diff: 'expert',
      outputstr: '',
      onloading: false,
      options: ['easy', 'normal', 'hard', 'expert', 'special']
    }
  },
  methods: {
    outputchange (e) {
      this.outputstr = this.constoutput
    },
    pullbdchart () {
      this.onloading = true
      // const diffstr = ['easy', 'normal', 'hard', 'expert', 'special']
      const diffconvert = { easy: 0, normal: 1, hard: 2, expert: 3, special: 4 }
      var vm = this
      const url = 'https://api.ayachan.fun/ChartNotes?id=' + this.bestdoriid + '&diff=' + diffconvert[this.diff]
      this.$axios.get(url).then(function (res) {
        vm.onloading = false
        if (res.status === 200) {
          if (res.data.result) {
            if (vm.bestdoriid > 500) {
              // vm.diff = diffstr[res.data.post.diff]
              vm.outputstr = JSON.stringify(res.data.data)
            } else {
              vm.outputstr = JSON.stringify(res.data.data)
            }
          } else {
            vm.$q.notify({ message: '谱面id/难度输入错误', color: 'negative', position: 'top' })
          }
        } else {
          vm.$q.notify({ message: '拉取资源失败', color: 'negative' })
        }
      }
      )
    }
  }
}
</script>

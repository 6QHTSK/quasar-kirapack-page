<template>
  <div class="column" style="padding-left:1%;padding-right:1%;padding-top:1%">
    <div class="q-gutter-sm">
      <div>
          <q-select v-model="accuracystr" :options="options" outlined label="去除精度" style="width:300px">
          </q-select>
      </div>
      <div>
          <q-input type="textarea" v-model="inputstr" label="转换前bestdori谱面" outlined></q-input>
      </div>
      <div>
          <q-btn :loading="loading" color="primary" @click="fix" class="full-width">修复</q-btn>
      </div>
      <div>
          <q-input type="textarea" v-model="outputstr" label="转换后bestdori谱面" outlined readonly></q-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      accuracystr: '12',
      inputstr: '',
      outputstr: '',
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
        this.$message('谱面错误')
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
      this.outputstr = JSON.stringify(inputjson)
      this.loading = false
    }
  }
}
</script>

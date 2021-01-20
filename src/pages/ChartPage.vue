
<template>
  <div class="column" style="padding-left:1%;padding-right:1%;padding-top:1%">
    <div class="q-gutter-sm">
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
        <q-btn color="primary" @click="fix" class="full-width">位移</q-btn>
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
      offset: 0,
      inputstr: '',
      outputstr: '',
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
        this.$message('谱面错误')
      }
      for (const note of inputjson) {
        if ('beat' in note && !(note.type === 'System' && note.beat === 0)) {
          note.beat = note.beat + this.offset
        }
      }
      this.outputstr = JSON.stringify(inputjson)
      this.loading = false
    }
  }
}
</script>

<template>
  <div class="row justify-center" style="">
    <div class="column q-gutter-sm" style="padding-top:1%;width: 900px; max-width: 80vw">
      <div>
          <q-input label="谱面搜索" v-model="inputstr" class="full-width" @keyup.enter.native="startSearch" :readonly="loading">
            <template v-slot:append>
              <q-btn round flat icon="search" @click="startSearch"/>
            </template>
          </q-input>
      </div>
      <div>
          <q-btn :loading="loading" color="primary" @click="startSearch" class="full-width">搜索</q-btn>
      </div>
      <q-infinite-scroll @load="onLoad" :offset="250" v-if="search === true" v-show="loading === false && items.length > 0">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-center" style="max-width: 270px">[ID] 曲名</th>
              <th class="gt-sm text-center" style="max-width: 270px">艺术家</th>
              <th class="gt-sm text-center" style="max-width: 270px">谱师</th>
              <th class="gt-xs text-center" style="max-width: 90px">难度</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" class="caption">
              <td class="text-center ellipsis" style="max-width: 270px"> [{{item.id}}] {{item.title}}</td>
              <td class="gt-sm text-center ellipsis" style="max-width: 270px">{{item.artists}}</td>
              <td class="gt-sm text-center ellipsis" style="max-width: 270px">
                <span v-if="item.nickname==null">{{item.username}}</span>
                <span v-else>{{item.nickname}}@{{item.username}}</span>
              </td>
              <td class="gt-xs text-center ellipsis" style="max-width: 90px">{{item.level}}</td>
            </tr>
          </tbody>
        </q-markup-table>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
      <div class="text-center" v-if="items.length === 0" v-show="search === true && loading === false">
        什么也没有找到……
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      inputstr: '',
      search: false,
      loading: false,
      items: []
    }
  },
  methods: {
    onLoad (index, done) {
      const vm = this
      this.$axios.get('https://service-lq7cn542-1300838857.gz.apigw.tencentcs.com/bestdori-search', {
        params: {
          keywords: this.inputstr,
          page: (index - 1).toString()
        }
      }).then(res => {
        vm.items = vm.items.concat(res.data.songList)
        vm.loading = false
        if (res.data.pageCount === index) {
          done(true)
        } else {
          done(false)
        }
      })
    },
    startSearch () {
      this.search = false
      this.loading = true
      setTimeout(() => {
        this.search = true
      }, 1000)
    }
  }
}
</script>

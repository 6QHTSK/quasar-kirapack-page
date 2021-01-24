<template>
  <div>
    <q-card style="margin: 10px 10px 10px">
        <q-card-section style="text-align: center;">
            目前追踪中的谱师： {{results["chartercount"]}}；
            <br class="lt-sm"/>
            目前社区的谱面：{{results["chartcount"]}}；
            <br class="xs"/>
            有效的谱面：{{results["validchartcount"]}}；<br/>
            数据库更新于：{{results["time"]}}
            <span class="orientation-portrait"><br/>使用电脑窗口最大化或手机横屏以获得更好体验</span>
        </q-card-section>
    </q-card>
    <q-card>
      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab label="查询" name="0"/>
        <q-tab label="获赞最多的谱面" name="1"/>
        <q-tab label="时间最长的谱面" name="2"/>
        <q-tab label="物量最多的谱面" name="3"/>
        <q-tab label="最发狂的谱面" name="4"/>
        <q-tab label="发谱/获赞最多的谱师" class="gt-sm" name="5"/>
        <q-tab label="发谱最多的谱师" class="lt-md" name="5"/>
        <q-tab label="获赞最多的谱师" class="lt-md" name="6"/>
        <q-tab label="EX/SP难度最高/最低的谱师" class="gt-sm" name="7"/>
        <q-tab label="EX/SP难度最高的谱师" class="lt-md" name="7"/>
        <q-tab label="EX/SP难度最低的谱师" class="lt-md" name="8"/>
        <q-tab label="最热门的单曲/艺术家" class="gt-sm" name="9"/>
        <q-tab label="最热门的单曲" class="lt-md" name="9"/>
        <q-tab label="最热门的艺术家" class="lt-md" name="10"/>
      </q-tabs>
      <q-separator />
        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="0">
                <div class="column q-gutter-sm justify-evenly">
                    <q-select filled v-model="searchuser" use-input hide-selected fill-input input-debounce="200" :options="options" @filter="filterFn" :loading="searchload"
                    style="padding-bottom: 32px" label="谱师名" @input="handleSelect" hint="在此输入需要查询的谱师，并在出现下拉框中选择,如无查询的谱师可能不满足条件未被网站记录">
                        <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                            找不到谱师
                            </q-item-section>
                        </q-item>
                        </template>
                    </q-select>
                </div>
                <q-separator v-if="searchsee"/>
                <!--div v-if="searchsee" class="q-gutter-sm fit row wrap justify-evenly items-start" style="padding-top:20px">
                    <q-card style="width:300px">
                        <q-card-section style="text-align:center">
                            <span style="font-size:large">有效谱面</span>
                            <q-separator/>
                            <span style="font-size:large">#{{searchres["chartcount"][0]}} / {{searchres["chartcount"][1]}}</span>
                        </q-card-section>
                    </q-card>
                    <q-card style="width:300px">
                        <q-card-section style="text-align:center">
                            <span style="font-size:large">获赞数</span>
                            <q-separator/>
                            <span style="font-size:large">#{{searchres["likecount"][0]}} / {{searchres["likecount"][1]}}</span>
                        </q-card-section>
                    </q-card>
                    <q-card style="width:300px">
                        <q-card-section style="text-align:center">
                            <span style="font-size:large">EX/SP平均难度</span>
                            <q-separator/>
                            <span v-if='searchres["highdiffcount"][0] < searchres["lowdiffcount"][0]' style="color:#F56C6C;font-size:large">
                                #DESC {{searchres["highdiffcount"][0]}} / {{searchres["highdiffcount"][1].toFixed(2)}}</span>
                            <span v-else style="color:#67C23A;font-size:large">#ASC {{searchres["lowdiffcount"][0]}} / {{searchres["lowdiffcount"][1].toFixed(2)}}</span>
                        </q-card-section>
                    </q-card>
                    <q-card style="width:300px">
                        <q-card-section style="text-align:center">
                            <span style="font-size:large">最后更新</span>
                            <q-separator/>
                            <span style="font-size:large">{{searchres["lastupdate"]}}</span>
                        </q-card-section>
                    </q-card>
                </div-->
                <div v-if="searchsee" style="padding-top:20px">
                    <q-tabs v-model="tab2" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                        <q-tab label="基本信息" name="0"/>
                        <q-tab label="最受欢迎谱面" name="1"/>
                        <q-tab label="最新谱面" name="2"/>
                        <q-tab label="最长谱面" name="3"/>
                        <q-tab label="密度最大谱面" name="4"/>
                        <q-tab label="物量最多谱面" name="5"/>
                    </q-tabs>
                </div>
                <q-separator v-if="searchsee"/>
                <q-tab-panels v-model="tab2" animated v-if="searchsee">
                    <q-tab-panel name="0">
                      <q-markup-table>
                        <tbody>
                        <tr>
                          <td>谱师名</td>
                          <td>{{searchuser["label"]}}</td>
                        </tr>
                        <tr>
                          <td>排名/总谱面数</td>
                          <td>#{{searchres["chartcount"][0]}} / {{searchres["chartcount"][1]}}</td>
                        </tr>
                        <tr>
                          <td>排名/总获赞数</td>
                          <td>#{{searchres["likecount"][0]}} / {{searchres["likecount"][1]}}</td>
                        </tr>
                        <tr>
                          <td>排名/谱面难度</td>
                          <td v-if='searchres["highdiffcount"][0] < searchres["lowdiffcount"][0]' style="color:#f56c6c">
                                #DESC {{searchres["highdiffcount"][0]}} / {{searchres["highdiffcount"][1].toFixed(2)}}</td>
                          <td v-else style="color:#67C23A">#ASC {{searchres["lowdiffcount"][0]}} / {{searchres["lowdiffcount"][1].toFixed(2)}}</td>
                        </tr>
                        <tr>
                          <td>最后更新</td>
                          <td>{{searchres["lastupdate"]}}</td>
                        </tr>
                        </tbody>
                      </q-markup-table>
                    </q-tab-panel>
                    <q-tab-panel name="1">
                        <q-markup-table>
                            <thead>
                                <tr>
                                    <th class="gt-xs text-center">排名</th>
                                    <th class="text-center">曲名 [ID]</th>
                                    <th class="gt-md text-center">艺术家</th>
                                    <th class="gt-xs text-center">获赞数</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for='row in searchres["likechartcount"]' v-bind:key="row[0]">
                                    <td class="gt-xs text-center">{{row[0]}}</td>
                                    <td class="text-center">{{row[3]}} [{{row[1]}}]</td>
                                    <td class="gt-md text-center">{{row[4]}}</td>
                                    <td class="gt-xs text-center">{{row[5]}}</td>
                                </tr>
                            </tbody>
                        </q-markup-table>
                    </q-tab-panel>
                    <q-tab-panel name="2">
                        <q-markup-table>
                            <thead>
                                <tr>
                                    <th class="gt-xs text-center">排名</th>
                                    <th class="text-center">曲名 [ID]</th>
                                    <th class="gt-md text-center">艺术家</th>
                                    <th class="gt-sm text-center">时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for='row in searchres["lastupdatechart"]' v-bind:key="row[0]">
                                    <td class="gt-xs text-center">{{row[0]}}</td>
                                    <td class="text-center">{{row[3]}} [{{row[1]}}]</td>
                                    <td class="gt-md text-center">{{row[4]}}</td>
                                    <td class="gt-sm text-center">{{row[5]}}</td>
                                </tr>
                            </tbody>
                        </q-markup-table>
                    </q-tab-panel>
                    <q-tab-panel name="3">
                        <q-markup-table>
                            <thead>
                                <tr>
                                    <th class="gt-xs text-center">排名</th>
                                    <th class="text-center">曲名 [ID]</th>
                                    <th class="gt-md text-center">艺术家</th>
                                    <th class="gt-xs text-center">时长</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for='row in searchres["lencount"]' v-bind:key="row[0]">
                                    <td class="gt-xs text-center">{{row[0]}}</td>
                                    <td class="text-center">{{row[3]}} [{{row[1]}}]</td>
                                    <td class="gt-md text-center">{{row[4]}}</td>
                                    <td class="gt-xs text-center">
                                        <span
                                            v-if="parseInt((row[5]-60*Math.floor(row[5]/60)).toFixed(0)) >= 10">{{Math.floor(row[5]/60)}}:{{(row[5]-60*Math.floor(row[5]/60)).toFixed(0)}}</span>
                                        <span
                                            v-else>{{Math.floor(row[5]/60)}}:0{{(row[5]-60*Math.floor(row[5]/60)).toFixed(0)}}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </q-markup-table>
                    </q-tab-panel>
                    <q-tab-panel name="4">
                        <q-markup-table>
                            <thead>
                                <tr>
                                    <th class="gt-xs text-center">排名</th>
                                    <th class="text-center">曲名 [ID]</th>
                                    <th class="gt-md text-center">艺术家</th>
                                    <th class="gt-xs text-center">NPS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for='row in searchres["npscount"]' v-bind:key="row[0]">
                                    <td class="gt-xs text-center">{{row[0]}}</td>
                                    <td class="text-center">{{row[3]}} [{{row[1]}}]</td>
                                    <td class="gt-md text-center">{{row[4]}}</td>
                                    <td class="gt-xs text-center">{{row[5].toFixed(2)}}</td>
                                </tr>
                            </tbody>
                        </q-markup-table>
                    </q-tab-panel>
                    <q-tab-panel name="5">
                        <q-markup-table>
                            <thead>
                                <tr>
                                    <th class="gt-xs text-center">排名</th>
                                    <th class="text-center">曲名 [ID]</th>
                                    <th class="gt-md text-center">艺术家</th>
                                    <th class="gt-xs text-center">物量</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for='row in searchres["notecount"]' v-bind:key="row[0]">
                                    <td class="gt-xs text-center">{{row[0]}}</td>
                                    <td class="text-center">{{row[3]}} [{{row[1]}}]</td>
                                    <td class="gt-md text-center">{{row[4]}}</td>
                                    <td class="gt-xs text-center">{{row[5]}}</td>
                                </tr>
                            </tbody>
                        </q-markup-table>
                    </q-tab-panel>
                </q-tab-panels>
            </q-tab-panel>
            <q-tab-panel name="1">
                <q-markup-table>
                    <thead>
                        <tr>
                            <th class="gt-xs text-center">排名</th>
                            <th class="text-center">曲名 [ID]</th>
                            <th class="gt-md text-center">艺术家</th>
                            <th class="gt-sm text-center">谱师</th>
                            <th class="gt-xs text-center">获赞数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(row,key) in results["likechartdetail"]' v-bind:key="row[0]">
                            <td class="gt-xs text-center">{{key+1}}</td>
                            <td class="text-center">{{row[3]}} [{{row[0]}}]</td>
                            <td class="gt-md text-center">{{row[4]}}</td>
                            <td class="gt-sm text-center">
                                <span v-if="row[2]==null">{{row[1]}}</span>
                                <span v-else>{{row[2]}}@{{row[1]}}</span>
                            </td>
                            <td class="gt-xs text-center">{{row[5]}}</td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </q-tab-panel>
            <q-tab-panel name="2">
                <q-markup-table>
                    <thead>
                        <tr>
                            <th class="gt-xs text-center">排名</th>
                            <th class="text-center">曲名 [ID]</th>
                            <th class="gt-md text-center">艺术家</th>
                            <th class="gt-sm text-center">谱师</th>
                            <th class="gt-xs text-center">时长</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(row,key) in results["longestchart"]' v-bind:key="row[0]">
                            <td class="gt-xs text-center">{{key+1}}</td>
                            <td class="text-center">{{row[3]}} [{{row[0]}}]</td>
                            <td class="gt-md text-center">{{row[4]}}</td>
                            <td class="gt-sm text-center">
                                <span v-if="row[2]==null">{{row[1]}}</span>
                                <span v-else>{{row[2]}}@{{row[1]}}</span>
                            </td>
                            <td class="gt-xs text-center">
                                <span
                                    v-if="parseInt((row[5]-60*Math.floor(row[5]/60)).toFixed(0)) >= 10">{{Math.floor(row[5]/60)}}:{{(row[5]-60*Math.floor(row[5]/60)).toFixed(0)}}</span>
                                <span
                                    v-else>{{Math.floor(row[5]/60)}}:0{{(row[5]-60*Math.floor(row[5]/60)).toFixed(0)}}</span>
                            </td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </q-tab-panel>
            <q-tab-panel name="3">
                <q-markup-table>
                    <thead>
                        <tr>
                            <th class="gt-xs text-center">排名</th>
                            <th class="text-center">曲名 [ID]</th>
                            <th class="gt-md text-center">艺术家</th>
                            <th class="gt-sm text-center">谱师</th>
                            <th class="gt-xs text-center">物量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(row,key) in results["maxnotechart"]' v-bind:key="row[0]">
                            <td class="gt-xs text-center">{{key+1}}</td>
                            <td class="text-center">{{row[3]}} [{{row[0]}}]</td>
                            <td class="gt-md text-center">{{row[4]}}</td>
                            <td class="gt-sm text-center">
                                <span v-if="row[2]==null">{{row[1]}}</span>
                                <span v-else>{{row[2]}}@{{row[1]}}</span>
                            </td>
                            <td class="gt-xs text-center">{{row[5]}}</td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </q-tab-panel>
            <q-tab-panel name="4">
                <q-markup-table>
                    <thead>
                        <tr>
                            <th class="gt-xs text-center">排名</th>
                            <th class="text-center">曲名 [ID]</th>
                            <th class="gt-md text-center">艺术家</th>
                            <th class="gt-sm text-center">谱师</th>
                            <th class="gt-xs text-center">NPS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(row,key) in results["highestnpschart"]' v-bind:key="row[0]">
                            <td class="gt-xs text-center">{{key+1}}</td>
                            <td class="text-center">{{row[3]}} [{{row[0]}}]</td>
                            <td class="gt-md text-center">{{row[4]}}</td>
                            <td class="gt-sm text-center">
                                <span v-if="row[2]==null">{{row[1]}}</span>
                                <span v-else>{{row[2]}}@{{row[1]}}</span>
                            </td>
                            <td class="gt-xs text-center">{{row[5].toFixed(2)}}</td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </q-tab-panel>
            <q-tab-panel name="5">
                <div class="row justify-evenly no-wrap">
                  <q-markup-table class="col-12 col-md-5 col-lg-5 col-xl-5">
                      <thead>
                          <tr>
                              <th class="text-center">排名</th>
                              <th class="text-center">谱师</th>
                              <th class="text-center">发谱数</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for='(row,key) in results["charterdetails"]' v-bind:key="row[0]">
                              <td class="text-center">{{key+1}}</td>
                              <td class="text-center">
                                  <span v-if="row[1]==null">{{row[0]}}</span>
                                  <span v-else>{{row[1]}}@{{row[0]}}</span>
                              </td>
                              <td class="text-center">{{row[2]}}</td>
                          </tr>
                      </tbody>
                  </q-markup-table>
                  <q-markup-table class="gt-sm col-5">
                    <thead>
                    <tr>
                      <th class="text-center">排名</th>
                      <th class="text-center">谱师</th>
                      <th class="text-center">获赞数</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for='(row,key) in results["likecharterdetail"]' v-bind:key="row[0]">
                      <td class="text-center">{{key+1}}</td>
                      <td class="text-center">
                        <span v-if="row[1]==null">{{row[0]}}</span>
                        <span v-else>{{row[1]}}@{{row[0]}}</span>
                      </td>
                      <td class="text-center">{{row[2]}}</td>
                    </tr>
                    </tbody>
                  </q-markup-table>
                </div>
            </q-tab-panel>
            <q-tab-panel name="6">
                <q-markup-table>
                    <thead>
                        <tr>
                            <th class="text-center">排名</th>
                            <th class="text-center">谱师</th>
                            <th class="text-center">获赞数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(row,key) in results["likecharterdetail"]' v-bind:key="row[0]">
                            <td class="text-center">{{key+1}}</td>
                            <td class="text-center">
                                <span v-if="row[1]==null">{{row[0]}}</span>
                                <span v-else>{{row[1]}}@{{row[0]}}</span>
                            </td>
                            <td class="text-center">{{row[2]}}</td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </q-tab-panel>
            <q-tab-panel name="7">
              <div class="row justify-evenly no-wrap">
                <q-markup-table class="col-12 col-md-5 col-lg-5 col-xl-5">
                    <thead>
                        <tr>
                            <th class="text-center">排名</th>
                            <th class="text-center">谱师</th>
                            <th class="text-center">难度</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(row,key) in results["highdiffcharterdetail"]' v-bind:key="row[0]">
                            <td class="text-center">{{key+1}}</td>
                            <td class="text-center">
                                <span v-if="row[1]==null">{{row[0]}}</span>
                                <span v-else>{{row[1]}}@{{row[0]}}</span>
                            </td>
                            <td class="text-center">{{row[2].toFixed(2)}}</td>
                        </tr>
                    </tbody>
                </q-markup-table>
                <q-markup-table class="gt-sm col-5">
                  <thead>
                  <tr>
                    <th class="text-center">排名</th>
                    <th class="text-center">谱师</th>
                    <th class="text-center">难度</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for='(row,key) in results["lowdiffcharterdetail"]' v-bind:key="row[0]">
                    <td class="text-center">{{key+1}}</td>
                    <td class="text-center">
                      <span v-if="row[1]==null">{{row[0]}}</span>
                      <span v-else>{{row[1]}}@{{row[0]}}</span>
                    </td>
                    <td class="text-center">{{row[2].toFixed(2)}}</td>
                  </tr>
                  </tbody>
                </q-markup-table>
              </div>
            </q-tab-panel>
            <q-tab-panel name="8">
                <q-markup-table>
                    <thead>
                        <tr>
                            <th class="text-center">排名</th>
                            <th class="text-center">谱师</th>
                            <th class="text-center">难度</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(row,key) in results["lowdiffcharterdetail"]' v-bind:key="row[0]">
                            <td class="text-center">{{key+1}}</td>
                            <td class="text-center">
                                <span v-if="row[1]==null">{{row[0]}}</span>
                                <span v-else>{{row[1]}}@{{row[0]}}</span>
                            </td>
                            <td class="text-center">{{row[2].toFixed(2)}}</td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </q-tab-panel>
            <q-tab-panel name="9">
              <div class="row justify-evenly no-wrap">
                <q-markup-table class="col-12 col-md-5 col-lg-5 col-xl-5">
                    <thead>
                        <tr>
                            <th class="text-center">排名</th>
                            <th class="text-center">曲名</th>
                            <th class="text-center">数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(row,key) in results["heatedsongdetail"]' v-bind:key="row[0]">
                            <td class="text-center">{{key+1}}</td>
                            <td class="text-center">{{row[0]}}</td>
                            <td class="text-center">{{row[1]}}</td>
                        </tr>
                    </tbody>
                </q-markup-table>
                <q-markup-table class="gt-sm col-5">
                  <thead>
                  <tr>
                    <th class="text-center">排名</th>
                    <th class="text-center">艺术家</th>
                    <th class="text-center">数量</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for='(row,key) in results["heatedartistdetail"]' v-bind:key="row[0]">
                    <td class="text-center">{{key+1}}</td>
                    <td class="text-center">{{row[0]}}</td>
                    <td class="text-center">{{row[1]}}</td>
                  </tr>
                  </tbody>
                </q-markup-table>
              </div>
            </q-tab-panel>
            <q-tab-panel name="10">
                <q-markup-table>
                    <thead>
                        <tr>
                            <th class="text-center">排名</th>
                            <th class="text-center">艺术家</th>
                            <th class="text-center">数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(row,key) in results["heatedartistdetail"]' v-bind:key="row[0]">
                            <td class="text-center">{{key+1}}</td>
                            <td class="text-center">{{row[0]}}</td>
                            <td class="text-center">{{row[1]}}</td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </q-tab-panel>
        </q-tab-panels>
    </q-card>
</div>
</template>
<script>
export default {
  data: function () {
    return {
      onloading: false,
      searchload: false,
      searchsee: false,
      searchuser: '',
      results: {},
      searchres: {},
      users: [],
      options: [],
      diffdata: [],
      tab: '1',
      tab2: '0',
      levelconfig: { data: {} }
    }
  },
  methods: {
    outputchange (e) {
      this.outputstr = this.constoutput
    },
    pullbdchart () {
      this.$q.loading.show()
      var vm = this
      var url = 'https://api.ayachan.fun/calcData'
      this.$axios.get(url).then(function (res) {
        if (res.status === 200) {
          vm.results = res.data
          vm.users = vm.returnuser()
          // console.log(res.data)
        } else {
          vm.$q.$notify('拉取资源失败')
        }
        vm.$q.loading.hide()
      }
      )
    },
    filterFn (val, update) {
      // console.log(val)
      if (val === '') {
        update(() => {
          this.options = this.users
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.users.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    returnuser () {
      var rtr = []
      // console.log(this.results["usernames"])
      for (var i = 0; i < this.results.usernames.length; i++) {
        var name = this.results.usernames[i][0]
        var value = this.results.usernames[i][1] != null ? this.results.usernames[i][1] + '@' + this.results.usernames[i][0] : this.results.usernames[i][0]
        // console.log(this.results["usernames"][i][0])
        // if (value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
        rtr.push({ label: value, value: name })
        // }
      }
      return rtr
    },
    handleSelect (item) {
      if ('value' in item) {
        this.search(item.value)
      } else {
        this.searchsee = false
      }
      // console.log(item)
    },
    search (username) {
      this.searchload = true
      var vm = this
      var url = 'https://api.ayachan.fun/calcAuthor?author=' + username
      this.$axios.get(url).then(function (res) {
        vm.searchload = false
        if (res.status === 200) {
          vm.searchres = res.data
          if (res.data.result) {
            // console.log(res.data)
            vm.searchsee = true
          } else {
            vm.$q.notify('无此谱师或此谱师未满足条件')
          }
        } else {
          vm.$q.notify('拉取资源失败')
        }
      })
    }
  },
  mounted () {
    this.pullbdchart()
    // this.search("psk2019")
  }
}
</script>

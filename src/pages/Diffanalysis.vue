<template>
  <div class="q-px-sm justify-center">
    <div style="max-width:900px;margin:auto" class="column q-gutter-md">
      <div class="row q-gutter-sm justify-start" style="max-width: 900px; margin-left: 0px">
        <q-radio v-model="usingbestdori" dense :val="true" label="Bestdori" @input="clearinput"/>
        <q-radio v-model="usingbestdori" dense :val="false" label="自定义" @input="clearinput"/>
        <q-btn class="justify-center" dense flat @click="helpDialogue = true">使用帮助</q-btn>
        <q-dialog v-model="helpDialogue">
          <DiffAnalysisHelp></DiffAnalysisHelp>
          <!--chart-canvas></chart-canvas-->
        </q-dialog>
        <q-space/>
        <q-btn :color="returncolor(diffid)" @click="clickonbutton()" :label="diffstr[diffid]" v-show="!usingbestdori" style="width:80px">
        </q-btn>
        <q-btn icon="speed" color="secondary" v-show="!usingbestdori" round>
          <q-popup-proxy>
            <q-banner style="padding: 10px 20px;width: 20vw; min-width: 250px">
              <q-badge color="secondary">
                当前速度:{{speed}}%
              </q-badge>
              <q-slider color="secondary" v-model="speed" :min = "50" :max = "200" :step= "10" markers/>
            </q-banner>
          </q-popup-proxy>
        </q-btn>
      </div>
      <q-input v-model="bestdoriid" type="number" class="full-width" label="Bestdori谱面id" style="width: 100%;"
               @keyup.enter.native="getbestdorichart" v-if="usingbestdori">
        <template v-slot:prepend v-if="usingbestdori">
          <q-btn :color="returncolor(diffid)" @click="clickonbutton()" :label="diffstr[diffid]" style="width:80px">
          </q-btn>
        </template>
        <template v-slot:append v-if="usingbestdori">
          <q-btn icon="speed" flat round>
            <q-popup-proxy>
              <q-banner style="padding: 10px 20px;width: 20vw; min-width: 250px" >
                <q-badge color="secondary">
                  当前速度:{{speed}}%
                </q-badge>
                <q-slider color="secondary" v-model="speed" :min = "50" :max = "200" :step= "10" markers/>
              </q-banner>
            </q-popup-proxy>
          </q-btn>
        </template>
      </q-input>
      <q-input type="textarea" class="full-width" v-model.lazy="inputstr" label="bestdori谱面"
               :readonly="onloading || showdetail" outlined v-if="!usingbestdori" style="max-width: 900px">
      </q-input>
      <q-btn color="primary" @click="analysis(false)" class="full-width" :readonly="onloading || showdetail"
             :loading="onloading" v-show="!usingbestdori && !showdetail">分析
        <template v-slot:loading>
          <q-spinner-gears class="on-left"/>
          <span>计算中</span>
        </template>
      </q-btn>
      <q-btn color="primary" @click="getbestdorichart" :loading="loadingchart || onloading" class="full-width"
             v-show="usingbestdori && !showdetail">
        获取
        <template v-slot:loading>
          <q-spinner-gears class="on-left"/>
          <span v-show="loadingchart">下载中...</span>
          <span v-show="onloading">计算中...</span>
        </template>
      </q-btn>
      <q-btn color="pink-4" @click="clearinput" class="full-width" v-show="showdetail">重置</q-btn>
    </div>
    <div v-if="showdetail" class="q-gutter-sm row justify-evenly wrap items-start" style="max-width:900px;margin:auto">
        <div v-for="(subject,i) in itemSubject" :key="i" class="full-width">
          <q-separator spaced/>
          <div class="text-center text-subtitle2 full-width text-weight-bold"
                v-if="itemList[subject] && itemList[subject][0][2] != 0">{{ itemLabel[i] }}</div>
          <q-separator spaced/>
          <div class="q-col-gutter-sm row justify-evenly items-start">
            <div v-for="(item,j) in itemList[subject]" :key="j" class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3" >
              <q-card v-if="item[2] !== 0">
                <q-card-section class="text-center">
                  <div class="text-caption">
                    <span>{{ item[0] }}</span>
                  </div>
                  <q-separator/>
                  <div class="q-gutter-xs fit row justify-evenly text-subtitle2">
                    <div>
                      <span class="text-caption">{{ item[1] }}</span>
                      <span>{{ item[2] }}</span>
                      <span class="text-caption">{{ item[3] }}</span>
                    </div>
                    <div v-if='item[5]!=""'>
                      <span class="text-caption">{{ item[4] }}</span>
                      <span>{{ item[5] }}</span>
                      <span class="text-caption">{{ item[6] }}</span>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
// import func from 'app/vue-temp/vue-editor-bridge'
import diffAnalysisHelp from 'components/diffAnalysisHelp'
import chartCanvas from 'components/chartCanvas'

// eslint-disable-next-line no-unused-vars
var echarts = require('echarts')
export { default as DiffAnalysisHelp } from 'components/diffAnalysisHelp'
// eslint-disable-next-line no-unused-vars
export default {
  data: function () {
    return {
      options: [0, 1, 2, 3, 4],
      diffstr: ['Easy', 'Normal', 'Hard', 'Expert', 'Special'],
      diffid: 3, // 难度等级 EASY~EXPERT 0~3
      speed: 100,
      inputstr: '', // 从大输入框输入的谱面
      bestdoriid: 128, // 需要获取的bestdori的id
      chartjson: '', // 谱面的解析后的json文件
      diffcolor: '', // 不同难度等级对应的颜色
      bpmlow: null, // 最低的bpm
      bpmhigh: null, // 最高的bpm
      showdetail: false, // 是否打开谱面分析栏
      totaltimemin: null, // 总计的时间-分
      totaltimesec: null, // 总计的时间-秒
      onloading: false, // 是否在拉取数据
      loadingchart: false,
      usingbestdori: true,
      usinghelp: false,
      detail: null,
      diff: null,
      helpDialogue: false,
      tab: 'pressure',
      itemSubject: ['basic', 'main', 'detail'],
      itemLabel: ['基础信息', '主要部分', '详细信息'],
      itemList: {
        basic: null,
        chartReading: null,
        pressure: null,
        flick: null
      }
    }
  },
  mounted () {
    var id
    if ('id' in this.$route.params) {
      id = this.$route.params.id
    }
    // console.log(id)
    if (id !== false && id !== undefined) {
      // console.log('flag')
      this.bestdoriid = id.toString()
      this.getbestdorichart()
    }
  },
  methods: {
    analysis (flag) {
      var vm = this
      this.$forceUpdate()

      function generateTimeStr (totalMin, totalSec) {
        if (totalSec < 10) {
          return totalMin + '\'0' + totalSec
        } else {
          return totalMin + '\'' + totalSec
        }
      }

      function generateBPMStr (BPMLow, BPMHigh, MainBPM) {
        if (BPMHigh - BPMLow < 0.01) {
          return MainBPM
        } else {
          return BPMLow + '~' + BPMHigh + '(' + MainBPM + ')'
        }
      }

      function fix (num, digeit = 2) {
        if (num === 0) {
          return '--'
        } else {
          if (digeit < 0) {
            num = 1000 / num
            digeit = -digeit - 1
          }
          return num.toFixed(digeit)
        }
      }

      function procession (res) {
        console.log(res)
        if (res.data.result) {
          var rtr = res.data
          console.log(rtr)
          try {
            var totalTimeMin = Math.floor(rtr.detail.TotalTime / 60)
            var totalTimeSec = (rtr.detail.TotalTime - totalTimeMin * 60).toFixed(1)
            var totalNote = rtr.detail.TotalNote
            var totalHitNote = rtr.detail.TotalHitNote
            vm.diffid = rtr.detail.Diff
            vm.bpmLow = rtr.bpmLow
            vm.bpmHigh = rtr.bpmHigh
            if (rtr.TotalTime < 20) {
              // eslint-disable-next-line no-throw-literal
              throw '谱面长度过短'
            }
          } catch (error) {
            vm.$q.notify('分析过程错误 ' + error)
            vm.onloading = false
            return false
          }
          console.log(rtr)
          var detail = rtr.detail
          var diff = rtr.diff
          vm.itemList.basic = [ // 标题，数值前缀，数值，数值后缀，难度前缀，难度，难度后缀
            ['谱面时间', '', generateTimeStr(totalTimeMin, totalTimeSec), '', '', '', ''],
            ['总物量', '', totalNote, '', '', '', ''],
            ['总敲击次数', '', totalHitNote, '', '', '', ''],
            ['左手击打音符占比', '', fix(detail.LeftPercent * 100, 1), '%', '', '', ''],
            ['主体部分谱面占比', '', fix(detail.ActivePercent * 100, 1), '%', '', '', ''],
            ['BPM', '', generateBPMStr(detail.BPMLow, detail.BPMHigh, detail.MainBPM), '', '', '', '']
          ]
          vm.itemList.main = [
            ['主体每秒音符', '', fix(detail.ActiveNPS, 1), '个/s', '', '', ''],
            ['主体每秒击打', '', fix(detail.ActiveHPS, 1), '次/s', '', '', '']
          ]
          vm.itemList.detail = [
            ['整体每秒音符', '', fix(detail.TotalNPS, 1), '个/s', 'LV.', fix(diff.TotalNPS, 1), ''],
            ['整体每秒击打', '', fix(detail.TotalHPS, 1), '次/s', 'LV.', fix(diff.TotalHPS, 1), ''],
            ['最大单手每秒击打', '', fix(detail.FingerMaxHPS, 1), '次/s', 'LV.', fix(diff.FingerMaxHPS, 1), ''],
            ['粉键-下个键间隔', '', fix(detail.FlickNoteInterval, -1), 'ms', 'LV.', fix(diff.FlickNoteInterval, 1), ''],
            ['上个键-粉键间隔', '', fix(detail.NoteFlickInterval, -1), 'ms', 'LV.', fix(diff.NoteFlickInterval, 1), ''],
            ['最大音符密度', '', fix(detail.MaxScreenNPS, 1), '个/s', 'LV.', fix(diff.MaxScreenNPS, 1), ''],
            ['最大单手移动速度', '', fix(detail.MaxSpeed, 1), '轨/s', 'LV.', fix(diff.MaxSpeed, 1), ''],
            ['蓝白物量难度', 'LV.', fix(diff.BlueWhiteFunc, 0), '', '', '', '']
          ]
          if (rtr.detail.FingerMaxHPS == null) {
            vm.$q.notify({
              title: '单手分析错误',
              message: rtr.detail.error,
              type: 'warning'
            })
          } else {
          }
          vm.onloading = false
          vm.showdetail = true
        } else {
          vm.$q.notify('分析过程错误：' + res.data.error)
          vm.onloading = false
          return false
        }
      }

      vm.onloading = true
      var url
      if (flag) {
        url = 'https://api.ayachan.fun/DiffAnalysis?id=' + this.bestdoriid + '&speed=' + this.speed / 100
        if (this.bestdoriid < 500) {
          url = url + '&diff=' + this.diffid
        }
        this.$axios.get(url).then(res => {
          procession(res)
          // eslint-disable-next-line handle-callback-err
        }).catch(error => {
          vm.$q.notify({ message: '服务器错误或无法连接服务器', type: 'Error' })
          vm.onloading = false
        })
      } else {
        url = 'https://api.ayachan.fun/DiffAnalysis?speed=' + this.speed / 100
        try {
          var chart = JSON.parse(this.inputstr)
        } catch {
          vm.$q.notify({
            message: 'JSON解析失败',
            type: 'Warning'
          })
          vm.onloading = false
          return false
        }
        var data = {
          diff: this.diffid,
          data: chart,
          speed: 1.0
        }
        this.$axios.post(url, data).then(res => {
          procession(res)
          // eslint-disable-next-line handle-callback-err
        }).catch(function (error) {
          vm.$q.notify({ message: '服务器错误或无法连接服务器', type: 'Error' })
          vm.onloading = false
        })
      }
      return true
    },
    getbestdorichart () {
      // console.log("Function getbestdorichart do")
      this.clearinput()
      this.$forceUpdate()
      this.analysis(true)
    },
    clearinput () {
      // console.log("Function clearinput do")
      this.inputstr = ''
      this.showdetail = false
      this.totaltimemin = null // 总计的时间-分
      this.totaltimesec = null // 总计的时间-秒
      this.detail = null
      this.diff = null
      this.itemList = {
        basic: null,
        chartReading: null,
        pressure: null,
        flick: null
      }
    },
    returncolor (id) {
      var barcolor = ['blue', 'green', 'orange', 'red', 'purple']
      return barcolor[id]
    },
    clickonbutton (e) {
      this.diffid = !this.onloading && !this.showdetail ? (this.diffid + 1) % 5 : this.diffid
    }
  },
  components: {
    DiffAnalysisHelp: diffAnalysisHelp,
    // eslint-disable-next-line vue/no-unused-components
    chartCanvas: chartCanvas
  }
}
</script>

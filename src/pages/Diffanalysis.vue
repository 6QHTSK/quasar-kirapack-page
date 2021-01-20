<template>
  <div class="q-px-sm justify-center">
    <div style="max-width:900px;margin:auto" class="column q-gutter-md">
      <div class="row q-gutter-sm justify-start" style="max-width: 900px; margin-left: 0px">
        <q-radio v-model="usingbestdori" dense :val="true" label="Bestdori" @input="clearinput"/>
        <q-radio v-model="usingbestdori" dense :val="false" label="自定义" @input="clearinput"/>
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
      <q-input type="textarea" class="full-width" v-model="inputstr" label="bestdori谱面"
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
      <!--q-card class="full-width">
        <q-card-section horizontal class="justify-center">
          <q-card-section class="col-sm-12 col-md-6 col-lg-3 text-center">
            <span class="text-caption">{{itemList["basic"][0][0]}}</span>
            <q-separator/>
            <span class="text-h6">{{itemList['basic'][0][2]}}</span>
          </q-card-section>
          <q-card-section horizontal class="col-sm-12 col-md-6 col-lg-3 text-center">
            <span class="text-h6"><q-icon name="speed" size="large"/>{{itemList['basic'][5][2]}}</span>
          </q-card-section>
          <q-card-section horizontal class="col-sm-12 col-md-6 col-lg-3 text-center">
            <span class="text-h6"><q-icon name="music_note" size="large"/>{{itemList['basic'][1][2]}}</span>
          </q-card-section>
        </q-card-section>
      </q-card-->
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
    <q-separator spaced/>
    <!--div class="row q-gutter-sm justify-evenly" style="padding-top:10px">
      <q-list padding bordered class="rounded-borders" style="width: 400px;">
        <q-expansion-item label="使用说明" default-opened>
          <q-card>
            <q-card-section>
              <p>Beta 1.2.0 版，运算结果仅供参考，不代表曲目的最真实难度。</p>
              <p>请选择正确的难度分级，否则将会造成较大的误差</p>
              <p>量程：Easy: 5~12 Normal: 11~16 Hard: 16~23 Expert: 22~29，超出量程时显示估计值</p>
              <p>警告：请选择正确的难度分级，否则将会造成较大的误差</p>
              <p>如在使用过程中出现任何问题，联系作者</p>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
      <q-list padding bordered class="rounded-borders" style="width: 400px;">
        <q-expansion-item label="使用方法" default-opened>
          <q-card>
            <q-card-section>
              <p>自定义模式</p>
              <p>1. 在大输入框中输入bestdori格式的谱面</p>
              <p>2. 选择您的谱面的分级：Easy/Normal/Hard/Expert/Special，默认Expert（）</p>
              <p>3. 点击分析按钮，即可得到分析结果</p>
              <p>Bestdori模式</p>
              <p>输入想要获取的bestdori谱面id，点击获取按钮，系统将会按照BD上的难度分级进行分析。</p>
              <p>如果想要自定义等级，可以先去左边的谱面获取拉取谱面，复制到自定义模式下的大输入框内进行分析</p>
              <p>若想分析其它谱面，点击清空，再输入新的谱面。或者在右下角的小输入框中输入新的想分析的bestdori社区谱面</p>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
      <q-list padding bordered class="rounded-borders" style="width: 400px;">
        <q-expansion-item label="其它信息" default-opened>
          <q-card>
            <q-card-section>
              <p>Expert难度运算结果可能与真实难度差异较大，谱面难度的精确度一般为±1级</p>
              <p>建模的时候忽略了锁手和卡手配置影响难度的情况，若出现上述配置一般难度会偏低2~3级（加了分配手的代码也没用）</p>
              <p>后端缓存机制已建立，如果超过15s没有提示信息/出现结果请查看F12是不是报错了，然后告诉我</p>
              <p>定级器已开源 : </p>
              <p><a href="https://github.com/6QHTSK/Bandori-Chart-Analysiser">github</a></p>
              <p><a href="https://gitee.com/coppercomplex/chartdiffanalyser">gitee</a></p>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>

    </div-->
  </div>
</template>
<script>
// import func from 'app/vue-temp/vue-editor-bridge'
// eslint-disable-next-line no-unused-vars
var echarts = require('echarts')
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
        url = 'https://api.ayachan.fun/DiffAnalysis&speed=' + this.speed / 100
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
  }
}
</script>

<template>
  <div style="padding:10px">
    <div>
      <span class="row q-gutter-sm" style="padding-bottom:20px">
        <!--q-input v-model="searchtxt" label="搜索" style="width:300px" dense>
          <template v-slot:append>
            <q-icon v-if="searchtxt !== ''" name="close" @click="searchtxt = ''" class="cursor-pointer" />
            <q-icon name="search" />
          </template>
        </q-input-->
        <q-radio dense v-model="sortbyid" :val="true" @input="fliter" label="按发表时间排序" />
        <q-radio dense v-model="sortbyid" :val="false" @input="fliter" label="按最高难度排序" />
        <q-checkbox dense v-model="expanded" label="高级筛选" />
      </span>
      <span class="row q-gutter-sm" style="padding-bottom:0px">
        <span style="font-size:x-small;">Noter:</span>
        <q-btn round style="transform: translate(0px,-10px);" @click="charter0=false"><q-avatar size="40px"><img src="https://assets.ayachan.fun/charter/0.png"/></q-avatar></q-btn>
        <span style="font-size:x-small;">稳音绫</span>
        <q-btn round style="transform: translate(0px,-10px);" @click="charter2=false"><q-avatar size="40px" ><img src="https://assets.ayachan.fun/charter/2.png"/></q-avatar></q-btn>
        <span style="font-size:x-small;">6QHTSK</span>
      </span>
      <q-slide-transition>
        <div v-show="expanded" class="row q-gutter-sm" style="padding-bottom:10px">
          <q-separator/>
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="blue" val="anime" label="Anime" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="blue" val="game" label="Game" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="blue" val="other" label="Other" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="green" val="fin" label="已完成" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="green" val="unfin" label="未完成" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="orange" val="hidiff" label="高难度" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="orange" val="lodiff" label="一般难度" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="red" val="full" label="FULL" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="red" val="short" label="短版" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="pink" val="vid" label="含视频" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="pink" val="novid" label="不含视频" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="green" val="charter0" label="Noter:稳音绫" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="green" val="charter2" label="Noter:6QHTSK" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="green" val="charter1" label="Noter:稳音绫与6QHTSK" />
          <q-checkbox dense v-model="fliteritem" @input="fliter" color="green" val="charter3" label="Noter:其他" />
        </div>
      </q-slide-transition>
    </div>
    <q-separator/>
    <div class="q-gutter-md fit row wrap justify-evenly items-start" style="padding-top:15px">
        <q-card v-for="song in flitersonglist" v-bind:key="song.id" style="width:580px">
          <q-img :src="getimagesrc(song.id)" basic @click="opendialog(song.id)">
            <div style="top: 0; left:0; transform: translate(-12px,-12px); background:rgba(0,0,0,0)" class="q-gutter-xs row">
              <q-avatar size="40px" class="shadow-12" v-if="song.charter === 0 || song.charter === 1"><img src="https://assets.ayachan.fun/charter/0.png"/></q-avatar>
              <q-avatar size="40px" class="shadow-12" v-if="song.charter === 1 || song.charter === 2"><img src="https://assets.ayachan.fun/charter/2.png"/></q-avatar>
            </div>
            <div style="top: 0; right: 0; transform: translate(12px,-12px); background: rgba(0,0,0,0)" class="q-gutter-xs row">
              <q-avatar size="40px" color="blue" text-color="white" class="shadow-12" v-if="song.diff[0] !== '-1'"><span style="font-size:small">{{song.diff[0]}}</span></q-avatar>
              <q-avatar size="40px" color="green" text-color="white" class="shadow-12" v-if="song.diff[1] !== '-1'"><span style="font-size:small">{{song.diff[1]}}</span></q-avatar>
              <q-avatar size="40px" color="orange" text-color="white" class="shadow-12" v-if="song.diff[2] !== '-1'"><span style="font-size:small">{{song.diff[2]}}</span></q-avatar>
              <q-avatar size="40px" color="red" text-color="white" class="shadow-12" v-if="song.diff[3] !== '-1'"><span style="font-size:small">{{song.diff[3]}}</span></q-avatar>
              <q-avatar size="40px" color="pink" text-color="white" class="shadow-12" v-if="song.diff[4] !== '-1'"><span style="font-size:small">{{song.diff[4]}}</span></q-avatar>
            </div>
            <div class="absolute-bottom">
              <span style="font-size:medium;">
                <q-badge v-if="song.time >= 165" color="red">FULL</q-badge>
                {{song.songname}}
              </span>
              <br/>
              <span style="font-size:x-small;">{{song.artist}}</span>
            </div>
          </q-img>
          <q-card-section>
              <q-btn
                fab
                color="blue"
                icon="get_app"
                class="absolute"
                @click="openkirapack(song.id)"
                style="top: 0; right: 5px; transform: translateY(-50%);"
              ><q-tooltip>下载kirapack</q-tooltip>
              </q-btn>
              <q-btn
                fab
                color="pink"
                icon="sports_esports"
                class="absolute"
                @click="openpbbblink(song.id)"
                style="top: 0; right: 5px; transform: translate(-110%,-50%);"
              ><q-tooltip>在BanG Player上游玩</q-tooltip></q-btn>
              <span>时长:
              <span
                v-if="parseInt((song.time-60*Math.floor(song.time/60)).toFixed(0)) >= 10">{{Math.floor(song.time/60)}}:{{(song.time-60*Math.floor(song.time/60)).toFixed(0)}}</span>
              <span
                  v-else>{{Math.floor(song.time/60)}}:0{{(song.time-60*Math.floor(song.time/60)).toFixed(0)}}</span>
              ；BPM:
              <span
                v-if="song.bpm[0] === song.bpm[1]">{{song.bpm[0]}}</span>
              <span
                v-else>{{song.bpm[0]}}~{{song.bpm[1]}}</span>
              </span><br/>
              <span>{{song.origin}}</span>
              <div class="row q-gutter-sm">
                <q-badge color="grey">{{song.id}}</q-badge>
                <q-badge color="blue">{{song.tags[0]}}</q-badge>
                <q-badge v-if="song.diff[0]!=='-1' && song.diff[1]!=='-1' && song.diff[2]!=='-1'" color="green">已完成</q-badge>
                <q-badge v-if="song.maxdiff >= 28" color="orange">高难度</q-badge>
                <q-badge v-if="song.video" color="pink">BGV</q-badge>
              </div>
          </q-card-section>
          <q-dialog v-model='dialogopen[song.id]' full-width>
            <q-img :src="getimagesrchd(song.id)" @click="opendialog(song.id)"/>
          </q-dialog>
        </q-card>
    </div>
    <q-dialog v-model="charter0">
      <q-card>
        <q-card-section>
          <p style="text-align:center;font-size:large">稳音绫</p>
          <img src="https://assets.ayachan.fun/charter/full-0.png" style="width:80%;padding-left:20%"/>
          <p>6QHTSK的姐姐</p>
          <p>BanGDream企划的粉丝，主推PPP、PP、HHW</p>
          <p>其单独所作的谱面选曲一定来自于百合相关的游戏和番剧</p>
          <p>虽然喜欢制作谱面据说音游力并不高？</p>
          <p>会与妹妹合作制作一些偏黑暗系的歌曲和一些非百合相关的歌曲</p>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="charter2">
      <q-card>
        <q-card-section>
          <p style="text-align:center;font-size:large">6QHTSK</p>
          <img src="https://assets.ayachan.fun/charter/full-2.png" style="width:80%;padding-left:20%"/>
          <p>稳音绫的妹妹</p>
          <p>BanGDream企划的粉丝，主推Roselia、RAS</p>
          <p>谱面选曲偏向纯音乐和音游曲</p>
          <p>“音游力超高的！”（by 稳音绫）</p>
          <p>会答应姐姐合作制作一些偏黑暗系的歌曲和一些非百合相关的歌曲</p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
function sortbyid (a, b) {
  return b.id - a.id
}
function sortbydiff (a, b) {
  return b.maxdiff - a.maxdiff
}
export default {
  data: () => {
    return {
      songlist: [],
      flitersonglist: [],
      dialogopen: [],
      sortbyid: true,
      expanded: false,
      charter0: false,
      charter2: false,
      searchtxt: '',
      fliteritem: ['anime', 'game', 'other', 'fin', 'unfin', 'hidiff', 'lodiff', 'full', 'short', 'vid', 'novid', 'charter0', 'charter1', 'charter2', 'charter3'],
      flag: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
    }
  },
  methods: {
    getimagesrc (id) {
      return 'https://assets.ayachan.fun/pic/' + id + '.jpg/webp'
    },
    getimagesrchd (id) {
      return 'https://assets.ayachan.fun/pic/' + id + '.jpg/hd'
    },
    opendialog (id) {
      this.dialogopen[id] = !this.dialogopen[id]
    },
    fliterbadge (song) {
      const totalitem = ['anime', 'game', 'other', 'fin', 'unfin', 'hidiff', 'lodiff', 'full', 'short', 'vid', 'novid', 'charter0', 'charter1', 'charter2', 'charter3']
      for (var i = 0; i < 3; i++) {
        if (!this.flag[i] && song.tags[0].toLowerCase() === totalitem[i]) {
          return false
        }
      }
      var finishstatus = song.diff[0] !== '-1' && song.diff[1] !== '-1' && song.diff[2] !== '-1'
      var highdiffstatus = song.maxdiff >= 28
      var fullstatus = song.time >= 165
      var videostatus = song.video
      if (!this.flag[3] && finishstatus) {
        return false
      }
      if (!this.flag[4] && !finishstatus) {
        return false
      }
      if (!this.flag[5] && highdiffstatus) {
        return false
      }
      if (!this.flag[6] && !highdiffstatus) {
        return false
      }
      if (!this.flag[7] && fullstatus) {
        return false
      }
      if (!this.flag[8] && !fullstatus) {
        return false
      }
      if (!this.flag[9] && videostatus) {
        return false
      }
      if (!this.flag[10] && !videostatus) {
        return false
      }
      if (!this.flag[11] && song.charter === 0) {
        return false
      }
      if (!this.flag[12] && song.charter === 1) {
        return false
      }
      if (!this.flag[13] && song.charter === 2) {
        return false
      }
      if (!this.flag[14] && song.charter === 3) {
        return false
      }
      return true
    },
    fliter () {
      var flitersonglist
      const totalitem = ['anime', 'game', 'other', 'fin', 'unfin', 'hidiff', 'lodiff', 'full', 'short', 'vid', 'novid', 'charter0', 'charter1', 'charter2', 'charter3']
      for (var i = 0; i < totalitem.length; i++) {
        if (this.fliteritem.indexOf(totalitem[i]) > -1) {
          this.flag[i] = true
          // console.log(this.fliteritem.indexOf(totalitem[i]))
        } else {
          this.flag[i] = false
          // console.log(this.fliteritem.indexOf(totalitem[i]))
        }
      }
      if (this.sortbyid) {
        flitersonglist = this.songlist.sort(sortbyid)
      } else {
        flitersonglist = this.songlist.sort(sortbydiff)
      }
      this.flitersonglist = flitersonglist.filter(this.fliterbadge)
      this.$forceUpdate()
    },
    openpbbblink (e) {
      window.open('https://reikohaku.gitee.io/bang-player/#/?id=' + e + '&type=community&autoload=true', '_blank')
    },
    openkirapack (e) {
      window.open('https://static.ayachan.fun/kirapack/' + e + '.kirapack', '_blank')
    }
  },
  created () {
    var vm = this
    this.$q.loading.show()
    this.$axios.get('https://api.ayachan.fun/songlist').then(function (res) {
      if (res.status === 200) {
        vm.songlist = res.data
        var dialogopen = {}
        for (var song of res.data) {
          dialogopen[song.id] = false
        }
        vm.dialogopen = dialogopen
        vm.fliter()
      } else {
        vm.$q.notify('拉取资源失败')
      }
      vm.$q.loading.hide()
    })
  }
}
</script>

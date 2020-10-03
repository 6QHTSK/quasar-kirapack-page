<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="text-white" height-hint="98">
      <q-toolbar class="bg-light-blue-7">
        <!--q-btn dense flat round icon="menu" @click="goback()"/-->

        <q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-btn dense flat @click="$router.push('/')">
            <q-avatar>
              <img src="~assets/favicon-128x128.png">
            </q-avatar>
            <div style="padding-left:10px;font-size:large">
              <span style="font-size:large">{{titlename()}}</span>
            </div>
          </q-btn>
        </q-toolbar-title>
          <q-btn dense flat round icon="info" @click="dialoge = !dialoge" class="bg-light-blue-7"/>
      </q-toolbar>
    </q-header>
    <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list v-for="(menuItem, index) in menuList" :key="index">

            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple :to="menuItem.to">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>

           <q-separator v-if="menuItem.separator" />

          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container>
      <router-view />
      <br/>
      <q-dialog v-model="dialoge">
        <q-card>
        <q-card-section style="text-align:center">
            <h5>本站公告</h5>
            <p>本站主要存放 <a target="_blank" href="https://space.bilibili.com/37434481">稳音绫与6QHTSK </a>
                的一些优质BangDream谱面，且会不断更新</p>
            <p>如果长期没有更新谱面数据，欢迎私信提醒我更新</p>
            <p>未来将会添加谱面质量检测等其它功能（没有头猪）</p>
            <p>招有能力者完善谱师姐妹的人设和制作live2D，现在停留在人设图阶段</p>
            <p>本人能力有限，如果在浏览本站时遇到了问题，敬请指出</p>
            <p>注意：Bestdori和PlayerBanGround上的谱面版本可能会与最终Kirapack版本有一定差异</p>
            <p>我的 <a href="https://bestdori.ayachan.fun/community/user/psk2019" target="_blank">Bestdori首页</a>；
                <a target="_blank" href="https://space.bilibili.com/37434481">Bilibili首页</a>
            </p>
            <h5>本站基础信息</h5>
            <p>本站由 <a target="_blank" href="https://space.bilibili.com/37434481">稳音绫与6QHTSK</a> 开发</p>
            <p>本站使用了 <a target="_blank" href="http://www.quasarchs.com/">Quasar</a> 开发</p>
            <p>本站运行于 <a target="_blank" href="https://cloud.tencent.com/">腾讯云</a>
            <p>谱师人设来自于<a target="_blank" href="https://charat.me/genesis/create/">CHARTAT</a></p>
            <p>感谢 <a target="_blank" href="https://bestdori.ayachan.fun/">Bestdori</a> 和 <a target="_blank"
                    href="https://reikohaku.gitee.io/bang-player/#/">灵喵<s>天下第一</s>的PlayerBanGround</a>
                提供的谱面存储和游玩服务</p>
            <h6>Disclaimer:</h6>
            <p>I do not own the songs, videos and illustraions.</p>
            <p>I only made the charts.</p>
            <p>If you dont want your illustration or music be shown in this website, </p>
            <p>contact me and I will delete that. </p>
            <h6>版本信息</h6>
            <p>网站版本:V0.3.1</p>
        </q-card-section>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      dialoge: false,
      drawer: false,
      miniState: true,
      menuList: [
        {
          icon: 'share',
          label: '谱面分享',
          separator: false,
          to: '/kira'
        },
        {
          icon: 'calculate',
          label: '谱面分析',
          separator: false,
          to: '/diff'
        },
        {
          icon: 'bar_chart',
          label: 'Bestdori分析',
          separator: true,
          to: '/bdany'
        },
        {
          icon: 'construction',
          label: '灰键修复',
          separator: false,
          to: '/greynotefix'
        },
        {
          icon: 'open_with',
          label: '谱面位移',
          separator: false,
          to: '/notemover'
        },
        {
          icon: 'cloud_download',
          label: '谱面获取',
          separator: false,
          to: '/bdoff'
        }
      ]
    }
  },
  methods: {
    titlename () {
      // console.log(this.$route.path)
      var obj = {
        '/': '稳音绫的工具站',
        '/greynotefix': '灰键修复器',
        '/notemover': '谱面位移器',
        '/bdoff': '谱面获取',
        '/bpm': 'BPM分析器',
        '/diff': '谱面分析',
        '/bdany': 'Bestdori数据',
        '/kira': '谱面推荐'
      }
      return obj[this.$route.path]
    },
    ismobile () {
      return this.$q.platform.is.mobile
    }
  }
}
</script>

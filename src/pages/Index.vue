  <template>
  <div class="fit column wrap justify-center items-center content-center" style="padding-top:50px">
    <div class="notice" transition-show="jump-down">
        <div>
            <p class="text-h4">彩绫的工具站</p>
            <p class="text-caption">V0.4.1</p>
        </div>
      <q-separator spaced/>
        <div class="row q-col-gutter-lg justify-evenly" style="width: 100%">
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12" >
              <q-icon name="share" style="font-size: 120px"></q-icon>
              <p class="text-h6">谱面分享</p>
              <p class="text-caption">本人写的优质BanG Dream谱面</p>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <q-icon name="calculate" style="font-size: 120px"></q-icon>
            <p class="text-h6">谱面分析</p>
            <p class="text-caption">帮你算BanG Dream谱面的难度</p>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <q-icon name="bar_chart" style="font-size: 120px"></q-icon>
            <p class="text-h6">Bestdori分析</p>
            <p class="text-caption">了解Bestdori自制谱社区的各项数字</p>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12" >
            <q-icon name="construction" style="font-size: 120px"></q-icon>
            <p class="text-h6">实用工具</p>
            <p class="text-caption">帮助制作你的自制谱</p>
          </div>
        </div>
    </div>
    <span style="padding-top:10px;font-size:xx-small;color:ghostwhite">下次一定把主页做好看来 x 2</span>
    <q-footer elevated class="gt-lg">
      <q-toolbar class="bg-white">
        <div style="margin:0 auto;">
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45030502000326" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
            <img src="~assets/备案图标.png" style="float:left;"/>
            <span style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">桂公网安备 45030502000326号</span>
          </a>
          <a target="_blank" href="http://www.beian.miit.gov.cn" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
            <span style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">桂ICP备20005849-1号</span>
          </a>
        </div>
      </q-toolbar>
    </q-footer>
    <div style="position: absolute; bottom: 60px; left:35vw; height: 10px;">

      </div>
  </div>
  </template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    openMyBestdori () {
      window.location.href = 'https://bestdori.ayachan.fun/community/user/psk2019'
    },
    openMyBiliBili () {
      window.location.href = 'https://space.bilibili.com/37434481'
    }
  }
}
</script>

<style scoped>
.notice{
    width: 80vw;
    font-size: 15px;
    text-align: center;
}
</style>

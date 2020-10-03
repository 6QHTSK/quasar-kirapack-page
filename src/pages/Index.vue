  <template>
  <div class="fit column wrap justify-center items-center content-center" style="padding-top:50px">
    <q-card class="notice" transition-show="jump-down">
        <q-card-section>
            <h5>稳音绫的工具站</h5>
            <p>谱面分享：本人写的优质BanG Dream谱面</p>
            <p>谱面分析：帮你算BanG Dream谱面的难度</p>
            <p>Bestdori分析：了解Bestdori自制谱社区的各项有趣数字</p>
            <p>使用工具：制作自制谱时的得力助手</p>
            <p>点击左侧导航栏使用工具</p>
            <p><a href="https://bestdori.ayachan.fun/community/user/psk2019" target="_blank">Bestdori首页</a><br/>
                <a target="_blank" href="https://space.bilibili.com/37434481">Bilibili首页</a>
            </p>
        </q-card-section>
    </q-card>
    <span style="padding-top:10px;font-size:xx-small;color:ghostwhite">下次一定把主页做好看来←_←</span>
    <q-footer elevated>
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
  name: 'PageIndex'
}
</script>

<style scoped>
.notice{
    width: 80vw;
    font-size: 15px;
    text-align: center;
}
</style>

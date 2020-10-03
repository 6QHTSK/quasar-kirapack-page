  <template>
  <div class="q-gutter-md" style="padding-left:2%;padding-top:20px">
    <q-card class="notice" transition-show="jump-down">
        <q-card-section>
            <h5>本站公告</h5>
            <p>本站主要存放 <a target="_blank" href="https://space.bilibili.com/37434481">稳音绫与6QHTSK </a>
                的一些优质BangDream谱面，且会不断更新</p>
            <p>如果长期没有更新谱面数据，欢迎私信提醒我更新</p>
            <p>未来将会添加谱面质量检测等其它功能（没有头猪）</p>
            <p>本人能力有限，如果在浏览本站时遇到了问题，敬请指出</p>
            <p>注意：Bestdori和PlayerBanGround上的谱面版本可能会与最终Kirapack版本有一定差异</p>
            <p>我的 <a href="https://bestdori.com/community/user/psk2019" target="_blank">Bestdori首页</a>；
                <a target="_blank" href="https://space.bilibili.com/37434481">Bilibili首页</a>
            </p>
        </q-card-section>
    </q-card>
    <q-card class="notice" transition-show="jump-down">
        <q-card-section>
            <h5>本站基础信息</h5>
            <p>本站由 <a target="_blank" href="https://gitee.com/coppercomplex">稳音绫与6QHTSK</a> 开发</p>
            <p>本站使用了 <a target="_blank" href="https://element.eleme.cn/">Element-UI</a> 设计和 <a target="_blank"
                    href="https://vuejs.org/">Vue</a> 开发</p>
            <p>本站运行于 <a target="_blank" href="https://cloud.tencent.com/">腾讯云</a>
            </p>
            <p>感谢 <a target="_blank" href="https://bestdori.com/">Bestdori</a> 和 <a target="_blank"
                    href="https://reikohaku.gitee.io/bang-player/#/">灵喵<s>天下第一</s>的PlayerBanGround</a>
                提供的谱面存储和游玩服务</p>
        </q-card-section>
    </q-card>
    <q-card class="notice" transition-show="jump-down">
        <q-card-section>
            <h6>Disclaimer:</h6>
            <p>I do not own the songs, videos and illustraions.</p>
            <p>I only made the charts.</p>
            <p>If you dont want your illustration or music be shown in this website, </p>
            <p>contact me and I will delete that. </p>
        </q-card-section>
    </q-card>
    <q-card class="notice" transition-show="jump-down">
        <q-card-section>
            <h6>版本信息</h6>
            <p>网站版本:V0.3.0 谱面数据版本:V20.7.21</p>
        </q-card-section>
    </q-card>
  </div>
  </template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style scoped>
.notice{
    width: 95%;
    font-size: 15px;
    text-align: center;
}
</style>

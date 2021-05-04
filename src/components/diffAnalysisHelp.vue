<template>
  <q-card class="notice" transition-show="jump-down">
    <q-card-section>
      <p class="text-subtitle1  text-center">简介</p>
      <p>Beta 1.2.0 版，运算结果仅供参考，不代表曲目的最真实难度。</p>
      <p>请选择正确的难度分级，否则将会造成较大的误差</p>
      <p>量程：Easy: 5~12 Normal: 11~16 Hard: 16~23 Expert: 22~29，超出量程时显示估计值</p>
      <p>警告：请选择正确的难度分级，否则将会造成较大的误差</p>
      <p>如在使用过程中出现任何问题，联系作者</p>
      <p>Expert难度运算结果可能与真实难度差异较大，谱面难度的精确度一般为±1级</p>
      <p>建模的时候忽略了锁手和卡手配置影响难度的情况，若出现上述配置一般难度会偏低2~3级（加了分配手的代码也没用）</p>
      <p>后端缓存机制已建立，如果超过15s没有提示信息/出现结果请查看F12是不是报错了，然后告诉我</p>
      <p>定级器已开源 : <a href="https://github.com/6QHTSK/Bandori-Chart-Analysiser">github</a></p>
    </q-card-section>
    <q-card-section>
      <p class="text-subtitle1  text-center">自定义模式</p>
      <p>1. 在大输入框中输入bestdori格式的谱面</p>
      <p>2. 选择您的谱面的分级：Easy/Normal/Hard/Expert/Special，默认Expert（）</p>
      <p>3. 点击分析按钮，即可得到分析结果</p>
      <p class="text-subtitle1  text-center">Bestdori模式</p>
      <p>输入想要获取的bestdori谱面id，点击获取按钮，系统将会按照BD上的难度分级进行分析。</p>
      <p>如果想要自定义等级，可以先去左边的谱面获取拉取谱面，复制到自定义模式下的大输入框内进行分析</p>
      <p>若想分析其它谱面，点击清空，再输入新的谱面。或者在右下角的小输入框中输入新的想分析的bestdori社区谱面</p>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'DiffAnalysisHelp'
}
</script>

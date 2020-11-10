<template>
  <div>
    <p style="text-align: center;font-size: xx-large;padding-top: 20px;">正在跳转至Mikukonai的BPM测速站</p>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  beforeCreate () {
    window.location.href = 'https://mikukonai.com/Tempo/'
  }
}
</script>

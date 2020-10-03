<template>
    <div></div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  beforeCreate () {
    this.$router.push({ name: 'diff', params: { id: this.$route.params.id } })
  }
}
</script>

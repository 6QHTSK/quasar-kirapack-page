<template>
  <q-card class="notice" transition-show="jump-down" style="background: black">
    <q-scroll-area style="width:300px;max-width:80vw;height: 800px;max-height:90vh">
      <canvas id="chart" width="300" height="850" style="width:300px;max-width:80vw"></canvas>
    </q-scroll-area>
  </q-card>
</template>

<script>
const height = 800

function drawLane (ctx, laneN) {
  let x = laneN * 20 + 80
  ctx.beginPath()
  if (laneN === 0 || laneN === 7) {
    x = x - 1
    ctx.lineWidth = 4
  } else {
    ctx.lineWidth = 2
  }
  ctx.strokeStyle = '#00ACC1'
  ctx.moveTo(x, 0)
  ctx.lineTo(x, height)
  ctx.stroke()
  ctx.closePath()
}

function drawBPM (ctx, offsetTime, BPM) {
  const y = height - offsetTime * 100
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = '#8E24AA'
  ctx.moveTo(80, y)
  ctx.lineTo(220, y)
  ctx.stroke()
  ctx.closePath()
  ctx.beginPath()
  ctx.fillStyle = '#8E24AA'
  ctx.font = '20px Roboto'
  ctx.fillText(BPM.toString(), 225, y + 5)
  ctx.closePath()
}

function drawNote (ctx, offsetTime, laneN, noteImg) {
  const x = laneN * 20 + 60
  const y = height - offsetTime * 100 - 3
  ctx.beginPath()
  ctx.fillStyle = noteImg
  ctx.rect(x, y, 20, 6)
  ctx.fill()
  ctx.closePath()
}

export default {
  name: 'chartCanvas',
  mounted () {
    const noteImg = '#2196F3'
    const flickImg = '#F48FB1'
    const longImg = '#4CAF50'
    const slideImg = '#4CAF50'
    setTimeout(() => {
      const c = document.getElementById('chart')
      const ctx = c.getContext('2d')
      ctx.beginPath()
      ctx.rect(0, 0, 200, height)
      ctx.fillStyle = '#000000'
      ctx.fill()
      ctx.closePath()
      drawBPM(ctx, 0, 120)
      for (let i = 0; i <= 7; i++) {
        drawLane(ctx, i, height)
      }
      drawNote(ctx, 1, 1, noteImg)
      drawNote(ctx, 1, 3, flickImg)
      drawNote(ctx, 1, 5, longImg)
      drawNote(ctx, 1, 7, slideImg)
    }, 1000)
  }
}
</script>


<template>
  <div class="row justify-center">

    <div class="column text-center" style="padding-left:1%;padding-right:1%;padding-top:1%;width: 1000px; max-width: 80vw">
    <div class="q-gutter-sm">
      <q-banner inline-actions class="text-black bg-warning">
        测试中，可能不稳定，请合理使用
      </q-banner>
      <q-banner inline-actions class="text-white bg-primary">
        服务器地址： test.sonolus.ayachan.fun/0.4.8/bestdori <q-btn dense flat label="点此复制" @click="copy2clipboard"></q-btn><br/>
        上传谱面资源仅保留6个小时
      </q-banner>

      <div>
        <q-input v-model.number="title" label="谱面标题" @input="Storage"/>
        <q-input v-model.number="musicURL" label="音乐URL" @input="Storage">
          <template v-slot:append>
            <q-btn round dense flat icon="publish" @click="() => {uploadMusicDialog = true; }"/>
          </template>
        </q-input>
        <q-dialog v-model="uploadMusicDialog">
          <q-uploader
            style="max-width: 400px"
            url="https://upload.ayachan.fun:24444/Sonolus"
            label="仅限10M以内 MP3格式"
            auto-upload
            max-file-size="10485760"
            max-files="1"
            accept=".mp3"
            @rejected="onRejected"
            @uploaded="FileUploaded"
          />
        </q-dialog>
      </div>
      <div>
        <q-input type="textarea" v-model.lazy="inputstr" label="上传谱面" outlined clearable></q-input>
      </div>
      <div>
        <q-btn color="primary" @click="upload" class="full-width" data-sitekey="6LevtjUaAAAAAHDCeyBfCYLuoHrMCFHSt3GqBSOl" :loading="loading" :disable="uploaded || !uploadFlag">
          {{uploadLabel}}
        </q-btn>
      </div>
      <div id="grecaptcha"></div>
    </div>
  </div>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
export default {
  data: function () {
    return {
      musicURL: '',
      title: '',
      inputstr: '',
      uploadFlag: false,
      sitekey: '6LcDDRUaAAAAAM3kII3fFRQUSzltvnlX4rt3lzEz',
      loading: false,
      uploaded: false,
      recaptchaToken: '',
      recaptchaToken2: '',
      uploadLabel: '请完成reCaptcha后上传',
      uploadMusicDialog: false
    }
  },
  methods: {
    upload () {
      if (this.uploadFlag && this.title !== '' && this.inputstr !== '' && this.musicURL !== '') {
        let inputjson
        this.loading = true
        try {
          inputjson = JSON.parse(this.inputstr)
        } catch (err) {
          this.$q.notify('谱面错误')
        }
        this.$axios.post('http://api.ayachan.fun/Sonolus/Upload',
          {
            bgm: this.musicURL,
            title: this.title,
            notes: inputjson,
            'g-recaptcha-response': this.recaptchaToken
          }).then(
          res => {
            if (res.data.result) {
              this.uploaded = true
              this.uploadLabel = '上传完成，测试谱面ID:' + res.data.id
              this.loading = false
            } else {
              this.$q.notify({
                message: '上传失败，错误：' + res.data.error,
                type: 'Warning'
              })
              this.loading = false
            }
          }).catch(err => {
          this.$q.notify({
            message: '上传失败，错误：' + err,
            type: 'Warning'
          })
          this.loading = false
        })
      } else {
        this.$q.notify('请检查是否填写标题、乐曲地址、谱面信息')
      }
    },
    FinishRecaptcha: function (token) {
      this.uploadFlag = true
      this.uploadLabel = '上传测试谱面'
      this.recaptchaToken = token
    },
    FinishRecaptcha2: function (token) {
      this.recaptchaToken2 = token
    },
    RecaptchaExpired: function (token) {
      this.uploadFlag = false
      this.recaptchaToken = ''
      if (!this.uploaded) {
        this.uploadLabel = '请完成reCaptcha后上传'
      }
    },
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: '请上传MP3格式文件'
      })
    },
    loaded () {
      setTimeout(() => {
        window.grecaptcha.render('grecaptcha', {
          sitekey: this.sitekey,
          callback: this.FinishRecaptcha,
          'expired-callback': this.RecaptchaExpired
        })
      })
    },
    generateFilename (file) {
      const md5 = require('md5-node')
      const d = new Date()
      const name = md5(file.name + d.getTime()) + '.mp3'
      console.log(name)
      return name
    },
    FileUploaded (info) {
      console.log(info)
      var res = JSON.parse(info.xhr.responseText)
      if (res.result) {
        this.musicURL = res.filename
        this.uploadMusicDialog = false
        this.Storage()
      }
    },
    Storage () {
      this.$q.localStorage.set('title', this.title)
      this.$q.localStorage.set('musicURL', this.musicURL)
    },
    copy2clipboard () {
      var vm = this
      copyToClipboard('test.sonolus.ayachan.fun/0.4.8/bestdori').then(() => { vm.$q.notify('已复制到剪贴版中') }).catch(() => { vm.$q.notify('复制失败') })
    }
  },
  mounted () {
    this.loaded()
    this.title = this.$q.localStorage.getItem('title')
    this.musicURL = this.$q.localStorage.getItem('musicURL')
  }
}
</script>

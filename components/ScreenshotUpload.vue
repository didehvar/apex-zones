<template>
  <div v-if="user">
    <div v-show="!edit" class="text-center p-2">
      <file-upload
        ref="upload"
        v-model="files"
        extensions="png,jpg,jpeg"
        accept="image/png,image/jpeg"
        name="screenshot"
        class=""
        :drop="!edit"
        @input-filter="inputFilter"
        @input-file="inputFile"
      >
        Upload screenshot
      </file-upload>
    </div>

    <div v-show="files.length" class="modal">
      <div class="text-center">
        <div v-show="!edit">
          <div v-if="uploading" class="p-4">Progress: {{ progress }}%</div>
          <img v-if="files.length" :src="files[0].url" />
        </div>

        <div v-show="edit">
          <div class="p-4">
            <button
              type="button"
              class="btn btn-secondary"
              @click.prevent="$refs.upload.clear"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="editSave"
            >
              Save
            </button>
          </div>

          <div v-if="files.length">
            <img ref="editImage" :src="files[0].url" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import 'vue-upload-component/dist/vue-upload-component.part.css';
@import 'cropperjs/dist/cropper.css';

.modal {
  @apply fixed inset-0 z-50;
  background-color: rgba(255, 255, 255, 0.25);
}

.modal > div {
  @apply absolute p-2 bg-white shadow-lg;
  width: 90%;
  height: 90%;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script>
import Cropper from 'cropperjs'
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'
import { mapState, mapActions } from 'vuex'

/* from https://github.com/lian-yue/vue-upload-component/blob/master/docs/views/examples/Avatar.vue */
export default {
  components: {
    FileUpload
  },
  props: {
    map: {
      type: String,
      required: true
    },
    zone: {
      type: String,
      required: true
    },
    variation: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      files: [],
      edit: false,
      cropper: false,
      progress: 0,
      uploading: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    edit(value) {
      if (value) {
        this.$nextTick(function() {
          if (!this.$refs.editImage) {
            return
          }
          const cropper = new Cropper(this.$refs.editImage, {
            viewMode: 1,
            movable: false,
            rotatable: false,
            scalable: false,
            zoomable: false,
            data: {
              height: 1014,
              width: 1014,
              x: 420,
              y: 0
            }
          })
          this.cropper = cropper
        })
      } else if (this.cropper) {
        this.cropper.destroy()
        this.cropper = false
      }
    }
  },
  methods: {
    ...mapActions(['addScreenshot']),
    editSave() {
      this.edit = false
      const oldFile = this.files[0]
      const binStr = atob(
        this.cropper
          .getCroppedCanvas()
          .toDataURL(oldFile.type)
          .split(',')[1]
      )
      const arr = new Uint8Array(binStr.length)

      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }

      const file = new File([arr], oldFile.name, { type: oldFile.type })
      const { map, zone, variation } = this

      const fileRef = this.$fireStorage.ref().child(
        `${map}/${zone}/${variation}/${Math.random()
          .toString(36)
          .substring(7)}`
      )
      const uploadTask = fileRef.put(file)
      this.uploading = true

      uploadTask.on(
        this.$fireStorageObj.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          this.progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
        },
        (error) => {
          this.uploading = false
          window.alert(error.code)
        },
        async () => {
          this.files = []
          this.progress = 0
          this.uploading = false

          const url = await fileRef.getDownloadURL()
          this.addScreenshot({ map, zone, variation, url })
        }
      )
    },
    inputFile(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function() {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(png|jpg|jpeg)$/i.test(newFile.name)) {
          window.alert('Your choice is not a picture')
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        const URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    }
  }
}
</script>

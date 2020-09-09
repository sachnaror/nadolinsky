<template>
  <div class="flex mb-2 items-center justify-between">
    <p class="text-left">{{ label }}</p>
    <div class="w-2/3">
      <input
        v-model.trim="text"
        :placeholder="placeholder"
        @blur="sendData"
        :class="`p-2 border-solid border rounded-md ${error || saveError ? 'border-red-600' : 'border-blue-700'} outline-none`"
      >
      <p v-if="error || saveError" class="mt-2 text-left text-red-600">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputComponent',
  data() {
    return {
      text: "",
      error: false,
      errorMessage: ""
    }
  },
  props: {
    label: {
			type: String,
			default: ""
    },
    description: {
			type: String,
			default: ""
    },
    placeholder: {
			type: String,
			default: ""
    },
    needClean: {
			type: Boolean,
			default: false
    },
    saveError: {
			type: Boolean,
			default: false
    },
  },
  watch: {
    needClean(value) {
      if (value) {
        this.clearText()
        this.error = this.text ? true : false
      }
    },
    text() {
      if (this.error) {
        this.error = false
      }
    }
  },
  methods: {
    sendData() {
      const nameRegex = /^[a-z ,.'-]+$/i
      const emailRegex = /.+@.+\..+/i;
      if (this.description === "email" && !emailRegex.test(this.text) || this.description === "name" && !nameRegex.test(this.text)) {
        this.error = true
        this.errorMessage = "Field value is invalid"
        // return;
      }
      this.$eventHub.$emit("savefieldvalue", {
        text: this.text,
        label: this.label.toLowerCase().replace("-", "")
      })
    },
    clearText() {
      this.text = ""
    }
  }
}
</script>

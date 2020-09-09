<template>
  <div class="w-1/5 mx-auto">
    <h1 class="mb-2 text-3xl font-bold">Test form</h1>
		<div class="flex mb-3 w-full">
			<div
				v-for="divProgressID in inputsCount"
				:key="divProgressID"
				:id="divProgressID"
				:class="`
					w-1/${inputsCount}
					h-4
					${divProgressID === 1 && 'rounded-l-full'}
					${divProgressID === inputsCount && 'rounded-r-full'}
					${filledFieldsCount >= divProgressID ? 'bg-blue-700' : 'bg-white'}
					mb-2
					border-solid
					border
					border-black
				`"
			/>
		</div>
		<p class="mb-2">{{ filledFieldsCount * 100 / inputsCount }}%</p>
    <Input
			v-for="field in fields"
			:key="field.label"
			:needClean="needClean"
			:label="field.label"
			:placeholder="field.placeholder"
			:description="field.description"
			:type="field.type"
			v-on:savefieldvalue="saveFieldValue($event)"
		/>
		<button
			class="p-2 my-4 border-solid border rounded-md border-blue-700"
			@click="saveAllForm"
		>
			Submit
		</button>
		<p v-if="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Input from "./input.vue"
import { mapState, mapActions } from "vuex"

@Component({
  components: {
    Input,
	},
	methods: {
		...mapActions(["setFormField", "readFormData"])
	},
	computed: mapState(["form", "fields", "inputsCount", "successfulFilled"])
})

class Form extends Vue {
	message: string = ""
	needClean: boolean = false

	form: Object
	fields: Object
	inputsCount: Number
	successfulFilled: Object

	setFormField: (fieldData: Object) => void
	readFormData: () => void
	$eventHub: any

	get filledFieldsCount() {
		let count = 0
		Object.values(this.form).forEach(field => {
			if (field) {
				count++
			}
		})
		return count
	}
	
	mounted(): void {
		this.readFormData()
		this.$eventHub.$on("savefieldvalue", this.saveFieldValue)
	}

	saveFieldValue(fieldData: Object): void {
		this.setFormField(fieldData)
	}

	saveAllForm(): void {
		const success = this.filledFieldsCount === this.inputsCount
		this.message = success
			? "The form successfully saved"
			: "The form is filled not fully"
		if (success) {
			this.needClean = true
			Object.keys(this.form).forEach(label => {
				const data = {
					label,
					text: "",
				}
				this.setFormField(data)
			})
		}
		setTimeout(() => {
			this.message = ""
			this.needClean = false
		}, 3000)
	}
}

export default Form
</script>

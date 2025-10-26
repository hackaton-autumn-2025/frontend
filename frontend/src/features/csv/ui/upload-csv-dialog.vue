<script setup lang="ts">

interface UploadCsvDialogProps {
  csvDialog: boolean
  selectedFile: File | null
  closeCsvDialog: () => void
  handleCsvParse: () => void
  updateSelectedFile: (file: File | null) => void
}

const props = defineProps<UploadCsvDialogProps>()
</script>

<template>
  <v-dialog v-model="props.csvDialog" max-width="500">
    <v-card>
      <v-card-title class="text-h6 pa-6">Загрузка CSV файла</v-card-title>
      <v-card-text>
        <v-file-input
            :model-value="props.selectedFile"
            @update:model-value="props.updateSelectedFile"
            label="Выберите CSV файл"
            accept=".csv"
            :prepend-icon="false"
            variant="outlined"
            class=""
        />
      </v-card-text>
      <v-card-actions class="mb-3">
        <v-spacer/>
        <v-btn variant="text" @click="props.closeCsvDialog">Отмена</v-btn>
        <v-btn
            color="primary"
            class="btn-outline"
            :disabled="!props.selectedFile"
            @click="props.handleCsvParse"
        >
          Загрузить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>

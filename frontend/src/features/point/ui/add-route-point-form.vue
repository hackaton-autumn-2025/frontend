<template>
  <v-form v-model="isValid" lazy-validation>
    <div class="form-group mb-4">
      <label for="address">Адрес клиента</label>
      <v-text-field
          id="address"
          v-model="form.address"
          variant="outlined"
          placeholder="Введите адрес"
          :rules="[rules.required]"
          hide-details
      />
    </div>
    <div class="form-group mb-4">
      <label for="startTime">Время старта поездки</label>
      <v-text-field
          id="startTime"
          v-model="form.start_time"
          type="time"
          variant="outlined"
          :rules="[rules.required]"
          hide-details
      />
    </div>
    <v-row class="mb-4" dense>
      <v-col cols="6">
        <div class="form-group">
          <label for="latitude">Широта (необязательно)</label>
          <v-text-field
              id="latitude"
              v-model="form.latitude"
              type="number"
              variant="outlined"
              placeholder="Напр. 47.2225"
              hide-details
          />
        </div>
      </v-col>
      <v-col cols="6">
        <div class="form-group">
          <label for="longitude">Долгота (необязательно)</label>
          <v-text-field
              id="longitude"
              v-model="form.longitude"
              type="number"
              variant="outlined"
              placeholder="Напр. 39.7188"
              hide-details
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="mb-4" dense>
      <v-col cols="6">
        <div class="form-group">
          <label for="workStart">Начало рабочего дня</label>
          <v-text-field
              id="workStart"
              v-model="form.work_start"
              type="time"
              variant="outlined"
              :rules="[rules.required]"
              hide-details
          />
        </div>
      </v-col>
      <v-col cols="6">
        <div class="form-group">
          <label for="workEnd">Конец рабочего дня</label>
          <v-text-field
              id="workEnd"
              v-model="form.work_end"
              type="time"
              variant="outlined"
              :rules="[rules.required]"
              hide-details
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="mb-4" dense>
      <v-col cols="6">
        <div class="form-group">
          <label for="lunchStart">Начало обеда</label>
          <v-text-field
              id="lunchStart"
              v-model="form.lunch_start"
              type="time"
              variant="outlined"
              hide-details
          />
        </div>
      </v-col>
      <v-col cols="6">
        <div class="form-group">
          <label for="lunchEnd">Конец обеда</label>
          <v-text-field
              id="lunchEnd"
              v-model="form.lunch_end"
              type="time"
              variant="outlined"
              hide-details
          />
        </div>
      </v-col>
    </v-row>
    <div class="form-group mb-3">
      <label for="transport">Способ передвижения</label>
      <v-select
          id="transport"
          v-model="form.transport_mode"
          :items="['Пешком', 'На автомобиле']"
          variant="outlined"
          :rules="[rules.required]"
          hide-details
      />
    </div>
    <div class="form-group mb-3">
      <label for="priority">Уровень клиента</label>
      <v-select
          id="priority"
          v-model="form.client_level"
          :items="['Стандарт', 'VIP']"
          variant="outlined"
          :rules="[rules.required]"
          hide-details
      />
    </div>
    <div class="form-group mb-4">
      <label for="stopTime">Длительность остановки</label>
      <v-select
          id="stopTime"
          v-model="form.time_to_stop"
          :items="['5 мин', '15 мин', '30 мин', '1 час']"
          variant="outlined"
          hide-details
      />
    </div>
    <v-row class="pl-3 pt-4 mb-1 ga-3">
      <v-btn class="btn-outline" @click="addPointToRoute">Добавить точку</v-btn>
      <v-btn class="btn-outline" @click="openCsvDialog">Загрузить CSV/XLSX</v-btn>
      <v-btn class="btn-outline" @click="resetForm">Очистить форму</v-btn>
    </v-row>
    <v-row class="pl-3 pt-4 mb-1 ga-3">
      <v-btn class="btn-filled" @click="submitRouteToOptimize">
        {{ isOptimizing ? 'Оптимизация...' : 'Оптимизировать маршрут' }}
      </v-btn>
      <v-btn v-if="optimizationSuccess" class="btn-filled" @click="saveRouteToHistory">
        Сохранить маршрут
      </v-btn>
    </v-row>
    <UploadCsvDialog
        :csvDialog="csvDialog"
        :selectedFile="selectedFile"
        :closeCsvDialog="closeCsvDialog"
        :handleCsvParse="handleCsvParse"
        :updateSelectedFile="updateSelectedFile"
    />
  </v-form>
</template>

<script setup lang="ts">
import useAddPointForm from "@/features/point/model/use-add-point-form";
import {useCsvDialog} from "@/features/csv/model/use-csv-dialog";
import UploadCsvDialog from "@/features/csv/ui/upload-csv-dialog.vue";

const {
  form,
  isValid,
  rules,
  submitRouteToOptimize,
  saveRouteToHistory,
  isOptimizing,
  optimizationSuccess,
  resetForm,
  addPointToRoute,
} = useAddPointForm();

const {
  csvDialog,
  openCsvDialog,
  closeCsvDialog,
  selectedFile,
  updateSelectedFile,
  handleCsvParse
} = useCsvDialog();
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: 500;
  color: #444;
  font-size: 0.95rem;
  margin-left: 4px;
}
</style>

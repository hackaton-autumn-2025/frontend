<script setup lang="ts">
import useProfile from "@/features/profile/model/useProfile";
import {CurrentUser} from "@/entities/user/types/interfaces";

interface WorkingHoursFormProps {
  currentUser: CurrentUser;
}

const { currentUser } = defineProps<WorkingHoursFormProps>()

const {
  workingOursForm,
  isValid,
  saveWorkingOurs
} = useProfile({
  workStart: currentUser.work_start,
  workEnd: currentUser.work_end,
  lunchStart: currentUser.lunch_start,
  lunchEnd: currentUser.lunch_end,
})
</script>

<template>
  <v-form v-model="isValid" lazy-validation>
    <v-row class="mb-4" dense>
      <v-col cols="6">
        <div class="form-group">
          <label for="workStart">Начало рабочего дня</label>
          <v-text-field
              id="workStart"
              v-model="workingOursForm.workStart"
              type="time"
              variant="outlined"
              hide-details
          />
        </div>
      </v-col>
      <v-col cols="6">
        <div class="form-group">
          <label for="workEnd">Конец рабочего дня</label>
          <v-text-field
              id="workEnd"
              v-model="workingOursForm.workEnd"
              type="time"
              variant="outlined"
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
              v-model="workingOursForm.lunchStart"
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
              v-model="workingOursForm.lunchEnd"
              type="time"
              variant="outlined"
              hide-details
          />
        </div>
      </v-col>
    </v-row>

    <v-row class="pl-3 pt-4 mb-1 ga-3">
      <v-btn class="btn-filled" @click="saveWorkingOurs">Сохранить рабочие часы</v-btn>
    </v-row>
  </v-form>
</template>

<style scoped lang="scss">
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
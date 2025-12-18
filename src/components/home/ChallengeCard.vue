<script setup>
defineProps({
  challenge: {
    type: Object,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="challenge-card" :class="completed ? 'completed' : 'disabled'">
    <div class="challenge-icon" :class="completed ? 'completed' : 'disabled'">
      <q-icon
        :name="challenge.icon"
        :color="completed ? 'secondary' : 'grey-6'"
      />
    </div>

    <div class="challenge-info">
      <div class="challenge-title">{{ challenge.title }}</div>
      <div class="challenge-desc">{{ challenge.desc }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.challenge-card {
  border: 1px solid #e8ecf4;
  background-color: $bg-card;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.challenge-card.disabled {
  opacity: 0.6;
  cursor: default;
}

.challenge-card.disabled .challenge-title {
  color: #9e9e9e;
}

.challenge-card.disabled .challenge-desc {
  color: #9e9e9e;
}

.challenge-icon {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  font-size: 24px;
  transition: all 0.3s ease;
}

.challenge-icon.completed {
  background: linear-gradient(135deg, #ffecb3, $accent);
}

.challenge-icon.disabled {
  background: linear-gradient(135deg, #eceff1, #cfd8dc);
  box-shadow: 0 5px 15px rgba(207, 216, 220, 0.3);
}

.challenge-info {
  flex: 1;
}

.challenge-title {
  font-weight: 600;
  margin-bottom: 5px;
  color: $secondary;
}

.challenge-desc {
  font-size: 13px;
  color: $text-light;
  line-height: 1.5;
}
</style>

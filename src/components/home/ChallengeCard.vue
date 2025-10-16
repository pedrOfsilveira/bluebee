<script setup>
defineProps({
  challenge: {
    type: Object,
    required: true,
  }
});
</script>

<template>
  <div class="challenge-card">

    <div class="challenge-icon">
      <q-icon :name="challenge.icon" color="secondary" />
    </div>

    <div class="challenge-info">
      <div class="challenge-title"> {{ challenge.title }}</div>
      <div class="challenge-desc"> {{ challenge.desc }}</div>
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

.challenge-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ffecb3, $accent);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  font-size: 24px;
  box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
  transition: all 0.3s ease;
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

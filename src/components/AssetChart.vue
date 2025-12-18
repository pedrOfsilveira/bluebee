<template>
  <div class="chart-section">
    <div class="chart-container">
      <canvas id="cotacaoChart"></canvas>
    </div>
    <div class="time-filters">
      <button class="time-filter">1D</button>
      <button class="time-filter">7D</button>
      <button class="time-filter active">1M</button>
      <button class="time-filter">1A</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#cotacaoChart {
  width: 100% !important;
}
.chart-section {
  margin-top: -10px;

  position: relative;
}

.chart-container {
  height: 230px;

  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a237e;
  font-weight: 500;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.chart-container i {
  font-size: 40px;
  margin-bottom: 10px;
  opacity: 0.5;
}

.time-filters {
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  margin: 20px auto 0;

  padding: 8px;
  border-radius: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  width: 100%;
  flex-wrap: wrap;
}

.time-filter {
  background: none;
  border: none;
  color: #555;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.time-filter.active {
  background: #3f51b5;
  color: white;
  box-shadow: 0 3px 10px rgba(63, 81, 181, 0.3);
}
</style>

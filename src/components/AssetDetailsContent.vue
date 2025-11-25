<template>
  <div class="asset-details-content q-mt-lg">
    <div class="section-title">Estatísticas Chave</div>

    <!-- dá pra tirar varios desse ou trocar por coisas mais didaticas -->
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Setor</div>
        <div class="info-value">Petróleo, Gás e Biocombustíveis</div>
      </div>
      <div class="info-item">
        <div class="info-label">Risco do Ativo</div>
        <div class="info-value" style="color: #f57c00">Médio</div>
      </div>
      <div class="info-item">
        <div class="info-label">Patrimônio Inicial</div>
        <div class="info-value">R$ 133,40</div>
      </div>
      <div class="info-item">
        <div class="info-label">Movimentações</div>
        <div class="info-value">R$ 429,82</div>
      </div>
      <div class="info-item">
        <div class="info-label">Rentabilidade</div>
        <div class="info-value" style="color: #388e3c">8,7%</div>
      </div>
      <div class="info-item">
        <div class="info-label">Patrimônio Final</div>
        <div class="info-value">R$ 729,61</div>
      </div>
    </div>

    <!-- não acho que precise disso aqui  -->
    <div class="about-section">
      <div class="section-title">Sobre a Petrobras (PETR4)</div>
      <div class="about-text">
        A Petróleo Brasileiro S.A. - Petrobras é uma empresa de capital aberto
        (sociedade anônima), cujo acionista majoritário é o Governo do Brasil
        (União), sendo, portanto, uma empresa estatal de economia mista. Atua
        como uma empresa de energia nos setores de exploração e produção,
        refino, comercialização, transporte, petroquímica, distribuição de
        derivados, gás natural, energia elétrica, gás-química e biocombustíveis.
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.asset-details-content {
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 18px;
  color: #1a237e;
  padding-bottom: 8px;
  border-bottom: 2px solid #eef2f9;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  /* Responsivo */
  gap: 15px;
  margin-bottom: 25px;
}

.info-item {
  background-color: #f8f9fd;
  /* Fundo mais suave */
  padding: 18px;
  border-radius: 16px;
  border: 1px solid #e8ecf4;
  transition: all 0.3s ease;
}

.info-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
}

.info-label {
  font-size: 13px;
  color: #6b7280;
  /* Cinza mais escuro */
  margin-bottom: 8px;
  font-weight: 500;
}

.info-value {
  font-weight: 600;
  font-size: 15px;
  color: #3f51b5;
  /* Cor de destaque */
}

.about-section {
  margin-bottom: 25px;
}

.about-text {
  font-size: 14px;
  line-height: 1.7;
  color: #444;
}




</style>

<script setup>
import { computed } from 'vue'
import { useQuizStore } from 'src/stores/storeQuiz'
import { useStoreUserAssets } from 'src/stores/storeUserAssets'
import { useStoreInvestorProfile } from 'src/stores/storeInvestorProfile'
import { useStoreAuth } from 'src/stores/storeAuth'
import { storeToRefs } from 'pinia'
import SectionTitle from "src/components/SectionTitle.vue";
import StatSection from "./StatSection.vue";
import StatCard from "./StatCard.vue";
import StatMessage from "./StatMessage.vue";
import { useStoreUserChallenges } from 'src/stores/storeUserChallenges'

const quiz = useQuizStore()
const investor = useStoreInvestorProfile()
const auth = useStoreAuth()
const userAssets = useStoreUserAssets()
const storeUserChallenges = useStoreUserChallenges()

const { feedback: quizFeedback } = storeToRefs(quiz)

const attentionMessages = computed(() => {
  const list = []
  const fb = quizFeedback.value
  if (fb && fb.color === 'warning') {
    list.push({
      text: `${fb.msg} `,
      action: fb.action,
      route: fb.route
    })
  }
  // Portfolio concentration attention
  const dist = portfolioDistribution.value
  if (dist.total > 0 && dist.top.share >= 0.7) {
    const catLabelMap = { stocks: 'Ações', fii: 'FIIs', crypto: 'Cripto', etf: 'ETF' }
    const topLabel = catLabelMap[dist.top.key] || dist.top.key
    list.push({
      text: `Sua carteira está muito concentrada em ${topLabel} (${Math.round(dist.top.share*100)}%). Considere diversificar. `,
      action: 'Explorar ativos',
      route: '/explore'
    })
  }

  // Warnings aligned to investor profile
  const profile = (auth.userDetails?.investor_profile || '').toLowerCase()
  if (profile) {
    const shares = dist.shares || { stocks: 0, fii: 0, crypto: 0, etf: 0 }
    if (profile.includes('conserv')) {
      if (shares.crypto >= 0.12) {
        list.push({
          text: `Para um perfil conservador, exposição alta em Cripto (${Math.round(shares.crypto*100)}%) aumenta a volatilidade. Considere reduzir. `,
          action: 'Rebalancear',
          route: '/wallet'
        })
      }
      // Portfolio vs profile mismatch (conservador): pouca exposição a FIIs/ETFs
      const stableShare = shares.fii + shares.etf
      if (dist.total > 0 && stableShare < 0.4) {
        list.push({
          text: `Seu portfólio não combina com seu perfil conservador: baixa exposição a FIIs/ETFs (${Math.round(stableShare*100)}%). `,
          action: 'Explorar FIIs/ETFs',
          route: '/explore'
        })
      }
    } else if (profile.includes('moder')) {
      if (shares.crypto >= 0.28) {
        list.push({
          text: `Para um perfil moderado, a fatia de Cripto (${Math.round(shares.crypto*100)}%) pode estar acima do ideal. Equilibre com FIIs/ETFs. `,
          action: 'Explorar FIIs/ETFs',
          route: '/explore'
        })
      }
      // Portfolio vs profile mismatch (moderado): alta concentração em uma classe
      if (dist.total > 0 && dist.top.share > 0.6) {
        list.push({
          text: `Seu portfólio pode não refletir um perfil moderado: concentração em uma classe (${Math.round(dist.top.share*100)}%). `,
          action: 'Diversificar carteira',
          route: '/explore'
        })
      }
    }
    else if (profile.includes('agress')) {
      // Portfolio vs profile mismatch (agressivo): muito estabilo e pouca RV
      const riskOnShare = shares.stocks + shares.crypto
      if (dist.total > 0 && riskOnShare < 0.4) {
        list.push({
          text: `Seu portfólio está conservador para um perfil agressivo (${Math.round(riskOnShare*100)}% em Ações/Cripto). Avalie aumentar risco calculado. `,
          action: 'Explorar oportunidades',
          route: '/explore'
        })
      }
    }

    // High-risk assets share warning
    const assets = Array.isArray(userAssets.assets) ? userAssets.assets : []
    let highRiskQty = 0
    let totalQty = 0
    for (const a of assets) {
      const q = typeof a?.quantidade === 'number' ? a.quantidade : 0
      totalQty += q
      const risco = a?.ativos?.risco || a?.risco || ''
      if (risco.toString() === 'Alto') highRiskQty += q
    }
    const highRiskShare = totalQty > 0 ? highRiskQty / totalQty : 0

    // Thresholds by profile
    let threshold = 0.3 // default
    if (profile.includes('conserv')) threshold = 0.15
    else if (profile.includes('moder')) threshold = 0.3
    else if (profile.includes('agress')) threshold = 0.6

    if (highRiskShare > threshold) {
      list.push({
        text: `Muitos ativos de alto risco (${Math.round(highRiskShare*100)}%). Ajuste a carteira para reduzir a volatilidade. `,
        action: 'Rebalancear',
        route: '/wallet'
      })
    }
  }
  return list
})

const suggestionMessages = computed(() => {
  const list = []
  const fb = quizFeedback.value
  // If no quiz taken this session, invite user to take it
  if (!fb) {
    list.push({
      text: 'Faça um quiz para receber recomendações personalizadas. ',
      action: 'Ir para Quiz',
      route: '/quiz'
    })
  }
  if (fb && fb.color === 'positive') {
    list.push({
      text: `${fb.msg} `,
      action: fb.action,
      route: fb.route
    })
  }
  // If weak area detected, suggest re-taking the quiz
  if (fb && fb.color === 'warning') {
    list.push({
      text: `Reforce seus conhecimentos com um quiz rápido focado no tema. `,
      action: 'Fazer Quiz',
      route: '/quiz'
    })
  }
  // Suggestions aligned to saved investor profile
  const profile = (auth.userDetails?.investor_profile || '').toLowerCase()
  if (profile) {
    if (profile.includes('conserv')) {
      list.push({
        text: 'Como perfil conservador, priorize FIIs e ETFs amplos, e complemente com ações de empresas consolidadas. ',
        action: 'Explorar FIIs e ETFs',
        route: '/explore'
      })
    } else if (profile.includes('moder')) {
      list.push({
        text: 'Perfil moderado: busque um equilíbrio entre Ações, FIIs e ETFs, mantendo cripto em parcela menor. ',
        action: 'Montar carteira balanceada',
        route: '/explore'
      })
    } else if (profile.includes('arroj')) {
      list.push({
        text: 'Perfil agressivo: diversifique entre Ações, FIIs, Cripto e ETFs para potencial de retorno no longo prazo. ',
        action: 'Explorar oportunidades',
        route: '/explore'
      })
    }
  }
  // Portfolio-based suggestions
  const dist = portfolioDistribution.value
  const missing = dist.missing
  if (dist.total === 0) {
    list.push({
      text: 'Você ainda não possui ativos. Que tal começar com uma classe mais estável?',
      action: 'Explorar ativos',
      route: '/explore'
    })
  } else if (missing.length) {
    const catLabelMap = { stocks: 'Ações', fii: 'FIIs', crypto: 'Cripto', etf: 'ETF' }
    const show = missing.slice(0, 2).map(k => catLabelMap[k] || k).join(' e ')
    list.push({
      text: `Sua carteira não possui exposição em ${show}. Adicionar essas classes pode melhorar a diversificação. `,
      action: 'Explorar ativos',
      route: '/explore'
    })
  }
  return list
})

// --- Helpers: portfolio distribution by quantity ---
const normalizeType = (t) => {
  if (!t) return 'stocks'
  const s = t.toString().toLowerCase()
  if (s.includes('fundo') || s === 'fii') return 'fii'
  if (s.includes('cripto') || s === 'crypto') return 'crypto'
  if (s.includes('etf')) return 'etf'
  if (s.includes('ação') || s.includes('acoes') || s.includes('ações') || s.includes('acao') || s.includes('stock')) return 'stocks'
  return 'stocks'
}

const portfolioDistribution = computed(() => {
  const counts = { stocks: 0, fii: 0, crypto: 0, etf: 0 }
  const assets = Array.isArray(userAssets.assets) ? userAssets.assets : []
  for (const a of assets) {
    const tipo = a?.ativos?.tipo || a?.tipo
    const key = normalizeType(tipo)
    const q = typeof a?.quantidade === 'number' ? a.quantidade : 0
    counts[key] += q
  }
  const total = Object.values(counts).reduce((s, v) => s + v, 0)
  const shares = total > 0
    ? Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, v / total]))
    : { stocks: 0, fii: 0, crypto: 0, etf: 0 }
  const top = Object.entries(shares).reduce((acc, [k, v]) => {
    if (!acc || v > acc.share) return { key: k, share: v }
    return acc
  }, null) || { key: 'stocks', share: 0 }
  const missing = Object.entries(counts).filter(([, v]) => v === 0).map(([k]) => k)
  return { counts, total, shares, top, missing }
})

const medals = computed(() => {
  const list = Array.isArray(storeUserChallenges.challenges) ? storeUserChallenges.challenges : []
  return list
    .map(c => c?.desafios?.nome)
    .filter(n => typeof n === 'string' && n.length > 0)
})
</script>

<template>
  <StatSection>
    <SectionTitle class="bb" title="Estatísticas de Uso" icon="fas fa-chart-simple" />
    <div class="stats-grid">
      <StatCard
        icon="fas fa-stopwatch"
        :value="Math.floor(auth.userDetails.tempo_uso/3600)+'h'"
        label="Tempo de Uso"
      />
      <StatCard
        icon="fas fa-medal"
        :value="storeUserChallenges.challenges.length"
        label="Desafios Concluídos"
      />
    </div>
  </StatSection>

  <StatSection>
    <SectionTitle class="bb" title="Fique de Olho" icon="fas fa-circle-exclamation" />
    <template v-if="attentionMessages.length">
      <StatMessage v-for="(m, i) in attentionMessages" :key="'att-'+i" category="attention">
        {{ m.text }}
        <router-link v-if="m.route" :to="m.route" class="text-primary text-weight-bold">{{ m.action }}</router-link>
      </StatMessage>
    </template>
    <template v-else>
      <StatMessage category="suggestion">
        Tudo certo por aqui! Continue praticando para manter o desempenho.
      </StatMessage>
    </template>
  </StatSection>

  <StatSection>
    <SectionTitle class="bb" title="Sugestões" icon="fas fa-lightbulb" />

    <template v-if="suggestionMessages.length">
      <StatMessage v-for="(m, i) in suggestionMessages" :key="'sug-'+i" category="suggestion">
        {{ m.text }}
        <router-link v-if="m.route" :to="m.route" class="text-primary text-weight-bold">{{ m.action }}</router-link>
      </StatMessage>
    </template>
    <template v-else>
      <StatMessage category="suggestion">
        Explore novos conteúdos para desbloquear conquistas e melhorar seu perfil.
      </StatMessage>
    </template>

  </StatSection>

  <StatSection>
    <SectionTitle class="bb" title="Medalhas" icon="fas fa-medal" :seeAll="true" to="/challenges"/>
    <div class="stats-medal-grid">
      <StatCard
        v-for="(name, i) in medals"
        :key="'medal-'+i"
        icon="fas fa-trophy"
        :value="''"
        :label="name"
      />
      <StatMessage v-if="medals.length === 0" category="suggestion">
        Complete desafios para desbloquear medalhas.
      </StatMessage>
    </div>
  </StatSection>
</template>

<style lang="scss" scoped>


.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  /* Responsivo */
  gap: 18px;
  /* Mais espaço */
  margin-bottom: 10px;
  /* Ajustado */
}

.stats-medal-grid {
  display: flex;
  overflow-x: auto;
  gap: 18px;
  padding: 5px 2px 15px 0px;
  scrollbar-width: none;
}

</style>

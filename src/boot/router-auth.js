import { boot } from 'quasar/wrappers'
import { useStoreAuth } from 'src/stores/storeAuth'

export default boot(({ router, store }) => {
  router.beforeEach((to, from) => {
    const storeAuth = useStoreAuth()

    if (!storeAuth.userDetails.id && to.path !== '/auth') {
      return '/auth'
    }
    if (storeAuth.userDetails.id && to.path === '/auth') {
      return false
    }
    // Now you need to add your authentication logic here, like calling an API endpoint
  })
})

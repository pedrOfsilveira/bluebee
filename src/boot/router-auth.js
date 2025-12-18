import { boot } from "quasar/wrappers";
import { useStoreAuth } from "src/stores/storeAuth";

export default boot(({ router, store }) => {
  router.beforeEach(async (to, from) => {
    const storeAuth = useStoreAuth();

    await storeAuth.ensureHydrated();

    const isLogged = !!storeAuth.userDetails.id;

    if (!isLogged && to.path !== "/auth") {
      return "/auth";
    }
    if (isLogged && to.path === "/auth") {
      return false;
    }

    if (
      isLogged &&
      !storeAuth.userDetails.investor_profile &&
      to.path !== "/investprofile"
    ) {
      return "/investprofile";
    }
  });
});

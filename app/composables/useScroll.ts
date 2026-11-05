export function useScroll() {
  const currentScroll = ref(0);
  const scrolledDown = ref(false);
  let lastScrollY = 0;
  let ignoreAnchorScroll = false;
  let anchorScrollTimeout: ReturnType<typeof setTimeout>;

  const router = useRouter();

  const removeAfterEach = router.afterEach((to, from) => {
    if (to.hash && to.fullPath !== from.fullPath) {
      ignoreAnchorScroll = true;

      clearTimeout(anchorScrollTimeout);
      anchorScrollTimeout = setTimeout(() => {
        ignoreAnchorScroll = false;
      }, 1200);
    }
  });

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    currentScroll.value = currentScrollY;

    if (ignoreAnchorScroll) {
      lastScrollY = currentScrollY;
      scrolledDown.value = true; // Force scroll down.
      return;
    }

    if (Math.abs(diff) < 10) return;

    scrolledDown.value = diff > 0;
    lastScrollY = currentScrollY;
  };

  onMounted(() => {
    if (!import.meta.client) return;

    lastScrollY = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
  });

  onUnmounted(() => {
    if (!import.meta.client) return;

    window.removeEventListener("scroll", handleScroll);
    removeAfterEach();
    clearTimeout(anchorScrollTimeout);
  });

  return { currentScroll, scrolledDown };
}

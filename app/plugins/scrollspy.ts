export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("scrollspy", {
    mounted(el, binding) {
      if (binding.value === "#") return;

      const links = document.querySelectorAll<HTMLAnchorElement>(
        `${binding.value} a[href^="#"]`,
      );

      const sections = Array.from(links)
        .map((link) => document.querySelector(link.getAttribute("href")!))
        .filter((section): section is Element => section !== null);

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
            );

          if (!visible.length) return;

          const activeId = visible[0]?.target.id;

          links.forEach((link) => {
            const isActive = link.hash === `#${activeId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        },
        {
          rootMargin: "-100px 0px -70% 0px",
          threshold: 0,
        },
      );

      sections.forEach((section) => observer.observe(section));
      (
        el as HTMLElement & {
          _scrollspyObserver?: IntersectionObserver;
        }
      )._scrollspyObserver = observer;
    },

    unmounted(el) {
      const element = el as HTMLElement & {
        _scrollspyObserver?: IntersectionObserver;
      };

      element._scrollspyObserver?.disconnect();
    },

    getSSRProps() {
      return {};
    },
  });
});

interface HorizontalScrollInstance {
  track: HTMLElement;
  observer: IntersectionObserver;
  resizeObserver: ResizeObserver;
  onScroll: () => void;
  onResize: () => void;
  rafId: number | null;
  trackWidth: number;
  scrollHeight: number;
  speed: number;
  isVisible: boolean;
  isActive: boolean;
}

const instances = new WeakMap<HTMLElement, HorizontalScrollInstance>();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("horizontal-scroll", {
    mounted(el: HTMLElement) {
      const track = el.querySelector<HTMLElement>(".horizontal-scroll__track");

      if (!track) {
        console.warn("Horizontal scroll: track not found.");
        return;
      }

      const breakpoint = Number.parseInt(el.dataset.breakpoint || "768", 10);
      const speed = Number.parseFloat(el.dataset.speed || "1") || 1;

      const instance: HorizontalScrollInstance = {
        track,
        observer: new IntersectionObserver(() => {}),
        resizeObserver: new ResizeObserver(() => {}),
        onScroll: () => {},
        onResize: () => {},
        rafId: null,
        trackWidth: 0,
        scrollHeight: 0,
        speed,
        isVisible: false,
        isActive: false,
      };

      const disableEffect = () => {
        instance.isActive = false;

        el.classList.remove("horizontal-scroll--active");
        el.classList.add("horizontal-scroll--disabled");

        el.style.removeProperty("--hs-scroll-height");
        track.style.removeProperty("transform");

        if (instance.rafId !== null) {
          cancelAnimationFrame(instance.rafId);
          instance.rafId = null;
        }
      };

      const measure = () => {
        if (window.innerWidth < breakpoint) {
          disableEffect();
          return;
        }

        instance.trackWidth = track.scrollWidth;

        const distance = Math.max(0, instance.trackWidth - window.innerWidth);

        instance.scrollHeight = distance / instance.speed;

        el.style.setProperty(
          "--hs-scroll-height",
          `${instance.scrollHeight}px`,
        );

        instance.isActive = distance > 0;

        el.classList.toggle("horizontal-scroll--active", instance.isActive);

        el.classList.toggle("horizontal-scroll--disabled", !instance.isActive);

        scheduleFrame();
      };

      const render = () => {
        instance.rafId = null;

        if (!instance.isActive) return;

        const sectionTop = el.getBoundingClientRect().top + window.scrollY;

        const progress = Math.max(
          0,
          Math.min(
            1,
            (window.scrollY - sectionTop) / Math.max(1, instance.scrollHeight),
          ),
        );

        const distance = Math.max(0, instance.trackWidth - window.innerWidth);

        const translateX = -(progress * distance);

        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      };

      const scheduleFrame = () => {
        if (instance.rafId === null) {
          instance.rafId = requestAnimationFrame(render);
        }
      };

      instance.onScroll = () => {
        if (instance.isVisible && instance.isActive) {
          scheduleFrame();
        }
      };

      instance.onResize = measure;

      instance.observer = new IntersectionObserver(([entry]) => {
        instance.isVisible = entry.isIntersecting;

        if (instance.isVisible && instance.isActive) {
          scheduleFrame();
        }
      });

      instance.resizeObserver = new ResizeObserver(measure);

      instance.observer.observe(el);
      instance.resizeObserver.observe(track);

      window.addEventListener("scroll", instance.onScroll, {
        passive: true,
      });

      window.addEventListener("resize", instance.onResize, {
        passive: true,
      });

      instances.set(el, instance);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        disableEffect();
        return;
      }

      measure();
    },

    unmounted(el: HTMLElement) {
      const instance = instances.get(el);

      if (!instance) return;

      instance.observer.disconnect();
      instance.resizeObserver.disconnect();

      window.removeEventListener("scroll", instance.onScroll);
      window.removeEventListener("resize", instance.onResize);

      if (instance.rafId !== null) {
        cancelAnimationFrame(instance.rafId);
      }

      instance.track.style.removeProperty("transform");
      el.style.removeProperty("--hs-scroll-height");

      instances.delete(el);
    },

    getSSRProps() {
      return {};
    },
  });
});

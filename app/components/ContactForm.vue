<script setup lang="ts">
const { onLoaded } = useScriptGoogleRecaptcha();
const config = useRuntimeConfig();
const siteKey = config.public.scripts.googleRecaptcha.siteKey;

const layout = useState<Layout>("layout");

const { contact_form: contactForm } = layout.value;

const { post } = useWordPress();

const form = ref({});

const labels = {
  event: "Évènement",
  name: "Nom et prénom",
  company: "Entreprise",
  email: "E-mail",
  phone: "Numéro de téléphone",
  guests: "Nombre de participants",
  date: "Date souhaitée",
  time: "Heure souhaitée",
  referral: "Comment avez-vous connu Montgascon ?",
  description: "Détails de l'évènement",
  marketing: "Comment avez-vous connu Montgascon ?",
};
const loading = ref(false);
const success = ref(false);
const error = ref(false);

async function submit() {
  loading.value = true;
  success.value = false;
  error.value = false;

  try {
    onLoaded(({ grecaptcha }) => {
      grecaptcha.ready(async () => {
        const recaptchaToken = await grecaptcha.execute(siteKey, {
          action: "contact",
        });

        const { data, error: e } = await post<{
          success: boolean;
          message: string;
        }>(`send`, {
          method: "POST",
          body: { labels, recaptchaToken, ...form.value },
        });

        if (e) {
          console.error(e);
          error.value = true;
        } else {
          success.value = data.value.success;
          form.value = {};
        }

        loading.value = false;
      });
    });
  } catch (e) {
    console.error(e);
    error.value = true;
    loading.value = false;
  }
}
</script>

<template>
  <section
    :id="contactForm.anchor"
    class="block-contact-form bg-secondary relative pt-8 pb-0 md:pt-31 md:pb-41"
  >
    <p
      class="mx-auto mb-8 text-center text-xs font-bold tracking-widest text-white uppercase md:absolute md:top-31 md:left-5 md:mb-0 md:w-25 md:text-left"
    >
      {{ contactForm.section_title }}
    </p>

    <div class="mx-auto max-w-205 bg-white p-3 md:p-5">
      <div class="border p-5 md:px-21 md:py-18">
        <h2
          class="font-bodoni mx-auto w-57 text-center text-3xl leading-tight font-medium uppercase md:w-auto md:text-7xl"
        >
          {{ contactForm.title }}
        </h2>
        <Icon
          name="icon:separator"
          class="text-primary mx-auto mt-6 mb-4 !block !size-6"
        />
        <RichText
          :content="contactForm.content"
          class="mb-10 text-xs leading-4.5 font-medium"
        />
        <p v-if="success" class="text-xs leading-4.5 font-medium">
          Merci pour votre message. <br >Notre équipe vous contactera dans les
          meilleurs délais.
        </p>
        <form v-else class="flex flex-col gap-7" @submit.prevent="submit()">
          <FormInput
            v-model="form.name"
            type="text"
            required
            label="Votre nom et prénom"
            autocomplete="fullname"
          />
          <FormInput v-model="form.company" type="text" label="Votre société" />
          <FormInput
            v-model="form.email"
            type="email"
            required
            label="Votre email"
            autocomplete="email"
          />
          <FormInput
            v-model="form.phone"
            type="phone"
            required
            label="Votre téléphone"
            autocomplete="phone"
          />
          <FormSelect
            v-model="form.event"
            label="Votre type d'évènement"
            :options="[
              { label: 'Soirée d’entreprise', value: 'Soirée d’entreprise' },
              { label: 'Séminaire', value: 'Séminaire' },
              { label: 'Conférence', value: 'Conférence' },
              { label: 'Réunion d’affaire', value: 'Réunion d’affaire' },
              { label: 'Petit-déjeuner', value: 'Petit-déjeuner' },
              { label: 'Déjeuner / cocktail', value: 'Déjeuner / cocktail' },
              { label: 'Dîner / cocktail', value: 'Dîner / cocktail' },
              { label: 'Showroom', value: 'Showroom' },
              { label: 'Tournage', value: 'Tournage' },
              { label: 'Press Event', value: 'Press Event' },
              { label: 'Lancement de produit', value: 'Lancement de produit' },
              { label: 'Mariage', value: 'Mariage' },
              { label: 'Anniversaire', value: 'Anniversaire' },
              {
                label: 'Autre (merci de préciser dans détails)',
                value: 'Autre (merci de préciser dans détails)',
              },
            ]"
          />
          <FormInput
            v-model="form.guests"
            type="number"
            required
            label="Nombre de convives"
          />
          <FormInput
            v-model="form.date"
            type="text"
            required
            label="Date souhaitée"
          />
          <FormInput
            v-model="form.time"
            type="text"
            required
            label="Heure souhaitée"
          />

          <FormSelect
            v-model="form.referral"
            label="Comment avez-vous connu Montgascon ?"
            :options="[
              {
                label: 'Participation à un événement à l’Hôtel de Montgascon',
                value: 'Participation à un événement à l’Hôtel de Montgascon',
              },
              { label: 'Internet', value: 'Internet' },
              { label: 'Instagram', value: 'Instagram' },
              { label: 'Linkedin', value: 'Linkedin' },
              { label: 'Bouche à oreille', value: 'Bouche à oreille' },
              { label: 'Prestataires', value: 'Prestataires' },
              { label: 'Autre', value: 'Autre' },
            ]"
          />

          <FormTextarea
            v-model="form.description"
            label="Partagez-nous les détails de votre évènement"
            required
          />

          <FormCheckbox
            v-model="form.marketing"
            label="J'accepte de communiquer mes données personnelles dans le cadre de la RGPD. Ces données sont collectées dans le but d’assurer une réponse à votre demande."
          />

          <button
            type="submit"
            :disabled="loading"
            class="hover:text-primary hover:border-primary text-3xs relative h-13 w-full cursor-pointer border font-bold tracking-wide uppercase transition disabled:cursor-not-allowed md:h-18 md:text-xs md:tracking-[.15rem]"
          >
            <template v-if="loading">Envoi en cours...</template>
            <template v-else>
              <Icon
                name="icon:arrow-right-wide"
                class="absolute top-1/2 left-4 !w-12 -translate-y-1/2 md:left-7"
              />
              Envoyer ma demande
            </template>
          </button>
          <p v-if="error" class="text-xs text-red-600">
            Une erreur est survenue, merci de réessayer plus tard ou de nous
            contacter directement par e-mail.
          </p>
          <p class="text-xs text-gray-500">
            This site is protected by reCAPTCHA.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

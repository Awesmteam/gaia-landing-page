import { PageHeader, PageTitle, WebinarCta, FadeIn } from "@/components/webinar-page-shell";

// D-3 nurture page · blog article "Vagusnerven – kroppens trygghetsnerv".
const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "Vad är vagusnerven?",
    body: [
      "Vagusnerven är kroppens längsta nerv. Den går från hjärnan, ner genom hjärtat, lungorna och magen. En av dess viktigaste uppgifter är att hela tiden läsa av en enkel fråga: ”Är jag trygg – eller i fara?”",
      "När vagusnerven känner trygghet aktiveras kroppens parasympatiska nervsystem – vila, återhämtning och läkning. Andningen blir djupare, hjärtat lugnar sig och magen slappnar av. Det är i detta tillstånd som kroppen kan ta emot närhet, njutning och lust.",
    ],
  },
  {
    heading: "Vad händer när vi lever i stress?",
    body: [
      "När en kvinna har levt länge i press och överlevnad kan vagusnerven fastna i ett slags alarmberedskap. Kroppen börjar då tolka även vardagliga saker – en partner som kommer nära eller ett ögonblick av stillhet – som något att vara på sin vakt mot.",
      "Och en kropp som är på vakt prioriterar inte njutning. Den prioriterar överlevnad. Lust blir helt enkelt ”onödig” för ett system som tror att det måste skydda dig.",
      "Det är därför viljestyrka inte räcker. Du kan inte tänka dig till trygghet. Trygghet behöver kännas – i kroppen.",
    ],
  },
];

const METHODS = [
  {
    title: "Förlängd utandning",
    text: "När utandningen är längre än inandningen skickas en direkt signal till vagusnerven om att faran är över. Prova: andas in på 4 och ut på 6.",
  },
  {
    title: "Orientering",
    text: "Att låta blicken vandra lugnt runt i rummet berättar för hjärnan att omgivningen är trygg.",
  },
  {
    title: "Varm beröring",
    text: "En hand på hjärtat och en på magen är en uråldrig trygghetssignal – och den fungerar även när den kommer från dig själv.",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="px-4 md:px-8 max-w-3xl mx-auto pt-10 md:pt-14 pb-24">
        <PageTitle
          eyebrow="Artikel · 4 minuter"
          title="Vagusnerven – kroppens trygghetsnerv"
        />

        <FadeIn delay={0.15} className="mt-10 md:mt-12">
          <article className="bg-white rounded-[2rem] p-7 md:p-12 border border-border/30 shadow-sm">
            <p className="text-base md:text-lg text-primary/80 leading-relaxed mb-8">
              Har du någon gång undrat varför du inte bara kan ”bestämma dig” för att känna lust?
              Eller varför du spänner dig just när du egentligen borde kunna slappna av? Svaret
              finns till stor del i en enda nerv: vagusnerven.
            </p>

            {SECTIONS.map((s) => (
              <section key={s.heading} className="mb-8">
                <h2 className="font-serif text-xl md:text-2xl text-primary mb-3">
                  {s.heading}
                </h2>
                {s.body.map((para, i) => (
                  <p
                    key={i}
                    className="text-base text-primary/75 leading-relaxed mb-4 last:mb-0"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}

            <section className="mb-8">
              <h2 className="font-serif text-xl md:text-2xl text-primary mb-4">
                Tre sätt att aktivera trygghetsnerven
              </h2>
              <ul className="space-y-4">
                {METHODS.map((m) => (
                  <li key={m.title} className="border-l-2 border-accent/40 pl-4">
                    <p className="font-semibold text-primary mb-1">{m.title}</p>
                    <p className="text-sm text-primary/70 leading-relaxed">{m.text}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl text-primary mb-3">
                Vad kan du förvänta dig?
              </h2>
              <p className="text-base text-primary/75 leading-relaxed">
                Det handlar inte om en snabb lösning, utan om upprepning. Nerven är som en muskel:
                ju oftare den får uppleva trygghet, desto lättare hittar kroppen tillbaka till
                lugn – och desto mer utrymme skapas för lust, energi och livskraft.
              </p>
            </section>
          </article>
        </FadeIn>

        <WebinarCta lead="Det är precis detta vi arbetar med på webbinariet:" label="Boka din plats" />
      </main>
    </div>
  );
}

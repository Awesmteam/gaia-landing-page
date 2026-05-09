import { useEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Heart, Sparkles, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

import heroImg from "@/assets/image_1778315719938.png";
import gaiaHeroCardImg from "@/assets/image_1778315686654.png";
import programHeroCardImg from "@/assets/image_1778315697754.png";
import identificationImg from "@/assets/image_1778315705414.png";
import symptomsImg from "@/assets/image_1778315709097.png";
import coupleImg from "@/assets/image_1778315740606.png";
import contrastImg from "@/assets/image_1778315692371.png";
import gaiaPortraitImg from "@/assets/image_1778315729204.png";
import closingImg from "@/assets/image_1778315750725.png";

const PrimaryButton = ({ children, href, className = "", variant = "solid" }: { children: React.ReactNode, href: string, className?: string, variant?: "solid" | "ghost" }) => {
  const base = "inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium transition-all duration-500 ease-out";
  const variants = {
    solid: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02]",
    ghost: "border border-primary text-primary hover:bg-primary/5"
  };
  
  if (href.startsWith("#")) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }
  
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="mx-auto max-w-6xl bg-white/80 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-baseline gap-2 group">
            <span className="font-serif text-base tracking-widest uppercase text-primary">Kvinnlig Lustkraft</span>
            <span className="font-serif italic text-primary/70 text-sm hidden sm:inline-block">med Gaia</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            {["Programmet", "Moduler", "Om Gaia", "Pris", "FAQ"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-primary/70 hover:text-accent transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <PrimaryButton href="#pris" className="hidden md:flex px-6 py-2.5 text-sm">
              Boka din plats
            </PrimaryButton>
            
            <Sheet>
              <SheetTrigger className="md:hidden p-2 text-primary">
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent className="bg-background border-none w-full max-w-sm sm:max-w-md">
                <div className="flex flex-col h-full py-12">
                  <nav className="flex flex-col gap-8 text-center mt-12">
                    {["Programmet", "Moduler", "Om Gaia", "Pris", "FAQ"].map((item) => (
                      <SheetClose asChild key={item}>
                        <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-2xl font-serif text-primary hover:text-accent transition-colors">
                          {item}
                        </a>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto flex justify-center">
                    <SheetClose asChild>
                      <PrimaryButton href="#pris" className="w-full max-w-[280px]">
                        Boka din plats
                      </PrimaryButton>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <main>
        {/* HERO */}
        <section className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden bg-secondary aspect-[4/5] md:aspect-[21/9] flex items-center">
            <div className="absolute inset-0">
              <img src={heroImg} alt="Kvinna vid havet" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-16 lg:p-24 max-w-3xl text-white">
              <FadeIn>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-6">
                  Kvinnlig <span className="text-accent italic">Lustkraft</span>
                </h1>
                <p className="text-xl md:text-3xl font-serif mb-6 opacity-90">
                  Du är inte trasig. Din kropp väntar bara på att du ska komma tillbaka.
                </p>
                <p className="text-base md:text-lg mb-10 max-w-xl text-white/80 leading-relaxed font-sans">
                  En 8-stegs resa tillbaka till din kropp, din kraft och ditt liv. För dig som fungerar, levererar och håller ihop — men inte längre känner dig levande i det.
                </p>
                <PrimaryButton href="#pris">
                  Boka din plats
                </PrimaryButton>
              </FadeIn>
            </div>
          </div>
          
          {/* Hero Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 relative z-20">
            <a href="#om-gaia" className="group block relative rounded-[2rem] overflow-hidden aspect-[16/9] md:aspect-[16/10] bg-secondary">
              <img src={gaiaHeroCardImg} alt="Möt Gaia" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <h3 className="text-2xl font-serif mb-1">Möt Gaia</h3>
                  <p className="text-sm text-white/80 font-medium">En 34-årig resa hem till kroppen</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </a>
            
            <a href="#moduler" className="group block relative rounded-[2rem] overflow-hidden aspect-[16/9] md:aspect-[16/10] bg-secondary">
              <img src={programHeroCardImg} alt="Programmet" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <h3 className="text-2xl font-serif mb-1">Programmet</h3>
                  <p className="text-sm text-white/80 font-medium">8 moduler · 12 månaders tillgång</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* SECTION 4: Är det här du? */}
        <section className="py-24 px-6 md:px-12 bg-white rounded-[3rem] mx-4 md:mx-8 mb-8 md:mb-12 shadow-sm border border-border/30">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn className="order-2 lg:order-1 relative">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5]">
                <img src={identificationImg} alt="Överlevnadsläge" className="w-full h-full object-cover" />
              </div>
              <div className="hidden md:block absolute -bottom-10 -right-6 w-44 lg:w-56 rounded-[1.5rem] overflow-hidden aspect-[3/4] shadow-xl border-4 border-background">
                <img src={symptomsImg} alt="Symtom kring kvinnan" className="w-full h-full object-cover" />
              </div>
              <div className="md:hidden mt-6 rounded-[1.5rem] overflow-hidden aspect-[4/5]">
                <img src={symptomsImg} alt="Symtom kring kvinnan" className="w-full h-full object-cover" />
              </div>
            </FadeIn>
            
            <div className="order-1 lg:order-2">
              <FadeIn>
                <span className="text-accent text-sm font-semibold tracking-widest uppercase block mb-4">
                  Är det här du?
                </span>
                <div className="text-lg md:text-xl font-serif text-primary/80 mb-10 space-y-4">
                  <p>Du har allt på plats. Man. Barn. Jobb. Hus.</p>
                  <p>Men på kvällarna, när du lägger dig, känner du det. Något fattas. Något skaver.</p>
                  <p>Du vet inte riktigt vad det är. Bara att livet har blivit... rutin.</p>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-8">
                  Känner du igen det här?
                </h2>
                
                <ul className="space-y-4 mb-12">
                  {[
                    "Du ger och ger och ger – till alla andra. Men vem ger till dig?",
                    "Du ligger bredvid din partner och känner dig ändå ensam",
                    "Du har tappat kontakten med dig själv och vet inte längre vad du vill",
                    "Du tänker \"jag som har det så bra, jag borde inte klaga\"",
                    "Du har försökt fylla tomheten – nya kläder, resor, grejer från Temu – men ingenting hjälper",
                    "Du har fått höra att det är klimakteriet, att det bara är så nu",
                    "Du har nästan börjat tro att det är sant. Att det här är livet nu."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-background border border-border/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                      <span className="text-primary/80">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="font-serif italic text-xl md:text-2xl text-primary space-y-6 mb-10 pl-6 border-l border-accent/30">
                  <p>Men det stämmer inte.</p>
                  <p>Det är ingenting fel på dig. Det är inte heller att du saknar vilja. Det är att din kropp har varit i beredskap så länge att den har glömt hur det känns att expandera. Och det kan förändras.</p>
                </div>

                <PrimaryButton href="#programmet">
                  Jag känner igen mig – visa mig vägen
                </PrimaryButton>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* SECTION 5: Contrast */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto" id="programmet">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <FadeIn>
                <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight mb-6">
                  Tänk om du kunde vakna på morgonen och känna dig som du igen?
                </h2>
                <p className="text-lg text-primary/80 mb-8">
                  Inte den du borde vara. Inte den du försöker vara. Utan du.
                </p>
                
                <div className="text-4xl md:text-5xl font-serif text-accent italic mb-10">
                  Stark. Glad. Hel. Levande.
                </div>
                
                <p className="text-lg font-serif text-primary mb-6">Tänk om du kunde:</p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    "Känna dig hemma i din egen kropp igen",
                    "Veta vad du vill – och våga ta plats",
                    "Ha energi kvar till dig själv, inte bara till alla andra",
                    "Känna livskraft och glädje utan att veta varför",
                    "Möta dig själv med kärlek istället för kritik",
                    "Leva – inte bara överleva vardagen"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      <span className="text-primary/90 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-xl font-serif text-primary space-y-4 mb-10">
                  <p>Det är inte en dröm. Det är vad som händer när du kommer hem till dig själv.</p>
                  <p>Och det är enklare än du tror.</p>
                </div>

                <PrimaryButton href="#pris">
                  Jag vill känna mig levande igen
                </PrimaryButton>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} className="relative">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4]">
                <img src={contrastImg} alt="Kvinna med gyllene energi" className="w-full h-full object-cover" />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 6: What you get */}
        <section className="py-24 px-6 md:px-12 bg-secondary rounded-[3rem] mx-4 md:mx-8 mb-8 md:mb-12 shadow-sm">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <FadeIn className="sticky top-32">
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-lg">
                  <img src={programHeroCardImg} alt="Kvinnor omfamnar varandra" className="w-full h-full object-cover" />
                </div>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-7">
              <FadeIn>
                <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight mb-6">
                  Kvinnlig Lustkraft® är inte en vanlig onlinekurs.
                </h2>
                <p className="text-xl md:text-2xl font-serif text-accent italic mb-8">
                  Det är en sammanhängande kroppslig återfödelse.
                </p>
                
                <div className="space-y-6 text-lg text-primary/80 mb-12">
                  <p>Varje modul bygger på den förra. Du kan inte hoppa över steg, för kroppen behöver tid att känna, integrera och förbereda sig för nästa lager. Det är därför det fungerar – för att vi inte stressar. Vi låter kroppen leda.</p>
                  <p className="font-serif italic text-xl text-primary">Transformationen sker inte genom information. Den sker genom att kroppen upplever.</p>
                </div>

                <h3 className="text-2xl font-serif text-primary mb-6">I programmet får du:</h3>
                
                <ul className="space-y-6 mb-12">
                  {[
                    "8 moduler som tar dig steg för steg hem till din kropp och din kraft – varje modul aktiverar, fördjupar och integrerar det som redan öppnats",
                    "1 live-seminar med mig varje månad – Möte med Gaia, första måndagen kl. 18.00–19.30. Här möts vi oavsett var du är i kursen. Du kan ställa frågor, känna att du inte är ensam, och låta kroppen landa djupare.",
                    "12 månaders tillgång så du kan gå i din egen takt – det här är inte något du ska stressa igenom",
                    "Tillgång till första modulen direkt efter köp – du kan börja redan idag"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1 text-accent opacity-70 shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-primary/90 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Bonus Block */}
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-white/60 relative overflow-hidden mb-10">
                  <span className="text-accent text-xs font-bold tracking-widest uppercase block mb-6">
                    Webinarbonus
                  </span>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-serif text-xl text-primary mb-2">Bonus 1 – Föreläsningen MATKA Kvinnans urminne & den livgivande kraften</h4>
                      <p className="text-primary/70 text-sm md:text-base leading-relaxed">
                        En djup undervisning om livmodern som kvinnans kraftcentrum, den livgivande energin, den inre medicinen och den feminina intelligens som väcks när kroppen får leda.
                      </p>
                    </div>
                    
                    <div className="h-px w-full bg-border/50" />
                    
                    <div>
                      <h4 className="font-serif text-xl text-primary mb-2">Bonus 2 – Vägledd hypnos: Återvändandet till MATKA - kvinnans urminne och den livgivande kraften</h4>
                      <p className="text-primary/70 text-sm md:text-base leading-relaxed">
                        En ceremoniell vägledd hypnos där du leds genom kroppen, ner i livmoderns centrum, och in i kontakten mellan lust, hjärta och livskraft. Detta är inte kunskap för huvudet. Det är minne för kroppen.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-accent/10">
                    <p className="text-accent font-serif italic text-sm text-center">
                      BONUSAR GÄLLER ENDAST TILL KLOCKAN 21.00 PÅ WEBBINARIEDAGEN!
                    </p>
                  </div>
                </div>

                <PrimaryButton href="#pris">
                  Ja, jag vill vara med
                </PrimaryButton>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* SECTION 7: Modules */}
        <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto" id="moduler">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">Så här ser resan ut:</h2>
            <div className="text-lg md:text-xl font-serif text-primary/80 space-y-4 max-w-2xl mx-auto">
              <p>Det här är inte åtta separata moduler. Det är en sammanhängande resa där varje steg bygger på det förra.</p>
              <p>Modul 1 skapar grunden. Modul 2 bygger vidare. Modul 3 aktiverar nästa lager. Och så vidare – ända tills allt är integrerat och kroppen är ditt hem igen.</p>
            </div>
          </FadeIn>

          <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[28px] md:before:left-[44px] before:w-px before:bg-border/60">
            {[
              {
                num: "01",
                title: "När lusten tystnat – vägen tillbaka till kroppen",
                desc: "Här skapar vi trygghet i nervsystemet och kontakt med kroppen. Du slutar pressa dig själv och börjar landa i dig själv. Detta är grunden för allt som kommer."
              },
              {
                num: "02",
                title: "Kroppen minns – även det du glömt",
                desc: "Tryggheten från modul 1 gör att kroppen nu vågar släppa spänningar, öppna bäckenet och börja cirkulera energi.",
                res: "ökad kroppsnärvaro, värme och pirr, känslan av 'jag är tillbaka i kroppen'."
              },
              {
                num: "03",
                title: "Den feminina livsenergin vaknar",
                desc: "När kroppen är trygg och flödet är öppnat kan livsenergin aktiveras.",
                res: "tydligt energiflöde, ökad livslust, kreativitet, känslan av att vara levande igen."
              },
              {
                num: "04",
                title: "Bröstens intelligens – hjärtats orgasmiska portal",
                desc: "Energin som väckts får nu riktning uppåt. Hjärta och bäcken kopplas samman.",
                res: "djupare känslomässig närvaro, mjukhet, förmåga att ta emot, mer njutning utan krav."
              },
              {
                num: "05",
                title: "Skam, skuld och den dolda kvinnokraften",
                desc: "Nu när kroppen är öppen och levande kan gamla programmeringar lösas – utan retraumatisering.",
                res: "minskad skam, starkare självkänsla, lust utan skuld, ägarskap över kroppen."
              },
              {
                num: "06",
                title: "Pengar · Tid · Energi – lustkraftens tre uttryck",
                desc: "Här ser du var du ger för mycket, tar emot för lite och läcker energi. Denna modul återställer cirkulationen.",
                res: "mer energi i vardagen, tydligare gränser, förmåga att ta emot utan skuld."
              },
              {
                num: "07",
                title: "Att leva som en kvinna i kontakt",
                desc: "All tidigare aktivering börjar nu uttryckas i livet.",
                res: "tydligare ja och nej, starkare magnetism, förändrade relationer, du börjar leva din kropp – inte bara känna den."
              },
              {
                num: "08",
                title: "Initiering – din Kvinnliga Lustkraft är vaken",
                desc: "Här integreras allt.",
                res: "stabil lustenergi, trygg kroppsnärvaro, långsiktig vitalitet, kroppen som hem."
              }
            ].map((mod, i) => (
              <FadeIn key={i} delay={0.1}>
                <div className="relative pl-20 md:pl-32">
                  <div className="absolute left-0 top-1 w-14 h-14 md:w-24 md:h-24 bg-background rounded-full flex items-center justify-center border-4 border-background text-accent font-serif text-2xl md:text-4xl italic">
                    {mod.num}
                  </div>
                  <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-border/30 group hover:border-accent/20 transition-colors">
                    <h3 className="text-xl md:text-2xl font-serif text-primary mb-3">
                      <span className="hidden md:inline-block mr-2 text-primary/40">Modul {mod.num.replace('0','')} —</span>
                      {mod.title}
                    </h3>
                    <p className="text-primary/70 mb-4 leading-relaxed">{mod.desc}</p>
                    {mod.res && (
                      <div className="pt-4 border-t border-border/50">
                        <span className="font-serif font-medium text-accent">Resultat:</span> <span className="text-primary/80 italic">{mod.res}</span>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-16 text-center">
            <PrimaryButton href="#pris">
              Jag är redo att börja min resa
            </PrimaryButton>
          </div>
        </section>

        {/* SECTION 8: Why it works */}
        <section className="py-24 px-6 md:px-12 bg-white rounded-[3rem] mx-4 md:mx-8 mb-8 md:mb-12 shadow-sm border border-border/30">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-8">
                Varför det här fungerar – när inget annat gjort det
              </h2>
              <div className="text-lg md:text-xl font-serif text-primary/80 space-y-6">
                <p>Det här är inte självutveckling. Inte en sexkurs. Inte information du ska läsa och förstå.</p>
                <p className="text-accent italic text-2xl">Det är en sammanhängande kroppslig återfödelse.</p>
                <p>Och det är därför det fungerar.</p>
                <p>Transformationen sker inte genom information. Den sker genom att kroppen upplever.</p>
                <p>Du kan inte tänka dig till att känna dig levande. Du kan inte läsa dig till att komma hem till din kropp. Kroppen måste vara med om det.</p>
                <p>Det är därför kursen är uppbyggd som den är. Varje modul aktiverar något i kroppen. Nästa modul bygger vidare på det. Inget steg hoppas över. Inget stressas fram.</p>
                <p>Det är lite som att köra bil. När du väl kan det, glömmer du det aldrig. Körkortet är redan på plats – du har bara glömt att kroppen vet.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="bg-secondary/40 rounded-[2rem] p-8 md:p-12 mb-16 text-center border border-border/40">
              <h3 className="text-2xl font-serif text-primary mb-4">Live-seminarierna möter dig där du är</h3>
              <p className="text-primary/80 mb-6">
                Oavsett om du är i modul 1 eller modul 8 – samma live-seminarium fungerar för dig. Det som delas möter varje kvinna exakt där hon är, förstärker det hon redan öppnat och förbereder kroppen för nästa steg.
              </p>
              <p className="font-serif italic text-primary">Det är därför kvinnor som går den här resan säger:</p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                "\"Det som förvånade mig mest var att det här har jag alltid haft. Det var inget nytt. Men förhållningssättet till det är helt nytt.\"",
                "\"Här har jag gått i terapi i åratal. Och så var det så här lätt?\"",
                "\"Wow, nu ska det bli spännande att uppleva världen utanför.\""
              ].map((quote, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div className="h-full bg-white p-8 rounded-3xl border border-border/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex items-center">
                    <p className="font-serif text-lg text-primary italic leading-relaxed text-center w-full">
                      {quote}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="text-center">
              <PrimaryButton href="#pris">
                Ja, jag vill uppleva det här
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* SECTION 9: About Gaia */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto" id="om-gaia">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn className="relative">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4]">
                <img src={gaiaPortraitImg} alt="Gaia Qiliv Lindroos" className="w-full h-full object-cover" />
              </div>
              <div className="hidden md:block absolute -bottom-10 -left-6 w-44 lg:w-52 rounded-[1.5rem] overflow-hidden aspect-[4/3] shadow-xl border-4 border-background">
                <img src={coupleImg} alt="Par i vardagen" className="w-full h-full object-cover" />
              </div>
            </FadeIn>
            
            <div>
              <FadeIn>
                <span className="text-accent text-sm font-semibold tracking-widest uppercase block mb-4">
                  Vem är jag?
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight mb-8">
                  Jag heter Gaia Qiliv Lindroos.
                </h2>
                
                <div className="space-y-5 text-primary/80 mb-10">
                  <p>Jag har jobbat med personlig utveckling och transformation sedan 1999 och skrivit över 400 ljudböcker. Jag har hjälpt hundratusentals kvinnor att komma hem till sig själva.</p>
                  <p>Men det viktigaste är inte vad jag gjort. Det är att jag förstår dig. För jag har stått där du står.</p>
                  <p>I tio år skickade jag mina vänner på kurser. De kom tillbaka med glittrande ögon. Förändrade. Levande.</p>
                  <p>Och jag stod kvar.</p>
                  <p>Jag tänkte: jag har ju man och barn och företag. Jag kan inte. Det där är inte för mig.</p>
                  <p>Sen tog jag steget. Och efteråt tänkte jag bara: Jag är hemma. På riktigt.</p>
                  <p>Det var som en pusselbit som saknats hela livet plötsligt föll på plats.</p>
                  <p>Idag är jag gift i 34 år. Mormor. Fri, kärleksfull och levande.</p>
                  <p>Det folk oftast säger om mig? Att de aldrig känt sig så trygga. Att de äntligen fick vara precis som de är.</p>
                </div>

                <div className="border-l-2 border-accent/40 pl-6 mb-10 py-2">
                  <p className="font-serif text-xl md:text-2xl text-primary italic">
                    "Det finns ingen som gör det så tryggt och säkert som Gaia. Jag har aldrig upplevt något liknande."
                  </p>
                </div>

                <PrimaryButton href="#pris" variant="ghost">
                  Jag vill göra resan med Gaia
                </PrimaryButton>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* SECTION 10: Pris */}
        <section className="py-24 px-4 md:px-8 bg-secondary rounded-[3rem] mx-4 md:mx-8 mb-8 md:mb-12 shadow-sm" id="pris">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-white/60">
                <span className="text-accent text-sm font-semibold tracking-widest uppercase block mb-4 text-center">
                  Din investering
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">
                  Din investering i Kvinnlig Lustkraft®
                </h2>

                <div className="space-y-6 mb-12">
                  {[
                    { text: "8 moduler med vägledning / 8 hypnoser", value: "8 890:-" },
                    { text: "1 års medlemskap — 12 LIVE webinar", value: "11 880:-" },
                    { text: "12 månaders tillgång till kursinnehållet", value: "2 000:-" },
                    { text: "Tillgång till första modulen direkt efter köp, du kan börja redan ikväll", value: "" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-border/30 last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="text-primary/90">{item.text}</span>
                      </div>
                      {item.value && (
                        <div className="text-sm font-medium text-primary/50 shrink-0 uppercase tracking-wide">
                          Värde {item.value}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="text-right font-serif text-primary/60 italic pt-2">
                    TOTALT VÄRDE 22 770:-
                  </div>
                </div>

                <div className="bg-secondary/40 rounded-3xl p-6 md:p-8 mb-12 border border-border/50">
                  <span className="text-accent text-xs font-bold tracking-widest uppercase block mb-6 text-center">
                    Webinarbonus — gäller endast till klockan 21.00 ikväll:
                  </span>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="text-primary/90 font-medium">BONUS 1: MATKA — föreläsning om kvinnans förmågor</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="text-primary/90 font-medium">BONUS 2: MATKA — specialdesignad vägledd hypnos</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-border/50">
                    <span className="text-sm font-medium text-primary/50 uppercase tracking-wide">Värde</span>
                    <span className="text-sm font-medium text-primary/50 uppercase tracking-wide">3 500:-</span>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <div className="text-2xl font-serif text-primary/40 line-through mb-2">
                    TOTALT VÄRDE: 26 450:-
                  </div>
                  <div className="text-5xl md:text-6xl font-serif text-primary font-medium mb-8">
                    DITT PRIS: 7 990 SEK
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-primary/70 mb-8">
                    <span>Delbetaling möjlig med Klarna.</span>
                    <span className="hidden sm:inline-block">•</span>
                    <span>100% garanti — pengarna tillbaka.</span>
                  </div>
                  
                  <Link href="/tack" className="flex items-center justify-center rounded-full bg-primary px-8 py-5 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-all duration-300 w-full shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02]">
                    Ja, jag vill börja nu
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 11: FAQ */}
        <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto" id="faq">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-16">
              Vanliga frågor
            </h2>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                {
                  q: "Är det här en sexkurs?",
                  a: "Nej. Det handlar om livskraft, inte sex. Om att komma hem till din kropp och känna dig levande igen. Det är något helt annat."
                },
                {
                  q: "Behöver min partner vara med?",
                  a: "Nej. Det här handlar om dig. Din kropp. Din resa. Du behöver inte involvera någon annan."
                },
                {
                  q: "Hur mycket tid tar det?",
                  a: "Du går i din egen takt. Modulerna finns tillgängliga i 12 månader. Live-seminarierna är första måndagen varje månad, 90 minuter."
                },
                {
                  q: "Vad om jag inte kan vara med på live?",
                  a: "Live-seminarierna är en bonus, men resan sker i modulerna. Du kan fortfarande göra hela programmet."
                },
                {
                  q: "Jag har aldrig gjort något sådant här förut – passar det för mig?",
                  a: "Ja. Du behöver ingen erfarenhet. Allt finns redan i dig. Du har bara glömt vägen dit."
                },
                {
                  q: "När kan jag börja?",
                  a: "Direkt. Du får tillgång till första modulen så fort du har köpt."
                },
                {
                  q: "Finns det någon garanti?",
                  a: "Ja. Om du har genomfört kurset och deltagit på minst två live-seminarier och ändå inte är nöjd, då får du pengarna tillbaka."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border/50 bg-white rounded-2xl px-6 py-2">
                  <AccordionTrigger className="text-left font-serif text-lg md:text-xl text-primary hover:no-underline hover:text-accent transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-primary/80 text-base leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-16 text-center">
              <PrimaryButton href="#pris" variant="ghost">
                Jag är redo – ta mig dit
              </PrimaryButton>
            </div>
          </FadeIn>
        </section>

        {/* SECTION 12: Closing */}
        <section className="py-32 px-6 md:px-12 relative overflow-hidden flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <img src={closingImg} alt="Kvinna i stillhet" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <FadeIn>
              <div className="inline-block bg-accent/10 px-6 py-2 rounded-full mb-16 border border-accent/20">
                <p className="text-accent text-sm font-serif italic">
                  Kom ihåg: MATKA-bonusen gäller endast till klockan 21.00 på webbinariedagen.
                </p>
              </div>
              
              <div className="font-serif text-3xl md:text-5xl text-primary leading-tight space-y-8 mb-16">
                <p>Du har gett så mycket till alla andra. Nu är det din tur.</p>
                <p>Det du längtar efter finns redan i dig. Kroppen vet vägen hem. Du behöver bara ta första steget.</p>
                <p className="italic">Jag väntar på dig.</p>
              </div>
              
              <div className="mb-16">
                <PrimaryButton href="#pris" className="text-lg px-10 py-5">
                  Ja, jag tar steget nu
                </PrimaryButton>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <span className="font-serif italic text-2xl md:text-3xl text-primary">Kram, Gaia</span>
                <Heart className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8 text-center border-t border-border/40 bg-white">
        <div className="flex items-baseline justify-center gap-2 mb-6">
          <span className="font-serif text-sm tracking-widest uppercase text-primary">Kvinnlig Lustkraft®</span>
          <span className="font-serif italic text-primary/70 text-sm">· med Gaia Qiliv Lindroos</span>
        </div>
        
        <div className="flex items-center justify-center gap-6 text-sm text-primary/60">
          <a href="#" className="hover:text-accent transition-colors">Integritetspolicy</a>
          <a href="#" className="hover:text-accent transition-colors">Villkor</a>
          <a href="#" className="hover:text-accent transition-colors">Kontakt</a>
        </div>
      </footer>
    </div>
  );
}

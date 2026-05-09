import { Link } from "wouter";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6 px-8 flex justify-center items-center border-b border-border/40">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-serif text-lg tracking-widest uppercase text-primary">Kvinnlig Lustkraft</span>
          <span className="font-serif italic text-primary/70 text-sm">med Gaia</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center py-24 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex justify-center mb-8">
            <Heart className="w-12 h-12 text-accent" strokeWidth={1.5} />
          </div>
          
          <span className="text-accent text-sm font-semibold tracking-widest uppercase block mb-6">
            Tack
          </span>
          
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-12">
            Du är med!
          </h1>
          
          <div className="space-y-6 text-lg text-primary/80 max-w-xl mx-auto mb-16">
            <p>Åh, vad glad jag blir.</p>
            <p>Du tog steget. Du sa ja till dig själv. Och det är stort, vet du det?</p>
            <p>Jag ser så mycket fram emot att ta den här resan tillsammans med dig. Att få vara med när du kommer hem till dig själv, till din kropp, till din kraft.</p>
            <p>Du har gjort ett modigt val idag. Och jag lovar att jag kommer vara där med dig hela vägen.</p>
          </div>

          <div className="bg-white/50 rounded-[2rem] p-10 md:p-14 text-left max-w-xl mx-auto mb-16 border border-white/60 shadow-sm">
            <h2 className="text-2xl font-serif text-primary mb-6 text-center">Vad händer nu?</h2>
            <div className="space-y-6 text-primary/80">
              <p>Jag har skickat ett mejl till dig med all viktig information – hur du får tillgång till kursen, hur du loggar in, och hur du kommer igång med första modulen.</p>
              <p>Kolla din inkorg. Om du inte ser mejlet inom några minuter, titta i skräpposten eller spam-mappen. Ibland hamnar det där.</p>
              <p>Hittar du det fortfarande inte? Skriv till oss på <a href="mailto:hej@innershift.se" className="text-accent hover:underline">hej@innershift.se</a> så hjälper vi dig.</p>
            </div>
          </div>

          <div className="text-center mb-16">
            <p className="text-2xl font-serif text-primary italic mb-4">Välkommen hem.</p>
            <p className="text-xl font-serif text-primary">Kram, Gaia</p>
          </div>

          <Link href="/" className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-transparent px-8 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors duration-300">
            Tillbaka till startsidan
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

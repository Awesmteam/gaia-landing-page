import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <span className="text-accent text-sm font-semibold tracking-widest uppercase block mb-4">
          404
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
          Sidan kunde inte hittas
        </h1>
        <p className="text-primary/70 mb-10">
          Vi kan inte hitta sidan du letar efter. Den kanske har flyttats eller tagits bort.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-medium transition-all duration-500 ease-out hover:bg-primary/90"
        >
          Tillbaka till startsidan
        </Link>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Check, Copy, Download, Eye, Code as CodeIcon, ExternalLink } from "lucide-react";
import { EMAIL_TEMPLATES, type EmailTemplate } from "@/lib/emails/templates";
import { applySampleValues, SAMPLE_VALUES, SAMPLE_CONTACT } from "@/lib/emails/shell";

type Mode = "preview" | "raw";

export default function Emails() {
  const [active, setActive] = useState<string>(EMAIL_TEMPLATES[0].id);
  const [mode, setMode] = useState<Mode>("preview");
  const [showSampleValues, setShowSampleValues] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const current = useMemo<EmailTemplate>(
    () => EMAIL_TEMPLATES.find((t) => t.id === active) ?? EMAIL_TEMPLATES[0],
    [active],
  );

  const previewHtml = useMemo(
    () => (showSampleValues ? applySampleValues(current.html) : current.html),
    [current, showSampleValues],
  );

  const handleCopy = async (html: string, id: string) => {
    try {
      await navigator.clipboard.writeText(html);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // ignore
    }
  };

  const handleDownload = (tpl: EmailTemplate) => {
    const blob = new Blob([tpl.html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tpl.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 md:px-8 py-5 border-b border-border/40 bg-background/85 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-baseline gap-3">
            <Link href="/" className="font-serif text-base tracking-[0.22em] uppercase text-primary">
              Kvinnlig Lustkraft
            </Link>
            <span className="hidden sm:inline text-xs tracking-[0.2em] uppercase text-primary/40">
              · Email Templates
            </span>
          </div>
          <label className="flex items-center gap-2 text-xs text-primary/70 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showSampleValues}
              onChange={(e) => setShowSampleValues(e.target.checked)}
              className="accent-accent w-4 h-4"
            />
            <span className="tracking-wide">Visa med exempelvärden</span>
          </label>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-[10px] tracking-[0.28em] uppercase text-primary/50 font-bold mb-3">
            Mejlserie
          </p>
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0">
            {EMAIL_TEMPLATES.map((t) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`text-left rounded-xl px-3.5 py-2.5 text-[13px] leading-snug whitespace-nowrap lg:whitespace-normal transition-colors flex-shrink-0 lg:flex-shrink ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/60 text-primary/75 hover:bg-white"
                  }`}
                >
                  <div className="font-semibold">{t.label}</div>
                  <div
                    className={`text-[11px] mt-0.5 italic font-serif ${
                      isActive ? "text-white/75" : "text-primary/50"
                    }`}
                  >
                    {t.subject}
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 hidden lg:block bg-white/60 border border-border/40 rounded-xl p-4">
            <p className="text-[10px] tracking-[0.24em] uppercase text-primary/50 font-bold mb-2">
              GHL Custom Fields
            </p>
            <ul className="space-y-1.5 text-[11px] text-primary/65 font-mono leading-snug">
              {Object.keys(SAMPLE_CONTACT).map((k) => (
                <li key={k}>
                  <span className="text-accent">{`{{contact.${k}}}`}</span>
                </li>
              ))}
              {Object.keys(SAMPLE_VALUES).map((k) => (
                <li key={k}>
                  <span className="text-accent">{`{{custom_values.${k}}}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Detail */}
        <section className="min-w-0">
          <div className="bg-white rounded-2xl border border-border/40 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border/40 bg-cream/40">
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.24em] uppercase text-primary/50 font-bold">
                  Ämnesrad
                </div>
                <div className="font-serif text-lg md:text-xl text-primary truncate">
                  {current.subject}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="inline-flex rounded-full bg-white border border-border/50 p-0.5 text-xs">
                  <button
                    onClick={() => setMode("preview")}
                    className={`px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors ${
                      mode === "preview"
                        ? "bg-primary text-white"
                        : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                  <button
                    onClick={() => setMode("raw")}
                    className={`px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors ${
                      mode === "raw"
                        ? "bg-primary text-white"
                        : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <CodeIcon className="w-3.5 h-3.5" /> HTML
                  </button>
                </div>
                <button
                  onClick={() => handleCopy(current.html, current.id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent text-white text-xs font-semibold tracking-wide px-3.5 py-2 hover:bg-accent/90 transition-colors"
                >
                  {copiedId === current.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Kopierat!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Kopiera HTML
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownload(current)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border/60 text-primary text-xs font-semibold tracking-wide px-3.5 py-2 hover:bg-cream/60 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> .html
                </button>
                <a
                  href={`data:text/html;charset=utf-8,${encodeURIComponent(previewHtml)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border/60 text-primary text-xs font-semibold tracking-wide px-3.5 py-2 hover:bg-cream/60 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Öppna
                </a>
              </div>
            </div>

            {/* Body */}
            {mode === "preview" ? (
              <EmailPreview html={previewHtml} />
            ) : (
              <pre className="text-[11.5px] leading-relaxed text-primary/80 bg-cream/30 m-0 p-5 overflow-auto max-h-[80vh] whitespace-pre-wrap break-words font-mono">
                {current.html}
              </pre>
            )}
          </div>

          <p className="mt-4 text-xs text-primary/55 leading-relaxed">
            Toàn bộ placeholder dùng đúng GHL keys. Bấm <strong>Kopiera HTML</strong> →
            paste vào GHL Email Builder ở chế độ <em>Custom HTML</em>.
          </p>
        </section>
      </main>
    </div>
  );
}

function EmailPreview({ html }: { html: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(800);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    const resize = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        const h = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
        setHeight(h + 8);
      } catch {
        // ignore
      }
    };
    iframe.addEventListener("load", resize);
    const interval = window.setInterval(resize, 600);
    return () => {
      iframe.removeEventListener("load", resize);
      window.clearInterval(interval);
    };
  }, [html]);

  return (
    <iframe
      ref={ref}
      title="Email preview"
      srcDoc={html}
      className="w-full bg-[#f1ece2]"
      style={{ height, border: 0, display: "block" }}
    />
  );
}

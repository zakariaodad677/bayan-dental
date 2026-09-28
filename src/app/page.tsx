"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useLanguage, LanguageProvider } from "@/context/LanguageContext";
import { dictionary } from "@/data/dictionary";
import { doctors as allDoctors } from "@/lib/doctors";

// ─── Shared Icon Components ──────────────────────────────────────────────────

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function SnapchatIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.166.006c.185-.004.37-.006.556 0 1.356.038 2.616.484 3.63 1.261.999.767 1.753 1.832 2.133 3.046.113.355.164.727.202 1.097.04.385.047.772.047 1.158v.372c0 .052.004.104.013.154.046.254.191.478.403.622.212.144.466.194.716.14.099-.021.195-.052.289-.09.155-.062.311-.119.471-.154.1-.023.204-.034.307-.031.17.005.339.048.49.128.192.1.35.258.448.449.097.19.128.406.087.616-.035.183-.115.352-.232.491-.117.14-.268.247-.437.31-.037.014-.074.027-.112.038-.174.052-.328.163-.434.31-.107.147-.16.328-.148.51.057.748.252 1.478.577 2.153.154.322.337.63.543.921.411.575.934 1.066 1.543 1.444.146.09.298.172.453.247.084.041.17.079.258.113.268.103.556.133.84.087.123-.02.245-.052.361-.098.119-.048.233-.112.338-.188.213-.154.385-.361.501-.6.052-.108.089-.222.107-.339.018-.117.016-.237-.006-.353-.022-.117-.064-.228-.124-.33-.06-.101-.137-.19-.228-.264-.094-.076-.2-.134-.314-.172-.097-.033-.198-.051-.3-.053-.088-.002-.176.01-.26.034l-.011.003c-.107.03-.216.05-.326.058-.185.013-.372-.017-.543-.089-.171-.072-.32-.187-.434-.333-.113-.146-.188-.318-.217-.5-.028-.18-.011-.364.051-.533.064-.173.172-.326.312-.447.142-.121.31-.206.49-.249.178-.043.364-.036.54.02.182.058.348.161.482.301.047.05.09.103.127.16.059.09.103.188.132.293.03.105.04.214.033.323-.006.082-.022.162-.05.239-.028.077-.066.15-.114.217-.046.064-.1.122-.16.174.037.027.074.054.111.08.29.199.61.356.944.465.317.104.649.165.984.181.088.004.176.005.264.003.254-.007.507-.054.748-.138.24-.084.466-.21.665-.371l.003-.002c.253-.207.464-.463.617-.753.153-.29.246-.61.272-.937.025-.322-.012-.646-.108-.953-.097-.307-.259-.592-.473-.834-.071-.08-.147-.156-.228-.225-.28-.237-.612-.405-.965-.49-.351-.085-.717-.089-1.07-.012-.065.014-.129.031-.193.051-.132.041-.261.096-.382.162-.199.109-.383.243-.546.398l-.009.009c-.157.149-.294.318-.409.501-.116.184-.21.382-.28.589-.07.207-.115.421-.133.639-.017.213-.01.427.022.638.033.21.088.415.164.612.078.2.178.39.297.567.12.178.26.343.417.492.08.075.164.146.251.21.131.096.271.18.417.25.201.097.414.17.632.218.109.024.219.042.33.054.218.024.438.025.655-.004.216-.029.428-.085.629-.169.097-.04.191-.086.282-.138.178-.101.343-.22.493-.355.15-.135.284-.286.399-.449.115-.163.213-.337.29-.52.078-.184.133-.376.163-.573.03-.197.033-.397.01-.594-.023-.198-.073-.39-.149-.573-.076-.182-.178-.353-.304-.507-.125-.153-.27-.289-.431-.407-.161-.118-.336-.217-.521-.293-.186-.076-.379-.127-.578-.15-.197-.023-.398-.018-.594.015-.196.033-.387.092-.566.177-.084.04-.165.085-.244.134-.241.15-.453.342-.626.565l-.007.01c-.178.228-.309.491-.386.77-.077.28-.097.572-.059.858.019.139.05.275.094.407.044.132.102.258.17.378.136.238.318.447.533.617.108.084.222.158.341.22.235.12.492.196.758.223.264.027.532.001.786-.077.128-.039.252-.09.37-.153.118-.063.228-.138.33-.223l.012-.01c.195-.163.358-.364.477-.589.057-.111.102-.228.135-.349.033-.121.052-.244.057-.368.005-.124-.004-.248-.028-.37-.024-.121-.063-.238-.115-.349-.053-.111-.119-.215-.197-.31-.079-.094-.168-.178-.267-.25-.1-.071-.208-.13-.322-.176-.115-.044-.235-.073-.357-.087-.123-.013-.247-.01-.368.011-.121.021-.239.06-.348.115-.11.055-.21.126-.3.21-.09.084-.167.18-.23.286-.062.106-.109.22-.14.339-.031.118-.046.24-.045.362.001.122.018.243.052.36.033.117.082.229.146.333.063.103.14.198.228.282.088.084.186.158.292.22.105.062.217.112.334.149.232.072.476.093.717.061.123-.016.244-.044.361-.085.086-.03.17-.065.252-.106l.041-.02.006-.004c.062-.031.122-.067.178-.107.057-.04.11-.085.159-.133.05-.049.095-.102.135-.159.04-.057.075-.117.104-.18.029-.064.053-.13.07-.198.017-.068.027-.138.03-.208.003-.07 0-.141-.01-.21-.01-.07-.026-.138-.048-.205-.023-.067-.053-.131-.089-.191-.036-.06-.078-.116-.126-.167-.048-.051-.102-.096-.16-.136-.058-.04-.12-.074-.185-.101-.065-.027-.133-.047-.203-.059-.07-.012-.142-.016-.213-.012-.072.004-.143.016-.212.036-.069.02-.135.048-.197.083-.061.035-.118.077-.17.125-.051.048-.097.1-.137.157-.04.056-.074.117-.1.18-.027.063-.047.129-.059.197-.012.069-.016.138-.013.207.003.069.014.137.034.204.02.066.047.13.082.19.035.059.076.114.123.164.047.049.099.094.157.132.058.038.12.07.184.095.065.026.132.044.201.054.069.01.139.012.208.007.069-.005.138-.019.204-.042.065-.023.127-.054.185-.092.057-.038.109-.083.156-.133.046-.05.086-.105.12-.163.034-.059.061-.121.082-.185.02-.064.033-.131.039-.199.006-.068.004-.136-.005-.203-.009-.067-.026-.132-.051-.194-.025-.061-.058-.119-.097-.173-.039-.053-.085-.102-.136-.144-.051-.042-.107-.078-.166-.107-.059-.029-.121-.05-.185-.063-.064-.013-.13-.018-.195-.015-.066.003-.131.016-.194.037-.062.021-.122.05-.176.085-.054.035-.103.076-.147.123-.044.047-.082.099-.114.154-.031.056-.057.115-.074.176-.017.061-.027.124-.029.188-.002.063.007.127.026.189.019.061.046.12.081.173.035.053.078.101.126.143.049.042.103.077.161.104.058.027.119.047.181.058.062.011.126.013.189.007.063-.006.125-.021.184-.044.059-.023.115-.054.165-.091.05-.037.094-.08.133-.128.038-.047.069-.099.093-.154.024-.056.04-.114.048-.174.008-.06.007-.12.0-.18zm.285 3.197c-.07-.019-.141-.032-.212-.038-.143-.013-.288-.005-.429.023-.141.028-.278.076-.406.14-.128.065-.247.146-.353.243-.106.097-.198.209-.271.332-.074.123-.13.256-.163.395-.034.139-.044.281-.031.421.013.14.051.277.112.405.061.128.144.246.242.347.099.102.213.188.338.255.125.067.259.115.398.141.139.026.281.03.422.011.14-.019.277-.061.403-.125.126-.064.241-.15.34-.252.1-.101.182-.219.244-.346.062-.128.102-.265.118-.406.016-.14.01-.282-.017-.42-.028-.138-.079-.271-.15-.393-.072-.122-.163-.231-.269-.324-.107-.094-.228-.17-.358-.224zm10.25.56v-.397c0-.304-.003-.607-.031-.91-.028-.302-.083-.602-.175-.89-.182-.568-.503-1.08-.937-1.49-.434-.41-.965-.717-1.543-.89-.29-.086-.589-.137-.891-.157-.3-.019-.602-.008-.9.033-.14.019-.279.046-.415.083-.137.037-.27.082-.4.136-.262.107-.51.245-.736.41-.228.165-.433.356-.612.567-.18.211-.334.442-.456.688-.122.246-.211.505-.265.772-.054.266-.07.539-.044.809.025.271.087.536.182.787.192.502.51.943.918 1.284.408.342.891.578 1.4.685.128.027.257.047.387.059.13.012.261.017.392.013.261-.008.522-.049.774-.12.507-.141.973-.399 1.355-.754.381-.355.676-.796.858-1.286.091-.245.154-.501.187-.762.033-.26.034-.524.004-.785zm-10.501 3.88c-1.01-.029-1.942.413-2.565 1.116-.623.703-.949 1.667-.88 2.652.07.984.537 1.888 1.269 2.501.732.613 1.698.91 2.673.826.975-.083 1.877-.553 2.501-1.296.624-.744.939-1.729.874-2.716-.065-.987-.515-1.9-1.228-2.528-.713-.627-1.653-.928-2.644-.555zm-.011 1.2c.639-.024 1.265.215 1.738.671.473.456.749 1.093.762 1.764.013.67-.238 1.318-.696 1.794-.457.476-1.085.745-1.741.754-.656.009-1.289-.241-1.761-.699-.472-.457-.739-1.092-.741-1.762-.002-.67.261-1.31.73-1.772.469-.462 1.098-.72 1.709-.75zm7.74-1.199c-.638-.107-1.283.079-1.779.509-.496.43-.785 1.062-.797 1.729-.012.667.256 1.308.74 1.754.484.446 1.126.666 1.767.608.64-.058 1.228-.382 1.641-.893.412-.51.614-1.18.557-1.848-.057-.667-.377-1.287-.875-1.723-.498-.435-1.153-.636-1.254-.136zm1.167 2.23c.003.377-.142.739-.402 1.003-.26.264-.614.415-.984.416-.37.001-.726-.147-.99-.409-.264-.261-.41-.622-.41-.999 0-.377.145-.739.406-1.002.261-.263.615-.412.985-.411.37.001.724.151.985.415.261.264.406.627.41 1.004l-.0-.017z"/>
    </svg>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CTAButton({
  text, href, variant = "primary", className = "", target
}: {
  text: string; href: string; variant?: "primary" | "outline" | "ghost"; className?: string; target?: string;
}) {
  const base = "group relative overflow-hidden inline-flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.12em] transition-all duration-500 rounded-full";
  const variants = {
    primary: "bg-[var(--bayan-blue)] text-[var(--bayan-sand)] px-8 py-4 hover:shadow-[0_8px_30px_rgba(8,40,70,0.2)]",
    outline: "border-2 border-[var(--bayan-blue)] text-[var(--bayan-blue)] px-8 py-4 hover:shadow-[0_4px_20px_rgba(8,40,70,0.1)]",
    ghost: "text-[var(--bayan-blue)] px-4 py-2 hover:text-[var(--bayan-accent)]",
  };
  return (
    <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={`${base} ${variants[variant]} ${className}`}>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-[var(--bayan-accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
      )}
      {variant === "outline" && (
        <span className="absolute inset-0 bg-[var(--bayan-blue)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
      )}
      <span className={`relative z-10 transition-colors duration-500 ${variant === "outline" ? "group-hover:text-white" : "group-hover:text-white"}`}>
        {text}
      </span>
    </a>
  );
}

// ─── Floating WhatsApp ────────────────────────────────────────────────────────
function FloatingWhatsApp() {
  const { lang, dir } = useLanguage();
  const { whatsapp } = dictionary[lang].contact;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <motion.a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`fixed bottom-6 ${dir === "rtl" ? "left-6" : "right-6"} z-[100] flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-6 py-3 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)] transition-shadow duration-300`}
    >
      <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
        <WhatsAppIcon className="w-4 h-4" />
      </div>
      <div className="leading-none">
        <p className="text-[11px] font-medium opacity-80 mb-0.5">{lang === "ar" ? "تواصل معنا" : "Chat with us"}</p>
        <p className="text-sm font-bold">{lang === "ar" ? "احجز عبر واتساب" : "Book via WhatsApp"}</p>
      </div>
    </motion.a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const { lang, toggleLang, dir } = useLanguage();
  const d = dictionary[lang].nav;
  const c = dictionary[lang].contact;
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { key: "services", label: d.services },
    { key: "doctors", label: d.doctors },
    { key: "branches", label: d.branches },
  ];

  return (
    <>
      {/* Top info bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`hidden md:block bg-[var(--bayan-blue)] text-white/70 text-xs transition-all duration-500 overflow-hidden ${isScrolled ? "max-h-0 py-0" : "max-h-10 py-2"}`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className={`flex items-center gap-6 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <a href={`tel:${c.phone}`} className="hover:text-white transition-colors tracking-wide" dir="ltr">{c.phone}</a>
            <span className="opacity-30">|</span>
            <a href={`mailto:${c.email}`} className="hover:text-white transition-colors">{c.email}</a>
          </div>
          <span className="text-[var(--bayan-accent)] tracking-wide">
            {lang === "ar" ? "السبت — الخميس: ٩ صباحاً - ٩ مساءً" : "Sat — Thu: 9 AM – 9 PM"}
          </span>
        </div>
      </motion.div>

      {/* Main header */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? "top-0 bg-white/96 backdrop-blur-xl py-4 shadow-[0_1px_0_rgba(8,40,70,0.06)]" : "top-8 bg-transparent py-5"}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="relative z-50 flex items-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="Bayan Dental"
              className={`transition-all duration-500 object-contain ${isScrolled ? "h-9" : "h-11 md:h-13"}`}
            />
          </a>

          <nav className={`hidden lg:flex items-center gap-8 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            {navLinks.map(({ key, label }) => (
              <a
                key={key}
                href={`#${key}`}
                className="relative text-[11px] uppercase tracking-[0.15em] font-bold text-[var(--bayan-blue)]/55 hover:text-[var(--bayan-blue)] transition-colors duration-300 group py-1"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--bayan-accent)] group-hover:w-full transition-all duration-400" />
              </a>
            ))}
          </nav>

          <div className={`hidden lg:flex items-center gap-5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <button
              onClick={toggleLang}
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--bayan-blue)]/60 hover:text-[var(--bayan-accent)] transition-colors border border-[var(--bayan-blue)]/15 px-3 py-1.5 rounded-full hover:border-[var(--bayan-accent)]/40"
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <CTAButton text={d.book} href={`https://wa.me/${c.whatsapp}`} target="_blank" className="py-3 px-7 text-[11px]" />
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-end gap-[6px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`bg-[var(--bayan-blue)] h-[1.5px] transition-all duration-300 ${menuOpen ? "w-6 rotate-45 translate-y-[7.5px]" : "w-6"}`} />
            <span className={`bg-[var(--bayan-blue)] h-[1.5px] transition-all duration-300 ${menuOpen ? "opacity-0 w-6" : "w-4"}`} />
            <span className={`bg-[var(--bayan-blue)] h-[1.5px] transition-all duration-300 ${menuOpen ? "w-6 -rotate-45 -translate-y-[7.5px]" : "w-6"}`} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--bayan-sand)] flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-10 mb-12">
              {navLinks.map(({ key, label }, i) => (
                <motion.a
                  key={key}
                  href={`#${key}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-3xl font-bold text-[var(--bayan-blue)] hover:text-[var(--bayan-accent)] transition-colors"
                >
                  {label}
                </motion.a>
              ))}
            </nav>
            <div className="flex flex-col items-center gap-5">
              <CTAButton text={d.book} href={`https://wa.me/${dictionary[lang].contact.whatsapp}`} target="_blank" className="px-10 py-4" />
              <button onClick={() => { toggleLang(); setMenuOpen(false); }} className="text-sm font-bold text-[var(--bayan-blue)]/50 hover:text-[var(--bayan-accent)]">
                {lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const { lang, dir } = useLanguage();
  const d = dictionary[lang].hero;
  const [current, setCurrent] = useState(0);
  const slides = d.slides ?? [];

  useEffect(() => {
    if (!slides.length) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  const nextSlide = () => setCurrent((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black pt-24 md:pt-16">
      {/* Slide image */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={current}
            src={slides[current]?.image}
            alt=""
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Dark subtle gradient for text readability (instead of the exaggerated white overlay) */}
        <div className={`absolute inset-0 ${dir === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-black/80 via-black/40 to-transparent`} />
        {/* Mobile overlay */}
        <div className="absolute inset-0 bg-black/40 lg:hidden" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
        <div className={`max-w-xl lg:max-w-[52%] ${dir === "rtl" ? "lg:mr-auto" : "lg:ml-0"} pointer-events-auto`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Slide label */}
              <div className={`flex items-center gap-4 mb-8 ${dir === "rtl" ? "flex-row" : ""}`}>
                <span className="font-[var(--font-serif-luxury)] italic text-[var(--bayan-accent)] text-lg tracking-wider">
                  {slides[current]?.number}
                </span>
                <span className="w-10 h-[1px] bg-[var(--bayan-accent)]" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/80 font-bold">
                  {lang === "ar" ? "بيان لطب الأسنان" : "Bayan Dental"}
                </span>
              </div>

              {/* Main headline */}
              <h1
                className="font-bold text-white mb-7 drop-shadow-lg"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                  lineHeight: lang === "ar" ? 1.4 : 1.15,
                }}
              >
                {slides[current]?.title || d.title}
              </h1>

              {/* Subtitle */}
              <p
                className="text-white/80 font-light mb-10 max-w-lg drop-shadow-md"
                style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.125rem)", lineHeight: lang === "ar" ? 1.85 : 1.7 }}
              >
                {slides[current]?.subtitle || d.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className={`flex flex-col sm:flex-row gap-4 ${dir === "rtl" ? "sm:flex-row-reverse sm:justify-end" : ""}`}
          >
            <CTAButton text={d.ctaBook} href={`https://wa.me/${dictionary[lang].contact.whatsapp}`} target="_blank" />
            <CTAButton 
              text={lang === "ar" ? "استكشف خدماتنا" : "Explore Treatments"} 
              href="#services" 
              className="border-2 border-white text-white hover:bg-white hover:text-[var(--bayan-blue)] px-8 py-4 uppercase tracking-[0.12em] text-sm font-bold rounded-full transition-all duration-500" 
            />
          </motion.div>
        </div>
      </div>

      {/* Slide controls */}
      {slides.length > 1 && (
        <div className={`absolute bottom-10 ${dir === "rtl" ? "right-6 md:right-12" : "left-6 md:left-12"} z-20 flex flex-col md:flex-row md:items-center gap-6`}>
          {/* Navigation Arrows */}
          <div className={`hidden md:flex gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <button 
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[var(--bayan-blue)] transition-colors backdrop-blur-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button 
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[var(--bayan-blue)] transition-colors backdrop-blur-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-[3px] rounded-full transition-all duration-500 ${i === current ? "w-12 bg-[var(--bayan-accent)]" : "w-6 bg-white/30 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Stats Bar (Premium Marquee) ──────────────────────────────────────────────
function StatsBar() {
  const { lang, dir } = useLanguage();
  const stats = dictionary[lang].hero.stats ?? [];
  if (!stats.length) return null;

  // We duplicate the stats array multiple times to ensure enough content for a seamless loop
  // on ultra-wide screens.
  const repeatedStats = [...stats, ...stats, ...stats, ...stats, ...stats, ...stats];

  return (
    <section className="bg-[var(--bayan-blue)] text-white overflow-hidden py-10 md:py-14 border-y border-[var(--bayan-accent)]/10 relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-ltr {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-marquee-ltr {
          display: flex;
          width: max-content;
          animation: scroll-ltr 30s linear infinite;
        }
        .animate-marquee-rtl {
          display: flex;
          width: max-content;
          animation: scroll-rtl 30s linear infinite;
        }
        .marquee-container:hover .animate-marquee-ltr,
        .marquee-container:hover .animate-marquee-rtl {
          animation-play-state: paused;
        }
      `}} />

      {/* Edge Gradients for smooth fade in/out */}
      <div className={`absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[var(--bayan-blue)] to-transparent z-10`} />
      <div className={`absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[var(--bayan-blue)] to-transparent z-10`} />

      <div className="marquee-container w-full overflow-hidden">
        <div className={dir === "rtl" ? "animate-marquee-rtl" : "animate-marquee-ltr"}>
          {repeatedStats.map((stat: any, i: number) => (
            <div key={i} className="flex items-center gap-12 px-6 md:px-12">
              <div className={`flex items-center gap-4 md:gap-6 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <span 
                  className="font-[var(--font-serif-luxury)] text-[var(--bayan-accent)] font-medium"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", lineHeight: 1 }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 font-bold whitespace-nowrap max-w-[150px] leading-relaxed text-left">
                  {stat.label}
                </span>
              </div>
              
              {/* Elegant Separator */}
              <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[var(--bayan-accent)]/30 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Bayan (Trust / About) ────────────────────────────────────────────────
function WhyBayan() {
  const { lang, dir } = useLanguage();

  const arFeatures = [
    { icon: "🏆", title: "فريق من نخبة الأخصائيين", desc: "أكثر من 30 أخصائياً واستشارياً مؤهلاً دولياً في مختلف التخصصات الدقيقة." },
    { icon: "🔬", title: "تقنيات طبية متقدمة", desc: "أحدث الأجهزة والتقنيات الطبية لضمان دقة التشخيص وفاعلية العلاج." },
    { icon: "🌿", title: "بيئة راحة واسترخاء", desc: "عيادات صُممت بعناية لتمنحك تجربة مريحة وهادئة بعيداً عن الضغط." },
    { icon: "📍", title: "4 فروع في الكويت", desc: "متواجدون في أبرز المناطق لتكون الرعاية الممتازة قريبة منك دائماً." },
  ];

  const enFeatures = [
    { icon: "🏆", title: "Elite Specialist Team", desc: "Over 30 internationally qualified specialists and consultants across all dental disciplines." },
    { icon: "🔬", title: "Advanced Medical Technology", desc: "The latest equipment and technology for precise diagnostics and effective treatment." },
    { icon: "🌿", title: "Comfort-Centered Environment", desc: "Clinics designed to provide a relaxing, stress-free experience for every patient." },
    { icon: "📍", title: "4 Kuwait Locations", desc: "Strategically located across Kuwait so that premium care is always within reach." },
  ];

  const features = lang === "ar" ? arFeatures : enFeatures;

  return (
    <section className="py-24 md:py-36 bg-[var(--bayan-sand-light)]">
      <div className="container mx-auto px-6 md:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${dir === "rtl" ? "lg:flex lg:flex-row-reverse" : ""}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img src="/why_us.jpg" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bayan-blue)]/20 to-transparent" />
            </div>
            {/* Accent badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`absolute -bottom-6 ${dir === "rtl" ? "-left-6" : "-right-6"} bg-[var(--bayan-blue)] text-white p-8 rounded-2xl shadow-xl`}
            >
              <div className="font-[var(--font-serif-luxury)] text-[var(--bayan-accent)] text-4xl mb-1">20+</div>
              <div className="text-[11px] uppercase tracking-[0.15em] text-white/60">
                {lang === "ar" ? "عاماً من التميز" : "Years of Excellence"}
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--bayan-accent)] font-bold mb-5">
              {lang === "ar" ? "لماذا بيان؟" : "Why Bayan Dental"}
            </p>
            <h2
              className="font-bold text-[var(--bayan-blue)] mb-6"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: lang === "ar" ? 1.4 : 1.2 }}
            >
              {lang === "ar" ? "رعاية طبية تتجاوز توقعاتك" : "Healthcare That Exceeds Expectations"}
            </h2>
            <p
              className="text-[var(--bayan-blue)]/60 font-light mb-12 max-w-lg"
              style={{ lineHeight: lang === "ar" ? 1.85 : 1.7 }}
            >
              {lang === "ar"
                ? "في بيان، نؤمن بأن كل مريض يستحق الأفضل. لهذا جمعنا نخبة من الأطباء، وجهزنا عياداتنا بأحدث التقنيات، وصممنا تجربة مريحة تجعل زيارتك لحظة طمأنينة لا قلق."
                : "At Bayan, we believe every patient deserves the best. That's why we've assembled an elite team of specialists, equipped our clinics with cutting-edge technology, and created a comfortable experience that makes every visit a moment of confidence, not anxiety."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-4"
                >
                  <span className="text-2xl mt-0.5 flex-shrink-0">{f.icon}</span>
                  <div>
                    <h4 className="font-bold text-[var(--bayan-blue)] mb-1 text-[0.9rem]">{f.title}</h4>
                    <p className="text-[var(--bayan-blue)]/55 text-sm font-light leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
// Fix: correct image assignments per service
const serviceImages = [
  "/service_1_cosmetic.jpg",  // Cosmetic
  "/service_2_implants.jpg",  // Implants
  "/service_3_ortho.jpg",     // Orthodontics
  "/service_4_endo.jpg",      // Endodontics
];

function Services() {
  const { lang, dir } = useLanguage();
  const d = dictionary[lang].services;

  return (
    <section id="services" className="py-24 md:py-36 bg-white">
      <div className="container mx-auto px-6 md:px-12">

        {/* Section header */}
        <div className={`mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8 ${dir === "rtl" ? "md:flex-row-reverse" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--bayan-accent)] font-bold mb-4">
              {lang === "ar" ? "تخصصاتنا الطبية" : "Our Specialties"}
            </p>
            <h2
              className="font-bold text-[var(--bayan-blue)]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: lang === "ar" ? 1.4 : 1.2 }}
            >
              {d.title}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[var(--bayan-blue)]/55 font-light max-w-sm text-sm leading-relaxed md:text-right"
            style={{ textAlign: dir === "rtl" ? "left" : "right" }}
          >
            {d.subtitle}
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {d.items.map((service: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative bg-[var(--bayan-sand-light)] rounded-2xl overflow-hidden border border-[var(--bayan-blue)]/5 hover:border-transparent hover:shadow-[0_20px_60px_rgba(8,40,70,0.12)] transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="h-56 md:h-64 overflow-hidden relative">
                <img
                  src={serviceImages[i] ?? service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Number */}
                <span className={`absolute top-4 ${dir === "rtl" ? "left-4" : "right-4"} font-[var(--font-serif-luxury)] text-white/90 text-4xl italic leading-none`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Text */}
              <div className="p-8 md:p-10">
                <h3 className="font-bold text-[var(--bayan-blue)] text-xl mb-3">{service.name}</h3>
                <p className="text-[var(--bayan-blue)]/60 text-sm font-light leading-relaxed mb-6">{service.desc}</p>
                <div className={`flex items-center gap-2 text-[var(--bayan-accent)] text-[11px] font-bold uppercase tracking-[0.15em] group-hover:gap-4 transition-all duration-300 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  <span>{lang === "ar" ? "اكتشف المزيد" : "Learn More"}</span>
                  <span className="text-base">{dir === "rtl" ? "←" : "→"}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Architectural Break ──────────────────────────────────────────────────────
function ArchitecturalBreak() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="h-[45vh] md:h-[55vh] relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-25%] w-[150%] h-[150%]">
        <img
          src="/premium_dental_architecture_1790444331213.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[var(--bayan-blue)]/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[var(--font-serif-luxury)] italic text-white/80 text-center px-6"
          style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
        >
          {/* intentionally left as atmospheric — no text needed */}
        </motion.p>
      </div>
    </section>
  );
}

// ─── Doctors ──────────────────────────────────────────────────────────────────
function Doctors() {
  const { lang, dir } = useLanguage();
  const d = dictionary[lang].doctors;
  const [showAll, setShowAll] = useState(false);
  const displayedDoctors = showAll ? d.items : d.items.slice(0, 12);

  return (
    <section id="doctors" className="py-24 md:py-36 bg-[var(--bayan-sand-light)]">
      <div className="container mx-auto px-6 md:px-12">

        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 ${dir === "rtl" ? "md:flex-row-reverse" : ""}`}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--bayan-accent)] font-bold mb-4">
              {lang === "ar" ? "نخبة الأطباء" : "Medical Excellence"}
            </p>
            <h2
              className="font-bold text-[var(--bayan-blue)]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: lang === "ar" ? 1.4 : 1.2 }}
            >
              {d.title}
            </h2>
            <p className="text-[var(--bayan-blue)]/55 font-light mt-4 max-w-lg text-sm leading-relaxed">{d.subtitle}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <CTAButton text={d.note} href={`https://wa.me/${dictionary[lang].contact.whatsapp}`} target="_blank" variant="outline" className="hidden md:inline-flex" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
          {(showAll ? allDoctors : allDoctors.slice(0, 12)).map((doctor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4) }}
            >
              <Link
                href={`/doctors/${doctor.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[var(--bayan-blue)]/5 hover:border-[var(--bayan-accent)]/25 hover:shadow-[0_12px_40px_rgba(8,40,70,0.1)] transition-all duration-400 block"
              >
                {/* Photo */}
                <div className="aspect-square overflow-hidden bg-[var(--bayan-sand)] relative">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--bayan-blue)]/5 to-[var(--bayan-accent)]/10">
                      <span className="font-[var(--font-serif-luxury)] text-3xl italic text-[var(--bayan-blue)]/30">BD</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bayan-blue)]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {/* Hover CTA */}
                  <div className="absolute bottom-3 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0 z-10">
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                      {lang === "ar" ? "عرض الملف" : "View Profile"}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--bayan-accent)] font-bold mb-1.5 leading-tight">{doctor.role}</p>
                  <h3 className="text-[0.78rem] font-bold text-[var(--bayan-blue)] leading-snug group-hover:text-[var(--bayan-accent)] transition-colors">{doctor.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Show more / less */}
        {d.items.length > 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-3 text-sm font-bold text-[var(--bayan-blue)] border border-[var(--bayan-blue)]/20 px-8 py-3.5 rounded-full hover:bg-[var(--bayan-blue)] hover:text-white hover:border-[var(--bayan-blue)] transition-all duration-400"
            >
              {showAll
                ? (lang === "ar" ? "عرض أقل" : "Show Less")
                : (lang === "ar" ? `عرض جميع الأطباء (${d.items.length})` : `View All Specialists (${d.items.length})`)}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── Locations ────────────────────────────────────────────────────────────────
function Locations() {
  const { lang, dir } = useLanguage();
  const d = dictionary[lang].locations;

  const mapLinks: Record<string, string> = {
    "KIPCO Tower":    "https://www.google.com/maps/search/Bayan+Dental+KIPCO+Tower+Kuwait",
    "Laila Gallery":  "https://www.google.com/maps/search/Bayan+Dental+Salmiya+Kuwait",
    "Egaila":         "https://www.google.com/maps/search/Bayan+Dental+Egaila+Kuwait",
    "Jahra":          "https://www.google.com/maps/search/Bayan+Dental+Jahra+Kuwait",
    "برج كيبكو":      "https://www.google.com/maps/search/Bayan+Dental+KIPCO+Tower+Kuwait",
    "برج ليلى":       "https://www.google.com/maps/search/Bayan+Dental+Salmiya+Kuwait",
    "العقيلة":        "https://www.google.com/maps/search/Bayan+Dental+Egaila+Kuwait",
    "الجهراء":        "https://www.google.com/maps/search/Bayan+Dental+Jahra+Kuwait",
  };

  return (
    <section id="branches" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/locations_bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--bayan-blue)]/88" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--bayan-accent)] font-bold mb-4">
            {lang === "ar" ? "مواقعنا" : "Our Locations"}
          </p>
          <h2
            className="font-bold text-white"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: lang === "ar" ? 1.4 : 1.2 }}
          >
            {d.title}
          </h2>
          <p className="text-white/50 font-light mt-4 max-w-lg mx-auto text-sm leading-relaxed">{d.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12">
          {d.items.map((loc: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-7 md:p-8 hover:bg-white/14 hover:border-white/25 transition-all duration-400"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--bayan-accent)]/20 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-[var(--bayan-accent)]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg mb-1">{loc.name}</h3>
              <p className="text-white/45 text-sm mb-6">{loc.area}</p>
              <div className={`flex flex-col gap-3 ${dir === "rtl" ? "items-start" : ""}`}>
                <a
                  href={`tel:${loc.phone}`}
                  dir="ltr"
                  className="flex items-center gap-2 text-[var(--bayan-accent)] text-sm font-bold hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                  </svg>
                  {loc.phone}
                </a>
                <a
                  href={mapLinks[loc.name] ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/35 text-[11px] uppercase tracking-[0.12em] hover:text-white/70 transition-colors"
                >
                  {lang === "ar" ? "اعرض على الخريطة" : "View on Map"}
                  <span>{dir === "rtl" ? "←" : "→"}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central booking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <CTAButton
            text={lang === "ar" ? "احجز موعدك الآن" : "Book Your Appointment"}
            href={`https://wa.me/${dictionary[lang].contact.whatsapp}`}
            target="_blank"
            className="px-12 py-4 bg-[var(--bayan-accent)] text-white hover:bg-white hover:text-[var(--bayan-blue)] border-2 border-transparent hover:border-transparent !bg-[var(--bayan-accent)]"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { lang, dir } = useLanguage();
  const c = dictionary[lang].contact;
  const f = dictionary[lang].footer as any;
  const n = dictionary[lang].nav;

  if (!f) return null;

  const navLinks = [
    { key: "services", label: n.services },
    { key: "doctors", label: n.doctors },
    { key: "branches", label: n.branches },
  ];

  return (
    <footer className="bg-[var(--bayan-blue)] text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className={`lg:col-span-1 ${dir === "rtl" ? "" : ""}`}>
            <img src="/logo.png" alt="Bayan Dental" className="h-12 mb-6 object-contain" style={{ filter: "brightness(0) invert(1) opacity(0.9)" }} />
            <p className="text-white/45 text-sm font-light leading-relaxed mb-8 max-w-xs">{f.desc}</p>
            {/* Social */}
            <div className={`flex gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              {[
                { href: "https://www.instagram.com/bayandental", icon: <InstagramIcon /> },
                { href: "https://wa.me/9651822926", icon: <WhatsAppIcon className="w-4 h-4" /> },
              ].map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:bg-[var(--bayan-accent)] hover:border-[var(--bayan-accent)] transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-[var(--bayan-accent)] font-bold mb-6">{f.quickLinks}</h4>
            <ul className="space-y-3.5">
              {navLinks.map(({ key, label }) => (
                <li key={key}>
                  <a href={`#${key}`} className={`text-white/45 text-sm hover:text-white transition-colors flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse justify-end" : ""}`}>
                    <span className="w-4 h-[1px] bg-[var(--bayan-accent)]/60" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-[var(--bayan-accent)] font-bold mb-6">{f.contactInfo}</h4>
            <ul className="space-y-5">
              <li className={`flex items-start gap-3 ${dir === "rtl" ? "flex-row-reverse text-right" : ""}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-[var(--bayan-accent)] mt-0.5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
                <div>
                  <p className="text-white/60 text-sm leading-relaxed">{f.address}</p>
                  <a href="https://www.google.com/maps/search/Bayan+Dental+Kuwait" target="_blank" rel="noopener noreferrer" className="text-[11px] text-[var(--bayan-accent)]/70 hover:text-[var(--bayan-accent)] mt-1 inline-block">{f.maps} →</a>
                </div>
              </li>
              <li className={`flex items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-[var(--bayan-accent)] flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                </svg>
                <a href={`tel:${c.phone}`} className="text-white/60 text-sm hover:text-white transition-colors" dir="ltr">{c.phone}</a>
              </li>
              <li className={`flex items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-[var(--bayan-accent)] flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                </svg>
                <a href={`mailto:${c.email}`} className="text-white/60 text-sm hover:text-white transition-colors">{c.email}</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-[var(--bayan-accent)] font-bold mb-6">{f.workingHours}</h4>
            <div className="text-white/45 text-sm leading-loose whitespace-pre-line">{f.hours}</div>
            <div className="mt-8">
              <CTAButton
                text={lang === "ar" ? "احجز الآن" : "Book Now"}
                href={`https://wa.me/${c.whatsapp}`}
                target="_blank"
                className="!text-white !bg-[var(--bayan-accent)] hover:!bg-white hover:!text-[var(--bayan-blue)] !border-transparent text-[11px] !px-6 !py-3"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-7 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/25">
          <p>© {new Date().getFullYear()} {f.rights}</p>
          <div className={`flex gap-6 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <a href="#" className="hover:text-white/60 transition-colors">{lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}</a>
            <a href="#" className="hover:text-white/60 transition-colors">{lang === "ar" ? "شروط الخدمة" : "Terms of Service"}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function AppContent() {
  const { dir, lang } = useLanguage();

  return (
    <main
      dir={dir}
      lang={lang}
      className="min-h-screen bg-[var(--bayan-sand)] antialiased selection:bg-[var(--bayan-accent)] selection:text-white"
      style={{ fontFamily: lang === "ar" ? "var(--font-arabic)" : "var(--font-english)" }}
    >
      <Navbar />
      <Hero />
      <StatsBar />
      <WhyBayan />
      <Services />
      <ArchitecturalBreak />
      <Doctors />
      <Locations />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

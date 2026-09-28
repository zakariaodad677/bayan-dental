"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { doctors, getDoctorBySlug, specialtyDescriptions } from "@/lib/doctors";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function DoctorPageContent({ slug }: { slug: string }) {
  const { lang, toggleLang } = useLanguage();
  const doctor = getDoctorBySlug(slug);

  if (!doctor) notFound();

  const desc = specialtyDescriptions[doctor.role];
  const specialtyText = lang === "ar" ? (desc?.ar ?? doctor.role) : (desc?.en ?? doctor.role);

  // Find index and get prev/next
  const idx = doctors.findIndex((d) => d.slug === slug);
  const prev = idx > 0 ? doctors[idx - 1] : null;
  const next = idx < doctors.length - 1 ? doctors[idx + 1] : null;

  // Related doctors: same role category, excluding self
  const roleKeyword = doctor.role.split(" ")[0].toLowerCase();
  const related = doctors
    .filter((d) => d.slug !== slug && d.role.toLowerCase().includes(roleKeyword))
    .slice(0, 4);
  const otherRelated = related.length < 4
    ? [...related, ...doctors.filter((d) => d.slug !== slug && !related.includes(d)).slice(0, 4 - related.length)]
    : related;

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#FAF9F7]"
      style={{ fontFamily: lang === "ar" ? "var(--font-arabic)" : "var(--font-english)" }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#082846]/6 py-4">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Bayan Dental" className="h-9 object-contain" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#doctors" className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#082846]/50 hover:text-[#082846] transition-colors">
              {lang === "ar" ? "← الأطباء" : "← Our Doctors"}
            </Link>
            <button onClick={toggleLang} className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#082846]/50 hover:text-[#C2A278] border border-[#082846]/15 px-3 py-1.5 rounded-full">
              {lang === "ar" ? "EN" : "عربي"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 bg-[#082846] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/hero_1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="container mx-auto px-6 md:px-12 py-20 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                {doctor.image ? (
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#082846] to-[#0B3A66] flex items-center justify-center">
                    <span className="font-[var(--font-serif-luxury)] italic text-[#C2A278] text-5xl">BD</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex-1"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#C2A278] font-bold mb-3">
                {lang === "ar" ? "بيان لطب الأسنان" : "Bayan Dental"}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {doctor.name}
              </h1>
              <p className="text-lg text-[#C2A278] font-medium mb-6">{doctor.role}</p>
              <p className="text-white/60 font-light leading-relaxed max-w-2xl text-[0.95rem]" style={{ lineHeight: 1.8 }}>
                {specialtyText}
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/9651822926"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#1db954] transition-colors shadow-lg"
                >
                  <WhatsAppIcon />
                  {lang === "ar" ? "احجز موعداً مع الدكتور" : "Book with this Doctor"}
                </a>
                <a
                  href="tel:+9651822926"
                  className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                  </svg>
                  1822926
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detail Cards */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎓",
                title: lang === "ar" ? "التخصص" : "Specialty",
                value: doctor.role,
              },
              {
                icon: "🏥",
                title: lang === "ar" ? "العيادة" : "Clinic",
                value: "Bayan Dental – Kuwait",
              },
              {
                icon: "📞",
                title: lang === "ar" ? "للحجز" : "Appointments",
                value: "1822926",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#FAF9F7] rounded-2xl p-8 border border-[#082846]/6"
              >
                <span className="text-3xl mb-5 block">{card.icon}</span>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#C2A278] font-bold mb-2">{card.title}</p>
                <p className="text-[#082846] font-bold text-lg">{card.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Specialty Section */}
      <section className="py-16 md:py-20 bg-[#FAF9F7]">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#082846] mb-6">
            {lang === "ar" ? `عن تخصص ${doctor.role}` : `About ${doctor.role}`}
          </h2>
          <p className="text-[#082846]/60 font-light leading-relaxed text-[1rem] mb-8" style={{ lineHeight: 1.85 }}>
            {specialtyText}
          </p>
          <div className="bg-[#082846] text-white rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div>
              <p className="font-bold text-lg mb-1">{lang === "ar" ? "هل تريد حجز موعد؟" : "Ready to book an appointment?"}</p>
              <p className="text-white/60 text-sm">{lang === "ar" ? "تواصل معنا عبر واتساب أو الاتصال المباشر" : "Contact us via WhatsApp or direct call"}</p>
            </div>
            <a
              href="https://wa.me/9651822926"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#1db954] transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon />
              {lang === "ar" ? "احجز الآن" : "Book Now"}
            </a>
          </div>
        </div>
      </section>

      {/* Other Doctors */}
      {otherRelated.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-2xl font-bold text-[#082846] mb-10">
              {lang === "ar" ? "أطباء آخرون في بيان" : "More Doctors at Bayan"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {otherRelated.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/doctors/${doc.slug}`}
                  className="group bg-[#FAF9F7] rounded-xl overflow-hidden border border-[#082846]/6 hover:border-[#C2A278]/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    {doc.image ? (
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#082846]/5 to-[#C2A278]/10 flex items-center justify-center">
                        <span className="font-serif text-2xl text-[#082846]/30 italic">BD</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[9px] uppercase tracking-widest text-[#C2A278] font-bold mb-1">{doc.role}</p>
                    <p className="text-[0.78rem] font-bold text-[#082846] leading-snug">{doc.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <section className="border-t border-[#082846]/8 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex">
            {prev && (
              <Link
                href={`/doctors/${prev.slug}`}
                className="flex-1 flex items-center gap-4 py-8 group hover:bg-[#FAF9F7] transition-colors px-4 rounded-l-2xl"
              >
                <span className="text-[#082846]/30 text-2xl group-hover:text-[#C2A278] transition-colors">←</span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#082846]/30 mb-1">
                    {lang === "ar" ? "السابق" : "Previous"}
                  </p>
                  <p className="font-bold text-[#082846] text-sm">{prev.name}</p>
                  <p className="text-[11px] text-[#082846]/40">{prev.role}</p>
                </div>
              </Link>
            )}
            {next && (
              <Link
                href={`/doctors/${next.slug}`}
                className={`flex-1 flex items-center gap-4 py-8 group hover:bg-[#FAF9F7] transition-colors px-4 rounded-r-2xl ${lang === "ar" ? "flex-row-reverse text-right" : "flex-row-reverse justify-end text-right"}`}
              >
                <span className="text-[#082846]/30 text-2xl group-hover:text-[#C2A278] transition-colors">→</span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#082846]/30 mb-1">
                    {lang === "ar" ? "التالي" : "Next"}
                  </p>
                  <p className="font-bold text-[#082846] text-sm">{next.name}</p>
                  <p className="text-[11px] text-[#082846]/40">{next.role}</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="bg-[#082846] text-white/40 text-center text-xs py-6">
        <p>© {new Date().getFullYear()} Bayan Dental – Kuwait. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function DoctorPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  return (
    <LanguageProvider>
      <DoctorPageContent slug={slug as string} />
    </LanguageProvider>
  );
}

// Shared doctor data & slug utilities
export interface Doctor {
  name: string;
  role: string;
  image: string;
  slug: string;
}

const rawDoctors = [
  { name: "Dr. Abdulwahab AlNoumas", role: "General Practitioner", image: "https://admin.bayandental.com/uploads/173856957167a07763cf64f5.09611538.jpg" },
  { name: "Dr. Saitah Al-Ajami", role: "Orthodontist", image: "https://admin.bayandental.com/uploads/173856895467a074fadcb563.74085087.jpg" },
  { name: "Dr. Ali Majeki", role: "Cosmetic Dentistry Consultant", image: "https://admin.bayandental.com/uploads/173856795467a07112d820a4.28722607.jpg" },
  { name: "Dr. Salim Al-Aqel", role: "Periodontist", image: "https://admin.bayandental.com/uploads/1731412416673341c03eb809.97666919.jpg" },
  { name: "Dr. Hanan Arti", role: "Prosthodontist", image: "https://admin.bayandental.com/uploads/1731220447673053df1f84c8.15783408.jpg" },
  { name: "Dr. Faisal Al-Rashedi", role: "Prosthodontist", image: "https://admin.bayandental.com/uploads/1731220563673054535c6360.95847172.jpg" },
  { name: "Dr. Ayman Al-Ammar", role: "Orthodontist", image: "https://admin.bayandental.com/uploads/1731220662673054b6d922e8.66163490.jpg" },
  { name: "Dr. Mai Omar", role: "General Practitioner – Pediatrics", image: "https://admin.bayandental.com/uploads/173122077167305523364637.63039627.jpg" },
  { name: "Dr. Hiba Al-Banna", role: "General Practitioner", image: "https://admin.bayandental.com/uploads/1733215881674ec6892a9e94.89957571.jpg" },
  { name: "Dr. Ahmad Kamal", role: "Periodontology & Implantology Specialist", image: "https://admin.bayandental.com/uploads/17324308606742cc0c579b67.68802684.jpg" },
  { name: "Dr. Ala'a El-Shahrouri", role: "General Practitioner", image: "https://admin.bayandental.com/uploads/1733215905674ec6a1536d23.81112223.jpg" },
  { name: "Dr. Ayad Nweisser", role: "Restorative & Aesthetic Dentistry", image: "https://admin.bayandental.com/uploads/173856570667a0684ade5556.35457761.jpg" },
  { name: "Dr. Faouzi Riachi", role: "Periodontology & Implantology", image: "https://admin.bayandental.com/uploads/173856604067a06998a22fa9.81482004.jpg" },
  { name: "Dr. Hussein Irhama", role: "Advanced General Practitioner", image: "https://admin.bayandental.com/uploads/1731221554673058326f4973.27567673.jpg" },
  { name: "Dr. Mohammad Abu Rabie", role: "General Practitioner – Pediatrics", image: "https://admin.bayandental.com/uploads/1731221862673059665a51c5.20935770.jpg" },
  { name: "Dr. George Aouad", role: "Pediatric Dentistry Specialist", image: "https://admin.bayandental.com/uploads/1731221963673059cbe28449.71549744.jpg" },
  { name: "Dr. Ahmad Al-Sahli", role: "Advanced General Practitioner", image: "https://admin.bayandental.com/uploads/173122208267305a42290350.43415977.jpg" },
  { name: "Dr. Ahmad Dashti", role: "Oral & Maxillofacial Surgeon", image: "https://admin.bayandental.com/uploads/173122224367305ae38b2593.90005314.jpg" },
  { name: "Dr. Bassam Rahal", role: "Endodontist", image: "https://admin.bayandental.com/uploads/173122234567305b4956f3e8.90474828.jpg" },
  { name: "Dr. Abdulrahman Al-Hemeli", role: "Periodontology & Implantology", image: "https://admin.bayandental.com/uploads/173122267267305c90798e59.13443091.jpg" },
  { name: "Dr. Jasem Asad", role: "Endodontic Specialist", image: "https://admin.bayandental.com/uploads/173122274667305cdab149d9.78809205.jpg" },
  { name: "Dr. Mohammad Al-Yaseen", role: "Orthodontist", image: "https://admin.bayandental.com/uploads/173122284367305d3b83e454.21131649.jpg" },
  { name: "Dr. Naren Ramachandran", role: "Endodontist", image: "https://admin.bayandental.com/uploads/173122293567305d97e7d548.37201896.jpg" },
  { name: "Dr. Nasser Al-Amiri", role: "Orthodontist – Egaila Branch", image: "https://admin.bayandental.com/uploads/173122301367305de5762f40.21470428.jpg" },
  { name: "Dr. Waleed Al-Yaseen", role: "Prosthodontist & Periodontist", image: "https://admin.bayandental.com/uploads/173121889667304dd0b67ac0.30457621.jpg" },
  { name: "Dr. Mohammed Al-Kandari", role: "Orthodontist", image: "https://admin.bayandental.com/uploads/173121937267304faca6f3c3.41506635.jpg" },
  { name: "Dr. Subodh Sharma", role: "Orthodontist", image: "https://admin.bayandental.com/uploads/1731219677673050dd134e11.34622901.jpg" },
  { name: "Dr. Samer Khaddour", role: "Restorative & Aesthetic Dentistry – Medical Director", image: "https://admin.bayandental.com/uploads/1731219833673051796a2995.53405492.jpg" },
  { name: "Dr. Yaqoub Al-Tarakmah", role: "Prosthodontist", image: "https://admin.bayandental.com/uploads/173122312267305e52b5eb06.35761018.jpg" },
  { name: "Dr. Yousef Abul", role: "Endodontist", image: "https://admin.bayandental.com/uploads/173122320667305ea6e8a378.18695581.jpg" },
  { name: "Dr. Yasser Al-Asousi", role: "Endodontic Consultant", image: "https://admin.bayandental.com/uploads/173122330067305f0470b108.64450436.jpg" },
  { name: "Dr. Shaima Bilal", role: "General Practitioner", image: "https://admin.bayandental.com/uploads/173122337767305f51efc776.12639671.jpg" },
];

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const doctors: Doctor[] = rawDoctors.map((d) => ({
  ...d,
  slug: toSlug(d.name),
}));

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

// Role-to-specialty description mapping
export const specialtyDescriptions: Record<string, { en: string; ar: string }> = {
  "General Practitioner": {
    en: "Provides comprehensive dental care including examinations, cleanings, fillings, and preventive treatments for patients of all ages.",
    ar: "يقدم رعاية أسنان شاملة تشمل الفحوصات والتنظيف والحشوات والعلاجات الوقائية لمرضى من جميع الأعمار.",
  },
  "Orthodontist": {
    en: "Specializes in diagnosing and correcting misaligned teeth and jaws using braces, clear aligners, and other orthodontic appliances.",
    ar: "متخصص في تشخيص وتصحيح اعوجاج الأسنان والفكين باستخدام التقويم التقليدي والشفاف وغيره من الأجهزة التقويمية.",
  },
  "Cosmetic Dentistry Consultant": {
    en: "Expert in aesthetic dental procedures including veneers, smile design, teeth whitening, and full-mouth cosmetic rehabilitation.",
    ar: "خبير في إجراءات طب الأسنان التجميلية بما فيها الفينيرز وتصميم الابتسامة وتبييض الأسنان وإعادة التأهيل التجميلي الشامل.",
  },
  "Periodontist": {
    en: "Specialist in the prevention, diagnosis, and treatment of periodontal disease, and in the placement of dental implants.",
    ar: "متخصص في الوقاية من أمراض اللثة وتشخيصها وعلاجها، وكذلك في زراعة الأسنان.",
  },
  "Prosthodontist": {
    en: "Specializes in restoring and replacing teeth using crowns, bridges, dentures, and implant-supported restorations.",
    ar: "متخصص في ترميم الأسنان واستبدالها باستخدام التيجان والجسور وطقم الأسنان والترميمات المدعومة بالزرعات.",
  },
  "Endodontist": {
    en: "Expert in diagnosing tooth pain and performing root canal treatments to save natural teeth from extraction.",
    ar: "خبير في تشخيص آلام الأسنان وإجراء علاجات قناة الجذر للحفاظ على الأسنان الطبيعية من الخلع.",
  },
  "Endodontic Specialist": {
    en: "Expert in diagnosing tooth pain and performing root canal treatments to save natural teeth from extraction.",
    ar: "خبير في تشخيص آلام الأسنان وإجراء علاجات قناة الجذر للحفاظ على الأسنان الطبيعية من الخلع.",
  },
  "Endodontic Consultant": {
    en: "Senior consultant specializing in complex root canal procedures and endodontic surgery with advanced microscope techniques.",
    ar: "استشاري أول متخصص في علاجات قناة الجذر المعقدة والجراحة اللبية باستخدام تقنيات المجهر المتقدمة.",
  },
  "Periodontology & Implantology Specialist": {
    en: "Dual specialist in treating gum disease and placing dental implants, offering comprehensive periodontal and implant solutions.",
    ar: "أخصائي مزدوج في علاج أمراض اللثة وزراعة الأسنان، يقدم حلولاً متكاملة لأمراض دواعم السن والزرع.",
  },
  "Periodontology & Implantology": {
    en: "Specialist in gum disease treatment and dental implant placement, combining periodontal health with restorative excellence.",
    ar: "متخصص في علاج أمراض اللثة وزراعة الأسنان، يجمع بين صحة دواعم السن والتميز في الترميم.",
  },
  "Restorative & Aesthetic Dentistry": {
    en: "Focuses on restoring damaged teeth and improving smiles through advanced restorative and aesthetic dental techniques.",
    ar: "يركز على ترميم الأسنان التالفة وتحسين الابتسامات من خلال تقنيات طب الأسنان الترميمي والتجميلي المتقدمة.",
  },
  "Restorative & Aesthetic Dentistry – Medical Director": {
    en: "Medical Director and specialist in restorative and aesthetic dentistry, overseeing clinical excellence across all Bayan Dental branches.",
    ar: "مدير طبي وأخصائي في طب الأسنان الترميمي والتجميلي، يشرف على التميز السريري في جميع فروع بيان لطب الأسنان.",
  },
  "Oral & Maxillofacial Surgeon": {
    en: "Specialist in surgical procedures of the mouth, jaw, and face including wisdom teeth extraction, jaw surgery, and oral pathology.",
    ar: "متخصص في الإجراءات الجراحية للفم والفك والوجه بما فيها خلع ضرس العقل وجراحة الفك وأمراض الفم.",
  },
  "Pediatric Dentistry Specialist": {
    en: "Specializes in dental care for children from infancy through adolescence, creating positive dental experiences for young patients.",
    ar: "متخصص في رعاية أسنان الأطفال من الرضاعة حتى المراهقة، يخلق تجارب إيجابية لدى المرضى الصغار.",
  },
  "General Practitioner – Pediatrics": {
    en: "Provides gentle, child-friendly dental care combining general practice with a focus on pediatric patients.",
    ar: "يقدم رعاية أسنان لطيفة وملائمة للأطفال تجمع بين الممارسة العامة مع التركيز على المرضى الصغار.",
  },
  "Advanced General Practitioner": {
    en: "General dentist with advanced training and skills in complex restorative cases, implants, and multi-disciplinary treatment planning.",
    ar: "طبيب أسنان عام متخصص بتدريب متقدم في الحالات الترميمية المعقدة والزرعات وتخطيط العلاج متعدد التخصصات.",
  },
  "Prosthodontist & Periodontist": {
    en: "Dual specialist combining expertise in tooth replacement and restoration with advanced periodontal care and implant surgery.",
    ar: "أخصائي مزدوج يجمع بين الخبرة في تعويض الأسنان وترميمها مع رعاية اللثة المتقدمة وجراحة الزرع.",
  },
  "Orthodontist – Egaila Branch": {
    en: "Orthodontist specializing in correcting teeth alignment, serving patients at the Egaila branch with clear and traditional braces.",
    ar: "أخصائي تقويم أسنان متخصص في تصحيح انحراف الأسنان، يخدم المرضى في فرع العقيلة بالتقويم الشفاف والتقليدي.",
  },
};

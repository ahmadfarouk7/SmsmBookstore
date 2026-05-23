"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const BOUNCE = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const COLOR_LAVENDER = "#939fff";
const COLOR_PINK = "#e58ba8";

const LAVENDER_COVERS = ["#939fff", "#7b8aff", "#a8b4ff", "#6b7aff"];
const PINK_COVERS = ["#e58ba8", "#d97a9a", "#f0a0b8", "#c2547a"];

const BESTSELLERS = [
  {
    id: 1,
    title: "مدينة البراءة",
    author: "غابرييل غارسيا ماركيز",
    price: "١٢٠ جنيه",
    desc: "سحر واقعي يجسّد تاريخ عائلة عبر قرون من الحب والحرب في قرية نائية.",
  },
  {
    id: 2,
    title: "1984",
    author: "جورج أورويل",
    price: "٩٥ جنيه",
    desc: "رواية كلاسيكية عن مراقبة الدولة وسحق الحرية في مجتمع يخضع للرقابة المطلقة.",
  },
  {
    id: 3,
    title: "الأمير الصغير",
    author: "أنطوان دي سانت إكزوبيري",
    price: "٧٥ جنيه",
    desc: "قصة خالدة عن الصداقة والحنين ومعنى الحياة عبر عيون أمير صغير.",
  },
  {
    id: 4,
    title: "الخيميائي",
    author: "باولو كويلو",
    price: "٨٥ جنيه",
    desc: "رحلة روحية لراعٍ أندلسي يبحث عن كنزه الشخصي ويكتشف حكمة العالم.",
  },
  {
    id: 5,
    title: "جرائم في الرمال",
    author: "عبد الله النعيمي",
    price: "١٣٠ جنيه",
    desc: "رواية بوليسية مشوقة تجري أحداثها في قلب الصحراء بأسلوب مثير ومكثف.",
  },
  {
    id: 6,
    title: "عزيزتي، أنا آسف",
    author: "أحلام مستغانمي",
    price: "١١٠ جنيه",
    desc: "رواية عاطفية عميقة تتناول الذاكرة والحب والغفران بأسلوب شاعري مؤثر.",
  },
  {
    id: 7,
    title: "ساق البامبو",
    author: "سعود السنعوسي",
    price: "١٠٥ جنيه",
    desc: "قصة الهوية والانتماء بين ثقافتين عبر رحلة شاب كويتي من أصل فلبيني.",
  },
  {
    id: 8,
    title: "فن اللامبالاة",
    author: "مارك مانسون",
    price: "٩٠ جنيه",
    desc: "كتاب عملي عن التركيز على ما يهم حقاً والتخلّي عن الضغوط غير الضرورية.",
  },
];

const NEW_ARRIVALS = [
  {
    id: 101,
    title: "ليالي شامية",
    author: "خالد الحروف",
    price: "٨٨ جنيه",
    desc: "رواية تاريخية تغوص في أزقة دمشق القديمة وأسرار عائلاتها العريقة.",
  },
  {
    id: 102,
    title: "همسات البحر",
    author: "ليلى المرّي",
    price: "٧٢ جنيه",
    desc: "قصص قصيرة عن الحنين والبحر والغربة بأسلوب شاعري رقيق ومؤثر.",
  },
  {
    id: 103,
    title: "ظلال القدس",
    author: "يوسف الشامي",
    price: "٩٨ جنيه",
    desc: "سيرة روائية لمدينة القدس عبر عيون عائلة فلسطينية على مدى قرن.",
  },
  {
    id: 104,
    title: "عطر الورد",
    author: "نورة العتيبي",
    price: "٦٥ جنيه",
    desc: "رواية رومانسية خفيفة تجري في حدائق الطائف وحقول الورد الجميلة.",
  },
  {
    id: 105,
    title: "رحلة النجوم",
    author: "عمر الفلكي",
    price: "٨٠ جنيه",
    desc: "مغامرة علمية خيالية للأطفال والكبار عن استكشاف الفضاء والأمل.",
  },
  {
    id: 106,
    title: "كتاب الظل",
    author: "سارة بنت محمد",
    price: "٩٢ جنيه",
    desc: "رواية غموض أدبية تتشابك فيها الذاكرة والجريمة في مكتبة قديمة.",
  },
  {
    id: 107,
    title: "أرض الزيتون",
    author: "محمود درويش",
    price: "٧٠ جنيه",
    desc: "ديوان شعري يجسّد الأرض والمقاومة والحب بوحي فلسطيني أصيل.",
  },
  {
    id: 108,
    title: "قمر على بيروت",
    author: "غادة السمان",
    price: "١١٥ جنيه",
    desc: "رواية عن بيروت وحربها وذاكرتها بأسلوب أدبي جريء وعميق.",
  },
];

const BEGINNERS_BOOKS = [
  {
    id: 201,
    title: "كيف تقرأ كتاباً",
    author: "مورتيمر أدler",
    price: "٦٥ جنيه",
    desc: "دليل عملي لبناء عادة القراءة وفهم النصوص من الصفر بخطوات بسيطة.",
  },
  {
    id: 202,
    title: "العادات الذرية",
    author: "جيمس كلير",
    price: "٩٠ جنيه",
    desc: "كتاب يساعدك على تكوين عادات يومية صغيرة تفتح لك عالماً من المعرفة.",
  },
  {
    id: 203,
    title: "قصة مدينتين",
    author: "تشارلز ديكنز",
    price: "٧٨ جنيه",
    desc: "رواية كلاسيكية بلغة واضحة تناسب من يبدأ رحلته مع الأدب العالمي.",
  },
  {
    id: 204,
    title: "الأب الغني والأب الفقير",
    author: "روبرت كيوساكي",
    price: "٨٥ جنيه",
    desc: "مقدمة ممتعة لفهم المال والتفكير المالي بلغة سهلة ومباشرة.",
  },
  {
    id: 205,
    title: "الأمير الصغير",
    author: "أنطوان دي سانت إكزوبيري",
    price: "٧٥ جنيه",
    desc: "قصة قصيرة عميقة مثالية لأول كتاب تقرأه في عالم الأدب.",
  },
  {
    id: 206,
    title: "فن البساطة",
    author: "ليو تولستوي",
    price: "٧٠ جنيه",
    desc: "قصص ومواعظ بلغة راقية وسهلة تنمّي حبك للقراءة تدريجياً.",
  },
  {
    id: 207,
    title: "من جديد أبدأ",
    author: "منى الشامي",
    price: "٦٠ جنيه",
    desc: "رواية عربية خفيفة تشجّعك على الاستمرار في القراءة كل يوم.",
  },
  {
    id: 208,
    title: "قوة العادات",
    author: "تشارلز دوهيغ",
    price: "٩٥ جنيه",
    desc: "يفهمك كيف تتشكّل العادات وكيف تجعل القراءة جزءاً من حياتك.",
  },
];

const READING_LOVERS_BOOKS = [
  {
    id: 301,
    title: "مئة عام من العزلة",
    author: "غابرييل غارسيا ماركيز",
    price: "١٤٠ جنيه",
    desc: "تحفة السحر الواقعي لعشّاق الروايات العميقة والمكثفة.",
  },
  {
    id: 302,
    title: "بحيرة الداكنة",
    author: "أحلام مستغانمي",
    price: "١١٠ جنيه",
    desc: "لغة شاعرة وحبكة عاطفية تأسر كل من يعشق القراءة الطويلة.",
  },
  {
    id: 303,
    title: "اسم الوردة",
    author: "أومبرتو إيكو",
    price: "١٥٠ جنيه",
    desc: "رواية فكرية غنية بالرموز والتاريخ لمحبي التحليل والتفاصيل.",
  },
  {
    id: 304,
    title: "شوق",
    author: "أحمد خالد توفيق",
    price: "٨٠ جنيه",
    desc: "عوالم خيالية مدهشة تجعلك تفقد حسّك بالزمن وأنت تقرأ.",
  },
  {
    id: 305,
    title: "زقاق المدق",
    author: "نجيب محفوظ",
    price: "٩٠ جنيه",
    desc: "كلاسيكية عربية بأجواء القاهرة القديمة لعشّاق الأدب الأصيل.",
  },
  {
    id: 306,
    title: "الجزار",
    author: "يوسف زيدان",
    price: "١٢٠ جنيه",
    desc: "سرد تاريخي ممتع يجمع بين البحث والرواية بأسلوب آسِر.",
  },
  {
    id: 307,
    title: "اللص والكلاب",
    author: "نجيب محفوظ",
    price: "٧٥ جنيه",
    desc: "دراما إنسانية عميقة لمن يحبون الأدب العربي الكلاسيكي.",
  },
  {
    id: 308,
    title: "عناقيد الغضب",
    author: "جون ستاينبيك",
    price: "١٠٥ جنيه",
    desc: "رواية أمريكية خالدة عن العدالة والكرامة بلغة قوية ومؤثرة.",
  },
];

const OUR_PICKS = [
  {
    id: 401,
    title: "سقوط الغطاء",
    author: "أحمد خالد توفيق",
    price: "٨٥ جنيه",
    desc: "اختيار فريق سمسم — رواية مؤثرة عن الشباب والأحلام والواقع.",
  },
  {
    id: 402,
    title: "يوتوبيا",
    author: "أحمد خالد توفيق",
    price: "٩٠ جنيه",
    desc: "ترشيحنا الأسبوعي — خيال علمي عربي بأفكار تلمس قضايا المجتمع.",
  },
  {
    id: 403,
    title: "في بيتنا روبوت",
    author: "إبراهيم نصر",
    price: "٧٥ جنيه",
    desc: "من اختياراتنا — قصص قصيرة خفيفة بلمسة فكاهية وعمق.",
  },
  {
    id: 404,
    title: "العطر",
    author: "باتريك زوسكيند",
    price: "١٠٠ جنيه",
    desc: "رواية فريدة نوصي بها لكل محب للأدب الغرائبي المميز.",
  },
  {
    id: 405,
    title: "الجريمة والعقاب",
    author: "فيودور دوستويفسكي",
    price: "١١٥ جنيه",
    desc: "كلاسيكية لا تفوّت — اختيار المحررين في سمسم بوك ستور.",
  },
  {
    id: 406,
    title: "ثلاثية غرناطة",
    author: "رضوى عاشور",
    price: "١٣٠ جنيه",
    desc: "ترشيح خاص — ملحمة تاريخية عربية بأسلوب روائي رائع.",
  },
  {
    id: 407,
    title: "اللص والشعراء",
    author: "خورخي لويس بورخيس",
    price: "٩٥ جنيه",
    desc: "من مفضّلات فريقنا — قصص فلسفية ساحرة في عالم واحد.",
  },
  {
    id: 408,
    title: "برلين",
    author: "بن سلمان",
    price: "١٠٥ جنيه",
    desc: "رواية عربية معاصرة نوصي بها بحرارة لعشّاق الدراما الحضرية.",
  },
];

const NAV_LINKS = [
  { id: "home", label: "الرئيسية" },
  { id: "books", label: "الكتب" },
  { id: "categories", label: "الأقسام" },
  { id: "contact", label: "تواصل معنا" },
];

const ABOUT_FEATURES = [
  { text: "توصيل سريع لجميع المحافظات", color: COLOR_LAVENDER },
  { text: "أسعار تنافسية وعروض دورية", color: COLOR_PINK },
  { text: "آلاف العناوين العربية والمترجمة", color: COLOR_LAVENDER },
  { text: "خدمة عملاء متاحة طوال الأسبوع", color: COLOR_PINK },
];

const MARQUEE_ITEMS = [
  { icon: "🌟", text: "حصري لدى سمسم — روايات لم تصدر بعد" },
  { icon: "📚", text: "اطلب مسبقاً وادفع عند الاستلام" },
  { icon: "🎁", text: "هدية مجانية مع كل طلب فوق 500 جنيه" },
];

type BookItem = (typeof BESTSELLERS)[number];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function ScrollReveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal--on" : ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function BookCard({
  book,
  index,
  isNew,
  accent,
}: {
  book: BookItem;
  index: number;
  isNew?: boolean;
  accent: "lavender" | "pink";
}) {
  const covers = accent === "pink" ? PINK_COVERS : LAVENDER_COVERS;
  const coverColor = covers[index % covers.length];

  return (
    <article className={`book-card book-card--${accent}`}>
      <div className="book-cover" style={{ background: coverColor }}>
        {isNew && <span className="book-new-badge">جديد</span>}
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-price">{book.price}</p>
        <p className="book-desc">{book.desc}</p>
        <button type="button" className="book-btn">
          احجز
        </button>
      </div>
    </article>
  );
}

function HorizontalBooks({
  books,
  isNew,
  accent,
}: {
  books: BookItem[];
  isNew?: boolean;
  accent: "lavender" | "pink";
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const scrollToDot = useCallback((index: number) => {
    const el = scrollRef.current;
    const child = el?.children[index] as HTMLElement | undefined;
    if (child) {
      child.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }
    setActiveDot(index);
  }, []);

  const scrollPrev = () => {
    if (activeDot > 0) scrollToDot(activeDot - 1);
  };

  const scrollNext = () => {
    if (activeDot < books.length - 1) scrollToDot(activeDot + 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;

      const containerRect = el.getBoundingClientRect();
      let closest = 0;
      let minDist = Infinity;

      children.forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        const dist = Math.abs(rect.left - containerRect.left);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      setActiveDot(closest);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [books.length]);

  return (
    <div className={`hscroll-wrap hscroll-wrap--${accent}`}>
      <div className="hscroll-viewport">
        {books.length > 1 && (
          <>
            <button
              type="button"
              className="hscroll-arrow hscroll-arrow--prev"
              onClick={scrollPrev}
              disabled={activeDot === 0}
              aria-label="الكتاب السابق"
            >
              ›
            </button>
            <button
              type="button"
              className="hscroll-arrow hscroll-arrow--next"
              onClick={scrollNext}
              disabled={activeDot === books.length - 1}
              aria-label="الكتاب التالي"
            >
              ‹
            </button>
          </>
        )}
        <div className="hscroll-track" ref={scrollRef}>
          {books.map((book, i) => (
            <BookCard
              key={book.id}
              book={book}
              index={i}
              isNew={isNew}
              accent={accent}
            />
          ))}
        </div>
      </div>
      <div className="hscroll-dots">
        {books.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hscroll-dot ${i === activeDot ? "hscroll-dot--active" : ""}`}
            onClick={() => scrollToDot(i)}
            aria-label={`كتاب ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeNav, setActiveNav] = useState("home");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=El+Messiri:wght@500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes scaleX {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes titleGlow {
          0%, 100% {
            text-shadow:
              0 0 18px rgba(147, 159, 255, 0.75),
              0 2px 8px rgba(45, 36, 56, 0.2);
          }
          50% {
            text-shadow:
              0 0 32px rgba(147, 159, 255, 1),
              0 0 48px rgba(147, 159, 255, 0.5),
              0 2px 8px rgba(45, 36, 56, 0.2);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes shimmer {
          0% { background-position: -100% -100%; }
          50% { background-position: 100% 100%; }
          100% { background-position: -100% -100%; }
        }

        .page {
          min-height: 100vh;
          background: #fdf8f3;
          font-family: 'Cairo', sans-serif;
          direction: rtl;
          text-align: right;
          color: #2d2438;
        }

        .reveal { opacity: 0; }
        .reveal--on { animation: revealUp 0.75s ${BOUNCE} forwards; }

        /* Header */
        .site-header {
          position: relative;
          overflow: hidden;
          min-height: auto;
          width: 100%;
          direction: rtl;
          font-family: 'Cairo', sans-serif;
          display: flex;
          flex-direction: column;
          background: linear-gradient(
            145deg,
            #2d2438 0%,
            #4a3d6e 18%,
            #939fff 42%,
            #b08fd4 58%,
            #e58ba8 82%,
            #f0a8c0 100%
          );
        }

        .site-header::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 90% 70% at 50% 0%,
            rgba(255, 255, 255, 0.14) 0%,
            transparent 55%
          );
          z-index: 1;
          pointer-events: none;
        }

        .site-header::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 55%,
            rgba(253, 248, 243, 0.25) 88%,
            rgba(253, 248, 243, 0.55) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        .header-social-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          font-family: 'Cairo', sans-serif;
        }

        .header-social-icon {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .header-social-item:hover .header-social-icon {
          transform: scale(1.1);
        }

        .header-social-icon--fb {
          background: #939fff;
          box-shadow: 0 4px 16px rgba(147, 159, 255, 0.35);
        }

        .header-social-item:hover .header-social-icon--fb {
          box-shadow: 0 6px 24px rgba(147, 159, 255, 0.55);
        }

        .header-social-icon--fb span {
          color: #fff;
          font-size: 20px;
          font-weight: 900;
          font-family: Georgia, serif;
          line-height: 1;
        }

        .header-social-icon--ig {
          background: #e58ba8;
          box-shadow: 0 4px 16px rgba(229, 139, 168, 0.35);
        }

        .header-social-item:hover .header-social-icon--ig {
          box-shadow: 0 6px 24px rgba(229, 139, 168, 0.55);
        }

        .header-social-icon--wa {
          background: #939fff;
          box-shadow: 0 4px 16px rgba(147, 159, 255, 0.35);
        }

        .header-social-item:hover .header-social-icon--wa {
          box-shadow: 0 6px 24px rgba(147, 159, 255, 0.55);
        }

        .header-social-icon--tt {
          background: #e58ba8;
          box-shadow: 0 4px 16px rgba(229, 139, 168, 0.35);
        }

        .header-social-item:hover .header-social-icon--tt {
          box-shadow: 0 6px 24px rgba(229, 139, 168, 0.55);
        }

        .header-social-emoji {
          font-size: 18px;
          line-height: 1;
        }

        .header-social-label {
          font-size: 11px;
          color: #8b7d8d;
        }

        .header-social-sublabel {
          font-size: 10px;
          color: #b0a0b8;
        }

        .header-hero {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 8vh 0 0;
          text-align: center;
        }

        .header-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
        }

        .header-store {
          font-family: "El Messiri", "Cairo", sans-serif;
          font-size: 42px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 2px;
          margin: 0;
          line-height: 1.2;
          animation: titleGlow 3s ease-in-out infinite 0.8s;
          text-shadow:
            0 2px 8px rgba(45, 36, 56, 0.85),
            0 0 24px rgba(147, 159, 255, 0.5);
        }

        .header-store-line {
          width: 60px;
          height: 2px;
          margin: 10px auto;
          background: #939fff;
        }

        .header-tagline-text {
          font-size: 16px;
          font-weight: 400;
          color: #f5e8f0;
          letter-spacing: 5px;
          margin: 0;
          text-shadow: 0 0 14px rgba(147, 159, 255, 0.4);
        }

        .header-hero-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 720px;
        }

        .header-marquee {
          position: relative;
          z-index: 2;
          width: 100%;
          flex-shrink: 0;
          margin-top: 14px;
        }

        .search-box {
          width: 580px;
          max-width: 90%;
          margin-top: 16px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 50px;
          border: 2px solid #939fff;
          box-shadow: 0 8px 32px rgba(147, 159, 255, 0.2);
          padding: 8px;
          z-index: 2;
        }

        
        .search-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-family: 'Cairo', sans-serif;
          font-size: 15px;
          color: #2d2438;
          text-align: right;
          padding: 10px 4px;
        }

        .search-input::placeholder { color: #bbb; }

        .search-submit {
          border: none;
          border-radius: 50px;
          padding: 12px 28px;
          background: #939fff;
          color: #ffffff;
          font-family: 'Cairo', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.2s;
        }

        .search-submit:hover {
          opacity: 0.85;
          transform: scale(1.02);
        }

        .nav-wrap {
          display: flex;
          justify-content: center;
          margin-top: 20px;
          z-index: 2;
        }

        .nav-pill {
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 20px rgba(147, 159, 255, 0.12);
          padding: 6px;
        }

        .nav-link {
          border: none;
          background: transparent;
          font-family: 'Cairo', sans-serif;
          font-size: 15px;
          color: #7a6080;
          padding: 12px 24px;
          border-radius: 50px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          text-decoration: none;
        }

        .nav-link:hover {
          background: rgba(147, 159, 255, 0.1);
        }

        .nav-link--active {
          background: #939fff;
          color: #ffffff;
        }

        /* Marquee */
        .marquee-banner {
          height: 46px;
          background: #939fff;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          overflow: hidden;
          direction: rtl;
          position: relative;
        }

        .marquee-banner::before {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.045) 10px,
            rgba(255, 255, 255, 0.045) 20px
          );
          pointer-events: none;
        }

        .marquee-label {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 18px;
          background: rgba(45, 36, 56, 0.2);
          font-size: 11px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.5px;
          border-left: 1px solid rgba(255, 255, 255, 0.22);
        }

        .marquee-label-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.9);
          animation: titleGlow 2s ease-in-out infinite;
        }

        .marquee-viewport {
          position: relative;
          flex: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .marquee-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 48px;
          z-index: 1;
          pointer-events: none;
        }

        .marquee-fade--start {
          right: 0;
          background: linear-gradient(to left, #939fff, transparent);
        }

        .marquee-fade--end {
          left: 0;
          background: linear-gradient(to right, #939fff, transparent);
        }

        .marquee-banner:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-track {
          display: flex;
          flex-direction: row;
          align-items: center;
          white-space: nowrap;
          animation: marquee 32s linear infinite;
          padding: 0 8px;
        }

        .marquee-chip-wrap {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
        }

        .marquee-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin: 0 10px;
          padding: 5px 14px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          flex-shrink: 0;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px rgba(45, 36, 56, 0.08);
        }

        .marquee-chip-icon {
          font-size: 13px;
          line-height: 1;
        }

        .marquee-chip-sep {
          color: rgba(255, 255, 255, 0.45);
          font-size: 10px;
          flex-shrink: 0;
          user-select: none;
        }

        /* Sections */
        .section {
          padding: 48px 24px 40px;
        }

        .section--lavender {
          background: #f0eeff;
        }

        .section--pink {
          background: #fff5f8;
        }

        .section-head {
          max-width: 1280px;
          margin: 0 auto 28px;
        }

        .section-head--lavender {
          border-right: 4px solid #939fff;
          padding-right: 16px;
        }

        .section-head--pink {
          border-right: 4px solid #e58ba8;
          padding-right: 16px;
        }

        .section-title {
          font-size: 26px;
          font-weight: 800;
          color: #2d2438;
          margin-bottom: 6px;
        }

        .section--lavender .section-sub { color: #7b8aff; }
        .section--pink .section-sub { color: #c47ab5; }

        .section-sub {
          font-size: 14px;
          color: #8b7d8d;
        }

        /* Horizontal scroll */
        .hscroll-wrap {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
        }

        .hscroll-viewport {
          position: relative;
        }

        .hscroll-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 4;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.9);
          color: #ffffff;
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(45, 36, 56, 0.18);
          transition: transform 0.25s ${BOUNCE}, opacity 0.2s ease,
            box-shadow 0.25s ease;
        }

        .hscroll-wrap--lavender .hscroll-arrow {
          background: #939fff;
        }

        .hscroll-wrap--pink .hscroll-arrow {
          background: #e58ba8;
        }

        .hscroll-arrow:hover:not(:disabled) {
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 8px 28px rgba(45, 36, 56, 0.22);
        }

        .hscroll-arrow:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .hscroll-arrow--prev {
          right: 4px;
        }

        .hscroll-arrow--next {
          left: 4px;
        }

        .hscroll-track {
          display: flex;
          gap: 18px;
          overflow-x: auto;
          padding: 4px 52px 4px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hscroll-track::-webkit-scrollbar {
          display: none;
        }

        .hscroll-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }

        .hscroll-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          padding: 0;
          background: #e0d4e8;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hscroll-wrap--lavender .hscroll-dot--active {
          width: 24px;
          border-radius: 50px;
          background: #939fff;
        }

        .hscroll-wrap--pink .hscroll-dot--active {
          width: 24px;
          border-radius: 50px;
          background: #e58ba8;
        }

        /* Book card */
        .book-card {
          width: 185px;
          flex-shrink: 0;
          border-radius: 14px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(147, 159, 255, 0.12);
          transition: transform 0.3s, box-shadow 0.3s;
          transition-timing-function: ${BOUNCE};
        }

        .book-card--lavender:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 32px rgba(147, 159, 255, 0.22);
        }

        .book-card--pink:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 32px rgba(229, 139, 168, 0.22);
        }

        .book-cover {
          height: 240px;
          position: relative;
          border-radius: 12px 12px 0 0;
          box-shadow: inset 6px 0 12px rgba(0, 0, 0, 0.15);
        }

        .book-card--lavender .book-new-badge {
          background: #939fff;
        }

        .book-card--pink .book-new-badge {
          background: #e58ba8;
        }

        .book-new-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 50px;
        }

        .book-info {
          padding: 12px;
        }

        .book-title {
          font-size: 14px;
          font-weight: 700;
          color: #2d2438;
          text-align: right;
          margin-bottom: 4px;
          line-height: 1.4;
        }

        .book-author {
          font-size: 12px;
          color: #8b7d8d;
          text-align: right;
          margin-bottom: 8px;
        }

        .book-card--lavender .book-price {
          color: #939fff;
        }

        .book-card--pink .book-price {
          color: #e58ba8;
        }

        .book-price {
          font-size: 15px;
          font-weight: 700;
          text-align: right;
          margin-bottom: 8px;
        }

        .book-desc {
          font-size: 11px;
          color: #8b7d8d;
          line-height: 1.5;
          text-align: right;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .book-card--lavender .book-btn {
          background: #939fff;
        }

        .book-card--pink .book-btn {
          background: #e58ba8;
        }

        .book-btn {
          width: 100%;
          padding: 8px;
          border: none;
          border-radius: 50px;
          color: #ffffff;
          font-family: 'Cairo', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.3s, transform 0.3s;
          transition-timing-function: ${BOUNCE};
        }

        .book-btn:hover {
          opacity: 0.9;
          transform: scale(1.03);
        }

        /* Footer / Contact */
        .site-footer {
          background: #2d2438;
          padding: 64px 40px 32px;
        }

        .footer-inner {
          max-width: 920px;
          margin: 0 auto;
        }

        .footer-contact-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          mix-blend-mode: screen;
          -webkit-mix-blend-mode: screen;
        }

        .footer-col-title {
          font-size: 26px;
          color: #ffffff;
          font-weight: 800;
          margin: 0;
        }

        .footer-contact-intro {
          font-size: 15px;
          color: #c4b8cc;
          line-height: 1.85;
          max-width: 520px;
          margin: 0;
        }

        .footer-social-bar {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          justify-content: center;
          flex-wrap: wrap;
          direction: ltr;
          margin-top: 8px;
        }

        .site-footer .header-social-label {
          color: #e8e0ee;
        }

        .site-footer .header-social-sublabel {
          color: #a898b0;
        }

        .footer-about-block {
          padding-top: 40px;
          text-align: right;
        }

        .footer-about-block .footer-col-title {
          font-size: 20px;
          margin-bottom: 14px;
          border-right: 4px solid #939fff;
          padding-right: 14px;
        }

        .footer-about-text {
          font-size: 15px;
          color: #c4b8cc;
          line-height: 1.9;
          margin-bottom: 24px;
        }

        .footer-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .footer-feature {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-feature-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 14px;
          flex-shrink: 0;
        }

        .footer-feature-text {
          color: #ffffff;
          font-size: 13px;
          line-height: 1.45;
        }

        .footer-bottom {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
        }

        .footer-copy {
          color: #8b7d8d;
          font-size: 13px;
          margin: 0;
        }

        @media (max-width: 768px) {
          .header-hero { padding-top: 6vh; }
          .header-marquee { margin-top: 12px; }
          .header-store { font-size: 32px; }
          .footer-social-bar { gap: 14px; }
          .search-box { width: 92%; }
          .nav-link { padding: 8px 14px; font-size: 13px; }
          .site-footer { padding: 48px 24px 28px; }
          .footer-features-grid { grid-template-columns: 1fr; }
          .footer-col-title { font-size: 22px; }
          .hscroll-arrow {
            width: 36px;
            height: 36px;
            font-size: 17px;
          }
          .hscroll-track { padding-inline: 44px; }
        }
      `}</style>

      <div className="page">
        <header className="site-header">
          <div className="header-hero">
            <div className="header-hero-main">
              <div className="header-brand">
                <h1 className="header-store">سمسم بوك ستور</h1>
                <div className="header-store-line" aria-hidden />
                <p className="header-tagline-text">بيت لكل قارئ</p>
              </div>

              <nav className="nav-wrap">
                <div className="nav-pill">
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.id}
                      type="button"
                      className={`nav-link ${activeNav === link.id ? "nav-link--active" : ""}`}
                      onClick={() => setActiveNav(link.id)}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="search-box">
                <input
                  type="search"
                  className="search-input"
                  placeholder="ابحث عن كتاب، رواية أو كاتب..."
                />
                <button type="button" className="search-submit">
                  بحث
                </button>
              </div>
            </div>

            <div className="marquee-banner header-marquee">
              <div className="marquee-label">
                <span className="marquee-label-pulse" aria-hidden />
                <span>آخر العروض</span>
              </div>
              <div className="marquee-viewport">
                <span
                  className="marquee-fade marquee-fade--start"
                  aria-hidden
                />
                <span className="marquee-fade marquee-fade--end" aria-hidden />
                <div className="marquee-track">
                  {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                    <span
                      key={`${item.text}-${i}`}
                      className="marquee-chip-wrap"
                    >
                      <span className="marquee-chip">
                        <span className="marquee-chip-icon" aria-hidden>
                          {item.icon}
                        </span>
                        {item.text}
                      </span>
                      <span className="marquee-chip-sep" aria-hidden>
                        ✦
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="section section--pink" id="new-arrivals">
          <ScrollReveal>
            <div className="section-head section-head--pink">
              <h2 className="section-title">✨ وصل حديثاً</h2>
              <p className="section-sub">أحدث الإصدارات في مكتبتنا</p>
            </div>
          </ScrollReveal>
          <HorizontalBooks books={NEW_ARRIVALS} isNew accent="pink" />
        </section>

        <section className="section section--lavender" id="bestsellers">
          <ScrollReveal>
            <div className="section-head section-head--lavender">
              <h2 className="section-title">🔥 الأكثر مبيعاً</h2>
              <p className="section-sub">الكتب التي يعشقها قراؤنا</p>
            </div>
          </ScrollReveal>
          <HorizontalBooks books={BESTSELLERS} accent="lavender" />
        </section>

        <section className="section section--pink" id="beginners">
          <ScrollReveal>
            <div className="section-head section-head--pink">
              <h2 className="section-title">📖 كتب للمتبدئين</h2>
              <p className="section-sub">ابدأ رحلتك مع القراءة من هنا</p>
            </div>
          </ScrollReveal>
          <HorizontalBooks books={BEGINNERS_BOOKS} accent="pink" />
        </section>

        <section className="section section--lavender" id="reading-lovers">
          <ScrollReveal>
            <div className="section-head section-head--lavender">
              <h2 className="section-title">❤️ كتب لحيتان القراءه</h2>
              <p className="section-sub">لمن يعيش بين صفحات الكتب</p>
            </div>
          </ScrollReveal>
          <HorizontalBooks books={READING_LOVERS_BOOKS} accent="lavender" />
        </section>

        <section className="section section--pink" id="our-picks">
          <ScrollReveal>
            <div className="section-head section-head--pink">
              <h2 className="section-title">⭐ ترشيحات مننا</h2>
              <p className="section-sub">اختيارات فريق سمسم بوك ستور</p>
            </div>
          </ScrollReveal>
          <HorizontalBooks books={OUR_PICKS} accent="pink" />
        </section>

        <footer className="site-footer" id="contact">
          <div className="footer-inner">
            <div className="footer-contact-hero">
              <img
                src="/final%20white.png"
                alt="سمسم بوك ستور"
                className="footer-logo"
              />
              <h2 className="footer-col-title">تواصل معنا</h2>
              <p className="footer-contact-intro">
                تابعنا على وسائل التواصل أو راسلنا مباشرة — فريق سمسم بوك ستور
                جاهز لمساعدتك في اختيار كتابك القادم.
              </p>
              <div className="footer-social-bar">
                <button
                  type="button"
                  className="header-social-item"
                  onClick={() => window.open("FACEBOOK_LINK_HERE", "_blank")}
                >
                  <span className="header-social-icon header-social-icon--fb">
                    <span>f</span>
                  </span>
                  <span className="header-social-label">فيسبوك</span>
                  <span className="header-social-sublabel">
                    SMSM Book Store
                  </span>
                </button>
                <button
                  type="button"
                  className="header-social-item"
                  onClick={() => window.open("INSTAGRAM_LINK_HERE", "_blank")}
                >
                  <span className="header-social-icon header-social-icon--ig">
                    <span className="header-social-emoji" aria-hidden>
                      📷
                    </span>
                  </span>
                  <span className="header-social-label">إنستغرام</span>
                  <span className="header-social-sublabel">@smsmbooks</span>
                </button>
                <button
                  type="button"
                  className="header-social-item"
                  onClick={() =>
                    window.open("https://wa.me/201XXXXXXXXX", "_blank")
                  }
                >
                  <span className="header-social-icon header-social-icon--wa">
                    <span className="header-social-emoji" aria-hidden>
                      💬
                    </span>
                  </span>
                  <span className="header-social-label">واتساب</span>
                  <span className="header-social-sublabel">01XXXXXXXXX</span>
                </button>
                <button
                  type="button"
                  className="header-social-item"
                  onClick={() => window.open("TIKTOK_LINK_HERE", "_blank")}
                >
                  <span className="header-social-icon header-social-icon--tt">
                    <span className="header-social-emoji" aria-hidden>
                      🎵
                    </span>
                  </span>
                  <span className="header-social-label">تيك توك</span>
                  <span className="header-social-sublabel">@smsmbooks</span>
                </button>
              </div>
            </div>

            <div className="footer-about-block">
              <h2 className="footer-col-title">لماذا سمسم بوك ستور؟</h2>
              <p className="footer-about-text">
                نحن أكثر من مجرد متجر كتب — نحن بيت لكل قارئ يبحث عن عالم أجمل.
                نوفر لك أحدث الإصدارات العربية والمترجمة، بأسعار مناسبة وتوصيل
                سريع لباب بيتك.
              </p>
              <div className="footer-features-grid">
                {ABOUT_FEATURES.map((f) => (
                  <div key={f.text} className="footer-feature">
                    <span
                      className="footer-feature-icon"
                      style={{ background: f.color }}
                    >
                      ✦
                    </span>
                    <span className="footer-feature-text">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="footer-bottom">
              <p className="footer-copy">
                © 2025 سمسم بوك ستور — جميع الحقوق محفوظة
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

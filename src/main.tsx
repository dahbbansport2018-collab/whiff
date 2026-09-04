import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ChevronLeft, ChevronRight, MapPin, ShoppingBag, X, CheckCircle2, Store, Coffee, CircleHelp, RotateCcw } from 'lucide-react';
import './styles.css';

type Step = {
  id: number;
  title: string;
  body: string;
  value: string;
  target: string;
  action?: () => void;
};

type Product = { id: string; name: string; price: number; category: string; image: string };

const products: Product[] = [
  { id: 'v60', name: 'V60', price: 18, category: 'القهوة المقطرة', image: 'https://whiff-coffee-hub.lovable.app/menu-images/products/v60/1200.webp' },
  { id: 'spanish', name: 'آيس سبانش لاتيه', price: 19, category: 'المشروبات الباردة', image: 'https://whiff-coffee-hub.lovable.app/menu-images/products/ice-spanish-latte/1200.webp' },
  { id: 'cortado', name: 'كورتادو', price: 16, category: 'الإسبريسو', image: 'https://whiff-coffee-hub.lovable.app/menu-images/products/cortado/1200.webp' },
  { id: 'coldbrew', name: 'كولد برو', price: 20, category: 'القهوة الباردة', image: 'https://whiff-coffee-hub.lovable.app/menu-images/products/cold-brew/1200.webp' },
];

function App() {
  const [tour, setTour] = useState(false);
  const [step, setStep] = useState(0);
  const [branch, setBranch] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  const steps = useMemo<Step[]>(() => [
    { id: 1, title: 'اختيار الفرع', body: 'يبدأ العميل بتحديد الفرع قبل عرض المنيو.', value: 'يربط المنيو والطلب بالفرع الصحيح ويمنع إرسال الطلبات لفروع غير مفعلة.', target: 'branches' },
    { id: 2, title: 'استعراض المنيو', body: 'بعد اختيار الفرع يظهر المنيو المرتبط به مع التصنيفات والمنتجات.', value: 'يقلل التشتيت ويعرض فقط ما يمكن للفرع تقديمه.', target: 'menu' },
    { id: 3, title: 'تفاصيل المنتج', body: 'الضغط على المنتج يفتح تفاصيله وسعره وخياراته.', value: 'يساعد العميل على اتخاذ قرار واضح قبل الإضافة.', target: 'menu' },
    { id: 4, title: 'إضافة للسلة', body: 'يضاف المنتج إلى السلة ويمكن تعديل الكمية قبل الإكمال.', value: 'يعطي العميل مراجعة واضحة قبل إرسال الطلب.', target: 'cart' },
    { id: 5, title: 'تسجيل العميل', body: 'يكمل العميل باستخدام رقم الجوال والرقم السري.', value: 'يربط الطلبات بالعميل ويتيح له العودة إلى طلباته لاحقًا.', target: 'cart' },
    { id: 6, title: 'تأكيد الطلب', body: 'بعد المراجعة يتم تأكيد الطلب في بيئة العرض فقط.', value: 'هذه النسخة لا ترسل أي طلب حقيقي ولا تتصل بقاعدة بيانات.', target: 'cart' },
    { id: 7, title: 'طلباتي', body: 'يتابع العميل الطلب الحالي وسجل الطلبات.', value: 'يوضح حالة الخدمة دون الحاجة للتواصل مع الفرع.', target: 'orders' },
  ], []);

  const active = steps[step];

  function goToTarget(target: string) {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function startTour() {
    setTour(true);
    setStep(0);
    setTimeout(() => goToTarget('branches'), 100);
  }

  function next() {
    if (step >= steps.length - 1) {
      setTour(false);
      return;
    }
    const n = step + 1;
    setStep(n);
    setCartOpen(false);
    setLoginOpen(false);
    setOrdersOpen(false);
    setTimeout(() => goToTarget(steps[n].target), 120);
  }

  function prev() {
    if (step === 0) return;
    const n = step - 1;
    setStep(n);
    setTimeout(() => goToTarget(steps[n].target), 120);
  }

  return (
    <div className="app" dir="rtl">
      <header className="header">
        <div className="brand-lockup"><div className="brand-mark">WHIFF</div></div>
        <nav>
          <a href="#menu">المنيو</a>
          <a href="#experience">تجربتنا</a>
          <a href="#branches">الفروع</a>
        </nav>
        <div className="header-actions">
          <button className="ghost" onClick={() => setOrdersOpen(true)}>طلباتي</button>
          <button className="gold" onClick={startTour}>ابدأ الجولة</button>
        </div>
      </header>

      <section className="hero" id="experience">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow">WHIFF DIGITAL EXPERIENCE</div>
          <h1>قهوة تملؤك قبل أول رشفة.</h1>
          <p>نسخة تعليمية تفاعلية مستقلة لشرح تجربة العميل وواجهات WHIFF بدون أي اتصال بالنظام الحقيقي.</p>
          <div className="hero-actions">
            <button className="gold large" onClick={startTour}>استكشف التجربة</button>
            <a className="outline large" href="#branches">ابدأ من اختيار الفرع</a>
          </div>
        </div>
      </section>

      <section className="section branches" id="branches" data-tour-target="branches">
        <div className="section-heading"><span>01</span><div><p>اختيار الفرع</p><h2>ابدأ من المكان الصحيح</h2></div></div>
        <div className="branch-grid">
          {['فرع التحلية','فرع الروضة','فرع الشاطئ'].map((name, i) => (
            <button key={name} className={`branch-card ${branch===name ? 'selected' : ''} ${i===2 ? 'disabled' : ''}`} onClick={() => i!==2 && setBranch(name)}>
              <div className="branch-top"><Store size={22}/><span className={i===2 ? 'closed' : 'open'}>{i===2 ? 'لا يستقبل الطلبات' : 'يستقبل الطلبات الآن'}</span></div>
              <h3>{name}</h3>
              <p><MapPin size={15}/> الرياض</p>
              <div className="branch-links"><span>عرض المنيو</span><span>الموقع</span><span>تواصل</span></div>
            </button>
          ))}
        </div>
      </section>

      <section className="section menu" id="menu" data-tour-target="menu">
        <div className="section-heading"><span>02</span><div><p>المنيو المرئي</p><h2>{branch ? `منيو ${branch}` : 'اختر الفرع أولًا لعرض المنيو'}</h2></div></div>
        {!branch ? <div className="empty-state"><Coffee size={28}/><p>اختر أحد الفروع المتاحة لعرض المنتجات المرتبطة به.</p></div> : (
          <div className="product-grid">
            {products.map((p) => (
              <button key={p.id} className="product-card" onClick={() => setSelectedProduct(p)}>
                <div className="product-image"><img src={p.image} alt={p.name} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}}/><div className="fallback">WHIFF</div></div>
                <div className="product-info"><div><small>{p.category}</small><h3>{p.name}</h3></div><strong>{p.price} ر.س</strong></div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="section story">
        <div className="story-card"><span>من المحصول إلى الكوب</span><h2>تجربة رقمية تحفظ طابع WHIFF</h2><p>هذا العرض لا يعيد تصميم العلامة؛ بل يشرح مسار الاستخدام ومبررات UX فوق واجهة تحمل هوية WHIFF نفسها.</p></div>
      </section>

      <footer><div className="footer-brand">WHIFF</div><p>Interactive Product Experience · Demo only</p></footer>

      <button className="cart-fab" id="cart" onClick={() => setCartOpen(true)}><ShoppingBag size={18}/><span>{cart.length}</span></button>

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal product-modal" onClick={e=>e.stopPropagation()}>
            <button className="close" onClick={() => setSelectedProduct(null)}><X/></button>
            <div className="modal-media"><img src={selectedProduct.image} alt={selectedProduct.name}/></div>
            <small>{selectedProduct.category}</small><h2>{selectedProduct.name}</h2><p>وصف تجريبي للمنتج داخل نسخة العرض فقط.</p>
            <div className="modal-bottom"><strong>{selectedProduct.price} ر.س</strong><button className="gold" onClick={()=>{setCart(c=>[...c, selectedProduct]); setSelectedProduct(null);}}>إضافة إلى السلة</button></div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="drawer-backdrop" onClick={()=>setCartOpen(false)}><aside className="drawer" onClick={e=>e.stopPropagation()}>
          <div className="drawer-head"><div><small>سلتك</small><h2>تجهيز الطلب</h2></div><button className="close" onClick={()=>setCartOpen(false)}><X/></button></div>
          <div className="drawer-content">
            {cart.length===0 ? <div className="empty-state">السلة فارغة</div> : cart.map((p,i)=><div className="cart-line" key={i}><div><h4>{p.name}</h4><small>{branch}</small></div><strong>{p.price} ر.س</strong></div>)}
          </div>
          <div className="drawer-footer"><div className="total"><span>المجموع</span><strong>{cart.reduce((s,p)=>s+p.price,0)} ر.س</strong></div><button className="gold full" disabled={cart.length===0} onClick={()=>setLoginOpen(true)}>متابعة الطلب</button></div>
        </aside></div>
      )}

      {loginOpen && (
        <div className="modal-backdrop"><div className="modal login-modal"><button className="close" onClick={()=>setLoginOpen(false)}><X/></button><span className="step-chip">خطوة أخيرة</span><h2>أدخل رقم جوالك</h2><p>هذه بيانات تجريبية ولا يتم إرسالها لأي جهة.</p><input placeholder="05xxxxxxxx" dir="ltr"/><input placeholder="الرقم السري · 6 أرقام" type="password" dir="ltr"/><button className="gold full" onClick={()=>{setLoginOpen(false);setCartOpen(false);setOrdersOpen(true)}}>تأكيد الطلب التجريبي</button></div></div>
      )}

      {ordersOpen && (
        <div className="modal-backdrop"><div className="modal orders-modal"><button className="close" onClick={()=>setOrdersOpen(false)}><X/></button><h2>طلباتي</h2><div className="order-card"><div className="order-title"><strong>#WH-D1024</strong><span>قيد التحضير</span></div><p>{branch || 'فرع التحلية'} · طلب تجريبي</p><div className="status-row"><div className="done"><CheckCircle2/>تم الاستلام</div><div className="active"><CheckCircle2/>قيد التحضير</div><div><span className="dot"/>جاهز</div><div><span className="dot"/>مكتمل</div></div></div></div></div>
      )}

      {tour && (
        <div className="tour-layer">
          <div className="tour-card">
            <div className="tour-progress"><span>{active.id}/{steps.length}</span><div><i style={{width:`${(active.id/steps.length)*100}%`}}/></div></div>
            <div className="tour-icon"><CircleHelp/></div><small>الخطوة {active.id}</small><h3>{active.title}</h3><p>{active.body}</p><div className="tour-value"><b>لماذا هذه الخطوة مهمة؟</b><span>{active.value}</span></div>
            <div className="tour-actions"><button className="ghost" onClick={prev} disabled={step===0}><ChevronRight/></button><button className="gold" onClick={next}>{step===steps.length-1?'إنهاء الجولة':'التالي'}<ChevronLeft/></button></div>
            <button className="skip" onClick={()=>setTour(false)}>تخطي الشرح</button>
          </div>
        </div>
      )}

      {!tour && <button className="restart" onClick={startTour}><RotateCcw size={16}/> إعادة الجولة</button>}
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

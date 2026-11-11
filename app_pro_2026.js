// ============================================================================
// نظام إدارة التطبيق: 30 يوم مجاني + أوفلاين للمدفوع + الدفع عبر InstaPay + شروط كتيب 2026
// متوافق مع تصميم وألوان الدليل الذكي والماسح الذكي (تطوير: أ/ نورهان صلاح)
// ============================================================================

const NS_APP_CONFIG = {
  instapayAddress: "nourhansalah@instapay", // يمكن تعديل عنوان InstaPay الخاص بك هنا
  whatsappNumber: "201208459828",           // رقم الواتساب لاستلام الإيصال وإرسال الكود
  trialDays: 30,                            // مدة التجربة المجانية (30 يوم)
  secretSalt: "NOURHAN_SALAH_LAB_2026",     // مفتاح التشفير لتوليد أكواد التفعيل
  pricing: {
    annualUSD: "$9.99 / سنوياً",
    annualEGP: "300 ج.م / سنوياً",
    lifetimeUSD: "$19.99 (شراء مدى الحياة)",
    lifetimeEGP: "500 ج.م (شراء مدى الحياة)"
  }
};

const MABARET_2026_BOOKLET = {
  version: "الإصدار الثاني عشر V13.0 (يبدأ العمل به السبت 25/04/2026)",
  generalRules: [
    "مواعيد السكرتارية: متواجدون من 8:30 صباحاً حتى 12:00 منتصف الليل (أكثر من 15 ساعة يومياً) عدا يوم الجمعة لمتابعة استقبال العينات وتبليغ النتائج.",
    "حساب مواعيد النتائج (TAT): يوم الجمعة عطلة أسبوعية لوحدات المعامل، ولذلك يتم إسقاطه من حساب الفاصل الزمني بين استلام العينة وظهور النتيجة.",
    "الالتزام بالأحجام وتقسيم العينات: يجب إرسال الأحجام المدونة أمام كل تحليل لأن العينات صغيرة الحجم تسبب مشاكل. إذا كانت العينة مطلوبة لأكثر من وحدة، يجب إرسالها مقسمة في أنابيب وزرمان (Wasserman tubes) بعدد الوحدات.",
    "رفض العينات: لن يتم استلام أي عينات متحللة (Hemolyzed samples) أو عينات غير مفصولة نهائياً.",
    "سياسة التخفيف (Dilution): يتم تخفيف تحاليل (E2, CEA, Ca19.9, AFP, B-HCG) تلقائياً لتعطي رقماً صحيحاً بدلاً من (More than xxxx) وهذا مشمول في السعر. في حال طلب تخفيف لأي تحليل آخر خارج هذه المجموعة يتم دفع قيمة التحليل مرة أخرى.",
    "شروط الحصول على معدلات طبيعية منضبطة: 1) الاسم ثلاثي على الأقل. 2) تحديد السن بالسنة والشهر والأيام (في حال عدم إرسال السن ستظهر النتيجة بدون معدلات طبيعية). 3) تحديد جنس الحالة للأسماء المشتركة بين الذكور والإناث مثل (رضا، عطية، وسام).",
    "مدة الاحتفاظ بالعينات: تحتفظ المعامل بعينات الدم المرسلة لمدة أسبوع واحد فقط بعد رفع النتيجة على الموقع."
  ],
  tatTable: [
    { day: "السبت", next: "الأحد مساءً", h48: "الإثنين مساءً", h72: "الثلاثاء مساءً", h96: "الأربعاء مساءً", week1: "السبت مساءً" },
    { day: "الأحد", next: "الإثنين مساءً", h48: "الثلاثاء مساءً", h72: "الأربعاء مساءً", h96: "الخميس مساءً", week1: "الأحد مساءً" },
    { day: "الإثنين", next: "الثلاثاء مساءً", h48: "الأربعاء مساءً", h72: "الخميس مساءً", h96: "السبت مساءً", week1: "الإثنين مساءً" },
    { day: "الثلاثاء", next: "الأربعاء مساءً", h48: "الخميس مساءً", h72: "السبت مساءً", h96: "الأحد مساءً", week1: "الثلاثاء مساءً" },
    { day: "الأربعاء", next: "الخميس مساءً", h48: "السبت مساءً", h72: "الأحد مساءً", h96: "الإثنين مساءً", week1: "الأربعاء مساءً" },
    { day: "الخميس", next: "السبت مساءً", h48: "الأحد مساءً", h72: "الإثنين مساءً", h96: "الثلاثاء مساءً", week1: "الخميس مساءً" }
  ],
  instruments: [
    { code: "(a)", name: "Cobas 6000 / 8000 / Integra ROCHE & Atellica SCI Siemens" },
    { code: "(b)", name: "Fully Automated ELISA Chemwell & ECL100 Epitope" },
    { code: "(c)", name: "Cobas AmpliPrep TaqMan Roche & CFX96 Real-Time PCR Bio-Rad" },
    { code: "(d)", name: "Immulite 2000/XPi Siemens (Allergy & Rare Hormones)" },
    { code: "(f)", name: "BN ProSpec / Atellica NEPH 630 Nephelometer Siemens" },
    { code: "(g)", name: "Luminex FLEXMAP 3D Thermo Fisher (HLA & PRA/DSA)" },
    { code: "(h)", name: "Sysmex XN-1000 / XN-550, Beckman DxH 900, Advia 2120 (CBC)" },
    { code: "(i)", name: "Sysmex CA-600 / CS-2500 (Coagulation)" },
    { code: "(j)", name: "DG-Spin Grifols Gel Card System (Blood Grouping & Coombs)" },
    { code: "(m)", name: "BIOFIRE FilmArray PCR & VIDAS3 TB-IGRA BioMérieux" },
    { code: "(n/o)", name: "BACT/ALERT 3D, BD Bactec FX40 & VITEK 2 Compact (Automated Cultures)" },
    { code: "(p)", name: "Cepheid GeneXpert Systems (Ultra-sensitive PCR)" },
    { code: "(r/s)", name: "Capillarys 3 TERA / MiniCap Sebia & Helena SAS (Electrophoresis)" },
    { code: "(u/v)", name: "BD FACSLyric (12 Colors) & BD FACSCanto II Flow Cytometry" },
    { code: "(w)", name: "Ventana BenchMark GX Roche & Dako Autostainer (IHC Pathology)" },
    { code: "(z)", name: "NGS MiSeq i100 Plus System Illumina (BRCA 1/2 Gene Sequencing)" }
  ]
};

let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const installBtn = document.getElementById('ns-pwa-install-btn');
  if (installBtn) installBtn.style.display = 'inline-flex';
});

function getDeviceId() {
  let id = localStorage.getItem('ns_smartlab_device_id');
  if (!id) {
    const p1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const p2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    id = `LAB-${p1}-${p2}`;
    localStorage.setItem('ns_smartlab_device_id', id);
  }
  return id;
}

function generateActivationCode(deviceId) {
  const cleanId = (deviceId || '').trim().toUpperCase();
  const str = cleanId + "::" + NS_APP_CONFIG.secretSalt;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const codePart = Math.abs(hash).toString(36).toUpperCase().padStart(6, '9').substring(0, 6);
  return `PRO-${codePart}`;
}

async function getAccurateTimestamp() {
  try {
    const response = await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' });
    const serverDate = response.headers.get('Date');
    if (serverDate) return new Date(serverDate).getTime();
  } catch (e) {}
  return Date.now();
}

async function initSmartLabProSystem() {
  const deviceId = getDeviceId();
  const isPro = localStorage.getItem('ns_smartlab_pro_activated') === 'TRUE';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      if (isPro) {
        if (reg.active) reg.active.postMessage({ type: 'ACTIVATE_PRO_OFFLINE' });
        navigator.serviceWorker.ready.then((r) => {
          if (r.active) r.active.postMessage({ type: 'ACTIVATE_PRO_OFFLINE' });
        });
      }
    }).catch(() => {});
  }

  // إذا كان المستخدم غير مشترك وانقطع الإنترنت، تظهر نافذة التفعيل فوراً
  if (!isPro && !navigator.onLine) {
    renderSubscriptionBar(false, 0, deviceId);
    openSubscriptionModal(true, "أنت غير متصل بالإنترنت حالياً. ميزة العمل بدون إنترنت (Offline Mode) متاحة فقط في النسخة المدفوعة.");
    return;
  }

  const now = await getAccurateTimestamp();
  let firstOpen = parseInt(localStorage.getItem('ns_smartlab_trial_start'), 10);
  if (!firstOpen || isNaN(firstOpen)) {
    firstOpen = now;
    localStorage.setItem('ns_smartlab_trial_start', String(firstOpen));
  }

  const daysUsed = Math.floor((now - firstOpen) / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, NS_APP_CONFIG.trialDays - daysUsed);

  renderSubscriptionBar(isPro, daysLeft, deviceId);

  if (!isPro && daysLeft <= 0) {
    openSubscriptionModal(true, "انتهت الفترة التجريبية المجانية (30 يوماً). يرجى تفعيل النسخة المدفوعة عبر InstaPay للاستمرار في استخدام التطبيق وتفعيل وضع بدون إنترنت.");
  }
}

function renderSubscriptionBar(isPro, daysLeft, deviceId) {
  const existing = document.getElementById('ns-top-pro-bar');
  if (existing) existing.remove();

  const bar = document.createElement('div');
  bar.id = 'ns-top-pro-bar';
  bar.style.cssText = 'background:linear-gradient(90deg,#042f2e,#0f766e,#115e59);color:#ffffff;padding:8px 16px;font-family:Cairo,sans-serif;font-size:12.5px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;direction:rtl;z-index:45;border-bottom:1px solid rgba(255,255,255,0.15);box-shadow:0 2px 10px rgba(0,0,0,0.15);';

  const badgeHtml = isPro
    ? `<div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#fde047;"><span>👑</span><span>النسخة المدفوعة مفعلة (تعمل بدون إنترنت Offline على جميع الأنظمة)</span></div>`
    : `<div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#fef08a;"><span>⏳</span><span>الفترة التجريبية المجانية: متبقي <b style="color:#fff;background:rgba(0,0,0,0.3);padding:1px 7px;border-radius:6px;">${daysLeft} يوم</b> (العمل بدون نت للمدفوع فقط)</span></div>`;

  bar.innerHTML = `
    ${badgeHtml}
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
      <button onclick="openBookletRulesModal()" style="background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3);padding:5px 12px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:700;font-size:12px;display:inline-flex;align-items:center;gap:5px;transition:0.2s;">
        <span>📘</span><span>قواعد وجدول مواعيد كتيب 2026</span>
      </button>
      <button id="ns-pwa-install-btn" onclick="triggerAppInstall()" style="background:#0284c7;color:#fff;border:none;padding:5px 12px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:700;font-size:12px;display:inline-flex;align-items:center;gap:5px;transition:0.2s;">
        <span>📲</span><span>تثبيت التطبيق</span>
      </button>
      ${!isPro ? `
      <button onclick="openSubscriptionModal(false)" style="background:#f59e0b;color:#0f172a;border:none;padding:5px 14px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:800;font-size:12px;display:inline-flex;align-items:center;gap:5px;box-shadow:0 2px 8px rgba(245,158,11,0.4);">
        <span>⚡</span><span>تفعيل النسخة المدفوعة (InstaPay)</span>
      </button>` : ''}
    </div>
  `;

  document.body.prepend(bar);
}

async function triggerAppInstall() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredInstallPrompt = null;
    }
  } else {
    alert("📲 لتثبيت التطبيق على جهازك:\n\n• للأندرويد والويندوز (Chrome/Edge): اضغط على القائمة (⋮) أعلى المتصفح ثم اختر (تثبيت التطبيق / Install App).\n• للآيفون (iOS Safari): اضغط على زر المشاركة (Share) بالأسفل ثم اختر (إضافة إلى الشاشة الرئيسية / Add to Home Screen).");
  }
}

function openSubscriptionModal(isLocked = false, alertMessage = "") {
  const old = document.getElementById('ns-pro-modal');
  if (old) old.remove();

  const deviceId = getDeviceId();
  const waMsg = encodeURIComponent(`مرحباً أ/ نورهان، قمت بتحويل اشتراك تطبيق التحاليل الطبية عبر InstaPay وأرغب في استلام كود التفعيل.\nرقم الجهاز (Device ID): ${deviceId}`);

  const modal = document.createElement('div');
  modal.id = 'ns-pro-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.88);backdrop-filter:blur(6px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;direction:rtl;font-family:Cairo,sans-serif;';

  modal.innerHTML = `
    <div style="background:#ffffff;color:#1e293b;max-width:500px;width:100%;border-radius:24px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);max-height:92vh;display:flex;flex-direction:column;">
      <div style="background:linear-gradient(135deg,#134e4a,#0f766e);color:#fff;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <h3 style="margin:0;font-size:18px;font-weight:900;">👑 ترقية التطبيق للنسخة المدفوعة (Pro)</h3>
          <p style="margin:2px 0 0;font-size:12px;color:#99f6e4;">يعمل بدون إنترنت (Offline) على Android & iOS & Windows</p>
        </div>
        ${!isLocked ? `<button onclick="document.getElementById('ns-pro-modal').remove()" style="background:rgba(255,255,255,0.15);color:#fff;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;font-weight:bold;">✕</button>` : ''}
      </div>

      <div style="padding:20px;overflow-y:auto;space-y:14px;">
        ${alertMessage ? `<div style="background:#fef2f2;border:1px solid #fecaca;color:#991b1b;padding:10px 14px;border-radius:12px;font-size:13px;font-weight:700;margin-bottom:14px;">⚠️ ${alertMessage}</div>` : ''}

        <div style="background:#f0fdfa;border:1px solid #ccfbf1;border-radius:16px;padding:14px;margin-bottom:14px;">
          <div style="font-weight:800;color:#0f766e;font-size:14px;margin-bottom:6px;">✨ مميزات النسخة المدفوعة:</div>
          <ul style="margin:0;padding-right:18px;font-size:13px;color:#334155;line-height:1.7;">
            <li><b>العمل بدون إنترنت نهائياً (100% Offline)</b> داخل المعمل أو المستشفى.</li>
            <li>شامل جميع شروط وتحديثات كتيب المعامل الجديد <b>(إصدار V13.0 - 2026)</b>.</li>
            <li>تصدير ومشاركة بطاقات شروط التحاليل بجودة عالية عبر واتساب.</li>
          </ul>
        </div>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:14px;margin-bottom:14px;">
          <div style="font-weight:800;color:#0f172a;font-size:14px;margin-bottom:8px;">💳 قيمة الاشتراك والدفع عبر InstaPay:</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
            <div style="background:#fff;border:1px solid #cbd5e1;padding:10px;border-radius:12px;text-align:center;">
              <div style="font-size:12px;color:#64748b;font-weight:700;">باقة الاشتراك السنوي</div>
              <div style="font-size:15px;font-weight:900;color:#0f766e;margin-top:2px;">${NS_APP_CONFIG.pricing.annualUSD}</div>
              <div style="font-size:12px;font-weight:700;color:#d97706;">أو ${NS_APP_CONFIG.pricing.annualEGP}</div>
            </div>
            <div style="background:#fffbeb;border:2px solid #f59e0b;padding:10px;border-radius:12px;text-align:center;">
              <div style="font-size:12px;color:#b45309;font-weight:800;">⭐ تفعيل مدى الحياة</div>
              <div style="font-size:15px;font-weight:900;color:#0f766e;margin-top:2px;">${NS_APP_CONFIG.pricing.lifetimeUSD}</div>
              <div style="font-size:12px;font-weight:700;color:#d97706;">أو ${NS_APP_CONFIG.pricing.lifetimeEGP}</div>
            </div>
          </div>

          <div style="font-size:12.5px;font-weight:700;color:#334155;margin-bottom:4px;">عنوان الدفع اللحظي (InstaPay IPA):</div>
          <div style="display:flex;align-items:center;justify-content:space-between;background:#e0f2fe;border:1px solid #bae6fd;padding:8px 12px;border-radius:10px;">
            <code style="font-size:14px;font-weight:900;color:#0369a1;letter-spacing:0.5px;">${NS_APP_CONFIG.instapayAddress}</code>
            <button onclick="navigator.clipboard.writeText('${NS_APP_CONFIG.instapayAddress}');alert('تم نسخ عنوان InstaPay بنجاح!');" style="background:#0284c7;color:#fff;border:none;padding:5px 12px;border-radius:8px;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;">نسخ العنوان</button>
          </div>
        </div>

        <div style="background:#fefce8;border:1px solid #fde047;border-radius:14px;padding:12px;margin-bottom:14px;font-size:12.5px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="font-weight:700;color:#713f12;">رقم تعريف جهازك:</span>
            <code style="background:#fef08a;padding:2px 8px;border-radius:6px;font-weight:900;color:#854d0e;font-size:13px;">${deviceId}</code>
          </div>
          <a href="https://wa.me/${NS_APP_CONFIG.whatsappNumber}?text=${waMsg}" target="_blank" style="display:block;text-align:center;background:#16a34a;color:#fff;text-decoration:none;padding:9px;border-radius:10px;font-weight:800;font-size:13px;box-shadow:0 2px 6px rgba(22,163,74,0.3);">
            📲 إرسال إيصال InstaPay عبر واتساب لاستلام الكود
          </a>
        </div>

        <div>
          <label style="display:block;font-size:13px;font-weight:800;color:#0f172a;margin-bottom:6px;">🔑 أدخل كود التفعيل لتشغيل النسخة المدفوعة والأوفلاين:</label>
          <div style="display:flex;gap:8px;">
            <input id="ns-activation-input" type="text" placeholder="مثال: PRO-9A8B7C" style="flex:1;padding:10px;border:1.5px solid #cbd5e1;border-radius:10px;font-family:Cairo,sans-serif;font-size:14px;font-weight:700;text-align:center;text-transform:uppercase;" />
            <button onclick="handleVerifyActivation()" style="background:#0f766e;color:#fff;border:none;padding:10px 20px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:800;font-size:14px;">تفعيل الآن</button>
          </div>

          <!-- لوحة توليد الأكواد السرية للأدمن فقط (تظهر عند كتابة ADMIN2026) -->
          <div id="ns-secret-admin-panel" style="display:none;margin-top:12px;background:#f1f5f9;border:1.5px dashed #64748b;padding:12px;border-radius:12px;">
            <div style="font-size:12.5px;font-weight:800;color:#0f172a;margin-bottom:6px;">🛠️ لوحة أ/ نورهان صلاح لتوليد أكواد تفعيل المشتركين:</div>
            <input id="ns-admin-client-id" type="text" placeholder="ضعي رقم جهاز العميل هنا (LAB-XXXX-XXXX)" style="width:100%;padding:8px;border:1px solid #94a3b8;border-radius:8px;margin-bottom:8px;font-family:Cairo,sans-serif;font-size:13px;box-sizing:border-box;" />
            <button onclick="document.getElementById('ns-admin-out-key').innerText = 'كود تفعيل العميل هو: ' + generateActivationCode(document.getElementById('ns-admin-client-id').value)" style="background:#0f172a;color:#fff;border:none;padding:6px 14px;border-radius:8px;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;">توليد كود التفعيل</button>
            <div id="ns-admin-out-key" style="margin-top:8px;font-weight:900;color:#15803d;font-size:14px;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function handleVerifyActivation() {
  const val = (document.getElementById('ns-activation-input').value || '').trim().toUpperCase();
  if (val === 'ADMIN2026') {
    document.getElementById('ns-secret-admin-panel').style.display = 'block';
    return;
  }
  const expected = generateActivationCode(getDeviceId());
  if (val === expected) {
    localStorage.setItem('ns_smartlab_pro_activated', 'TRUE');
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'ACTIVATE_PRO_OFFLINE' });
    }
    alert("🎉 تم تفعيل النسخة المدفوعة بنجاح! تم الآن حفظ التطبيق بالكامل للعمل بدون إنترنت (Offline Mode) مدى الحياة.");
    window.location.reload();
  } else {
    alert("❌ كود التفعيل غير مطابق لرقم جهازك. تأكد من إرسال رقم تعريف جهازك الصحيح عبر واتساب.");
  }
}

function openBookletRulesModal() {
  const old = document.getElementById('ns-booklet-2026-modal');
  if (old) old.remove();

  const rulesHtml = MABARET_2026_BOOKLET.generalRules.map(r => `<li style="margin-bottom:8px;">${r}</li>`).join('');
  const tatHtml = MABARET_2026_BOOKLET.tatTable.map(r => `
    <tr style="border-bottom:1px solid #e2e8f0;text-align:center;">
      <td style="padding:8px;font-weight:800;background:#f0fdfa;color:#0f766e;">${r.day}</td>
      <td style="padding:8px;">${r.next}</td>
      <td style="padding:8px;">${r.h48}</td>
      <td style="padding:8px;">${r.h72}</td>
      <td style="padding:8px;">${r.h96}</td>
      <td style="padding:8px;">${r.week1}</td>
    </tr>
  `).join('');
  const instHtml = MABARET_2026_BOOKLET.instruments.map(i => `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:8px 12px;border-radius:10px;display:flex;align-items:center;gap:8px;">
      <span style="background:#dcfce7;color:#15803d;font-weight:900;padding:2px 8px;border-radius:6px;font-size:13px;">${i.code}</span>
      <span style="font-size:12.5px;color:#334155;font-weight:600;">${i.name}</span>
    </div>
  `).join('');

  const modal = document.createElement('div');
  modal.id = 'ns-booklet-2026-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.85);backdrop-filter:blur(5px);z-index:99998;display:flex;align-items:center;justify-content:center;padding:16px;direction:rtl;font-family:Cairo,sans-serif;';

  modal.innerHTML = `
    <div style="background:#fff;color:#1e293b;max-width:780px;width:100%;border-radius:24px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.45);max-height:90vh;display:flex;flex-direction:column;">
      <div style="background:linear-gradient(135deg,#134e4a,#0f766e);color:#fff;padding:16px 22px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <h3 style="margin:0;font-size:17px;font-weight:900;">📘 القواعد العامة وجدول استلام النتائج - كتيب المعامل 2026</h3>
          <p style="margin:2px 0 0;font-size:12px;color:#99f6e4;">${MABARET_2026_BOOKLET.version}</p>
        </div>
        <button onclick="document.getElementById('ns-booklet-2026-modal').remove()" style="background:rgba(255,255,255,0.15);color:#fff;border:none;padding:6px 14px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:bold;">إغلاق ✕</button>
      </div>

      <div style="padding:20px;overflow-y:auto;">
        <h4 style="margin:0 0 10px;color:#0f766e;font-size:15px;font-weight:900;">1️⃣ القواعد العامة للاستلام، التخفيف، والمعدلات الطبيعية:</h4>
        <ul style="font-size:13.5px;line-height:1.75;color:#334155;padding-right:20px;margin-bottom:20px;">
          ${rulesHtml}
        </ul>

        <h4 style="margin:0 0 10px;color:#0f766e;font-size:15px;font-weight:900;">2️⃣ جدول حساب مواعيد استلام النتائج (مع إسقاط عطلة يوم الجمعة):</h4>
        <div style="overflow-x:auto;margin-bottom:20px;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;border:1px solid #cbd5e1;">
            <thead>
              <tr style="background:#0f766e;color:#fff;">
                <th style="padding:9px;">يوم إرسال العينة</th>
                <th style="padding:9px;">Next Day Result</th>
                <th style="padding:9px;">48h Result</th>
                <th style="padding:9px;">72h Result</th>
                <th style="padding:9px;">96h Result</th>
                <th style="padding:9px;">1-Week Result</th>
              </tr>
            </thead>
            <tbody>${tatHtml}</tbody>
          </table>
        </div>

        <h4 style="margin:0 0 10px;color:#0f766e;font-size:15px;font-weight:900;">3️⃣ دليل الحروف الخضراء لأجهزة التحاليل المعتمدة في الكتيب:</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:8px;">
          ${instHtml}
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmartLabProSystem);
} else {
  initSmartLabProSystem();
}

// ============================================================================
// نظام الحماية المتقدم: بصمة الهاردوير الثابتة + قفل كامل بعد 30 يوم + نظام Reject
// متوافق مع الدليل الذكي والماسح الذكي (تطوير: أ/ نورهان صلاح)
// ============================================================================

const NS_APP_CONFIG = {
  instapayAddress: "nourhansalah@instapay", // ضعي عنوان InstaPay الخاص بك هنا
  whatsappNumber: "201208459828",           // رقم الواتساب لاستلام بصمة ونوع الجهاز
  trialDays: 30,                            // مدة التجربة المجانية بالأيام
  secretSalt: "NOURHAN_SALAH_LAB_2026",     // مفتاح التشفير الخاص بك
  // قائمة بصمات الأجهزة المرفوضة نهائياً (أي بصمة تضعينها هنا يقفل عليها التطبيق فوراً حتى لو مسحه ونزله)
  blockedFingerprints: [
    "HW-00000000" // يمكنك إضافة أي بصمة جهاز تريدين عمل Reject دائم لها هنا
  ],
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

// ============================================================================
// 1. استخراج موديل الجهاز الحقيقي وبصمة الهاردوير الثابتة (لا تتغير بمسح التطبيق)
// ============================================================================
function getDetailedDeviceModel() {
  const ua = navigator.userAgent || "";
  let os = "Unknown OS";
  let model = "Generic Device";

  if (/android/i.test(ua)) {
    const match = ua.match(/Android\s+([\d.]+);\s*([^;)]+)/i);
    if (match) {
      os = `Android ${match[1]}`;
      model = match[2].replace(/Build\/.*/i, '').trim();
    } else {
      os = "Android";
    }
  } else if (/iPad|iPhone|iPod/.test(ua)) {
    os = "iOS (Apple)";
    model = /iPad/.test(ua) ? `iPad (${screen.width}x${screen.height})` : `iPhone (${screen.width}x${screen.height})`;
  } else if (/Windows NT/i.test(ua)) {
    os = "Windows PC";
    model = `Desktop (${navigator.platform})`;
  } else if (/Macintosh/i.test(ua)) {
    os = "MacOS";
    model = "Mac Computer";
  }

  let gpu = "";
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
      }
    }
  } catch (e) {}

  const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : "";
  const ram = navigator.deviceMemory ? `${navigator.deviceMemory}GB RAM` : "";
  return `${os} | ${model} ${gpu ? '| GPU: ' + gpu.substring(0, 28) : ''} ${cores} ${ram}`.replace(/\s+/g, ' ').trim();
}

function getHardwareFingerprint() {
  let rawSignals = [
    navigator.platform || '',
    navigator.hardwareConcurrency || '',
    navigator.deviceMemory || '',
    `${screen.width}x${screen.height}x${screen.colorDepth}`,
    window.devicePixelRatio || 1,
    Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  ];

  // استخراج موديل الهاردوير من الـ User-Agent بدون إصدار المتصفح حتى يظل ثابتاً
  const ua = navigator.userAgent || "";
  const androidModel = ua.match(/Android[^;]+;\s*([^;)]+)/i);
  if (androidModel) rawSignals.push(androidModel[1].replace(/Build\/.*/i, '').trim());

  // بصمة كارت الشاشة WebGL
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        rawSignals.push(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '');
        rawSignals.push(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '');
      }
    }
  } catch (e) {}

  // بصمة الرسم الفيزيائية Canvas Hardware Rendering
  try {
    const c = document.createElement('canvas');
    c.width = 200;
    c.height = 40;
    const ctx = c.getContext('2d');
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.fillStyle = "#0f766e";
    ctx.fillRect(10, 1, 62, 20);
    ctx.fillStyle = "#1e293b";
    ctx.fillText("NS_LAB_HW_2026", 2, 15);
    rawSignals.push(c.toDataURL().slice(-60));
  } catch (e) {}

  const combined = rawSignals.join('||');
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0, ch; i < combined.length; i++) {
    ch = combined.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex = (h1 >>> 0).toString(16).toUpperCase().padStart(4, '0') +
              (h2 >>> 0).toString(16).toUpperCase().padStart(4, '0');
  return `HW-${hex.substring(0, 8)}`;
}

// توليد كود التفعيل أو كود الحظر (Reject) بناءً على بصمة الهاردوير
function generateActivationCode(hwId) {
  const cleanId = (hwId || '').trim().toUpperCase();
  const str = cleanId + "::PRO::" + NS_APP_CONFIG.secretSalt;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const codePart = Math.abs(hash).toString(36).toUpperCase().padStart(6, '9').substring(0, 6);
  return `PRO-${codePart}`;
}

function generateRejectCode(hwId) {
  const cleanId = (hwId || '').trim().toUpperCase();
  const str = cleanId + "::REJECT::" + NS_APP_CONFIG.secretSalt;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const codePart = Math.abs(hash).toString(36).toUpperCase().padStart(6, '7').substring(0, 6);
  return `REJ-${codePart}`;
}

// ============================================================================
// 2. تخزين تاريخ بداية الـ 30 يوم في 4 طبقات متزامنة (لمنع التحايل بمسح الكاش)
// ============================================================================
async function syncPersistentTrialStart(currentTimestamp) {
  let earliestTime = currentTimestamp;

  // 1) فحص localStorage
  const lsTime = parseInt(localStorage.getItem('ns_hw_trial_start'), 10);
  if (lsTime && !isNaN(lsTime) && lsTime < earliestTime) earliestTime = lsTime;

  // 2) فحص IndexedDB
  try {
    const idbTime = await new Promise((resolve) => {
      const req = indexedDB.open('NS_Security_DB', 1);
      req.onupgradeneeded = (e) => e.target.result.createObjectStore('sec');
      req.onsuccess = (e) => {
        const db = e.target.result;
        const tx = db.transaction('sec', 'readonly');
        const getReq = tx.objectStore('sec').get('trial_start');
        getReq.onsuccess = () => resolve(parseInt(getReq.result, 10) || null);
        getReq.onerror = () => resolve(null);
      };
      req.onerror = () => resolve(null);
    });
    if (idbTime && idbTime < earliestTime) earliestTime = idbTime;
  } catch (e) {}

  // 3) فحص Cache Storage API
  try {
    if ('caches' in window) {
      const cache = await caches.open('ns-hw-sec-vault');
      const res = await cache.match('/__ns_trial_stamp__');
      if (res) {
        const cTime = parseInt(await res.text(), 10);
        if (cTime && !isNaN(cTime) && cTime < earliestTime) earliestTime = cTime;
      }
    }
  } catch (e) {}

  // إعادة كتابة أقدم تاريخ في جميع الطبقات الأربع
  localStorage.setItem('ns_hw_trial_start', String(earliestTime));
  try {
    const req = indexedDB.open('NS_Security_DB', 1);
    req.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction('sec', 'readwrite');
      tx.objectStore('sec').put(String(earliestTime), 'trial_start');
    };
  } catch (e) {}
  try {
    if ('caches' in window) {
      const cache = await caches.open('ns-hw-sec-vault');
      await cache.put('/__ns_trial_stamp__', new Response(String(earliestTime)));
    }
  } catch (e) {}

  return earliestTime;
}

async function getAccurateTimestamp() {
  try {
    const response = await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' });
    const serverDate = response.headers.get('Date');
    if (serverDate) return new Date(serverDate).getTime();
  } catch (e) {}
  return Date.now();
}

// ============================================================================
// 3. القفل الكامل للتطبيق (Hard Lock) عند انتهاء الـ 30 يوم أو عمل Reject للجهاز
// ============================================================================
function executeHardLockScreen(reasonTitle, reasonDesc, isRejected = false) {
  // مسح محتوى التطبيق بالكامل من الصفحة حتى يستحيل استخدامه أو فحصه
  const mainEl = document.querySelector('main');
  if (mainEl) mainEl.innerHTML = '';
  const containerEl = document.querySelector('.container');
  if (containerEl) containerEl.innerHTML = '';
  const scannerBtn = document.getElementById('floating-scanner-btn');
  if (scannerBtn) scannerBtn.remove();

  openSubscriptionModal(true, `${reasonTitle}: ${reasonDesc}`, isRejected);
}

async function initSmartLabProSystem() {
  const hwId = getHardwareFingerprint();
  const isPro = localStorage.getItem('ns_smartlab_pro_activated') === hwId;
  const isRejectedLocal = localStorage.getItem('ns_smartlab_rejected') === 'TRUE' ||
                          NS_APP_CONFIG.blockedFingerprints.includes(hwId);

  if (isRejectedLocal && !isPro) {
    executeHardLockScreen(
      "⛔ تم رفض وحظر هذا الجهاز (Rejected Device)",
      `تم إيقاف صلاحية وصول هذا الجهاز (${hwId}) بقرار من إدارة التطبيق لتجاوز الفترة التجريبية وعدم تفعيل الاشتراك.`,
      true
    );
    return;
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      if (isPro && reg.active) {
        reg.active.postMessage({ type: 'ACTIVATE_PRO_OFFLINE' });
      }
    }).catch(() => {});
  }

  if (!isPro && !navigator.onLine) {
    executeHardLockScreen(
      "🔒 وضع عدم الاتصال بالإنترنت مغلق",
      "ميزة العمل بدون إنترنت (Offline Mode) مخصصة للمشتركين في النسخة المدفوعة فقط."
    );
    return;
  }

  const now = await getAccurateTimestamp();
  const firstOpen = await syncPersistentTrialStart(now);
  const daysUsed = Math.floor((now - firstOpen) / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, NS_APP_CONFIG.trialDays - daysUsed);

  renderSubscriptionBar(isPro, daysLeft, hwId);

  if (!isPro && daysLeft <= 0) {
    executeHardLockScreen(
      "⏳ انتهت الفترة التجريبية المجانية (30 يوماً)",
      "تم إغلاق البرنامج تلقائياً لانتهاء فترة الـ 30 يوماً المجانية لهذا الجهاز. يرجى التفعيل عبر InstaPay لإعادة فتح البرنامج."
    );
  }
}

let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
});

function renderSubscriptionBar(isPro, daysLeft, hwId) {
  const existing = document.getElementById('ns-top-pro-bar');
  if (existing) existing.remove();

  const bar = document.createElement('div');
  bar.id = 'ns-top-pro-bar';
  bar.style.cssText = 'background:linear-gradient(90deg,#042f2e,#0f766e,#115e59);color:#ffffff;padding:8px 16px;font-family:Cairo,sans-serif;font-size:12.5px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;direction:rtl;z-index:45;border-bottom:1px solid rgba(255,255,255,0.15);box-shadow:0 2px 10px rgba(0,0,0,0.15);';

  const badgeHtml = isPro
    ? `<div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#fde047;"><span>👑</span><span>النسخة المدفوعة مفعلة لجهازك (${hwId}) - تعمل بدون إنترنت</span></div>`
    : `<div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#fef08a;"><span>⏳</span><span>الفترة التجريبية: متبقي <b style="color:#fff;background:rgba(0,0,0,0.35);padding:1px 7px;border-radius:6px;">${daysLeft} يوم</b> ثم يغلق البرنامج نهائياً</span></div>`;

  bar.innerHTML = `
    ${badgeHtml}
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
      <button onclick="openBookletRulesModal()" style="background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3);padding:5px 12px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:700;font-size:12px;">
        📘 قواعد وجدول مواعيد كتيب 2026
      </button>
      <button onclick="triggerAppInstall()" style="background:#0284c7;color:#fff;border:none;padding:5px 12px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:700;font-size:12px;">
        📲 تثبيت التطبيق
      </button>
      ${!isPro ? `
      <button onclick="openSubscriptionModal(false)" style="background:#f59e0b;color:#0f172a;border:none;padding:5px 14px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:800;font-size:12px;">
        ⚡ تفعيل النسخة المدفوعة (InstaPay)
      </button>` : ''}
    </div>
  `;
  document.body.prepend(bar);
}

async function triggerAppInstall() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
  } else {
    alert("📲 لتثبيت التطبيق:\n• أندرويد وويندوز: من قائمة المتصفح (⋮) اختر (تثبيت التطبيق / Install App).\n• آيفون (Safari): اضغط مشاركة (Share) ثم (Add to Home Screen).");
  }
}

function openSubscriptionModal(isLocked = false, alertMessage = "", isRejected = false) {
  const old = document.getElementById('ns-pro-modal');
  if (old) old.remove();

  const hwId = getHardwareFingerprint();
  const deviceModel = getDetailedDeviceModel();
  const firstOpen = parseInt(localStorage.getItem('ns_hw_trial_start'), 10);
  const startDateStr = firstOpen ? new Date(firstOpen).toLocaleDateString('ar-EG') : 'اليوم';

  const waMsg = encodeURIComponent(
    `مرحباً أ/ نورهان، قمت بتحويل اشتراك التطبيق عبر InstaPay وأرغب في استلام كود التفعيل.\n` +
    `• بصمة الهاردوير الثابتة: ${hwId}\n` +
    `• نوع الجهاز: ${deviceModel}\n` +
    `• تاريخ بداية التجربة: ${startDateStr}`
  );

  const modal = document.createElement('div');
  modal.id = 'ns-pro-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.95);backdrop-filter:blur(8px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;direction:rtl;font-family:Cairo,sans-serif;';

  modal.innerHTML = `
    <div style="background:#ffffff;color:#1e293b;max-width:510px;width:100%;border-radius:24px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.6);max-height:92vh;display:flex;flex-direction:column;">
      <div style="background:${isRejected ? '#991b1b' : 'linear-gradient(135deg,#134e4a,#0f766e)'};color:#fff;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <h3 style="margin:0;font-size:18px;font-weight:900;">${isRejected ? '⛔ هذا الجهاز مرفوض ومحظور (Rejected)' : '👑 تفعيل النسخة المدفوعة (Pro)'}</h3>
          <p style="margin:2px 0 0;font-size:12px;color:#e2e8f0;">مربوط ببصمة الهاردوير الثابتة للجهاز (${hwId})</p>
        </div>
        ${!isLocked ? `<button onclick="document.getElementById('ns-pro-modal').remove()" style="background:rgba(255,255,255,0.15);color:#fff;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;font-weight:bold;">✕</button>` : ''}
      </div>

      <div style="padding:20px;overflow-y:auto;">
        ${alertMessage ? `<div style="background:#fef2f2;border:1.5px solid #ef4444;color:#991b1b;padding:12px;border-radius:12px;font-size:13px;font-weight:800;margin-bottom:14px;line-height:1.6;">${alertMessage}</div>` : ''}

        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:14px;padding:12px;margin-bottom:14px;font-size:12.5px;">
          <div style="font-weight:800;color:#0f172a;margin-bottom:4px;">📱 بيانات وبصمة جهازك المسجلة أمنياً:</div>
          <div style="color:#334155;">• <b>بصمة الهاردوير (لا تتغير بمسح التطبيق):</b> <code style="background:#fef08a;padding:2px 6px;border-radius:4px;font-weight:900;color:#854d0e;">${hwId}</code></div>
          <div style="color:#334155;margin-top:4px;">• <b>نوع وموديل الجهاز:</b> <span style="color:#0369a1;font-weight:700;">${deviceModel}</span></div>
        </div>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:14px;margin-bottom:14px;">
          <div style="font-weight:800;color:#0f172a;font-size:13.5px;margin-bottom:8px;">💳 خطط التفعيل والدفع عبر InstaPay:</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
            <div style="background:#fff;border:1px solid #cbd5e1;padding:8px;border-radius:10px;text-align:center;">
              <div style="font-size:11.5px;color:#64748b;font-weight:700;">اشتراك سنوي</div>
              <div style="font-size:14px;font-weight:900;color:#0f766e;">${NS_APP_CONFIG.pricing.annualUSD}</div>
              <div style="font-size:11.5px;font-weight:700;color:#d97706;">أو ${NS_APP_CONFIG.pricing.annualEGP}</div>
            </div>
            <div style="background:#fffbeb;border:2px solid #f59e0b;padding:8px;border-radius:10px;text-align:center;">
              <div style="font-size:11.5px;color:#b45309;font-weight:800;">⭐ مدى الحياة</div>
              <div style="font-size:14px;font-weight:900;color:#0f766e;">${NS_APP_CONFIG.pricing.lifetimeUSD}</div>
              <div style="font-size:11.5px;font-weight:700;color:#d97706;">أو ${NS_APP_CONFIG.pricing.lifetimeEGP}</div>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;background:#e0f2fe;border:1px solid #bae6fd;padding:8px 12px;border-radius:10px;">
            <code style="font-size:14px;font-weight:900;color:#0369a1;">${NS_APP_CONFIG.instapayAddress}</code>
            <button onclick="navigator.clipboard.writeText('${NS_APP_CONFIG.instapayAddress}');alert('تم نسخ عنوان InstaPay!');" style="background:#0284c7;color:#fff;border:none;padding:5px 12px;border-radius:8px;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;">نسخ العنوان</button>
          </div>

          <a href="https://wa.me/${NS_APP_CONFIG.whatsappNumber}?text=${waMsg}" target="_blank" style="display:block;text-align:center;background:#16a34a;color:#fff;text-decoration:none;padding:9px;border-radius:10px;font-weight:800;font-size:13px;margin-top:10px;">
            📲 إرسال إيصال InstaPay وبصمة الجهاز عبر واتساب
          </a>
        </div>

        <div>
          <label style="display:block;font-size:13px;font-weight:800;color:#0f172a;margin-bottom:6px;">🔑 أدخل كود التفعيل الخاص ببصمة جهازك:</label>
          <div style="display:flex;gap:8px;">
            <input id="ns-activation-input" type="text" placeholder="PRO-XXXXXX" style="flex:1;padding:10px;border:1.5px solid #cbd5e1;border-radius:10px;font-family:Cairo,sans-serif;font-size:14px;font-weight:700;text-align:center;text-transform:uppercase;" />
            <button onclick="handleVerifyActivation()" style="background:#0f766e;color:#fff;border:none;padding:10px 20px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:800;font-size:14px;">تأكيد</button>
          </div>

          <!-- لوحة الأدمن السرية (تظهر عند كتابة ADMIN2026) لتوليد كود تفعيل أو كود Reject -->
          <div id="ns-secret-admin-panel" style="display:none;margin-top:12px;background:#f1f5f9;border:1.5px dashed #64748b;padding:12px;border-radius:12px;">
            <div style="font-size:12.5px;font-weight:800;color:#0f172a;margin-bottom:6px;">🛠️ لوحة أ/ نورهان صلاح (تفعيل أو Reject ببصمة الهاردوير):</div>
            <input id="ns-admin-client-id" type="text" placeholder="أدخلي بصمة جهاز العميل (HW-XXXXXXXX)" style="width:100%;padding:8px;border:1px solid #94a3b8;border-radius:8px;margin-bottom:8px;font-family:Cairo,sans-serif;font-size:13px;box-sizing:border-box;" />
            <div style="display:flex;gap:8px;">
              <button onclick="document.getElementById('ns-admin-out-key').innerText = '✅ كود التفعيل: ' + generateActivationCode(document.getElementById('ns-admin-client-id').value)" style="flex:1;background:#15803d;color:#fff;border:none;padding:7px;border-radius:8px;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;">توليد كود تفعيل (PRO)</button>
              <button onclick="document.getElementById('ns-admin-out-key').innerText = '⛔ كود الحظر النهائي: ' + generateRejectCode(document.getElementById('ns-admin-client-id').value)" style="flex:1;background:#b91c1c;color:#fff;border:none;padding:7px;border-radius:8px;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;">توليد كود رفض (REJECT)</button>
            </div>
            <div id="ns-admin-out-key" style="margin-top:8px;font-weight:900;color:#0f172a;font-size:14px;text-align:center;"></div>
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
  const hwId = getHardwareFingerprint();
  const expectedPro = generateActivationCode(hwId);
  const expectedRej = generateRejectCode(hwId);

  if (val === expectedRej) {
    localStorage.setItem('ns_smartlab_rejected', 'TRUE');
    alert("⛔ تم رفض وحظر هذا الجهاز نهائياً من قِبل الإدارة.");
    window.location.reload();
    return;
  }

  if (val === expectedPro) {
    localStorage.removeItem('ns_smartlab_rejected');
    localStorage.setItem('ns_smartlab_pro_activated', hwId);
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'ACTIVATE_PRO_OFFLINE' });
    }
    alert("🎉 تم تفعيل النسخة المدفوعة بنجاح على بصمة جهازك! يعمل التطبيق الآن بدون إنترنت مدى الحياة.");
    window.location.reload();
  } else {
    alert("❌ الكود غير صحيح لبصمة هذا الجهاز (" + hwId + ").");
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
        <ul style="font-size:13.5px;line-height:1.75;color:#334155;padding-right:20px;margin-bottom:20px;">${rulesHtml}</ul>

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
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:8px;">${instHtml}</div>
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

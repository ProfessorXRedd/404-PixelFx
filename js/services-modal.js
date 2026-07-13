/* ==========================================================================
   404 PixelFx — Service Detail Modal
   Populates a single Bootstrap modal with per-service content so every
   "Learn more" button opens a consistent, comfortable-to-read pop-out.

   The media banner is now a Steam-style gallery: a large main viewer with a
   thumbnail strip underneath. Each service defines a `gallery` array mixing
   videos and images; thumbnails get a play badge for videos, the active
   thumbnail is highlighted, and arrow buttons step through the strip.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var modalEl = document.getElementById('serviceModal');
  if (!modalEl) return;

  /* Each service defines a `gallery` array of media items shown in the
     Steam-style gallery (first item loads by default). Supported items:

     YouTube:  { type: 'youtube', id: 'dQw4w9WgXcQ' }        // part after v= in the URL
               Add embedMode: 'thumbnail' to always link out instead of
               playing inline.
     Image:    { type: 'image', src: 'https://…/photo.jpg', alt: 'RAM install' }
               Optional thumb: 'https://…/small.jpg' for a lighter thumbnail.
     Video:    { type: 'video', src: 'https://…/clip.mp4', poster: '…', autoplay: true }

     Robustness: if a YouTube embed errors or never loads (ad blockers etc.)
     the main viewer swaps to a themed banner with a "Watch on YouTube" link.
     If a gallery image 404s, its thumbnail is removed automatically so the
     strip never shows a broken tile. A service with no gallery (or where
     everything fails) still gets the themed gradient + icon banner.

     Older single-media services (`media: {…}`) still work — they're treated
     as a one-item gallery with the thumbnail strip hidden. */

  var IMG = function (id, w) {
    return 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + (w || 1280) + '&q=80';
  };

  var SERVICES = {
    'hardware-upgrades': {
      icon: 'bi-cpu',
      title: 'Hardware Upgrades',
      tagline: 'Speed up an aging machine or push higher performance.',
      gallery: [
        { type: 'youtube', id: '-efahcth720' },
        { type: 'image', src: IMG('photo-1553273883-a8938f89f492'), thumb: IMG('photo-1553273883-a8938f89f492', 320), alt: 'Motherboard with RAM sticks and aftermarket cooling' },
        { type: 'image', src: IMG('photo-1512756290469-ec264b7fbf87'), thumb: IMG('photo-1512756290469-ec264b7fbf87', 320), alt: 'Graphics card ready for install' },
        { type: 'image', src: IMG('photo-1555617778-02518510b9fa'), thumb: IMG('photo-1555617778-02518510b9fa', 320), alt: 'CPU chip at the center of a motherboard' }
      ],
      whatIsIt: 'Upgrading hardware means swapping out or adding physical components — RAM, storage drives, graphics cards, or cooling — so your existing computer performs like a newer one, without replacing the whole machine.',
      requirements: [
        'Your device model/specs (or bring it in for a quick check)',
        'Your budget range and main use — gaming, editing, or everyday work',
        'A backup of important files before any hardware swap'
      ],
      whatWeDo: [
        'Check compatibility between your machine and the parts you want',
        'Recommend the best upgrade for your budget and goals',
        'Install and configure the new hardware',
        'Run stress tests to confirm stability before handoff'
      ],
      comparison: {
        headers: ['Upgrade', 'Best For', 'Typical Impact'],
        rows: [
          ['RAM (8 → 16/32GB)', 'Multitasking, many browser tabs, light editing', 'Smoother day-to-day use'],
          ['SSD swap', 'Any aging HDD-based PC', 'Faster boot & load times'],
          ['GPU upgrade', 'Gaming, 3D or video work', 'Higher frame rates, faster renders'],
          ['Cooling upgrade', 'Hot-running or loud machines', 'Lower temps, less throttling']
        ]
      }
    },

    'software-installation': {
      icon: 'bi-download',
      title: 'Software Installation',
      tagline: 'Clean setups for your OS and everyday tools.',
      gallery: [
        { type: 'youtube', id: 'zvB-xorBCRE' },
        { type: 'image', src: IMG('photo-1555949963-ff9fe0c870eb'), thumb: IMG('photo-1555949963-ff9fe0c870eb', 320), alt: 'Program code during setup' },
        { type: 'image', src: IMG('photo-1461749280684-dccba630e2f6'), thumb: IMG('photo-1461749280684-dccba630e2f6', 320), alt: 'Code on a monitor' },
        { type: 'image', src: IMG('photo-1517694712202-14dd9538aa97'), thumb: IMG('photo-1517694712202-14dd9538aa97', 320), alt: 'Laptop during software configuration' }
      ],
      whatIsIt: 'We install and configure operating systems, drivers, and licensed software so everything runs correctly from day one — no bloatware, no guesswork.',
      requirements: [
        'Valid license keys for paid software (we don\u2019t install pirated software)',
        'A list of the programs you rely on daily',
        'A backup of current files if the OS is being reinstalled'
      ],
      whatWeDo: [
        'Install or refresh your operating system (Windows/macOS)',
        'Install and update all necessary drivers',
        'Set up your requested software and productivity suites',
        'Walk you through anything new before you leave'
      ],
      comparison: {
        headers: ['Service', 'Includes', 'Good For'],
        rows: [
          ['OS Reinstall', 'Fresh Windows/macOS + drivers', 'Slow, cluttered, or corrupted systems'],
          ['App Setup Only', 'Install/configure specific software', 'OS is fine, you just need programs'],
          ['Full Setup', 'OS + drivers + apps + optimization', 'New or freshly wiped machines']
        ]
      }
    },

    'virus-malware-removal': {
      icon: 'bi-shield-check',
      title: 'Virus & Malware Removal',
      tagline: 'Deep clean, then lock the door behind it.',
      gallery: [
        { type: 'youtube', id: 'am4qukxXvnA' },
        { type: 'image', src: IMG('photo-1614064641938-3bbee52942c7'), thumb: IMG('photo-1614064641938-3bbee52942c7', 320), alt: 'Red padlock on a computer keyboard' },
        { type: 'image', src: IMG('photo-1633265486064-086b219458ec'), thumb: IMG('photo-1633265486064-086b219458ec', 320), alt: 'Golden padlock sitting on a keyboard' },
        { type: 'image', src: IMG('photo-1548092372-0d1bd40894a3'), thumb: IMG('photo-1548092372-0d1bd40894a3', 320), alt: 'Secured laptop close-up' }
      ],
      whatIsIt: 'We scan your entire system for viruses, ransomware, spyware, and adware, remove what\u2019s found, and harden your setup so infections don\u2019t come back.',
      requirements: [
        'Device powers on and can reach a diagnostic environment',
        'Avoid entering passwords or banking info until it\u2019s cleared',
        'Let us know if you\u2019ve noticed pop-ups, slowdowns, or locked files'
      ],
      whatWeDo: [
        'Run multiple deep-scan passes across the system',
        'Quarantine and remove malicious files',
        'Patch the vulnerabilities that let it in',
        'Set up ongoing protection and safe-browsing habits'
      ],
      comparison: {
        headers: ['Level', 'What\u2019s Covered', 'Best For'],
        rows: [
          ['Basic Scan & Clean', 'Common malware/adware removal', 'Occasional pop-ups, slowdowns'],
          ['Deep Removal', 'Ransomware, rootkits, hidden threats', 'Locked files, suspicious activity'],
          ['Removal + Hardening', 'Full clean + firewall/settings lockdown', 'Repeat infections, shared/family PCs']
        ]
      }
    },

    'pc-building': {
      icon: 'bi-pc-display',
      title: 'PC Building',
      tagline: 'A desktop built around what you actually do.',
      gallery: [
        { type: 'youtube', id: '3vl1hd9vlqA' },
        { type: 'image', src: IMG('photo-1591238372338-22d30c883a86'), thumb: IMG('photo-1591238372338-22d30c883a86', 320), alt: 'Custom PC tower on the build table' },
        { type: 'image', src: IMG('photo-1591238372408-8b98667c0460'), thumb: IMG('photo-1591238372408-8b98667c0460', 320), alt: 'Finished desktop tower build' },
        { type: 'image', src: IMG('photo-1694444070793-13db645409f4'), thumb: IMG('photo-1694444070793-13db645409f4', 320), alt: 'CPU seated on the motherboard' }
      ],
      whatIsIt: 'We plan, source (or use your parts), assemble, cable-manage, and stress-test a custom desktop tailored to your budget and use case.',
      requirements: [
        'A budget range and primary use — gaming, editing, work, general',
        'Any parts you already own that you want reused',
        'Preferred case size or aesthetic, if you have one'
      ],
      whatWeDo: [
        'Recommend a parts list matched to your budget and goals',
        'Assemble and cable-manage the build',
        'Install OS, drivers, and essential software',
        'Stress-test and benchmark before delivery'
      ],
      comparison: {
        headers: ['Build Tier', 'Typical Use', 'Focus'],
        rows: [
          ['Everyday Build', 'Browsing, office work, streaming', 'Reliability, quiet operation'],
          ['Creator Build', 'Editing, rendering, multitasking', 'CPU/RAM headroom'],
          ['Gaming Build', 'Modern titles at high settings', 'GPU performance, cooling']
        ]
      }
    },

    'system-maintenance': {
      icon: 'bi-tools',
      title: 'System Maintenance',
      tagline: 'Catch problems before they become downtime.',
      gallery: [
        { type: 'youtube', id: '7XxcVfz0DM4' },
        { type: 'image', src: IMG('photo-1721332154191-ba5f1534266e'), thumb: IMG('photo-1721332154191-ba5f1534266e', 320), alt: 'Technician servicing computer electronics' },
        { type: 'image', src: IMG('photo-1518770660439-4636190af475'), thumb: IMG('photo-1518770660439-4636190af475', 320), alt: 'Circuit board inspection' },
        { type: 'image', src: IMG('photo-1563770660941-20978e870e26'), thumb: IMG('photo-1563770660941-20978e870e26', 320), alt: 'Board-level component check' }
      ],
      whatIsIt: 'Scheduled tune-ups — cleaning, thermal repasting, disk health checks, and updates — that keep a healthy machine healthy and catch failures early.',
      requirements: [
        'Rough age of the device and when it was last serviced',
        'Any noticeable noise, heat, or slowdown patterns',
        'Access to the device for a few hours'
      ],
      whatWeDo: [
        'Physically clean dust from fans and vents',
        'Check and replace thermal paste if needed',
        'Run disk health and SMART diagnostics',
        'Install pending updates and review startup programs'
      ],
      comparison: {
        headers: ['Plan', 'Frequency', 'Best For'],
        rows: [
          ['One-Time Tune-Up', 'As needed', 'First check-up or pre-sale prep'],
          ['Seasonal Plan', 'Every 3–6 months', 'Heavy daily use, gaming/work rigs'],
          ['Business Plan', 'Scheduled, multi-device', 'Small offices, shared computers']
        ]
      }
    },

    'home-service-support': {
      icon: 'bi-house-gear',
      title: 'Home Service Support',
      tagline: 'A technician comes to you.',
      gallery: [
        { type: 'youtube', id: 'U9PANPoOdm0' },
        { type: 'image', src: IMG('photo-1581092918056-0c4c3acd3789'), thumb: IMG('photo-1581092918056-0c4c3acd3789', 320), alt: 'Technician holding a circuit board' },
        { type: 'image', src: IMG('photo-1654687790317-e0edff2e8196'), thumb: IMG('photo-1654687790317-e0edff2e8196', 320), alt: 'On-site laptop service' },
        { type: 'image', src: IMG('photo-1606420187127-dae7c868fa7a'), thumb: IMG('photo-1606420187127-dae7c868fa7a', 320), alt: 'Home router set up on a table' }
      ],
      whatIsIt: 'On-site support at your home or office for network setup, device pairing, smart-home troubleshooting, and repairs that are easier to do in place.',
      requirements: [
        'A convenient address and time window',
        'Access to the router/modem and affected devices',
        'A quick note on the issue so we bring the right tools'
      ],
      whatWeDo: [
        'Diagnose the issue on-site',
        'Set up or repair networks, devices, or smart-home gear',
        'Test everything before we leave',
        'Leave you with basic troubleshooting tips'
      ],
      comparison: {
        headers: ['Visit Type', 'Covers', 'Typical Duration'],
        rows: [
          ['Quick Setup', 'Single device or printer pairing', '30–45 min'],
          ['Network Visit', 'Router config, Wi-Fi coverage', '45–90 min'],
          ['Full Home Visit', 'Multiple devices/rooms', '1.5–3 hrs']
        ]
      }
    },

    'general-diagnosis': {
      icon: 'bi-search',
      title: 'General Diagnosis',
      tagline: 'Not sure what\u2019s wrong? Start here.',
      gallery: [
        { type: 'youtube', id: 'Q6S6vU0dHHs' },
        { type: 'image', src: IMG('photo-1689236673934-66f8e9d9279b'), thumb: IMG('photo-1689236673934-66f8e9d9279b', 320), alt: 'Diagnostic workbench with laptops' },
        { type: 'image', src: IMG('photo-1709102884400-b50ca1a12bc3'), thumb: IMG('photo-1709102884400-b50ca1a12bc3', 320), alt: 'Inspecting a laptop for faults' },
        { type: 'image', src: IMG('photo-1562408590-e32931084e23'), thumb: IMG('photo-1562408590-e32931084e23', 320), alt: 'Checking the circuit board' }
      ],
      whatIsIt: 'A full hardware and software check to pinpoint the actual issue, so you get a clear, honest quote before any work begins.',
      requirements: [
        'The device, in whatever state it\u2019s currently in',
        'A brief description of symptoms, if any',
        'Any recent changes — drops, spills, updates, new software'
      ],
      whatWeDo: [
        'Run hardware checks — power, storage, memory, connections',
        'Run software checks — OS health, startup, error logs',
        'Identify the root cause, not just the symptom',
        'Give you a clear quote with no obligation to proceed'
      ],
      comparison: {
        headers: ['Diagnosis Type', 'Turnaround', 'Cost Applied'],
        rows: [
          ['Standard Diagnosis', 'Same day', 'Free, credited toward repair'],
          ['Priority Diagnosis', 'Within 2 hours', 'Small rush fee, credited'],
          ['Data-Risk Diagnosis', 'Same day', 'Free, includes data-safety check']
        ]
      }
    },

    'data-backup-recovery': {
      icon: 'bi-cloud-arrow-up',
      title: 'Data Backup & Recovery',
      tagline: 'Protect what matters before, and recover it after.',
      gallery: [
        { type: 'youtube', id: 'C5ML_RSufAM' },
        { type: 'image', src: IMG('photo-1620368523635-df9d83338fc1'), thumb: IMG('photo-1620368523635-df9d83338fc1', 320), alt: 'Opened hard disk drive during recovery' },
        { type: 'image', src: IMG('photo-1591799264318-7e6ef8ddb7ea'), thumb: IMG('photo-1591799264318-7e6ef8ddb7ea', 320), alt: 'Hard drive platter close-up' },
        { type: 'image', src: IMG('photo-1597092430872-09a3f4338c60'), thumb: IMG('photo-1597092430872-09a3f4338c60', 320), alt: 'Drive controller board' }
      ],
      whatIsIt: 'We back up your files before any repair, and attempt recovery from failing drives, accidental deletions, or corrupted systems whenever it\u2019s technically possible.',
      requirements: [
        'Stop using a failing drive right away — bring it in as-is',
        'A rough idea of what needs recovering (folders, file types)',
        'A destination drive if you\u2019d like a backup copy made'
      ],
      whatWeDo: [
        'Assess the drive\u2019s condition before attempting anything',
        'Image the drive to avoid further data loss',
        'Recover accessible files, prioritizing what you need most',
        'Deliver recovered data to a drive of your choice'
      ],
      comparison: {
        headers: ['Situation', 'Recovery Odds', 'Notes'],
        rows: [
          ['Accidental deletion', 'High', 'Best if caught quickly, before overwrite'],
          ['Corrupted system, drive OK', 'High', 'Files copied off before any reinstall'],
          ['Physically failing drive', 'Varies', 'Depends on damage; assessed case-by-case']
        ]
      }
    },

    'laptop-screen-replacement': {
      icon: 'bi-laptop',
      title: 'Laptop Screen Replacement',
      tagline: 'Cracked or dead screen, swapped and tested.',
      gallery: [
        { type: 'youtube', id: '_liyO_cttUU' },
        { type: 'image', src: IMG('photo-1602763288580-927cfda37a72'), thumb: IMG('photo-1602763288580-927cfda37a72', 320), alt: 'Laptop opened for screen service' },
        { type: 'image', src: IMG('photo-1658240527554-9cf987b4de49'), thumb: IMG('photo-1658240527554-9cf987b4de49', 320), alt: 'Technician handling a laptop' },
        { type: 'image', src: IMG('photo-1577375729152-4c8b5fcda381'), thumb: IMG('photo-1577375729152-4c8b5fcda381', 320), alt: 'Replaced display up and running' }
      ],
      whatIsIt: 'We replace cracked, flickering, or dead laptop screens with quality panels matched to your exact model, then test before you leave the shop.',
      requirements: [
        'Your laptop\u2019s model number (usually on the bottom label)',
        'A description of the issue — cracked glass, no display, lines/flicker',
        'Backup isn\u2019t required for this repair, but it\u2019s good practice'
      ],
      whatWeDo: [
        'Confirm the exact panel match for your model',
        'Source the replacement screen',
        'Replace and reseat all connectors carefully',
        'Test brightness, color, and touch (if applicable) before pickup'
      ],
      comparison: {
        headers: ['Issue', 'Likely Cause', 'Fix'],
        rows: [
          ['Cracked glass', 'Physical impact', 'Full panel replacement'],
          ['Lines or flicker', 'Loose cable or dying panel', 'Reseat cable, or replace panel'],
          ['No display / backlight bleed', 'Failing backlight or inverter', 'Panel or backlight replacement']
        ]
      }
    },

    'home-network-setup': {
      icon: 'bi-wifi',
      title: 'Home Network Setup',
      tagline: 'A fast, stable connection in every room.',
      gallery: [
        { type: 'youtube', id: '3_STd0Ew3lA' },
        { type: 'image', src: IMG('photo-1606904825846-647eb07f5be2'), thumb: IMG('photo-1606904825846-647eb07f5be2', 320), alt: 'Wi-Fi router installed at home' },
        { type: 'image', src: IMG('photo-1516044734145-07ca8eef8731'), thumb: IMG('photo-1516044734145-07ca8eef8731', 320), alt: 'Modem router with status lights' },
        { type: 'image', src: IMG('photo-1554098415-cae1af5e4f1a'), thumb: IMG('photo-1554098415-cae1af5e4f1a', 320), alt: 'Home modem up and running' }
      ],
      whatIsIt: 'Router configuration, Wi-Fi coverage fixes, and wired network setup so every device in your home gets a reliable connection.',
      requirements: [
        'Your current router/modem and ISP plan details',
        'A rough idea of dead zones or problem rooms',
        'Access to install any extenders or access points if needed'
      ],
      whatWeDo: [
        'Assess coverage and identify weak spots',
        'Configure or upgrade router settings and security',
        'Add extenders, mesh nodes, or wiring where needed',
        'Test speed and stability in every room before we leave'
      ],
      comparison: {
        headers: ['Setup', 'Best For', 'Coverage'],
        rows: [
          ['Router Reconfig', 'Small apartments, single router is enough', 'Single-router coverage'],
          ['Mesh Wi-Fi', 'Multi-room homes, dead zones', 'Whole-home coverage'],
          ['Wired + Wi-Fi Hybrid', 'Home offices, gaming, heavy use', 'Best speed & stability']
        ]
      }
    }
  };

  var iconEl = modalEl.querySelector('#svcModalIcon');
  var titleEl = modalEl.querySelector('#svcModalTitle');
  var taglineEl = modalEl.querySelector('#svcModalTagline');
  var whatIsEl = modalEl.querySelector('#svcModalWhatIs');
  var reqEl = modalEl.querySelector('#svcModalRequirements');
  var doEl = modalEl.querySelector('#svcModalWhatWeDo');
  var theadEl = modalEl.querySelector('#svcModalTableHead');
  var tbodyEl = modalEl.querySelector('#svcModalTableBody');

  var mediaImgEl = modalEl.querySelector('#svcModalImage');
  var mediaVideoEl = modalEl.querySelector('#svcModalVideo');
  var mediaYoutubeEl = modalEl.querySelector('#svcModalYoutube');
  var mediaYoutubeThumbEl = modalEl.querySelector('#svcModalYoutubeThumb');
  var mediaYoutubeThumbImgEl = modalEl.querySelector('#svcModalYoutubeThumbImg');
  var mediaFallbackEl = modalEl.querySelector('#svcModalMediaFallback');
  var mediaFallbackIconEl = modalEl.querySelector('#svcModalMediaIcon');
  var mediaWatchLinkEl = modalEl.querySelector('#svcModalMediaWatchLink');

  var thumbsWrapEl = modalEl.querySelector('#svcModalThumbsWrap');
  var thumbsEl = modalEl.querySelector('#svcModalThumbs');
  var thumbPrevBtn = modalEl.querySelector('#svcThumbPrev');
  var thumbNextBtn = modalEl.querySelector('#svcThumbNext');

  var currentYoutubeId = null;
  var currentServiceData = null;

  var galleryItems = [];   // media items for the currently open service
  var galleryIndex = -1;   // which item is in the main viewer

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function resetMedia() {
    mediaImgEl.style.display = 'none';
    mediaImgEl.onerror = null;
    mediaImgEl.removeAttribute('src');
    mediaVideoEl.style.display = 'none';
    mediaVideoEl.pause();
    mediaVideoEl.onerror = null;
    mediaVideoEl.removeAttribute('src');
    mediaVideoEl.innerHTML = '';
    mediaVideoEl.load();
    mediaYoutubeEl.style.display = 'none';
    mediaYoutubeEl.removeAttribute('src');
    mediaYoutubeThumbEl.style.display = 'none';
    mediaYoutubeThumbEl.removeAttribute('href');
    mediaFallbackEl.style.display = 'none';
    mediaWatchLinkEl.style.display = 'none';
    currentYoutubeId = null;
  }

  /* ---- Gallery helpers -------------------------------------------------- */

  function getGallery(data) {
    if (data.gallery && data.gallery.length) return data.gallery;
    if (data.media) return [data.media];
    return [];
  }

  function usableItems() {
    return galleryItems.filter(function (it) { return !it._broken; });
  }

  function markBroken(item) {
    item._broken = true;
    if (item._thumbBtn) item._thumbBtn.style.display = 'none';
    // Hide the strip entirely if only one (or zero) usable items remain
    if (usableItems().length <= 1) thumbsWrapEl.style.display = 'none';
  }

  function buildThumbs(data) {
    thumbsEl.innerHTML = '';
    galleryItems.forEach(function (item, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'service-modal-thumb';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', (item.type === 'image' ? 'Photo ' : 'Video ') + (i + 1));

      var isVideo = item.type === 'youtube' || item.type === 'video';
      var thumbSrc = null;
      if (item.type === 'youtube' && item.id) {
        thumbSrc = 'https://img.youtube.com/vi/' + item.id + '/mqdefault.jpg';
      } else if (item.type === 'image') {
        thumbSrc = item.thumb || item.src;
      } else if (item.type === 'video') {
        thumbSrc = item.poster || null;
      }

      if (thumbSrc) {
        var img = document.createElement('img');
        img.alt = '';
        img.loading = 'lazy';
        img.onerror = function () {
          if (item.type === 'image') {
            // Broken photo: drop it from the gallery entirely
            markBroken(item);
            if (galleryIndex === i) showFirstUsable();
          } else {
            // Video with no fetchable preview: show a themed icon tile instead
            img.remove();
            addIconTile(btn, data);
          }
        };
        img.src = thumbSrc;
        btn.appendChild(img);
      } else {
        addIconTile(btn, data);
      }

      if (isVideo) {
        var play = document.createElement('span');
        play.className = 'thumb-play';
        play.innerHTML = '<i class="bi bi-play-fill"></i>';
        btn.appendChild(play);
      }

      btn.addEventListener('click', function () { showItem(i); });
      item._thumbBtn = btn;
      thumbsEl.appendChild(btn);
    });

    thumbsWrapEl.style.display = galleryItems.length > 1 ? 'flex' : 'none';
  }

  function addIconTile(btn, data) {
    var tile = document.createElement('span');
    tile.className = 'thumb-icon-tile';
    tile.innerHTML = '<i class="bi ' + data.icon + '"></i>';
    btn.insertBefore(tile, btn.firstChild);
  }

  function updateThumbState() {
    galleryItems.forEach(function (item, i) {
      if (!item._thumbBtn) return;
      item._thumbBtn.classList.toggle('is-active', i === galleryIndex);
    });
    var usable = usableItems();
    var first = galleryItems.indexOf(usable[0]);
    var last = galleryItems.indexOf(usable[usable.length - 1]);
    thumbPrevBtn.disabled = galleryIndex <= first;
    thumbNextBtn.disabled = galleryIndex >= last;

    var active = galleryItems[galleryIndex] && galleryItems[galleryIndex]._thumbBtn;
    if (active && active.scrollIntoView) {
      active.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    }
  }

  function showItem(i) {
    var item = galleryItems[i];
    if (!item || item._broken) return;
    galleryIndex = i;
    renderMediaItem(item, currentServiceData);
    updateThumbState();
  }

  function showFirstUsable() {
    var usable = usableItems();
    if (usable.length) {
      showItem(galleryItems.indexOf(usable[0]));
    } else {
      resetMedia();
      if (currentServiceData) showFallback(currentServiceData);
      thumbsWrapEl.style.display = 'none';
    }
  }

  function stepGallery(dir) {
    var i = galleryIndex + dir;
    while (i >= 0 && i < galleryItems.length) {
      if (!galleryItems[i]._broken) { showItem(i); return; }
      i += dir;
    }
  }

  thumbPrevBtn.addEventListener('click', function () { stepGallery(-1); });
  thumbNextBtn.addEventListener('click', function () { stepGallery(1); });

  function initGallery(data) {
    currentServiceData = data;
    galleryItems = getGallery(data).map(function (item) {
      return Object.assign({}, item); // fresh copies so _broken/_thumbBtn don't stick between opens
    });
    galleryIndex = -1;
    buildThumbs(data);
    showFirstUsable();
  }

  /* ---- Main viewer ------------------------------------------------------ */

  // Renders one media item into the main viewer. If it fails to load, we
  // fall back gracefully: photos are pruned from the strip, YouTube embeds
  // become a themed banner with a "Watch on YouTube" button.
  function renderMediaItem(media, data) {
    resetMedia();

    if (media && media.type === 'image' && media.src) {
      mediaImgEl.onerror = function () {
        mediaImgEl.style.display = 'none';
        markBroken(media);
        showFirstUsable();
      };
      mediaImgEl.src = media.src;
      mediaImgEl.alt = media.alt || data.title;
      mediaImgEl.style.display = 'block';
      return;
    }

    if (media && media.type === 'video' && media.src) {
      if (media.poster) mediaVideoEl.setAttribute('poster', media.poster);
      mediaVideoEl.controls = !media.autoplay;
      mediaVideoEl.autoplay = !!media.autoplay;
      mediaVideoEl.muted = media.autoplay ? true : !!media.muted;
      mediaVideoEl.onerror = function () {
        mediaVideoEl.style.display = 'none';
        if (media.fallbackGif) {
          mediaImgEl.onerror = function () {
            mediaImgEl.style.display = 'none';
            showFallback(data);
          };
          mediaImgEl.src = media.fallbackGif;
          mediaImgEl.alt = media.alt || data.title;
          mediaImgEl.style.display = 'block';
        } else {
          showFallback(data);
        }
      };
      mediaVideoEl.innerHTML = '<source src="' + media.src + '" type="' + (media.mimeType || 'video/mp4') + '">';
      mediaVideoEl.style.display = 'block';
      mediaVideoEl.load();
      return;
    }

    if (media && media.type === 'youtube' && media.id) {
      currentYoutubeId = media.id;

      if (media.embedMode === 'thumbnail') {
        mediaYoutubeThumbEl.href = 'https://www.youtube.com/watch?v=' + media.id;
        mediaYoutubeThumbImgEl.src = 'https://img.youtube.com/vi/' + media.id + '/hqdefault.jpg';
        mediaYoutubeThumbImgEl.onerror = function () {
          mediaYoutubeThumbEl.style.display = 'none';
          showFallback(data, media.id);
        };
        mediaYoutubeThumbEl.style.display = 'block';
        return;
      }

      // Default: play inline via the standard embed iframe. If YouTube
      // reports a playback error (e.g. embedding disabled, or the /embed/
      // endpoint gets blocked by an ad blocker/antivirus web shield on the
      // visitor's machine), the postMessage listener below automatically
      // swaps this out for the themed banner + a "Watch on YouTube" link.
      var origin = (window.location.protocol === 'http:' || window.location.protocol === 'https:')
        ? '&origin=' + encodeURIComponent(window.location.origin)
        : '';
      var params = 'rel=0&enablejsapi=1' + origin + (media.autoplay ? '&autoplay=1&mute=1' : '');
      mediaYoutubeEl.src = 'https://www.youtube.com/embed/' + media.id + '?' + params;
      mediaYoutubeEl.style.display = 'block';
      return;
    }

    showFallback(data);
  }

  function showFallback(data, failedYoutubeId) {
    mediaFallbackIconEl.setAttribute('class', 'bi ' + data.icon);
    mediaFallbackEl.style.display = 'flex';
    if (failedYoutubeId) {
      mediaYoutubeEl.style.display = 'none';
      mediaWatchLinkEl.href = 'https://www.youtube.com/watch?v=' + failedYoutubeId;
      mediaWatchLinkEl.style.display = 'inline-flex';
    } else {
      mediaWatchLinkEl.style.display = 'none';
    }
  }

  // YouTube's IFrame API posts JSON messages to the parent window when a
  // player event fires. If an embed errors out (disabled embedding, blocked
  // origin, region lock, etc.) we catch it here and fall back to the themed
  // banner + a direct "Watch on YouTube" link instead of showing YouTube's
  // raw error screen.
  window.addEventListener('message', function (event) {
    if (!currentYoutubeId) return;
    if (typeof event.origin !== 'string' || event.origin.indexOf('youtube.com') === -1) return;
    var payload;
    try {
      payload = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
    } catch (e) {
      return;
    }
    if (payload && payload.event === 'onError') {
      if (currentServiceData) showFallback(currentServiceData, currentYoutubeId);
    }
  });

  function populateModal(data) {
    iconEl.innerHTML = '<i class="bi ' + data.icon + '"></i>';
    titleEl.textContent = data.title;
    taglineEl.textContent = data.tagline;
    whatIsEl.textContent = data.whatIsIt;
    initGallery(data);

    reqEl.innerHTML = data.requirements.map(function (item) {
      return '<li><i class="bi bi-check2"></i><span>' + escapeHtml(item) + '</span></li>';
    }).join('');

    doEl.innerHTML = data.whatWeDo.map(function (item) {
      return '<li><span>' + escapeHtml(item) + '</span></li>';
    }).join('');

    theadEl.innerHTML = '<tr>' + data.comparison.headers.map(function (h) {
      return '<th>' + escapeHtml(h) + '</th>';
    }).join('') + '</tr>';

    tbodyEl.innerHTML = data.comparison.rows.map(function (row) {
      return '<tr>' + row.map(function (cell, i) {
        return i === 0 ? '<td class="is-label">' + escapeHtml(cell) + '</td>' : '<td>' + escapeHtml(cell) + '</td>';
      }).join('') + '</tr>';
    }).join('');
  }

  document.querySelectorAll('[data-bs-target="#serviceModal"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.getAttribute('data-service');
      var data = SERVICES[key];
      if (data) populateModal(data);
    });
  });

  // Reset scroll position to top each time the modal opens
  modalEl.addEventListener('shown.bs.modal', function () {
    var body = modalEl.querySelector('.modal-body');
    if (body) body.scrollTop = 0;
  });

  // Stop any playing video/embedded YouTube player once the modal closes
  modalEl.addEventListener('hidden.bs.modal', function () {
    mediaVideoEl.pause();
    mediaYoutubeEl.removeAttribute('src');
  });

});

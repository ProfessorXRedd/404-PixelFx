Drop video files in this folder using these exact names and each service's
"Learn more" modal will automatically pick them up — no code changes needed:

  hardware-upgrades.mp4
  software-installation.mp4
  virus-malware-removal.mp4
  pc-building.mp4
  system-maintenance.mp4
  home-service-support.mp4
  general-diagnosis.mp4
  data-backup-recovery.mp4
  laptop-screen-replacement.mp4
  home-network-setup.mp4

Notes:
- MP4 (H.264) is the safest format for browser compatibility.
- Keep clips reasonably short and compressed (a 15-30s, ~5-15MB loop works
  well as a banner) — this plays inline in a modal, not a full video player.
- Until a file exists for a given service, that modal automatically falls
  back to the themed gradient + icon banner, so nothing looks broken.
- To add a poster image (shown before the video loads), drop a matching
  .jpg in ../images/services/ (e.g. hardware-upgrades.jpg) — it's already
  wired up in js/services-modal.js, just uncomment the `poster` line.

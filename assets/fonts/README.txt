SMBL.media — Selbst gehostete Fonts (DSGVO-Pflicht, kein Google/Fontshare-CDN)
=============================================================================

Damit die Marken-Schriften korrekt laden, müssen ZWEI Dateien hier liegen:

  assets/fonts/Satoshi-Variable.woff2
  assets/fonts/Inter-Variable.woff2

Solange sie fehlen, fällt die Seite sauber auf System-Schriften zurück
(sieht ok aus, ist aber nicht das finale Branding).

Wo herunterladen (kostenlos, lizenzkonform):
  • Satoshi  → https://www.fontshare.com/fonts/satoshi  (Download → "Satoshi" → variable .woff2,
               Datei umbenennen in  Satoshi-Variable.woff2)
  • Inter    → https://github.com/rsms/inter/releases  (InterVariable.woff2,
               umbenennen in  Inter-Variable.woff2)

WICHTIG: NICHT per @import / <link> von fonts.googleapis.com oder api.fontshare.com
laden — das überträgt die IP der Besucher an Dritte und ist ohne Einwilligung
DSGVO-widrig. Nur lokal einbinden (ist in brand-tokens.css bereits per @font-face
vorbereitet).

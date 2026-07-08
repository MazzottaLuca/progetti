# Eco-Island Clicker — Asset Pack
## SVG Asset Guide per Android (Kotlin / Gradle)

Tutti gli asset sono in formato **SVG vettoriale**, scalabili a qualsiasi risoluzione
senza perdita di qualità. Perfetto per schermi Android da mdpi a xxxhdpi.

---

## Struttura cartelle

```
eco_island_assets/
├── backgrounds/          # Sfondi isola (3 stadi di pulizia)
│   ├── island_stage1_smog.svg       # 360×640 — Isola inquinata, grigia
│   ├── island_stage2_partial.svg    # 360×640 — Isola parzialmente verde
│   └── island_stage3_paradise.svg   # 360×640 — Isola paradisiaca, piena di vita
│
├── upgrades/             # Icone potenziamenti (128×128)
│   ├── upgrade_tree.svg             # Albero con frutti
│   ├── upgrade_solar_panel.svg      # Pannello solare su palo
│   ├── upgrade_seaplane.svg         # Idrovolante per pulizia oceano
│   ├── upgrade_wind_turbine.svg     # Turbina eolica
│   ├── upgrade_compost.svg          # Bidone compost / riciclaggio
│   └── upgrade_rain_cloud.svg       # Nuvola pioggia / raccolta acqua
│
├── ui/                   # Elementi interfaccia
│   ├── app_icon.svg                 # 512×512 — Icona app launcher
│   ├── btn_click_leaf.svg           # 200×200 — Bottone click principale
│   ├── btn_buy_upgrade.svg          # 180×56  — Bottone "Acquista"
│   ├── icon_natura_points.svg       # 64×64   — Icona valuta
│   ├── header_bar.svg               # 360×80  — Barra header
│   └── card_upgrade.svg             # 340×100 — Card potenziamento
│
└── effects/              # Particelle ed effetti visivi
    ├── popup_plus_point.svg         # 80×50   — "+1" floating text
    ├── sparkle_star.svg             # 60×60   — Stella scintillante
    └── particle_leaf.svg            # 32×32   — Foglia particella
```

---

## Come usare in Android (Kotlin)

### 1. Con WebView (HTML/CSS/JS approach)
Metti gli SVG in `assets/` o `res/raw/` e caricali via JS:
```javascript
document.getElementById('bg').src = 'file:///android_asset/backgrounds/island_stage1_smog.svg';
```

### 2. Con Coil + SVG (ImageView nativo)
```kotlin
// build.gradle
implementation("io.coil-kt:coil-svg:2.x.x")

// Kotlin
imageView.load("file:///android_asset/upgrades/upgrade_tree.svg") {
    decoderFactory { result, options, _ -> SvgDecoder(result.source, options) }
}
```

### 3. Con Glide + SVG
```kotlin
// build.gradle
implementation 'com.github.bumptech.glide:glide:4.x.x'
implementation 'com.caverock:androidsvg-aar:1.4'

// Kotlin
Glide.with(context).load(svgUri).into(imageView)
```

### 4. Come VectorDrawable (per icone UI)
Converti con Android Studio:
`File → New → Vector Asset → Local file (SVG) → scegli il file`

---

## Logica stadi isola (suggerimento)
```kotlin
fun getBackgroundForStage(points: Long): Int {
    return when {
        points < 500   -> R.raw.island_stage1_smog
        points < 5000  -> R.raw.island_stage2_partial
        else           -> R.raw.island_stage3_paradise
    }
}
```

---

## Palette colori del gioco

| Nome         | Hex       | Uso                          |
|--------------|-----------|------------------------------|
| Forest Dark  | `#0a3008` | Sfondi scuri, header         |
| Forest Mid   | `#2a7010` | Tronchi, dettagli            |
| Leaf Green   | `#50a020` | Elementi principali          |
| Fresh Green  | `#70d040` | Highlights, pulsanti         |
| Lime Glow    | `#a0f030` | Sparkle, effetti click       |
| Sky Blue     | `#60b0e0` | Cielo stage 2–3, acqua       |
| Sun Yellow   | `#ffe060` | Sole, stelle, sparkle        |
| Smog Grey    | `#7a7a7a` | Stage 1 background           |
| Ocean Blue   | `#0a5080` | Mare                         |

---

*Asset pack creato per Eco-Island Clicker v1.0*

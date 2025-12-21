# Codemagic Setup - Super Simple!

## Quick Start (3 Steps)

### 1️⃣ Connect to Codemagic

1. Go to [codemagic.io](https://codemagic.io) → Sign up (FREE!)
2. Click **"Add application"**
3. Connect your repository (GitHub/GitLab)
4. Select **"vid-saver"** project

### 2️⃣ Start Build

1. Click **"Start new build"**
2. Select workflow: **"Vid-Saver Production APK"**
3. Click **"Start build"**

### 3️⃣ Download APK

1. Wait 5-10 minutes
2. Download from **Artifacts** section
3. Get file: `vid-saver-v1.1.0.apk`

**Done! No complex setup needed!** 🎉

***

## What You DON'T Need

\~~EXPO\_TOKEN~~ - Not needed! We build locally\
\~~Keystore credentials~~ - Not needed! APK is unsigned (works for testing)\
\~~Complex configuration~~ - Already done in `codemagic.yaml`

***

## Email Notifications (Optional)

Update your email in `codemagic.yaml`:

```yaml
- faizangondal@example.com  # ← Change this to your email
```

***

## Auto-Build Trigger

APK builds automatically when you push to `main` branch!

***

## Want Signed APK? (For Play Store)

If you need a signed APK for Google Play Store:

1. Generate keystore locally:

```bash
keytool -genkey -v -keystore vid-saver.keystore \
  -alias vid-saver-key -keyalg RSA -keysize 2048 -validity 10000
```

2. In Codemagic → **Code signing identities** → Upload keystore
3. Enter the passwords you created
4. Build will auto-sign!

***

## Troubleshooting

**Build failed?** → Check logs in Codemagic dashboard\
**APK won't install?** → Enable "Install from Unknown Sources"\
**Need help?** → https://docs.codemagic.io/

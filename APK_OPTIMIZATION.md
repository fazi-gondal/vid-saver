# APK Size Optimization Guide

## ✅ Automatic Optimizations (No Setup Required!)

**Good news!** Modern EAS Build automatically includes these optimizations in production builds:

1. **ProGuard (R8)** - Code minification and obfuscation
   * Removes unused code automatically
   * Shortens class/method names
   * **~20-30% size reduction**

2. **Resource Shrinking** - Removes unused resources
   * Removes unused drawables, layouts, strings, etc.
   * **~10-15% size reduction**

3. **Hermes Engine** - JavaScript optimization
   * Faster startup times
   * Smaller bundle size
   * Already enabled in Expo

**No configuration needed** - Just run:

```bash
eas build --profile production --platform android
```

## 📊 Expected APK Sizes

| Build Type | APK Size | Notes |
|------------|----------|-------|
| Debug build | 60-80 MB | No optimizations |
| Production APK | 25-35 MB | All optimizations enabled ✅ |
| Production AAB | 25-35 MB | Bundle file |
| AAB user download | **15-20 MB** | What users actually download ✨ |

## 🚀 Additional Optimizations

### 1. Use AAB Instead of APK (Recommended for Play Store)

```bash
eas build --profile production-aab --platform android
```

**Benefits:**

* Google Play generates optimized APKs per device
* 30-50% smaller downloads for users
* Only includes resources needed for specific devices
* Users download 15-20 MB instead of 25-35 MB

### 2. Remove Unused Dependencies

Check your `package.json` and remove any unused packages:

```bash
npm uninstall [package-name]
```

### 3. Optimize Images

Run this before building:

```bash
# Install optimization tool
npm install -g sharp-cli

# Optimize images in assets folder
npx @squoosh/cli --resize '{\"enabled\":true,\"width\":1024}' assets/**/*.{jpg,jpeg,png}
```

### 4. Check What's Taking Space

After building, analyze your APK:

1. Download your APK from EAS
2. Rename `.apk` to `.zip`
3. Extract and check folder sizes
4. Large folders indicate what's bloating the APK

### 5. Enable Hermes (Already Enabled in Expo)

Expo already uses Hermes engine which reduces APK size significantly.

## 🎯 Current Build Status

Your running build command:

```bash
eas build --profile production --platform android
```

This build will automatically include:

* ✅ ProGuard enabled
* ✅ Resource shrinking enabled
* ✅ Hermes engine
* ✅ Code minification

## ⚠️ Important Notes

**If current build is still running:**

* Wait for it to complete
* Then rebuild with the optimized eas.json:
  ```bash
  eas build --profile production --platform android
  ```

**ProGuard can sometimes cause issues:**

* If app crashes after build, we can add ProGuard rules
* Usually works fine for most apps

## 📈 Size Comparison

| Build Type | Typical Size | Download Size (AAB) |
|------------|--------------|---------------------|
| Debug | 60-80 MB | N/A |
| Release (No optimization) | 40-50 MB | N/A |
| Release (Optimized APK) | 25-35 MB | N/A |
| Release (AAB) | 25-35 MB | 15-20 MB |

## 🔧 If You Need Even More Reduction

1. **Split by ABI** (creates multiple APKs):
   * arm64-v8a (most modern devices)
   * armeabi-v7a (older 32-bit devices)
   * x86\_64 (emulators)

2. **Remove translations** you don't need

3. **Use webp** instead of png/jpg

4. **Remove unused fonts**

## 📝 Recommendation

For GitHub releases, use:

```bash
eas build --profile production --platform android
```

The optimized APK will be **significantly smaller** than before! 🎉

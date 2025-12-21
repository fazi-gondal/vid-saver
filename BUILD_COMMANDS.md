# Build Commands for Vid-Saver

## APK Builds (For Direct Installation)

### Preview APK (Testing)

```bash
eas build --profile preview-apk --platform android
```

This creates a test APK for internal testing and distribution.

### Production APK (Release)

```bash
eas build --profile production --platform android
```

This creates a production-ready APK for GitHub releases or direct distribution.

## AAB Builds (For Google Play Store)

### Production AAB

```bash
eas build --profile production-aab --platform android
```

This creates an Android App Bundle for Google Play Store submission.

## Build Status

Check your build status:

```bash
eas build:list
```

## First Time Setup

If you haven't set up EAS Build yet:

1. **Install EAS CLI** (if not already installed):
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure the project**:
   ```bash
   eas build:configure
   ```

4. **Run your first build**:
   ```bash
   eas build --profile production --platform android
   ```

## Download Built APK

After the build completes:

1. Check your email for the build notification
2. Or visit: https://expo.dev/accounts/\[your-username]/projects/vid-saver/builds
3. Download the APK file
4. Upload to GitHub Releases

## Notes

* **preview-apk**: Fast builds for testing, includes development tools
* **production**: Optimized APK for release (recommended for GitHub releases)
* **production-aab**: For Google Play Store only

## Build Time

* First build: ~10-15 minutes
* Subsequent builds: ~5-10 minutes (depending on changes)

## Troubleshooting

If build fails:

1. Check `eas build:list` for error logs
2. Ensure all dependencies are properly installed
3. Verify API keys are correctly configured
4. Check that version numbers are updated

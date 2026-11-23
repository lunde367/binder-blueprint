// One-time touches to the Android project that Capacitor creates (safe to run again):
//  - version number from package.json, build number from the cloud build
//  - the print plugin (window.print() does nothing inside an Android app)
//  - the email sign-in link (binderblueprint://auth) opens the app
//  - every test build is signed with the same test key, so new builds install over old ones
// Usage: npm run app:setup   (after `npx cap add android`)
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const root = new URL('../', import.meta.url), at = p => new URL(p, root);
const { version } = JSON.parse(await readFile(at('package.json'), 'utf8'));
const { appId } = JSON.parse(await readFile(at('capacitor.config.json'), 'utf8'));
const build = process.env.BUILD_NUMBER || '1';
const edit = async (p, fn) => { if (!existsSync(at(p))) return console.log('skipped (not there yet):', p);
  const before = await readFile(at(p), 'utf8'), after = fn(before);
  if (after !== before) await writeFile(at(p), after); console.log(after !== before ? 'updated:' : 'already fine:', p); };

// version
await edit('android/app/build.gradle', s =>
  s.replace(/versionName "[^"]*"/, `versionName "${version}"`).replace(/versionCode \d+/, `versionCode ${build}`));

// the print plugin, next to MainActivity
const pkgDir = 'android/app/src/main/java/' + appId.replace(/\./g, '/');
if (existsSync(at(pkgDir))) {
  const src = (await readFile(at('native/android/PrintPlugin.java'), 'utf8')).replace('APP_PACKAGE', appId);
  await writeFile(at(pkgDir + '/PrintPlugin.java'), src); console.log('updated:', pkgDir + '/PrintPlugin.java');
}
await edit(pkgDir + '/MainActivity.java', s => s.includes('PrintPlugin') ? s : s
  .replace(/import com\.getcapacitor\.BridgeActivity;/, 'import android.os.Bundle;\nimport android.webkit.WebSettings;\nimport com.getcapacitor.BridgeActivity;')
  .replace(/public class MainActivity extends BridgeActivity \{\s*\}/, `public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(PrintPlugin.class);
        super.onCreate(savedInstanceState);
    }

    // Very large system text would push buttons off the screen, so follow the phone's text size up to 130%.
    @Override
    public void onStart() {
        super.onStart();
        WebSettings ws = getBridge().getWebView().getSettings();
        ws.setTextZoom(Math.min(ws.getTextZoom(), 130));
    }
}`));

// the email sign-in link opens the app
await edit('android/app/src/main/AndroidManifest.xml', s => s.includes('android:scheme="binderblueprint"') ? s
  : s.replace(/(<activity\b[\s\S]*?)(\n\s*<\/activity>)/, `$1
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="binderblueprint" android:host="auth" />
            </intent-filter>$2`));

// same test key for every test build (the store version will be signed with a private key)
await edit('android/app/build.gradle', s => s.includes('test.keystore') ? s : s + `
android {
    signingConfigs {
        debug {
            storeFile file('../../tools/app/test.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    }
}
`);

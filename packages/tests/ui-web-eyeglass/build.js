const sass = require('node-sass');
const eyeglass = require('eyeglass');
const gravityBldApi = require('@buildit/gravity-ui-web/build-api');

console.log('TEST: Compile @buildit/gravity-ui-web SASS using Eyeglass');
console.log(`  📦 @buildit/gravity-ui-web:               v${gravityBldApi.version}`);

if (gravityBldApi.gravityParticlesCopyVersion() === null || gravityBldApi.modularscaleCopyVersion() === null) {
  console.warn('  ⚠️ Gravity library has not yet been built, so unable to run this test. Skipping.');
  console.warn('  👉 Run "npm run build" in the root of this monorepo first and then try again.');
  process.exit(0);
}
console.log(`    📦 Embedded @buildit/gravity-particles: v${gravityBldApi.gravityParticlesCopyVersion()}`);
console.log(`    📦 Embedded modularscale-sass:          v${gravityBldApi.modularscaleCopyVersion()}`);

sass.render(eyeglass({
  file: './test.scss'
}), (err, result) => {
  if (err) {
    console.error('  ❌ SASS compilation failed: ', err);
    process.exit(1);
  }

  console.log('  ✅ SASS compilation succeeded.');
  process.exit(0);
});


# Criar APK do APP

- npm install -g eas-cli
- npx eas-cli init

## Android
---

- npx eas-cli login
- npx eas-cli build:configure
- npx eas-cli build --platform android --profile preview

## IOS
---

- npx eas-cli login
- npx eas-cli build:configure
- npx eas-cli build --platform ios --profile preview

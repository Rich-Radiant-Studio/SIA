# Language Switcher Fix

## Problem
The language switcher had two critical issues:
1. Clicking a language didn't actually change the page language on first click
2. After the first click, the button became unresponsive

## Root Cause
The i18n plugin's `t()` function was using a closure over the initial `currentLocale` variable, so translations were never updated when the locale changed. The `window.location.reload()` workaround was causing the button to become unresponsive.

## Solution

### 1. Made i18n Plugin Reactive (`packages/user-web/src/plugins/i18n.ts`)
- Changed `currentLocale` to use getter/setter pattern
- Updated `install()` method to provide reactive `$t` function using arrow functions
- Removed the need for page reload

### 2. Updated LanguageSwitcher Component (`packages/user-web/src/components/LanguageSwitcher.vue`)
- Removed `window.location.reload()` call
- Added proper initialization in `onMounted` to sync with i18n plugin
- Language changes now happen instantly without page reload

### 3. Made Home.vue Reactive (`packages/user-web/src/views/Home.vue`)
- Added `currentLanguage` ref to track language changes
- Modified `$t()` function to be reactive by accessing `currentLanguage.value`
- Added event listener for `user-web-language-changed` event
- Separated static card data from dynamic state (likes/favorites)
- Used computed property for `designCards` to reactively update translations

## How It Works Now

1. User clicks language in dropdown
2. `switchLanguage()` calls `i18n.switchLocale(locale)`
3. i18n plugin updates `localStorage` and dispatches `user-web-language-changed` event
4. Components listening to the event update their `currentLanguage` ref
5. Vue's reactivity system detects the change and re-renders components
6. All `$t()` calls get new translations instantly

## Testing
To test the fix:
1. Run `npm run dev` in `packages/user-web` directory
2. Open the application in browser
3. Click different languages in the dropdown
4. Verify that:
   - Page content changes immediately without reload
   - Button remains clickable after multiple language switches
   - All text updates to the selected language

## Files Modified
- `packages/user-web/src/plugins/i18n.ts`
- `packages/user-web/src/components/LanguageSwitcher.vue`
- `packages/user-web/src/views/Home.vue`

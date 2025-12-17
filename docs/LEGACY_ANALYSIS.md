# Legacy Files and Trash Analysis

This document identifies legacy files, unused code, and potential cleanup opportunities in the hablaqui-rooms repository.

## 🗑️ Major Legacy Items

### 1. **Disabled Background Selection Feature** (`disabled/` directory)

**Location:** `/disabled/`

**Files:**
- `BackgroundSelectionDialog/BackgroundSelectionDialog.tsx` (entirely commented out)
- `BackgroundSelectionDialog/BackgroundSelectionHeader/` (2 files)
- `BackgroundSelectionDialog/BackgroundThumbnail/` (2 files)
- `VideoProvider/useBackgroundSettings/` (2 files)

**Status:** All files are completely commented out and the feature is disabled.

**Impact:**
- The entire `disabled/` directory can be removed if the feature is not planned to be re-enabled
- Related code still exists in active files (see below)

**Recommendation:** Delete the entire `disabled/` directory if background selection is permanently removed.

---

### 2. **Commented-Out Code in Active Files**

#### `src/components/VideoProvider/index.tsx`
- **Line 7:** Commented import: `// import useBackgroundSettings, { BackgroundSettings } from './useBackgroundSettings/useBackgroundSettings';`
- **Line 87:** Commented hook usage: `// const [backgroundSettings, setBackgroundSettings] = useBackgroundSettings(videoTrack, room);`
- **Lines 35-38:** Commented interface properties:
  ```typescript
  // backgroundSettings: BackgroundSettings;
  // setBackgroundSettings: (settings: BackgroundSettings) => void;
  ```
- **Lines 83-87:** Dead code - `isBackgroundSelectionOpen` state is maintained but feature is disabled
- **Lines 104-105:** Dead code - `isBackgroundSelectionOpen` and `setIsBackgroundSelectionOpen` are exposed in context but unused

#### `src/components/Room/Room.tsx`
- **Line 7:** Commented import: `//import BackgroundSelectionDialog from '../BackgroundSelectionDialog/BackgroundSelectionDialog';`
- **Line 34:** Dead code - `isBackgroundSelectionOpen` is read from context but feature is disabled
- **Line 38:** Dead code - `isBackgroundSelectionOpen` used in conditional styling
- **Line 44:** Commented component: `{/* <BackgroundSelectionDialog /> */}`

#### `src/components/MenuBar/Menu/Menu.tsx`
- **Line 3:** Unused import: `import BackgroundIcon from '../../../icons/BackgroundIcon';`
- **Line 22:** Unused import: `import { isSupported } from '@twilio/video-processors';` (only used in commented code)
- **Line 49:** Dead code - `setIsBackgroundSelectionOpen` is destructured but only used in commented code
- **Lines 90-103:** Entire menu item is commented out (background selection feature)

#### `src/components/Buttons/ToggleChatButton/ToggleChatButton.tsx`
- **Line 63:** Dead code - `setIsBackgroundSelectionOpen` is destructured
- **Line 67:** Dead code - `setIsBackgroundSelectionOpen(false)` call (unnecessary if feature is disabled)

#### `src/icons/BackgroundIcon.tsx`
- **Status:** Icon component exists but is only imported in commented code
- **Recommendation:** Delete if background feature is permanently removed

---

### 3. **Unused Dependencies**

#### `@twilio/video-processors` (v1.0.1)
- **Status:** Still in `package.json` dependencies
- **Usage:** Only used to check `isSupported` in commented code (`Menu.tsx` line 22)
- **Postinstall script:** Still copies virtualbackground assets (line 83 in package.json)
- **Recommendation:** 
  - Remove from dependencies if background feature is permanently disabled
  - Remove postinstall script line: `"rimraf public/virtualbackground && copyfiles -f node_modules/@twilio/video-processors/dist/build/* public/virtualbackground"`

#### `copyfiles` (v2.4.1)
- **Status:** Only used in postinstall script for virtualbackground
- **Recommendation:** Remove if `@twilio/video-processors` is removed

#### `rimraf` (v3.0.2)
- **Status:** Only used in postinstall script for virtualbackground
- **Recommendation:** Remove if `@twilio/video-processors` is removed

---

### 4. **Missing Documentation File**

#### `.env.example`
- **Status:** Referenced in README.md (lines 164, 273) but file doesn't exist
- **Impact:** Developers don't have a template for environment variables
- **Recommendation:** Create `.env.example` file with all environment variables documented

---

### 5. **Dead State Management**

#### Background Selection State
The following state is maintained but never used (feature is disabled):
- `isBackgroundSelectionOpen` in `VideoProvider`
- `setIsBackgroundSelectionOpen` function
- Related context properties in `IVideoContext` interface

**Files affected:**
- `src/components/VideoProvider/index.tsx`
- `src/components/Room/Room.tsx`
- `src/components/MenuBar/Menu/Menu.tsx`
- `src/components/Buttons/ToggleChatButton/ToggleChatButton.tsx`
- `src/components/VideoProvider/index.test.tsx`
- `src/components/Room/Room.test.tsx`
- `src/components/Buttons/ToggleChatButton/ToggleChatButton.test.tsx`

**Recommendation:** Remove all background selection state management if feature is permanently disabled.

---

## 📊 Summary Statistics

- **Total legacy files:** 7 files in `disabled/` directory
- **Files with commented code:** 5 active files
- **Unused imports:** 2 (BackgroundIcon, isSupported from video-processors)
- **Dead state variables:** 2 (isBackgroundSelectionOpen, setIsBackgroundSelectionOpen)
- **Potentially unused dependencies:** 3 (@twilio/video-processors, copyfiles, rimraf)
- **Missing files:** 1 (.env.example)

---

## 🧹 Cleanup Recommendations

### High Priority (Safe to Remove)
1. ✅ Delete entire `disabled/` directory
2. ✅ Remove commented imports and code blocks
3. ✅ Remove `isBackgroundSelectionOpen` state management
4. ✅ Remove unused `BackgroundIcon` import
5. ✅ Create `.env.example` file

### Medium Priority (Verify First)
1. ⚠️ Remove `@twilio/video-processors` dependency (if background feature is permanently disabled)
2. ⚠️ Remove `copyfiles` and `rimraf` dependencies (if video-processors is removed)
3. ⚠️ Remove postinstall script line for virtualbackground

### Low Priority (Code Quality)
1. 📝 Clean up test files that reference background selection
2. 📝 Update README to remove references to disabled features (if permanent)

---

## 🔍 Additional Notes

- The `virtualbackground` directory is created during `npm install` but may not be used if the feature is disabled
- Test files still reference background selection functionality (may need updates)
- The `isSupported` check from `@twilio/video-processors` is only used in commented code

---

## ⚠️ Before Removing

**Important:** Before removing the `disabled/` directory and related code:
1. Confirm with the team that background selection feature is permanently disabled
2. Check git history to understand why it was disabled
3. Ensure no plans exist to re-enable the feature
4. Update any related documentation

---

*Analysis Date: $(date)*
*Repository: hablaqui-rooms*


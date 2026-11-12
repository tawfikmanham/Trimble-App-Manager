# Trimble App Manager design guidelines

## Iconography

- Use the shared `Icon` component in `src/App.jsx` with symbols from `public/material-icons.svg`.
- Use `info-outline` for information and contextual help throughout the app. Use the same icon and size for equivalent controls across screens.
- Match an existing symbol before adding one. Preserve visible text labels and accessible names when an icon is part of a control.
- Use locally bundled publisher artwork for named apps in the widget library and tablet preview. Keep each app's visible name beside its artwork.
- The widget artwork comes from the [WhatsApp brand kit](https://www.meta.com/en-gb/brand/resources/whatsapp/whatsapp-brand/), [Google Maps documentation](https://developers.google.com/maps/documentation/), the [YouTube website](https://www.youtube.com/howyoutubeworks/resources/brand-resources/), the [Audible media kit](https://www.audible.com/about/newsroom/audible-assets), and the [Amazon Music web player](https://music.amazon.com/). The Audible chevron was converted from EPS. The Google Maps SVG retains Google's vector outline and uses smaller copies of the embedded gradient textures.
- [Adobe Acrobat](https://www.adobe.com/acrobat.html) and [Play Store](https://play.google.com/store/games) use publisher SVGs. [Instinct Inspections](https://play.google.com/store/apps/details?id=com.trimble.ttm.trimbledvir) and [Instinct Weigh Station Bypass](https://play.google.com/store/apps/details?id=com.trimble.ttm.drivewyze&hl=en) use their published PNGs. Internal widgets with screenshot references use Material glyphs on blue or white tiles until their source artwork is available.

- Use the Google Play listing icons for [XPS Media](https://play.google.com/store/apps/details?id=com.pstleu.media), [Transportation App Launcher](https://play.google.com/store/apps/details?id=com.trimble.ttm.applauncher), [PS Driver Assist](https://play.google.com/store/apps/details?id=com.trimble.ttm.driverassist), [XPS Sensor](https://play.google.com/store/apps/details?id=com.trimbletl.xpsshortcut.sensors), [PS Remote Access](https://play.google.com/store/apps/details?id=com.pltsci.remoteaccess), [XPS File Browser](https://play.google.com/store/apps/details?id=com.trimbletl.xpsshortcut.filebrowser).

## Shared patterns

- Keep the widget heading and contextual help consistent across the Home Screen and Driving Screen tabs. The heading info icon uses an 18 px glyph next to the label and opens a shared help panel with the preview device name and instructions for placing, removing, and previewing widgets.
- Use a shared pattern for equivalent interactions, including tab selection, layout choices, and feedback notices. Keep screen-specific differences tied to the content or behavior.
- Preserve the established tooltip behavior when making visual changes to icons.
- Use one active underline in the theme editor tab bar. Ease its position and width over 200 ms. Move it immediately when reduced motion is enabled.
- In search fields, place the magnifying glass on the left and show a clear button on the right when the field contains text. Return focus to the input after clearing. [Trimble Modus search guidance](https://modus-v1.trimble.com/components/web/tables/styles/)

## Widget library

- Reuse `WidgetLibrary` for the catalog and both theme editor tabs. Its shared surface uses a soft 1 px shadow edge. Set the panel radius to the search field radius plus its inset so the corners align.
- Give widget artwork a translucent 1 px inset outline. Use the blue focus ring for keyboard navigation and full-width row backgrounds for hover and selection.
- The surface, corner, and artwork treatments follow [Jakub Krehel’s interface details](https://jakub.kr/writing/details-that-make-interfaces-feel-better).

## Theme management

- Enable Save only when the theme differs from its saved configuration. Keep Cancel next to Save or Create so users can discard the draft and return to Themes.

- Keep descriptions on one line. Reveal the full description on hover or keyboard focus when it is truncated.
- Use a fixed-width page-size trigger with a trailing chevron. Open the menu above the footer, mark the current size, and support arrow-key navigation and Escape. [Trimble Modus dropdown guidance](https://modus-v1.trimble.com/components/web/dropdowns/styles/)
- Show publication status and its audience on a single line. Use a searchable group dropdown that preserves selections while filtering. Offer Unpublish in the row menu and publication dialog.
- Keep one default theme at the top of the unfiltered list. Publishing and setting the default are separate actions. Publish to the whole organization to replace current assignments or to selected groups to replace assignments for those groups.
- Use a [Modus-style modal](https://modus-v1.trimble.com/components/web/modals/) with Cancel and a [danger button](https://modus-v1.trimble.com/components/web/buttons/) for deletion. Confirm completed deletions with a neutral toast.

## Tablet preview

- Use a 16:9 landscape or 9:16 portrait tablet display for Wallpaper, Home Screen, and Driving Screen. Fill the display with the selected widget layout. Keep a small, even inset inside the display and place Driving Screen navigation beside the widgets in landscape and below them in portrait.
- Build the tablet frame, bezel, hardware buttons, and shadow in CSS. Use a solid bezel with a thin outline and a soft shadow. Keep the bezel even around the display and place the volume buttons near the top-left corner and the power button on the left edge in landscape. Rotate these positions with the frame in portrait.
- When changing orientation, animate the frame dimensions and keep the screen content upright. Anchor the preview at the top-left and swap the long and short edges at the same scale. Size widget and navigation labels and icons relative to the preview column so they stay the same size in both orientations. Switch instantly when reduced motion is enabled.
- Keep the preview at the same position across Wallpaper, Home Screen, and Driving Screen. Use the same compact status bar on all three, with Material Wi-Fi, cellular, and battery indicators aligned on the right.
- Use a plus icon for empty widget slots. In the library, extend hover and selected backgrounds across the row. Size the drag preview to the widget icon and name. Keep it close to the pointer regardless of where the user grabs the row.
- Keep the widget icon visible and show a trailing checkmark for widgets already placed on the active screen. Highlight the slot under a valid widget drag in pale green and label it Drop Widget. Clear that feedback when the widget leaves the slot or the drag ends.
- When switching widget layouts, animate the slot boundaries while keeping labels and icons at their original size. Show the final layout immediately when reduced motion is enabled.

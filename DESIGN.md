# Trimble App Manager design guidelines

## Iconography

- Use the shared `Icon` component in `src/App.jsx` with symbols from `public/material-icons.svg`.
- Use `info-outline` for information and contextual help throughout the app. Use the same icon and size for equivalent controls across screens.
- Match an existing symbol before adding one. Preserve visible text labels and accessible names when an icon is part of a control.

## Shared patterns

- Keep the widget heading and contextual help consistent across the Home Screen and Driving Screen tabs. The heading info icon uses an 18 px glyph next to the label.
- Use a shared pattern for equivalent interactions, including tab selection, layout choices, and feedback notices. Keep screen-specific differences tied to the content or behavior.
- Preserve the established tooltip behavior when making visual changes to icons.

## Tablet preview

- Use a 16:9 landscape or 9:16 portrait tablet display for Wallpaper, Home Screen, and Driving Screen. Fill the display with the selected widget layout. Keep a small, even inset inside the display and place Driving Screen navigation beside the widgets in landscape and below them in portrait.
- Build the tablet frame, bezel, hardware buttons, and shadow in CSS. Use a solid bezel with a thin outline and a soft shadow. Keep the bezel even around the display and place the volume buttons near the top-left corner and the power button on the left edge in landscape. Rotate these positions with the frame in portrait.
- When changing orientation, animate the frame dimensions and keep the screen content upright. Anchor the preview at the top-left and swap the long and short edges at the same scale. Size widget and navigation labels and icons relative to the preview column so they stay the same size in both orientations. Switch instantly when reduced motion is enabled.
- Keep the preview at the same position across Wallpaper, Home Screen, and Driving Screen. Use the same compact status bar on all three, with Material Wi-Fi, cellular, and battery indicators aligned on the right.
- Use a plus icon for empty widget slots. In the library, extend hover and selected backgrounds across the row. Draw the drag preview from the row alone so it excludes the list scrollbar.

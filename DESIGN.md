# Trimble App Manager design guidelines

## Iconography

- Use the shared `Icon` component in `src/App.jsx` with symbols from `public/material-icons.svg`.
- Use `info-outline` for information and contextual help throughout the app. Use the same icon and size for equivalent controls across screens.
- Match an existing symbol before adding one. Preserve visible text labels and accessible names when an icon is part of a control.

## Shared patterns

- Keep the widget heading and contextual help consistent across the Home Screen and Driving Screen tabs. The heading info icon uses an 18 px glyph next to the label.
- Use a shared pattern for equivalent interactions, including tab selection, layout choices, and feedback notices. Keep screen-specific differences tied to the content or behavior.
- Preserve the established tooltip behavior when making visual changes to icons.
- Fill the tablet display with the selected widget layout. Keep a small, even inset inside the display and keep the Driving Screen navigation column beside the widgets.

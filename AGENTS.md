# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

Read `DESIGN.md` before changing icons or shared UI patterns. Use the outlined information symbol consistently across screens.

Keep widget remove buttons square with equal top and right insets. Show a distinct background on hover and keyboard focus in both tablet layouts.

Support removing placed widgets by dragging them from the tablet onto the surrounding editor workspace. Keep the remove button available for click and keyboard use.

On Driving Screen, move placed widgets by dragging them to a different slot. Preview the intervening widgets shifting when the destination is occupied, and apply the order on drop. Use the same gutter for rows, columns, and outer insets across all Driving Screen layouts.

Reveal the green drop highlight from the point where a widget drag enters the slot. Keep the origin fixed until the drag leaves the slot. Use a soft edge during the reveal and a solid green fill across the entire slot when it finishes. Show the solid fill immediately with reduced motion.

Keep the Driving Screen navigation compact so widgets have room. Keep its opaque surface flush with the display edges, use the background to separate the landscape side navigation from the widgets, and keep the horizontal divider in portrait. Use small Home, HOS, and NAV labels. Give the driving header a 34 px minimum height and include a driver portrait.

Use a shorter, nearly square NAV arrow in the Driving Screen preview.

Preserve the widget layout motion between four and six tiles in both directions and the push from two tiles to one. For the one-to-two split and the four-to-three and three-to-two merges, keep the motion aligned with the tile boundaries.

For the three-to-four layout transition, split the wide top tile in two and keep the lower row anchored.

Use outlined layout icons that match the widget slots in the preview. Show one tile, two columns, a wide top tile above two smaller tiles, a 2 × 2 grid, and a two-column, three-row grid.

Use simple horizontal and vertical outlines for the tablet orientation controls.

Keep a single default theme at the top of the Themes table. Truncate overflowing descriptions with a tooltip, and confirm deletions in a Modus-style dialog with a neutral completion toast.

Give Cancel and Save or Create equal widths and heights in the theme editor.

Use the same info panel on Home Screen and Driving Screen. Align its right edge with the info button and keep it within the editor on narrow screens. Include the preview device name and brief instructions for arranging and previewing widgets.

Use the 8 px grid for widget search spacing. Set the panel radius to the search field radius plus its inset. Use an 8 px radius and 8 px inset for a 16 px panel radius.

Extend widget row highlights across the full scrollable width and keep a 4 px vertical gap between rows. Show the thin scrollbar while scrolling and fade it after a short pause. Support keyboard scrolling.

Use a shared square tile with 5 px corners for all widget artwork. Keep tiles 32 px in the widget library and scale them together in the device preview.

Use pure white backgrounds for the Trimble launcher SVGs and leave about 6 px between the blue artwork and the edge of a 32 px library tile.

Keep publication status and audience on one line. Let users search and select multiple groups in the publication dropdown, and offer Unpublish in both the dialog and the row menu.

Use leading icons in the Themes row action menu, a labeled Create theme button, and 16 px insets at the table edges. Keep the theme count beside the title.

Show bulk Unpublish, Delete, and Clear selection in the Themes header when rows are selected. Confirm bulk changes with the affected count and keep the default theme when deleting.

Highlight the current Themes per page option without a checkmark. Give the editor a centered workspace on wide screens, with more room for the tablet and stacked panels when space is limited.

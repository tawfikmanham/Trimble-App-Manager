# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

Read `DESIGN.md` before changing icons or shared UI patterns. Use the outlined information symbol consistently across screens.

Keep widget remove buttons square with equal top and right insets. Show a distinct background on hover and keyboard focus in both tablet layouts.

Support removing placed widgets by dragging them from the tablet onto the surrounding editor workspace. Keep the remove button available for click and keyboard use.

Keep the Driving Screen navigation compact so widgets have room. Keep its opaque surface flush with the display edges and use a straight divider on the widget side. Use small Home, HOS, and NAV labels and a driver portrait in the driving header.

Preserve the widget layout motion between four and six tiles in both directions and the push from two tiles to one. For the one-to-two split and the four-to-three and three-to-two merges, keep the motion aligned with the tile boundaries.

For the three-to-four layout transition, split the wide top tile in two and keep the lower row anchored.

Use outlined layout icons that match the widget slots in the preview. Show one tile, two columns, a wide top tile above two smaller tiles, a 2 × 2 grid, and a two-column, three-row grid.

Use simple horizontal and vertical outlines for the tablet orientation controls.

Keep a single default theme at the top of the Themes table. Truncate overflowing descriptions with a tooltip, and confirm deletions in a Modus-style dialog with a neutral completion toast.

Use the same info panel on Home Screen and Driving Screen. Include the preview device name and brief instructions for arranging and previewing widgets.

Keep publication status and audience on one line. Let users search and select multiple groups in the publication dropdown, and offer Unpublish in both the dialog and the row menu.

Use leading icons in the Themes row action menu, a labeled Create theme button, and 16 px insets at the table edges. Keep the theme count beside the title.

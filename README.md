# Trimble App Manager

Trimble App Manager is a web prototype for configuring how an organization’s tablets look and behave. Browse and edit themes, preview or upload wallpapers, and arrange widgets on the Home and Driving screens.

## Run locally

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

Open http://127.0.0.1:4173. Choose Themes in the sidebar and select + to open the editor. Choose a layout, then click or drag a widget into the preview. Enter a name under Theme Details and select Create.

Themes and their settings are stored in this browser. Devices and Groups show local demo empty states. Device enrollment, Wi-Fi configuration, locking, and wiping require an MDM backend.

Run `npm run build` to build the app and `npm run test:sites` to check the bundled serving configuration.

See [design guidelines](DESIGN.md) for tablet sizing, orientation, and widget interactions. [Design QA](design-qa.md) records browser checks.

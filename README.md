# Trimble App Manager

A local web prototype for an organization’s device-management console. The supplied screenshots guided the Welcome screen, Themes table, and Driving Screen editor.

## Run locally

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

Open http://127.0.0.1:4173. Choose Themes in the sidebar and select + to open the editor. Choose a layout, then click or drag a widget into the preview. Enter a name under Theme Details and select Create.

Themes and their settings are stored in this browser. Devices and Groups show local demo empty states. Device enrollment, Wi-Fi configuration, locking, and wiping require an MDM backend.

Run `npm run build` to build the app and `npm run test:sites` to check the bundled serving configuration.

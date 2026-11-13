import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { audienceLabel, demoGroups, publishTheme, sampleAudience, withDefaultTheme } from './theme-publication.js';

const navigation = [['Welcome', 'home'], ['Themes', 'themes'], ['Widgets', 'widgets'], ['Devices', 'devices'], ['Groups', 'groups']];
const tabs = ['Theme Details', 'Wallpaper', 'Home Screen', 'Driving Screen'];
function Icon({ name, size = 20, className }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
    <use href={`/material-icons.svg#${name}`} />
  </svg>;
}

const layoutIcons = ['single', 'columns', 'wideTop', 'four', 'six'];
const layoutSlotCounts = [1, 2, 3, 4, 6];
const layouts = ['Single', 'Two columns', 'Wide top', 'Four tiles', 'Six tiles'];

// Saved layouts store numeric widget IDs. Keep the catalog order stable.
const widgets = [
  { name: 'DND_AutoWidget_Widget234' },
  { name: 'HOS MPG', icon: 'speed' },
  { name: 'MyMedia - driving mode', icon: 'folder' },
  { name: 'OER Button Driving Screen', icon: 'globe' },
  { name: 'Trip Summary', icon: 'widgets' },
  { name: 'Vehicle Inspection', icon: 'success' },
  { name: 'Dispatch Messages', icon: 'info-outline' },
  { name: 'Fuel Economy', icon: 'speed' },
  { name: 'Delivery Stops', icon: 'navigation' },
  { name: 'Fleet Documents', icon: 'folder' },
  { name: 'Weather & Road Alerts', icon: 'globe' },
  { name: 'Shift Schedule', icon: 'hours' },
  { name: 'Amazon Music', brand: 'amazon-music' },
  { name: 'Audible', brand: 'audible' },
  { name: 'Instinct Weigh Station Bypass', brand: 'trimble-apps/driver-bypass', aliases: ['Drivewyze', 'PreClear', 'Driver Bypass'] },
  { name: 'Driver Media', brand: 'trimble-apps/driver-media', featured: true },
  { name: 'Driving Screen', icon: 'speed', featured: true, tile: 'launcher' },
  { name: 'ELD', brand: 'trimble-apps/eld', featured: true, tile: 'launcher' },
  { name: 'WhatsApp', brand: 'whatsapp' },
  { name: 'Google Maps', brand: 'google-maps' },
  { name: 'YouTube', brand: 'youtube' },
  { name: 'HOS Break', icon: 'timer', tile: 'dashboard' },
  { name: 'Profile', icon: 'account', tile: 'dashboard' },
  { name: 'Route Manifest', icon: 'folder', tile: 'dashboard' },
  { name: 'Weather', icon: 'weather', tile: 'dashboard' },
  { name: 'Roadside Inspection', icon: 'checklist', tile: 'launcher' },
  { name: 'Workflow', brand: 'trimble-apps/workflow', tile: 'launcher' },
  { name: 'Inbox', brand: 'trimble-apps/inbox', tile: 'launcher' },
  { name: 'Forms', icon: 'forms', tile: 'launcher' },
  { name: 'HOS Assistant', brand: 'trimble-apps/hos-assistant', tile: 'launcher' },
  { name: 'Media', icon: 'media', tile: 'launcher' },
  { name: 'OER', brand: 'trimble-apps/oer', tile: 'launcher' },
  { name: 'Adobe Acrobat', brand: 'adobe-acrobat' },
  { name: 'Driver Playbook', icon: 'truck', tile: 'launcher' },
  { name: 'Play Store', brand: 'play-store' },
  { name: 'SmartDelivery Trip Big', icon: 'truck', tile: 'dashboard' },
  { name: 'SmartDelivery Message Widget', icon: 'message', tile: 'dashboard' },
  { name: 'SmartDelivery', icon: 'folder', tile: 'dashboard' },
  { name: 'My Media Driving Podcast', icon: 'podcast', tile: 'dashboard' },
  { name: 'HOS Shift', icon: 'hours', tile: 'dashboard' },
  { name: 'Dev Portal Test Widget', icon: 'settings', tile: 'dashboard' },
  { name: 'Instinct Inspections', brand: 'instinct-inspections', format: 'png', aliases: ['DVIR', 'Trimble Inspections'] },
  { name: 'XPS Media', brand: 'xps-media', format: 'png' },
  { name: 'Transportation App Launcher', brand: 'transportation-app-launcher', format: 'png', aliases: ['Trimble App Launcher', 'App Drawer'] },
  { name: 'PS Driver Assist', brand: 'ps-driver-assist', format: 'png' },
  { name: 'XPS Sensor', brand: 'xps-sensor', format: 'png', aliases: ['XPS Sensors'] },
  { name: 'PS Remote Access', brand: 'ps-remote-access', format: 'png' },
  { name: 'XPS File Browser', brand: 'xps-file-browser', format: 'png' },
].map((widget, id) => ({ ...widget, id }));
const libraryWidgets = [
  ...widgets.filter(widget => widget.brand && !widget.featured && !widget.tile),
  ...widgets.filter(widget => widget.featured || widget.tile),
  ...widgets.filter(widget => !widget.brand && !widget.featured && !widget.tile),
];

const sampleThemes = [
  ['Regional Delivery', 'Route guidance, stop details, and delivery shortcuts for regional drivers.', 'Published'],
  ['Yard Operations', 'Trailer moves, yard checklists, and dispatch contacts for depot tablets.', 'Not published'],
  ['Standard Fleet', 'Default layout for fleet tablets with navigation, hours of service, and messages.', 'Published'],
  ['Field Service', 'Work orders, asset details, and service forms for mobile technicians.', 'Not published'],
  ['Long Haul', 'Driving view with route guidance, hours of service, and trip summaries.', 'Published'],
  ['City Delivery', 'Compact layout for frequent stops, delivery confirmations, and customer notes.', 'Published'],
  ['Driver Training', 'Practice layout with onboarding checklists and reference materials.', 'Not published'],
  ['Depot Dispatch', 'Shift schedules, vehicle assignments, and driver messages for dispatchers.', 'Published'],
  ['Night Shift', 'Low-light layout for overnight routes and depot handovers.', 'Not published'],
  ['Vehicle Inspection', 'Pre-trip and post-trip inspection forms with defect reporting shortcuts.', 'Published'],
  ['Construction Fleet', 'Site maps, equipment checks, and crew contacts for jobsite vehicles.', 'Not published'],
  ['Cold Chain Delivery', 'Temperature checks, delivery windows, and exception reporting for refrigerated loads.', 'Not published'],
  ['Linehaul Transfer', 'Terminal transfers, trailer assignments, and trip documents for linehaul drivers.', 'Published'],
  ['Roadside Support', 'Breakdown reports, assistance contacts, and incident forms for drivers.', 'Not published'],
  ['Rental Equipment', 'Equipment handover checklists, pickup details, and return forms.', 'Not published'],
  ['Safety Review', 'Safety bulletins, incident reporting, and driver reference materials.', 'Published'],
  ['Seasonal Routes', 'Temporary route shortcuts and dispatch contacts for peak delivery periods.', 'Not published'],
  ['Weekend Coverage', 'Reduced set of dispatch and route tools for weekend operations.', 'Not published'],
  ['Fleet Maintenance', 'Service schedules, open defects, and workshop contacts for fleet tablets.', 'Published'],
  ['Local Pickup', 'Pickup schedules, collection notes, and proof-of-pickup shortcuts.', 'Not published'],
];
const seed = sampleThemes.map(([name, description, status], id) => ({
  id, name, description, status, type: id === 2 ? 'Default' : 'Custom', audience: sampleAudience(id, status),
}));

const legacyNames = ['Copy of Theme test', 'DEFAULT_CREATE_THEME', 'DEFAULT_THEME_FROM_CREATE', 'Delete-theme', 'Edited Theme', 'HIhiii', 'my-test-widget', 'sample Theme', 'tam', 'test', 'Test Dashboard', 'Test Default', 'Test Fleet', 'Test Home', 'Test Layout', 'Test Navigation', 'Test Operations', 'Test Theme 2', 'Training Theme', 'Weekend Theme'];
const legacyDescriptions = ['Desc', 'Not available', 'theme', 'Description', 'Hi - This theme is editedd', 'Not available', 'Not available', 'sample', 'testttt', 'teststststst'];

function loadThemes() {
  try {
    const stored = JSON.parse(localStorage.getItem('mobile-app-manager-themes'));
    if (!Array.isArray(stored)) return seed;
    const migrated = stored.map(theme => {
      const sample = seed[theme.id];
      if (!sample || theme.name !== legacyNames[theme.id]) return theme;
      const legacyStatus = [0, 2, 3, 4].includes(theme.id) ? 'Not published' : 'Action required';
      return {
        ...theme,
        name: sample.name,
        description: theme.description === (legacyDescriptions[theme.id] || 'Not available') ? sample.description : theme.description,
        status: theme.status === legacyStatus ? sample.status : theme.status,
      };
    });
    return withDefaultTheme(migrated.map(theme => {
      const sample = seed[theme.id];
      if (theme.audience !== undefined || !sample || sample.name !== theme.name || sample.status !== theme.status) return theme;
      return { ...theme, audience: sample.audience };
    }));
  } catch {
    return seed;
  }
}

const blank = () => ({ name: '', description: '', type: 'Custom', status: 'Not published', audience: null, wallpaper: 'Midnight', screens: {} });
const route = () => location.hash.slice(1) || 'home';
const go = (page) => { location.hash = page; };

export function App() {
  const [page, setPage] = useState(route);
  const [expanded, setExpanded] = useState(false);
  const [account, setAccount] = useState(false);
  const [accountSection, setAccountSection] = useState(null);
  const accountArea = React.useRef(null);
  const accountButton = React.useRef(null);
  const [themes, setThemes] = useState(loadThemes);
  const [notice, setNotice] = useState(null);
  const [noticeHovered, setNoticeHovered] = useState(false);
  const [noticeFocused, setNoticeFocused] = useState(false);

  function notify(message, tone = 'success') {
    setNoticeHovered(false);
    setNoticeFocused(false);
    setNotice({ message, tone });
  }
  useEffect(() => {
    const update = () => { setPage(route()); setAccount(false); };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    if (!notice || notice.tone === 'error' || noticeHovered || noticeFocused) return;
    const timer = setTimeout(() => setNotice(null), 5000);
    return () => clearTimeout(timer);
  }, [notice, noticeHovered, noticeFocused]);
  useEffect(() => {
    if (!account) return;
    function closeOnOutsidePress(event) {
      if (!accountArea.current?.contains(event.target)) setAccount(false);
    }
    function closeOnEscape(event) {
      if (event.key !== 'Escape') return;
      setAccount(false);
      if (accountArea.current?.contains(document.activeElement)) accountButton.current?.focus();
    }
    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [account]);
  const editing = page === 'create' || page.startsWith('edit/');
  const theme = page.startsWith('edit/') ? themes.find(item => String(item.id) === page.split('/')[1]) : undefined;
  const title = editing ? (theme ? 'Edit Theme' : 'Create New Theme') : navigation.find(([, key]) => key === page)?.[0] || 'Welcome';

  function updateThemes(change) {
    const next = change(themes);
    try {
      localStorage.setItem('mobile-app-manager-themes', JSON.stringify(next));
    } catch {
      notify('Could not save. Browser storage may be full or unavailable.', 'error');
      return false;
    }
    setThemes(next);
    return true;
  }

  function save(draft) {
    const savedTheme = { ...draft, id: theme?.id ?? crypto.randomUUID() };
    const saved = updateThemes(items => withDefaultTheme(
      theme ? items.map(item => item.id === theme.id ? savedTheme : item) : [...items, savedTheme],
      draft.type === 'Default' ? savedTheme.id : undefined,
    ));
    if (!saved) return;
    notify(theme ? 'Theme saved' : 'Theme created');
    go('themes');
  }

  return <>
    <header className="top">
      <button className="icon menu-toggle" aria-label="Toggle navigation" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}><Icon name="menu" /></button>
      <strong>Trimble App Manager</strong>
      <div className="account" ref={accountArea}>
        <button ref={accountButton} className="icon" aria-label="Account menu" aria-expanded={account} aria-controls="account-panel" onClick={() => {
          setAccountSection(null);
          setAccount(!account);
        }}><Icon name="account" /></button>
        <div id="account-panel" className="account-menu" hidden={!account}>
          <button type="button" className="account-option" aria-expanded={accountSection === 'profile'} aria-controls="account-profile" onClick={() => setAccountSection(accountSection === 'profile' ? null : 'profile')}>
            <Icon name="account" size={18} />
            My account
          </button>
          <div id="account-profile" className="account-details" hidden={accountSection !== 'profile'}>
            <dl>
              <div><dt>Profile</dt><dd>Alex Morgan</dd></div>
              <div><dt>Organization</dt><dd>Demo Fleet</dd></div>
              <div><dt>Role</dt><dd>Fleet administrator</dd></div>
            </dl>
          </div>
          <button type="button" className="account-option" aria-expanded={accountSection === 'settings'} aria-controls="account-settings" onClick={() => setAccountSection(accountSection === 'settings' ? null : 'settings')}>
            <Icon name="settings" size={18} />
            Settings
          </button>
          <div id="account-settings" className="account-details" hidden={accountSection !== 'settings'}>
            <label><input type="checkbox" checked={expanded} onChange={event => setExpanded(event.target.checked)} /> Show navigation labels</label>
          </div>
        </div>
      </div>
    </header>
    <div className="subhead">{editing && <button className="icon back" aria-label="Back to Themes" onClick={() => go('themes')}><Icon name="back" /></button>}<h1>{title}</h1></div>
    <div className="shell">
      <div className={expanded ? 'rail-frame expanded' : 'rail-frame'}>
        <nav className="rail" aria-label="Main navigation">
          {navigation.map(([label, key]) => <a href={`#${key}`} key={key} title={label} aria-label={label} aria-current={key === page ? 'page' : undefined}><Icon name={key} />{expanded && <span>{label}</span>}</a>)}
        </nav>
      </div>
      <main className={title === 'Welcome' ? 'welcome' : ''}>
        {title === 'Welcome' && <div className="hero-title">Trimble App Manager</div>}
        {page === 'themes' && <ThemeList themes={themes} update={updateThemes} notify={notify} />}
        {editing && <Editor key={page} theme={theme} save={save} />}
        {page === 'widgets' && <div className="standalone"><WidgetLibrary /></div>}
        {['devices', 'groups'].includes(page) && <div className="standalone empty">No {page} connected in this local demo.</div>}
        <footer>
          <span>© 2022 Trimble. All rights reserved. For use by authorized users only, used under license.</span>{' '}
          <span className="footer-policy">
            <span aria-hidden="true">|</span>{' '}
            <a href="https://www.trimble.com/en/our-commitment/responsible-business/data-privacy-and-security/data-privacy-center/privacy-notice">Privacy Policy</a>
          </span>
        </footer>
      </main>
    </div>
    <div className="toast-region">
      <div role="status" aria-atomic="true" className="sr-only">{notice && notice.tone !== 'error' ? notice.message : ''}</div>
      <div role="alert" aria-atomic="true" className="sr-only">{notice?.tone === 'error' ? notice.message : ''}</div>
      {notice && <div className={`toast toast-${notice.tone}`}
        onMouseEnter={() => setNoticeHovered(true)} onMouseLeave={() => setNoticeHovered(false)}
        onFocus={() => setNoticeFocused(true)} onBlur={() => setNoticeFocused(false)}>
        <Icon name={notice.tone === 'success' ? 'success' : 'info-outline'} />
        <p>{notice.message}</p>
        <button type="button" className="icon" aria-label="Dismiss notification" onClick={() => setNotice(null)}><Icon name="close" size={18} /></button>
      </div>}
    </div>
  </>;
}

function Search({ value, change, label }) {
  const input = React.useRef(null);
  const inputId = React.useId();

  function clearSearch() {
    change('');
    input.current.focus();
  }

  return <div className="search">
    <label className="search-icon" htmlFor={inputId}><Icon name="search" /></label>
    <input ref={input} id={inputId} type="search" value={value} onChange={event => change(event.target.value)} placeholder={label} aria-label={label} />
    {value && <button type="button" className="search-clear" aria-label={`Clear ${label.toLowerCase()}`} onClick={clearSearch}>
      <Icon name="close" size={16} />
    </button>}
  </div>;
}

function ThemeDescription({ text }) {
  const label = React.useRef(null);
  const [truncated, setTruncated] = useState(false);
  const [position, setPosition] = useState(null);

  useLayoutEffect(() => {
    const element = label.current;
    const measure = () => setTruncated(element.scrollWidth > element.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!position) return;
    const hide = () => setPosition(null);
    const onEscape = event => { if (event.key === 'Escape') hide(); };
    const onScroll = event => { if (!event.target.closest?.('.theme-description-tooltip')) hide(); };
    document.addEventListener('keydown', onEscape);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', hide);
    return () => {
      document.removeEventListener('keydown', onEscape);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', hide);
    };
  }, [position]);

  function show() {
    if (!truncated) return;
    const { left, top, bottom } = label.current.getBoundingClientRect();
    const viewport = document.documentElement.clientWidth;
    const width = Math.min(340, viewport - 24);
    const below = window.innerHeight - bottom > 160;
    setPosition({
      left: Math.max(12, Math.min(left, viewport - width - 12)),
      width,
      ...(below ? { top: bottom } : { bottom: window.innerHeight - top }),
      maxHeight: Math.min(180, (below ? window.innerHeight - bottom : top) - 8),
    });
  }

  return <div onMouseEnter={show} onMouseLeave={() => {
    if (document.activeElement !== label.current) setPosition(null);
  }}>
    <span className="theme-description" ref={label} tabIndex={truncated ? 0 : undefined} onFocus={show} onBlur={() => setPosition(null)}>{text}</span>
    {truncated && position && createPortal(
      <div className="theme-description-tooltip" style={position} aria-hidden="true" onClick={event => event.stopPropagation()}>{text}</div>,
      document.body,
    )}
  </div>;
}

function PublishGroupPicker({ groups, setGroups }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const picker = React.useRef(null);
  const trigger = React.useRef(null);
  const optionsId = React.useId();
  const matching = demoGroups.filter(group => group.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (!open) return;
    picker.current.querySelector('input[type="search"]').focus();
    const dismiss = event => { if (!picker.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  return <div className="publish-group-picker" ref={picker}
    onBlur={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => {
      if (open && event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        trigger.current.focus();
      }
      if (event.key === 'Enter' && event.target.type === 'search') event.preventDefault();
    }}>
    <button className="publish-group-trigger" ref={trigger} type="button" aria-expanded={open} aria-controls={optionsId}
      onClick={() => { setQuery(''); setOpen(current => !current); }}>
      <span>Select demo groups</span>
      <span className="publish-group-count" aria-live="polite">{groups.length ? `${groups.length} selected` : ''}</span>
      <Icon name="next" size={14} />
    </button>
    <div id={optionsId} className="publish-group-dropdown" hidden={!open}>
      <Search value={query} change={setQuery} label="Search groups" />
      <fieldset className="publish-options publish-groups">
        <legend className="sr-only">Demo groups</legend>
        {matching.map(group => <label key={group}>
          <input type="checkbox" checked={groups.includes(group)}
            onChange={event => setGroups(current => event.target.checked ? [...current, group] : current.filter(name => name !== group))} />
          {group}
        </label>)}
        {!matching.length && <p className="field-note" role="status">No matching groups</p>}
      </fieldset>
    </div>
    {groups.length > 0 && <p className="publish-group-summary field-note">{groups.join(', ')}</p>}
  </div>;
}

function ThemeActionDialog({ action, theme, batch, close, confirm }) {
  const dialog = React.useRef(null);
  const cancel = React.useRef(null);
  const publishing = action === 'publish';
  const [scope, setScope] = useState(theme?.audience?.organization ? 'organization' : 'groups');
  const [groups, setGroups] = useState(theme?.audience?.groups ?? []);
  const [failed, setFailed] = useState(false);
  const currentAudience = theme ? audienceLabel(theme) : '';
  const isDefault = theme?.type === 'Default';
  const deleting = action === 'delete';
  const actionLabel = publishing ? 'Publish' : deleting ? 'Delete' : 'Unpublish';
  const batchLabel = batch && `${batch.count} ${batch.count === 1 ? 'theme' : 'themes'}`;

  useLayoutEffect(() => {
    const element = dialog.current;
    element.showModal();
    cancel.current.focus();
    return () => element.close();
  }, []);

  function submit(audience) {
    setFailed(!confirm(audience));
  }

  return <dialog className="theme-dialog" ref={dialog} aria-labelledby="theme-dialog-title" aria-describedby="theme-dialog-description"
    onCancel={event => { event.preventDefault(); close(); }}>
    <header className="theme-dialog-header">
      <h2 id="theme-dialog-title">{actionLabel} {batchLabel || 'theme'}</h2>
      <button type="button" className="icon" aria-label="Close dialog" onClick={() => close()}><Icon name="close" size={18} /></button>
    </header>
    <form onSubmit={event => {
      event.preventDefault();
      submit(publishing ? scope === 'organization' ? { organization: true } : { groups } : null);
    }}>
      <div className="theme-dialog-body">
        <p id="theme-dialog-description">{batch ? (deleting
          ? 'Deleting these themes is permanent and removes any publications.'
          : 'These themes will be removed from their current audiences.')
          : publishing ? <>Choose where to publish <strong>{theme.name}</strong>.</>
          : isDefault ? <>Set another theme as default before deleting <strong>{theme.name}</strong>.</>
          : <>Delete <strong>{theme.name}</strong>? This action cannot be undone.</>}</p>
        {batch?.skipped > 0 && <p className="field-note">{deleting
          ? 'The default theme will be kept.'
          : `${batch.skipped} ${batch.skipped === 1 ? 'selected theme is' : 'selected themes are'} already unpublished.`}</p>}
        {!publishing && !isDefault && currentAudience && <p className="field-note">Deleting this theme also removes its publication.</p>}
        {publishing && <>
          {currentAudience && <p className="field-note">Current audience: {currentAudience}</p>}
          <fieldset className="publish-options">
            <legend>Audience</legend>
            <label><input type="radio" name="publish-scope" checked={scope === 'organization'} onChange={() => setScope('organization')} /> Whole organization</label>
            <label><input type="radio" name="publish-scope" checked={scope === 'groups'} onChange={() => setScope('groups')} /> Selected groups</label>
          </fieldset>
          {scope === 'organization' ? <p className="field-note">This replaces existing theme assignments across the organization.</p> :
            <>
              <p className="field-note">The selected groups use this theme in place of their current assignments.</p>
              <PublishGroupPicker groups={groups} setGroups={setGroups} />
            </>}
        </>}
        {failed && <p role="alert" className="dialog-error">Could not save. Browser storage may be full or unavailable.</p>}
      </div>
      <footer className="theme-dialog-footer">
        {publishing && theme.status === 'Published' && <button type="button" className="dialog-unpublish" onClick={() => submit(null)}>Unpublish</button>}
        <button type="button" className="dialog-cancel" ref={cancel} onClick={() => close()}>{!publishing && isDefault ? 'Close' : 'Cancel'}</button>
        {(publishing || !isDefault) && <button type="submit" className={deleting ? 'dialog-danger' : 'primary'} disabled={publishing && scope === 'groups' && !groups.length}>{actionLabel}</button>}
      </footer>
    </form>
  </dialog>;
}

const themePageSizes = [5, 10, 20];

function ThemePageSize({ size, change }) {
  const [open, setOpen] = useState(false);
  const container = React.useRef(null);
  const trigger = React.useRef(null);
  const menu = React.useRef(null);
  const menuId = React.useId();

  useLayoutEffect(() => {
    if (!open) return;
    menu.current.querySelector('[aria-checked="true"]')?.focus();
    function dismissOutside(event) {
      if (!container.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', dismissOutside);
    return () => document.removeEventListener('pointerdown', dismissOutside);
  }, [open]);

  function closeMenu() {
    trigger.current.focus();
    setOpen(false);
  }

  function handleMenuKey(event) {
    if (event.key === 'Escape' || event.key === 'Tab') {
      if (event.key === 'Escape') event.preventDefault();
      closeMenu();
      return;
    }

    const options = Array.from(menu.current.children);
    const current = options.indexOf(document.activeElement);
    let next;
    switch (event.key) {
      case 'ArrowDown': next = (current + 1) % options.length; break;
      case 'ArrowUp': next = (current + options.length - 1) % options.length; break;
      case 'Home': next = 0; break;
      case 'End': next = options.length - 1; break;
      default: return;
    }
    event.preventDefault();
    options[next].focus();
  }

  return <div className="page-size" ref={container} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <span>Themes per page</span>
    <button className="page-size-trigger" type="button" ref={trigger}
      aria-label={`Themes per page: ${size}`} aria-haspopup="menu" aria-expanded={open} aria-controls={menuId}
      onClick={() => setOpen(!open)}>
      {size}<Icon name="next" size={16} />
    </button>
    <div id={menuId} className="page-size-menu" role="menu" aria-label="Themes per page"
      ref={menu} hidden={!open} onKeyDown={handleMenuKey}>
      {themePageSizes.map(option => <button type="button" key={option} role="menuitemradio"
        aria-checked={size === option} tabIndex={-1} onClick={() => { if (option !== size) change(option); closeMenu(); }}>
        {option}
      </button>)}
    </div>
  </div>;
}

function ThemeList({ themes, update, notify }) {
  const [query, setQuery] = useState('');
  const [ascending, setAscending] = useState(true);
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState(10);
  const [selected, setSelected] = useState([]);
  const [menu, setMenu] = useState(null);
  const [dialog, setDialog] = useState(null);
  const dialogTrigger = React.useRef(null);
  const addTheme = React.useRef(null);
  const selectPage = React.useRef(null);
  const menuId = React.useId();
  const results = themes.filter(theme => [theme.name, theme.description, theme.status, audienceLabel(theme)].some(value => value?.toLowerCase().includes(query.trim().toLowerCase())))
    .sort((a, b) => Number(b.type === 'Default') - Number(a.type === 'Default') || a.name.localeCompare(b.name) * (ascending ? 1 : -1));
  const start = Math.min(index, Math.max(0, Math.ceil(results.length / size) - 1)) * size;
  const visible = results.slice(start, start + size);
  const rangeWidth = String(results.length).length * 3 + 5;
  const allSelected = visible.length > 0 && visible.every(theme => selected.includes(theme.id));
  const someSelected = !allSelected && visible.some(theme => selected.includes(theme.id));
  const selectedThemes = themes.filter(theme => selected.includes(theme.id));
  const deletable = selectedThemes.filter(theme => theme.type !== 'Default');
  const published = selectedThemes.filter(theme => theme.status === 'Published');

  useLayoutEffect(() => {
    selectPage.current.indeterminate = someSelected;
  }, [someSelected]);

  useEffect(() => {
    if (!menu) return;
    function dismissOutside(event) {
      if (!(event.target instanceof Node) || !menu.trigger.parentElement?.contains(event.target)) setMenu(null);
    }
    document.addEventListener('pointerdown', dismissOutside);
    window.addEventListener('resize', dismissOutside);
    window.addEventListener('scroll', dismissOutside, true);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      window.removeEventListener('resize', dismissOutside);
      window.removeEventListener('scroll', dismissOutside, true);
    };
  }, [menu]);

  function toggleMenu(id, trigger) {
    if (menu?.id === id) { setMenu(null); return; }
    const bounds = trigger.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const width = Math.min(184, viewportWidth - 16);
    const below = window.innerHeight - bounds.bottom - 12;
    const above = bounds.top - 12;
    const opensUp = below < 174 && above > below;
    setMenu({
      id, trigger, opensUp,
      position: {
        width,
        left: Math.max(8, Math.min(bounds.right - width, viewportWidth - width - 8)),
        maxHeight: Math.max(0, opensUp ? above : below),
        ...(opensUp ? { bottom: window.innerHeight - bounds.top + 4 } : { top: bounds.bottom + 4 }),
      },
    });
  }

  function closeDialog() {
    setDialog(null);
    requestAnimationFrame(() => {
      const trigger = dialogTrigger.current;
      (trigger?.isConnected ? trigger : addTheme.current)?.focus();
    });
  }

  function action(item, operation) {
    dialogTrigger.current = menu.trigger;
    setMenu(null);
    if (operation === 'edit') { go(`edit/${item.id}`); return; }
    if (operation === 'duplicate') {
      if (update(items => [...items, { ...item, id: crypto.randomUUID(), name: `Copy of ${item.name}`, type: 'Custom', status: 'Not published', audience: null }])) notify('Theme duplicated');
      closeDialog();
      return;
    }
    if (operation === 'unpublish') {
      changePublication(item, null);
      closeDialog();
      return;
    }
    setDialog({ action: operation, theme: item });
  }

  function changePublication(theme, audience) {
    if (!update(items => publishTheme(items, theme.id, audience))) return false;
    notify(audience ? 'Theme published' : 'Theme unpublished', audience ? 'success' : 'neutral');
    return true;
  }

  function openBatch(operation, targets, trigger) {
    dialogTrigger.current = trigger;
    setMenu(null);
    setDialog({ action: operation, batch: {
      ids: new Set(targets.map(theme => theme.id)),
      count: targets.length,
      skipped: selectedThemes.length - targets.length,
    } });
  }

  function confirmAction(audience) {
    const { action: operation, theme, batch } = dialog;
    if (batch) {
      const deleting = operation === 'delete';
      if (!update(items => deleting
        ? items.filter(item => item.type === 'Default' || !batch.ids.has(item.id))
        : items.map(item => batch.ids.has(item.id) ? { ...item, audience: null, status: 'Not published' } : item))) return false;
      setSelected([]);
      notify(`${batch.count} ${batch.count === 1 ? 'theme' : 'themes'} ${deleting ? 'deleted' : 'unpublished'}`, 'neutral');
    } else if (operation === 'delete') {
      if (theme.type === 'Default' || !update(items => items.filter(item => item.id !== theme.id))) return false;
      setSelected(ids => ids.filter(id => id !== theme.id));
      notify('Theme deleted', 'neutral');
    } else if (!changePublication(theme, audience)) {
      return false;
    }
    closeDialog();
    return true;
  }

  return <section className="themes" aria-label="Themes">
    <Search value={query} change={value => { setQuery(value); setIndex(0); setMenu(null); setSelected([]); }} label="Search Theme Name, Description, Status" />
    <div className="table-card">
      <div className="table-title">
        <div className="table-title-label">
          <h2>Themes</h2>
          <span aria-live="polite">{results.length} total{selected.length > 0 && ` · ${selected.length} selected`}</span>
        </div>
        {selected.length > 0 ? <div className="theme-bulk-actions" role="group" aria-label="Selected theme actions">
          <button type="button" onClick={() => { setSelected([]); selectPage.current.focus(); }}>Clear selection</button>
          <button type="button" disabled={!published.length} onClick={event => openBatch('unpublish', published, event.currentTarget)}>
            <Icon name="unpublish" size={16} /> Unpublish
          </button>
          <button type="button" className="theme-bulk-delete" disabled={!deletable.length} onClick={event => openBatch('delete', deletable, event.currentTarget)}>
            <Icon name="delete-outline" size={16} /> Delete
          </button>
        </div> : <button ref={addTheme} className="primary create-theme" type="button" onClick={() => go('create')}>
          <Icon name="add" size={16} /> Create theme
        </button>}
      </div>
      <div className="table-scroll" style={{ '--theme-row-count': Math.min(size, results.length) }}><table>
        <colgroup>
          <col className="theme-checkbox-column" />
          {[.32, .27, .15, .26].map(share => <col key={share} style={{ width: `calc((100% - var(--theme-edge-columns)) * ${share})` }} />)}
          <col className="theme-actions-column" />
        </colgroup>
        <thead><tr><th><input ref={selectPage} type="checkbox" aria-label="Select all themes on this page" disabled={!visible.length} checked={allSelected} onChange={() => setSelected(ids => allSelected ? ids.filter(id => !visible.some(theme => theme.id === id)) : [...new Set([...ids, ...visible.map(theme => theme.id)])])} /></th><th aria-sort={ascending ? 'ascending' : 'descending'}><button onClick={() => { setAscending(!ascending); setIndex(0); setMenu(null); }}>Theme Name <Icon name={ascending ? 'ascending' : 'descending'} size={16} className="muted" /></button></th><th>Description</th><th>Theme Type</th><th>Status</th><th aria-label="Actions" /></tr></thead>
        <tbody>{visible.map(item => <tr key={item.id} className={selected.includes(item.id) ? 'theme-row selected' : 'theme-row'} onClick={event => {
          if (!event.target.closest('a, button, input, .row-actions') && !window.getSelection()?.toString()) go(`edit/${item.id}`);
        }}>
          <td><input type="checkbox" aria-label={`Select ${item.name}`} checked={selected.includes(item.id)} onChange={() => setSelected(ids => ids.includes(item.id) ? ids.filter(id => id !== item.id) : [...ids, item.id])} /></td>
          <td><a className="theme-name" href={`#edit/${item.id}`} title={item.name}>{item.name}</a></td><td><ThemeDescription text={item.description || 'Not available'} /></td><td>{item.type}</td>
          <td><span className="theme-status" title={item.status === 'Published' ? `Published · ${audienceLabel(item)}` : undefined}>
            {item.status}{item.status === 'Published' && <span className="theme-audience"> · {item.audience?.groups ? `${item.audience.groups.length} ${item.audience.groups.length === 1 ? 'group' : 'groups'}` : audienceLabel(item)}</span>}
          </span></td>
          <td className="row-actions" onBlur={event => {
            if (menu?.id === item.id && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setMenu(null);
          }} onKeyDown={event => {
            if (menu?.id !== item.id || event.key !== 'Escape') return;
            event.stopPropagation();
            setMenu(null);
            menu.trigger.focus();
          }}>
            <button className="icon muted" type="button" aria-label={`Actions for ${item.name}`}
              aria-expanded={menu?.id === item.id} aria-controls={menu?.id === item.id ? menuId : undefined}
              onClick={event => toggleMenu(item.id, event.currentTarget)}><Icon name="more" /></button>
            {menu?.id === item.id && <div id={menuId} className={`action-menu${menu.opensUp ? ' opens-up' : ''}`} style={menu.position}>
              <button type="button" onClick={() => action(item, 'edit')}><Icon name="edit" size={16} /> Edit</button>
              <button type="button" onClick={() => action(item, 'publish')}>
                <Icon name={item.status === 'Published' ? 'settings' : 'upload'} size={16} />
                {item.status === 'Published' ? 'Manage publication' : 'Publish'}
              </button>
              {item.status === 'Published' && <button type="button" onClick={() => action(item, 'unpublish')}><Icon name="unpublish" size={16} /> Unpublish</button>}
              <button type="button" onClick={() => action(item, 'duplicate')}><Icon name="duplicate" size={16} /> Duplicate</button>
              <button type="button" className="action-delete" onClick={() => action(item, 'delete')}><Icon name="delete-outline" size={16} /> Delete</button>
            </div>}
          </td>
        </tr>)}
        {!visible.length && <tr><td colSpan="6" className="empty">No matching themes</td></tr>}</tbody>
      </table></div>
      <div className="pagination">
        <ThemePageSize size={size} change={value => { setSize(value); setIndex(0); setMenu(null); }} />
        <span className="page-range" style={{ '--page-range-width': `${rangeWidth}ch` }} aria-live="polite">
        {results.length ? start + 1 : 0}-{start + visible.length} of {results.length}
      </span><div className="pagination-controls" role="group" aria-label="Page navigation"><button className="icon" aria-label="Previous page" disabled={!start} onClick={() => { setIndex(start / size - 1); setMenu(null); }}><Icon name="previous" size={18} /></button><button className="icon" aria-label="Next page" disabled={start + size >= results.length} onClick={() => { setIndex(start / size + 1); setMenu(null); }}><Icon name="next" size={18} /></button></div></div>
    </div>
    {dialog && <ThemeActionDialog {...dialog} close={closeDialog} confirm={confirmAction} />}
  </section>;
}

const widgetDragType = 'application/x-trimble-widget';
const placedWidgetDragType = 'application/x-trimble-placed-widget';

function setWidgetDragImage(event) {
  const preview = event.currentTarget.cloneNode(true);
  preview.classList.add('widget-drag-preview');
  preview.setAttribute('aria-hidden', 'true');
  preview.tabIndex = -1;
  preview.querySelector('.widget-placed-check')?.remove();
  document.body.append(preview);

  event.dataTransfer.setDragImage(preview, 12, preview.offsetHeight / 2);
  requestAnimationFrame(() => preview.remove());
}

function WidgetIcon({ widget }) {
  const { brand, format = 'svg', id, icon, featured, tile } = widget;
  if (brand) {
    const fullBleed = format === 'png' || brand === 'adobe-acrobat' || brand.startsWith('trimble-apps/');
    return <span className={`widget-icon widget-icon-brand${brand === 'amazon-music' ? ' widget-icon-amazon' : ''}${fullBleed ? ' widget-icon-full-bleed' : ''}`} aria-hidden="true">
      <img src={`/widget-brands/${brand}.${format}`} alt="" draggable={false} />
    </span>;
  }
  const appearance = tile ? `widget-tile-${tile}` : featured ? 'widget-featured' : `widget-${id}`;
  return <span className={`widget-icon ${appearance}`} aria-hidden="true">{icon && <Icon name={icon} size={18} />}</span>;
}

function widgetSearchKey(text) {
  return text.toLowerCase().replace(/[\s-]+/g, '');
}

function WidgetLibrary({ choose, selected, placed = [], searchRef }) {
  const [query, setQuery] = useState('');
  const [scrolling, setScrolling] = useState(false);
  const scrollbarTimeout = React.useRef(null);
  const search = widgetSearchKey(query);
  const matching = libraryWidgets.filter(({ name, aliases = [] }) =>
    [name, ...aliases].some(label => widgetSearchKey(label).includes(search)),
  );

  useEffect(() => () => window.clearTimeout(scrollbarTimeout.current), []);

  function showScrollbar() {
    setScrolling(true);
    window.clearTimeout(scrollbarTimeout.current);
    scrollbarTimeout.current = window.setTimeout(() => setScrolling(false), 700);
  }

  return <aside className="library" aria-label="Widget library" ref={searchRef}>
    <Search value={query} change={setQuery} label="Search widgets" />
    <div className={`widget-list${scrolling ? ' is-scrolling' : ''}`} role="region" aria-label="Widget results" tabIndex={0} onScroll={showScrollbar}>
      {matching.map(widget => {
        const { name, id } = widget;
        const isPlaced = placed.includes(id);
        return <button type="button" key={id} disabled={!choose} className="widget-option" aria-pressed={choose ? selected === id : undefined} aria-description={isPlaced ? 'Already on this screen' : undefined} draggable={Boolean(choose)} onDragStart={event => {
          event.dataTransfer.effectAllowed = 'copy';
          event.dataTransfer.setData(widgetDragType, String(id));
          setWidgetDragImage(event);
        }} onClick={() => choose?.(id)}>
          <WidgetIcon widget={widget} />
          {name}
          {isPlaced && <Icon name="success" size={16} className="widget-placed-check" />}
        </button>;
      })}
      {!matching.length && <p className="empty">No matching widgets</p>}
    </div>
  </aside>;
}

const wallpaperPresets = [['Midnight', 'midnight'], ['Slate', 'slate'], ['Night lights', 'night-lights']];

function OrientationOptions({ orientation, change }) {
  return <div className="layout-options orientation-options" role="group" aria-label="Tablet orientation">
    {['Landscape', 'Portrait'].map(label => <button key={label} type="button" title={label} aria-label={label} aria-pressed={orientation === label} onClick={() => change(label)}>
      <Icon name={`orientation-${label.toLowerCase()}`} />
    </button>)}
  </div>;
}

function WidgetPreviewHeading({ tab }) {
  const [open, setOpen] = useState(false);
  const area = React.useRef(null);
  const trigger = React.useRef(null);
  const panelId = React.useId();

  useEffect(() => {
    if (!open) return;
    function dismissOutside(event) {
      if (!area.current?.contains(event.target)) setOpen(false);
    }
    function dismissOnEscape(event) {
      if (event.key !== 'Escape') return;
      setOpen(false);
      if (area.current?.contains(document.activeElement)) trigger.current?.focus();
    }
    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', dismissOnEscape);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', dismissOnEscape);
    };
  }, [open]);

  return <div className="preview-heading-row" ref={area}>
    <h2 className="preview-heading">Add widgets to your {tab.toLowerCase()}</h2>
    <button ref={trigger} type="button" className="icon preview-help-toggle" aria-label="Widget preview help"
      aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(current => !current)}>
      <Icon name="info-outline" size={18} />
    </button>
    <div id={panelId} className="preview-help-panel" hidden={!open}>
      <p className="preview-help-device"><Icon name="devices" size={16} /><span>Preview device <strong>Samsung Galaxy Tab</strong></span></p>
      <ol>
        <li>Choose a widget layout above the tablet.</li>
        <li>Drag a widget from the library into a slot, or select a slot and choose a widget from the library.</li>
        {tab === 'Driving Screen' && <li>Drag a placed widget to another slot to rearrange the screen.</li>}
        <li>Switch between landscape and portrait to preview the layout.</li>
      </ol>
      <p>To remove a widget, drag it outside the tablet or select its × button.</p>
    </div>
  </div>;
}

function Tablet({ wallpaper, orientation, driving, children }) {
  const preset = wallpaperPresets.find(([name]) => name === wallpaper?.wallpaper)?.[1] ?? '';
  const custom = wallpaper?.wallpaper === 'Custom' ? wallpaper.wallpaperImage : null;
  return <div className="tablet-stage">
    <div className={`tablet ${orientation === 'Portrait' ? 'tablet-portrait' : ''}`}>
      <div className="tablet-hardware" aria-hidden="true">
        <span className="tablet-key" />
        <span className="tablet-key" />
      </div>
      <span className="tablet-key-power" aria-hidden="true" />
      <div className={`tablet-display ${preset}`} style={custom ? { backgroundImage: `url("${custom.src}")` } : undefined}>
        <div className="tablet-status" aria-hidden="true">
          <span>17:48</span>
          <Icon name="navigation" size={9} />
          <span className="tablet-status-indicators">
            <Icon name="wifi" size={9} />
            <Icon name="signal-cellular" size={9} />
            <Icon name="battery" size={9} />
          </span>
        </div>
        {driving && <div className="driving-status"><strong>03:27</strong><span>Driving time left</span><img className="driver-avatar" src="/driver-avatar.jpg" alt="Demo driver" width="20" height="20" /></div>}
        <div className={driving ? 'tablet-content driving-content' : 'tablet-content'}>{children}</div>
      </div>
    </div>
  </div>;
}

async function prepareWallpaper(file) {
  if (file.type && !file.type.startsWith('image/')) throw new Error('Expected an image');
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const scale = Math.min(1, 1280 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
    return { name: file.name, src: canvas.toDataURL('image/webp', 0.85) };
  } finally {
    URL.revokeObjectURL(url);
  }
}

function WallpaperSettings({ draft, select, upload, feedback, loading, orientation }) {
  const fileInput = React.useRef(null);
  const [dragging, setDragging] = useState(false);
  return <div className="editor-grid wallpaper-grid">
    <section aria-label="Wallpaper preview">
      <Tablet wallpaper={draft} orientation={orientation} />
    </section>
    <section aria-label="Wallpaper settings">
      <h2>Choose Wallpaper</h2>
      <div className="wallpaper-options">{wallpaperPresets.map(([name, className]) =>
        <button type="button" key={name} aria-pressed={draft.wallpaper === name} onClick={() => select(name)}>
          <span className={`swatch ${className}`} />{name}
        </button>
      )}</div>
      <input ref={fileInput} type="file" accept="image/*" hidden onChange={event => {
        upload(event.target.files[0]);
        event.target.value = '';
      }} />
      <div className={`wallpaper-drop ${dragging ? 'dragging' : ''}`}
        onDragOver={event => {
          if (!event.dataTransfer.types.includes('Files')) return;
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
          setDragging(true);
        }}
        onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false); }}
        onDrop={event => { event.preventDefault(); setDragging(false); upload(event.dataTransfer.files[0]); }}>
        <Icon name="upload" size={24} />
        <span>Drag and drop an image here</span>
        <button type="button" onClick={() => fileInput.current?.click()}>Browse files</button>
      </div>
      {loading && <p className="wallpaper-feedback" role="status">Preparing image…</p>}
      {feedback && <p className="wallpaper-feedback wallpaper-error" role="alert">{feedback}</p>}
      {draft.wallpaper === 'Custom' && <p className="wallpaper-feedback">Selected image: {draft.wallpaperImage?.name}</p>}
    </section>
  </div>;
}

const slotMotion = { duration: 240, easing: 'cubic-bezier(.22, .75, .3, 1)' };

function widgetOrderForMove(slots, count, from, to) {
  const order = Array.from({ length: count }, (_, index) => index);
  if (slots[to] == null) {
    [order[from], order[to]] = [order[to], order[from]];
  } else {
    order.splice(from, 1);
    order.splice(to, 0, from);
  }
  return order;
}

function slotFrame(left, top, width, height, opacity = 1) {
  return { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px`, opacity };
}

// Match visible regions independently of the saved slot indices.
const wideTopSplitSources = [0, null, 1, 2];
const layoutMerges = {
  '3:2': { sources: [0, 2, 3], exit: 1, edge: 'right' },
  '2:1': { sources: [0, 2], exit: 1, edge: 'bottom' },
};

function animateWidgetLayout(grid, { slots: previous, from, to }) {
  const bounds = grid.getBoundingClientRect();
  const slots = [...grid.children].filter(slot => !slot.classList.contains('slot-exit'));
  const nextBounds = slots.map(slot => slot.getBoundingClientRect());
  const merge = layoutMerges[`${from}:${to}`];
  const splitsWideTop = from === 2 && to === 3;
  const splitsTopRow = splitsWideTop || (from === 0 && to === 1);
  const sources = splitsWideTop ? wideTopSplitSources : merge?.sources;
  const staged = merge?.edge === 'bottom';
  const handoff = .42;
  const motion = staged ? { duration: 280, easing: 'linear' } : slotMotion;
  const phase = (frame, offset) => ({ ...frame, offset, easing: slotMotion.easing });

  const animations = slots.flatMap((slot, index) => {
    const next = nextBounds[index];
    const source = previous[sources ? sources[index] : index];
    const before = source?.bounds;
    const finish = slotFrame(0, 0, next.width, next.height);
    // Animate the box directly so icons and labels stay at their rendered size.
    let start = before
      ? slotFrame(before.left - next.left, before.top - next.top, before.width, before.height)
      : slotFrame(next.width * .08, next.height * .08, next.width * .84, next.height * .84, 0);
    let frames = [start, finish];
    if (splitsTopRow && index === 1) {
      start = slotFrame(next.width, 0, 0, next.height, .35);
      frames = [{ ...start, overflow: 'hidden' }, { ...finish, overflow: 'hidden' }];
    } else if (staged) {
      // Clear the upper-right region before the lower-right tile rises into it.
      const middle = index === 0 ? { ...start, width: finish.width } : start;
      frames = [phase(start, 0), phase(middle, handoff), phase(finish, 1)];
    }

    const tile = slot.animate(frames, motion);
    if (!sources || !source || source.label === slot.firstElementChild.textContent) return [tile];
    const label = slot.firstElementChild.animate(
      [{ opacity: 0, offset: 0 }, { opacity: 0, offset: .35 }, { opacity: 1, offset: 1 }],
      motion,
    );
    return [tile, label];
  });

  const exiting = merge ? [previous[merge.exit]] : previous.slice(slots.length);
  for (const { bounds: before, snapshot } of exiting) {
    const left = before.left - bounds.left;
    const top = before.top - bounds.top;
    snapshot.classList.add('slot-exit');
    if (merge) snapshot.style.overflow = 'hidden';
    snapshot.inert = true;
    snapshot.setAttribute('aria-hidden', 'true');
    grid.append(snapshot);
    const start = slotFrame(left, top, before.width, before.height);
    let frames = [
      start,
      slotFrame(left + before.width * .08, top + before.height * .08, before.width * .84, before.height * .84, 0),
    ];
    if (staged) {
      frames = [phase(start, 0), phase(start, handoff), phase(slotFrame(left, top + before.height, before.width, 0, 0), 1)];
    } else if (merge) {
      frames = [start, slotFrame(left + before.width, top, 0, before.height, 0)];
    }
    const animation = snapshot.animate(frames, merge ? motion : { ...slotMotion, duration: 160 });
    animation.finished.then(() => snapshot.remove(), () => snapshot.remove());
    animations.push(animation);
  }
  return animations;
}

function ThemeTabs({ activeTab, onChange }) {
  const tabList = React.useRef(null);

  useLayoutEffect(() => {
    const list = tabList.current;
    const selected = list.querySelector('[aria-selected="true"]');

    function positionUnderline() {
      list.style.setProperty('--tab-underline-x', `${selected.offsetLeft}px`);
      list.style.setProperty('--tab-underline-y', `${selected.offsetTop + selected.offsetHeight}px`);
      list.style.setProperty('--tab-underline-width', `${selected.offsetWidth}px`);
    }

    positionUnderline();
    const observer = new ResizeObserver(positionUnderline);
    observer.observe(list);
    for (const button of list.children) observer.observe(button);
    return () => observer.disconnect();
  }, [activeTab]);

  return <div ref={tabList} className="tabs" role="tablist" aria-label="Theme sections">
    {tabs.map(label => <button type="button" role="tab" aria-selected={activeTab === label} key={label} onClick={() => onChange(label)}>{label}</button>)}
  </div>;
}

function hasThemeChanges(draft, saved) {
  if (draft.name.trim() !== saved.name.trim() ||
    draft.description.trim() !== saved.description.trim() ||
    draft.type !== saved.type ||
    draft.wallpaper !== saved.wallpaper ||
    (draft.wallpaperImage ?? null) !== (saved.wallpaperImage ?? null)) return true;

  const screenNames = new Set([...Object.keys(draft.screens), ...Object.keys(saved.screens)]);
  for (const name of screenNames) {
    const current = draft.screens[name];
    const original = saved.screens[name];
    if ((current?.layout ?? 0) !== (original?.layout ?? 0)) return true;
    const currentSlots = current?.slots ?? [];
    const originalSlots = original?.slots ?? [];
    const slotCount = Math.max(currentSlots.length, originalSlots.length);
    for (let index = 0; index < slotCount; index++) {
      if ((currentSlots[index] ?? null) !== (originalSlots[index] ?? null)) return true;
    }
  }
  return false;
}

function Editor({ theme, save }) {
  const [tab, setTab] = useState(theme ? 'Theme Details' : 'Driving Screen');
  const [orientation, setOrientation] = useState('Landscape');
  const [draft, setDraft] = useState(() => ({ ...blank(), ...theme }));
  const [target, setTarget] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [draggedSlot, setDraggedSlot] = useState(null);
  const [reorderPreview, setReorderPreview] = useState(null);
  const [error, setError] = useState(false);
  const library = React.useRef(null);
  const widgetGrid = React.useRef(null);
  const previousLayout = React.useRef(null);
  const layoutAnimations = React.useRef([]);
  const uploadVersion = React.useRef(0);
  const [wallpaperLoading, setWallpaperLoading] = useState(false);
  const [wallpaperFeedback, setWallpaperFeedback] = useState('');
  const canSubmit = !wallpaperLoading && (!theme || hasThemeChanges(draft, { ...blank(), ...theme }));
  const screen = draft.screens[tab] || { layout: 0, slots: [] };
  const slotCount = layoutSlotCounts[screen.layout];
  const isReordering = tab === 'Driving Screen' && draggedSlot !== null;
  const patch = (key, value) => setDraft(current => ({ ...current, [key]: value }));
  const updateScreen = (value) => patch('screens', { ...draft.screens, [tab]: { ...screen, ...value } });
  useLayoutEffect(() => {
    const previous = previousLayout.current;
    previousLayout.current = null;
    if (previous && widgetGrid.current) {
      layoutAnimations.current = animateWidgetLayout(widgetGrid.current, previous);
    }
    return () => layoutAnimations.current.forEach(animation => animation.cancel());
  }, [tab, screen.layout]);

  function changeLayout(layout) {
    if (layout === screen.layout) return;
    if (widgetGrid.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const from = screen.layout;
      const merge = layoutMerges[`${from}:${layout}`];
      const slots = [...widgetGrid.current.children]
        .filter(slot => !slot.classList.contains('slot-exit'))
        .map((slot, index) => {
          const exits = merge ? index === merge.exit : index >= layoutSlotCounts[layout];
          return {
            bounds: slot.getBoundingClientRect(),
            label: slot.firstElementChild.textContent,
            snapshot: exits ? slot.cloneNode(true) : null,
          };
        });
      previousLayout.current = { slots, from, to: layout };
    }
    updateScreen({ layout });
    setTarget(null);
  }

  function assign(widget, slot) {
    const index = slot ?? target ?? Array.from({ length: slotCount }).findIndex((_, i) => screen.slots[i] == null);
    const slots = [...screen.slots];
    slots[index < 0 ? 0 : index] = widget;
    updateScreen({ slots });
    setTarget(null);
  }
  function selectWallpaper(name) {
    uploadVersion.current += 1;
    setWallpaperLoading(false);
    setWallpaperFeedback('');
    setDraft(current => ({ ...current, wallpaper: name, wallpaperImage: null }));
  }

  async function uploadWallpaper(file) {
    if (!file) return;
    const version = ++uploadVersion.current;
    setWallpaperLoading(true);
    setWallpaperFeedback('');
    try {
      const wallpaperImage = await prepareWallpaper(file);
      if (version === uploadVersion.current) {
        setDraft(current => ({ ...current, wallpaper: 'Custom', wallpaperImage }));
      }
    } catch {
      if (version === uploadVersion.current) setWallpaperFeedback('Could not open this image. Try a PNG, JPEG, or WebP file.');
    } finally {
      if (version === uploadVersion.current) setWallpaperLoading(false);
    }
  }

  function submit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    if (!draft.name.trim()) { setTab('Theme Details'); setError(true); return; }
    save({ ...draft, name: draft.name.trim(), description: draft.description.trim() });
  }
  function cancel() {
    uploadVersion.current += 1;
    go('themes');
  }

  function isRemovalDrop(event) {
    return draggedSlot !== null &&
      event.dataTransfer.types.includes(placedWidgetDragType) &&
      !event.target.closest('.tablet');
  }

  function isReorderDrag(event) {
    return isReordering && event.dataTransfer.types.includes(placedWidgetDragType);
  }

  function previewWidgetMove(index) {
    if (index === (reorderPreview?.index ?? draggedSlot)) return;
    if (index === draggedSlot) {
      setReorderPreview(null);
      return;
    }

    const slots = [...widgetGrid.current.querySelectorAll(':scope > .slot:not(.slot-exit)')];
    const order = widgetOrderForMove(screen.slots, slotCount, draggedSlot, index);
    const styles = [];
    order.forEach((from, to) => {
      if (from === to || from === draggedSlot) return;
      const source = slots[from].getBoundingClientRect();
      const destination = slots[to].getBoundingClientRect();
      styles[from] = {
        translate: `${destination.left - source.left}px ${destination.top - source.top}px`,
        '--reorder-width': `${destination.width - source.width}px`,
        '--reorder-height': `${destination.height - source.height}px`,
      };
    });
    setReorderPreview({ index, styles });
  }

  function highlightDropSlot(event, index) {
    if (isReorderDrag(event)) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      previewWidgetMove(index);
      return;
    }
    if (!event.dataTransfer.types.includes(widgetDragType)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    if (dropTarget?.index === index) return;

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, (event.clientX - left) / width * 100));
    const y = Math.max(0, Math.min(100, (event.clientY - top) / height * 100));
    setDropTarget(current => current?.index === index ? current : { index, x: `${x}%`, y: `${y}%` });
  }

  function finishWidgetDrag() {
    setDropTarget(null);
    setDraggedSlot(null);
    setReorderPreview(null);
  }

  function dropOnSlot(event, index) {
    if (isReorderDrag(event)) {
      event.preventDefault();
      if (index !== draggedSlot && event.dataTransfer.getData(placedWidgetDragType) === String(draggedSlot)) {
        const order = widgetOrderForMove(screen.slots, slotCount, draggedSlot, index);
        const visibleSlots = order.map(position => screen.slots[position] ?? null);
        updateScreen({ slots: [...visibleSlots, ...screen.slots.slice(slotCount)] });
        setTarget(null);
      }
      finishWidgetDrag();
      return;
    }
    setDropTarget(null);
    if (!event.dataTransfer.types.includes(widgetDragType)) return;
    event.preventDefault();
    const value = event.dataTransfer.getData(widgetDragType);
    if (/^\d+$/.test(value) && widgets[Number(value)]) assign(Number(value), index);
  }

  return <form className="editor" onSubmit={submit}
    onDragOver={event => {
      if (isReorderDrag(event) && !widgetGrid.current?.contains(event.target) && reorderPreview) {
        setReorderPreview(null);
      }
      if (!isRemovalDrop(event)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }}
    onDrop={event => {
      if (!isRemovalDrop(event)) return;
      event.preventDefault();
      assign(null, draggedSlot);
      finishWidgetDrag();
    }}
    onDragEnd={finishWidgetDrag}>
    {draggedSlot !== null && <div className="widget-removal-hint" role="status">
      {isReordering && 'Drop in another slot to move the widget. '}
      Drop outside the tablet to remove it.
    </div>}
    <div className="editor-bar">
      <div className="editor-toolbar">
        <ThemeTabs activeTab={tab} onChange={label => { setTab(label); setTarget(null); }} />
        <div className="editor-actions">
          <button type="button" className="editor-cancel" onClick={cancel}>Cancel</button>
          <button type="submit" className="primary" disabled={!canSubmit}>{theme ? 'Save' : 'Create'}</button>
        </div>
      </div>
    </div>
    <section className="editor-panel" role="tabpanel" aria-label={tab}>
      {tab === 'Theme Details' && <div className="fields">
        <div className="text-field">
          <label htmlFor="theme-name">Theme Name</label>
          <input id="theme-name" value={draft.name} aria-invalid={error} aria-describedby={error ? 'theme-name-error theme-name-count' : 'theme-name-count'} onChange={event => { patch('name', event.target.value); setError(false); }} />
          <div className="field-support">
            {error && <span id="theme-name-error" role="alert">Enter a theme name.</span>}
            <span className="character-count" id="theme-name-count">{draft.name.length} characters</span>
          </div>
        </div>
        <div className="text-field">
          <label htmlFor="theme-description">Description</label>
          <textarea id="theme-description" rows="4" value={draft.description} aria-describedby="theme-description-count" onChange={event => patch('description', event.target.value)} />
          <span className="character-count" id="theme-description-count">{draft.description.length} characters</span>
        </div>
        <label className="default-theme">
          <input type="checkbox" role="switch" checked={draft.type === 'Default'} disabled={theme?.type === 'Default'} aria-describedby={theme?.type === 'Default' ? 'current-default-note' : undefined} onChange={event => patch('type', event.target.checked ? 'Default' : 'Custom')} />
          Default Theme
        </label>
        {theme?.type === 'Default' && <p id="current-default-note" className="field-note">Set another theme as default to replace this one.</p>}
      </div>}
      {tab !== 'Theme Details' && <>
        {tab === 'Wallpaper'
          ? <h2 className="preview-heading">Wallpaper preview</h2>
          : <WidgetPreviewHeading key={tab} tab={tab} />}
        <div className="preview-controls">
          {tab !== 'Wallpaper' && <div className="layout-options" role="group" aria-label="Widget layouts">
            {layouts.map((label, index) => <button type="button" key={label} aria-label={label} title={label} aria-pressed={index === screen.layout} onClick={() => changeLayout(index)}><Icon name={layoutIcons[index]} /></button>)}
          </div>}
          <OrientationOptions orientation={orientation} change={setOrientation} />
        </div>
      </>}
      {tab === 'Wallpaper' && <WallpaperSettings draft={draft} select={selectWallpaper} upload={uploadWallpaper} feedback={wallpaperFeedback} loading={wallpaperLoading} orientation={orientation} />}
      {tab.endsWith('Screen') &&
        <div className="editor-grid">
          <Tablet orientation={orientation} driving={tab === 'Driving Screen'} wallpaper={draft}>
            {tab === 'Driving Screen' && <div className="driving-nav"><div><Icon name="home" />Home</div><div><Icon name="hours" />HOS</div><div><Icon name="navigation" className="driving-nav-arrow" /><abbr title="Navigation">NAV</abbr></div></div>}
            <div className={`slots layout-${screen.layout}${isReordering ? ' reordering' : ''}`} ref={widgetGrid}
              onDragLeave={event => {
                if (!isReordering || event.currentTarget.contains(event.relatedTarget)) return;
                const { left, top, right, bottom } = event.currentTarget.getBoundingClientRect();
                if (event.clientX < left || event.clientX >= right || event.clientY < top || event.clientY >= bottom) {
                  setReorderPreview(null);
                }
              }}>{Array.from({ length: slotCount }, (_, i) => {
              const widget = widgets[screen.slots[i]];
              const canDrop = dropTarget?.index === i;
              const isReorderDestination = isReordering && i === (reorderPreview?.index ?? draggedSlot);
              return <div className={`slot${i === target ? ' target' : ''}${canDrop ? ' drop-target' : ''}${isReorderDestination ? ' reorder-target' : ''}`} key={i}
                style={canDrop ? { '--drop-x': dropTarget.x, '--drop-y': dropTarget.y } : undefined}
                onDragEnter={event => highlightDropSlot(event, i)}
                onDragOver={event => highlightDropSlot(event, i)}
                onDragLeave={event => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setDropTarget(current => current?.index === i ? null : current);
                  }
                }}
                onDrop={event => dropOnSlot(event, i)}>
                <div className={`slot-widget${draggedSlot === i ? ' dragging-widget' : ''}${reorderPreview?.styles[i] ? ' shifting-widget' : ''}`} style={reorderPreview?.styles[i]}>
                  <button type="button" draggable={widget != null}
                    onDragStart={event => {
                      if (widget == null) return;
                      event.dataTransfer.effectAllowed = 'move';
                      event.dataTransfer.setData(placedWidgetDragType, String(i));
                      setWidgetDragImage(event);
                      layoutAnimations.current.forEach(animation => animation.cancel());
                      setDraggedSlot(i);
                    }}
                    onClick={() => { setTarget(i); library.current?.querySelector('input')?.focus(); }}>
                    {widget ? <WidgetIcon widget={widget} /> : <Icon name="add" />}
                    {canDrop ? 'Drop Widget' : widget?.name ?? 'Add Widget'}
                  </button>
                  {widget != null && <button className="remove" type="button" aria-label={`Remove ${widget.name}`} onClick={() => assign(null, i)}><Icon name="close" size={16} /></button>}
                </div>
              </div>;
            })}</div>
          </Tablet>
          <WidgetLibrary key={tab} choose={assign} selected={screen.slots[target ?? 0]} placed={screen.slots.slice(0, slotCount)} searchRef={library} />
        </div>}
    </section>
  </form>;
}

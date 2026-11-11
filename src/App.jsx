import React, { useEffect, useState } from 'react';

const navigation = [['Welcome', 'home'], ['Themes', 'themes'], ['Widgets', 'widgets'], ['Devices', 'devices'], ['Groups', 'groups']];
const tabs = ['Theme Details', 'Wallpaper', 'Home Screen', 'Driving Screen'];
function Icon({ name, size = 20, className }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
    <use href={`/material-icons.svg#${name}`} />
  </svg>;
}

const layoutIcons = ['single', 'columns', 'wideTop', 'four', 'six'];
const widgetIcons = ['', 'speed', 'folder', 'globe'];
const layouts = ['Single', 'Two columns', 'Wide top', 'Four tiles', 'Six tiles'];
const widgetNames = ['DND_AutoWidget_Widget234', 'HOS MPG', 'MyMedia - driving mode', 'OER Button Driving Screen', ...Array(8).fill('POST Test Widget')];
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
  id, name, description, status, type: id === 2 ? 'Default' : 'Custom',
}));

const legacyNames = ['Copy of Theme test', 'DEFAULT_CREATE_THEME', 'DEFAULT_THEME_FROM_CREATE', 'Delete-theme', 'Edited Theme', 'HIhiii', 'my-test-widget', 'sample Theme', 'tam', 'test', 'Test Dashboard', 'Test Default', 'Test Fleet', 'Test Home', 'Test Layout', 'Test Navigation', 'Test Operations', 'Test Theme 2', 'Training Theme', 'Weekend Theme'];
const legacyDescriptions = ['Desc', 'Not available', 'theme', 'Description', 'Hi - This theme is editedd', 'Not available', 'Not available', 'sample', 'testttt', 'teststststst'];

function loadThemes() {
  try {
    const stored = JSON.parse(localStorage.getItem('mobile-app-manager-themes'));
    if (!Array.isArray(stored)) return seed;
    return stored.map(theme => {
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
  } catch {
    return seed;
  }
}

const blank = () => ({ name: '', description: '', type: 'Custom', status: 'Not published', wallpaper: 'Midnight', screens: {} });
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
    if (notice?.tone !== 'success' || noticeHovered || noticeFocused) return;
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
    const saved = updateThemes(items => theme ? items.map(item => item.id === theme.id ? draft : item) : [...items, { ...draft, id: crypto.randomUUID() }]);
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
      <nav className={expanded ? 'rail expanded' : 'rail'} aria-label="Main navigation">
        {navigation.map(([label, key]) => <a href={`#${key}`} key={key} title={label} aria-label={label} aria-current={key === page ? 'page' : undefined}><Icon name={key} />{expanded && <span>{label}</span>}</a>)}
      </nav>
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
      <div role="status" aria-atomic="true" className="sr-only">{notice?.tone === 'success' ? notice.message : ''}</div>
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
  return <label className="search"><Icon name="search" /><input type="search" value={value} onChange={event => change(event.target.value)} placeholder={label} aria-label={label} /></label>;
}

function ThemeList({ themes, update, notify }) {
  const [query, setQuery] = useState('');
  const [ascending, setAscending] = useState(true);
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState(10);
  const [selected, setSelected] = useState([]);
  const [menu, setMenu] = useState(null);
  const results = themes.filter(theme => [theme.name, theme.description, theme.status].some(value => value.toLowerCase().includes(query.trim().toLowerCase())))
    .sort((a, b) => a.name.localeCompare(b.name) * (ascending ? 1 : -1));
  const start = Math.min(index, Math.max(0, Math.ceil(results.length / size) - 1)) * size;
  const visible = results.slice(start, start + size);
  const rangeWidth = String(results.length).length * 3 + 5;
  const allSelected = visible.length > 0 && visible.every(theme => selected.includes(theme.id));

  function action(item, operation) {
    setMenu(null);
    if (operation === 'edit') go(`edit/${item.id}`);
    if (operation === 'duplicate') {
      if (update(items => [...items, { ...item, id: crypto.randomUUID(), name: `Copy of ${item.name}`, status: 'Not published' }])) notify('Theme duplicated');
    }
    if (operation === 'delete' && window.confirm(`Delete “${item.name}”?`)) {
      if (!update(items => items.filter(theme => theme.id !== item.id))) return;
      setSelected(ids => ids.filter(id => id !== item.id));
      notify('Theme deleted');
    }
  }

  return <section className="themes" aria-label="Themes">
    <Search value={query} change={value => { setQuery(value); setIndex(0); setMenu(null); }} label="Search Theme Name, Description, Status" />
    <div className="table-card">
      <div className="table-title"><div><h2>Themes</h2><span>({results.length} Total){selected.length > 0 && ` · ${selected.length} selected`}</span></div><button className="icon add" title="Create theme" aria-label="Create theme" onClick={() => go('create')}><Icon name="add" /></button></div>
      <div className="table-scroll" style={{ '--theme-row-count': Math.min(size, results.length) }}><table><colgroup>{[5, 29, 24, 19, 18, 5].map((width, i) => <col key={i} style={{ width: width + '%' }} />)}</colgroup>
        <thead><tr><th><input type="checkbox" aria-label="Select all themes on this page" checked={allSelected} onChange={() => setSelected(ids => allSelected ? ids.filter(id => !visible.some(theme => theme.id === id)) : [...new Set([...ids, ...visible.map(theme => theme.id)])])} /></th><th aria-sort={ascending ? 'ascending' : 'descending'}><button onClick={() => { setAscending(!ascending); setIndex(0); setMenu(null); }}>Theme Name <Icon name={ascending ? 'ascending' : 'descending'} size={16} className="muted" /></button></th><th>Description</th><th>Theme Type</th><th>Status</th><th aria-label="Actions" /></tr></thead>
        <tbody>{visible.map(item => <tr key={item.id} className={selected.includes(item.id) ? 'theme-row selected' : 'theme-row'} onClick={event => {
          if (!event.target.closest('a, button, input, .row-actions') && !window.getSelection()?.toString()) go(`edit/${item.id}`);
        }}>
          <td><input type="checkbox" aria-label={`Select ${item.name}`} checked={selected.includes(item.id)} onChange={() => setSelected(ids => ids.includes(item.id) ? ids.filter(id => id !== item.id) : [...ids, item.id])} /></td>
          <td><a href={`#edit/${item.id}`}>{item.name}</a></td><td>{item.description || 'Not available'}</td><td>{item.type}</td><td>{item.status}</td>
          <td className="row-actions"><button className="icon muted" aria-label={`Actions for ${item.name}`} aria-expanded={menu === item.id} onClick={() => setMenu(menu === item.id ? null : item.id)}><Icon name="more" /></button>
            {menu === item.id && <div className="action-menu">{['Edit', 'Duplicate', 'Delete'].map(label => <button key={label} onClick={() => action(item, label.toLowerCase())}>{label}</button>)}</div>}</td>
        </tr>)}
        {!visible.length && <tr><td colSpan="6" className="empty">No matching themes</td></tr>}</tbody>
      </table></div>
      <div className="pagination"><label>Themes per page <select value={size} onChange={event => { setSize(Number(event.target.value)); setIndex(0); setMenu(null); }}><option>5</option><option>10</option><option>20</option></select></label><span className="page-range" style={{ '--page-range-width': `${rangeWidth}ch` }} aria-live="polite">
        {results.length ? start + 1 : 0}-{start + visible.length} of {results.length}
      </span><button className="icon" aria-label="Previous page" disabled={!start} onClick={() => { setIndex(start / size - 1); setMenu(null); }}><Icon name="previous" /></button><button className="icon" aria-label="Next page" disabled={start + size >= results.length} onClick={() => { setIndex(start / size + 1); setMenu(null); }}><Icon name="next" /></button></div>
    </div>
  </section>;
}

function WidgetLibrary({ choose, selected, searchRef }) {
  const [query, setQuery] = useState('');
  const matching = widgetNames.map((name, id) => ({ name, id })).filter(widget => widget.name.toLowerCase().includes(query.trim().toLowerCase()));
  return <aside className="library" aria-label="Widget library" ref={searchRef}><Search value={query} change={setQuery} label="Search Widget" />
    <div className="widget-list">{matching.map(({ name, id }) => <button type="button" key={id} disabled={!choose} className="widget-option" aria-pressed={choose ? selected === id : undefined} draggable={Boolean(choose)} onDragStart={event => event.dataTransfer.setData('text/plain', String(id))} onClick={() => choose?.(id)}><span className={`widget-icon widget-${id}`}>{widgetIcons[id] && <Icon name={widgetIcons[id]} size={26} />}</span>{name}</button>)}{!matching.length && <p className="empty">No matching widgets</p>}</div>
  </aside>;
}

const wallpaperPresets = [['Midnight', 'midnight'], ['Slate', 'slate'], ['Night lights', 'night-lights']];

function Tablet({ driving = false, wallpaper, children }) {
  const preset = wallpaperPresets.find(([name]) => name === wallpaper?.wallpaper)?.[1] ?? '';
  const custom = wallpaper?.wallpaper === 'Custom' ? wallpaper.wallpaperImage : null;
  return <div className={`tablet ${driving ? 'tablet-driving' : 'tablet-landscape'}`}>
    <div className={`tablet-display ${preset}`} style={custom ? { backgroundImage: `url("${custom.src}")` } : undefined}>
      {children}
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

function WallpaperSettings({ draft, select, upload, feedback, loading }) {
  const fileInput = React.useRef(null);
  const [dragging, setDragging] = useState(false);
  return <div className="editor-grid wallpaper-grid">
    <section aria-label="Wallpaper preview">
      <h2>Wallpaper Preview</h2>
      <Tablet wallpaper={draft} />
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

function Editor({ theme, save }) {
  const [tab, setTab] = useState(theme ? 'Theme Details' : 'Driving Screen');
  const [draft, setDraft] = useState(() => ({ ...blank(), ...theme }));
  const [target, setTarget] = useState(null);
  const [error, setError] = useState(false);
  const library = React.useRef(null);
  const uploadVersion = React.useRef(0);
  const [wallpaperLoading, setWallpaperLoading] = useState(false);
  const [wallpaperFeedback, setWallpaperFeedback] = useState('');
  const screen = draft.screens[tab] || { layout: 0, slots: [] };
  const slotCount = [1, 2, 3, 4, 6][screen.layout];
  const patch = (key, value) => setDraft(current => ({ ...current, [key]: value }));
  const updateScreen = (value) => patch('screens', { ...draft.screens, [tab]: { ...screen, ...value } });
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
    if (wallpaperLoading) return;
    if (!draft.name.trim()) { setTab('Theme Details'); setError(true); return; }
    save({ ...draft, name: draft.name.trim(), description: draft.description.trim() });
  }
  return <form className="editor" onSubmit={submit}>
    <div className="editor-bar"><div className="tabs" role="tablist" aria-label="Theme sections">{tabs.map(label => <button type="button" role="tab" aria-selected={tab === label} key={label} onClick={() => { setTab(label); setTarget(null); }}>{label}</button>)}</div><button className="primary" disabled={wallpaperLoading}>{theme ? 'Save' : 'Create'}</button></div>
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
          <input type="checkbox" role="switch" checked={draft.type === 'Default'} onChange={event => patch('type', event.target.checked ? 'Default' : 'Custom')} />
          Default Theme
        </label>
      </div>}
      {tab === 'Wallpaper' && <WallpaperSettings draft={draft} select={selectWallpaper} upload={uploadWallpaper} feedback={wallpaperFeedback} loading={wallpaperLoading} />}
      {tab.endsWith('Screen') && <>
        <h2>Widgets in the {tab.replace('Screen', 'screen')} <span className="info" title="Select a layout, then choose or drag widgets into the preview."><Icon name="info-outline" size={18} /></span></h2>
        <div className="layout-options" aria-label="Widget layouts">{layouts.map((label, index) => <button type="button" key={label} aria-label={label} title={label} aria-pressed={index === screen.layout} onClick={() => { updateScreen({ layout: index }); setTarget(null); }}><Icon name={layoutIcons[index]} /></button>)}</div>
        <div className="editor-grid">
          <Tablet driving={tab === 'Driving Screen'} wallpaper={tab === 'Home Screen' ? draft : undefined}>
            {tab === 'Driving Screen' && <div className="driving-nav"><div><Icon name="summary" />SUMMARY</div><div><Icon name="hours" />HOS</div><div><Icon name="navigation" />NAVIGATION</div></div>}
            <div className={`slots layout-${screen.layout}`}>{Array.from({ length: slotCount }, (_, i) => {
              const widget = screen.slots[i];
              return <div className={`slot ${i === target ? 'target' : ''}`} key={i} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); const value = event.dataTransfer.getData('text/plain'); if (/^\d+$/.test(value) && widgetNames[Number(value)]) assign(Number(value), i); }}>
                <button type="button" onClick={() => { setTarget(i); library.current?.querySelector('input')?.focus(); }}><Icon name={widget == null ? 'upload' : 'widgets'} />{widget == null ? 'Add Widget' : widgetNames[widget]}</button>
                {widget != null && <button className="remove" type="button" aria-label={`Remove ${widgetNames[widget]}`} onClick={() => assign(null, i)}><Icon name="close" size={16} /></button>}
              </div>;
            })}</div>
          </Tablet>
          <WidgetLibrary key={tab} choose={assign} selected={screen.slots[target ?? 0]} searchRef={library} />
        </div>
      </>}
    </section>
  </form>;
}

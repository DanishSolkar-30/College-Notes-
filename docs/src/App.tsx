import { useEffect, useMemo, useState } from "react";

type IconName =
  | "archive"
  | "arrow"
  | "book"
  | "chevron"
  | "close"
  | "document"
  | "download"
  | "file"
  | "filter"
  | "folder"
  | "grid"
  | "home"
  | "list"
  | "menu"
  | "moon"
  | "more"
  | "presentation"
  | "search"
  | "sheet"
  | "star"
  | "sun";

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    archive: (
      <>
        <path d="M4 7h16M5 7l1 13h12l1-13M3 3h18v4H3z" />
        <path d="M10 11h4" />
      </>
    ),
    arrow: <path d="m9 18 6-6-6-6" />,
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
        <path d="M8 7h8M8 11h6" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    document: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h6" />
      </>
    ),
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m7 10 5 5 5-5M12 15V3" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
      </>
    ),
    filter: <path d="M4 5h16M7 12h10M10 19h4" />,
    folder: (
      <path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    ),
    grid: (
      <>
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9M9 20v-7h6v7" />
      </>
    ),
    list: (
      <>
        <path d="M8 6h13M8 12h13M8 18h13" />
        <path d="M3 6h.01M3 12h.01M3 18h.01" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    presentation: (
      <>
        <path d="M3 4h18v12H3zM8 20l4-4 4 4M12 16v5" />
        <path d="m8 12 3-3 2 2 3-3" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    sheet: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h8M11 10v10" />
      </>
    ),
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}

type Resource = {
  name: string;
  meta: string;
  type: string;
  updated: string;
  path: string;
  downloadUrl?: string;
  children?: Resource[];
};

type GitHubTreeItem = {
  path: string;
  type: "blob" | "tree";
  size?: number;
};

const formatSize = (bytes = 0) => {
  if (!bytes) return "File";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileType = (name: string) => {
  const extension = name.split(".").pop()?.toLowerCase();
  if (extension === "pdf") return "pdf";
  if (["ppt", "pptx"].includes(extension || "")) return "ppt";
  if (["xls", "xlsx", "csv"].includes(extension || "")) return "sheet";
  if (["zip", "rar", "7z"].includes(extension || "")) return "archive";
  return "document";
};

const buildRepositoryTree = (items: GitHubTreeItem[]) => {
  const root: Resource[] = [];

  items.forEach((item) => {
    if (
      item.path === "index.html" ||
      item.path === "notes.json" ||
      item.path.startsWith(".")
    ) return;

    const parts = item.path.split("/");
    let level = root;

    parts.forEach((part, index) => {
      const path = parts.slice(0, index + 1).join("/");
      let node = level.find((entry) => entry.name === part);
      const isFile = index === parts.length - 1 && item.type === "blob";

      if (!node) {
        node = {
          name: part,
          meta: isFile ? formatSize(item.size) : "Folder",
          type: isFile ? getFileType(part) : "folder",
          updated: "",
          path,
          downloadUrl: isFile
            ? `https://raw.githubusercontent.com/DanishSolkar-30/College-Notes-/main/${item.path}`
            : undefined,
          children: isFile ? undefined : [],
        };
        level.push(node);
      }

      if (!isFile) level = node.children || [];
    });
  });

  const addFolderCounts = (nodes: Resource[]) => {
    nodes.forEach((node) => {
      if (node.children) {
        addFolderCounts(node.children);
        node.meta = `${node.children.length} ${node.children.length === 1 ? "item" : "items"}`;
      }
    });
  };
  addFolderCounts(root);
  return root;
};

const typeDetails: Record<
  string,
  { icon: IconName; label: string; accent: string }
> = {
  folder: { icon: "folder", label: "Folder", accent: "blue" },
  pdf: { icon: "document", label: "PDF", accent: "red" },
  ppt: { icon: "presentation", label: "Slides", accent: "orange" },
  sheet: { icon: "sheet", label: "Spreadsheet", accent: "green" },
  archive: { icon: "archive", label: "Archive", accent: "orange" },
  document: { icon: "file", label: "File", accent: "blue" },
};

export default function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selected, setSelected] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/repos/DanishSolkar-30/College-Notes-/git/trees/main?recursive=1")
      .then((response) => {
        if (!response.ok) throw new Error("Repository request failed");
        return response.json();
      })
      .then((data: { tree: GitHubTreeItem[] }) => {
        setResources(buildRepositoryTree(data.tree));
        setLoadError(false);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  const currentResources = useMemo(() => {
    let level = resources;
    currentPath.forEach((segment) => {
      level = level.find((item) => item.name === segment)?.children || [];
    });
    return level;
  }, [currentPath, resources]);

  const allFiles = useMemo(() => {
    const files: Resource[] = [];
    const collect = (nodes: Resource[]) =>
      nodes.forEach((node) => node.type === "folder" ? collect(node.children || []) : files.push(node));
    collect(resources);
    return files;
  }, [resources]);

  const visibleResources = useMemo(
    () =>
      (query ? allFiles : currentResources).filter(
        (resource) =>
          (filter === "all" || resource.type === filter) &&
          resource.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [allFiles, currentResources, filter, query],
  );

  const openFolder = (resource: Resource) => {
    if (resource.type === "folder") {
      setCurrentPath(resource.path.split("/"));
      setQuery("");
      setMenuOpen(false);
    } else {
      setSelected(resource);
    }
  };

  const sidebar = (
    <>
      <div>
        <div className="profile">
          <div className="avatar">DS</div>
          <div>
            <strong>Danish Solkar</strong>
            <span>Student repository</span>
          </div>
        </div>

        <p className="nav-label">Workspace</p>
        <nav className="side-nav" aria-label="Main navigation">
          <button className={`nav-item ${currentPath.length === 0 ? "active" : ""}`} onClick={() => { setCurrentPath([]); setQuery(""); setMenuOpen(false); }}>
            <Icon name="home" />
            Home
          </button>
          <button className="nav-item" onClick={() => setFilter("pdf")}>
            <Icon name="star" />
            Starred
          </button>
          <button className="nav-item">
            <Icon name="archive" />
            Archive
          </button>
        </nav>

        <p className="nav-label recent-label">Folders</p>
        <nav className="side-nav compact" aria-label="Quick access">
          {resources.filter((resource) => resource.type === "folder").map((resource, index) => (
            <button
              className={`nav-item ${currentPath[0] === resource.name ? "active" : ""}`}
              key={resource.path}
              onClick={() => openFolder(resource)}
            >
              <span className={`nav-dot ${["blue", "red", "black"][index % 3]}`} />
              <span className="truncate">{resource.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="storage-card">
        <div className="storage-head">
          <span>Repository storage</span>
          <strong>Live</strong>
        </div>
        <div className="storage-track">
          <span className="repository-progress" />
        </div>
        <p>Auto-synced via GitHub API</p>
      </div>
    </>
  );

  return (
    <div className={dark ? "app dark" : "app"}>
      <header className="topbar">
        <button className="mobile-menu icon-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Icon name="menu" />
        </button>
        <button className="brand" onClick={() => { setCurrentPath([]); setFilter("all"); }}>
          <span className="brand-mark">
            <Icon name="book" size={22} />
          </span>
          <span>Note<span>base</span></span>
        </button>

        <label className="global-search">
          <Icon name="search" size={19} />
          <input
            type="search"
            placeholder="Search notes, subjects or files..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>⌘ K</kbd>
        </label>

        <div className="top-actions">
          <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle color theme">
            <Icon name={dark ? "sun" : "moon"} />
          </button>
          <div className="header-avatar">DS</div>
        </div>
      </header>

      <div className="shell">
        <aside className="sidebar">{sidebar}</aside>

        {menuOpen && (
          <div className="drawer-layer" role="dialog" aria-modal="true">
            <button className="drawer-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
            <aside className="mobile-drawer">
              <div className="drawer-head">
                <div className="brand">
                  <span className="brand-mark"><Icon name="book" size={20} /></span>
                  <span>Note<span>base</span></span>
                </div>
                <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <Icon name="close" />
                </button>
              </div>
              {sidebar}
            </aside>
          </div>
        )}

        <main className="content">
          <div className="mobile-search">
            <label className="global-search">
              <Icon name="search" size={19} />
              <input
                type="search"
                placeholder="Search your notes..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>

          <div className="breadcrumb">
            <button onClick={() => setCurrentPath([])}>Home</button>
            {currentPath.map((segment, index) => (
              <span className="breadcrumb-part" key={currentPath.slice(0, index + 1).join("/")}>
                <Icon name="chevron" size={14} />
                <button onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}>{segment}</button>
              </span>
            ))}
          </div>

          {currentPath.length === 0 && !query && (
          <section className="hero">
            <div className="hero-copy">
              <span className="eyebrow"><span /> Knowledge, organized</span>
              <h1>Everything you need to <em>study smarter.</em></h1>
              <p>Your subjects, notes and resources—all organized in one focused workspace.</p>
              <div className="hero-stats">
                <div><strong>{allFiles.length}</strong><span>Total notes</span></div>
                <div><strong>{resources.filter((item) => item.type === "folder").length}</strong><span>Folders</span></div>
                <div><strong>Live</strong><span>Sync status</span></div>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="visual-ring ring-one" />
              <div className="visual-ring ring-two" />
              <div className="floating-file file-one"><Icon name="document" /><span>PDF</span></div>
              <div className="floating-file file-two"><Icon name="presentation" /><span>PPT</span></div>
              <div className="book-stack">
                <span />
                <span />
                <span />
              </div>
            </div>
          </section>
          )}

          <section className="library">
            <div className="section-head">
              <div>
                <p className="section-kicker">Your library</p>
                <h2>{query ? "Search results" : currentPath.at(-1) || "Repository contents"}</h2>
              </div>

              <div className="controls">
                <label className="select-wrap">
                  <Icon name="filter" size={17} />
                  <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                    <option value="all">All resources</option>
                    <option value="folder">Folders</option>
                    <option value="pdf">PDF files</option>
                    <option value="ppt">Presentations</option>
                    <option value="sheet">Spreadsheets</option>
                  </select>
                </label>
                <div className="view-toggle">
                  <button className={view === "grid" ? "selected" : ""} onClick={() => setView("grid")} aria-label="Grid view">
                    <Icon name="grid" size={17} />
                  </button>
                  <button className={view === "list" ? "selected" : ""} onClick={() => setView("list")} aria-label="List view">
                    <Icon name="list" size={18} />
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="empty-state">
                <span><Icon name="book" size={26} /></span>
                <h3>Loading repository</h3>
                <p>Syncing your folders and files from GitHub.</p>
              </div>
            ) : loadError ? (
              <div className="empty-state error">
                <span><Icon name="archive" size={26} /></span>
                <h3>Could not load repository</h3>
                <p>Please verify the repository configuration and try again.</p>
              </div>
            ) : visibleResources.length ? (
              <div className={`resource-grid ${view}`}>
                {visibleResources.map((resource) => {
                  const details = typeDetails[resource.type];
                  return (
                    <article className="resource-card" key={resource.name}>
                      <button className="card-main" onClick={() => openFolder(resource)}>
                        <span className={`file-icon ${details.accent}`}>
                          <Icon name={details.icon} size={24} />
                        </span>
                        <span className="file-copy">
                          <strong>{resource.name}</strong>
                          <span>{resource.meta}</span>
                        </span>
                      </button>
                      <div className="card-foot">
                        <span className="type-badge">{details.label}</span>
                        <span className="updated">{resource.updated}</span>
                        <button className="more-button" aria-label={`More options for ${resource.name}`}>
                          <Icon name="more" size={19} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <span><Icon name="search" size={26} /></span>
                <h3>No resources found</h3>
                <p>Try another search term or filter.</p>
                <button onClick={() => { setQuery(""); setFilter("all"); }}>Clear filters</button>
              </div>
            )}
          </section>
        </main>
      </div>

      {selected && (
        <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="preview-title">
          <button className="modal-backdrop" onClick={() => setSelected(null)} aria-label="Close preview" />
          <div className="preview-modal">
            <div className="preview-head">
              <div>
                <span className="section-kicker">Document preview</span>
                <h2 id="preview-title">{selected.name}</h2>
              </div>
              <button className="icon-button" onClick={() => setSelected(null)} aria-label="Close preview">
                <Icon name="close" />
              </button>
            </div>
            <div className="preview-page">
              <Icon name={typeDetails[selected.type].icon} size={44} />
              <strong>{selected.name}</strong>
              <span>{selected.meta}</span>
              <p>Preview is ready. Download the original resource to read the complete document.</p>
            </div>
            <div className="preview-actions">
              <button className="secondary-button" onClick={() => setSelected(null)}>Cancel</button>
              <a className="primary-button" href={selected.downloadUrl} download target="_blank" rel="noreferrer"><Icon name="download" size={18} /> Download file</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

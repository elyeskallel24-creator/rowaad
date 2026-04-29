// LocalStorage-backed admin store. Browser-only.
export type ContactRequest = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  description: string;
  date: string;
  time: string;
  submittedAt: string;
  status: "new" | "reviewed";
};

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  coverImage: string; // data URL
  tags: string[];
  status: "published" | "draft";
  date: string;
  order: number;
};

export type Partner = {
  id: string;
  name: string;
  logo: string; // data URL
  website?: string;
  visible: boolean;
  order: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string; // data URL
  status: "published" | "draft";
  order: number;
};

const KEYS = {
  contacts: "rowaad:contacts",
  projects: "rowaad:projects",
  partners: "rowaad:partners",
  team: "rowaad_team_members",
} as const;

const isBrowser = typeof window !== "undefined";

function read<T>(key: string): T[] {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]) {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("rowaad:store", { detail: { key } }));
}

export const store = {
  // Contacts
  getContacts: () => read<ContactRequest>(KEYS.contacts),
  addContact: (c: Omit<ContactRequest, "id" | "submittedAt" | "status">) => {
    const list = read<ContactRequest>(KEYS.contacts);
    const item: ContactRequest = {
      ...c,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      status: "new",
    };
    list.unshift(item);
    write(KEYS.contacts, list);
    return item;
  },
  updateContact: (id: string, patch: Partial<ContactRequest>) => {
    const list = read<ContactRequest>(KEYS.contacts).map((c) =>
      c.id === id ? { ...c, ...patch } : c,
    );
    write(KEYS.contacts, list);
  },
  deleteContact: (id: string) => {
    write(KEYS.contacts, read<ContactRequest>(KEYS.contacts).filter((c) => c.id !== id));
  },

  // Projects
  getProjects: () => read<Project>(KEYS.projects).sort((a, b) => a.order - b.order),
  saveProject: (p: Project) => {
    const list = read<Project>(KEYS.projects);
    const idx = list.findIndex((x) => x.id === p.id);
    if (idx >= 0) list[idx] = p;
    else list.push(p);
    write(KEYS.projects, list);
  },
  deleteProject: (id: string) => {
    write(KEYS.projects, read<Project>(KEYS.projects).filter((p) => p.id !== id));
  },

  // Partners
  getPartners: () => read<Partner>(KEYS.partners).sort((a, b) => a.order - b.order),
  savePartner: (p: Partner) => {
    const list = read<Partner>(KEYS.partners);
    const idx = list.findIndex((x) => x.id === p.id);
    if (idx >= 0) list[idx] = p;
    else list.push(p);
    write(KEYS.partners, list);
  },
  deletePartner: (id: string) => {
    write(KEYS.partners, read<Partner>(KEYS.partners).filter((p) => p.id !== id));
  },
};

export function useStoreSubscription(cb: () => void) {
  if (!isBrowser) return;
  const handler = () => cb();
  window.addEventListener("rowaad:store", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("rowaad:store", handler);
    window.removeEventListener("storage", handler);
  };
}

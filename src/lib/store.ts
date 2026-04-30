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

export type Offer = {
  id: string;
  title: string;
  description: string;
  images: string[]; // up to 6 data URLs
  ctaLabel: string;
  ctaUrl: string;
  status: "published" | "draft";
  order: number;
};

export type VipBookingStatus = "new" | "contacted" | "confirmed" | "declined";
export type VipBooking = {
  id: string;
  whatsapp: string;
  email: string;
  date: string;
  time: string;
  submittedAt: string;
  status: VipBookingStatus;
};

const KEYS = {
  contacts: "rowaad:contacts",
  projects: "rowaad:projects",
  partners: "rowaad:partners",
  team: "rowaad_team_members",
  offers: "rowaad_offers",
  vip: "rowaad_vip_bookings",
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

  // Team
  getTeam: () => read<TeamMember>(KEYS.team).sort((a, b) => a.order - b.order),
  saveTeamMember: (m: TeamMember) => {
    const list = read<TeamMember>(KEYS.team);
    const idx = list.findIndex((x) => x.id === m.id);
    if (idx >= 0) list[idx] = m;
    else list.push(m);
    write(KEYS.team, list);
  },
  deleteTeamMember: (id: string) => {
    write(KEYS.team, read<TeamMember>(KEYS.team).filter((m) => m.id !== id));
  },

  // Offers
  getOffers: () => read<Offer>(KEYS.offers).sort((a, b) => a.order - b.order),
  saveOffer: (o: Offer) => {
    const list = read<Offer>(KEYS.offers);
    const idx = list.findIndex((x) => x.id === o.id);
    if (idx >= 0) list[idx] = o;
    else list.push(o);
    write(KEYS.offers, list);
  },
  deleteOffer: (id: string) => {
    write(KEYS.offers, read<Offer>(KEYS.offers).filter((o) => o.id !== id));
  },

  // VIP Bookings
  getVipBookings: () => read<VipBooking>(KEYS.vip),
  addVipBooking: (b: Omit<VipBooking, "id" | "submittedAt" | "status">) => {
    const list = read<VipBooking>(KEYS.vip);
    const item: VipBooking = {
      ...b,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      status: "new",
    };
    list.unshift(item);
    write(KEYS.vip, list);
    return item;
  },
  updateVipBooking: (id: string, patch: Partial<VipBooking>) => {
    const list = read<VipBooking>(KEYS.vip).map((b) => (b.id === id ? { ...b, ...patch } : b));
    write(KEYS.vip, list);
  },
  deleteVipBooking: (id: string) => {
    write(KEYS.vip, read<VipBooking>(KEYS.vip).filter((b) => b.id !== id));
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

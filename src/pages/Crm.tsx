import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Loader2, LogOut, Users, Phone, TrendingUp, CheckCircle2, Trash2, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import logo from '@/assets/logo.png';

type LeadStatus = 'new' | 'contacted' | 'quoted' | 'won' | 'lost';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  status: LeadStatus;
  source: string;
  guards: number | null;
  sites: number | null;
  hours_per_day: number | null;
  estimated_monthly_cost: number | null;
  internal_notes: string | null;
  created_at: string;
}

interface Activity {
  id: string;
  lead_id: string;
  note: string;
  created_at: string;
}

const statuses: LeadStatus[] = ['new', 'contacted', 'quoted', 'won', 'lost'];

const statusStyles: Record<LeadStatus, string> = {
  new: 'bg-accent text-accent-foreground',
  contacted: 'bg-primary text-primary-foreground',
  quoted: 'bg-muted text-foreground',
  won: 'bg-green-600 text-white',
  lost: 'bg-destructive text-destructive-foreground',
};

const formatTzs = (value: number | null) =>
  value == null ? '—' : `TZS ${new Intl.NumberFormat('en-TZ', { maximumFractionDigits: 0 }).format(value)}`;

const Crm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, isTeam, loading: authLoading, signOut } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | LeadStatus>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth', { replace: true });
  }, [authLoading, user, navigate]);

  const loadLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Could not load leads', description: error.message, variant: 'destructive' });
    } else {
      setLeads((data ?? []) as Lead[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) loadLeads();
  }, [user]);

  useEffect(() => {
    if (!selectedId) {
      setActivity([]);
      return;
    }
    supabase
      .from('lead_activity')
      .select('*')
      .eq('lead_id', selectedId)
      .order('created_at', { ascending: false })
      .then(({ data }) => setActivity((data ?? []) as Activity[]));
  }, [selectedId]);

  const stats = useMemo(
    () => ({
      total: leads.length,
      fresh: leads.filter((l) => l.status === 'new').length,
      won: leads.filter((l) => l.status === 'won').length,
      pipeline: leads
        .filter((l) => ['new', 'contacted', 'quoted'].includes(l.status))
        .reduce((sum, l) => sum + Number(l.estimated_monthly_cost ?? 0), 0),
    }),
    [leads],
  );

  const visibleLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesStatus = filter === 'all' || lead.status === filter;
      const matchesTerm =
        !term ||
        lead.name.toLowerCase().includes(term) ||
        lead.phone.toLowerCase().includes(term) ||
        (lead.service ?? '').toLowerCase().includes(term);
      return matchesStatus && matchesTerm;
    });
  }, [leads, filter, search]);

  const selected = leads.find((l) => l.id === selectedId) ?? null;

  const updateStatus = async (lead: Lead, status: LeadStatus) => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', lead.id);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    toast({ title: 'Status updated', description: `${lead.name} is now "${status}".` });
  };

  const addNote = async () => {
    if (!selected || !user || note.trim().length < 2) return;
    const { data, error } = await supabase
      .from('lead_activity')
      .insert({ lead_id: selected.id, author_id: user.id, note: note.trim() })
      .select()
      .single();
    if (error) {
      toast({ title: 'Could not save note', description: error.message, variant: 'destructive' });
      return;
    }
    setActivity((prev) => [data as Activity, ...prev]);
    setNote('');
  };

  const deleteLead = async (lead: Lead) => {
    const { error } = await supabase.from('leads').delete().eq('id', lead.id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== lead.id));
    if (selectedId === lead.id) setSelectedId(null);
  };

  if (authLoading || (user && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (user && !isTeam) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">Access pending</h1>
        <p className="text-muted-foreground max-w-md">
          Your account is not yet assigned a staff or admin role. Ask an administrator to grant you access.
        </p>
        <Button onClick={signOut} variant="outline">Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Lead CRM | Mkwawa Security</title>
        <meta name="description" content="Internal lead and client management dashboard for Mkwawa Security staff and administrators." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="bg-primary text-primary-foreground">
        <div className="container-custom flex flex-wrap items-center justify-between gap-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Mkwawa Security logo" className="h-12 w-auto" />
            <span className="font-heading font-bold">Lead CRM</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-primary-foreground/80">
              {user?.email} · {isAdmin ? 'Admin' : 'Staff'}
            </span>
            <Button size="sm" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total leads', value: String(stats.total), icon: Users },
            { label: 'New leads', value: String(stats.fresh), icon: Phone },
            { label: 'Won clients', value: String(stats.won), icon: CheckCircle2 },
            { label: 'Open pipeline / month', value: formatTzs(stats.pipeline), icon: TrendingUp },
          ].map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl p-5 shadow-card"
            >
              <card.icon className="w-5 h-5 text-accent mb-3" />
              <p className="font-heading text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <div className="p-4 flex flex-col sm:flex-row gap-3 border-b border-border">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone or service"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filter} onValueChange={(value) => setFilter(value as 'all' | LeadStatus)}>
                <SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="divide-y divide-border max-h-[640px] overflow-y-auto">
              {visibleLeads.length === 0 && (
                <p className="p-6 text-muted-foreground text-sm">No leads match this view yet.</p>
              )}
              {visibleLeads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedId(lead.id)}
                  className={`w-full text-left p-4 hover:bg-muted/60 transition-colors ${
                    selectedId === lead.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-heading font-semibold text-foreground">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.phone} · {lead.service ?? 'general enquiry'}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(lead.created_at).toLocaleString()} · {lead.source}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={statusStyles[lead.status]}>{lead.status}</Badge>
                      <p className="text-xs text-muted-foreground">{formatTzs(lead.estimated_monthly_cost)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-card p-5 space-y-4">
            {!selected ? (
              <p className="text-muted-foreground text-sm">Select a lead to view details and log activity.</p>
            ) : (
              <>
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground">{selected.name}</h2>
                  <a href={`tel:${selected.phone}`} className="text-accent text-sm hover:underline">{selected.phone}</a>
                  {selected.email && <p className="text-sm text-muted-foreground">{selected.email}</p>}
                </div>

                <dl className="text-sm space-y-1 text-muted-foreground">
                  <div className="flex justify-between"><dt>Service</dt><dd className="text-foreground">{selected.service ?? '—'}</dd></div>
                  <div className="flex justify-between"><dt>Guards</dt><dd className="text-foreground">{selected.guards ?? '—'}</dd></div>
                  <div className="flex justify-between"><dt>Sites</dt><dd className="text-foreground">{selected.sites ?? '—'}</dd></div>
                  <div className="flex justify-between"><dt>Hours / day</dt><dd className="text-foreground">{selected.hours_per_day ?? '—'}</dd></div>
                  <div className="flex justify-between"><dt>Estimate</dt><dd className="text-foreground">{formatTzs(selected.estimated_monthly_cost)}</dd></div>
                </dl>

                {selected.message && (
                  <p className="text-sm bg-muted rounded-lg p-3 text-foreground">{selected.message}</p>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-heading font-semibold text-foreground">Status</label>
                  <Select value={selected.status} onValueChange={(value) => updateStatus(selected, value as LeadStatus)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-heading font-semibold text-foreground">Add activity note</label>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    maxLength={1000}
                    placeholder="Called client, site visit scheduled..."
                  />
                  <Button onClick={addNote} className="w-full bg-primary text-primary-foreground hover:bg-navy-light font-heading font-semibold">
                    Save note
                  </Button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {activity.map((entry) => (
                    <div key={entry.id} className="text-sm border-l-2 border-accent pl-3">
                      <p className="text-foreground">{entry.note}</p>
                      <p className="text-xs text-muted-foreground">{new Date(entry.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {isAdmin && (
                  <Button variant="destructive" onClick={() => deleteLead(selected)} className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" /> Delete lead
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Crm;

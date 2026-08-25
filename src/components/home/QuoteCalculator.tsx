import { useMemo, useState } from 'react';
import { Calculator, Loader2, Send } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const GUARD_BASE_RATE = 450000; // TZS per unarmed guard, per month, 12h shift
const ARMED_MULTIPLIER = 1.6;
const SUPERVISION_PER_SITE = 120000;
const CCTV_PER_SITE = 350000;

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(100),
  phone: z.string().trim().min(7, 'Valid phone number is required').max(20),
});

const formatTzs = (value: number) =>
  new Intl.NumberFormat('en-TZ', { maximumFractionDigits: 0 }).format(Math.round(value));

const QuoteCalculator = () => {
  const { toast } = useToast();
  const [guards, setGuards] = useState(4);
  const [sites, setSites] = useState(1);
  const [hours, setHours] = useState(12);
  const [armed, setArmed] = useState(false);
  const [cctv, setCctv] = useState(false);
  const [contact, setContact] = useState({ name: '', phone: '' });
  const [saving, setSaving] = useState(false);

  const estimate = useMemo(() => {
    const hoursFactor = hours / 12;
    const guardCost = guards * GUARD_BASE_RATE * hoursFactor * (armed ? ARMED_MULTIPLIER : 1);
    const supervision = sites * SUPERVISION_PER_SITE;
    const systems = cctv ? sites * CCTV_PER_SITE : 0;
    const monthly = guardCost + supervision;
    return { monthly, systems, total: monthly + systems };
  }, [guards, sites, hours, armed, cctv]);

  const handleRequest = async () => {
    setSaving(true);
    try {
      const parsed = contactSchema.parse(contact);
      const { error } = await supabase.from('leads').insert({
        name: parsed.name,
        phone: parsed.phone,
        service: armed ? 'armed-guarding' : 'security-guarding',
        source: 'hero-calculator',
        guards,
        sites,
        hours_per_day: hours,
        estimated_monthly_cost: Math.round(estimate.monthly),
        message: `Calculator estimate: ${guards} guard(s) x ${sites} site(s), ${hours}h/day, ${
          armed ? 'armed' : 'unarmed'
        }${cctv ? ', CCTV installation requested' : ''}.`,
      });
      if (error) throw error;
      toast({
        title: 'Estimate sent to our team',
        description: 'A security consultant will confirm your quote within 24 hours.',
      });
      setContact({ name: '', phone: '' });
    } catch (error) {
      toast({
        title: 'Please check your details',
        description: error instanceof z.ZodError ? error.errors[0].message : (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-accent">
        <Calculator className="w-5 h-5" />
        <span className="font-heading font-semibold uppercase tracking-wide text-sm">Security Cost Calculator</span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <Label>Number of guards</Label>
            <span className="font-heading font-bold text-foreground">{guards}</span>
          </div>
          <Slider value={[guards]} min={1} max={50} step={1} onValueChange={([v]) => setGuards(v)} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <Label>Number of sites</Label>
            <span className="font-heading font-bold text-foreground">{sites}</span>
          </div>
          <Slider value={[sites]} min={1} max={20} step={1} onValueChange={([v]) => setSites(v)} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <Label>Coverage per day</Label>
            <span className="font-heading font-bold text-foreground">{hours} hours</span>
          </div>
          <Slider value={[hours]} min={8} max={24} step={4} onValueChange={([v]) => setHours(v)} />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setArmed(!armed)}
            aria-pressed={armed}
            className={`px-3 py-2 rounded-lg text-sm font-heading font-semibold border transition-colors ${
              armed ? 'bg-accent text-accent-foreground border-accent' : 'bg-background text-foreground border-border'
            }`}
          >
            Armed guards
          </button>
          <button
            type="button"
            onClick={() => setCctv(!cctv)}
            aria-pressed={cctv}
            className={`px-3 py-2 rounded-lg text-sm font-heading font-semibold border transition-colors ${
              cctv ? 'bg-accent text-accent-foreground border-accent' : 'bg-background text-foreground border-border'
            }`}
          >
            Add CCTV setup
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-primary p-5 text-primary-foreground">
        <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Estimated monthly cost</p>
        <p className="font-heading text-3xl font-bold text-accent">TZS {formatTzs(estimate.monthly)}</p>
        {cctv && (
          <p className="text-sm text-primary-foreground/80 mt-2">
            One-off CCTV installation: TZS {formatTzs(estimate.systems)}
          </p>
        )}
        <p className="text-xs text-primary-foreground/60 mt-2">
          Indicative pricing only. Final quote depends on site survey, risk level and contract length.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Input
          placeholder="Your Name *"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          maxLength={100}
          className="bg-background border-border"
        />
        <Input
          type="tel"
          placeholder="Phone Number *"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          maxLength={20}
          className="bg-background border-border"
        />
      </div>

      <Button
        onClick={handleRequest}
        disabled={saving}
        size="lg"
        className="w-full bg-accent text-accent-foreground hover:bg-gold-dark font-heading font-semibold shadow-gold"
      >
        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (<>Send My Estimate<Send className="w-5 h-5 ml-2" /></>)}
      </Button>
    </div>
  );
};

export default QuoteCalculator;

export interface PlanLimit {
  [key: string]: number
}

export interface Plan {
  id: string
  name: string
  description: string
  price: { monthly: number; yearly?: number }
  priceId?: string
  yearlyPriceId?: string
  limits: PlanLimit
  features: string[]
  highlighted?: boolean
  cta: string
}

export const pricingConfig: {
  model: 'freemium' | 'free-trial' | 'paid-only'
  trialDays?: number
  defaultLimits: PlanLimit
  plans: Plan[]
} = {
  model: 'free-trial',

  defaultLimits: {
    ai_co_founders: 0,
    channels: 0,
    messages_per_day: 10
  },

  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'For pre-revenue founders exploring ideas and validating with their first AI co-founder.',
      price: { monthly: 19, yearly: 180 },
      priceId: process.env.STRIPE_PRICE_STARTER,
      limits: {
        ai_co_founders: 1,
        channels: 1,
        messages_per_day: 200
      },
      features: [
        '1 project / AI co-founder',
        '1 messaging channel (Telegram or Discord)',
        '200 messages per day',
        'IHVF idea validation framework',
        'Landing page roasting',
        'Basic tweet drafting',
        'Weekly MRR digest (Stripe connected)',
        'Encrypted API key storage',
        'Per-user container isolation'
      ],
      cta: 'Start 7-Day Free Trial',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For active indie hackers with launched products — your full-stack AI co-founder.',
      price: { monthly: 29, yearly: 288 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        ai_co_founders: 3,
        channels: 3,
        messages_per_day: -1
      },
      features: [
        '3 projects / AI co-founders',
        '3 messaging channels',
        'Unlimited messages',
        'Daily MRR alerts & revenue insights',
        'Competitor monitoring (3 competitors)',
        'Full build-in-public content suite',
        'Product Hunt launch kit generator',
        'Cold outreach sequences (50/mo)',
        'Priority response times',
        'All Starter features included'
      ],
      highlighted: true,
      cta: 'Start 7-Day Free Trial',
    },
    {
      id: 'founder',
      name: 'Founder',
      description: 'For serious solo founders and portfolio operators scaling multiple products.',
      price: { monthly: 49, yearly: 468 },
      priceId: process.env.STRIPE_PRICE_FOUNDER,
      limits: {
        ai_co_founders: -1,
        channels: -1,
        messages_per_day: -1
      },
      features: [
        'Unlimited projects / AI co-founders',
        'Unlimited messaging channels',
        'Unlimited messages',
        'Real-time MRR alerts & deep analytics',
        'Competitor monitoring (10 competitors)',
        'Advanced outreach sequences (200/mo)',
        'Custom skill creation',
        'API access for integrations',
        'White-glove onboarding call',
        'Priority support (< 4hr response)',
        'All Pro features included'
      ],
      cta: 'Start 7-Day Free Trial',
    }
  ],
}

const planMap = new Map<string, Plan>()
for (const plan of pricingConfig.plans) {
  planMap.set(plan.id, plan)
}

export function getPlan(tier: string): Plan {
  return planMap.get(tier) || pricingConfig.plans[0]
}

export function getPlanByPriceId(priceId: string): string | null {
  for (const plan of pricingConfig.plans) {
    if (plan.priceId === priceId || plan.yearlyPriceId === priceId) {
      return plan.id
    }
  }
  return null
}

export function getLimits(tier: string | null): PlanLimit {
  if (!tier) return pricingConfig.defaultLimits
  const plan = planMap.get(tier)
  return plan?.limits || pricingConfig.defaultLimits
}

export function checkLimit(tier: string | null, limitKey: string, currentUsage: number): boolean {
  const limits = getLimits(tier)
  const limit = limits[limitKey]
  if (limit === undefined) return false
  if (limit === -1) return true
  return currentUsage < limit
}

export function isPaidTier(tier: string | null): boolean {
  if (!tier) return false
  const plan = planMap.get(tier)
  return plan ? plan.price.monthly > 0 : false
}

export function getFreePlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.price.monthly === 0)
}

export function getPaidPlans(): Plan[] {
  return pricingConfig.plans.filter((p) => p.price.monthly > 0)
}

export function getHighlightedPlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.highlighted)
}

export function getPlanPrice(tier: string | null): number {
  if (!tier) return 0
  const plan = planMap.get(tier)
  return plan?.price.monthly || 0
}

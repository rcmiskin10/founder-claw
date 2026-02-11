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
  model: 'freemium',

  defaultLimits: {
    competitors_monitored: 0,
    content_drafts_per_month: 0,
    entities: 50,
    messages_per_day: 50,
    roasts_per_week: 1
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Get your AI co-founder up and running — no credit card required',
      price: { monthly: 0 },
      limits: {
        competitors_monitored: 0,
        content_drafts_per_month: 0,
        entities: 50,
        messages_per_day: 50,
        roasts_per_week: 1
      },
      features: [
        '50 messages per day',
        '1 chat platform (Telegram)',
        'IHVF idea validation',
        '1 landing page roast per week',
        'Community skills (read-only)',
        'Persistent founder memory'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'starter',
      name: 'Starter',
      description: 'For solo founders actively building and shipping',
      price: { monthly: 19, yearly: 190 },
      priceId: process.env.STRIPE_PRICE_STARTER,
      limits: {
        competitors_monitored: 1,
        content_drafts_per_month: 30,
        entities: -1,
        messages_per_day: -1,
        roasts_per_week: -1
      },
      features: [
        'Unlimited messages',
        'Full IHVF validation workflows',
        'Stripe integration with daily MRR alerts',
        '30 build-in-public drafts per month',
        'Unlimited landing page roasts',
        '1 launch kit per month',
        '1 competitor monitored',
        'Single chat platform'
      ],
      highlighted: true,
      cta: 'Start Building',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For power founders scaling their products',
      price: { monthly: 39, yearly: 390 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        competitors_monitored: 5,
        content_drafts_per_month: -1,
        entities: -1,
        messages_per_day: -1,
        roasts_per_week: -1
      },
      features: [
        'Everything in Starter',
        'All chat platforms connected',
        'Unlimited content drafts',
        'Unlimited launch kits',
        'Up to 5 competitors monitored',
        'Weekly competitor digest',
        'Custom skill creation',
        'Weekly founder report',
        'Priority response times',
        'Early access to new skills'
      ],
      cta: 'Go Pro',
    },
    {
      id: 'team',
      name: 'Team',
      description: 'For small co-founding teams building together',
      price: { monthly: 79, yearly: 790 },
      priceId: process.env.STRIPE_PRICE_TEAM,
      limits: {
        competitors_monitored: -1,
        content_drafts_per_month: -1,
        entities: -1,
        messages_per_day: -1,
        roasts_per_week: -1
      },
      features: [
        'Everything in Pro',
        'Up to 3 team members',
        'Shared context and memory',
        'Collaborative decision logs',
        'Unlimited competitor monitoring',
        'Team analytics dashboard',
        'Dedicated onboarding call'
      ],
      cta: 'Start Team Plan',
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

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
    competitors: 0,
    entities: 15,
    ihvf_sessions: 3,
    landing_page_roasts: 2
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Try your AI co-founder with basic features',
      price: { monthly: 0 },
      limits: {
        competitors: 0,
        entities: 15,
        ihvf_sessions: 3,
        landing_page_roasts: 2
      },
      features: [
        'Telegram bot connection',
        '3 IHVF idea validation sessions/month',
        '2 landing page roasts/month',
        'Weekly MRR summary email',
        'Basic startup context memory'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'solo-founder',
      name: 'Solo Founder',
      description: 'Everything you need to build and ship solo',
      price: { monthly: 29, yearly: 249 },
      priceId: process.env.STRIPE_PRICE_SOLO_FOUNDER,
      limits: {
        competitors: 3,
        entities: -1,
        ihvf_sessions: -1,
        landing_page_roasts: -1
      },
      features: [
        'Unlimited IHVF validation sessions',
        'Full Stripe integration with daily MRR alerts',
        'Unlimited landing page roasting',
        'Build-in-public content drafting (10 posts/week)',
        'Basic competitor monitoring (3 competitors)',
        'Launch kit generation',
        'All chat platforms (Telegram, Discord, WhatsApp)',
        'Persistent startup context memory'
      ],
      highlighted: true,
      cta: 'Start Building',
    },
    {
      id: 'serious-builder',
      name: 'Serious Builder',
      description: 'For founders scaling past their first $1K MRR',
      price: { monthly: 59, yearly: 499 },
      priceId: process.env.STRIPE_PRICE_SERIOUS_BUILDER,
      limits: {
        competitors: 10,
        entities: -1,
        ihvf_sessions: -1,
        landing_page_roasts: -1
      },
      features: [
        'Everything in Solo Founder',
        'Advanced competitor monitoring (10 competitors)',
        'Real-time competitor alerts',
        'Priority AI responses',
        'Custom skill creation',
        'Multi-product support (up to 3 products)',
        'Weekly strategic review sessions',
        'API access for custom integrations'
      ],
      cta: 'Level Up',
    },
    {
      id: 'studio',
      name: 'Studio / Agency',
      description: 'For teams shipping multiple products',
      price: { monthly: 149, yearly: 1249 },
      priceId: process.env.STRIPE_PRICE_STUDIO,
      limits: {
        competitors: -1,
        entities: -1,
        ihvf_sessions: -1,
        landing_page_roasts: -1
      },
      features: [
        'Everything in Serious Builder',
        'Unlimited products & competitors',
        'Team collaboration (up to 5 users)',
        'White-label options',
        'Dedicated priority support',
        'Custom framework integration',
        'Bulk launch kit generation',
        'Priority feature requests'
      ],
      cta: 'Contact Sales',
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

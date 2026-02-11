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
    content_drafts_per_week: 3,
    entities: 50,
    interactions_per_day: 30,
    landing_page_roasts_per_month: 1,
    validations_per_week: 1
  },

  plans: [
    {
      id: 'free',
      name: 'Hacker',
      description: 'Experience your AI co-founder with essential features — free forever',
      price: { monthly: 0 },
      limits: {
        content_drafts_per_week: 3,
        entities: 50,
        interactions_per_day: 30,
        landing_page_roasts_per_month: 1,
        validations_per_week: 1
      },
      features: [
        '30 AI interactions per day',
        '1 idea validation per week (IHVF)',
        '3 build-in-public drafts per week',
        '1 landing page roast per month',
        'Daily MRR summary via Stripe',
        'Telegram bot access',
        'Persistent startup context'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'founder',
      name: 'Founder',
      description: 'Unlimited AI co-founder power for serious builders',
      price: { monthly: 19, yearly: 149 },
      priceId: process.env.STRIPE_PRICE_FOUNDER,
      limits: {
        content_drafts_per_week: -1,
        entities: -1,
        interactions_per_day: -1,
        landing_page_roasts_per_month: 5,
        validations_per_week: -1
      },
      features: [
        'Unlimited AI interactions',
        'Unlimited IHVF idea validations',
        'Unlimited build-in-public drafts',
        '5 landing page roasts per month',
        '2 launch kit generations per month',
        'Real-time MRR alerts & revenue insights',
        'Competitor monitoring (3 competitors)',
        'All chat platforms (Telegram, Discord, WhatsApp)',
        'Priority response times'
      ],
      highlighted: true,
      cta: 'Start Building',
    },
    {
      id: 'founder-pro',
      name: 'Founder Pro',
      description: 'Maximum firepower for multi-project founders and power users',
      price: { monthly: 39, yearly: 299 },
      priceId: process.env.STRIPE_PRICE_FOUNDER_PRO,
      limits: {
        content_drafts_per_week: -1,
        entities: -1,
        interactions_per_day: -1,
        landing_page_roasts_per_month: -1,
        validations_per_week: -1
      },
      features: [
        'Everything in Founder, plus:',
        'Unlimited landing page roasts',
        'Unlimited launch kit generations',
        'Competitor monitoring (10 competitors)',
        'Advanced revenue analytics & churn prediction',
        'Custom AI skill/workflow creation',
        'API access for integrations',
        'Early access to new features',
        'Dedicated support channel'
      ],
      cta: 'Go Pro',
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

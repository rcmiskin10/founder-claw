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
    entities: 50
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Experience the magic — connect Telegram and start chatting with your AI co-founder',
      price: { monthly: 0 },
      limits: {
        entities: 50
      },
      features: [
        '50 AI interactions per month',
        '1 Telegram bot connection',
        '1 idea validation per month (IHVF)',
        '1 landing page roast per month',
        'Persistent project memory',
        'No Stripe integration'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'starter',
      name: 'Starter',
      description: 'For indie hackers who are serious about shipping and growing',
      price: { monthly: 19, yearly: 180 },
      priceId: process.env.STRIPE_PRICE_STARTER,
      limits: {
        entities: -1
      },
      features: [
        'Unlimited AI interactions',
        'Full IHVF idea validation',
        'Stripe integration with daily MRR alerts',
        'Build-in-public drafts (10 posts/mo)',
        'Landing page roasting (5/mo)',
        'Competitor monitoring (2 competitors)',
        'All chat platforms supported',
        'Persistent project memory'
      ],
      highlighted: true,
      cta: 'Start Building',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For established solo founders who want a full-stack AI co-founder',
      price: { monthly: 49, yearly: 468 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        entities: -1
      },
      features: [
        'Everything in Starter',
        'Unlimited content drafting',
        'Launch kit generation',
        'Competitor monitoring (10 competitors)',
        'Weekly strategy briefs',
        'Priority response times',
        'Advanced analytics dashboard',
        'Custom skill configuration',
        'Early access to new skills'
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

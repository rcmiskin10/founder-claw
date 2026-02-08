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
    entities: 1
  },

  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'For side-project builders and pre-revenue founders exploring ideas',
      price: { monthly: 19, yearly: 182 },
      priceId: process.env.STRIPE_PRICE_STARTER,
      limits: {
        entities: 1
      },
      features: [
        '500 messages per day',
        '1 messaging platform (Telegram, Discord, or WhatsApp)',
        'IHVF idea validation framework',
        'Build-in-public tweet drafting',
        'Basic landing page roasting',
        'Community support',
        'BYOK — bring your own API key'
      ],
      cta: 'Start 7-Day Free Trial',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For active indie hackers with launched products generating early revenue',
      price: { monthly: 29, yearly: 278 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        entities: 2
      },
      features: [
        'Unlimited messages',
        '2 messaging platforms',
        'Everything in Starter',
        'Stripe MRR tracking with daily alerts',
        'Competitor monitoring (3 competitors)',
        'Product Hunt launch kit generation',
        'Cold outreach sequence drafting',
        'Priority support'
      ],
      highlighted: true,
      cta: 'Start 7-Day Free Trial',
    },
    {
      id: 'founder',
      name: 'Founder',
      description: 'For serious solo founders and small teams scaling past $1K MRR',
      price: { monthly: 49, yearly: 470 },
      priceId: process.env.STRIPE_PRICE_FOUNDER,
      limits: {
        entities: -1
      },
      features: [
        'Unlimited messages',
        'All messaging platforms',
        'Everything in Pro',
        'Unlimited competitor monitoring',
        'Weekly AI strategy briefs',
        'Custom skill installation',
        'API access for integrations',
        'White-glove onboarding call',
        'Priority feature requests'
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

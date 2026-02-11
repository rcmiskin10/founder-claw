import { Lightbulb, TrendingUp, PenTool, Search, Rocket, Radar } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface FooterLink {
  title: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
}

export interface HeroContent {
  badge: string
  headline: string
  headlineHighlight: string
  subheadline: string
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
  socialProof?: { text: string; rating: string }
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  company: string
  mainNav: NavItem[]
  dashboardNav: NavItem[]
  hero: HeroContent
  features: Feature[]
  techStack: Array<{ name: string; color: string }>
  footerSections: FooterSection[]
  footerCopyright: string
  social: {
    twitter?: string
    github?: string
    discord?: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'FounderClaw',
  tagline: 'Your AI co-founder, living in your chat app',
  description: 'A managed AI co-founder in Telegram that validates ideas, tracks MRR, and drafts content for indie hackers.',
  url: process.env.NEXT_PUBLIC_APP_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || 'http://localhost:3000',
  company: 'FounderClaw',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'FAQ', href: '/#faq' },
    { title: 'Blog', href: '/blog' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Interactions', href: '/dashboard/entities' },
    { title: 'Integrations', href: '/dashboard/integrations' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Powered by OpenClaw — Zero DevOps',
    headline: 'Your AI Co-Founder Lives',
    headlineHighlight: 'Inside Your Telegram',
    subheadline: 'FounderClaw is a managed AI co-founder built for indie hackers. It validates your ideas with the IHVF framework, sends daily MRR alerts from Stripe, drafts build-in-public content, roasts your landing page, and monitors competitors — all from a single chat conversation that remembers everything about your startup.',
    primaryCta: { text: 'Get Started Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 500+ indie hackers', rating: '4.9/5' },
  },

  features: [
    {
      icon: Lightbulb,
      title: 'IHVF Idea Validation',
      description: 'Walk through structured Idea-Hypothesis-Validation-Feedback sessions that challenge your assumptions and de-risk your next build before you write a single line of code.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: TrendingUp,
      title: 'Stripe MRR Alerts',
      description: 'Connect Stripe once and get daily revenue summaries, churn alerts, new customer notifications, and milestone celebrations pushed directly to your chat app.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: PenTool,
      title: 'Build-in-Public Drafts',
      description: 'Generate engaging Twitter/X posts based on your actual milestones, metrics, and product updates — consistent content without the creative drain.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Search,
      title: 'Landing Page Roasting',
      description: 'Paste any URL and get structured, actionable CRO feedback covering copy, layout, social proof, CTAs, and mobile experience in under 60 seconds.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Rocket,
      title: 'Launch Kit Generation',
      description: 'Generate a complete Product Hunt launch kit — tagline, description, social posts, email announcement, and press outreach templates — all tailored to your product.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Radar,
      title: 'Competitor Monitoring',
      description: 'Track competitor websites, pricing changes, and product launches with real-time alerts so you never get blindsided by market moves.',
      gradient: 'from-amber-500 to-yellow-500',
    }
  ],

  techStack: [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'OpenClaw', color: 'bg-orange-600 text-white' },
    { name: 'Telegram API', color: 'bg-blue-500 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Integrations', href: '/features#integrations' },
        { title: 'Changelog', href: '/blog' }
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' }
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Security', href: '/security' }
      ],
    }
  ],

  footerCopyright: '2026 FounderClaw. All rights reserved.',

  social: {
    discord: 'https://discord.gg/founderclaw',
    twitter: 'https://twitter.com/founderclaw'
  },
}

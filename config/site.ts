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
  tagline: 'Your AI co-founder, right in your chat app',
  description: 'A managed AI co-founder for indie hackers — idea validation, MRR alerts, and content drafting in Telegram.',
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
    { title: 'Connections', href: '/dashboard/connections' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Powered by OpenClaw — zero DevOps required',
    headline: 'Your AI Co-Founder Lives in',
    headlineHighlight: 'Your Chat App',
    subheadline: 'FounderClaw is a proactive AI co-founder for indie hackers and solo founders. It lives in Telegram, connects to your Stripe, validates your ideas with the IHVF framework, drafts build-in-public content, roasts your landing page, and sends you daily MRR alerts — all without touching a single Docker config.',
    primaryCta: { text: 'Get Started Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 1,200+ indie hackers', rating: '4.9/5' },
  },

  features: [
    {
      icon: Lightbulb,
      title: 'IHVF Idea Validation',
      description: 'Get a structured, framework-driven analysis of your startup idea with a shareable scorecard — no more gut-feel decisions.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: TrendingUp,
      title: 'Daily MRR Alerts',
      description: 'Connect your Stripe and receive proactive daily revenue updates, new customer notifications, and churn alerts right in your chat.',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: PenTool,
      title: 'Build-in-Public Drafts',
      description: 'Generate polished tweets, threads, and update posts from a simple prompt — maintain your build-in-public cadence effortlessly.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Search,
      title: 'Landing Page Roasting',
      description: 'Share a URL and get instant, rubric-based feedback on your copy, design, CTA placement, and conversion potential.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: Rocket,
      title: 'Launch Kit Generation',
      description: 'Get a complete Product Hunt launch checklist, timeline, asset list, and day-of strategy tailored to your product.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Radar,
      title: 'Competitor Monitoring',
      description: 'Track up to 10 competitors with website change alerts, social mention tracking, and weekly competitive intelligence briefs.',
      gradient: 'from-indigo-500 to-violet-500',
    }
  ],

  techStack: [
    { name: 'OpenClaw', color: 'bg-orange-600 text-white' },
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'Telegram API', color: 'bg-blue-500 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Changelog', href: '/changelog' },
        { title: 'Integrations', href: '/features#integrations' }
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

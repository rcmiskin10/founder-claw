import { Bot } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type FieldType =
  | 'text'
  | 'rich-text'
  | 'number'
  | 'currency'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'select'
  | 'multi-select'
  | 'tags'
  | 'url'
  | 'email'

export interface EntityField {
  name: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  description?: string
  options?: string[]
  defaultValue?: string | number | boolean
  showInList?: boolean
  showInForm?: boolean
}

export interface EntityConfig {
  name: string
  pluralName: string
  slug: string
  icon: LucideIcon
  fields: EntityField[]
  titleField: string
  descriptionField?: string
  defaultSort: { field: string; direction: 'asc' | 'desc' }
  allowCreate: boolean
  allowEdit: boolean
  allowDelete: boolean
  allowExport: boolean
}

export const entityConfig: EntityConfig = {
  name: 'AI Co-founder Instance',
  pluralName: 'AI Co-founder Instances',
  slug: 'ai_co_founder_instances',
  icon: Bot,

  fields: [
    {
      name: 'instance_name',
      label: 'Instance Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., My Startup AI',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'messaging_channel',
      label: 'Messaging Channel',
      type: 'select',
      required: true,
      options: ['Telegram', 'Discord', 'WhatsApp'],
      showInList: true,
      showInForm: true,
    },
    {
      name: 'current_tier',
      label: 'Current Tier',
      type: 'select',
      required: true,
      options: ['Starter', 'Pro', 'Founder'],
      defaultValue: 'Starter',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'api_key_connected',
      label: 'API Key Connected',
      type: 'boolean',
      required: true,
      defaultValue: 'false',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'stripe_account_id',
      label: 'Stripe Account ID',
      type: 'text',
      required: false,
      placeholder: 'acct_1234567890',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'business_description',
      label: 'Business Description',
      type: 'rich-text',
      required: false,
      placeholder: 'Tell your AI co-founder what you\'re building, who your customers are, and what stage you\'re at...',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'skills_enabled',
      label: 'Skills Enabled',
      type: 'multi-select',
      required: true,
      options: ['Idea Validation', 'Revenue Tracking', 'Build-in-Public Drafting', 'Launch Kit Generation', 'Competitor Monitoring', 'Landing Page Roasting', 'Cold Outreach Sequences'],
      showInList: false,
      showInForm: true,
    }
  ],

  titleField: 'instance_name',
  descriptionField: 'business_description',
  defaultSort: { field: 'created_at', direction: 'desc' },

  allowCreate: true,
  allowEdit: true,
  allowDelete: true,
  allowExport: false,
}

export function getListFields(): EntityField[] {
  return entityConfig.fields.filter((f) => f.showInList !== false)
}

export function getFormFields(): EntityField[] {
  return entityConfig.fields.filter((f) => f.showInForm !== false)
}

export function fieldTypeToSql(type: FieldType): string {
  const mapping: Record<FieldType, string> = {
    text: 'TEXT',
    'rich-text': 'TEXT',
    number: 'INTEGER',
    currency: 'NUMERIC(10,2)',
    date: 'DATE',
    datetime: 'TIMESTAMPTZ',
    boolean: 'BOOLEAN DEFAULT FALSE',
    select: 'TEXT',
    'multi-select': 'TEXT[]',
    tags: 'TEXT[]',
    url: 'TEXT',
    email: 'TEXT',
  }
  return mapping[type] || 'TEXT'
}

export function fieldTypeToZod(field: EntityField): string {
  const base: Record<FieldType, string> = {
    text: 'z.string()',
    'rich-text': 'z.string()',
    number: 'z.coerce.number()',
    currency: 'z.coerce.number()',
    date: 'z.string()',
    datetime: 'z.string()',
    boolean: 'z.boolean()',
    select: `z.enum([${field.options?.map((o) => `'${o}'`).join(', ') || "'draft'"}])`,
    'multi-select': 'z.array(z.string())',
    tags: 'z.array(z.string())',
    url: 'z.string().url()',
    email: 'z.string().email()',
  }
  let schema = base[field.type] || 'z.string()'
  if (!field.required) {
    schema += '.optional()'
  }
  return schema
}

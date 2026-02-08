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
  name: 'AI Co-founder',
  pluralName: 'AI Co-founders',
  slug: 'ai_co_founder',
  icon: Bot,

  fields: [
    {
      name: 'name',
      label: 'Co-founder Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., FounderClaw AI',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: ['active', 'paused', 'configuring'],
      defaultValue: 'configuring',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'connected_channels',
      label: 'Connected Channels',
      type: 'multi-select',
      required: true,
      options: ['Telegram', 'Discord', 'WhatsApp'],
      showInList: true,
      showInForm: true,
    },
    {
      name: 'subscription_tier',
      label: 'Subscription Tier',
      type: 'select',
      required: true,
      options: ['Starter', 'Pro', 'Founder'],
      defaultValue: 'Starter',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'api_key_status',
      label: 'API Key Status',
      type: 'select',
      required: true,
      options: ['connected', 'missing', 'invalid'],
      defaultValue: 'missing',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'business_description',
      label: 'Your Business',
      type: 'rich-text',
      required: false,
      placeholder: 'Tell your AI co-founder what you\'re building — your product, audience, goals, and current stage...',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'custom_skills',
      label: 'Custom Skills',
      type: 'tags',
      required: false,
      showInList: false,
      showInForm: true,
    }
  ],

  titleField: 'name',
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

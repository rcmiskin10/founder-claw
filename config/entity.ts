import { MessageSquare } from 'lucide-react'
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
  name: 'FounderInteraction',
  pluralName: 'FounderInteractions',
  slug: 'founder_interactions',
  icon: MessageSquare,

  fields: [
    {
      name: 'interaction_id',
      label: 'Interaction ID',
      type: 'text',
      required: true,
      placeholder: 'e.g., INT-20250601-001',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'interaction_type',
      label: 'Interaction Type',
      type: 'select',
      required: true,
      options: ['idea_validation', 'revenue_tracking', 'content_drafting', 'landing_page_roast', 'launch_kit_generation', 'competitor_monitoring', 'general_query'],
      defaultValue: 'general_query',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'timestamp',
      label: 'Timestamp',
      type: 'datetime',
      required: true,
      showInList: true,
      showInForm: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: ['pending', 'completed', 'in_progress', 'requires_input'],
      defaultValue: 'pending',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'user_input',
      label: 'User Input',
      type: 'rich-text',
      required: true,
      placeholder: 'What the founder asked or submitted...',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'ai_response',
      label: 'AI Response',
      type: 'rich-text',
      required: true,
      placeholder: 'FounderClaw\'s response...',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'associated_project',
      label: 'Associated Project',
      type: 'text',
      required: false,
      placeholder: 'e.g., MyMicroSaaS',
      showInList: false,
      showInForm: true,
    }
  ],

  titleField: 'interaction_id',
  descriptionField: 'user_input',
  defaultSort: { field: 'timestamp', direction: 'desc' },

  allowCreate: true,
  allowEdit: true,
  allowDelete: true,
  allowExport: true,
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

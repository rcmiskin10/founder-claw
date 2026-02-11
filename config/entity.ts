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
      name: 'associated_project',
      label: 'Associated Project',
      type: 'text',
      required: false,
      placeholder: 'Name of the project this interaction relates to',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: ['pending', 'in_progress', 'completed', 'feedback_needed'],
      defaultValue: 'pending',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'interaction_date',
      label: 'Interaction Date',
      type: 'datetime',
      required: true,
      showInList: true,
      showInForm: true,
    },
    {
      name: 'request_details',
      label: 'Request Details',
      type: 'rich-text',
      required: true,
      placeholder: 'Describe your request to the AI co-founder.',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'ai_response',
      label: 'AI Co-founder Response',
      type: 'rich-text',
      required: false,
      placeholder: 'The AI co-founder\'s generated response.',
      showInList: false,
      showInForm: true,
    }
  ],

  titleField: 'associated_project',
  descriptionField: 'request_details',
  defaultSort: { field: 'interaction_date', direction: 'desc' },

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

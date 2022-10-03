export enum EDepartment {
  android = 'android',
  ios = 'ios',
  design = 'design',
  management = 'management',
  QA = 'qa',
  backOffice = 'back_office',
  frontend = 'frontend',
  HR = 'hr',
  PR = 'pr',
  backend = 'backend',
  support = 'support',
  analytics = 'analytics'
}

export enum EWorkspaceDepartments {
  all = 'all',
  android = 'android',
  ios = 'ios',
  design = 'design',
  management = 'management',
  QA = 'qa',
  backOffice = 'back_office',
  frontend = 'frontend',
  HR = 'hr',
  PR = 'pr',
  backend = 'backend',
  support = 'support',
  analytics = 'analytics'
}

export const verstkaDepartmentsList: Array<[string, EWorkspaceDepartments]> = [
  ['Все', EWorkspaceDepartments.all],
  ['Android', EWorkspaceDepartments.android],
  ['iOS', EWorkspaceDepartments.ios],
  ['Дизайн', EWorkspaceDepartments.design],
  ['Менеджмент', EWorkspaceDepartments.management],
  ['QA', EWorkspaceDepartments.QA],
  ['Бэк-оффис', EWorkspaceDepartments.backOffice],
  ['Frontend', EWorkspaceDepartments.frontend],
  ['HR', EWorkspaceDepartments.HR],
  ['PR', EWorkspaceDepartments.PR],
  ['Backend', EWorkspaceDepartments.backend],
  ['Техподдержка', EWorkspaceDepartments.support],
  ['Аналитика', EWorkspaceDepartments.analytics]
]

interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Therapist', 'Health Coach', 'Business Owner'],
  tenantName: 'Organization',
  applicationName: 'Samadhan Ayurveda',
  addOns: [],
};

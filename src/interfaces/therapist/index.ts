import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TherapistInterface {
  id?: string;
  profile_info?: string;
  services_info?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface TherapistGetQueryInterface extends GetQueryInterface {
  id?: string;
  profile_info?: string;
  services_info?: string;
  user_id?: string;
}

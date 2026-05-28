import type { UserProfile } from '../../../global/@types/navigation';

export interface AuthResult {
  profile: UserProfile;
  userId: string;
}

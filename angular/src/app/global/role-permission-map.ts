import { UserPermission } from '../enums/user-permissions.enum';
import { UserRole } from '../enums/roles.enum';

export const RolePermissionsMap: Record<string, UserPermission[]> = {
  ['Administrator']: [
    UserPermission.ReadComments,
    UserPermission.AddDeleteComments,
    UserPermission.AddDeleteTopics,
    UserPermission.DeleteOthersCommentsTopics,
  ],
  ['Guest']: [UserPermission.ReadComments],
  ['SilverUser']: [
    UserPermission.ReadComments,
    UserPermission.AddDeleteComments,
  ],
  ['GoldUser']: [
    UserPermission.ReadComments,
    UserPermission.AddDeleteComments,
    UserPermission.AddDeleteTopics,
  ],
};

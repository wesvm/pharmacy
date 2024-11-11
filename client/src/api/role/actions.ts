import { apiRequest } from "@/api/api-service";
import { RoleFormSchema } from "./validations";

export const createRole = async (values: RoleFormSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>('/roles', {
    method: 'POST',
    body: JSON.stringify(values),
  }, true);
};

export const updateRole = async (roleId: number, values: RoleFormSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>(`/roles/${roleId}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  }, true);
};

export const deleteRole = async (roleId: number): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>(`/roles/${roleId}`, {
    method: 'DELETE',
  }, true);
}
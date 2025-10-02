// src/utils/response.utils.ts
export function successResponse(
  message: string,
  data: any = null,
  status: number = 200,
  success: boolean = true
) {
  return { status, success, message, data };
}

export function errorResponse(
  message: string,
  data: any = null,
  status: number = 400,
  success: boolean = false
) {
  return { status, success, message, data };
}

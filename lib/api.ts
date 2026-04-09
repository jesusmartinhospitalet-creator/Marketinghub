import { NextResponse } from 'next/server'

type ApiSuccessResponse<T> = { success: true; data: T }
type ApiErrorResponse = { success: false; error: string }

/** Returns a standardised JSON success response. */
export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccessResponse<T>>(
    { success: true, data },
    { status }
  )
}

/** Returns a standardised JSON error response. */
export function apiError(message: string, status = 400) {
  return NextResponse.json<ApiErrorResponse>(
    { success: false, error: message },
    { status }
  )
}

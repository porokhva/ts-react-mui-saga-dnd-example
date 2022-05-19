import { LaunchesTypes } from '@/store/launches/slice'

export const LAUNCH_STATUSES: Record<LaunchesTypes, LaunchesTypes> = {
  past: 'past',
  next: 'next',
  my: 'my'
}

import { BASE_URL } from '@/api'
import { Role } from '@/interfaces'
import router from '@/router'
import { useTokenStore } from '@/stores/token'

function checkRoutePermission(
  routeName: string,
  routeParams: Record<string, string | never> = {}
): boolean {
  const tokenStore = useTokenStore()
  const user = tokenStore.user
  const route = router.resolve({ name: routeName, params: routeParams })

  if (user !== null && user.roles) {
    if (route.meta.allowedRoles) {
      return user.roles.some((role: Role) =>
        (route.meta.allowedRoles as string[]).includes(role.name)
      )
    }
    return true
  }

  return false
}

function getImageUrl(image: string): string {
  return `${BASE_URL}${image}`
}

export { checkRoutePermission, getImageUrl }

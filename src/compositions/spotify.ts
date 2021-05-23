import { computed, reactive, ref, watch } from 'vue'

const spotifyAppId = '4eb1abefbd3d4ad89dcbbfc981324d4f'

type AuthenticationDetails =
  | ValidAuthenticationDetails
  | InvalidAuthenticationDetails

interface ValidAuthenticationDetails {
  accessToken: string
  expiresIn: Date
}
interface InvalidAuthenticationDetails {
  accessToken: ''
  expiresIn: Date
}

interface AuthenticationResponse {
  access_token: string
  token_type: 'Bearer'
  expires_in: string
  state: string
}

function makeInvalidAuthenticationDetails(): InvalidAuthenticationDetails {
  return {
    accessToken: '',
    expiresIn: new Date(0),
  }
}

function isValidAuthenticationDetails(
  authenticationDetails: AuthenticationDetails,
  now: Date = new Date()
): authenticationDetails is ValidAuthenticationDetails {
  return (
    !!authenticationDetails.accessToken &&
    now.getTime() < authenticationDetails.expiresIn.getTime()
  )
}

function getSpotifyAuthenticationDetailsFromLocalStorage(): AuthenticationDetails {
  return (
    JSON.parse(
      localStorage.getItem('spotifyAuthenticationDetails') || 'null'
    ) || makeInvalidAuthenticationDetails()
  )
}
function setSpotifyAuthenticationDetailsInLocalStorage(
  authenticationDetails: AuthenticationDetails
): void {
  localStorage.setItem(
    'spotifyAuthenticationDetails',
    JSON.stringify(authenticationDetails)
  )
}

const authenticationDetails = reactive<AuthenticationDetails>(
  getSpotifyAuthenticationDetailsFromLocalStorage()
)

watch(authenticationDetails, () => {
  setSpotifyAuthenticationDetailsInLocalStorage(authenticationDetails)
})

const now = ref(new Date())
const nowUpdateInterval = 5000
setInterval(() => {
  now.value = new Date(now.value.getTime() + nowUpdateInterval)
}, nowUpdateInterval)

const isAuthented = computed(() =>
  isValidAuthenticationDetails(authenticationDetails, now.value)
)

export default function useSpotify() {
  const login = async () => {
    window.location.replace(
      `https://accounts.spotify.com/authorize?${new URLSearchParams({
        client_id: spotifyAppId,
        response_type: 'token',
        redirect_uri: `${window.location.origin}/login`,
        scope: [].join(' '),
      })}`
    )
  }

  const processLogin = () => {
    const hash = window.location.hash.replace(/^#)/, '')
    if (!hash) return false

    const authenticationResponse = Object.fromEntries(
      new URLSearchParams(hash).entries()
    ) as unknown as AuthenticationResponse

    authenticationDetails.accessToken = authenticationResponse.access_token
    authenticationDetails.expiresIn = new Date(
      Date.now() + parseInt(authenticationResponse.expires_in) * 1000
    )

    return isValidAuthenticationDetails(authenticationDetails)
  }

  return { isAuthented, login, processLogin }
}

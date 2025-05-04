import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      scope: "openid profile email",
      audience: process.env.AUTH0_AUDIENCE,
    },
    returnTo: "/profile",
  }),
  signup: handleLogin({
    authorizationParams: {
      scope: "openid profile email",
      audience: process.env.AUTH0_AUDIENCE,
      screen_hint: "signup",
    },
    returnTo: "/profile",
  }),
});
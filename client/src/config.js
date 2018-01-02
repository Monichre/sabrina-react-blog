import runtimeEnv from '@mars/heroku-js-runtime-env'
const env = runtimeEnv()

export const config =  {
	title: "Theresa on the Town",	
  auth: {
    space: env.REACT_APP_SPACE,
    accessToken: env.REACT_APP_ACCESS_TOKEN
  }
}

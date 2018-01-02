import runtimeEnv from '@mars/heroku-js-runtime-env'
const env = runtimeEnv()

const react_space = env.REACT_APP_SPACE
const token = env.REACT_APP_ACCESS_TOKEN

export const config =  {
	title: "Theresa on the Town",	
  auth: {
    space: react_space,
    accessToken: token
  }
}

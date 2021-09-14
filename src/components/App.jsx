import SpaceWidget, { destinationTypes } from '@webex/widget-space';
// Sass import required to style widgets
import '@webex/widget-space/src/momentum.scss';
import { useEffect, useState } from 'react';

export default function App() {
  const [gettingAccessToken, setGettingAccessToken] = useState(false)
  const [accessToken, setAccessToken] = useState(null)


  const getAccessToken = async (code) => {
    setGettingAccessToken(true)
    try {
      let response = await fetch('https://webexapis.com/v1/access_token?client_id=Cb2a4b4ca57c520f5fbed7620d856b5e12f05b3b49a72d1272f60cc36742930de&grant_type=authorization_code&redirect_uri=https%3A%2F%2Fadoring-kare-e9221a.netlify.app%2F&scope=spark%3Aall%20spark%3Akms&client_secret=7b591c856f211ebdaffb50211326b7e8c741e8e869d2be670a40f424f3eb498f&code=' + code, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' } })
      let data = await response.json()
      console.log(data)
      setAccessToken(data.access_token)
      setGettingAccessToken(false)
    }
    catch (error) {
      console.log(error.message)
      setGettingAccessToken(false)
    }
  }

  useEffect(() => {
    if (window.location.href.includes('code')) {
      let equalIndex = window.location.href.indexOf('=')
      let lastAnd = window.location.href.lastIndexOf('&')
      let code = window.location.href.substring(equalIndex + 1, lastAnd)
      getAccessToken(code)
    }
  }, [])

  const spaceWidgetProps = {
    accessToken: accessToken,  // Required
    destinationType: destinationTypes.SPACEID,
    destinationId: "Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vMzgwOWRlNjAtMTIyYS0xMWVjLWEzMmEtMTNkMTllZGQ0NmUw",
    activities: {
      files: false,
      meet: true,
      message: true,
      people: true
    },
    initialActivity: 'meet'
  }

  return (
    <div>
      {
        !gettingAccessToken && !accessToken ?
          <a href='https://webexapis.com/v1/authorize?client_id=Cb2a4b4ca57c520f5fbed7620d856b5e12f05b3b49a72d1272f60cc36742930de&response_type=code&redirect_uri=https%3A%2F%2Fadoring-kare-e9221a.netlify.app%2F&scope=spark%3Aall%20spark%3Akms&state=vim_is_hell'>Click to get auth code</a>
          :
          <SpaceWidget {...spaceWidgetProps} />
      }
    </div>
  )
}
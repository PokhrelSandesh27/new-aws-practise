import React from 'react'
import Jitsi from 'react-jitsi'

const interfaceConfig = {
    LANG_DETECTION: false,
    lang: 'en',
    APP_NAME: 'ams',
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    HIDE_INVITE_MORE_HEADER: true,
    MOBILE_APP_PROMO: false,
    SHOW_CHROME_EXTENSION_BANNER: false,
    TOOLBAR_BUTTONS: [
        'microphone',
        'camera',
        'fullscreen',
        'fodeviceselection',
        'hangup',
        'profile',
        'chat',
        'settings',
        'videoquality',
        'tileview',
        'download',
        'help',
        'mute-everyone'
        // 'security'
    ]
}

const config = {
    defaultLanguage: 'es',
    prejoinPageEnabled: false
}

export default function App () {
    const handleAPI = JitsiMeetAPI => {
        JitsiMeetAPI.executeCommand('toggleVideo')
    }

    return (
        <div className="mainContent">
            <Jitsi
                domain="meet.jit.si"
                onAPILoad={handleAPI}
                roomName='room-name' // link
                displayName='saai' // username
                interfaceConfig={interfaceConfig}
                config={config}
            />
        </div>
    )
}


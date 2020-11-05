import React from 'react'

import { DesktopLayout } from './DesktopLayout'

export function withDesktopLayout(layoutContent: React.ReactElement, header: React.ReactElement) {
    const desktopWrapper = ()=> <DesktopLayout header={header}>{layoutContent}</DesktopLayout>
    return desktopWrapper
}
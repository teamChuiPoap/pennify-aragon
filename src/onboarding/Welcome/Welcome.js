import React from 'react'
import PropTypes from 'prop-types'
import { Link, GU, Layout, Split, useTheme } from '@aragon/ui'
import { useSuggestedOrgs } from '../../suggested-orgs'
import Header from '../Header/Header'
import OpenOrg from './OpenOrg'
import Suggestions from './Suggestions'
import WelcomeAction from './WelcomeAction'

import actionCreate from './assets/action-create.png'
import actionOpen from './assets/action-open.png'

const Welcome = React.memo(function Welcome({
  createError,
  onBack,
  onCreate,
  onOpen,
  onOpenOrg,
  openMode,
}) {
  const theme = useTheme()

  const suggestedOrgs = useSuggestedOrgs()

  const primaryContent = openMode ? (
    <OpenOrg onBack={onBack} onOpenOrg={onOpenOrg} />
  ) : (
    <div>
      <WelcomeAction
        title="Create an organization"
        subtitle={<CreateSubtitle error={createError} />}
        illustration={actionCreate}
        onActivate={onCreate}
        hasError={createError[0] !== null && createError[0] !== 'no-account'}
      />
      <WelcomeAction
        title="Open an existing organization"
        illustration={actionOpen}
        onActivate={onOpen}
      />
    </div>
  )

  return (
    <Layout
      breakpoints={{
        medium: 84 * GU,
        large: 112 * GU,
      }}
    >
      <Header
        title="Welcome to PennyFi"
        subtitle="T H E C H A M A R E V O L U T I O N ."
      />


      {suggestedOrgs.length > 0 ? (
        <Split
          primary={primaryContent}
          secondary={<Suggestions suggestedOrgs={suggestedOrgs} />}
        />
      ) : (
        primaryContent
      )}

      <p
        css={`
          padding: ${4 * GU}px 0 ${4 * GU}px;
          text-align: center;
          color: ${theme.contentSecondary};
        `}
      >
        Made with love from team PennyFi powered by Aragon?{' '}
        <Link href="" external>
           
        
         </Link>
      </p>
    </Layout>
  )
})

Welcome.propTypes = {
  createError: PropTypes.array.isRequired,
  onBack: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onOpenOrg: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  openMode: PropTypes.bool.isRequired,
}

function CreateSubtitle({ error }) {
  const theme = useTheme()
  const [errorType, errorData] = error
  if (errorType === 'minimum-balance') {
    return (
      <span
        css={`
          color: ${theme.negative};
        `}
      >
        You need at least {errorData.minimumBalance} {errorData.tokenSymbol} (
        <strong>
          you have {errorData.balance} {errorData.tokenSymbol}
        </strong>
        ).
      </span>
    )
  }
  return 'Start your organization with Aragon'
}

CreateSubtitle.propTypes = {
  error: PropTypes.array.isRequired,
}

export default Welcome

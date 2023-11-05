import AppHeader from './components/app-header'
import AppSideLeft from './components/app-side-left'
import AppSideRight from './components/app-side-right'

import { AppContent } from './style'

function App() {
  return (
    <div id='appp'>
      <AppHeader></AppHeader>
      <AppContent>
        <AppSideLeft></AppSideLeft>
        <AppSideRight></AppSideRight>
      </AppContent>
    </div>
  )
}

export default App;

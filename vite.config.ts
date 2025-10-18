import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

import { execSync } from 'child_process'

function getGitInfo() {
  try {
    const commitId = execSync('git rev-parse --short HEAD').toString().trim()
    const buildDate = execSync('git log -1 --format=%cd --date=short').toString().trim()
    return { commitId, buildDate }
  } catch (e) {
    console.warn('Git info unavailable in this environment')
    return { commitId: 'unknown', buildDate: new Date().toISOString().split('T')[0] }
  }
}

const { commitId, buildDate } = getGitInfo()

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  define: {
    __COMMIT_ID__: JSON.stringify(commitId),
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
})
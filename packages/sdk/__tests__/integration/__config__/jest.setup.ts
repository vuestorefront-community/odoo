import nock from 'nock';
import path from 'path';
import {
  NOCK_MODE,
  NOCK_FIXTURES_CATALOG_NAME,
  NOCK_EXCLUDED_SCOPE,
} from './jest.const';

let nockDone;
/**
 * Sets Nock mode, fixture name and directory. Removes recorded requests to API Middleware
 * so that integration tests send them every time.
 */
async function setupNock (customFixtureName?) {
  nock.back.setMode(NOCK_MODE);
  nock.back.fixtures = path.join(__dirname, '../', NOCK_FIXTURES_CATALOG_NAME);

  const fixtureName = customFixtureName ?? expect.getState().currentTestName.split(' ').join('-');
  const afterRecord = (recordings) => recordings.filter(
    recording => !recording.scope.toString().includes(NOCK_EXCLUDED_SCOPE)
  );
  const { nockDone } = await nock.back(fixtureName, { afterRecord });

  nock.enableNetConnect();

  return nockDone;
}

beforeEach(async () => {
  nockDone = await setupNock();
});

afterEach(() => {
  nockDone();
});


export const mockLogin = async (username: string, password: string) => {
  console.log(
    'Simulating POST request to https://timetracker-api.experient.com/auth/login',
  );
  console.log('Request payload:', {username, password});
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && password) {
        resolve({
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token',
          user: {
            username: 'Hussain',
            active: true,
            roleId: 20,
            dateCreated: '2018-03-02T00:00:00.000Z',
            dateModified: '2018-03-02T00:00:00.000Z',
            lastName: 'MD',
            firstName: 'Hussain',
            displayName: 'Hussain',
            jiraUsername: 'hussain.md',
            intacctUserId: 'EE-00112',
            userId: 41,
            emailAddress: '@experient.com',
            openAtCurWeeksTimesheet: true,
            activeInterviewer: true,
            createIntacctTimesheet: true,
            roleName: 'Developer',
          },
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

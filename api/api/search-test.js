// Temporary test file to isolate the issue
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Test 1: Check environment variables
  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasFirebaseProject = !!process.env.FIREBASE_PROJECT_ID;
  const hasFirebaseEmail = !!process.env.FIREBASE_CLIENT_EMAIL;
  const hasFirebaseKey = !!process.env.FIREBASE_PRIVATE_KEY;

  console.log('Environment check:', {
    GEMINI_API_KEY: hasGemini,
    FIREBASE_PROJECT_ID: hasFirebaseProject,
    FIREBASE_CLIENT_EMAIL: hasFirebaseEmail,
    FIREBASE_PRIVATE_KEY: hasFirebaseKey
  });

  // Return environment status
  return res.status(200).json({
    success: true,
    environmentStatus: {
      GEMINI_API_KEY: hasGemini,
      FIREBASE_PROJECT_ID: hasFirebaseProject,
      FIREBASE_CLIENT_EMAIL: hasFirebaseEmail,
      FIREBASE_PRIVATE_KEY: hasFirebaseKey
    },
    message: 'Check which environment variables are missing'
  });
}

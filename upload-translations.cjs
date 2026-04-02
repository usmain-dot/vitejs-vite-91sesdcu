const admin = require('firebase-admin');
const translations = require('./translations-data.cjs');

// Initialize Firebase Admin
const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadTranslations() {
  console.log('🌍 Starting translation upload...\n');
  
  try {
    // Get all services from Firestore
    const servicesSnapshot = await db.collection('services').get();
    
    if (servicesSnapshot.empty) {
      console.log('❌ No services found in Firestore!');
      return;
    }
    
    console.log(`📊 Found ${servicesSnapshot.size} services in Firestore`);
    console.log(`📝 Have translations for ${translations.length} services\n`);
    
    let updatedCount = 0;
    let notFoundCount = 0;
    
    // Update each service with translations
    for (const translation of translations) {
      // Find matching service by name
      const matchingDoc = servicesSnapshot.docs.find(doc => 
        doc.data().name === translation.name
      );
      
      if (matchingDoc) {
        // Update the service with translation fields
        await db.collection('services').doc(matchingDoc.id).update({
          description_es: translation.description_es,
          description_ar: translation.description_ar,
          description_he: translation.description_he,
          description_sw: translation.description_sw
        });
        
        updatedCount++;
        console.log(`✅ Updated: ${translation.name}`);
      } else {
        notFoundCount++;
        console.log(`⚠️  Not found in Firestore: ${translation.name}`);
      }
    }
    
    console.log('\n🎉 Translation upload complete!');
    console.log(`✅ Successfully updated: ${updatedCount} services`);
    console.log(`⚠️  Not found: ${notFoundCount} services`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading translations:', error);
    process.exit(1);
  }
}

// Run the upload
uploadTranslations();
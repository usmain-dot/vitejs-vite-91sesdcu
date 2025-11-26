import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { nycServices } from '../data/nycServices';

export async function addServicesToFirestore() {
  console.log('Starting to add services to Firestore...');
  
  try {
    const servicesRef = collection(db, 'services');
    let successCount = 0;
    let errorCount = 0;

    for (const service of nycServices) {
      try {
        await addDoc(servicesRef, {
          ...service,
          createdAt: new Date(),
          updatedAt: new Date(),
          active: true,
        });
        successCount++;
        console.log(`✓ Added: ${service.name}`);
      } catch (error) {
        errorCount++;
        console.error(`✗ Failed to add ${service.name}:`, error);
      }
    }

    console.log(`\n✅ Complete! Added ${successCount} services`);
    if (errorCount > 0) {
      console.log(`⚠️ ${errorCount} services failed to add`);
    }
    
    return { successCount, errorCount };
  } catch (error) {
    console.error('Fatal error:', error);
    throw error;
  }
}

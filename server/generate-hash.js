// generate-hash.js
const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'admin123';
  console.log('🔑 Plain text password:', password);
  
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('🔐 Generated hash:', hashedPassword);
  
  // Verify it works
  const isValid = await bcrypt.compare(password, hashedPassword);
  console.log('✅ Verification test:', isValid ? 'PASSED' : 'FAILED');
  
  if (isValid) {
    console.log('\n📋 SQL COMMAND TO UPDATE DATABASE:');
    console.log(`UPDATE users SET password = '${hashedPassword}' WHERE email = 'admin@ecolearn.org';`);
  }
}

generateHash();
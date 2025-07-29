const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://rqodprddsblnqwepvdec.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxb2RwcmRkc2JsbnF3ZXB2ZGVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ0MjMxNywiZXhwIjoyMDY5MDE4MzE3fQ.u7y36Fy-vNP_n3ax58PF6wzpzw6Zz0nVigHt4jcilrA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const facilities = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = [];
    let current = '';
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    if (values.length >= 8) {
      const facility = {
        name: values[0].replace(/"/g, ''),
        category: values[1].replace(/"/g, ''),
        longitude: parseFloat(values[2]) || 0,
        latitude: parseFloat(values[3]) || 0,
        address: values[4].replace(/"/g, ''),
        rating: values[5] === 'N/A' ? null : parseFloat(values[5]),
        city: values[6].replace(/"/g, ''),
        phone: values[7] === 'N/A' ? null : values[7].replace(/"/g, '')
      };

      if (facility.name && facility.category && facility.longitude && facility.latitude) {
        facilities.push(facility);
      }
    }
  }

  return facilities;
}

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    const csvPath = path.join(__dirname, 'Kenya_Corrected_Final.csv');
    const csvText = fs.readFileSync(csvPath, 'utf-8');
    
    console.log('📖 Parsing CSV data...');
    const facilities = parseCSV(csvText);
    console.log(`✅ Parsed ${facilities.length} facilities`);

    console.log('🗑️ Clearing existing data...');
    const { error: deleteError } = await supabase
      .from('facilities')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.error('❌ Error clearing data:', deleteError);
    } else {
      console.log('✅ Existing data cleared');
    }

    console.log('📥 Inserting facilities...');
    const batchSize = 100;
    let inserted = 0;

    for (let i = 0; i < facilities.length; i += batchSize) {
      const batch = facilities.slice(i, i + batchSize);
      const { error } = await supabase
        .from('facilities')
        .insert(batch);

      if (error) {
        console.error(`❌ Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error);
      } else {
        inserted += batch.length;
        console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(facilities.length / batchSize)} (${inserted}/${facilities.length})`);
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Total facilities inserted: ${inserted}`);
    
    // Show summary by category
    const categories = {};
    facilities.forEach(f => {
      categories[f.category] = (categories[f.category] || 0) + 1;
    });
    
    console.log('\n📈 Summary by category:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });
    
  } catch (error) {
    console.error('💥 Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
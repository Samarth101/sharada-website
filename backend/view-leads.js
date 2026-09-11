const { getAllEnquiries } = require('./db');

console.log("\n=======================================================");
console.log("       SHARADA MEDIA - SUBMITTED ENQUIRIES");
console.log("=======================================================\n");

const leads = getAllEnquiries();

if (leads.length === 0) {
  console.log("No enquiries found yet in enquiries.db.\n");
  process.exit(0);
}

console.log(`Found ${leads.length} enquiry(s):\n`);

leads.forEach((lead) => {
  console.log(`-------------------------------------------------------`);
  console.log(`ID:        #${lead.id} | Status: ${lead.status} | AI Score: ${lead.ai_score}/100`);
  console.log(`Name:      ${lead.name}`);
  console.log(`Email:     ${lead.email}`);
  console.log(`Phone:     ${lead.phone || 'N/A'}`);
  console.log(`Source:    ${lead.source}`);
  console.log(`Date:      ${lead.created_at}`);
  console.log(`Message:\n${lead.message}`);
  if (lead.conversation) {
    console.log(`Chat History Attached: Yes`);
  }
  console.log(`-------------------------------------------------------\n`);
});

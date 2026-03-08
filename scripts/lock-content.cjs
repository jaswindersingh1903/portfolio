const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const content = JSON.parse(fs.readFileSync(path.join(__dirname, '../content.json'), 'utf8'));

const hash = (data) => crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex').slice(0, 16);

const lock = {
  lockfileVersion: 1,
  generatedAt: new Date().toISOString(),
  contentVersion: content.version,
  sections: {
    profile: {
      fields: Object.keys(content.profile),
      checksum: hash(content.profile),
    },
    skills: {
      count: content.skills.length,
      names: content.skills.map(s => s.name),
      checksum: hash(content.skills),
    },
    experience: {
      count: content.experience.length,
      ids: content.experience.map(e => e.id),
      companies: content.experience.map(e => e.company),
      checksum: hash(content.experience),
    },
    projects: {
      count: content.projects.length,
      titles: content.projects.map(p => p.title),
      checksum: hash(content.projects),
    },
    education: {
      count: content.education.length,
      institutions: content.education.map(e => e.institution),
      checksum: hash(content.education),
    },
    socialLinks: {
      count: content.socialLinks.length,
      platforms: content.socialLinks.map(s => s.platform),
      checksum: hash(content.socialLinks),
    },
  },
};

fs.writeFileSync(path.join(__dirname, '../content.lock.json'), JSON.stringify(lock, null, 2));
console.log('content.lock.json generated ✓');

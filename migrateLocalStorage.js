import fs from 'fs';
import path from 'path';

const componentsDir = 'src/components';
const adminDir = 'src/components/admin';
const pagesDir = 'src/components/pages';

const getFilePath = (file) => path.join(process.cwd(), file);

const filesToMigrate = [
  { path: 'src/components/WhyChooseAevora.jsx', key: 'home_page', oldKey: 'aevora_home_settings' },
  { path: 'src/components/VideoShowcase.jsx', key: 'home_page', oldKey: 'aevora_home_settings' },
  { path: 'src/components/AboutClinicIntro.jsx', key: 'home_page', oldKey: 'aevora_home_settings' },
  { path: 'src/components/pages/Press.jsx', key: 'press_settings', oldKey: 'aevora_press_settings' },
  { path: 'src/components/pages/Experts.jsx', key: 'experts_settings', oldKey: 'aevora_experts_settings' },
  { path: 'src/components/pages/ContactUs.jsx', key: 'clinic_settings', oldKey: 'aevora_clinic_settings' },
  { path: 'src/components/pages/Blog.jsx', key: 'blog_settings', oldKey: 'aevora_blogs' },
  { path: 'src/components/pages/BlogPost.jsx', key: 'blog_settings', oldKey: 'aevora_blogs' },
  { path: 'src/components/admin/AdminPressSettings.jsx', key: 'press_settings', oldKey: 'aevora_press_settings' },
  { path: 'src/components/admin/AdminExpertsSettings.jsx', key: 'experts_settings', oldKey: 'aevora_experts_settings' },
  { path: 'src/components/admin/AdminClinicSettings.jsx', key: 'clinic_settings', oldKey: 'aevora_clinic_settings' },
  { path: 'src/components/admin/AdminBlogSettings.jsx', key: 'blog_settings', oldKey: 'aevora_blogs' }
];

filesToMigrate.forEach(fileInfo => {
  const fullPath = getFilePath(fileInfo.path);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Skip if already migrated
  if (content.includes('getDbSetting')) return;

  // Add import if not present
  if (!content.includes('api/mongoApi')) {
    // Determine relative path depth
    const depth = fileInfo.path.split('/').length - 2;
    const prefix = '../'.repeat(depth);
    content = content.replace(/(import React.*?;\n)/, `$1import { getDbSetting, saveDbSetting } from '${prefix}api/mongoApi';\n`);
  }

  // Replace get item inside useEffect
  const getRegex = new RegExp(`const\\s+([^\\s]+)\\s*=\\s*localStorage\\.getItem\\('${fileInfo.oldKey}'\\);([\\s\\S]*?)if\\s*\\(\\1\\)\\s*\\{([\\s\\S]*?)\\}`, 'g');
  
  content = content.replace(getRegex, (match, varName, spaces, inner) => {
    return `getDbSetting('${fileInfo.key}').then((saved) => {
      if (saved) {${inner.replace(/JSON\.parse\([^)]+\)/g, 'saved').replace(/aevora_[a-z_]+/g, fileInfo.key)}
      }
    });`;
  });

  // Handle specific cases where parsed is used or multiple parses
  content = content.replace(/const saved = localStorage\.getItem\(['"][^'"]+['"]\);/g, `getDbSetting('${fileInfo.key}').then(saved => { if (saved) { console.log(saved); } });`);

  // Handle save items
  const setRegex = new RegExp(`localStorage\\.setItem\\('${fileInfo.oldKey}'\\s*,\\s*JSON\\.stringify\\(([^)]+)\\)\\);`, 'g');
  content = content.replace(setRegex, `await saveDbSetting('${fileInfo.key}', $1);`);

  // Add async to handleSave if needed
  content = content.replace(/const handleSave = \(\) => {/g, 'const handleSave = async () => {');

  // Fix save button states if they had setTimeout
  content = content.replace(/setTimeout\(\(\) => \{\s*await saveDbSetting/g, 'await saveDbSetting');
  content = content.replace(/setIsSaving\(false\);\s*setShowSuccess\(true\);\s*setTimeout\(\(\) => setShowSuccess\(false\), 3000\);\s*\}, 800\);/g, 'setIsSaving(false);\n      setShowSuccess(true);\n      setTimeout(() => setShowSuccess(false), 3000);');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Migrated ${fileInfo.path}`);
});
